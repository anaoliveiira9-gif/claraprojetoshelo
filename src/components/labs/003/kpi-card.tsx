import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  unit,
  delta,
  trend,
  caption,
}: {
  label: string;
  value: string;
  unit?: string;
  delta: string;
  trend: "up" | "down";
  caption?: string;
}) {
  const positive = trend === "up";
  return (
    <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--orbit-secondary)]">
        {label}
      </p>
      <div className="mt-2.5 flex items-baseline gap-1.5">
        <span className="font-[family-name:var(--font-jetbrains)] text-2xl font-medium tabular-nums text-[var(--orbit-ink)]">
          {value}
        </span>
        {unit ? (
          <span className="text-sm text-[var(--orbit-secondary)]">{unit}</span>
        ) : null}
      </div>
      <div className="mt-2.5 flex items-center gap-1.5">
        <span
          className={cn(
            "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-[family-name:var(--font-jetbrains)] text-xs tabular-nums",
            positive
              ? "bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]"
              : "bg-[var(--orbit-negative)]/10 text-[var(--orbit-negative)]",
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
          ) : (
            <ArrowDownRight className="h-3 w-3" strokeWidth={2.25} />
          )}
          {delta}
        </span>
        {caption ? (
          <span className="text-xs text-[var(--orbit-secondary)]">{caption}</span>
        ) : null}
      </div>
    </div>
  );
}
