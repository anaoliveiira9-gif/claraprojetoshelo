"use client";

import { useRouter } from "next/navigation";
import { NovaHomeScreen } from "@/components/labs/002/screens";
import { useFavoritesOptional } from "@/components/labs/002/favorites-context";

export default function InicioPage() {
  const router = useRouter();
  const favorites = useFavoritesOptional();

  return (
    <NovaHomeScreen
      favoriteIds={favorites?.favoriteIds ?? []}
      onToggleFavorite={(id) => favorites?.toggleFavorite(id)}
      onSelect={(slug) => router.push(`/labs/002/experiencia/${slug}`)}
      onOpenMap={() => router.push("/labs/002/experiencia/mapa")}
    />
  );
}
