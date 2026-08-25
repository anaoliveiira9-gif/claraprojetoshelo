export type NovaCategory = "Comida" | "Arte" | "Música" | "Ar Livre";

export type NovaExperience = {
  id: string;
  slug: string;
  title: string;
  category: NovaCategory;
  tipo: string;
  teaser: string;
  description: string;
  location: string;
  neighborhood: string;
  time: string;
  priceHint: string;
  gradient: string;
  mapX: number;
  mapY: number;
};

/**
 * Gradient panels standing in for photography — varied per category,
 * staying inside the NOVA palette family (warm cream / ink / one magenta
 * accent) rather than drifting into arbitrary neon.
 */
const GRADIENTS: Record<NovaCategory, string[]> = {
  Comida: [
    "linear-gradient(135deg, #F4A26A 0%, #D93B6C 100%)",
    "linear-gradient(135deg, #F6C453 0%, #E5673F 100%)",
  ],
  Arte: [
    "linear-gradient(135deg, #7C9885 0%, #2F4858 100%)",
    "linear-gradient(135deg, #B7A6C9 0%, #5C4B6B 100%)",
  ],
  Música: [
    "linear-gradient(135deg, #D93B6C 0%, #5C4B6B 100%)",
    "linear-gradient(135deg, #E5673F 0%, #8A2F4F 100%)",
  ],
  "Ar Livre": [
    "linear-gradient(135deg, #8FB39A 0%, #3D6B5C 100%)",
    "linear-gradient(135deg, #C9D97E 0%, #4E7A5A 100%)",
  ],
};

export const NOVA_EXPERIENCES: NovaExperience[] = [
  {
    id: "1",
    slug: "feira-do-largo",
    title: "Feira do Largo",
    category: "Comida",
    tipo: "Feira gastronômica",
    teaser: "Barracas autorais reunidas num só quarteirão histórico.",
    description:
      "Uma feira de rua reunindo cozinheiros independentes num quarteirão de casario antigo — pratos autorais em porções pequenas, feitos para experimentar vários de uma vez.",
    location: "Largo da Ordem, 45",
    neighborhood: "Centro Histórico",
    time: "Sáb, 11h às 20h",
    priceHint: "Entrada gratuita",
    gradient: GRADIENTS.Comida[0],
    mapX: 28,
    mapY: 34,
  },
  {
    id: "2",
    slug: "expo-linhas-soltas",
    title: "Linhas Soltas",
    category: "Arte",
    tipo: "Exposição",
    teaser: "Bordado contemporâneo de oito artistas da nova geração.",
    description:
      "Mostra coletiva de bordado e têxtil contemporâneo, reunindo oito artistas emergentes em torno do fio como linguagem — da escala miniatura ao painel de parede inteira.",
    location: "Galeria Pátio Novo",
    neighborhood: "Vila Baixa",
    time: "Ter–Dom, 10h às 18h",
    priceHint: "R$ 20",
    gradient: GRADIENTS.Arte[0],
    mapX: 62,
    mapY: 22,
  },
  {
    id: "3",
    slug: "show-noite-cabocla",
    title: "Noite Cabocla",
    category: "Música",
    tipo: "Show",
    teaser: "Trio instrumental cruzando choro e groove eletrônico.",
    description:
      "Um trio que atravessa choro, forró instrumental e batidas eletrônicas ao vivo — set autoral pensado para casa pequena, som de perto.",
    location: "Casa Amarela",
    neighborhood: "Bela Vista",
    time: "Sex, 21h",
    priceHint: "R$ 35",
    gradient: GRADIENTS.Música[0],
    mapX: 45,
    mapY: 58,
  },
  {
    id: "4",
    slug: "trilha-mirante-verde",
    title: "Trilha do Mirante Verde",
    category: "Ar Livre",
    tipo: "Passeio",
    teaser: "Caminhada guiada de 5km com parada para vista da cidade.",
    description:
      "Caminhada guiada de dificuldade leve, cerca de 5km entre mata e trecho urbano, terminando num mirante com vista panorâmica da cidade ao entardecer.",
    location: "Parque das Águas",
    neighborhood: "Zona Sul",
    time: "Dom, 7h30",
    priceHint: "R$ 15",
    gradient: GRADIENTS["Ar Livre"][0],
    mapX: 78,
    mapY: 70,
  },
  {
    id: "5",
    slug: "brunch-varanda",
    title: "Brunch da Varanda",
    category: "Comida",
    tipo: "Restaurante",
    teaser: "Menu de brunch de fim de semana com pães de fermentação natural.",
    description:
      "Cardápio de brunch de fim de semana com foco em fermentação natural e produtos de pequenos produtores da região — mesas na varanda com vista para o jardim.",
    location: "Rua das Acácias, 210",
    neighborhood: "Jardim Alto",
    time: "Sáb–Dom, 9h às 14h",
    priceHint: "R$ 60 pp",
    gradient: GRADIENTS.Comida[1],
    mapX: 18,
    mapY: 60,
  },
  {
    id: "6",
    slug: "expo-concreto-vivo",
    title: "Concreto Vivo",
    category: "Arte",
    tipo: "Exposição",
    teaser: "Fotografia de arquitetura modernista em grande formato.",
    description:
      "Ensaio fotográfico em grande formato sobre a arquitetura modernista da cidade — concreto, sombra e geometria fotografados ao longo de um ano.",
    location: "Centro Cultural Torre",
    neighborhood: "Centro Histórico",
    time: "Qua–Dom, 12h às 19h",
    priceHint: "R$ 12",
    gradient: GRADIENTS.Arte[1],
    mapX: 34,
    mapY: 42,
  },
  {
    id: "7",
    slug: "sarau-vinil",
    title: "Sarau de Vinil",
    category: "Música",
    tipo: "Show",
    teaser: "Seleção de vinis raros com banda convidada tocando junto.",
    description:
      "Uma noite de DJ set em vinil intercalado com participações ao vivo de uma banda convidada — repertório que passeia por soul, MPB e disco.",
    location: "Bar do Fundo",
    neighborhood: "Vila Baixa",
    time: "Qui, 20h",
    priceHint: "R$ 25",
    gradient: GRADIENTS.Música[1],
    mapX: 58,
    mapY: 48,
  },
  {
    id: "8",
    slug: "pedal-orla",
    title: "Pedal na Orla",
    category: "Ar Livre",
    tipo: "Passeio",
    teaser: "Passeio de bicicleta em grupo pela orla ao pôr do sol.",
    description:
      "Passeio de bicicleta em grupo, ritmo tranquilo, acompanhando a orla até o píer ao pôr do sol — bicicletas emprestadas disponíveis para quem não tiver a sua.",
    location: "Píer Central",
    neighborhood: "Orla",
    time: "Ter, 18h",
    priceHint: "Gratuito",
    gradient: GRADIENTS["Ar Livre"][1],
    mapX: 85,
    mapY: 30,
  },
];

export const NOVA_CATEGORIES: NovaCategory[] = [
  "Comida",
  "Arte",
  "Música",
  "Ar Livre",
];

export function getExperienceBySlug(slug: string) {
  return NOVA_EXPERIENCES.find((item) => item.slug === slug);
}

export function generateConfirmationCode(seed: string) {
  const base = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const code = (1000 + ((base * 37) % 9000)).toString();
  return `NOVA-${code}`;
}
