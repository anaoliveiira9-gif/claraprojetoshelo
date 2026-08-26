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
// Step 1 — "O que vamos criar?" (project type, multi-select, pricing anchor)
// ---------------------------------------------------------------------------

export const BUILD_OPTIONS = [
  "Site",
  "Loja virtual",
  "Aplicativo",
  "Sistema",
  "Landing page",
  "Automação",
  "UX/UI",
  "Identidade digital",
  "Outro",
] as const;

export type BuildOption = (typeof BUILD_OPTIONS)[number];

/** Base "a partir de" price used when a build option is picked without a
 * more specific service context (see SERVICES below for the precise
 * per-service prices shown on /servicos/*). */
export const BUILD_OPTION_BASE: Record<BuildOption, number> = {
  "Landing page": 2500,
  Site: 3900,
  "Loja virtual": 7500,
  Aplicativo: 12000,
  Sistema: 15000,
  Automação: 2500,
  "UX/UI": 2500,
  "Identidade digital": 4500,
  Outro: 3900,
};

// ---------------------------------------------------------------------------
// Step 2 — "O que precisa acontecer?" (goals/behaviors, multi-select)
// ---------------------------------------------------------------------------

export const NEED_OPTIONS = [
  "Vender",
  "Agendar",
  "Captar",
  "Automatizar",
  "Gerenciar",
  "Integrar",
  "Área de clientes",
  "Pagamentos",
  "Dados e métricas",
  "Outro",
] as const;

export type NeedOption = (typeof NEED_OPTIONS)[number];

const NEED_WEIGHT: Record<NeedOption, number> = {
  Vender: 400,
  Agendar: 250,
  Captar: 200,
  Automatizar: 500,
  Gerenciar: 350,
  Integrar: 400,
  "Área de clientes": 900,
  Pagamentos: 700,
  "Dados e métricas": 500,
  Outro: 300,
};

// ---------------------------------------------------------------------------
// Step 3 — "Como deve funcionar?" (functionality/architecture, multi-select)
// ---------------------------------------------------------------------------

export const FEATURE_OPTIONS = [
  "Login",
  "Painel administrativo",
  "Pagamentos",
  "WhatsApp",
  "E-mail",
  "Notificações",
  "Busca e filtros",
  "Mapas",
  "Chat",
  "Assinaturas",
  "Integrações",
  "IA",
  "Banco de dados",
] as const;

export type FeatureOption = (typeof FEATURE_OPTIONS)[number];

const FEATURE_WEIGHT: Record<FeatureOption, number> = {
  Login: 600,
  "Painel administrativo": 1400,
  Pagamentos: 900,
  WhatsApp: 200,
  "E-mail": 150,
  Notificações: 300,
  "Busca e filtros": 500,
  Mapas: 500,
  Chat: 600,
  Assinaturas: 1200,
  Integrações: 900,
  IA: 1600,
  "Banco de dados": 1000,
};

// ---------------------------------------------------------------------------
// Step 4 — "O que é mais importante?" (priorities, multi-select — small nudge)
// ---------------------------------------------------------------------------

export const PRIORITY_OPTIONS = [
  "Experiência",
  "Conversão",
  "Performance",
  "Tecnologia",
  "Marca",
] as const;

export type PriorityOption = (typeof PRIORITY_OPTIONS)[number];

/** Each selected priority nudges the estimate up slightly (emphasis, not
 * added scope) — capped so ticking every box can't inflate the range. */
const PRIORITY_STEP_BOOST = 0.03;
const PRIORITY_BOOST_CAP = 0.15;

// ---------------------------------------------------------------------------
// Synergy — needs/features already implied by a chosen project type (or
// service) contribute far less to the estimate, so common combinations
// don't get double-charged.
// ---------------------------------------------------------------------------

const IMPLIED_BY_BUILD: Partial<Record<BuildOption, string[]>> = {
  "Loja virtual": ["Vender", "Pagamentos", "Busca e filtros", "Área de clientes"],
  Sistema: ["Gerenciar", "Login", "Painel administrativo", "Banco de dados"],
  Aplicativo: ["Login", "Notificações"],
  Automação: ["Automatizar", "Integrar", "Integrações"],
  "Landing page": ["Captar"],
};

