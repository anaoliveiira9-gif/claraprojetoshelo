import { cn } from "@/lib/utils";

/**
 * Small geometric mark for ORBIT — three concentric arcs suggesting an
 * orbital path around a fixed point. Deliberately simple, no gradients.
 */
export function OrbitMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="4.2"
        ry="10"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.55"
      />
    </svg>
  );
}

export function OrbitWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-lg font-semibold tracking-tight text-[var(--orbit-ink)]",
        className,
      )}
    >
      <OrbitMark className="text-[var(--orbit-accent)]" />
      Orbit
    </span>
  );
}
