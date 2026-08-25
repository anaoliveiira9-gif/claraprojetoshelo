"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import type { FloorPlan as FloorPlanData } from "@/components/labs/002/data";

const VIEW_W = 400;
const VIEW_H = 300;
const INK = "#161615";
const ACCENT = "#2E4A5E";

export function FloorPlan({ plan }: { plan: FloorPlanData }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const [ox, oy, ow, oh] = plan.outer;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Planta baixa esquemática, com marcadores de ambientes"
      >
        <rect x={ox} y={oy} width={ow} height={oh} fill="none" stroke={INK} strokeWidth={1.5} />
        {plan.rooms.map((room) => (
          <rect
            key={room.id}
            x={room.rect[0]}
            y={room.rect[1]}
            width={room.rect[2]}
            height={room.rect[3]}
            fill="none"
            stroke={INK}
            strokeOpacity={0.5}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`tick-${i}`}
            x1={ox + (i * ow) / 8}
            y1={oy + oh}
            x2={ox + (i * ow) / 8}
            y2={oy + oh + 6}
            stroke={ACCENT}
            strokeWidth={1}
          />
        ))}
        <text
          x={ox}
          y={oy + oh + 20}
          fill={ACCENT}
          fontSize="8"
          className="[font-family:var(--font-atelier-mono)]"
        >
          N ↑ · ESCALA GRÁFICA
        </text>
      </svg>

      {plan.rooms.map((room) => {
        const cx = ((room.rect[0] + room.rect[2] / 2) / VIEW_W) * 100;
        const cy = ((room.rect[1] + room.rect[3] / 2) / VIEW_H) * 100;
        const isOpen = openId === room.id;
        return (
          <div
            key={room.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${cx}%`, top: `${cy}%` }}
          >
            <button
              type="button"
              data-cursor-hover
              onMouseEnter={() => setOpenId(room.id)}
              onMouseLeave={() => setOpenId((current) => (current === room.id ? null : current))}
              onFocus={() => setOpenId(room.id)}
              onBlur={() => setOpenId((current) => (current === room.id ? null : current))}
              onClick={() => setOpenId((current) => (current === room.id ? null : room.id))}
              aria-expanded={isOpen}
              aria-label={room.label}
              className={cn(
                "relative flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                isOpen ? "border-[#2E4A5E] bg-[#2E4A5E]" : "border-[#2E4A5E] bg-[#FAFAF8]",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  isOpen ? "bg-[#FAFAF8]" : "bg-[#2E4A5E]",
                )}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 4 }}
                  transition={{ duration: reduced ? 0 : 0.15 }}
                  className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[220px] -translate-x-1/2 border border-[#161615] bg-[#FAFAF8] px-3 py-2 text-left shadow-[3px_3px_0_#161615]"
                >
                  <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase leading-snug tracking-[0.08em] text-[#161615]">
                    {room.label}
                  </p>
                  <p className="mt-1 [font-family:var(--font-atelier-mono)] text-[9px] leading-snug text-[#2E4A5E]">
                    {room.note}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
