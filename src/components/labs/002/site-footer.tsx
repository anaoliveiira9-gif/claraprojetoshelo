import Link from "next/link";
import { Reveal } from "@/components/labs/002/reveal";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#161615]/15 bg-[#FAFAF8] px-6 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.2em] text-[#2E4A5E]">
            Filosofia
          </p>
          <p className="mt-4 max-w-2xl text-2xl font-bold leading-[1.2] tracking-tight sm:text-3xl">
            Desenhamos a partir do lugar, não sobre ele. Cada projeto começa
            no levantamento do terreno — e termina quando a estrutura já não
            precisa mais de nós.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-[#161615]/15 pt-10 sm:grid-cols-3">
          <div>
            <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.2em] text-[#161615]/65">
              01 / Fale com o estúdio
            </p>
            <Link
              href="/labs/002/experiencia/contato"
              data-cursor-hover
              className="mt-3 inline-block rounded-sm text-lg font-bold uppercase tracking-tight text-[#161615] underline decoration-[#2E4A5E] decoration-2 underline-offset-4 transition-colors hover:text-[#2E4A5E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]"
            >
              Iniciar conversa
            </Link>
          </div>
          <div>
            <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.2em] text-[#161615]/65">
              02 / Estúdio
            </p>
            <p className="mt-3 [font-family:var(--font-atelier-mono)] text-xs leading-relaxed text-[#161615]/80">
              Alameda Vidros, 245
              <br />
              Vila Basalto — São Paulo, SP
            </p>
          </div>
          <div>
            <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.2em] text-[#161615]/65">
              03 / Contato direto
            </p>
            <p className="mt-3 [font-family:var(--font-atelier-mono)] text-xs leading-relaxed text-[#161615]/80">
              contato@atelier17.com.br
              <br />
              +55 11 4002-1917
            </p>
          </div>
        </div>

        <p className="mt-16 [font-family:var(--font-atelier-mono)] text-[9px] uppercase tracking-[0.2em] text-[#161615]/65">
          Atelier 17 — projeto conceitual de portfólio, produzido pela Alumna.
        </p>
      </div>
    </footer>
  );
}
