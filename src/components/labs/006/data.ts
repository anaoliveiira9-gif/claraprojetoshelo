// Fictional content for ATELIER 17 — a Brazilian architecture studio built
// as a portfolio/case-study concept by ALUMNA. Nothing here refers to a
// real firm, building, or address.

export interface FloorPlanRoom {
  id: string;
  label: string;
  note: string;
  /** [x, y, w, h] in a 400x300 unit drafting space */
  rect: [number, number, number, number];
  /**
   * Optional — when present, this room is eligible for the interactive
   * PLANTA → ESPAÇO → FOTOGRAFIA explorer (see plan-explorer.tsx): `variant`
   * picks an AbstractComposition, `caption` is the editorial note shown
   * alongside it (materials, dimensions, a design note).
   */
  variant?: number;
  caption?: string;
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
          caption:
            "38 m² · Pé-direito duplo de 6 metros voltado para o vale. Estrutura em concreto aparente com vedação em vidro laminado, sem parapeito visível na borda do balanço.",
          variant: 4,
          rect: [40, 50, 140, 110],
        },
        {
          id: "cozinha",
          label: "Cozinha — 18 m²",
          note: "Bancada em pedra-sabão local",
          caption:
            "18 m² · Bancada única em pedra-sabão extraída na região. Armários em madeira de peroba fosca, sem puxadores aparentes.",
          variant: 6,
          rect: [190, 50, 90, 60],
        },
        {
          id: "suite",
          label: "Suíte principal — 24 m²",
          note: "Abertura corrida de 6 metros",
          caption:
            "24 m² · Abertura corrida de 6 metros em vidro laminado emoldura o morro sem interrupção estrutural. Piso em concreto polido, cor natural.",
          variant: 5,
          rect: [190, 120, 90, 90],
        },
        {
          id: "varanda",
          label: "Varanda — 30 m²",
          note: "Estrutura em balanço sobre a encosta",
          caption:
            "30 m² · Laje em balanço de 4 metros sobre a encosta, sem pilares de apoio visíveis. Guarda-corpo em cabo de aço para não interromper a vista.",
          variant: 3,
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
          caption:
            "64 m² · Pé-direito de 8 metros com luz zenital filtrada por brise de alumínio. Piso em granito cinza andorinha polido.",
          variant: 1,
          rect: [40, 40, 150, 90],
        },
        {
          id: "nucleo",
          label: "Núcleo de circulação — 22 m²",
          note: "Escada e elevadores na face oeste",
          caption:
            "22 m² · Núcleo de circulação vertical deslocado para a face oeste, protegendo o átrio do sol da tarde. Estrutura em concreto branco aparente.",
          variant: 2,
          rect: [200, 40, 60, 190],
        },
        {
          id: "reuniao",
          label: "Sala de reuniões — 30 m²",
          note: "Painéis acústicos em madeira",
          caption:
            "30 m² · Painéis acústicos em madeira revestem as quatro faces. Vidro fumê na divisória com o átrio garante privacidade sem isolar visualmente.",
          variant: 6,
          rect: [270, 40, 90, 80],
        },
        {
          id: "terraco",
          label: "Terraço técnico — 40 m²",
          note: "Casa de máquinas e captação pluvial",
          caption:
            "40 m² · Casa de máquinas e sistema de captação pluvial integrados sob o mesmo brise de alumínio da fachada.",
          variant: 4,
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
          caption:
            "210 m² · Cobertura em telha cerâmica suspensa sobre pilares de madeira roliça, sem contato direto com as paredes de taipa. Piso em cimento queimado.",
          variant: 3,
          rect: [50, 60, 200, 140],
        },
        {
          id: "varanda-coberta",
          label: "Varanda coberta — 90 m²",
          note: "Beiral de 3 metros contra o sol da tarde",
          caption:
            "90 m² · Beiral de 3 metros protege o vão contra o sol da tarde e a chuva, ampliando o salão principal sem fechar o espaço.",
          variant: 2,
          rect: [260, 60, 90, 140],
        },
        {
          id: "apoio",
          label: "Depósito e apoio — 24 m²",
          note: "Bloco de taipa maciça, sem aberturas",
          caption:
            "24 m² · Bloco maciço em taipa de pilão, sem aberturas, mantendo temperatura estável para depósito de material sensível.",
          variant: 1,
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
    floorPlan: {
      outer: [20, 20, 360, 220],
      rooms: [
        {
          id: "recepcao",
          label: "Recepção — 60 m²",
          note: "Vão de entrada esculpido em basalto maciço",
          caption:
            "60 m² · Vão de entrada esculpido em basalto local, com luz entrando apenas por frestas calculadas no forro.",
          variant: 1,
          rect: [20, 20, 140, 80],
        },
        {
          id: "atrio-vertical",
          label: "Átrio vertical — 90 m²",
          note: "Vazio que conecta os três níveis da galeria",
          caption:
            "90 m² · Vazio central que conecta os três níveis, estruturado em aço corten aparente. Guarda-corpos em vidro temperado sem caixilho visível.",
          variant: 5,
          rect: [180, 20, 70, 220],
        },
        {
          id: "galeria-norte",
          label: "Galeria norte — 150 m²",
          note: "Vãos internos generosos para exposições rotativas",
          caption:
            "150 m² · Vão livre de 12 metros sem pilares intermediários, permitindo montagens expositivas de grande escala.",
          variant: 6,
          rect: [270, 20, 110, 100],
        },
        {
          id: "galeria-sul",
          label: "Galeria sul — 130 m²",
          note: "Fachada em basalto maciço com aberturas calculadas",
          caption:
            "130 m² · Fachada maciça em basalto com aberturas estreitas e verticais, controlando a luz direta sobre as peças expostas.",
          variant: 4,
          rect: [270, 140, 110, 100],
        },
      ],
    },
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
    floorPlan: {
      outer: [40, 30, 320, 200],
      rooms: [
        {
          id: "sala",
          label: "Sala de estar — 42 m²",
          note: "Piso rebaixado 12 cm em relação ao pátio",
          caption:
            "42 m² · Piso rebaixado 12 cm em relação ao pátio. Alvenaria pintada de branco, esquadrias em madeira de demolição recuperada.",
          variant: 1,
          rect: [40, 30, 110, 140],
        },
        {
          id: "cozinha",
          label: "Cozinha — 26 m²",
          note: "Bancada em concreto queimado",
          caption:
            "26 m² · Bancada em concreto queimado. Uma janela horizontal baixa preserva a vista do jardim mesmo junto ao fogão.",
          variant: 2,
          rect: [40, 170, 320, 60],
        },
        {
          id: "patio",
          label: "Pátio central — 68 m²",
          note: "Vazio organizador da planta em U",
          caption:
            "68 m² · Piso em pedra portuguesa irregular e vegetação nativa de baixa manutenção. O vazio central organiza a casa — todo cômodo abre uma porta para ele.",
          variant: 5,
          rect: [150, 60, 100, 110],
        },
        {
          id: "suite",
          label: "Suíte — 34 m²",
          note: "Abertura em ângulo contra o sol da tarde",
          caption:
            "34 m² · Telha metálica aparente e forro em madeira natural. Abertura em ângulo evita o sol da tarde sem depender de brise.",
          variant: 3,
          rect: [250, 30, 110, 140],
        },
      ],
    },
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
    floorPlan: {
      outer: [20, 20, 360, 220],
      rooms: [
        {
          id: "biblioteca",
          label: "Biblioteca — 620 m²",
          note: "Estantes abertas voltadas para o átrio",
          caption:
            "620 m² · Estantes abertas em módulos repetidos, voltadas para o átrio público. Piso em concreto pigmentado na cor da terra local.",
          variant: 6,
          rect: [20, 20, 120, 220],
        },
        {
          id: "atrio-publico",
          label: "Átrio público — 480 m²",
          note: "Praça coberta de pé-direito triplo",
          caption:
            "480 m² · Praça coberta de pé-direito triplo em vidro serigrafado, funcionando como extensão da rua para dentro do edifício.",
          variant: 5,
          rect: [150, 20, 100, 220],
        },
        {
          id: "auditorio",
          label: "Auditório — 340 m²",
          note: "Plateia inclinada revestida em zinco patinado",
          caption:
            "340 m² · Plateia inclinada para 220 lugares, revestimento acústico em zinco patinado nas paredes laterais.",
          variant: 3,
          rect: [260, 20, 120, 140],
        },
        {
          id: "administracao",
          label: "Administração — 180 m²",
          note: "Bloco técnico e administrativo recuado",
          caption:
            "180 m² · Bloco administrativo recuado do átrio público, com acesso independente e vidro serigrafado para privacidade visual.",
          variant: 2,
          rect: [260, 170, 120, 70],
        },
      ],
    },
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
