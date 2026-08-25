import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Shared visual atoms for the Noir micro-site. No photography is available,
 * so atmosphere is built entirely from low-key radial gradients standing
 * in for candlelight, plus hairline rules and generous negative space.
 */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-[11px] uppercase tracking-[0.35em] text-[#F1E9DD]/50",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Display({
  as: Tag = "h1",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-[family-name:var(--font-noir-display)] font-medium leading-[1.05] text-[#F1E9DD]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Rule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-12 bg-[#7C2A2A]", className)}
    />
  );
}

/**
 * A softly-lit gradient panel that reads as "ambiance" rather than a
 * broken image placeholder — low-key radial glows evoking candlelight.
 */
export function AmbiancePanel({
  className,
  variant = "warm",
}: {
  className?: string;
  variant?: "warm" | "deep";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-sm border border-[#F1E9DD]/10",
        className,
      )}
      style={{
        background:
          variant === "warm"
            ? "radial-gradient(120% 90% at 30% 20%, rgba(124,42,42,0.35) 0%, rgba(13,11,10,0) 55%), radial-gradient(80% 70% at 75% 75%, rgba(241,233,221,0.08) 0%, rgba(13,11,10,0) 60%), #0D0B0A"
            : "radial-gradient(100% 80% at 70% 30%, rgba(124,42,42,0.22) 0%, rgba(13,11,10,0) 60%), radial-gradient(60% 60% at 20% 85%, rgba(241,233,221,0.05) 0%, rgba(13,11,10,0) 65%), #0D0B0A",
      }}
    >
      <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(241,233,221,0.02)_0px,rgba(241,233,221,0.02)_1px,transparent_1px,transparent_3px)]" />
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm bg-[#7C2A2A] px-7 py-3 font-sans text-[11px] uppercase tracking-[0.25em] text-[#F1E9DD] transition-colors hover:bg-[#8f3232] disabled:cursor-not-allowed disabled:opacity-40",
    className,
  );

  if (href) {
    return (
      <Link href={href} data-cursor-hover className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor-hover
      className={classes}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  href,
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm border border-[#F1E9DD]/20 px-7 py-3 font-sans text-[11px] uppercase tracking-[0.25em] text-[#F1E9DD]/80 transition-colors hover:border-[#F1E9DD]/50 hover:text-[#F1E9DD] disabled:cursor-not-allowed disabled:opacity-40",
    className,
  );

  if (href) {
    return (
      <Link href={href} data-cursor-hover className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor-hover
      className={classes}
    >
      {children}
    </button>
  );
}
