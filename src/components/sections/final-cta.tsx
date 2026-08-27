"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { useSiteContent } from "@/components/site-content-provider";

export function FinalCta() {
  const { finalCta } = useSiteContent();
  return (
    <section className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 text-paper/[0.03]"
      >
        <Logo className="h-[420px] w-[420px]" />
      </div>

      <div className="relative mx-auto flex max-w-[1600px] flex-col items-start gap-10">
        <p className="font-display text-[clamp(2rem,6.5vw,5.5rem)] font-semibold uppercase leading-[0.95] tracking-tight">
          {finalCta.headlineLine1}
          <br /> {finalCta.headlineLine2}
        </p>

        <Link
          href="/start-a-project"
          data-cursor-hover
          className="group flex items-center gap-3 bg-accent px-8 py-4 font-mono text-sm uppercase tracking-[0.25em] text-ink transition-colors hover:bg-paper"
        >
          {finalCta.ctaLabel}
          <span className="transition-transform group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
