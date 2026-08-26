import Link from "next/link";
import type { Metadata } from "next";
import { ScentNoteStage } from "@/components/labs/001/scent-note-stage";

export const metadata: Metadata = {
  title: "ÉTÉR — Perfumaria & Objetos Sensoriais",
};

export default function EterHomePage() {
  return (
    <main className="pb-24">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-16 pt-24 text-center sm:pt-32">
        <p className="font-eter-sans text-[11px] uppercase tracking-[0.3em] text-[#171512]/50">
          Perfumaria & Objetos Sensoriais
        </p>
        <h1 className="font-eter-serif mt-6 max-w-3xl text-[clamp(2.5rem,8vw,5.5rem)] font-normal leading-[1.02] tracking-tight">
          O silêncio também tem um perfume.
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#171512]/65">
          ÉTÉR é uma maison brasileira de perfumaria e objetos sensoriais.
          Cada composição nasce de um lugar, uma memória, um material — não
          de uma tendência.
        </p>
        <Link
          href="/labs/001/experiencia/produtos"
          data-cursor-hover
          className="mt-9 border border-[#171512] px-8 py-3.5 font-eter-sans text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#171512] hover:text-[#F6F1E9]"
        >
          Ver coleção completa
        </Link>
      </section>

      <ScentNoteStage />

      <section className="mx-auto mt-28 max-w-4xl px-6 text-center">
        <p className="font-eter-serif text-2xl leading-relaxed text-[#171512]/85 sm:text-3xl">
          &ldquo;Não fazemos perfumes para agradar. Fazemos para lembrar de
          alguma coisa — mesmo que você nunca tenha sentido esse cheiro
          antes.&rdquo;
        </p>
        <p className="mt-6 font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#171512]/45">
          Fundadora, ÉTÉR
        </p>
      </section>
    </main>
  );
}
