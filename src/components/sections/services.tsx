"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { useSiteContent } from "@/components/site-content-provider";

export function Services() {
  const { servicesSection } = useSiteContent();
  return (
    <section id="services" className="border-b border-line px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="03" label={servicesSection.label} />

        <div className="mt-6 grid divide-y divide-line border-t border-line">
          {servicesSection.items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.03}>
              <Link
                href={`/servicos/${s.slug}`}
                data-cursor-hover
                className="group grid grid-cols-[3rem_1fr] items-center gap-4 py-6 sm:grid-cols-[4rem_1fr_2fr_auto] sm:gap-8 sm:py-8"
              >
                <span className="font-mono text-xs text-paper-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-semibold uppercase tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                  {s.name}
                </h3>
                <p className="col-span-2 hidden max-w-md text-sm leading-relaxed text-paper-dim sm:col-span-1 sm:block">
                  {s.description}
                </p>
                <span className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-paper opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 sm:block">
                  Ver serviço →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={servicesSection.items.length * 0.03}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
              Não sabe por onde começar? O diagnóstico ajusta o escopo e a
              estimativa para o que você realmente precisa.
            </p>
            <Link
              href="/start-a-project"
              data-cursor-hover
              className="group flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:text-accent"
            >
              Começar um Projeto
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
