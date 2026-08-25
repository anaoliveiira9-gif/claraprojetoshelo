import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";

const SERVICES = [
  {
    n: "01",
    name: "Website",
    desc: "Sites institucionais editoriais, rápidos e memoráveis.",
  },
  {
    n: "02",
    name: "E-commerce",
    desc: "Lojas de alta conversão sem parecer template.",
  },
  {
    n: "03",
    name: "App",
    desc: "Aplicativos completos, do onboarding ao uso diário.",
  },
  {
    n: "04",
    name: "Produto Digital",
    desc: "Produtos digitais com identidade e sistema próprios.",
  },
  {
    n: "05",
    name: "Sistemas",
    desc: "Design systems e painéis internos que escalam.",
  },
  {
    n: "06",
    name: "Automação",
    desc: "Fluxos e integrações que tiram trabalho manual do time.",
  },
] as const;

export function Services() {
  return (
    <section id="services" className="border-b border-line px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="03" label="Serviços" />

        <div className="mt-6 grid divide-y divide-line border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.03}>
              <Link
                href={{ pathname: "/start-a-project", query: { focus: s.name } }}
                data-cursor-hover
                className="group grid grid-cols-[3rem_1fr] items-center gap-4 py-6 sm:grid-cols-[4rem_1fr_2fr_auto] sm:gap-8 sm:py-8"
              >
                <span className="font-mono text-xs text-paper-faint">
                  {s.n}
                </span>
                <h3 className="font-display text-2xl font-semibold uppercase tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                  {s.name}
                </h3>
                <p className="col-span-2 hidden max-w-md text-sm leading-relaxed text-paper-dim sm:col-span-1 sm:block">
                  {s.desc}
                </p>
                <span className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-paper opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 sm:block">
                  Começar →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
