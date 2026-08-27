"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { SpiralMark } from "@/components/spiral-mark";
import { useSiteContent } from "@/components/site-content-provider";

export function Hero() {
  const { hero } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.7, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-line px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-12"
    >
      <SpiralMark
        sectionRef={sectionRef}
        className="absolute -right-24 -top-24 h-[480px] w-[480px] text-accent/[0.06]"
      />

      {/* Opening line: draws itself open as the hero scrolls past, echoing
          the spiral's expansion and handing off into the Labs section. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: lineScale, opacity: lineOpacity }}
        className="absolute inset-x-0 bottom-0 h-px origin-center bg-accent"
      />

      <div className="mx-auto flex max-w-[1600px] flex-col">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-paper-faint">
          <span>{hero.eyebrow}</span>
          <span className="hidden sm:inline">{hero.coordinates}</span>
        </div>

        <h1 className="mt-10 font-display text-[clamp(3rem,11vw,9rem)] font-semibold uppercase leading-[0.88] tracking-tight">
          {hero.titleLine1}
        </h1>
        <p className="mt-2 font-display text-[clamp(1.5rem,4.5vw,3rem)] font-medium uppercase leading-none tracking-tight text-paper-dim">
          {hero.titleLine2}
        </p>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-paper">
            {hero.lead}
          </p>

          <div className="flex flex-col items-start gap-6">
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
              {hero.description}
            </p>
            <Link
              href="/start-a-project"
              data-cursor-hover
              className="group flex items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
            >
              {hero.ctaLabel}
              <span className="transition-transform group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
