"use client";

import { useEffect, useRef, type RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * ALUMNA's interaction signature. Wraps the spiral placeholder (see
 * src/components/logo.tsx — swap its <polyline> for the real logo when
 * it's ready; nothing here needs to change) with three independent
 * transform layers so they never fight each other:
 *
 *  1. outer  — scroll-driven scale/rotate/opacity, tracked against
 *              `sectionRef`'s own bounds: as the hero scrolls past, the
 *              spiral expands, turns further and fades — the sense of
 *              the site "opening" out of it into the Labs section below.
 *  2. middle — the existing slow continuous CSS rotation.
 *  3. inner  — a small cursor-driven tilt/offset, written directly to
 *              the DOM via rAF (no React state) so it never re-renders.
 *
 * All three only ever touch transform/opacity, and the cursor layer is
 * skipped entirely on touch devices and when reduced motion is preferred.
 */
export function SpiralMark({
  sectionRef,
  className,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const tiltRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    function onMove(event: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = Math.max(
        -1,
        Math.min(1, (event.clientX - cx) / (window.innerWidth / 2))
      );
      targetY = Math.max(
        -1,
        Math.min(1, (event.clientY - cy) / (window.innerHeight / 2))
      );
    }

    function tick() {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      el!.style.transform = `translate3d(${(x * -8).toFixed(2)}px, ${(y * -8).toFixed(2)}px, 0) rotate(${(x * 5).toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      style={reducedMotion ? undefined : { scale, rotate, opacity }}
    >
      <div className="h-full w-full animate-spin-slow">
        <div ref={tiltRef} className="h-full w-full will-change-transform">
          <Logo className="h-full w-full" />
        </div>
      </div>
    </motion.div>
  );
}
