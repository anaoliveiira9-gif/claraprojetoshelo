"use client";

import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { useSiteContent } from "@/components/site-content-provider";

export function Studio() {
  const { studio } = useSiteContent();
  return (
    <section id="studio" className="border-b border-line px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="04" label={studio.label} />

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.2] tracking-tight text-paper">
              {studio.paragraph}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              {studio.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-medium">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
