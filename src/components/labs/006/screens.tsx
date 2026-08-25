"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Compass,
  Heart,
  MapPin,
  Music,
  Sparkles,
  TreePine,
  UtensilsCrossed,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { ExperienceCard } from "./experience-card";
import {
  NOVA_CATEGORIES,
  NOVA_EXPERIENCES,
  type NovaCategory,
  type NovaExperience,
} from "./data";

const FONT_STACK =
  "var(--font-nova, ui-sans-serif, system-ui, sans-serif)";

/** Shared phone-proportioned canvas so every screen looks right standalone. */
function ScreenFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      style={{ fontFamily: FONT_STACK, background: "#FAF7F2" }}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden text-[#1A1712]",
        className,
      )}
    >
      {children}
    </div>
  );
}

const CATEGORY_ICON: Record<NovaCategory, React.ElementType> = {
  Comida: UtensilsCrossed,
  Arte: Sparkles,
  Música: Music,
  "Ar Livre": TreePine,
};

/* -------------------------------------------------------------------- */
/* Onboarding                                                            */
/* -------------------------------------------------------------------- */

const ONBOARDING_SLIDES = [
  {
    title: "Descubra sua cidade de novo",
    body: "NOVA reúne experiências culturais, gastronômicas e eventos curados especialmente para você explorar.",
    icon: Compass,
  },
  {
    title: "Do restaurante ao show",
    body: "Restaurantes autorais, exposições, shows íntimos e passeios ao ar livre — tudo num só lugar, sempre atualizado.",
    icon: Sparkles,
  },
  {
    title: "Guarde o que te interessa",
    body: "Favorite experiências, reserve seu lugar em segundos e receba avisos do que está perto de você.",
    icon: Heart,
  },
];

