"use client";

import { useRouter } from "next/navigation";
import { NovaMapScreen } from "@/components/labs/006/screens";
import { useFavoritesOptional } from "@/components/labs/006/favorites-context";

export default function MapaPage() {
  const router = useRouter();
  const favorites = useFavoritesOptional();

  return (
    <NovaMapScreen
      favoriteIds={favorites?.favoriteIds ?? []}
      onToggleFavorite={(id) => favorites?.toggleFavorite(id)}
      onSelect={(slug) => router.push(`/labs/006/experiencia/${slug}`)}
    />
  );
}
