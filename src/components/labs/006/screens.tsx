"use client";

import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Clock3,
  Compass,
  Heart,
  Minus,
  Music,
  Navigation,
  Plus,
  Sparkles,
  Star,
  TreePine,
  UtensilsCrossed,
  MapPin,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { ExperienceCard } from "./experience-card";
import {
  NOVA_CATEGORIES,
  NOVA_EXPERIENCES,
  formatCountdown,
  formatDistance,
  rankForYou,
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

function RailHeader({
  icon: Icon,
  title,
  subtitle,
  live,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  live?: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  return (
    <div className="mb-2.5 flex items-baseline gap-2 px-4">
      <Icon className="h-[15px] w-[15px] shrink-0 text-[#D93B6C]" />
      <h2 className="flex items-center gap-1.5 text-[12.5px] font-extrabold uppercase tracking-[0.1em] text-[#1A1712]">
        {title}
        {live && (
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full bg-[#D93B6C]",
              !reducedMotion && "animate-pulse",
            )}
          />
        )}
      </h2>
      {subtitle && (
        <span className="truncate text-[11.5px] text-[#8A8175]">
          {subtitle}
        </span>
      )}
    </div>
  );
}

function Rail({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1"
      style={{ scrollbarWidth: "none" }}
    >
      {children}
    </div>
  );
}

/** Tiny non-interactive abstract map used to give PERTO a spatial anchor on the home feed. */
function MiniMapPreview({ experiences }: { experiences: NovaExperience[] }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          y1={(i + 1) * 20}
          x2={100}
          y2={(i + 1) * 20}
          stroke="#DFD5C0"
          strokeWidth={2}
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={(i + 1) * 20}
          y1={0}
          x2={(i + 1) * 20}
          y2={100}
          stroke="#DFD5C0"
          strokeWidth={2}
        />
      ))}
      <circle cx={50} cy={50} r={3.5} fill="#1A1712" opacity={0.5} />
      {experiences.map((item) => (
        <circle
          key={item.id}
          cx={item.mapX}
          cy={(item.mapY / 140) * 100}
          r={3.2}
          fill="#D93B6C"
        />
      ))}
    </svg>
  );
}