export function NovaOnboardingScreen({
  onFinish = () => {},
}: {
  onFinish?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const isLast = index === ONBOARDING_SLIDES.length - 1;
  const slide = ONBOARDING_SLIDES[index];
  const Icon = slide.icon;

  return (
    <ScreenFrame className="justify-between px-7 py-10">
      <div className="flex justify-end">
        {!isLast && (
          <button
            type="button"
            data-cursor-hover
            onClick={onFinish}
            className="text-[13px] font-medium text-[#8A8175]"
          >
            Pular
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col items-center"
          >
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D93B6C]">
              <Icon className="h-7 w-7 text-white" strokeWidth={2} />
            </div>
            <h1 className="mb-3 max-w-[260px] text-[26px] font-extrabold leading-tight tracking-tight">
              {slide.title}
            </h1>
            <p className="max-w-[280px] text-[14px] leading-relaxed text-[#8A8175]">
              {slide.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-1.5">
          {ONBOARDING_SLIDES.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={cn(
                "h-1.5 rounded-full transition-all",
                dotIndex === index
                  ? "w-5 bg-[#D93B6C]"
                  : "w-1.5 bg-[#EAE3D6]",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          data-cursor-hover
          onClick={() => {
            if (isLast) {
              onFinish();
            } else {
              setIndex((current) => current + 1);
            }
          }}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D93B6C] py-3.5 text-[15px] font-bold text-white transition-transform active:scale-[0.98]"
        >
          {isLast ? "Começar" : "Continuar"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </ScreenFrame>
  );
}

/* -------------------------------------------------------------------- */
/* Início (Home)                                                         */
/* -------------------------------------------------------------------- */

export function NovaHomeScreen({
  experiences = NOVA_EXPERIENCES,
  favoriteIds = [],
  onToggleFavorite = () => {},
  onSelect = () => {},
}: {
  experiences?: NovaExperience[];
  favoriteIds?: string[];
  onToggleFavorite?: (id: string) => void;
  onSelect?: (slug: string) => void;
}) {
  const featured = experiences[0];
  const rest = experiences.slice(1);

  return (
    <ScreenFrame>
      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-5">
        <p className="text-[13px] font-medium text-[#8A8175]">
          Boa tarde, exploradora
        </p>
        <h1 className="mb-5 text-[24px] font-extrabold tracking-tight">
          O que rola na cidade
        </h1>

        {featured && (
          <div className="mb-5">
            <ExperienceCard
              experience={featured}
              favorited={favoriteIds.includes(featured.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelect}
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          {rest.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              favorited={favoriteIds.includes(experience.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelect}
              size="compact"
            />
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}

/* -------------------------------------------------------------------- */
/* Descobrir (Discover)                                                  */
/* -------------------------------------------------------------------- */

export function NovaDiscoverScreen({
  experiences = NOVA_EXPERIENCES,
  favoriteIds = [],
  onToggleFavorite = () => {},
  onSelect = () => {},
}: {
  experiences?: NovaExperience[];
  favoriteIds?: string[];
  onToggleFavorite?: (id: string) => void;
  onSelect?: (slug: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<NovaCategory | null>(
    null,
  );

  const filtered = activeCategory
    ? experiences.filter((item) => item.category === activeCategory)
    : experiences;

  return (
    <ScreenFrame>
      <div className="px-4 pt-5">
        <h1 className="mb-4 text-[22px] font-extrabold tracking-tight">
          Descobrir
        </h1>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            data-cursor-hover
            onClick={() => setActiveCategory(null)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
              activeCategory === null
                ? "border-[#D93B6C] bg-[#D93B6C] text-white"
                : "border-[#EAE3D6] bg-white text-[#1A1712]",
            )}
          >
            Tudo
          </button>
          {NOVA_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICON[category];
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                data-cursor-hover
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors",
                  active
                    ? "border-[#D93B6C] bg-[#D93B6C] text-white"
                    : "border-[#EAE3D6] bg-white text-[#1A1712]",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
        {filtered.length === 0 ? (
          <p className="pt-10 text-center text-[13px] text-[#8A8175]">
            Nenhuma experiência nessa categoria ainda.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                favorited={favoriteIds.includes(experience.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelect}
                size="compact"
              />
            ))}
          </div>
        )}
      </div>
    </ScreenFrame>
  );
}

/* -------------------------------------------------------------------- */
/* Mapa (Map)                                                            */
/* -------------------------------------------------------------------- */

export function NovaMapScreen({
  experiences = NOVA_EXPERIENCES,
  onSelect = () => {},
}: {
  experiences?: NovaExperience[];
  onSelect?: (slug: string) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = experiences.find((item) => item.id === activeId) ?? null;

  return (
    <ScreenFrame>
      <div className="px-4 pt-5">
        <h1 className="text-[22px] font-extrabold tracking-tight">Mapa</h1>
        <p className="text-[12.5px] text-[#8A8175]">
          Experiências perto de você
        </p>
      </div>

      <div className="relative mx-4 mt-4 flex-1 overflow-hidden rounded-2xl border border-[#EAE3D6] bg-[#F1EBDD]">
        <svg
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={(i + 1) * 20}
              x2={100}
              y2={(i + 1) * 20}
              stroke="#DFD5C0"
              strokeWidth={1.4}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i + 1) * 18}
              y1={0}
              x2={(i + 1) * 18}
              y2={140}
              stroke="#DFD5C0"
              strokeWidth={1.4}
            />
          ))}
        </svg>

        {experiences.map((experience) => (
          <button
            key={experience.id}
            type="button"
            data-cursor-hover
            onClick={() =>
              setActiveId((current) =>
                current === experience.id ? null : experience.id,
              )
            }
            style={{
              left: `${experience.mapX}%`,
              top: `${experience.mapY}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-full transition-transform active:scale-90"
          >
            <MapPin
              className={cn(
                "h-7 w-7 drop-shadow-sm",
                activeId === experience.id
                  ? "fill-[#D93B6C] text-[#1A1712]"
                  : "fill-white text-[#D93B6C]",
              )}
              strokeWidth={1.5}
            />
          </button>
        ))}

        {active && (
          <div className="absolute inset-x-3 bottom-3">
            <ExperienceCard experience={active} onSelect={onSelect} />
          </div>
        )}
      </div>
    </ScreenFrame>
  );
}

/* -------------------------------------------------------------------- */
/* Favoritos (Favorites)                                                 */
/* -------------------------------------------------------------------- */

export function NovaFavoritesScreen({
  experiences = NOVA_EXPERIENCES,
  favoriteIds = NOVA_EXPERIENCES.slice(0, 3).map((item) => item.id),
  onToggleFavorite = () => {},
  onSelect = () => {},
}: {
  experiences?: NovaExperience[];
  favoriteIds?: string[];
  onToggleFavorite?: (id: string) => void;
  onSelect?: (slug: string) => void;
}) {
  const favorited = experiences.filter((item) => favoriteIds.includes(item.id));

  return (
    <ScreenFrame>
      <div className="px-4 pt-5">
        <h1 className="text-[22px] font-extrabold tracking-tight">
          Favoritos
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
        {favorited.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 pb-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1EBDD]">
              <Heart className="h-6 w-6 text-[#D93B6C]" />
            </div>
            <p className="max-w-[220px] text-[13.5px] text-[#8A8175]">
              Você ainda não favoritou nenhuma experiência. Toque no coração
              de um card para guardá-lo aqui.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {favorited.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                favorited
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelect}
                size="compact"
              />
            ))}
          </div>
        )}
      </div>
    </ScreenFrame>
  );
}

/* -------------------------------------------------------------------- */
/* Perfil (Profile)                                                      */
/* -------------------------------------------------------------------- */

export function NovaProfileScreen({
  name = "Heloísa Andrade",
  favoritesCount = 12,
  onOpenNotifications = () => {},
}: {
  name?: string;
  favoritesCount?: number;
  onOpenNotifications?: () => void;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const stats = [
    { label: "Experiências salvas", value: String(favoritesCount) },
    { label: "Reservas feitas", value: "4" },
    { label: "Cidades exploradas", value: "3" },
  ];

  return (
    <ScreenFrame>
      <div className="flex items-center justify-between px-4 pt-5">
        <h1 className="text-[22px] font-extrabold tracking-tight">Perfil</h1>
        <button
          type="button"
          data-cursor-hover
          onClick={onOpenNotifications}
          aria-label="Notificações"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#EAE3D6] bg-white"
        >
          <Bell className="h-4 w-4 text-[#1A1712]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D93B6C]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-3 flex h-20 w-20 items-center justify-center rounded-full text-[22px] font-extrabold text-white"
            style={{
              background:
                "linear-gradient(135deg, #D93B6C 0%, #5C4B6B 100%)",
            }}
          >
            {initials}
          </div>
          <h2 className="text-[17px] font-bold">{name}</h2>
          <p className="text-[12.5px] text-[#8A8175]">
            Membro NOVA desde 2024
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#EAE3D6] bg-white px-2 py-3 text-center"
            >
              <p className="text-[17px] font-extrabold text-[#D93B6C]">
                {stat.value}
              </p>
              <p className="text-[10.5px] leading-tight text-[#8A8175]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            data-cursor-hover
            onClick={onOpenNotifications}
            className="flex items-center justify-between rounded-2xl border border-[#EAE3D6] bg-white px-4 py-3.5 text-left"
          >
            <span className="flex items-center gap-3 text-[13.5px] font-semibold">
              <Bell className="h-4 w-4 text-[#D93B6C]" />
              Notificações
            </span>
            <ArrowRight className="h-4 w-4 text-[#8A8175]" />
          </button>
          <div className="flex items-center justify-between rounded-2xl border border-[#EAE3D6] bg-white px-4 py-3.5 text-left opacity-70">
            <span className="flex items-center gap-3 text-[13.5px] font-semibold">
              <Sparkles className="h-4 w-4 text-[#D93B6C]" />
              Preferências de gosto
            </span>
            <ArrowRight className="h-4 w-4 text-[#8A8175]" />
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}
