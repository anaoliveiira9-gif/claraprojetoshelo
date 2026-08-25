"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Minus, Plus } from "lucide-react";
import type { Product } from "@/components/labs/001/products";
import { formatPrice } from "@/components/labs/001/products";
import { ScentObject } from "@/components/labs/001/scent-object";
import { useEter } from "@/components/labs/001/eter-context";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted } = useEter();
  const wishlisted = isWishlisted(product.slug);

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="aspect-square bg-[#EDE4D5] lg:aspect-[4/5]">
        <ScentObject product={product} />
      </div>

      <div className="flex flex-col">
        <span className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#171512]/50">
          {product.category} · {product.size}
        </span>
        <h1 className="font-eter-serif mt-3 text-4xl sm:text-5xl">
          {product.name}
        </h1>
        <p className="mt-2 text-xl text-[#171512]/80">
          {formatPrice(product.price)}
        </p>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#171512]/70">
          {product.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {product.notes.map((note) => (
            <span
              key={note}
              className="border border-[#171512]/15 px-3 py-1 text-xs uppercase tracking-[0.1em] text-[#171512]/60"
            >
              {note}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <div className="flex items-center border border-[#171512]/20">
            <button
              type="button"
              data-cursor-hover
              aria-label="Diminuir quantidade"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-[#171512]/5"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <button
              type="button"
              data-cursor-hover
              aria-label="Aumentar quantidade"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-[#171512]/5"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            data-cursor-hover
            onClick={() => addToCart(product.slug, quantity)}
            className="flex flex-1 items-center justify-center bg-[#171512] px-8 py-4 font-eter-sans text-xs uppercase tracking-[0.2em] text-[#F6F1E9] transition-colors hover:bg-[#B4915B]"
          >
            Adicionar à sacola
          </button>

          <button
            type="button"
            data-cursor-hover
            aria-label="Favoritar"
            onClick={() => toggleWishlist(product.slug)}
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-[#171512]/20 transition-colors hover:border-[#171512]"
          >
            <Heart
              className="h-4 w-4"
              fill={wishlisted ? "#B4915B" : "none"}
              stroke="#171512"
              strokeWidth={1.5}
            />
          </button>
        </div>

        <Link
          href="/labs/001/experiencia/produtos"
          data-cursor-hover
          className="mt-10 font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#171512]/50 hover:text-[#171512]"
        >
          ← Voltar ao catálogo
        </Link>
      </div>
    </div>
  );
}
