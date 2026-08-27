/**
 * ALUMNA's single source of truth for pricing.
 *
 * Everything that touches a number lives here: service base prices,
 * complexity weights, synergy/discount rules, and the estimate ranges.
 * `src/lib/diagnostic.ts` and every UI component only ever import
 * `computeEstimate` / `SERVICES` — no price is hardcoded anywhere else.
 *
 * To change a value later: edit this file only.
 */

// ---------------------------------------------------------------------------
// Step 01 — "O que vamos criar?" (project type, multi-select, pricing anchor)
// The FIRST option selected — not the most expensive — is the anchor: order
// of selection is what the client meant as "the project", everything else
// picked alongside it is treated as an added surface, not a second project.
// ---------------------------------------------------------------------------

export const BUILD_OPTIONS = [
  "Landing page",
  "Site",
  "Loja virtual",
  "Aplicativo",
  "Sistema",
  "Plataforma",
] as const;

export type BuildOption = (typeof BUILD_OPTIONS)[number];

/** "A partir de" entry price for each project type. */
export const BUILD_OPTION_BASE: Record<BuildOption, number> = {
  "Landing page": 2500,
  Site: 4000,
  "Loja virtual": 7000,
  Aplicativo: 9000,
  Sistema: 12000,
  Plataforma: 16000,
};

/**
 * Internal-only reference bands per project type — never shown to the
 * client, never hard-clamped in code. They exist purely so whoever tunes
 * the weights below has something to sanity-check typical scenarios
 * against. An exceptionally complex project is expected to exceed its
 * band; that's by design, not a bug.
 *   Landing page:  2.500 –  5.000+
 *   Site:          4.000 – 12.000+
 *   Loja virtual:  7.000 – 20.000+
 *   Aplicativo:    9.000 – 30.000+
 *   Sistema:      12.000 – 40.000+
 *   Plataforma:   16.000 – 60.000+
 */

// ---------------------------------------------------------------------------
// Step 02 — "Qual é o objetivo?" (business goals, multi-select)
// ---------------------------------------------------------------------------

export const OBJECTIVE_OPTIONS = [
  "Vender",
  "Atrair clientes",
  "Agendar e receber pedidos",
  "Gerenciar operações",
  "Automatizar processos",
  "Conectar ferramentas",
] as const;

export type ObjectiveOption = (typeof OBJECTIVE_OPTIONS)[number];

const OBJECTIVE_WEIGHT: Record<ObjectiveOption, number> = {
  Vender: 500,
  "Atrair clientes": 350,
  "Agendar e receber pedidos": 450,
  "Gerenciar operações": 500,
  "Automatizar processos": 600,
  "Conectar ferramentas": 500,
};

// ---------------------------------------------------------------------------
// Step 03 — "O que ele precisa ter?" (functionality, multi-select)
// Deliberately excludes purely-technical building blocks (banco de dados,
// e-mail transacional...) that are always considered internally whenever
// they're implied by the rest of the architecture, not asked as a choice.
// ---------------------------------------------------------------------------

export const FEATURE_OPTIONS = [
  "Contas e login",
  "Área administrativa",
  "Pagamentos",
  "WhatsApp e contato",
  "Notificações",
  "Busca e filtros",
  "Mapas e localização",
  "Integrações externas",
  "Inteligência artificial",
] as const;

export type FeatureOption = (typeof FEATURE_OPTIONS)[number];

const FEATURE_WEIGHT: Record<FeatureOption, number> = {
  "Contas e login": 700,
  "Área administrativa": 1600,
  Pagamentos: 1000,
  "WhatsApp e contato": 250,
  Notificações: 350,
  "Busca e filtros": 600,
  "Mapas e localização": 600,
  "Integrações externas": 1000,
  "Inteligência artificial": 1800,
};

