"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { PRODUCTS, formatPrice, type ProductCategory } from "@/components/labs/001/products";
import { ScentObject } from "@/components/labs/001/scent-object";
import { useEter } from "@/components/labs/001/eter-context";
import { cn } from "@/lib/utils";

const CATEGORIES: (ProductCategory | "Todos")[] = [
  "Todos",
  "Perfumes",
  "Ambiente",
  "Corpo",
];

export function Catalog({ initialCategory }: { initialCategory: ProductCategory | "Todos" }) {
  const [active, setActive] = useState<ProductCategory | "Todos">(initialCategory);
  const { toggleWishlist, isWishlisted } = useEter();

  const products =
    active === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3 border-b border-[#171512]/10 pb-6">
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
              aria-label="Favoritar"
              onClick={() => toggleWishlist(product.slug)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-[#F6F1E9]/90 opacity-0 transition-opacity group-hover:opacity-100"
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
