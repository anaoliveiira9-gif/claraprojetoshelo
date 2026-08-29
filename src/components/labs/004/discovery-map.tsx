"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { formatBRL, type Property } from "./data";
import { CITY_LABELS, getPropertyPosition } from "./map-data";

const VB_W = 400;
const VB_H = 260;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const DRAG_THRESHOLD = 3;

type Pan = { x: number; y: number };

function clampZoom(z: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
}

function clampPan(pan: Pan, zoom: number): Pan {
  // At the given zoom, the content spans VB_W*zoom / VB_H*zoom. Pan must
  // keep that content covering the fixed VB_W x VB_H viewport (no gaps).
  const minX = VB_W * (1 - zoom);
  const minY = VB_H * (1 - zoom);
  return {
    x: Math.min(0, Math.max(minX, pan.x)),
    y: Math.min(0, Math.max(minY, pan.y)),
  };
}

/**
 * Multi-property abstract SVG map for the /imoveis discovery view. Reuses
 * the grid-lines-and-pin visual language from map-section.tsx (used on the
 * single-property detail page) but scaled up to plot every filtered
 * property at once, clustered by bairro/cidade.
 *
 * Supports real pan + zoom: scroll/pinch-to-zoom, click-and-drag to pan,
 * and +/-/reset controls — matching the affordance a real-estate map
 * implies (grid lines, "Localização" framing) rather than a static image.
 */
