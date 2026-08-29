"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useEter } from "@/components/labs/005/eter-context";
import { formatPrice } from "@/components/labs/005/products";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { useDialogA11y } from "@/components/labs/005/use-dialog-a11y";

export function WishlistDrawer() {
  const {
    wishlistOpen,
    setWishlistOpen,
    wishlistProducts,
    toggleWishlist,
    addToCart,
  } = useEter();
  const reducedMotion = usePrefersReducedMotion();
  const close = () => setWishlistOpen(false);
  const dialogRef = useDialogA11y<HTMLDivElement>(wishlistOpen, close);

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[90] bg-[#171512]/40"
            aria-hidden="true"
            onClick={close}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wishlist-drawer-title"
            initial={{ x: reducedMotion ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reducedMotion ? 0 : "100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-[#F6F1E9] text-[#171512] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#171512]/10 px-6 py-5">
              <p
                id="wishlist-drawer-title"
                className="font-eter-sans text-[11px] uppercase tracking-[0.2em]"
              >
                Favoritos ({wishlistProducts.length})
              </p>
              <button
                type="button"
                data-cursor-hover
                aria-label="Fechar favoritos"
                onClick={close}
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-sm text-[#171512]/60">
                  Nenhum favorito ainda.
                </p>
                <Link
                  href="/labs/005/experiencia/produtos"
                  data-cursor-hover
                  onClick={close}
                  className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#7A5A28] underline underline-offset-4"
                >
                  Ver produtos
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="flex flex-col gap-6">
                  {wishlistProducts.map((product) => (
                    <li key={product.slug} className="flex gap-4">
                      <Link
                        href={`/labs/005/experiencia/produtos/${product.slug}`}
                        data-cursor-hover
                        onClick={close}
                        aria-label={product.name}
                        className="h-20 w-16 shrink-0"
                        style={{
                          background: `linear-gradient(180deg, ${product.gradient[0]}, ${product.gradient[1]})`,
                        }}
                      />
                      <div className="flex flex-1 flex-col">
                        <p className="font-eter-serif text-base">
                          {product.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#171512]/70">
                          {formatPrice(product.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <button
                            type="button"
                            data-cursor-hover
                            aria-label={`Adicionar ${product.name} à sacola`}
                            onClick={() => addToCart(product.slug)}
                            className="font-eter-sans text-[10px] uppercase tracking-[0.15em] text-[#171512] underline underline-offset-4 hover:text-[#7A5A28]"
                          >
                            Adicionar à sacola
                          </button>
                          <button
                            type="button"
                            data-cursor-hover
                            aria-label={`Remover ${product.name} dos favoritos`}
                            onClick={() => toggleWishlist(product.slug)}
                          >
                            <Heart
                              className="h-3.5 w-3.5"
                              fill="#B4915B"
                              stroke="#B4915B"
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
