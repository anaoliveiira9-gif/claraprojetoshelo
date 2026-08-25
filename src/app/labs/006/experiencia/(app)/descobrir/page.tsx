"use client";

import { useRouter } from "next/navigation";
import { NovaDiscoverScreen } from "@/components/labs/006/screens";
import { useFavoritesOptional } from "@/components/labs/006/favorites-context";

export default function DescobrirPage() {
  const router = useRouter();
  const favorites = useFavoritesOptional();

  return (
    <NovaDiscoverScreen
      favoriteIds={favorites?.favoriteIds ?? []}
      onToggleFavorite={(id) => favorites?.toggleFavorite(id)}
      onSelect={(slug) => router.push(`/labs/006/experiencia/${slug}`)}
    />
  );
}
