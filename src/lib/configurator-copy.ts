import type {
  BuildOption,
  NeedOption,
  FeatureOption,
  PriorityOption,
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
  "Recursos técnicos do projeto. Não tem certeza? Pode pular.",
  "O que mais importa para você neste projeto.",
  "Só para podermos te responder — sem spam.",
  "",
] as const;

export const BUILD_DESCRIPTIONS: Record<BuildOption, string> = {
  Site: "Institucional, editorial ou de apresentação",
  "Loja virtual": "Vender produtos ou serviços online",
  Aplicativo: "App para iPhone ou Android",
  Sistema: "Painel ou ferramenta interna sob medida",
  "Landing page": "Uma página só, focada em um objetivo",
  Automação: "Conectar ferramentas e reduzir trabalho manual",
  "UX/UI": "Só o design da interface, sem desenvolver",
  "Identidade digital": "Marca (logo, cores) aplicada ao digital",
  Outro: "Não encontrou? Conte pra gente no briefing",
};

export const NEED_DESCRIPTIONS: Record<NeedOption, string> = {
  Vender: "Receber pagamentos por produtos ou serviços",
  Agendar: "Marcar horários, reservas ou consultas",
  Captar: "Gerar contatos e novas oportunidades",
  Automatizar: "Reduzir tarefas manuais repetitivas",
  Gerenciar: "Organizar pedidos, conteúdo ou equipe",
  Integrar: "Conectar com outras ferramentas que você usa",
  "Área de clientes": "Login exclusivo para cada cliente",
  Pagamentos: "Cobrar direto pelo site ou app",
  "Dados e métricas": "Acompanhar números e relatórios",
  Outro: "Algo específico do seu negócio",
};

export const FEATURE_DESCRIPTIONS: Record<FeatureOption, string> = {
  Login: "Cadastro e acesso de usuários",
  "Painel administrativo": "Área para gerenciar tudo por trás",
  Pagamentos: "Pix, cartão ou boleto integrados",
  WhatsApp: "Contato ou avisos pelo WhatsApp",
  "E-mail": "Envio automático de e-mails",
  Notificações: "Avisos automáticos no app ou navegador",
  "Busca e filtros": "Encontrar conteúdo ou produtos rápido",
  Mapas: "Endereço ou localização visual",
  Chat: "Conversa em tempo real",
  Assinaturas: "Cobrança recorrente, mensal ou anual",
  Integrações: "Conectar com sistemas externos (ERP, CRM...)",
  IA: "Recursos com inteligência artificial",
  "Banco de dados": "Armazenar e organizar informações",
};

export const PRIORITY_DESCRIPTIONS: Record<PriorityOption, string> = {
  Experiência: "Uso fácil, fluido e agradável",
  Conversão: "Transformar visita em resultado",
  Performance: "Velocidade e estabilidade",
  Tecnologia: "Robustez técnica e escalabilidade",
  Marca: "Identidade visual marcante",
};
