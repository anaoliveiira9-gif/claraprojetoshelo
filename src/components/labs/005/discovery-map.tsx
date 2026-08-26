"use client";

import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { formatBRL, type Property } from "./data";
import { CITY_LABELS, getPropertyPosition } from "./map-data";

const VB_W = 400;
const VB_H = 260;

/**
 * Multi-property abstract SVG map for the /imoveis discovery view. Reuses
 * the grid-lines-and-pin visual language from map-section.tsx (used on the
 * single-property detail page) but scaled up to plot every filtered
 * property at once, clustered by bairro/cidade.
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

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-full w-full"
      role="img"
      aria-label="Mapa dos imóveis filtrados, agrupados por bairro"
    >
      <rect x={0} y={0} width={VB_W} height={VB_H} fill="#EFEAE3" />
      {gridRows.map((y, i) => (
        <line key={`h${i}`} x1={0} y1={y} x2={VB_W} y2={y} stroke="#DDD5C8" strokeWidth={1} />
      ))}
      {gridCols.map((x, i) => (
        <line key={`v${i}`} x1={x} y1={0} x2={x} y2={VB_H} stroke="#DDD5C8" strokeWidth={1} />
      ))}

      {CITY_LABELS.map((c) => (
        <text
          key={c.name}
          x={(c.x / 100) * VB_W}
          y={(c.y / 100) * VB_H}
          fontSize={9}
          letterSpacing={1.2}
          className="fill-[#7A6F63] uppercase"
          opacity={0.6}
        >
          {c.name}
        </text>
      ))}

      {pins.map(({ property, x, y }) => {
        const selected = property.id === selectedId;
        const hovered = property.id === hoveredId;
        const scale = selected ? 1.45 : hovered ? 1.15 : 1;

        return (
          <g
            key={property.id}
            style={{
              transformOrigin: `${x}px ${y}px`,
              transform: `scale(${scale})`,
              transition: reduced ? "none" : "transform 150ms ease-out",
              cursor: "pointer",
            }}
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
    </svg>
  );
}
