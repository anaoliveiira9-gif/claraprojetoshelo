"use client";

import { Heart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NovaExperience } from "./data";

export function ExperienceCard({
  experience,
  favorited = false,
  onToggleFavorite,
  onSelect,
  size = "default",
}: {
  experience: NovaExperience;
  favorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  onSelect?: (slug: string) => void;
  size?: "default" | "compact";
}) {
  return (
    <button
      type="button"
      data-cursor-hover
      onClick={() => onSelect?.(experience.slug)}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-2xl border border-[#EAE3D6] bg-white text-left shadow-[0_1px_2px_rgba(26,23,18,0.04)] transition-transform active:scale-[0.98]",
      )}
    >
      <div
        className={cn(
          "relative w-full",
          size === "compact" ? "h-24" : "h-36",
        )}
        style={{ background: experience.gradient }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1A1712]">
          {experience.tipo}
        </span>
        <button
          type="button"
          data-cursor-hover
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite?.(experience.id);
          }}
          aria-label={favorited ? "Remover dos favoritos" : "Favoritar"}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 transition-transform active:scale-90"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              favorited
                ? "fill-[#D93B6C] text-[#D93B6C]"
                : "text-[#1A1712]",
            )}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3.5 py-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#D93B6C]">
          {experience.category}
        </div>
        <h3 className="font-[Manrope] text-[15px] font-bold leading-tight text-[#1A1712]">
          {experience.title}
        </h3>
        {size === "default" && (
          <p className="line-clamp-2 text-[12.5px] leading-snug text-[#8A8175]">
            {experience.teaser}
          </p>
        )}
        <div className="mt-1 flex items-center gap-1 text-[11px] text-[#8A8175]">
          <MapPin className="h-3 w-3" />
          <span>{experience.neighborhood}</span>
          <span className="mx-1">·</span>
          <span>{experience.time}</span>
        </div>
      </div>
    </button>
  );
}
