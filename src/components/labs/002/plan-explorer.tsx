"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { AbstractComposition } from "@/components/labs/002/abstract-composition";
import type { FloorPlan as FloorPlanData } from "@/components/labs/002/data";

const VIEW_W = 400;
const VIEW_H = 300;
const INK = "#161615";
const ACCENT = "#2E4A5E";

/**
 * The centerpiece interaction of ATELIER 17: PLANTA → ESPAÇO → FOTOGRAFIA.
 *
 * The floor plan drives the content — selecting (hover, focus, or click/tap)
 * a room highlights it on the drafting plan and swaps in that room's
 * abstract composition + editorial caption. Nothing above or below this
 * block reflows when the selection changes: only opacity/transform animate
 * on already-mounted elements.
 */
export function PlanExplorer({
  plan,
  className,
}: {
  plan: FloorPlanData;
  className?: string;
}) {
  const rooms = plan.rooms;
  const firstId = rooms[0]?.id ?? "";
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(firstId || null);
  const reduced = usePrefersReducedMotion();
  const [ox, oy, ow, oh] = plan.outer;

  const activeId = hoveredId ?? lockedId ?? firstId;
  const activeRoom = rooms.find((r) => r.id === activeId) ?? rooms[0];

  const dur = reduced ? 0 : 0.35;
  const fade = reduced ? 0 : 0.28;

  if (!activeRoom) return null;

  function select(id: string) {
    setLockedId(id);
    setHoveredId(id);
  }

  function hover(id: string) {
    setHoveredId(id);
  }

  function unhover() {
    setHoveredId(null);
  }

  return (
    <div className={cn("grid gap-8 sm:grid-cols-2 sm:gap-10", className)}>
      {/* Plan */}
      <div className="relative">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Planta baixa interativa. Ambiente selecionado: ${activeRoom.label}`}
        >
          <rect x={ox} y={oy} width={ow} height={oh} fill="none" stroke={INK} strokeOpacity={0.3} strokeWidth={1.5} />
          {rooms.map((room) => {
            const isActive = room.id === activeRoom.id;
            return (
              <g key={room.id}>
                <motion.rect
                  x={room.rect[0]}
                  y={room.rect[1]}
                  width={room.rect[2]}
                  height={room.rect[3]}
                  fill={ACCENT}
                  initial={false}
                  animate={{
                    fillOpacity: isActive ? 0.16 : 0,
                    stroke: isActive ? ACCENT : INK,
                    strokeOpacity: isActive ? 1 : 0.28,
                    strokeWidth: isActive ? 2 : 1,
                  }}
                  transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.text
                  x={room.rect[0] + 8}
                  y={room.rect[1] + 16}
                  fontSize="8"
                  letterSpacing="0.05em"
                  className="[font-family:var(--font-atelier-mono)] uppercase"
                  initial={false}
                  animate={{ fill: isActive ? ACCENT : INK, opacity: isActive ? 1 : 0.4 }}
                  transition={{ duration: dur }}
                >
                  {room.id}
                </motion.text>
              </g>
            );
          })}
        </svg>

        {rooms.map((room) => {
          const left = (room.rect[0] / VIEW_W) * 100;
          const top = (room.rect[1] / VIEW_H) * 100;
          const width = (room.rect[2] / VIEW_W) * 100;
          const height = (room.rect[3] / VIEW_H) * 100;
          const isActive = room.id === activeRoom.id;
          return (
            <button
              key={room.id}
              type="button"
              data-cursor-hover
              aria-pressed={isActive}
              aria-label={room.label}
              className="absolute cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A5E]"
              style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
              onMouseEnter={() => hover(room.id)}
              onMouseLeave={unhover}
              onFocus={() => hover(room.id)}
              onBlur={unhover}
              onClick={() => select(room.id)}
            />
          );
        })}
      </div>

      {/* Space + abstract photography */}
      <div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Selecionar ambiente">
          {rooms.map((room) => {
            const isActive = room.id === activeRoom.id;
            return (
              <button
                key={room.id}
                type="button"
                data-cursor-hover
                aria-pressed={isActive}
                onMouseEnter={() => hover(room.id)}
                onMouseLeave={unhover}
                onFocus={() => hover(room.id)}
                onBlur={unhover}
                onClick={() => select(room.id)}
                className={cn(
                  "border px-3 py-1.5 [font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.14em] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1F0EB]",
                  isActive
                    ? "border-[#2E4A5E] bg-[#2E4A5E]/10 text-[#2E4A5E]"
                    : "border-[#161615]/20 text-[#161615]/65 hover:border-[#161615]/40 hover:text-[#161615]",
                )}
              >
                {room.id}
              </button>
            );
          })}
        </div>

        <div className="relative mt-6 aspect-[4/3] overflow-hidden border border-[#161615]/15">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeRoom.id}
              className="absolute inset-0"
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
            >
              <AbstractComposition variant={activeRoom.variant ?? 1} className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-4 min-h-[6.5rem] sm:min-h-[5.5rem]" aria-live="polite">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeRoom.id}
              className="absolute inset-x-0 top-0"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: fade, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.15em] text-[#2E4A5E]">
                {activeRoom.label}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[#161615]/75">
                {activeRoom.caption ?? activeRoom.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
