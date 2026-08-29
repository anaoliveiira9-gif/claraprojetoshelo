"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useEter } from "@/components/labs/005/eter-context";
import { formatPrice } from "@/components/labs/005/products";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { useDialogA11y } from "@/components/labs/005/use-dialog-a11y";

export function CartDrawer() {
  const { cartOpen, setCartOpen, cartProducts, setQuantity, cartTotal } =
    useEter();
  const reducedMotion = usePrefersReducedMotion();
  const close = () => setCartOpen(false);
  const dialogRef = useDialogA11y<HTMLDivElement>(cartOpen, close);

  return (
    <AnimatePresence>
      {cartOpen && (
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
            aria-labelledby="cart-drawer-title"
            initial={{ x: reducedMotion ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reducedMotion ? 0 : "100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-[#F6F1E9] text-[#171512] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#171512]/10 px-6 py-5">
              <p
                id="cart-drawer-title"
                className="font-eter-sans text-[11px] uppercase tracking-[0.2em]"
              >
                Sacola ({cartProducts.reduce((s, l) => s + l.quantity, 0)})
              </p>
              <button
                type="button"
                data-cursor-hover
                aria-label="Fechar sacola"
                onClick={close}
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {cartProducts.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-sm text-[#171512]/60">
                  Sua sacola está vazia.
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
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <ul className="flex flex-col gap-6">
                    {cartProducts.map(({ product, quantity }) => (
                      <li key={product.slug} className="flex gap-4">
                        <div className="h-20 w-16 shrink-0 bg-[#EDE4D5]">
                          <div
                            className="h-full w-full"
                            style={{
                              background: `linear-gradient(180deg, ${product.gradient[0]}, ${product.gradient[1]})`,
                            }}
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-eter-serif text-base">
                              {product.name}
                            </p>
                            <p className="shrink-0 text-sm text-[#171512]/70">
                              {formatPrice(product.price * quantity)}
                            </p>
                          </div>
                          <p className="mt-0.5 text-xs text-[#171512]/70">
                            {product.size}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <button
                              type="button"
                              data-cursor-hover
                              aria-label="Diminuir quantidade"
                              onClick={() =>
                                setQuantity(product.slug, quantity - 1)
                              }
                              className="flex h-6 w-6 items-center justify-center border border-[#171512]/20 transition-colors hover:border-[#171512]"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-4 text-center text-sm">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              data-cursor-hover
                              aria-label="Aumentar quantidade"
                              onClick={() =>
                                setQuantity(product.slug, quantity + 1)
                              }
                              className="flex h-6 w-6 items-center justify-center border border-[#171512]/20 transition-colors hover:border-[#171512]"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#171512]/10 px-6 py-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#171512]/60">Subtotal</span>
                    <span className="font-eter-serif text-lg">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <Link
                    href="/labs/005/experiencia/checkout"
                    data-cursor-hover
                    onClick={close}
                    className="mt-4 flex items-center justify-center bg-[#171512] px-6 py-4 font-eter-sans text-xs uppercase tracking-[0.2em] text-[#F6F1E9] transition-colors hover:bg-[#7A5A28]"
                  >
                    Finalizar compra
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
