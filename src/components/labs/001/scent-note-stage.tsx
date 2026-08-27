"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  PRODUCTS,
  SCENT_NOTES,
  formatPrice,
  type ScentNoteId,
} from "@/components/labs/001/products";
import { ScentObject } from "@/components/labs/001/scent-object";
import { useHoverCapable } from "@/components/labs/001/use-hover-capable";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const DEFAULT_MOOD =
  "Cinco notas. Nove composições. Escolha por onde sentir primeiro.";

export function ScentNoteStage() {
  const [active, setActive] = useState<ScentNoteId | null>(null);
  const hoverCapable = useHoverCapable();
  const reducedMotion = usePrefersReducedMotion();

  const activeInfo = active ? SCENT_NOTES.find((n) => n.id === active) : null;
  const transitionDuration = reducedMotion ? 0 : 0.5;
  const fadeDuration = reducedMotion ? 0 : 0.28;

  function handleEnter(id: ScentNoteId) {
    if (hoverCapable) setActive(id);
  }

  function handleLeaveAll() {
    if (hoverCapable) setActive(null);
  }

  function handleTap(id: ScentNoteId) {
    if (!hoverCapable) setActive((prev) => (prev === id ? null : id));
  }

  return (
    <section className="relative overflow-hidden border-y border-[#171512]/10">
      {/* Mood wash — stacked, opacity-only layers so switching notes never
          triggers layout work, just a cross-fade within the palette. */}
      <div className="pointer-events-none absolute inset-0">
        {SCENT_NOTES.map((note) => (
          <motion.div
            key={note.id}
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 20%, ${note.gradient[0]}, ${note.gradient[1]})`,
            }}
            initial={false}
            animate={{
              opacity: active === note.id ? 0.16 : 0,
              scale: active === note.id ? 1 : 1.04,
            }}
            transition={{ duration: transitionDuration, ease: "easeOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-[#F6F1E9]/40" />
      </div>

      <div
        className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20"
        onMouseLeave={handleLeaveAll}
      >
        <p className="font-eter-sans text-center text-[11px] uppercase tracking-[0.3em] text-[#171512]/70">
          Navegue pelo cheiro
        </p>

        <nav
          aria-label="Notas olfativas"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-4 sm:gap-x-6"
        >
          {SCENT_NOTES.map((note, i) => (
            <span key={note.id} className="flex items-center gap-x-3 sm:gap-x-6">
              <button
                type="button"
                data-cursor-hover
                aria-pressed={active === note.id}
                onMouseEnter={() => handleEnter(note.id)}
                onFocus={() => handleEnter(note.id)}
                onClick={() => handleTap(note.id)}
                className={cn(
                  "font-eter-serif px-2 text-[clamp(1.6rem,4.5vw,3.2rem)] leading-none tracking-tight transition-[opacity,transform] duration-300",
                  active === null
                    ? "opacity-90"
                    : active === note.id
                      ? "scale-[1.04] opacity-100 text-[#7A5A28]"
                      : "scale-[0.98] opacity-35"
                )}
              >
                {note.id}
              </button>
              {i < SCENT_NOTES.length - 1 && (
                <span className="hidden text-[#171512]/25 sm:inline">·</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mx-auto mt-8 h-[1px] w-16 bg-[#171512]/20" />

        <div className="mx-auto mt-6 min-h-[3.5rem] max-w-lg text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={active ?? "default"}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={{ duration: fadeDuration }}
              className="font-eter-serif text-lg leading-relaxed text-[#171512]/80 sm:text-xl"
            >
              {activeInfo ? activeInfo.mood : DEFAULT_MOOD}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fadeDuration }}
                className="mt-4"
              >
                <Link
                  href={`/labs/001/experiencia/produtos?nota=${encodeURIComponent(active)}`}
                  data-cursor-hover
                  className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#171512]/60 underline-offset-4 hover:text-[#171512] hover:underline"
                >
                  Explorar tudo em {active} →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product stage — always mounted, cross-fades emphasis instead of
            remounting or reflowing the grid when the active note changes. */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
          {PRODUCTS.map((product) => {
            const matches = active === null || product.scentNotes.includes(active);
            return (
              <motion.div
                key={product.slug}
                initial={false}
                animate={{
                  opacity: matches ? 1 : 0.22,
                  scale: matches ? 1 : 0.94,
                }}
                transition={{ duration: transitionDuration, ease: "easeOut" }}
              >
                <Link
                  href={`/labs/001/experiencia/produtos/${product.slug}`}
                  data-cursor-hover
                  className="group block"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#EDE4D5]">
                    <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
                      <ScentObject product={product} />
                    </div>
                  </div>
                  <p className="font-eter-serif mt-3 text-sm sm:text-base">
                    {product.name}
                  </p>
                  <span className="text-xs text-[#171512]/70">
                    {formatPrice(product.price)}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
