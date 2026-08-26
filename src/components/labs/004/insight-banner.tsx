import { TrendingUp } from "lucide-react";

export function InsightBanner({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[var(--orbit-border)] border-l-2 border-l-[var(--orbit-accent)] bg-[var(--orbit-surface)] px-4 py-3.5">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]">
        <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.25} />
      </span>
      <div>
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--orbit-accent)]">
          Insight
        </p>
        <p className="mt-0.5 text-sm leading-relaxed text-[var(--orbit-ink)]">{text}</p>
      </div>
    </div>
  );
}
