"use client";

import Link from "next/link";
import { PROPERTIES } from "@/components/labs/005/data";
import { PropertyCard } from "@/components/labs/005/property-card";
import { useFavorites } from "@/components/labs/005/favorites-context";
import { serif } from "@/components/labs/005/theme";

export default function FavoritosPage() {
  const { favorites } = useFavorites();
  const properties = PROPERTIES.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className={`${serif} text-3xl text-[#241E1A] sm:text-4xl`}>Favoritos</h1>
      <p className="mt-2 max-w-xl text-sm text-[#6B6157]">
        Imóveis salvos durante esta sessão de navegação.
      </p>

      {properties.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-sm border border-dashed border-[#DDD5C8] py-16 text-center text-sm text-[#6B6157]">
          Você ainda não favoritou nenhum imóvel.{" "}
          <Link
            href="/labs/005/experiencia/imoveis"
            data-cursor-hover
            className="text-[#2F4A3B] underline underline-offset-4"
          >
            Explorar imóveis
          </Link>
        </div>
      )}
    </div>
  );
}
