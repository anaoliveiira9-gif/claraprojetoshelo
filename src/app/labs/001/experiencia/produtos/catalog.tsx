"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  PRODUCTS,
  SCENT_NOTES,
  formatPrice,
  type ProductCategory,
  type ScentNoteId,
} from "@/components/labs/001/products";
import { ScentObject } from "@/components/labs/001/scent-object";
import { useEter } from "@/components/labs/001/eter-context";
import { useHoverCapable } from "@/components/labs/001/use-hover-capable";
import { cn } from "@/lib/utils";

const CATEGORIES: (ProductCategory | "Todos")[] = [
  "Todos",
  "Perfumes",
  "Ambiente",
  "Corpo",
];

export function Catalog({
  initialCategory,
  initialNote,
}: {
  initialCategory: ProductCategory | "Todos";
  initialNote: ScentNoteId | null;
}) {
  const [active, setActive] = useState<ProductCategory | "Todos">(initialCategory);
  const [note, setNote] = useState<ScentNoteId | null>(initialNote);
  const { toggleWishlist, isWishlisted } = useEter();
  const hoverCapable = useHoverCapable();

  // initialCategory/initialNote come from the URL search params, read on the
  // server. When navigating client-side to a new query string on this same
  // route (e.g. the "Ambiente"/"Corpo" nav links, or a scent-note link),
  // Next.js re-renders this page with new props but does not remount this
  // component, so the local filter state must be re-synced from the props.
  // Adjusting state during render (rather than in an effect) avoids an
  // extra render pass and a flash of the stale filter — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevCategory, setPrevCategory] = useState(initialCategory);
  if (initialCategory !== prevCategory) {
    setPrevCategory(initialCategory);
    setActive(initialCategory);
  }

  const [prevNote, setPrevNote] = useState(initialNote);
  if (initialNote !== prevNote) {
    setPrevNote(initialNote);
    setNote(initialNote);
  }

  const products = PRODUCTS.filter(
    (p) =>
      (active === "Todos" || p.category === active) &&
      (note === null || p.scentNotes.includes(note))
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-3 border-b border-[#171512]/10 pb-6">
        <span className="font-eter-sans mr-1 text-[10px] uppercase tracking-[0.2em] text-[#171512]/40">
          Nota
        </span>
        <button
          type="button"
          data-cursor-hover
          onClick={() => setNote(null)}
          className={cn(
            "font-eter-sans px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] transition-colors",
            note === null
              ? "bg-[#B4915B] text-[#F6F1E9]"
              : "border border-[#171512]/20 text-[#171512]/70 hover:border-[#171512]"
          )}
        >
          Todas
        </button>
        {SCENT_NOTES.map((n) => (
          <button
            key={n.id}
            type="button"
            data-cursor-hover
            onClick={() => setNote(n.id)}
            className={cn(
              "font-eter-sans px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] transition-colors",
              note === n.id
                ? "bg-[#B4915B] text-[#F6F1E9]"
                : "border border-[#171512]/20 text-[#171512]/70 hover:border-[#171512]"
            )}
          >
            {n.id}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-b border-[#171512]/10 pb-6">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            data-cursor-hover
            onClick={() => setActive(category)}
            className={cn(
              "font-eter-sans px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition-colors",
              active === category
                ? "bg-[#171512] text-[#F6F1E9]"
                : "border border-[#171512]/20 text-[#171512]/70 hover:border-[#171512]"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-10 text-sm text-[#171512]/50">
          Nenhuma composição nessa combinação de nota e categoria.
        </p>
      )}

      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.slug} className="group relative">
            <Link
              href={`/labs/001/experiencia/produtos/${product.slug}`}
              data-cursor-hover
              className="block"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#EDE4D5]">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                  <ScentObject product={product} />
                </div>
              </div>
              <p className="font-eter-serif mt-4 text-lg">{product.name}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.1em] text-[#171512]/50">
                  {product.size}
                </span>
                <span className="text-sm text-[#171512]/70">
                  {formatPrice(product.price)}
                </span>
              </div>
            </Link>
            <button
              type="button"
              data-cursor-hover
              aria-label={
                isWishlisted(product.slug)
                  ? "Remover dos favoritos"
                  : "Favoritar"
              }
              aria-pressed={isWishlisted(product.slug)}
              onClick={() => toggleWishlist(product.slug)}
              className={cn(
                "absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-[#F6F1E9]/90 transition-[opacity,transform] duration-150 active:scale-90",
                // A hover-only reveal is invisible and unreachable on touch
                // devices (no hover state to trigger it), so it's only used
                // on real hover-capable pointers. Everywhere else — touch,
                // or the item is already wishlisted — the button stays
                // visible so its state and affordance are always readable.
                !hoverCapable || isWishlisted(product.slug)
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
              )}
            >
              <Heart
                className="h-4 w-4"
                fill={isWishlisted(product.slug) ? "#B4915B" : "none"}
                stroke="#171512"
                strokeWidth={1.5}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
