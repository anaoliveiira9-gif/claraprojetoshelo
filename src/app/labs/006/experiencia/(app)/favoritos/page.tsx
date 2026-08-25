"use client";

import { useRouter } from "next/navigation";
import { NovaFavoritesScreen } from "@/components/labs/006/screens";
import { useFavoritesOptional } from "@/components/labs/006/favorites-context";

export default function FavoritosPage() {
  const router = useRouter();
  const favorites = useFavoritesOptional();

  return (
    <NovaFavoritesScreen
      favoriteIds={favorites?.favoriteIds ?? []}
      onToggleFavorite={(id) => favorites?.toggleFavorite(id)}
      onSelect={(slug) => router.push(`/labs/006/experiencia/${slug}`)}
    />
  );
}
