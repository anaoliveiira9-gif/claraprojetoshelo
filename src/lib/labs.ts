export interface Lab {
  index: string;
  slug: string;
  category: string;
  title: string;
  client: string;
  summary: string;
  description: string[];
  services: string[];
  year: string;
  stack: string[];
  devices: ("desktop" | "laptop" | "tablet" | "phone")[];
  /** Route to the real, fully interactive product. */
  experienceHref: string;
}

/**
 * Sequenced for a portfolio narrative — impacto → produto → tecnologia →
 * variedade → profundidade — front-loading the most visually immediate,
 * easy-to-grasp experiences, and keeping similar domains (architecture vs.
 * real estate) apart instead of back-to-back. `index`/`slug` match this
 * display order directly.
 */
export const LABS: Lab[] = [
  {
    index: "001",
    slug: "001",
    category: "Hospitality",
    title: "Reservar deveria ser um prazer.",
    client: "NOIR — Restaurante & Hotel Boutique",
    summary:
      "Experiência digital cinematográfica para um restaurante-hotel boutique, com um fluxo de reserva funcional e sem fricção.",
    description: [
      "NOIR queria um site que refletisse a experiência do lugar antes mesmo da chegada do hóspede. Desenhamos um fluxo de reserva de quatro passos — data, pessoas, horário, confirmação — sobre uma base visual escura, quente e sensorial.",
      "Cada etapa da reserva funciona de verdade dentro da demonstração e gera um código de confirmação ao final.",
    ],
    services: ["Website", "Sistema de Reservas", "Direção de Arte"],
    year: "2025",
    stack: ["Next.js", "React Context", "Framer Motion"],
    devices: ["desktop", "phone"],
    experienceHref: "/labs/001/experiencia",
  },
  {
    index: "002",
    slug: "002",
    category: "Digital Product",
    title: "Descobrir a cidade, de novo.",
    client: "NOVA — Descoberta Cultural",
    summary:
      "Aplicativo mobile de descoberta de experiências, restaurantes e eventos, navegável como um app nativo de verdade.",
    description: [
      "NOVA nasceu para tornar a descoberta cultural da cidade mais editorial e menos genérica. Desenhamos onboarding, home, busca, mapa, favoritos e reservas — tudo com identidade visual própria.",
      "Cada tela é um componente real e navegável, com transições e barra de navegação inferior como um aplicativo nativo.",
    ],
    services: ["App", "Design de Produto", "Sistema de Design"],
    year: "2026",
    stack: ["Next.js", "Framer Motion", "React Context"],
    devices: ["phone", "tablet"],
    experienceHref: "/labs/002/experiencia",
  },
  {
    index: "003",
    slug: "003",
    category: "AI / SaaS",
    title: "Complexidade, organizada.",
    client: "ORBIT — Inteligência Operacional",
    summary:
      "Produto digital B2B com login, dashboard, métricas, automações e configurações — interface densa tratada com clareza e precisão.",
    description: [
      "ORBIT organiza operações internas de empresas de médio porte. O desafio era caber muita informação — métricas, filas, automações — numa interface que não cansa quem usa todos os dias.",
      "Construímos um sistema com hierarquia clara de informação, estados vazios, carregamento e um alternador de tema — sem gradientes, sem cards flutuando, sem clichê de 'IA'.",
    ],
    services: ["Produto Digital", "Painel", "Sistema de Design"],
    year: "2026",
    stack: ["Next.js", "SVG", "React Context"],
    devices: ["desktop", "laptop", "tablet"],
    experienceHref: "/labs/003/experiencia",
  },
  {
    index: "004",
    slug: "004",
    category: "Real Estate",
    title: "Encontrar o lugar certo.",
    client: "VÉRTICE — Plataforma Imobiliária",
    summary:
      "Plataforma imobiliária premium com busca, filtros funcionais, favoritos de sessão, plantas e agendamento de visitas.",
    description: [
      "VÉRTICE cataloga imóveis de alto padrão. A prioridade era um sistema de busca rápido — filtros, favoritos e resultados sincronizados — sem o peso visual típico de portais imobiliários.",
      "Cada imóvel tem galeria, planta, mapa estilizado e um formulário de visita que gera confirmação dentro da própria interface.",
    ],
    services: ["Plataforma", "Busca e Filtros", "Agendamento"],
    year: "2026",
    stack: ["Next.js", "React Context", "SVG"],
    devices: ["laptop", "phone"],
    experienceHref: "/labs/004/experiencia",
  },
  {
    index: "005",
    slug: "005",
    category: "Luxury Commerce",
    title: "A fragrância como interface.",
    client: "ÉTÉR — Perfumaria & Objetos Sensoriais",
    summary:
      "E-commerce editorial para uma maison brasileira de perfumaria, onde cada frasco é tratado como objeto de desejo.",
    description: [
      "ÉTÉR precisava de uma loja que competisse com as grandes maisons sem perder identidade própria. Construímos uma experiência de compra pausada, quase silenciosa — grandes composições tipográficas, tons de âmbar e um checkout em poucos passos.",
      "Catálogo, busca, wishlist e carrinho funcionam de verdade dentro da demonstração — não são apenas telas estáticas.",
    ],
    services: ["E-commerce", "Sistema de Design", "Direção de Marca"],
    year: "2026",
    stack: ["Next.js", "React Context", "Framer Motion"],
    devices: ["desktop", "tablet", "phone"],
    experienceHref: "/labs/005/experiencia",
  },
  {
    index: "006",
    slug: "006",
    category: "Architecture",
    title: "Plantas, luz e silêncio.",
    client: "ATELIER 17 — Arquitetura Contemporânea",
    summary:
      "Site institucional para um escritório de arquitetura brasileiro, com apresentação editorial de projetos e plantas interativas.",
    description: [
      "O desafio era apresentar projetos residenciais e comerciais sem transformar o site em um catálogo raso. A navegação foi construída em torno de plantas técnicas, galerias em tela cheia e uma grade assimétrica que respira.",
      "Cada projeto tem sua própria narrativa: contexto, processo, materiais e resultado — como uma publicação de arquitetura levada para a web.",
    ],
    services: ["Website", "Sistema Editorial", "Direção de Arte"],
    year: "2026",
    stack: ["Next.js", "Framer Motion", "SVG"],
    devices: ["desktop", "tablet", "phone"],
    experienceHref: "/labs/006/experiencia",
  },
];

export function getLabBySlug(slug: string) {
  return LABS.find((lab) => lab.slug === slug);
}

export function getAdjacentLabs(slug: string) {
  const currentIndex = LABS.findIndex((lab) => lab.slug === slug);
  const next = LABS[(currentIndex + 1) % LABS.length];
  return { next };
}
