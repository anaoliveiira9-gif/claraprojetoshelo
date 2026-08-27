import type {
  BuildOption,
  ObjectiveOption,
  FeatureOption,
  PriorityOption,
  AddonOption,
  StyleOption,
} from "@/lib/pricing";

/**
 * Plain-language subtitles and step hints for the configurator — purely
 * presentational copy, kept separate from `@/lib/pricing` so the pricing
 * engine's option keys stay the single source of truth and this file can
 * be tuned for clarity without touching any number.
 */

export const STEP_HINTS = [
  "Pode escolher mais de um — dá para combinar.",
  "O que esse projeto precisa fazer pelo seu negócio.",
  "Recursos do projeto. Não tem certeza? Pode pular.",
  "O que mais importa para você neste projeto.",
  "Serviços complementares — só marque o que fizer sentido.",
  "Isso ajuda a calibrar o nível de personalização do projeto.",
  "Só para podermos te responder — sem spam.",
  "",
] as const;

export const BUILD_DESCRIPTIONS: Record<BuildOption, string> = {
  "Landing page": "Uma página só, focada em um objetivo",
  Site: "Institucional, editorial ou de apresentação",
  "Loja virtual": "Vender produtos ou serviços online",
  Aplicativo: "App para iPhone ou Android",
  Sistema: "Painel ou ferramenta interna sob medida",
  Plataforma: "Produto multiusuário, do SaaS ao marketplace",
};

export const OBJECTIVE_DESCRIPTIONS: Record<ObjectiveOption, string> = {
  Vender: "Receber pagamentos por produtos ou serviços",
  "Atrair clientes": "Gerar contatos e novas oportunidades",
  "Agendar e receber pedidos": "Marcar horários ou receber pedidos",
  "Gerenciar operações": "Organizar pedidos, conteúdo ou equipe",
  "Automatizar processos": "Reduzir tarefas manuais repetitivas",
  "Conectar ferramentas": "Integrar com o que você já usa",
};

export const FEATURE_DESCRIPTIONS: Record<FeatureOption, string> = {
  "Contas e login": "Cadastro e acesso de usuários",
  "Área administrativa": "Área para gerenciar tudo por trás",
  Pagamentos: "Pix, cartão ou boleto integrados",
  "WhatsApp e contato": "Contato ou avisos pelo WhatsApp",
  Notificações: "Avisos automáticos no app ou navegador",
  "Busca e filtros": "Encontrar conteúdo ou produtos rápido",
  "Mapas e localização": "Endereço ou localização visual",
  "Integrações externas": "Conectar com sistemas externos (ERP, CRM...)",
  "Inteligência artificial": "Recursos com inteligência artificial",
};

export const PRIORITY_DESCRIPTIONS: Record<PriorityOption, string> = {
  Experiência: "Uso fácil, fluido e agradável",
  Conversão: "Transformar visita em resultado",
  Performance: "Velocidade e estabilidade",
  Tecnologia: "Robustez técnica e escalabilidade",
  Marca: "Identidade visual marcante",
};

export const ADDON_DESCRIPTIONS: Record<AddonOption, string> = {
  Automação: "Conectar ferramentas e reduzir trabalho manual",
  "UX/UI": "Só o design da interface, sem desenvolver",
  "Identidade digital": "Marca (logo, cores) aplicada ao digital",
  "Manutenção e evolução": "Suporte contínuo, a partir de R$ 700/mês",
};

export const STYLE_DESCRIPTIONS: Record<StyleOption, string> = {
  Essencial: "O necessário para resolver o objetivo com eficiência.",
  Personalizado: "Maior liberdade visual, estratégica e funcional.",
  "Sob medida":
    "Experiência e estrutura desenvolvidas especificamente para necessidades mais complexas.",
};
