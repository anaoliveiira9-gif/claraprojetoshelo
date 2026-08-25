"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { notFound } from "next/navigation";
import { NovaExperienceDetail } from "@/components/labs/006/experience-detail";
import { getExperienceBySlug } from "@/components/labs/006/data";
import { useFavoritesOptional } from "@/components/labs/006/favorites-context";

export default function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const favorites = useFavoritesOptional();
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  return (
    <NovaExperienceDetail
      experience={experience}
      favorited={favorites?.isFavorite(experience.id) ?? false}
      onToggleFavorite={() => favorites?.toggleFavorite(experience.id)}
      onBack={() => router.back()}
    />
  );
}
