export type ProductCategory = "Perfumes" | "Ambiente" | "Corpo";

/**
 * The five olfactory families ÉTÉR is organized around. These are the
 * primary way visitors explore the catalog — see ScentNoteStage.
 */
export type ScentNoteId = "MADEIRA" | "PELE" | "FUMAÇA" | "FLOR" | "ÂMBAR";

export interface ScentNoteInfo {
  id: ScentNoteId;
  /** Short, evocative mood line shown when the note is active. */
  mood: string;
  /** Color pair used for the note's background wash — drawn from an
   * existing product gradient so no new palette is introduced. */
  gradient: [string, string];
}

export const SCENT_NOTES: ScentNoteInfo[] = [
  {
    id: "MADEIRA",
    mood: "Madeira seca e resina — um chão de floresta depois da chuva.",
    gradient: ["#6B7A73", "#22302B"],
  },
  {
    id: "PELE",
    mood: "Almíscar quase invisível — o cheiro da própria pele, só que mais.",
    gradient: ["#C9C2B4", "#6B655A"],
  },
  {
    id: "FUMAÇA",
    mood: "Incenso claro, quase mineral — fumaça que não pesa.",
    gradient: ["#B8B2A6", "#4A463E"],
  },
  {
    id: "FLOR",
    mood: "Floral translúcido, editado até restar o essencial.",
    gradient: ["#D9C9B8", "#8C7A63"],
  },
  {
    id: "ÂMBAR",
    mood: "Âmbar denso e quente — a última hora de uma festa que não quer terminar.",
    gradient: ["#8A5A2B", "#3A2412"],
  },
];

export function getScentNoteInfo(id: ScentNoteId) {
  return SCENT_NOTES.find((n) => n.id === id)!;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  size: string;
  price: number;
  description: string;
  notes: string[];
  /** Which of the five scent-note families this composition belongs to. */
  scentNotes: ScentNoteId[];
  gradient: [string, string];
  shape: "flacon" | "spray" | "candle" | "diffuser" | "jar";
}

export const PRODUCTS: Product[] = [
  {
    slug: "ambar-noturno",
    name: "Âmbar Noturno",
    category: "Perfumes",
    size: "50ml",
    price: 890,
    description:
      "Um âmbar denso e quente, como a última hora de uma festa que não quer terminar. Fundo de baunilha e resina, abertura de especiarias escuras.",
    notes: ["Âmbar", "Baunilha", "Cardamomo"],
    scentNotes: ["ÂMBAR"],
    gradient: ["#8A5A2B", "#3A2412"],
    shape: "flacon",
  },
  {
    slug: "sal-e-cedro",
    name: "Sal & Cedro",
    category: "Perfumes",
    size: "50ml",
    price: 820,
    description:
      "Madeira seca e maresia. Um perfume para quem gosta de ficar em silêncio perto do mar depois que todo mundo foi embora.",
    notes: ["Cedro", "Sal Marinho", "Âmbar Cinza"],
    scentNotes: ["MADEIRA", "PELE"],
    gradient: ["#6B7A73", "#22302B"],
    shape: "spray",
  },
  {
    slug: "flor-de-vidro",
    name: "Flor de Vidro",
    category: "Perfumes",
    size: "50ml",
    price: 860,
    description:
      "Floral translúcido, quase frio. Jasmim sem o peso do jasmim — uma versão mais precisa, mais editada dele.",
    notes: ["Jasmim", "Almíscar Branco", "Bergamota"],
    scentNotes: ["FLOR"],
    gradient: ["#D9C9B8", "#8C7A63"],
    shape: "flacon",
  },
  {
    slug: "fumaca-branca",
    name: "Fumaça Branca",
    category: "Perfumes",
    size: "50ml",
    price: 940,
    description:
      "Incenso claro, quase mineral. O oposto do incenso pesado de igreja — algo mais limpo, mais arquitetônico.",
    notes: ["Incenso", "Íris", "Papel"],
    scentNotes: ["FUMAÇA"],
    gradient: ["#B8B2A6", "#4A463E"],
    shape: "spray",
  },
  {
    slug: "terra-molhada",
    name: "Terra Molhada",
    category: "Perfumes",
    size: "50ml",
    price: 780,
    description:
      "O cheiro da primeira chuva sobre terra quente — petricor recriado com vetiver e uma pitada de folha verde.",
    notes: ["Vetiver", "Petricor", "Folha Verde"],
    scentNotes: ["MADEIRA"],
    gradient: ["#5C4A32", "#2A2016"],
    shape: "flacon",
  },
  {
    slug: "vela-ambar",
    name: "Vela Âmbar Noturno",
    category: "Ambiente",
    size: "220g",
    price: 320,
    description:
      "A mesma composição de Âmbar Noturno, traduzida para cera de soja e um pavio de algodão trançado. Queima lenta, cerca de 45 horas.",
    notes: ["Âmbar", "Baunilha", "Madeira"],
    scentNotes: ["ÂMBAR"],
    gradient: ["#8A5A2B", "#241608"],
    shape: "candle",
  },
  {
    slug: "difusor-cedro",
    name: "Difusor Sal & Cedro",
    category: "Ambiente",
    size: "200ml",
    price: 380,
    description:
      "Varetas de rattan em uma base de cedro e sal marinho. Perfuma um ambiente médio de forma contínua e discreta.",
    notes: ["Cedro", "Sal Marinho"],
    scentNotes: ["MADEIRA"],
    gradient: ["#6B7A73", "#1A2320"],
    shape: "diffuser",
  },
  {
    slug: "sabonete-sal-marinho",
    name: "Sabonete Sal Marinho",
    category: "Corpo",
    size: "150g",
    price: 140,
    description:
      "Sabonete artesanal em barra, esfoliação fina com sal marinho e óleo de amêndoas. Perfumado com a mesma base de Sal & Cedro.",
    notes: ["Sal Marinho", "Amêndoas"],
    scentNotes: ["PELE"],
    gradient: ["#C9C2B4", "#6B655A"],
    shape: "jar",
  },
  {
    slug: "oleo-flor-de-vidro",
    name: "Óleo Corporal Flor de Vidro",
    category: "Corpo",
    size: "150ml",
    price: 260,
    description:
      "Óleo seco de rápida absorção, com o mesmo perfil floral e translúcido de Flor de Vidro. Deixa a pele perfumada por horas.",
    notes: ["Jasmim", "Bergamota"],
    scentNotes: ["FLOR", "PELE"],
    gradient: ["#D9C9B8", "#A8987F"],
    shape: "jar",
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
