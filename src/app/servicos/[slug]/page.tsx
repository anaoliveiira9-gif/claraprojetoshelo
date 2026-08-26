import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService, formatBRL } from "@/lib/pricing";
import { SectionLabel } from "@/components/section-label";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return { title: service ? `${service.name} — ALUMNA` : "ALUMNA" };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = SERVICES.findIndex((s) => s.slug === slug);
  const priceLabel = service.isRecurring
    ? `${formatBRL(service.basePrice)}/mês`
    : formatBRL(service.basePrice);

  return (
    <article>
      <section className="border-b border-line px-5 pb-16 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1000px]">
          <Link
            href="/#services"
            data-cursor-hover
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-dim transition-colors hover:text-paper"
          >
            ← Serviços
          </Link>

          <span className="mt-8 block font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
            Serviço {String(index + 1).padStart(2, "0")}
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-[clamp(2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
            {service.tagline}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-paper-dim">
            {service.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                A partir de
              </p>
              <p className="mt-1 font-display text-3xl font-semibold text-accent">
                {priceLabel}
              </p>
            </div>
            <Link
              href={`/start-a-project?servico=${service.slug}`}
              data-cursor-hover
              className="group flex items-center gap-3 bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-paper"
            >
              Começar um projeto
              <span className="transition-transform group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1000px] gap-14 sm:grid-cols-2">
          <div>
            <SectionLabel label="Para quem é" />
            <p className="mt-6 text-base leading-relaxed text-paper-dim">
              {service.audience}
            </p>
          </div>

          <div>
            <SectionLabel label="Principais entregas" />
            <ul className="mt-6 flex flex-col gap-3">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-paper-dim"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1000px]">
          <SectionLabel label="Funcionalidades que podem ser incluídas" />
          <div className="mt-6 flex flex-wrap gap-2">
            {service.possibleFeatures.map((feature) => (
              <span
                key={feature}
                className="border border-line px-3 py-1.5 text-xs text-paper-dim"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
              Cada projeto é único — o diagnóstico ajusta o escopo e a
              estimativa para o que você realmente precisa.
            </p>
            <Link
              href={`/start-a-project?servico=${service.slug}`}
              data-cursor-hover
              className="flex shrink-0 items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Começar um projeto →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