export function NovaHomeScreen({
  experiences = NOVA_EXPERIENCES,
  favoriteIds = [],
  onToggleFavorite = () => {},
  onSelect = () => {},
  onOpenMap = () => {},
}: {
  experiences?: NovaExperience[];
  favoriteIds?: string[];
  onToggleFavorite?: (id: string) => void;
  onSelect?: (slug: string) => void;
  onOpenMap?: () => void;
}) {
  const agora = useMemo(
    () =>
      [...experiences]
        .filter((item) => item.startsInMinutes !== null)
        .sort((a, b) => (a.startsInMinutes ?? 0) - (b.startsInMinutes ?? 0)),
    [experiences],
  );

  const perto = useMemo(
    () => [...experiences].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 4),
    [experiences],
  );

  const hoje = useMemo(
    () => experiences.filter((item) => item.curatedToday),
    [experiences],
  );

  const paraVoce = useMemo(
    () => rankForYou(experiences, favoriteIds).slice(0, 6),
    [experiences, favoriteIds],
  );

  return (
    <ScreenFrame>
      <div className="flex-1 overflow-y-auto pb-8 pt-5">
        <div className="mb-5 px-4">
          <p className="text-[13px] font-medium text-[#8A8175]">
            Boa tarde, exploradora
          </p>
          <h1 className="text-[24px] font-extrabold tracking-tight">
            O que rola na cidade
          </h1>
        </div>

        {agora.length > 0 && (
          <div className="mb-6">
            <RailHeader
              icon={Clock3}
              title="Agora"
              subtitle="começando perto de você"
              live
            />
            <Rail>
              {agora.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  size="rail"
                  className="snap-start"
                  experience={experience}
                  favorited={favoriteIds.includes(experience.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={onSelect}
                  meta={
                    experience.startsInMinutes !== null
                      ? formatCountdown(experience.startsInMinutes)
                      : undefined
                  }
                />
              ))}
            </Rail>
          </div>
        )}

        <div className="mb-6 px-4">
          <RailHeader icon={Navigation} title="Perto" subtitle="do seu ponto agora" />
          <button
            type="button"
            data-cursor-hover
            onClick={onOpenMap}
            className="flex w-full items-stretch gap-3 rounded-2xl border border-[#EAE3D6] bg-white p-3 text-left transition-transform active:scale-[0.98]"
          >
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F1EBDD]">
              <MiniMapPreview experiences={perto} />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 py-0.5">
              {perto.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 text-[12px]"
                >
                  <span className="truncate font-semibold text-[#1A1712]">
                    {item.title}
                  </span>
                  <span className="shrink-0 text-[#D93B6C]">
                    {formatDistance(item.distanceKm)}
                  </span>
                </div>
              ))}
              <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-[#8A8175]">
                Explorar no mapa
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </button>
        </div>

        {hoje.length > 0 && (
          <div className="mb-6 px-4">
            <RailHeader icon={Sparkles} title="Hoje" subtitle="curadoria do dia" />
            <div className="grid grid-cols-2 gap-3">
              {hoje.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  size="compact"
                  experience={experience}
                  favorited={favoriteIds.includes(experience.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        )}

        {paraVoce.length > 0 && (
          <div>
            <RailHeader
              icon={Star}
              title="Para você"
              subtitle={
                favoriteIds.length > 0
                  ? "baseado no que você favoritou"
                  : "para começar a explorar"
              }
            />
            <Rail>
              {paraVoce.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  size="rail"
                  className="snap-start"
                  experience={experience}
                  favorited={favoriteIds.includes(experience.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={onSelect}
                />
              ))}
            </Rail>
          </div>
        )}
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
  const [sortByDistance, setSortByDistance] = useState(false);

  const filtered = useMemo(() => {
    const base = activeCategory
      ? experiences.filter((item) => item.category === activeCategory)
      : experiences;
    return sortByDistance
      ? [...base].sort((a, b) => a.distanceKm - b.distanceKm)
      : base;
  }, [experiences, activeCategory, sortByDistance]);

  return (
    <ScreenFrame>
      <div className="px-4 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-[22px] font-extrabold tracking-tight">
            Descobrir
          </h1>
          <button
            type="button"
            data-cursor-hover
            onClick={() => setSortByDistance((current) => !current)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors",
              sortByDistance
                ? "border-[#D93B6C] bg-[#D93B6C] text-white"
                : "border-[#EAE3D6] bg-white text-[#1A1712]",
            )}
          >
            <Navigation className="h-3.5 w-3.5" />
            Mais perto
          </button>
        </div>
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
                meta={sortByDistance ? formatDistance(experience.distanceKm) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </ScreenFrame>
  );
}

/* -------------------------------------------------------------------- */
/* Mapa (Map)                                                          */
/* -------------------------------------------------------------------- */

const MAP_FILTERS = [
  { key: "todos" as const, label: "Tudo", icon: null },
  { key: "agora" as const, label: "Agora", icon: Clock3 },
  { key: "perto" as const, label: "Perto", icon: Navigation },
  { key: "hoje" as const, label: "Hoje", icon: Sparkles },
  { key: "paraVoce" as const, label: "Para você", icon: Star },
];

type MapFilterKey = (typeof MAP_FILTERS)[number]["key"];

export function NovaMapScreen({
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
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filter, setFilter] = useState<MapFilterKey>("todos");
  const [zoomed, setZoomed] = useState(false);

  const active = experiences.find((item) => item.id === activeId) ?? null;

  const paraVoceIds = useMemo(
    () =>
      new Set(
        rankForYou(experiences, favoriteIds)
          .slice(0, 4)
          .map((item) => item.id),
      ),
    [experiences, favoriteIds],
  );

  const matchesFilter = (item: NovaExperience) => {
    switch (filter) {
      case "agora":
        return item.startsInMinutes !== null && item.startsInMinutes <= 180;
      case "perto":
        return item.distanceKm <= 1.5;
      case "hoje":
        return item.curatedToday;
      case "paraVoce":
        return paraVoceIds.has(item.id);
      default:
        return true;
    }
  };

  return (
    <ScreenFrame>
      <div className="px-4 pt-5">
        <h1 className="text-[22px] font-extrabold tracking-tight">Explorar</h1>
        <p className="text-[12.5px] text-[#8A8175]">
          {reducedMotion
            ? "Toque num ponto para ver a experiência"
            : "Arraste o mapa e toque num ponto para explorar"}
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        {MAP_FILTERS.map((item) => {
          const isActive = filter === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              type="button"
              data-cursor-hover
              onClick={() => setFilter(item.key)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-colors",
                isActive
                  ? "border-[#D93B6C] bg-[#D93B6C] text-white"
                  : "border-[#EAE3D6] bg-white text-[#1A1712]",
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        ref={containerRef}
        className="relative mx-4 mb-4 flex-1 overflow-hidden rounded-2xl border border-[#EAE3D6] bg-[#F1EBDD]"
      >
        <motion.div
          drag={!reducedMotion}
          dragListener={false}
          dragControls={dragControls}
          onPointerDown={(event) => {
            if (!reducedMotion) dragControls.start(event);
          }}
          dragConstraints={containerRef}
          dragElastic={0.05}
          dragTransition={{ power: 0.2, timeConstant: 200 }}
          animate={reducedMotion ? undefined : { scale: zoomed ? 1.5 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className={cn(
            "absolute",
            reducedMotion ? "inset-0" : "inset-[-35%] cursor-grab active:cursor-grabbing",
          )}
          style={{ touchAction: "none" }}
        >
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

          {experiences.map((experience) => {
            const included = matchesFilter(experience);
            return (
              <button
                key={experience.id}
                type="button"
                data-cursor-hover
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() =>
                  setActiveId((current) =>
                    current === experience.id ? null : experience.id,
                  )
                }
                style={{
                  left: `${experience.mapX}%`,
                  top: `${(experience.mapY / 140) * 100}%`,
                }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-full transition-[opacity,transform] duration-150 active:scale-90",
                  included ? "opacity-100" : "opacity-25",
                )}
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
            );
          })}
        </motion.div>

        {!reducedMotion && (
          <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-[#EAE3D6] bg-white shadow-sm">
            <button
              type="button"
              data-cursor-hover
              onClick={() => setZoomed(true)}
              aria-label="Aproximar"
              className="flex h-9 w-9 items-center justify-center border-b border-[#EAE3D6] text-[#1A1712] transition-transform active:scale-90"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              data-cursor-hover
              onClick={() => setZoomed(false)}
              aria-label="Afastar"
              className="flex h-9 w-9 items-center justify-center text-[#1A1712] transition-transform active:scale-90"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        )}

        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={reducedMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.16 }}
              className="absolute inset-x-3 bottom-3"
            >
              <div className="relative">
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => setActiveId(null)}
                  aria-label="Fechar"
                  className="absolute -top-3 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#EAE3D6] bg-white shadow-sm"
                >
                  <X className="h-3.5 w-3.5 text-[#1A1712]" />
                </button>
                <ExperienceCard
                  experience={active}
                  favorited={favoriteIds.includes(active.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelect={onSelect}
                  meta={
                    active.startsInMinutes !== null
                      ? formatCountdown(active.startsInMinutes)
                      : formatDistance(active.distanceKm)
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