// ---------------------------------------------------------------------------
// Step 04 — "O que é mais importante?" (priorities, multi-select)
// No individual price — a small, capped nudge on the total, purely to
// reflect emphasis. Never shown as a line item to the client.
// ---------------------------------------------------------------------------

export const PRIORITY_OPTIONS = [
  "Experiência",
  "Conversão",
  "Performance",
  "Tecnologia",
  "Marca",
] as const;

export type PriorityOption = (typeof PRIORITY_OPTIONS)[number];

const PRIORITY_STEP_BOOST = 0.03;
const PRIORITY_BOOST_CAP = 0.15;

// ---------------------------------------------------------------------------
// Step 05 — "O que você gostaria de adicionar?" (add-on services, multi)
// Manutenção e evolução is recurring and always quoted separately — it
// never joins the one-time estimate's min–max range.
// ---------------------------------------------------------------------------

export const ADDON_OPTIONS = [
  "Automação",
  "UX/UI",
  "Identidade digital",
  "Manutenção e evolução",
] as const;

export type AddonOption = (typeof ADDON_OPTIONS)[number];

const ADDON_WEIGHT: Record<AddonOption, number> = {
  Automação: 2500,
  "UX/UI": 3000,
  "Identidade digital": 4500,
  "Manutenção e evolução": 700,
};

const RECURRING_ADDONS: AddonOption[] = ["Manutenção e evolução"];

// ---------------------------------------------------------------------------
// Step 06 — "Como você imagina esse projeto?" (single choice)
// Never presented to the client as a multiplier — it reads as an ambition
// level. Internally it nudges the computed complexity tier up or down by
// one notch, it doesn't replace the tier that real selections earned.
// ---------------------------------------------------------------------------

export const STYLE_OPTIONS = ["Essencial", "Personalizado", "Sob medida"] as const;

export type StyleOption = (typeof STYLE_OPTIONS)[number];

const STYLE_TIER_SHIFT: Record<StyleOption, number> = {
  Essencial: -1,
  Personalizado: 0,
  "Sob medida": 1,
};

// ---------------------------------------------------------------------------
// Synergy — objectives/features/add-ons already implied by the chosen
// project type contribute far less to the estimate, so common, expected
// combinations don't get double-charged.
// ---------------------------------------------------------------------------

const IMPLIED_BY_BUILD: Partial<Record<BuildOption, string[]>> = {
  "Loja virtual": ["Vender", "Pagamentos", "Busca e filtros", "Contas e login"],
  Sistema: ["Gerenciar operações", "Contas e login", "Área administrativa"],
  Plataforma: [
    "Gerenciar operações",
    "Contas e login",
    "Área administrativa",
    "Integrações externas",
  ],
  Aplicativo: ["Contas e login", "Notificações"],
  "Landing page": ["Atrair clientes"],
};

/** Add-ons discounted when an objective already signals that work is
 * naturally part of the project — currently just Automação vs. the
 * "Automatizar processos" objective. UX/UI and Identidade digital have no
 * natural overlap with anything else, so they're never discounted. */
const IMPLIED_ADDON_BY_OBJECTIVE: Partial<Record<ObjectiveOption, AddonOption[]>> = {
  "Automatizar processos": ["Automação"],
};

/** Implied items still count toward complexity, just at a fraction of their
 * usual weight — "naturalmente esperado", not free. */
const IMPLIED_WEIGHT_FACTOR = 0.18;

/** Extra project types beyond the first-selected anchor count at this
 * fraction of their own base price — part of the same engagement, not a
 * fully separate project. */
const EXTRA_SURFACE_FACTOR = 0.4;

// ---------------------------------------------------------------------------
// Service catalog — used by /servicos/[slug] and to preselect the
// configurator (a project type for the 6 core services, an add-on for the
// other 4) when a visitor arrives from a specific service page.
// ---------------------------------------------------------------------------

