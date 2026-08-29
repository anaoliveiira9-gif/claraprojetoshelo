import { ListingClient } from "@/components/labs/004/listing";
import { serif } from "@/components/labs/004/theme";

export default async function ImoveisPage({
  searchParams,
}: PageProps<"/labs/004/experiencia/imoveis">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const tipo = typeof params.tipo === "string" ? params.tipo : "";

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className={`${serif} text-3xl text-[#241E1A] sm:text-4xl`}>Imóveis</h1>
      <p className="mt-2 max-w-xl text-sm text-[#6B6157]">
        Refine por localização, tipo, quartos e faixa de preço.
      </p>

      <div className="mt-8">
        <ListingClient initialQ={q} initialTipo={tipo} />
      </div>
    </div>
  );
}
