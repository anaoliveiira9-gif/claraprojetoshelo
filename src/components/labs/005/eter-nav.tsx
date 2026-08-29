"use client";

import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { useEter } from "@/components/labs/005/eter-context";

export function EterNav() {
  const { cartCount, wishlist, setCartOpen, setWishlistOpen, setSearchOpen } =
    useEter();

  return (
    <header className="sticky top-0 z-30 border-b border-[#171512]/10 bg-[#F6F1E9]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/labs/005/experiencia"
          data-cursor-hover
          className="font-eter-serif text-xl tracking-[0.08em] text-[#171512]"
        >
          ÉTÉR
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/labs/005/experiencia/produtos"
            data-cursor-hover
            className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#171512]/70 transition-colors hover:text-[#171512]"
          >
            Perfumes
          </Link>
          <Link
            href="/labs/005/experiencia/produtos?categoria=Ambiente"
            data-cursor-hover
            className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#171512]/70 transition-colors hover:text-[#171512]"
          >
            Ambiente
          </Link>
          <Link
            href="/labs/005/experiencia/produtos?categoria=Corpo"
            data-cursor-hover
            className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#171512]/70 transition-colors hover:text-[#171512]"
          >
            Corpo
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-[#171512]">
          <button
            type="button"
            data-cursor-hover
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
            className="transition-opacity hover:opacity-60"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            data-cursor-hover
            aria-label={
              wishlist.length > 0
                ? `Favoritos (${wishlist.length})`
                : "Favoritos"
            }
            onClick={() => setWishlistOpen(true)}
            className="relative transition-opacity hover:opacity-60"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            {wishlist.length > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#7A5A28] text-[8px] text-[#F6F1E9]"
              >
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            type="button"
            data-cursor-hover
            aria-label={cartCount > 0 ? `Sacola (${cartCount})` : "Sacola"}
            onClick={() => setCartOpen(true)}
            className="relative transition-opacity hover:opacity-60"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#7A5A28] text-[8px] text-[#F6F1E9]"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
