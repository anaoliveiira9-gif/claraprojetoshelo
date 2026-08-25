"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarCheck,
  Check,
  Clock,
  Heart,
  MapPin,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { generateConfirmationCode, type NovaExperience } from "./data";

export function NovaExperienceDetail({
  experience,
  favorited,
  onToggleFavorite,
  onBack,
}: {
  experience: NovaExperience;
  favorited: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
}) {
  const [confirmationCode, setConfirmationCode] = useState<string | null>(
    null,
  );
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#FAF7F2] text-[#1A1712]">
      <div className="flex-1 overflow-y-auto pb-6">
        <div
          className="relative h-56 w-full shrink-0"
          style={{ background: experience.gradient }}
        >
          <button
            type="button"
            data-cursor-hover
            onClick={onBack}
            aria-label="Voltar"
            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
          >
            <ArrowLeft className="h-4 w-4 text-[#1A1712]" />
          </button>
          <button
            type="button"
            data-cursor-hover
            onClick={onToggleFavorite}
            aria-label={favorited ? "Remover dos favoritos" : "Favoritar"}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                favorited ? "fill-[#D93B6C] text-[#D93B6C]" : "text-[#1A1712]",
              )}
            />
          </button>
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]">
            {experience.tipo}
          </span>
        </div>

        <div className="px-5 pt-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#D93B6C]">
            {experience.category}
          </p>
          <h1 className="mb-3 text-[24px] font-extrabold leading-tight tracking-tight">
            {experience.title}
          </h1>
          <p className="mb-5 text-[13.5px] leading-relaxed text-[#8A8175]">
            {experience.description}
          </p>

          <div className="flex flex-col gap-2.5 rounded-2xl border border-[#EAE3D6] bg-white p-4">
            <div className="flex items-center gap-2.5 text-[13px]">
              <MapPin className="h-4 w-4 shrink-0 text-[#D93B6C]" />
              <span>
                {experience.location} · {experience.neighborhood}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-[13px]">
              <Clock className="h-4 w-4 shrink-0 text-[#D93B6C]" />
              <span>{experience.time}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[13px]">
              <Ticket className="h-4 w-4 shrink-0 text-[#D93B6C]" />
              <span>{experience.priceHint}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[#EAE3D6] bg-white p-4">
        {confirmationCode ? (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-3 rounded-2xl bg-[#1A1712] px-4 py-3.5 text-white"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D93B6C]">
              <Check className="h-4 w-4" strokeWidth={3} />
            </div>
            <div>
              <p className="text-[13px] font-semibold">Reserva confirmada</p>
              <p className="text-[12px] text-white/60">
                Código {confirmationCode}
              </p>
            </div>
          </motion.div>
        ) : (
          <button
            type="button"
            data-cursor-hover
            onClick={() =>
              setConfirmationCode(generateConfirmationCode(experience.id))
            }
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D93B6C] py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
          >
            <CalendarCheck className="h-4 w-4" />
            Reservar
          </button>
        )}
      </div>
    </div>
  );
}
