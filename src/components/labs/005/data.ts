export type PropertyType = "Apartamento" | "Casa" | "Cobertura" | "Terreno";

export type Property = {
  id: string;
  slug: string;
  titulo: string;
  bairro: string;
  cidade: string;
  tipo: PropertyType;
  preco: number;
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  descricao: string;
  destaque?: boolean;
  /** deterministic 0..1 seeds used to vary the abstract visual + map pin per imóvel */
  seed: number;
};

function seedFromSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 1000) / 1000;
}

const raw: Omit<Property, "seed">[] = [
  {
    id: "1",
    slug: "cobertura-duplex-jardins",
    titulo: "Cobertura Duplex — Jardins",
    bairro: "Jardins",
    cidade: "São Paulo",
    tipo: "Cobertura",
    preco: 4850000,
    area: 210,
    quartos: 3,
    banheiros: 4,
    vagas: 3,
    descricao:
      "Duas lajes conectadas por escada interna, terraço com vista aberta para o bairro e acabamento em madeira natural e pedra portuguesa.",
    destaque: true,
  },
  {
    id: "2",
    slug: "apartamento-vista-leblon",
    titulo: "Apartamento Vista — Leblon",
    bairro: "Leblon",
    cidade: "Rio de Janeiro",
    tipo: "Apartamento",
    preco: 3200000,
    area: 138,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    descricao:
      "Planta reformada por arquiteto, luz natural direta na sala principal e varanda voltada para a copa das árvores da rua.",
    destaque: true,
  },
  {
    id: "3",
    slug: "casa-jardim-europa",
    titulo: "Casa de Vila — Jardim Europa",
    bairro: "Jardim Europa",
    cidade: "São Paulo",
    tipo: "Casa",
    preco: 6900000,
    area: 320,
    quartos: 4,
    banheiros: 5,
    vagas: 4,
    descricao:
      "Sobrado autoral em concreto aparente e vidro, jardim interno com pé-direito duplo e suíte master com closet integrado.",
    destaque: true,
  },
  {
    id: "4",
    slug: "studio-itaim-bibi",
    titulo: "Studio Alto Padrão — Itaim Bibi",
    bairro: "Itaim Bibi",
    cidade: "São Paulo",
    tipo: "Apartamento",
    preco: 1450000,
    area: 58,
    quartos: 1,
    banheiros: 1,
    vagas: 1,
    descricao:
      "Studio compacto e funcional a poucos passos da Faria Lima, com mobiliário planejado e portaria 24h.",
    destaque: true,
  },
  {
    id: "5",
    slug: "terreno-granja-viana",
    titulo: "Terreno Residencial — Granja Viana",
    bairro: "Granja Viana",
    cidade: "Cotia",
    tipo: "Terreno",
    preco: 2100000,
    area: 1000,
    quartos: 0,
    banheiros: 0,
    vagas: 0,
    descricao:
      "Lote plano em condomínio fechado, topografia favorável para projeto horizontal, cercado de mata preservada.",
  },
  {
    id: "6",
    slug: "cobertura-panoramica-leblon",
    titulo: "Cobertura Panorâmica — Leblon",
    bairro: "Leblon",
    cidade: "Rio de Janeiro",
    tipo: "Cobertura",
    preco: 9800000,
    area: 280,
    quartos: 4,
    banheiros: 5,
    vagas: 3,
    descricao:
      "Última laje do edifício, piscina privativa e vista de 180° para o mar, com automação residencial completa.",
  },
  {
    id: "7",
    slug: "apartamento-garden-moema",
    titulo: "Apartamento Garden — Moema",
    bairro: "Moema",
    cidade: "São Paulo",
    tipo: "Apartamento",
    preco: 2650000,
    area: 145,
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    descricao:
      "Unidade térrea com jardim privativo de 60m², pé-direito alto e acesso direto ao parque do quarteirão.",
  },
  {
    id: "8",
    slug: "casa-vila-madalena",
    titulo: "Casa de Vila — Vila Madalena",
    bairro: "Vila Madalena",
    cidade: "São Paulo",
    tipo: "Casa",
    preco: 3750000,
    area: 195,
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    descricao:
      "Casa térrea reformada em rua tranquila, atelier nos fundos e quintal com horta e área de estar coberta.",
  },
];

export const PROPERTIES: Property[] = raw.map((p) => ({
  ...p,
  seed: seedFromSlug(p.slug),
}));

export function getPropertyBySlug(slug: string) {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
