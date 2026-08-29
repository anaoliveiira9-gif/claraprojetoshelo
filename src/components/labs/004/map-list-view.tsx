"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Car,
  Heart,
  List as ListIcon,
  Map as MapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { formatBRL, type Property } from "./data";
import { DiscoveryMap } from "./discovery-map";
import { useFavorites } from "./favorites-context";
import { serif } from "./theme";

/**
 * Map-centric discovery view for /imoveis: every filtered property is
 * plotted on a single abstract SVG map, in sync with a compact list.
 * Selecting a point or a row highlights both and reveals a quick-look card
 * — no navigation away from the listing. The full detail page is still one
 * click away via "Ver detalhes".
 */
export function MapListView({ properties }: { properties: Property[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"mapa" | "lista">("mapa");
  const { isFavorite, toggleFavorite } = useFavorites();
  const reduced = usePrefersReducedMotion();

  // Derived rather than synced via effect: if the filtered set no longer
  // contains the selected id, `selected` simply becomes null and no pin or
  // row matches `selectedId` any more — no extra render pass needed.
  const selected = properties.find((p) => p.id === selectedId) ?? null;

  function selectProperty(id: string) {
    setSelectedId((current) => (current === id ? null : id));
  }

  if (properties.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-[#DDD5C8] py-16 text-center text-sm text-[#6B6157]">
        Nenhum imóvel encontrado com esses filtros.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileView("mapa")}
          data-cursor-hover
          aria-pressed={mobileView === "mapa"}
          className={cn(
            "flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em]",
            mobileView === "mapa"
              ? "border-[#2F4A3B] bg-[#2F4A3B] text-[#F8F5F0]"
              : "border-[#DDD5C8] text-[#6B6157]",
          )}
        >
          <MapIcon className="h-3.5 w-3.5" /> Mapa
        </button>
        <button
          type="button"
          onClick={() => setMobileView("lista")}
          data-cursor-hover
          aria-pressed={mobileView === "lista"}
          className={cn(
            "flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em]",
            mobileView === "lista"
              ? "border-[#2F4A3B] bg-[#2F4A3B] text-[#F8F5F0]"
              : "border-[#DDD5C8] text-[#6B6157]",
          )}
        >
          <ListIcon className="h-3.5 w-3.5" /> Lista
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Map panel */}
        <div className={cn(mobileView === "lista" && "hidden lg:block")}>
          <div className="overflow-hidden rounded-sm border border-[#DDD5C8] bg-[#F8F5F0] lg:sticky lg:top-24">
            <div className="aspect-[400/260] w-full">
              <DiscoveryMap
                properties={properties}
                selectedId={selectedId}
                hoveredId={hoveredId}
                onSelect={selectProperty}
                onHover={setHoveredId}
              />
            </div>

            <AnimatePresence>
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}
                  className="border-t border-[#DDD5C8] bg-[#F8F5F0] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
                        {selected.bairro}, {selected.cidade}
                      </p>
                      <h3 className={`${serif} mt-1 truncate text-lg leading-snug text-[#241E1A]`}>
                        {selected.titulo}
                      </h3>
                    </div>
                    <button
                      type="button"
                      data-cursor-hover
                      onClick={() => toggleFavorite(selected.id)}
                      aria-pressed={isFavorite(selected.id)}
                      aria-label={
                        isFavorite(selected.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"
                      }
                      className="shrink-0 rounded-full p-1.5 transition-transform hover:scale-105"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          isFavorite(selected.id) ? "fill-[#2F4A3B] text-[#2F4A3B]" : "text-[#241E1A]",
                        )}
                      />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B6157]">
                    <span>{selected.area} m²</span>
                    {selected.quartos > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <BedDouble className="h-3.5 w-3.5" /> {selected.quartos}
                      </span>
                    )}
                    {selected.banheiros > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5" /> {selected.banheiros}
                      </span>
                    )}
                    {selected.vagas > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Car className="h-3.5 w-3.5" /> {selected.vagas}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className={`${serif} text-xl text-[#2F4A3B]`}>
                      {formatBRL(selected.preco)}
                    </span>
                    <Link
                      href={`/labs/004/experiencia/imoveis/${selected.slug}`}
                      data-cursor-hover
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-[#241E1A] underline underline-offset-4 hover:text-[#2F4A3B]"
                    >
                      Ver detalhes <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* List panel */}
        <div className={cn(mobileView === "mapa" && "hidden lg:block")}>
          <div className="flex max-h-[420px] flex-col gap-2 overflow-y-auto pr-1 lg:max-h-[640px]">
            {properties.map((property) => {
              const isSelected = property.id === selectedId;
              const favorited = isFavorite(property.id);
              return (
                <div
                  key={property.id}
                  role="button"
                  tabIndex={0}
                  data-cursor-hover
                  onClick={() => selectProperty(property.id)}
                  onMouseEnter={() => setHoveredId(property.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(property.id)}
                  onBlur={() => setHoveredId(null)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      selectProperty(property.id);
                    }
                  }}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-sm border bg-[#F8F5F0] px-4 py-3 transition-transform duration-150",
                    isSelected ? "scale-[1.01] border-[#2F4A3B]" : "border-[#DDD5C8]",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] uppercase tracking-[0.14em] text-[#6B6157]">
                      {property.bairro}, {property.cidade}
                    </p>
                    <p className={`${serif} truncate text-base text-[#241E1A]`}>{property.titulo}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#6B6157]">
                      <span>{property.area} m²</span>
                      {property.quartos > 0 && <span>{property.quartos} qt</span>}
                      {property.vagas > 0 && <span>{property.vagas} vg</span>}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className={`${serif} text-sm text-[#2F4A3B]`}>
                      {formatBRL(property.preco)}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <Link
                        href={`/labs/004/experiencia/imoveis/${property.slug}`}
                        data-cursor-hover
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`Ver detalhes de ${property.titulo}`}
                        className="p-0.5 text-[#6B6157] transition-colors hover:text-[#2F4A3B]"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        data-cursor-hover
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(property.id);
                        }}
                        aria-pressed={favorited}
                        aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                        className="p-0.5"
                      >
                        <Heart
                          className={cn(
                            "h-3.5 w-3.5",
                            favorited ? "fill-[#2F4A3B] text-[#2F4A3B]" : "text-[#6B6157]",
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
