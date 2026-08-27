import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Shared visual atoms for the Noir micro-site. No photography is available,
 * so atmosphere is built entirely from low-key radial gradients standing
 * in for candlelight, plus hairline rules and generous negative space.
 */

/**
 * Noir's own keyboard-focus ring. The dark room (#0D0B0A) and brick-red
 * accent (#7C2A2A) mean ALUMNA's shared orange `:focus-visible` ring can
 * land on low-contrast ground here — every Noir control gets an explicit,
 * on-brand ring instead (warm cream, always legible against this palette).
 */
export const NOIR_FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1E9DD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0B0A]";

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
        "font-sans text-[11px] uppercase tracking-[0.35em] text-[#F1E9DD]/55",
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
 *
 * `glowX`/`glowY` (0–100) move the candle's position and `intensity`
 * (0–1) scales its warmth, so callers can retune the same panel to track
 * a live choice (a date, a table, a time) rather than swapping between
 * two fixed looks.
 */
export function AmbiancePanel({
  className,
  variant = "warm",
  glowX,
  glowY,
  intensity = 1,
  style,
  children,
}: {
  className?: string;
  variant?: "warm" | "deep";
  glowX?: number;
  glowY?: number;
  intensity?: number;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const x = glowX ?? (variant === "warm" ? 30 : 70);
  const y = glowY ?? (variant === "warm" ? 20 : 30);
  const glowAlpha = Math.max(0, Math.min(1, intensity)) * (variant === "warm" ? 0.35 : 0.22);
  const emberAlpha = Math.max(0, Math.min(1, intensity)) * 0.08;

  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-sm border border-[#F1E9DD]/10",
        className,
      )}
      style={{
        background: `radial-gradient(120% 90% at ${x}% ${y}%, rgba(124,42,42,${glowAlpha}) 0%, rgba(13,11,10,0) 55%), radial-gradient(80% 70% at ${100 - x}% ${100 - y}%, rgba(241,233,221,${emberAlpha}) 0%, rgba(13,11,10,0) 60%), #0D0B0A`,
        transition: "background 0.5s ease-out",
        ...style,
      }}
    >
      <div className="absolute inset-0 [background:repeating-linear-gradient(0deg,rgba(241,233,221,0.02)_0px,rgba(241,233,221,0.02)_1px,transparent_1px,transparent_3px)]" />
      {children}
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
    NOIR_FOCUS_RING,
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
    NOIR_FOCUS_RING,
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
