"use client";

import Link from "next/link";
import { Heart, BedDouble, Bath, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBRL, type Property } from "./data";
import { PropertyVisual } from "./property-visual";
import { useFavorites } from "./favorites-context";
import { serif } from "./theme";

export function PropertyCard({ property }: { property: Property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-sm border border-[#DDD5C8] bg-[#F8F5F0]">
      <Link
        href={`/labs/005/experiencia/imoveis/${property.slug}`}
        data-cursor-hover
        className="relative block aspect-[4/3] w-full overflow-hidden"
      >
        <PropertyVisual
          seed={property.seed}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </Link>

      <button
        type="button"
        data-cursor-hover
        onClick={() => toggleFavorite(property.id)}
        aria-pressed={favorited}
        aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F5F0]/90 backdrop-blur-sm transition-transform duration-200 hover:scale-105"
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors",
            favorited ? "fill-[#2F4A3B] text-[#2F4A3B]" : "text-[#241E1A]",
          )}
        />
      </button>

      <Link
        href={`/labs/005/experiencia/imoveis/${property.slug}`}
        data-cursor-hover
        className="flex flex-1 flex-col gap-3 p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className={`${serif} text-lg leading-snug text-[#241E1A]`}>{property.titulo}</h3>
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-[#7A6F63]">
          {property.bairro}, {property.cidade}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7A6F63]">
          <span>{property.area} m²</span>
          {property.quartos > 0 && (
            <span className="inline-flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" /> {property.quartos}
            </span>
          )}
          {property.banheiros > 0 && (
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" /> {property.banheiros}
            </span>
          )}
          {property.vagas > 0 && (
            <span className="inline-flex items-center gap-1">
              <Car className="h-3.5 w-3.5" /> {property.vagas}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className={`${serif} text-xl text-[#2F4A3B]`}>{formatBRL(property.preco)}</span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A6F63]">
            {property.tipo}
          </span>
        </div>
      </Link>
    </div>
  );
}
