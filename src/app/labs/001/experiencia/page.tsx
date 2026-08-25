import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS, formatPrice } from "@/components/labs/001/products";
import { ScentObject } from "@/components/labs/001/scent-object";

export const metadata: Metadata = {
  title: "ÉTÉR — Perfumaria & Objetos Sensoriais",
};

const featured = PRODUCTS.filter((p) => p.category === "Perfumes").slice(0, 3);

export default function EterHomePage() {
  return (
    <main className="pb-24">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-24 text-center sm:pt-32">
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
          Ver coleção
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between border-b border-[#171512]/10 pb-4">
          <h2 className="font-eter-serif text-2xl">Composições em destaque</h2>
          <Link
            href="/labs/001/experiencia/produtos"
            data-cursor-hover
            className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#171512]/60 hover:text-[#171512]"
          >
            Ver tudo →
          </Link>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/labs/001/experiencia/produtos/${product.slug}`}
              data-cursor-hover
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                  <ScentObject product={product} />
                </div>
              </div>
              <p className="font-eter-serif mt-4 text-lg">{product.name}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.1em] text-[#171512]/50">
                  {product.size}
                </span>
                <span className="text-sm text-[#171512]/70">
                  {formatPrice(product.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
