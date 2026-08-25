// Fictional content for ATELIER 17 — a Brazilian architecture studio built
// as a portfolio/case-study concept by ALUMNA. Nothing here refers to a
// real firm, building, or address.

export interface FloorPlanRoom {
  id: string;
  label: string;
  note: string;
  /** [x, y, w, h] in a 400x300 unit drafting space */
  rect: [number, number, number, number];
}

export interface FloorPlan {
  outer: [number, number, number, number];
  rooms: FloorPlanRoom[];
}

export interface Project {
  slug: string;
  name: string;
  location: string;
  category: "Residencial" | "Institucional" | "Comercial" | "Cultural";
  year: number;
  area: string;
  program: string;
  materials: string[];
  statement: string;
  teaser: string;
  coordinate: string;
  galleryVariants: number[];
  floorPlan?: FloorPlan;
}

export const PROJECTS: Project[] = [
  {
    slug: "casa-vertente",
    name: "Casa Vertente",
    location: "Nova Lima, MG",
    category: "Residencial",
    year: 2023,
    area: "412 m²",
    program: "Residência unifamiliar",
    materials: ["Concreto aparente", "Madeira de peroba", "Vidro laminado", "Pedra-sabão"],
    statement:
      "Uma casa que se escora na encosta e se recusa a escondê-la — a topografia atravessa a planta em vez de ser nivelada por ela.",
    teaser:
      "Residência escalonada sobre um terreno de forte declive, com a estrutura seguindo o desenho natural do morro.",
    coordinate: "20°06' S · 43°51' W",
    galleryVariants: [1, 3, 5, 2],
    floorPlan: {
      outer: [20, 20, 360, 220],
      rooms: [
        {
          id: "estar",
          label: "Sala de estar — 38 m²",
          note: "Pé-direito duplo voltado para o vale",
          rect: [40, 50, 140, 110],
        },
        {
          id: "cozinha",
          label: "Cozinha — 18 m²",
          note: "Bancada em pedra-sabão local",
          rect: [190, 50, 90, 60],
        },
        {
          id: "suite",
          label: "Suíte principal — 24 m²",
          note: "Abertura corrida de 6 metros",
          rect: [190, 120, 90, 90],
        },
        {
          id: "varanda",
          label: "Varanda — 30 m²",
          note: "Estrutura em balanço sobre a encosta",
          rect: [290, 50, 70, 160],
        },
      ],
    },
  },
  {
    slug: "edificio-lamina",
    name: "Edifício Lâmina",
    location: "São Paulo, SP",
    category: "Institucional",
    year: 2021,
    area: "3.180 m²",
    program: "Sede institucional, 10 pavimentos",
    materials: ["Concreto branco", "Brise de alumínio", "Vidro fumê", "Granito cinza andorinha"],
    statement:
      "Uma lâmina vertical corta o quarteirão em dois — de um lado a rua, do outro um pátio interno silencioso.",
    teaser:
      "Sede institucional organizada como um plano vertical fino, com núcleo de circulação deslocado para a face oeste.",
    coordinate: "23°33' S · 46°38' W",
    galleryVariants: [2, 4, 6, 1],
    floorPlan: {
      outer: [20, 20, 360, 220],
      rooms: [
        {
          id: "atrio",
          label: "Átrio de entrada — 64 m²",
          note: "Pé-direito de 8 metros, luz zenital",
          rect: [40, 40, 150, 90],
        },
        {
          id: "nucleo",
          label: "Núcleo de circulação — 22 m²",
          note: "Escada e elevadores na face oeste",
          rect: [200, 40, 60, 190],
        },
        {
          id: "reuniao",
          label: "Sala de reuniões — 30 m²",
          note: "Painéis acústicos em madeira",
          rect: [270, 40, 90, 80],
        },
        {
          id: "terraco",
          label: "Terraço técnico — 40 m²",
          note: "Casa de máquinas e captação pluvial",
          rect: [270, 140, 90, 90],
        },
      ],
    },
  },
  {
    slug: "pavilhao-argila",
    name: "Pavilhão Argila",
    location: "Trancoso, BA",
    category: "Cultural",
    year: 2022,
    area: "860 m²",
    program: "Centro cultural comunitário",
    materials: ["Taipa de pilão", "Madeira roliça", "Telha cerâmica", "Piso de cimento queimado"],
    statement:
      "Um pavilhão de terra crua entre árvores — a cobertura paira, as paredes respiram, o espaço interno se dissolve no entorno.",
    teaser:
      "Centro cultural construído majoritariamente em taipa, com grandes aberturas cobertas por beirais profundos.",
    coordinate: "16°35' S · 39°06' W",
    galleryVariants: [3, 1, 4],
    floorPlan: {
      outer: [20, 40, 360, 180],
      rooms: [
        {
          id: "salao",
          label: "Salão principal — 210 m²",
          note: "Cobertura suspensa sobre pilares de madeira",
          rect: [50, 60, 200, 140],
        },
        {
          id: "varanda-coberta",
          label: "Varanda coberta — 90 m²",
          note: "Beiral de 3 metros contra o sol da tarde",
          rect: [260, 60, 90, 140],
        },
        {
          id: "apoio",
          label: "Depósito e apoio — 24 m²",
          note: "Bloco de taipa maciça, sem aberturas",
          rect: [50, 60, 60, 45],
        },
      ],
    },
  },
  {
    slug: "galeria-basalto",
    name: "Galeria Basalto",
    location: "Belo Horizonte, MG",
    category: "Comercial",
    year: 2020,
    area: "1.240 m²",
    program: "Galeria comercial, 3 níveis",
    materials: ["Basalto local", "Aço corten", "Vidro temperado"],
    statement:
      "Uma galeria de três níveis escavada em pedra escura, onde a luz entra apenas por frestas calculadas.",
    teaser: "Complexo comercial de pequena escala com fachada em basalto maciço e vãos internos generosos.",
    coordinate: "19°55' S · 43°56' W",
    galleryVariants: [5, 2],
  },
  {
    slug: "casa-patio",
    name: "Casa Pátio",
    location: "Itaipava, RJ",
    category: "Residencial",
    year: 2019,
    area: "298 m²",
    program: "Residência de veraneio",
    materials: ["Alvenaria pintada", "Madeira de demolição", "Telha metálica"],
    statement:
      "Uma casa organizada em torno de um pátio central — o programa recua, e o vazio vira o cômodo mais importante.",
    teaser: "Residência de veraneio com planta em U voltada para um pátio ajardinado central.",
    coordinate: "22°23' S · 43°08' W",
    galleryVariants: [6, 3],
  },
  {
    slug: "centro-civico-meridiano",
    name: "Centro Cívico Meridiano",
    location: "Curitiba, PR",
    category: "Institucional",
    year: 2024,
    area: "5.420 m²",
    program: "Equipamento público e cultural",
    materials: ["Concreto pigmentado", "Zinco patinado", "Vidro serigrafado"],
    statement: "Um equipamento público pensado como praça coberta — os limites entre dentro e fora quase desaparecem.",
    teaser: "Centro cívico organizado em torno de um átrio público de pé-direito triplo.",
    coordinate: "25°25' S · 49°16' W",
    galleryVariants: [4, 6, 1],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export const TEAM: TeamMember[] = [
  { id: "marina-kessler", name: "Marina Kessler", role: "Sócia-fundadora", initials: "MK" },
  { id: "thiago-bandeira", name: "Thiago Bandeira", role: "Sócio-fundador", initials: "TB" },
  { id: "luiza-prado", name: "Luiza Prado", role: "Arquiteta Sênior", initials: "LP" },
  { id: "renato-cavalcanti", name: "Renato Cavalcanti", role: "Arquiteto Sênior", initials: "RC" },
  { id: "bianca-osorio", name: "Bianca Osório", role: "Arquiteta de Projetos", initials: "BO" },
  { id: "felipe-andrade", name: "Felipe Andrade", role: "Coordenador de Obra", initials: "FA" },
];
