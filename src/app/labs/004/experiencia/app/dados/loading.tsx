"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

function SkeletonBlock({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      className={cn(
        "rounded bg-[var(--orbit-border)]",
        !reduced && "animate-pulse",
        className,
      )}
    />
  );
}

export default function DadosLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SkeletonBlock className="h-6 w-32" />
        <SkeletonBlock className="h-4 w-64" />
      </div>

      <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--orbit-border)] p-4">
          <div className="flex flex-col gap-2">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-3 w-32" />
          </div>
          <SkeletonBlock className="h-8 w-64" />
        </div>

        <div className="flex flex-col gap-0">
          <div className="flex gap-6 border-b border-[var(--orbit-border)] px-4 py-2.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-3 w-16" />
            ))}
          </div>
          {Array.from({ length: 10 }).map((_, row) => (
            <div
              key={row}
              className="flex items-center gap-6 border-b border-[var(--orbit-border)] px-4 py-3 last:border-b-0"
            >
              {Array.from({ length: 8 }).map((_, col) => (
                <SkeletonBlock key={col} className="h-3.5 w-16" />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 py-3">
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="h-7 w-40" />
        </div>
      </div>
    </div>
  );
}
