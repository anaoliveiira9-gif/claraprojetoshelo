import Link from "next/link";
import { PROPERTIES } from "@/components/labs/005/data";
import { PropertyCard } from "@/components/labs/005/property-card";
import { serif } from "@/components/labs/005/theme";

export default function VerticeHomePage() {
  const featured = PROPERTIES.filter((p) => p.destaque).slice(0, 4);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
        <p className="text-xs uppercase tracking-[0.2em] text-[#7A6F63]">
          Vértice — imóveis de alto padrão
        </p>
        <h1
          className={`${serif} mt-4 max-w-3xl text-4xl leading-[1.1] text-[#241E1A] sm:text-6xl`}
        >
          Encontre o lugar certo, com a clareza de um projeto bem desenhado.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#7A6F63] sm:text-base">
          Uma curadoria de casas, apartamentos e coberturas em bairros consagrados do Brasil.
          Busque por cidade ou bairro e filtre por tipo, preço e quartos.
        </p>

        <form
          action="/labs/005/experiencia/imoveis"
          method="GET"
          className="mt-10 flex flex-col gap-3 rounded-sm border border-[#DDD5C8] bg-[#F8F5F0] p-3 sm:flex-row sm:items-center sm:gap-0 sm:p-2"
        >
          <label className="flex-1 px-3 py-2">
            <span className="block text-[10px] uppercase tracking-[0.16em] text-[#7A6F63]">
              Cidade ou bairro
            </span>
            <input
              type="text"
              name="q"
              placeholder="Ex: Jardins, Leblon, Itaim Bibi…"
              className="mt-1 w-full bg-transparent text-[#241E1A] placeholder:text-[#7A6F63]/60 focus:outline-none"
            />
          </label>

          <label className="border-t border-[#DDD5C8] px-3 py-2 sm:w-44 sm:border-l sm:border-t-0">
            <span className="block text-[10px] uppercase tracking-[0.16em] text-[#7A6F63]">
              Tipo
            </span>
            <select
              name="tipo"
              defaultValue=""
              data-cursor-hover
              className="mt-1 w-full bg-transparent text-[#241E1A] focus:outline-none"
            >
              <option value="">Todos</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Cobertura">Cobertura</option>
              <option value="Terreno">Terreno</option>
            </select>
          </label>

          <button
            type="submit"
            data-cursor-hover
            className="m-1 shrink-0 rounded-sm bg-[#2F4A3B] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#F8F5F0] transition-opacity hover:opacity-90"
          >
            Buscar imóveis
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className={`${serif} text-2xl text-[#241E1A] sm:text-3xl`}>Seleção da curadoria</h2>
          <Link
            href="/labs/005/experiencia/imoveis"
            data-cursor-hover
            className="text-xs uppercase tracking-[0.16em] text-[#7A6F63] hover:text-[#241E1A]"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
