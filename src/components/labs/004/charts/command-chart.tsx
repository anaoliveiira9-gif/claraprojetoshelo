"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import type { ChartPoint } from "@/components/labs/004/charts/line-chart";

const WIDTH = 640;
const HEIGHT = 240;
const PAD_X = 24;
const PAD_TOP = 20;
const PAD_BOTTOM = 32;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Linearly resamples a value series to a fixed point count, preserving shape. */
function resample(values: number[], n: number): number[] {
  if (values.length === n) return values;
  if (values.length === 1) return Array.from({ length: n }, () => values[0]);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const pos = (i / Math.max(1, n - 1)) * (values.length - 1);
    const lo = Math.floor(pos);
    const hi = Math.min(values.length - 1, Math.ceil(pos));
    const frac = pos - lo;
    out.push(values[lo] + (values[hi] - values[lo]) * frac);
  }
  return out;
}

function buildPaths(values: number[]) {
  const min = Math.min(0, ...values);
  const max = Math.max(...values, 1);
  const range = max - min || 1;
  const innerW = WIDTH - PAD_X * 2;
  const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const pts = values.map((v, i) => ({
    x: PAD_X + (i / Math.max(1, values.length - 1)) * innerW,
    y: PAD_TOP + innerH - ((v - min) / range) * innerH,
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].x.toFixed(2)},${(PAD_TOP + innerH).toFixed(2)} L${pts[0].x.toFixed(2)},${(PAD_TOP + innerH).toFixed(2)} Z`;
  return { line, area, pts };
}

const GRID_LINES = [0, 0.25, 0.5, 0.75, 1].map((f) => PAD_TOP + (HEIGHT - PAD_TOP - PAD_BOTTOM) * f);

/**
 * A line + area chart whose values morph smoothly between datasets — used to
 * make metric/period switches feel like one continuous instrument rather
 * than a swap. Point counts differ across periods, so incoming data is
 * resampled to match before interpolating.
 */
export function CommandChart({
  data,
  color = "var(--orbit-accent)",
  formatValue = (v: number) => String(Math.round(v)),
}: {
  data: ChartPoint[];
  color?: string;
  formatValue?: (value: number) => string;
}) {
  const reduced = usePrefersReducedMotion();
  const toValues = data.map((d) => d.value);
  const labels = data.map((d) => d.label);

  const prevRef = useRef<number[]>(toValues);
  const isFirstRender = useRef(true);
  const [display, setDisplay] = useState<number[]>(toValues);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevRef.current = toValues;
      return;
    }

    const from = resample(prevRef.current, toValues.length);
    prevRef.current = toValues;

    if (reduced) {
      return;
    }

    const controls = animate(0, 1, {
      duration: 0.65,
      ease: EASE,
      onUpdate: (p) => {
        setDisplay(from.map((v, i) => v + (toValues[i] - v) * p));
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reduced]);

  const shown = reduced ? toValues : display;
  const paths = buildPaths(shown);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full"
      role="img"
      aria-label="Gráfico de tendência"
    >
      {GRID_LINES.map((y, i) => (
        <line
          key={i}
          x1={PAD_X}
          x2={WIDTH - PAD_X}
          y1={y}
          y2={y}
          stroke="var(--orbit-border)"
          strokeWidth={1}
        />
      ))}
      <path d={paths.area} fill={color} opacity={0.08} />
      <path d={paths.line} fill="none" stroke={color} strokeWidth={2} />
      {paths.pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === paths.pts.length - 1 ? 3.5 : 2.5}
          fill={color}
        >
          <title>{`${labels[i]}: ${formatValue(shown[i])}`}</title>
        </circle>
      ))}
      {labels.map((label, i) =>
        i % Math.ceil(labels.length / 8) === 0 || i === labels.length - 1 ? (
          <text
            key={`label-${i}`}
            x={paths.pts[i]?.x}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-[var(--orbit-secondary)]"
            fontSize={10}
          >
            {label}
          </text>
        ) : null,
      )}
    </svg>
  );
}

/** Animates a scalar between successive targets — used for headline numbers. */
export function useAnimatedValue(target: number) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevRef.current = target;
      return;
    }

    if (reduced) {
      prevRef.current = target;
      return;
    }

    const controls = animate(prevRef.current, target, {
      duration: 0.65,
      ease: EASE,
      onUpdate: setDisplay,
    });
    prevRef.current = target;
    return () => controls.stop();
  }, [target, reduced]);

  return reduced ? target : display;
}
