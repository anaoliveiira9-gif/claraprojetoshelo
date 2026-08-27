import type { Metadata } from "next";
import { ContactForm } from "@/components/labs/002/contact-form";
import { CoordinateMap } from "@/components/labs/002/coordinate-map";
import { Reveal } from "@/components/labs/002/reveal";

export const metadata: Metadata = {
  title: "Contato — Atelier 17",
};

export default function ContatoPage() {
  return (
    <main className="pt-24 sm:pt-28">
      <section className="border-b border-[#161615]/15 px-6 pb-12 pt-6 sm:px-10 sm:pb-16">
        <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
          Vamos conversar
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.92] tracking-tighter sm:text-7xl">
          Contato
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#161615]/75">
          Conte um pouco sobre o terreno, o programa e o prazo do seu
          projeto. Respondemos todos os contatos pessoalmente.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-8">
          <div>
            <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.15em] text-[#161615]/65">
              E-mail
            </p>
            <p className="mt-2 text-lg font-bold tracking-tight">contato@atelier17.com.br</p>
          </div>
          <div>
            <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.15em] text-[#161615]/65">
              Telefone
            </p>
            <p className="mt-2 text-lg font-bold tracking-tight">+55 11 4002-1917</p>
          </div>
          <div>
            <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.15em] text-[#161615]/65">
              Endereço
            </p>
            <p className="mt-2 text-lg font-bold tracking-tight">
              Alameda Vidros, 245
              <br />
              Vila Basalto — São Paulo, SP
            </p>
          </div>
          <CoordinateMap coordinate="23°34' S · 46°41' W" location="Vila Basalto, São Paulo" />
        </Reveal>
      </section>
    </main>
  );
}
