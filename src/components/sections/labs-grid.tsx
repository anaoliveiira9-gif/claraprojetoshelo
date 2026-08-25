import Link from "next/link";
import { LABS } from "@/lib/labs";
import { SectionLabel } from "@/components/section-label";
import { DeviceFrame } from "@/components/device-frame";
import { LAB_PREVIEWS } from "@/components/labs/preview-registry";
import { Reveal } from "@/components/reveal";

export function LabsGrid() {
  return (
    <section id="labs" className="border-b border-line px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="01" label="Labs — Projetos Conceituais" />
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper-dim">
          Projetos conceituais desenvolvidos internamente como demonstração de
          capacidade — não são trabalhos encomendados por essas marcas.
        </p>

        <div className="mt-16 grid gap-px overflow-hidden bg-line sm:grid-cols-2">
          {LABS.map((lab, i) => (
            <Reveal key={lab.slug} delay={(i % 2) * 0.06}>
              <Link
                href={`/labs/${lab.slug}`}
                data-cursor-hover
                className="group flex h-full flex-col justify-between gap-8 bg-ink p-6 transition-colors hover:bg-ink-soft sm:p-10"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                      Lab {lab.index}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
                      {lab.category}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-paper-faint">
                    {lab.year}
                  </span>
                </div>

                <div className="flex items-center justify-center py-6">
                  <DeviceFrame
                    type={lab.devices[0]}
                    className="max-w-[260px] transition-transform duration-500 group-hover:-translate-y-1"
                  >
                    {(() => {
                      const Preview = LAB_PREVIEWS[lab.index];
                      return <Preview />;
                    })()}
                  </DeviceFrame>
                </div>

                <div className="flex items-end justify-between gap-4 border-t border-line pt-4">
                  <p className="max-w-[70%] text-sm leading-relaxed text-paper-dim">
                    {lab.summary}
                  </p>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-transform group-hover:translate-x-1">
                    Ver →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