export function DiscoveryMap({
  properties,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
}: {
  properties: Property[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Pan>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPinching, setIsPinching] = useState(false);

  // Mirrors of the latest zoom/pan for use inside event handlers, so wheel
  // and pinch gestures always read the current value without depending on
  // (and re-binding listeners for) every render.
  const zoomRef = useRef(zoom);
  const panRef = useRef(pan);
  useEffect(() => {
    zoomRef.current = zoom;
    panRef.current = pan;
  }, [zoom, pan]);

  const dragState = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startPan: Pan;
    dragging: boolean;
  } | null>(null);
  const pinchState = useRef<{ distance: number; zoom: number } | null>(null);

  const pins = useMemo(
    () =>
      properties.map((property) => {
        const pos = getPropertyPosition(property);
        return { property, x: (pos.x / 100) * VB_W, y: (pos.y / 100) * VB_H };
      }),
    [properties],
  );

  const gridCols = Array.from({ length: 7 }, (_, i) => (i / 6) * VB_W);
  const gridRows = Array.from({ length: 5 }, (_, i) => (i / 4) * VB_H);

  /** Convert a client (viewport) coordinate to the fixed 0..VB_W/0..VB_H space. */
  const toSvgPoint = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: VB_W / 2, y: VB_H / 2 };
    return {
      x: ((clientX - rect.left) / rect.width) * VB_W,
      y: ((clientY - rect.top) / rect.height) * VB_H,
    };
  }, []);

  /** Change zoom to `nextZoomRaw` while keeping the (svgX, svgY) point fixed on screen. */
  const zoomAround = useCallback((svgX: number, svgY: number, nextZoomRaw: number) => {
    const prevZoom = zoomRef.current;
    const prevPan = panRef.current;
    const nextZoom = clampZoom(nextZoomRaw);
    const localX = (svgX - prevPan.x) / prevZoom;
    const localY = (svgY - prevPan.y) / prevZoom;
    const nextPan = clampPan({ x: svgX - localX * nextZoom, y: svgY - localY * nextZoom }, nextZoom);
    zoomRef.current = nextZoom;
    panRef.current = nextPan;
    setZoom(nextZoom);
    setPan(nextPan);
  }, []);

  function zoomByStep(direction: 1 | -1) {
    // Zoom around the current viewport center, so the +/- controls feel
    // anchored to what's on screen rather than jumping back to the origin.
    const rect = containerRef.current?.getBoundingClientRect();
    const visibleCenter = rect
      ? toSvgPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
      : { x: VB_W / 2, y: VB_H / 2 };
    zoomAround(visibleCenter.x, visibleCenter.y, zoomRef.current + direction * 0.6);
  }

  function resetView() {
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  // Native, non-passive wheel listener so we can preventDefault (page scroll
  // must not hijack a wheel gesture aimed at the map) while zooming toward
  // the cursor, the way any real map does.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(event: WheelEvent) {
      event.preventDefault();
      const point = toSvgPoint(event.clientX, event.clientY);
      const delta = -event.deltaY * 0.0025;
      zoomAround(point.x, point.y, zoomRef.current * (1 + delta));
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [toSvgPoint, zoomAround]);

  // Pointer-based pan: works for mouse drag and single-finger touch drag
  // alike. A short-movement release is left alone so pin clicks underneath
  // still fire as ordinary clicks.
  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" && pinchState.current) return;
    dragState.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPan: panRef.current,
      dragging: false,
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dxClient = event.clientX - drag.startClientX;
    const dyClient = event.clientY - drag.startClientY;
    if (!drag.dragging && Math.hypot(dxClient, dyClient) < DRAG_THRESHOLD) return;

    if (!drag.dragging) {
      drag.dragging = true;
      setIsDragging(true);
      containerRef.current?.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (dxClient / rect.width) * VB_W;
    const dy = (dyClient / rect.height) * VB_H;
    const nextPan = clampPan({ x: drag.startPan.x + dx, y: drag.startPan.y + dy }, zoomRef.current);
    panRef.current = nextPan;
    setPan(nextPan);
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragState.current;
    if (drag?.dragging) {
      try {
        containerRef.current?.releasePointerCapture(event.pointerId);
      } catch {
        // already released
      }
      setIsDragging(false);
    }
    dragState.current = null;
  }

  // Two-finger pinch to zoom on touch devices.
  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    if (event.touches.length !== 2) return;
    dragState.current = null;
    setIsDragging(false);
    setIsPinching(true);
    const [a, b] = [event.touches[0], event.touches[1]];
    pinchState.current = {
      distance: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
      zoom: zoomRef.current,
    };
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (event.touches.length !== 2 || !pinchState.current) return;
    event.preventDefault();
    const [a, b] = [event.touches[0], event.touches[1]];
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const midpoint = toSvgPoint((a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2);
    const scaleFactor = distance / pinchState.current.distance;
    zoomAround(midpoint.x, midpoint.y, pinchState.current.zoom * scaleFactor);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (event.touches.length < 2) {
      pinchState.current = null;
      setIsPinching(false);
    }
  }

  const isZoomed = zoom > 1.001;

  // Keyboard equivalent for the pointer-driven pan: arrow keys nudge the pan
  // when the map surface itself (not a pin inside it) is focused, mirroring
  // what dragging does. Guarded to the container so it never intercepts the
  // Enter/Space that pins already handle for selection.
  function handleContainerKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const step = 28 / zoomRef.current;
    let dx = 0;
    let dy = 0;
    switch (event.key) {
      case "ArrowUp":
        dy = step;
        break;
      case "ArrowDown":
        dy = -step;
        break;
      case "ArrowLeft":
        dx = step;
        break;
      case "ArrowRight":
        dx = -step;
        break;
      case "Home":
        event.preventDefault();
        resetView();
        return;
      default:
        return;
    }
    event.preventDefault();
    const nextPan = clampPan({ x: panRef.current.x + dx, y: panRef.current.y + dy }, zoomRef.current);
    panRef.current = nextPan;
    setPan(nextPan);
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full touch-none select-none"
      style={{ cursor: isDragging ? "grabbing" : isZoomed ? "grab" : "default" }}
      role="group"
      aria-label="Mapa dos imóveis filtrados, agrupados por bairro. Use scroll ou pinça para zoom, arraste para navegar. Com o mapa focado, use as setas do teclado para navegar e Home para redefinir."
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleContainerKeyDown}
    >
      {/*
       * Not aria-hidden: the pins rendered inside are real focusable
       * role="button" elements with their own aria-label (see below) — an
       * aria-hidden ancestor would silently drop them from the accessibility
       * tree even though they'd remain keyboard-reachable. The wrapping div's
       * role="group" + aria-label above gives the map itself a description;
       * this svg stays a plain, exposed container so its interactive
       * children are announced individually.
       */}
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-full w-full">
        <rect x={0} y={0} width={VB_W} height={VB_H} fill="#EFEAE3" />
        <g
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            transition: reduced || isDragging || isPinching ? "none" : "transform 120ms ease-out",
          }}
        >
          {gridRows.map((y, i) => (
            <line key={`h${i}`} x1={0} y1={y} x2={VB_W} y2={y} stroke="#DDD5C8" strokeWidth={1 / zoom} />
          ))}
          {gridCols.map((x, i) => (
            <line key={`v${i}`} x1={x} y1={0} x2={x} y2={VB_H} stroke="#DDD5C8" strokeWidth={1 / zoom} />
          ))}

          {CITY_LABELS.map((c) => (
            <text
              key={c.name}
              x={(c.x / 100) * VB_W}
              y={(c.y / 100) * VB_H}
              fontSize={9}
              letterSpacing={1.2}
              className="fill-[#6B6157] uppercase"
              opacity={0.6}
            >
              {c.name}
            </text>
          ))}

          {pins.map(({ property, x, y }) => {
            const selected = property.id === selectedId;
            const hovered = property.id === hoveredId;
            const scale = (selected ? 1.45 : hovered ? 1.15 : 1) / zoom;

            return (
              <g
                key={property.id}
                style={{
                  transformOrigin: `${x}px ${y}px`,
                  transform: `scale(${scale})`,
                  transition: reduced ? "none" : "transform 150ms ease-out",
                  cursor: "pointer",
                }}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => onSelect(property.id)}
                onMouseEnter={() => onHover(property.id)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(property.id)}
                onBlur={() => onHover(null)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(property.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-pressed={selected}
                aria-label={`${property.titulo} — ${property.bairro} — ${formatBRL(property.preco)}`}
              >
                {selected && (
                  <circle
                    cx={x}
                    cy={y}
                    r={13}
                    fill="none"
                    stroke="#2F4A3B"
                    strokeWidth={1.5}
                    opacity={0.5}
                  />
                )}
                <circle cx={x} cy={y} r={9} fill="#2F4A3B" opacity={selected || hovered ? 1 : 0.82} />
                <circle cx={x} cy={y} r={3} fill="#F8F5F0" />
              </g>
            );
          })}
        </g>
      </svg>

      <div className="pointer-events-none absolute right-2 top-2 flex flex-col gap-1">
        <button
          type="button"
          data-cursor-hover
          onClick={() => zoomByStep(1)}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Aumentar zoom"
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-sm border border-[#DDD5C8] bg-[#F8F5F0]/95 text-[#241E1A] shadow-sm transition-colors hover:border-[#2F4A3B] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          data-cursor-hover
          onClick={() => zoomByStep(-1)}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Diminuir zoom"
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-sm border border-[#DDD5C8] bg-[#F8F5F0]/95 text-[#241E1A] shadow-sm transition-colors hover:border-[#2F4A3B] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        {isZoomed && (
          <button
            type="button"
            data-cursor-hover
            onClick={resetView}
            aria-label="Redefinir mapa"
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-sm border border-[#DDD5C8] bg-[#F8F5F0]/95 text-[#241E1A] shadow-sm transition-colors hover:border-[#2F4A3B]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