const IMPLIED_BY_SERVICE: Partial<Record<ServiceSlug, string[]>> = {
  ecommerce: ["Vender", "Pagamentos", "Busca e filtros", "Área de clientes"],
  "sistema-web-app": ["Gerenciar", "Login", "Painel administrativo", "Banco de dados"],
  "saas-plataforma": [
    "Gerenciar",
    "Login",
    "Painel administrativo",
    "Banco de dados",
    "Assinaturas",
    "Área de clientes",
  ],
  aplicativo: ["Login", "Notificações"],
  automacao: ["Automatizar", "Integrar", "Integrações"],
  "landing-page": ["Captar"],
};

/** Implied items still count toward complexity, just at a fraction of their
 * usual weight — "comum e complementar" per the brief, not free. */
const IMPLIED_WEIGHT_FACTOR = 0.18;

// ---------------------------------------------------------------------------
// Service catalog — used by /servicos/[slug] and as a precise pricing
// anchor when a visitor arrives at the configurator from a service page.
// ---------------------------------------------------------------------------

export type ServiceSlug =
  | "landing-page"
  | "site-institucional"
  | "site-experiencia-digital"
  | "ecommerce"
  | "aplicativo"
  | "sistema-web-app"
  | "saas-plataforma"
  | "automacao"
  | "ux-ui"
  | "branding-digital"
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
  /** Which step-1 tile this service maps to when preselecting the
   * configurator from this service's CTA. */
  buildOption: BuildOption;
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
    slug: "site-institucional",
    name: "Site Institucional",
    tagline: "A primeira impressão, bem resolvida.",
    description:
      "Um site institucional editorial, rápido e fácil de manter — a base digital de uma marca séria.",
    audience:
      "Para empresas e profissionais que precisam de presença digital confiável.",
    deliverables: [
      "Até 5 páginas",
      "Sistema de design próprio",
      "Formulário de contato",
      "Otimização para buscadores",
    ],
    possibleFeatures: [
      "Blog ou notícias",
      "Múltiplos idiomas",
      "Contato avançado",
      "Integração com redes sociais",
    ],
    basePrice: 3900,
    buildOption: "Site",
  },
  {
    slug: "site-experiencia-digital",
    name: "Site / Experiência Digital",
    tagline: "Quando o site precisa contar uma história.",
    description:
      "Uma experiência digital mais ambiciosa — narrativa visual, interações e um sistema de conteúdo próprio.",
    audience:
      "Para marcas que querem se diferenciar visualmente, não só existir online.",
    deliverables: [
      "Direção de arte própria",
      "Múltiplas páginas e fluxos",
      "Microinterações e animações",
      "Sistema de conteúdo gerenciável",
    ],
    possibleFeatures: [
      "CMS próprio",
      "Multilíngue",
      "Busca e filtros",
      "Integrações de marketing",
    ],
    basePrice: 6500,
    buildOption: "Site",
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
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
    basePrice: 7500,
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
      "Chat",
      "Integração com APIs externas",
    ],
    basePrice: 12000,
    buildOption: "Aplicativo",
  },
  {
    slug: "sistema-web-app",
    name: "Sistema / Web App",
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
    basePrice: 15000,
    buildOption: "Sistema",
  },
  {
    slug: "saas-plataforma",
    name: "SaaS / Plataforma",
    tagline: "Um produto pronto para ter muitos clientes ao mesmo tempo.",
    description:
      "Plataforma multiusuário, com arquitetura pensada para escalar desde o primeiro cliente.",
    audience:
      "Para quem está construindo um produto digital para vender como serviço.",
    deliverables: [
      "Arquitetura multi-tenant",
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
    basePrice: 20000,
    buildOption: "Sistema",
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
    buildOption: "Automação",
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
    basePrice: 2500,
    buildOption: "UX/UI",
  },
  {
    slug: "branding-digital",
    name: "Branding + Digital",
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
    buildOption: "Identidade digital",
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
    buildOption: "Outro",
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

// ---------------------------------------------------------------------------
// Estimate engine
// ---------------------------------------------------------------------------

export type ComplexityTier = "Essencial" | "Profissional" | "Avançado" | "Sob medida";

export interface EstimateInput {
  builds: BuildOption[];
  needs: NeedOption[];
  features: FeatureOption[];
  priorities: PriorityOption[];
  /** Set when the visitor arrived from a specific /servicos/[slug] page —
   * gives a more precise pricing anchor than the generic build option. */
  initialService?: ServiceSlug;
}

export interface EstimateResult {
  min: number;
  max: number;
  /** Internal only — not necessarily shown to the client. */
  tier: ComplexityTier;
  isRecurring: boolean;
  /** False when there's too little information for a real range yet —
   * UI should show "a partir de {min}" instead of a min–max range. */
  hasRange: boolean;
}

function impliedSet(input: EstimateInput): Set<string> {
  const items = new Set<string>();
  for (const build of input.builds) {
    for (const item of IMPLIED_BY_BUILD[build] ?? []) items.add(item);
  }
  if (input.initialService) {
    for (const item of IMPLIED_BY_SERVICE[input.initialService] ?? []) {
      items.add(item);
    }
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
 * preço-base do projeto + complexidade + necessidades específicas −
 * sinergias/duplicidades. Prefers a conservative, commercially realistic
 * estimate when signals are ambiguous — see the module doc comment for
 * where every number involved actually lives.
 */
export function computeEstimate(input: EstimateInput): EstimateResult {
  const service = input.initialService ? getService(input.initialService) : undefined;

  if (service?.isRecurring) {
    return {
      min: service.basePrice,
      max: service.basePrice,
      tier: "Essencial",
      isRecurring: true,
      hasRange: true,
    };
  }

  // Anchor: the most demanding selected build type (or the precise service
  // price when the visitor arrived from a /servicos page), plus a fraction
  // of any additional, genuinely separate surfaces the client also picked.
  let anchorIndex = -1;
  let anchorPrice = 0;
  input.builds.forEach((build, i) => {
    const price = BUILD_OPTION_BASE[build];
    if (price > anchorPrice) {
      anchorPrice = price;
      anchorIndex = i;
    }
  });

  const extraSurfaces = input.builds.reduce((sum, build, i) => {
    if (i === anchorIndex) return sum;
    return sum + BUILD_OPTION_BASE[build] * 0.4;
  }, 0);

  let base = anchorPrice;
  if (service && service.basePrice > base) base = service.basePrice;
  if (base === 0) base = BUILD_OPTION_BASE.Outro;

  const implied = impliedSet(input);
  const needsSum = weightedSum(input.needs, NEED_WEIGHT, implied);
  const featuresSum = weightedSum(input.features, FEATURE_WEIGHT, implied);

  const priorityBoost =
    1 + Math.min(PRIORITY_BOOST_CAP, input.priorities.length * PRIORITY_STEP_BOOST);

  const rawTotal = (base + extraSurfaces + needsSum + featuresSum) * priorityBoost;

  // Internal complexity tier — drives how wide the min–max spread is.
  // Non-implied ("real") features count far more than ones already implied
  // by the chosen project type, so ticking a common box doesn't blow up
  // the tier the way a structural one (auth, DB, integrations) does.
  const nonImpliedFeatures = input.features.filter((f) => !implied.has(f)).length;
  const impliedFeatures = input.features.length - nonImpliedFeatures;
  const complexityScore =
    input.builds.length * 1 +
    input.needs.length * 0.4 +
    nonImpliedFeatures * 1.2 +
    impliedFeatures * 0.3;

  let tier: ComplexityTier;
  let spread: [number, number];
  if (complexityScore < 2) {
    tier = "Essencial";
    spread = [0.95, 1.15];
  } else if (complexityScore < 5) {
    tier = "Profissional";
    spread = [1.0, 1.3];
  } else if (complexityScore < 9) {
    tier = "Avançado";
    spread = [1.05, 1.45];
  } else {
    tier = "Sob medida";
    spread = [1.1, 1.6];
  }

  let min = rawTotal * spread[0];
  let max = rawTotal * spread[1];

  // Floor: an estimate should never undercut the service's own "a partir
  // de" price, and the range should always be meaningfully wide enough to
  // read as a real estimate rather than a single disguised number.
  min = Math.max(min, base);
  max = Math.max(max, min + base * 0.15);

  const hasRange = input.needs.length + input.features.length > 0;

  return {
    min: roundToHundred(min),
    max: roundToHundred(max),
    tier,
    isRecurring: false,
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
  const suffix = estimate.isRecurring ? "/mês" : "";
  if (!estimate.hasRange) {
    return `A partir de ${formatBRL(estimate.min)}${suffix}`;
  }
  if (estimate.min === estimate.max) {
    return `${formatBRL(estimate.min)}${suffix}`;
  }
  return `${formatBRL(estimate.min)} — ${formatBRL(estimate.max)}${suffix}`;
}
