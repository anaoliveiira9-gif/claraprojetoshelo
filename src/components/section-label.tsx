import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  label,
  className,
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-paper-dim",
        className
      )}
    >
      {index && <span className="text-accent">{index}</span>}
      <span>{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
