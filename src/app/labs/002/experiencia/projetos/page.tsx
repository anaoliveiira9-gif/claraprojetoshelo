import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/components/labs/002/data";
import { AbstractComposition } from "@/components/labs/002/abstract-composition";
import { Reveal } from "@/components/labs/002/reveal";
import { SiteFooter } from "@/components/labs/002/site-footer";

export const metadata: Metadata = {
  title: "Projetos — Atelier 17",
};

export default function ProjetosPage() {
  return (
    <main className="pt-24 sm:pt-28">
      <section className="border-b border-[#161615]/15 px-6 pb-12 pt-6 sm:px-10 sm:pb-16">
        <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
          Índice de obras
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.92] tracking-tighter sm:text-7xl">
          Projetos
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#161615]/75">
          {PROJECTS.length} obras selecionadas, entre residências,
          equipamentos institucionais, espaços comerciais e culturais —
          construídas entre {Math.min(...PROJECTS.map((p) => p.year))} e{" "}
          {Math.max(...PROJECTS.map((p) => p.year))}.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-px bg-[#161615]/15 sm:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.06}>
            <Link
              href={`/labs/002/experiencia/projetos/${project.slug}`}
              data-cursor-hover
              className="group flex h-full flex-col bg-[#FAFAF8] p-6 transition-colors sm:p-10"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.15em] text-[#161615]/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.15em] text-[#2E4A5E]">
                  {project.category}
                </span>
              </div>

              <AbstractComposition
                variant={project.galleryVariants[0]}
                className="mt-6 aspect-[16/10] border border-[#161615]/15 transition-colors group-hover:border-[#2E4A5E]"
              />

              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                    {project.name}
                  </h2>
                  <p className="mt-2 [font-family:var(--font-atelier-mono)] text-xs uppercase tracking-[0.1em] text-[#161615]/55">
                    {project.location} · {project.year} · {project.area}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#2E4A5E] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#161615]/70">
                {project.teaser}
              </p>
            </Link>
          </Reveal>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