export type ServiceSlug =
  | "landing-page"
  | "site"
  | "loja-virtual"
  | "aplicativo"
  | "sistema"
  | "plataforma"
  | "automacao"
  | "ux-ui"
  | "identidade-digital"
  | "manutencao-evolucao";

export interface ServiceDef {
  slug: ServiceSlug;
  name: string;
  tagline: string;
  description: string;
  audience: string;
  deliverables: string[];
  possibleFeatures: string[];
  basePrice: number;
  isRecurring?: boolean;
  /** One of these two is set — which step the CTA preselects. */
  buildOption?: BuildOption;
  addonOption?: AddonOption;
}

export const SERVICES: ServiceDef[] = [
  {
    slug: "landing-page",
    name: "Landing Page",
    tagline: "Uma página. Um objetivo. Zero distração.",
    description:
      "Uma página única, construída para converter — sem menu, sem rota, sem ruído.",
    audience:
      "Para lançamentos, campanhas e ofertas com um único objetivo claro.",
    deliverables: [
      "Design autoral em uma página",
      "Copy orientada a conversão",
      "Otimizada para performance e SEO básico",
      "CTA e formulário integrados",
    ],
    possibleFeatures: [
      "Formulário de contato",
      "Integração com WhatsApp",
      "Pixel de analytics",
      "Captura de lead",
    ],
    basePrice: 2500,
    buildOption: "Landing page",
  },
  {
    slug: "site",
    name: "Site",
    tagline: "A primeira impressão, bem resolvida.",
    description:
      "Um site institucional editorial, rápido e fácil de manter — a base digital de uma marca séria.",
    audience:
      "Para empresas e profissionais que precisam de presença digital confiável.",
    deliverables: [
      "Design autoral, não template",
      "Sistema de design próprio",
      "Formulário de contato",
      "Otimização para buscadores",
    ],
    possibleFeatures: [
      "Blog ou notícias",
      "Múltiplos idiomas",
      "Busca e filtros",
      "Integração com redes sociais",
    ],
    basePrice: 4000,
    buildOption: "Site",
  },
  {
    slug: "loja-virtual",
    name: "Loja Virtual",
    tagline: "Vender também é uma questão de direção de arte.",
    description:
      "Loja virtual completa — catálogo, carrinho e checkout, com uma experiência que não parece template.",
    audience: "Para marcas que vendem produtos físicos ou digitais online.",
    deliverables: [
      "Catálogo e páginas de produto",
      "Carrinho e checkout",
      "Painel administrativo de pedidos",
      "Integração de pagamento",
    ],
    possibleFeatures: [
      "Múltiplos meios de pagamento",
      "Cupons e promoções",
      "Área do cliente",
      "Integração com frete",
    ],
    basePrice: 7000,
    buildOption: "Loja virtual",
  },
  {
    slug: "aplicativo",
    name: "Aplicativo",
    tagline: "Um produto que vive no bolso do seu cliente.",
    description:
      "Aplicativo mobile completo, do onboarding ao uso diário, com identidade e sistema próprios.",
    audience:
      "Para produtos e serviços que precisam de presença nativa no celular.",
    deliverables: [
      "Onboarding e telas principais",
      "Sistema de design mobile",
      "Notificações push",
      "Publicação nas lojas",
    ],
    possibleFeatures: [
      "Login e autenticação",
      "Pagamentos in-app",
      "Integração com APIs externas",
      "Inteligência artificial",
    ],
    basePrice: 9000,
    buildOption: "Aplicativo",
  },
  {
    slug: "sistema",
    name: "Sistema",
    tagline: "Software feito sob medida para como o seu time trabalha.",
    description:
      "Um sistema web completo — painel, dados e fluxos próprios, construído para uso interno ou de clientes.",
    audience:
      "Para operações que precisam de uma ferramenta própria, não uma planilha.",
    deliverables: [
      "Painel administrativo",
      "Modelagem de dados",
      "Autenticação e permissões",
      "Fluxos operacionais próprios",
    ],
    possibleFeatures: [
      "Múltiplos perfis de acesso",
      "Relatórios e métricas",
      "Integrações com outras ferramentas",
      "Automações internas",
    ],
    basePrice: 12000,
    buildOption: "Sistema",
  },
  {
    slug: "plataforma",
    name: "Plataforma",
    tagline: "Um produto pronto para ter muitos clientes ao mesmo tempo.",
    description:
      "Plataforma multiusuário — de um SaaS a um marketplace —, com arquitetura pensada para escalar desde o primeiro cliente.",
    audience:
      "Para quem está construindo um produto digital para vender como serviço.",
    deliverables: [
      "Arquitetura multiusuário",
      "Painel e área de clientes",
      "Autenticação e planos",
      "Base para cobrança recorrente",
    ],
    possibleFeatures: [
      "Assinaturas e planos",
      "Onboarding automatizado",
      "Integrações via API",
      "Painel de métricas de uso",
    ],
    basePrice: 16000,
    buildOption: "Plataforma",
  },
  {
    slug: "automacao",
    name: "Automação",
    tagline: "O trabalho manual que o seu time não devia mais fazer.",
    description:
      "Fluxos automatizados entre ferramentas — menos tarefa repetitiva, menos erro humano.",
    audience:
      "Para operações com processos manuais e repetitivos entre sistemas.",
    deliverables: [
      "Mapeamento do fluxo atual",
      "Automação entre ferramentas",
      "Testes e validação",
      "Documentação do fluxo",
    ],
    possibleFeatures: [
      "Integração com WhatsApp ou e-mail",
      "Notificações automáticas",
      "Conexão com planilhas ou bancos de dados",
      "IA aplicada ao fluxo",
    ],
    basePrice: 2500,
    addonOption: "Automação",
  },
  {
    slug: "ux-ui",
    name: "UX/UI",
    tagline: "Antes de construir, vale a pena desenhar direito.",
    description:
      "Design de interface e experiência para um produto novo ou existente — sem entrar em desenvolvimento.",
    audience:
      "Para quem precisa de um design sólido antes (ou independente) da construção.",
    deliverables: [
      "Wireframes e fluxos",
      "Design de interface final",
      "Protótipo navegável",
      "Sistema de design básico",
    ],
    possibleFeatures: [
      "Pesquisa com usuários",
      "Testes de usabilidade",
      "Design system completo",
      "Handoff para desenvolvimento",
    ],
    basePrice: 3000,
    addonOption: "UX/UI",
  },
  {
    slug: "identidade-digital",
    name: "Identidade Digital",
    tagline: "Uma identidade que funciona antes mesmo de ler o nome.",
    description:
      "Identidade visual e aplicação digital juntas — a marca nasce já pronta para existir online.",
    audience:
      "Para marcas novas ou em reposicionamento que precisam nascer coerentes.",
    deliverables: [
      "Identidade visual (logo, cores, tipografia)",
      "Aplicação em site ou material digital",
      "Manual de marca básico",
      "Templates para redes sociais",
    ],
    possibleFeatures: [
      "Naming",
      "Papelaria e material impresso",
      "Aplicação em embalagem",
      "Guia de tom de voz",
    ],
    basePrice: 4500,
    addonOption: "Identidade digital",
  },
  {
    slug: "manutencao-evolucao",
    name: "Manutenção e Evolução",
    tagline: "Um site nunca deveria parar no dia em que fica pronto.",
    description:
      "Suporte contínuo, pequenas evoluções e monitoramento — para o projeto continuar funcionando e melhorando.",
    audience: "Para quem já tem um site ou produto e precisa de alguém cuidando dele.",
    deliverables: [
      "Monitoramento e correções",
      "Pequenas atualizações mensais",
      "Suporte técnico contínuo",
      "Relatório mensal de atividade",
    ],
    possibleFeatures: [
      "Atualizações de conteúdo",
      "Melhorias de performance",
      "Novas funcionalidades pontuais",
      "Backup e segurança",
    ],
    basePrice: 700,
    isRecurring: true,
    addonOption: "Manutenção e evolução",
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

// ---------------------------------------------------------------------------
// Estimate engine
// ---------------------------------------------------------------------------

/** Internal complexity tier — drives the width of the min–max spread.
 * Never shown to the client by name. */
type ComplexityTier = "Essencial" | "Profissional" | "Avançado" | "Sob medida";

const TIERS: { name: ComplexityTier; minScore: number; spread: [number, number] }[] = [
  { name: "Essencial", minScore: 0, spread: [0.95, 1.15] },
  { name: "Profissional", minScore: 2, spread: [1.0, 1.3] },
  { name: "Avançado", minScore: 5, spread: [1.05, 1.45] },
  { name: "Sob medida", minScore: 9, spread: [1.1, 1.6] },
];

export interface EstimateInput {
  builds: BuildOption[];
  objectives: ObjectiveOption[];
  features: FeatureOption[];
  priorities: PriorityOption[];
  addons: AddonOption[];
  style: StyleOption | null;
  /** Set when the visitor arrived from a specific /servicos/[slug] page —
   * gives a more precise pricing anchor than the generic build option
   * (only applies when that service maps to a project type, not an
   * add-on). */
  initialService?: ServiceSlug;
}

export interface EstimateResult {
  min: number;
  max: number;
  isRecurring: boolean;
  /** Extra fixed monthly line (Manutenção e evolução), shown alongside the
   * one-time range rather than folded into it. */
  monthly: number;
  /** False when there's too little information for a real range yet —
   * UI should show "a partir de {min}" instead of a min–max range. */
  hasRange: boolean;
}

function impliedSet(input: EstimateInput): Set<string> {
  const items = new Set<string>();
  for (const build of input.builds) {
    for (const item of IMPLIED_BY_BUILD[build] ?? []) items.add(item);
  }
  return items;
}

function impliedAddons(input: EstimateInput): Set<AddonOption> {
  const items = new Set<AddonOption>();
  for (const objective of input.objectives) {
    for (const addon of IMPLIED_ADDON_BY_OBJECTIVE[objective] ?? []) items.add(addon);
  }
  return items;
}

function weightedSum(
  items: string[],
  weights: Record<string, number>,
  implied: Set<string>
): number {
  return items.reduce((sum, item) => {
    const weight = weights[item] ?? 0;
    return sum + (implied.has(item) ? weight * IMPLIED_WEIGHT_FACTOR : weight);
  }, 0);
}

function roundToHundred(value: number): number {
  return Math.round(value / 100) * 100;
}

/**
 * projeto-base + complexidade real + funcionalidades + integrações +
 * personalização − sobreposição/sinergia. Prefers a conservative,
 * commercially realistic estimate when signals are ambiguous — see the
 * module doc comment for where every number involved actually lives.
 * Nothing here (score, tier, multipliers) is ever surfaced to the client.
 */
export function computeEstimate(input: EstimateInput): EstimateResult {
  const service = input.initialService ? getService(input.initialService) : undefined;

  // Manutenção e evolução is always a separate recurring line — never part
  // of the one-time min–max range.
  const monthly = input.addons.includes("Manutenção e evolução")
    ? ADDON_WEIGHT["Manutenção e evolução"]
    : 0;
  const oneTimeAddons = input.addons.filter((a) => !RECURRING_ADDONS.includes(a));

  if (input.builds.length === 0) {
    // Nothing to anchor a one-time estimate on yet — maintenance-only ask.
    return { min: 0, max: 0, isRecurring: monthly > 0, monthly, hasRange: false };
  }

  // Anchor: the FIRST project type the client selected — order, not price,
  // decides what "the project" is. Everything selected alongside it is an
  // added surface, not a second project.
  const anchorBuild = input.builds[0];
  let base = BUILD_OPTION_BASE[anchorBuild];
  if (service?.buildOption && service.basePrice > base) base = service.basePrice;

  const extraSurfaces = input.builds
    .slice(1)
    .reduce((sum, build) => sum + BUILD_OPTION_BASE[build] * EXTRA_SURFACE_FACTOR, 0);

  const implied = impliedSet(input);
  const objectivesSum = weightedSum(input.objectives, OBJECTIVE_WEIGHT, implied);
  const featuresSum = weightedSum(input.features, FEATURE_WEIGHT, implied);

  const impliedAddonSet = impliedAddons(input);
  const addonsSum = oneTimeAddons.reduce((sum, addon) => {
    const weight = ADDON_WEIGHT[addon];
    return sum + (impliedAddonSet.has(addon) ? weight * IMPLIED_WEIGHT_FACTOR : weight);
  }, 0);

  const priorityBoost =
    1 + Math.min(PRIORITY_BOOST_CAP, input.priorities.length * PRIORITY_STEP_BOOST);

  const rawTotal =
    (base + extraSurfaces + objectivesSum + featuresSum + addonsSum) * priorityBoost;

  // Complexity score: non-implied ("real") items count far more than ones
  // already implied by the chosen project type, so ticking a common box
  // doesn't move the tier the way a structural one does.
  const nonImpliedFeatures = input.features.filter((f) => !implied.has(f)).length;
  const impliedFeatures = input.features.length - nonImpliedFeatures;
  const nonImpliedAddons = oneTimeAddons.filter((a) => !impliedAddonSet.has(a)).length;
  const impliedAddonsCount = oneTimeAddons.length - nonImpliedAddons;

  const complexityScore =
    input.builds.length * 1 +
    input.objectives.length * 0.4 +
    nonImpliedFeatures * 1.2 +
    impliedFeatures * 0.3 +
    nonImpliedAddons * 1.0 +
    impliedAddonsCount * 0.3;

  let tierIndex = 0;
  for (let i = 0; i < TIERS.length; i++) {
    if (complexityScore >= TIERS[i].minScore) tierIndex = i;
  }

  // "Como você imagina esse projeto?" nudges the tier by one notch — it
  // influences the range, but real selections (the score above) are what
  // earned the tier in the first place.
  const shift = input.style ? STYLE_TIER_SHIFT[input.style] : 0;
  tierIndex = Math.min(TIERS.length - 1, Math.max(0, tierIndex + shift));
  const spread = TIERS[tierIndex].spread;

  let min = rawTotal * spread[0];
  let max = rawTotal * spread[1];

  // Floor: never undercut the project's own "a partir de" price. Ceiling
  // guard: keep the range meaningfully wide rather than a disguised point
  // estimate.
  min = Math.max(min, base);
  max = Math.max(max, min + base * 0.15);

  const hasRange = input.objectives.length + input.features.length + oneTimeAddons.length > 0;

  return {
    min: roundToHundred(min),
    max: roundToHundred(max),
    isRecurring: false,
    monthly,
    hasRange,
  };
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export function formatEstimate(estimate: EstimateResult): string {
  const monthlySuffix = estimate.monthly > 0
    ? ` + ${formatBRL(estimate.monthly)}/mês (manutenção)`
    : "";

  if (estimate.min === 0 && estimate.max === 0) {
    return estimate.monthly > 0
      ? `${formatBRL(estimate.monthly)}/mês`
      : "Escolha um tipo de projeto para ver a estimativa";
  }
  if (!estimate.hasRange) {
    return `A partir de ${formatBRL(estimate.min)}${monthlySuffix}`;
  }
  if (estimate.min === estimate.max) {
    return `${formatBRL(estimate.min)}${monthlySuffix}`;
  }
  return `${formatBRL(estimate.min)} — ${formatBRL(estimate.max)}${monthlySuffix}`;
}
