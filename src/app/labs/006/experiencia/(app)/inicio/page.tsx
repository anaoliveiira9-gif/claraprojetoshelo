"use client";

import { useRouter } from "next/navigation";
import { NovaHomeScreen } from "@/components/labs/006/screens";
import { useFavoritesOptional } from "@/components/labs/006/favorites-context";

export default function InicioPage() {
  const router = useRouter();
  const favorites = useFavoritesOptional();

  return (
    <NovaHomeScreen
      favoriteIds={favorites?.favoriteIds ?? []}
      onToggleFavorite={(id) => favorites?.toggleFavorite(id)}
      onSelect={(slug) => router.push(`/labs/006/experiencia/${slug}`)}
    />
  );
}
