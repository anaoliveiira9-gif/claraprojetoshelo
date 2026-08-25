import { cn } from "@/lib/utils";

/**
 * Placeholder mark: a single-stroke Archimedean spiral.
 * Swap this file's <path> for the real ALUMNA logo when it's ready —
 * every call site just renders <Logo />, so nothing else needs to change.
 */
export function Logo({ className }: { className?: string }) {
  const points: string[] = [];
  const turns = 2.75;
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2;
    const r = (i / steps) * 11 + 1;
    const x = 16 + r * Math.cos(t);
    const y = 16 + r * Math.sin(t);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-6 w-6", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polyline
        points={points.join(" ")}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
