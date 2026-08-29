import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS, getProject } from "@/components/labs/006/data";
import { AbstractComposition } from "@/components/labs/006/abstract-composition";
import { FloorPlan } from "@/components/labs/006/floor-plan";
import { PlanExplorer } from "@/components/labs/006/plan-explorer";
import { CoordinateMap } from "@/components/labs/006/coordinate-map";
import { Reveal } from "@/components/labs/006/reveal";
import { SiteFooter } from "@/components/labs/006/site-footer";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projeto — Atelier 17" };
  return { title: `${project.name} — Atelier 17` };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <main className="pt-24 sm:pt-28">
      <section className="border-b border-[#161615]/15 px-6 pb-12 pt-6 sm:px-10 sm:pb-16">
        <Link
          href="/labs/006/experiencia/projetos"
          data-cursor-hover
          className="inline-flex items-center gap-2 rounded-sm [font-family:var(--font-atelier-mono)] text-xs uppercase tracking-[0.15em] text-[#161615]/60 hover:text-[#2E4A5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Todos os projetos
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3 [font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.15em] text-[#2E4A5E]">
          <span>{project.category}</span>
          <span className="text-[#161615]/30">·</span>
          <span>{project.location}</span>
          <span className="text-[#161615]/30">·</span>
          <span>{project.year}</span>
        </div>

        <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-[0.94] tracking-tighter sm:text-6xl lg:text-7xl">
          {project.name}
        </h1>

        <p className="mt-8 max-w-2xl text-xl font-medium leading-relaxed text-[#161615]/85 sm:text-2xl">
          {project.statement}
        </p>
      </section>

      {/* Gallery */}
      <section className="grid grid-cols-1 gap-6 px-6 py-12 sm:grid-cols-2 sm:px-10 sm:py-16">
        {project.galleryVariants.map((variant, i) => (
          <Reveal
            key={`${variant}-${i}`}
            delay={i * 0.05}
            className={i === 0 ? "sm:col-span-2" : undefined}
          >
            <AbstractComposition
              variant={variant}
              className={i === 0 ? "aspect-[21/9]" : "aspect-[4/3]"}
              label={`FIG. ${String(i + 1).padStart(2, "0")}`}
            />
          </Reveal>
        ))}
      </section>

      {/* Technical info */}
      <section className="border-y border-[#161615]/15 px-6 py-12 sm:px-10 sm:py-16">
        <Reveal>
          <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
            Ficha técnica
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {[
              ["Programa", project.program],
              ["Área", project.area],
              ["Ano", String(project.year)],
              ["Localização", project.location],
            ].map(([term, value]) => (
              <div key={term}>
                <dt className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.1em] text-[#161615]/65">
                  {term}
                </dt>
                <dd className="mt-1 text-base font-bold tracking-tight sm:text-lg">{value}</dd>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-4">
              <dt className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.1em] text-[#161615]/65">
                Materiais
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.materials.map((material) => (
                  <span
                    key={material}
                    className="border border-[#161615]/20 px-3 py-1 [font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.06em] text-[#161615]/80"
                  >
                    {material}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Floor plan */}
      {project.floorPlan && (
        <section className="px-6 py-12 sm:px-10 sm:py-16">
          <Reveal>
            {project.floorPlan.rooms.some((room) => room.variant !== undefined) ? (
              <>
                <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
                  Planta → Espaço → Fotografia
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  A planta comanda a experiência
                </h2>
                <p className="mt-2 max-w-lg text-sm text-[#161615]/65">
                  Selecione um ambiente na planta — em vez de uma galeria fixa,
                  a escolha revela a composição e a nota de projeto daquele
                  espaço específico.
                </p>
                <div className="mt-8 border border-[#161615]/15 bg-[#F1F0EB] p-4 sm:p-10">
                  <PlanExplorer plan={project.floorPlan} />
                </div>
              </>
            ) : (
              <>
                <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
                  Planta baixa
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  Explore os ambientes
                </h2>
                <p className="mt-2 max-w-lg text-sm text-[#161615]/65">
                  Passe o cursor ou toque nos marcadores para ver a área e as
                  notas técnicas de cada ambiente.
                </p>
                <div className="mt-8 border border-[#161615]/15 bg-[#F1F0EB] p-4 sm:p-10">
                  <FloorPlan plan={project.floorPlan} />
                </div>
              </>
            )}
          </Reveal>
        </section>
      )}

      {/* Location */}
      <section className="border-t border-[#161615]/15 px-6 py-12 sm:px-10 sm:py-16">
        <Reveal>
          <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
            Localização
          </p>
          <div className="mt-6 max-w-md">
            <CoordinateMap coordinate={project.coordinate} location={project.location} />
          </div>
        </Reveal>
      </section>

      {/* Next project */}
      <section className="border-t border-[#161615]/15 px-6 py-16 sm:px-10 sm:py-20">
        <Link
          href={`/labs/006/experiencia/projetos/${next.slug}`}
          data-cursor-hover
          className="group flex items-center justify-between gap-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]"
        >
          <div>
            <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.2em] text-[#161615]/65">
              Próximo projeto
            </p>
            <h3 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-5xl">
              {next.name}
            </h3>
          </div>
          <ArrowUpRight
            className="h-8 w-8 shrink-0 text-[#2E4A5E] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden="true"
          />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
