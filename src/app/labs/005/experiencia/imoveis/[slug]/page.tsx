import { notFound } from "next/navigation";
import { BedDouble, Bath, Car, Ruler, Building2 } from "lucide-react";
import { PROPERTIES, getPropertyBySlug, formatBRL } from "@/components/labs/005/data";
import { PropertyVisual } from "@/components/labs/005/property-visual";
import { FloorPlan } from "@/components/labs/005/floor-plan";
import { MapSection } from "@/components/labs/005/map-section";
import { FavoriteButton } from "@/components/labs/005/favorite-button";
import { VisitForm } from "@/components/labs/005/visit-form";
import { serif } from "@/components/labs/005/theme";

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

export default async function ImovelPage({
  params,
}: PageProps<"/labs/005/experiencia/imoveis/[slug]">) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const galleryPanels = [
    { label: "Fachada", index: 0 },
    { label: "Sala", index: 1 },
    { label: "Suíte", index: 2 },
    { label: "Vista", index: 3 },
  ];

  const caracteristicas = [
    { icon: Ruler, label: "Área", value: `${property.area} m²` },
    { icon: BedDouble, label: "Quartos", value: `${property.quartos}` },
    { icon: Bath, label: "Banheiros", value: `${property.banheiros}` },
    { icon: Car, label: "Vagas", value: `${property.vagas}` },
    { icon: Building2, label: "Tipo", value: property.tipo },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs uppercase tracking-[0.16em] text-[#7A6F63]">
        {property.bairro}, {property.cidade}
      </p>
      <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h1 className={`${serif} max-w-2xl text-3xl leading-tight text-[#241E1A] sm:text-5xl`}>
          {property.titulo}
        </h1>
        <span className={`${serif} shrink-0 text-2xl text-[#2F4A3B] sm:text-3xl`}>
          {formatBRL(property.preco)}
        </span>
      </div>

      {/* Gallery */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {galleryPanels.map((panel) => (
          <PropertyVisual
            key={panel.label}
            seed={property.seed}
            panelIndex={panel.index}
            label={panel.label}
            className="aspect-[4/3] w-full rounded-sm first:col-span-2 first:row-span-2 first:aspect-square sm:first:aspect-[4/3]"
          />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <FavoriteButton propertyId={property.id} />
      </div>

      {/* Características */}
      <div className="mt-12 grid grid-cols-2 gap-6 border-y border-[#DDD5C8] py-8 sm:grid-cols-5">
        {caracteristicas.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-start gap-1.5">
            <Icon className="h-5 w-5 text-[#2F4A3B]" />
            <span className="text-lg text-[#241E1A]">{value}</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A6F63]">
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[#241E1A]">
        {property.descricao}
      </p>

      {/* Floor plan + map */}
      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className={`${serif} mb-4 text-xl text-[#241E1A]`}>Planta</h2>
          <div className="rounded-sm border border-[#DDD5C8] bg-[#F8F5F0] p-4">
            <FloorPlan property={property} />
          </div>
        </div>
        <div>
          <h2 className={`${serif} mb-4 text-xl text-[#241E1A]`}>Localização</h2>
          <div className="overflow-hidden rounded-sm border border-[#DDD5C8]">
            <MapSection property={property} />
          </div>
        </div>
      </div>

      {/* Visit form */}
      <div className="mt-14">
        <h2 className={`${serif} mb-4 text-xl text-[#241E1A]`}>Solicitar visita</h2>
        <VisitForm propertyTitulo={property.titulo} />
      </div>
    </div>
  );
}
