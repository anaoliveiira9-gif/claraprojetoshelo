"use client";

import { cn } from "@/lib/utils";

export function ToggleSwitch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      data-cursor-hover
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-150",
        checked
          ? "border-[var(--orbit-accent)] bg-[var(--orbit-accent)]"
          : "border-[var(--orbit-border)] bg-[var(--orbit-bg)]",
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 rounded-full bg-[var(--orbit-surface)] shadow-sm transition-transform duration-150",
          checked ? "translate-x-[19px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
}
