import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, getProject } from "@/components/labs/006/data";
import { AbstractComposition } from "@/components/labs/006/abstract-composition";
import { PlanExplorer } from "@/components/labs/006/plan-explorer";
import { Reveal } from "@/components/labs/006/reveal";
import { SiteFooter } from "@/components/labs/006/site-footer";

const TEASERS = PROJECTS.slice(0, 6);
const FEATURED_PLAN = getProject("casa-patio");

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]";

export default function AtelierHomePage() {
  return (
    <main className="pt-24 sm:pt-28">
      {/* Hero */}
      <section className="relative border-b border-[#161615]/15 px-6 pb-16 pt-6 sm:px-10 sm:pb-24">
        <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
          Atelier 17 — Estúdio de arquitetura · São Paulo, BR
        </p>

        <h1 className="mt-6 max-w-5xl text-[13vw] font-black uppercase leading-[0.88] tracking-tighter sm:text-[8.5vw] lg:text-[7rem]">
          Construir é
          <br />
          decidir onde
          <br />
          a luz entra.
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-8 sm:mt-16 sm:flex-row sm:items-end">
          <p className="max-w-md text-base leading-relaxed text-[#161615]/75 sm:text-lg">
            Projetamos casas, edifícios e espaços públicos a partir da
            leitura precisa do terreno, do clima e do uso. Sem fórmulas
            prontas — cada obra parte de uma pergunta específica sobre o
            lugar onde ela vai existir.
          </p>
          <Link
            href="/labs/006/experiencia/projetos"
            data-cursor-hover
            className={`group flex shrink-0 items-center gap-2 border border-[#161615] px-5 py-3 [font-family:var(--font-atelier-mono)] text-xs uppercase tracking-[0.15em] transition-colors hover:border-[#2E4A5E] hover:text-[#2E4A5E] ${FOCUS_RING}`}
          >
            Ver projetos
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px border-y border-[#161615]/15 sm:mt-20 sm:grid-cols-4">
          {[
            ["17", "Anos de estúdio"],
            ["48", "Projetos concluídos"],
            ["06", "Estados atendidos"],
            ["03", "Prêmios setoriais"],
          ].map(([value, label]) => (
            <div key={label} className="border-[#161615]/15 px-4 py-6 first:border-l-0 sm:border-l">
              <p className="text-3xl font-black tracking-tight sm:text-4xl">{value}</p>
              <p className="mt-1 [font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.12em] text-[#161615]/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Floor-plan interaction teaser */}
      {FEATURED_PLAN?.floorPlan && (
        <section className="border-b border-[#161615]/15 px-6 py-16 sm:px-10 sm:py-24">
          <Reveal>
            <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
              Planta → Espaço → Fotografia
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-2xl text-2xl font-black uppercase tracking-tight sm:text-3xl">
                A planta é o ponto de partida — não a fotografia.
              </h2>
              <Link
                href={`/labs/006/experiencia/projetos/${FEATURED_PLAN.slug}`}
                data-cursor-hover
                className={`shrink-0 [font-family:var(--font-atelier-mono)] text-xs uppercase tracking-[0.15em] text-[#2E4A5E] hover:underline ${FOCUS_RING}`}
              >
                Ver {FEATURED_PLAN.name} →
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#161615]/70">
              Em vez de uma galeria fixa, selecione um ambiente na planta
              baixa da {FEATURED_PLAN.name} e veja a composição e a nota de
              projeto daquele espaço aparecerem — sala, cozinha, pátio, suíte.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 border border-[#161615]/15 bg-[#F1F0EB] p-4 sm:p-10">
              <PlanExplorer plan={FEATURED_PLAN.floorPlan} />
            </div>
          </Reveal>
        </section>
      )}

      {/* Project teasers — asymmetric editorial grid */}
      <section className="px-6 py-16 sm:px-10 sm:py-24">
        <Reveal>
          <div className="mb-10 flex items-baseline justify-between gap-4 sm:mb-14">
            <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Projetos selecionados
            </h2>
            <Link
              href="/labs/006/experiencia/projetos"
              data-cursor-hover
              className={`hidden shrink-0 [font-family:var(--font-atelier-mono)] text-xs uppercase tracking-[0.15em] text-[#2E4A5E] hover:underline sm:block ${FOCUS_RING}`}
            >
              Ver todos →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
          {TEASERS.map((project, i) => {
            const spanClass =
              i === 0
                ? "sm:col-span-4"
                : i === 1
                  ? "sm:col-span-2"
                  : i === 2
                    ? "sm:col-span-2"
                    : i === 3
                      ? "sm:col-span-4"
                      : "sm:col-span-3";
            return (
              <Reveal key={project.slug} delay={i * 0.05} className={spanClass}>
                <Link
                  href={`/labs/006/experiencia/projetos/${project.slug}`}
                  data-cursor-hover
                  className={`group block rounded-sm ${FOCUS_RING}`}
                >
                  <AbstractComposition
                    variant={project.galleryVariants[0]}
                    className="aspect-[4/3] border border-[#161615]/15 transition-colors group-hover:border-[#2E4A5E]"
                    label={`${String(i + 1).padStart(2, "0")} / ${project.category}`}
                  />
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight sm:text-xl">
                        {project.name}
                      </h3>
                      <p className="mt-1 [font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.1em] text-[#161615]/65">
                        {project.location} · {project.year}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-[#2E4A5E] opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#161615]/70">
                    {project.teaser}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
