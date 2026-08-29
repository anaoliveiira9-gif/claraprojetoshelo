"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "./favorites-context";

export function FavoriteButton({ propertyId }: { propertyId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(propertyId);

  return (
    <button
      type="button"
      data-cursor-hover
      onClick={() => toggleFavorite(propertyId)}
      aria-pressed={favorited}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-xs uppercase tracking-[0.16em] transition-colors",
        favorited
          ? "border-[#2F4A3B] bg-[#2F4A3B] text-[#F8F5F0]"
          : "border-[#DDD5C8] bg-transparent text-[#241E1A] hover:border-[#2F4A3B]",
      )}
    >
      <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
      {favorited ? "Nos favoritos" : "Adicionar aos favoritos"}
    </button>
  );
}
