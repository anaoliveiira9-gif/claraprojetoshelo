import Link from "next/link";
import { Logo } from "@/components/logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 text-accent/[0.06]"
      >
        <Logo className="h-[480px] w-[480px] animate-spin-slow" />
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-paper-faint">
          <span>Estúdio Independente</span>
          <span className="hidden sm:inline">N 23.5505° / W 46.6333°</span>
        </div>

        <h1 className="mt-10 font-display text-[clamp(3rem,11vw,9rem)] font-semibold uppercase leading-[0.88] tracking-tight">
          Alumna
        </h1>
        <p className="mt-2 font-display text-[clamp(1.5rem,4.5vw,3rem)] font-medium uppercase leading-none tracking-tight text-paper-dim">
          Digital Experience
        </p>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-[1.4fr_1fr] md:items-end">
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-paper">
            Criamos experiências digitais para marcas que não querem parecer
            com todas as outras.
          </p>

          <div className="flex flex-col items-start gap-6">
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
              Um estúdio independente de design e tecnologia. Sites, produtos
              digitais e sistemas — pensados como laboratório, apresentados
              como editorial.
            </p>
            <Link
              href="/start-a-project"
              data-cursor-hover
              className="group flex items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Explorar
              <span className="transition-transform group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
