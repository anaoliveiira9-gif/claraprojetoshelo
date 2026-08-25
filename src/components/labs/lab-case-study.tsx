import Link from "next/link";
import type { Lab } from "@/lib/labs";
import { DeviceFrame } from "@/components/device-frame";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import type { ComponentType } from "react";

export function LabCaseStudy({
  lab,
  next,
  Preview,
}: {
  lab: Lab;
  next: Lab;
  Preview: ComponentType;
}) {
  return (
    <article>
      <section className="border-b border-line px-5 pb-16 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <Link
            href="/#labs"
            data-cursor-hover
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-dim transition-colors hover:text-paper"
          >
            ← Labs
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                Lab {lab.index} — {lab.category}
              </span>
              <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
                {lab.title}
              </h1>
            </div>
            <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
              Projeto Conceitual — {lab.year}
            </span>
          </div>

          <Link
            href={lab.experienceHref}
            data-cursor-hover
            className="group mt-10 inline-flex items-center gap-3 bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-paper"
          >
            Abrir experiência completa
            <span className="transition-transform group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="border-b border-line px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-center gap-10">
          {lab.devices.map((device, i) => (
            <Reveal key={device} delay={i * 0.08}>
              <DeviceFrame
                type={device}
                className={device === "phone" ? "max-w-[200px]" : undefined}
              >
                <Preview />
              </DeviceFrame>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-line px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionLabel label="Estudo de Caso" />
            <div className="mt-6 flex flex-col gap-5">
              {lab.description.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-paper-dim"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                Cliente
              </dt>
              <dd className="mt-2 font-display text-lg font-medium">
                {lab.client}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                Ano
              </dt>
              <dd className="mt-2 font-display text-lg font-medium">
                {lab.year}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                Serviços
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {lab.services.map((service) => (
                  <span
                    key={service}
                    className="border border-line px-3 py-1 text-xs text-paper-dim"
                  >
                    {service}
                  </span>
                ))}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                Tecnologias
              </dt>
              <dd className="mt-2 text-sm text-paper-dim">
                {lab.stack.join(" · ")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link
            href={`/labs/${next.slug}`}
            data-cursor-hover
            className="group flex items-center gap-4"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
              Próximo Lab
            </span>
            <span className="font-display text-2xl font-semibold uppercase tracking-tight transition-colors group-hover:text-accent">
              {next.category} →
            </span>
          </Link>
          <Link
            href="/start-a-project"
            data-cursor-hover
            className="flex items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
          >
            Começar um Projeto →
          </Link>
        </div>
      </section>
    </article>
  );
}
