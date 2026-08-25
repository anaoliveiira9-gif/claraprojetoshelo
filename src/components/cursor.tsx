"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight custom cursor: a small dot that scales up over interactive
 * elements. Driven entirely through refs/DOM (no React state) so it never
 * triggers re-renders, and it's skipped on touch devices and when the user
 * prefers reduced motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.body.classList.add("cursor-none-fine");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const move = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
    };

    const render = () => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        dot.dataset.state = "hover";
      } else {
        dot.dataset.state = "default";
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none-fine");
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      data-state="default"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-2.5 w-2.5 rounded-full bg-accent transition-[width,height] duration-150 ease-out will-change-transform [@media(pointer:fine)]:block data-[state=hover]:h-8 data-[state=hover]:w-8 data-[state=hover]:bg-accent/30 data-[state=hover]:ring-1 data-[state=hover]:ring-accent"
    />
  );
}
