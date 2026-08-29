"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEter } from "@/components/labs/005/eter-context";
import { PRODUCTS, formatPrice } from "@/components/labs/005/products";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { useDialogA11y } from "@/components/labs/005/use-dialog-a11y";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useEter();
  const [query, setQuery] = useState("");
  const reducedMotion = usePrefersReducedMotion();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.notes.some((n) => n.toLowerCase().includes(q))
    );
  }, [query]);

  function close() {
    setSearchOpen(false);
    setQuery("");
  }

  const dialogRef = useDialogA11y<HTMLDivElement>(searchOpen, close);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Buscar produtos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          className="fixed inset-0 z-[95] flex flex-col bg-[#F6F1E9] text-[#171512]"
        >
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-24 sm:pt-32">
            <div className="flex items-center gap-4 border-b border-[#171512]/20 pb-4">
              <Search className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <label htmlFor="eter-search-input" className="sr-only">
                Buscar por nome, nota ou categoria
              </label>
              <input
                id="eter-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nome, nota ou categoria…"
                className="font-eter-serif w-full bg-transparent text-xl placeholder:text-[#171512]/60 sm:text-2xl"
              />
              <button
                type="button"
                data-cursor-hover
                aria-label="Fechar busca"
                onClick={close}
                className="shrink-0"
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <p className="sr-only" role="status" aria-live="polite">
              {query.trim()
                ? `${results.length} ${results.length === 1 ? "resultado encontrado" : "resultados encontrados"}`
                : ""}
            </p>

            <div className="mt-8 flex-1 overflow-y-auto">
              {query.trim() && results.length === 0 && (
                <p className="text-sm text-[#171512]/70">
                  Nada encontrado para &ldquo;{query}&rdquo;.
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {results.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/labs/005/experiencia/produtos/${product.slug}`}
                      data-cursor-hover
                      onClick={close}
                      className="flex items-center justify-between gap-4 border-b border-[#171512]/10 py-4 transition-colors hover:text-[#7A5A28]"
                    >
                      <div>
                        <p className="font-eter-serif text-lg">
                          {product.name}
                        </p>
                        <p className="text-xs uppercase tracking-[0.1em] text-[#171512]/70">
                          {product.category}
                        </p>
                      </div>
                      <span className="shrink-0 text-sm">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
