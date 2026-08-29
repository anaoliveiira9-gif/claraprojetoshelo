"use client";

import { useRouter } from "next/navigation";
import { NovaDiscoverScreen } from "@/components/labs/002/screens";
import { useFavoritesOptional } from "@/components/labs/002/favorites-context";

export default function DescobrirPage() {
  const router = useRouter();
  const favorites = useFavoritesOptional();

  return (
    <NovaDiscoverScreen
      favoriteIds={favorites?.favoriteIds ?? []}
      onToggleFavorite={(id) => favorites?.toggleFavorite(id)}
      onSelect={(slug) => router.push(`/labs/002/experiencia/${slug}`)}
    />
  );
}
