import { put, get } from "@vercel/blob";

/**
 * ALUMNA's editable site content — the text, contact info, typography
 * choice and FAQ that the admin panel can change without a code deploy.
 *
 * Persisted as a single JSON document in Vercel Blob (this project has no
 * database — see the admin panel's own notes on that). Every public page
 * that renders this data always falls back to `DEFAULT_CONTENT` when the
 * blob is empty or unreachable, so a storage hiccup never breaks the site
 * — it just serves the original copy.
 *
 * NOT editable here (by design, this iteration): the LAB experiences
 * themselves, and the pricing numbers/formula in `src/lib/pricing.ts`
 * (editing services' display text is covered; the price weights that
 * feed the configurator's estimate engine stay code-only so the two
 * never drift out of sync silently).
 */

export const DISPLAY_FONTS = {
  bricolage: { label: "Bricolage Grotesque (padrão)", cssVar: "--font-bricolage" },
  spaceGrotesk: { label: "Space Grotesk", cssVar: "--font-space-grotesk" },
  fraunces: { label: "Fraunces", cssVar: "--font-fraunces" },
  archivo: { label: "Archivo", cssVar: "--font-archivo" },
} as const;

export const BODY_FONTS = {
  inter: { label: "Inter (padrão)", cssVar: "--font-inter" },
  manrope: { label: "Manrope", cssVar: "--font-manrope" },
  workSans: { label: "Work Sans", cssVar: "--font-work-sans" },
} as const;

export type DisplayFontKey = keyof typeof DISPLAY_FONTS;
export type BodyFontKey = keyof typeof BODY_FONTS;

export interface SiteContent {
  brand: {
    name: string;
    suffix: string;
    legalName: string;
    founder: string;
    foundedYear: number;
    city: string;
  };
  contact: {
    email: string | null;
    whatsappNumber: string | null;
    instagram: string | null;
    address: string;
  };
  typography: {
    display: DisplayFontKey;
    body: BodyFontKey;
  };
  hero: {
    eyebrow: string;
    coordinates: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    description: string;
    ctaLabel: string;
  };
  labsSection: {
    label: string;
    description: string;
  };
  howWeWork: {
    label: string;
    description: string;
    steps: { title: string; description: string }[];
  };
  servicesSection: {
    label: string;
    items: { name: string; slug: string; description: string }[];
  };
  studio: {
    label: string;
    paragraph: string;
    facts: { label: string; value: string }[];
  };
  faq: { question: string; answer: string }[];
  finalCta: {
    headlineLine1: string;
    headlineLine2: string;
    ctaLabel: string;
  };
}

export const DEFAULT_CONTENT: SiteContent = {
  brand: {
    name: "ALUMNA",
    suffix: "Digital Experience",
    legalName: "Alumna Estúdio Digital",
    founder: "Ana Clara R. Oliveira",
    foundedYear: 2026,
    city: "Brasil",
  },
  contact: {
    email: null,
    whatsappNumber: null,
    instagram: null,
    address: "Disponível para projetos em todo o Brasil, remoto por padrão.",
  },
  typography: {
    display: "bricolage",
    body: "inter",
  },
  hero: {
    eyebrow: "Estúdio Independente",
    coordinates: "N 23.5505° / W 46.6333°",
    titleLine1: "Alumna",
    titleLine2: "Digital Experience",
    lead: "Criamos experiências digitais para marcas que não querem parecer com todas as outras.",
    description:
      "Um estúdio independente de design e tecnologia. Sites, produtos digitais e sistemas — pensados como laboratório, apresentados como editorial.",
    ctaLabel: "Explorar",
  },
  labsSection: {
    label: "Labs — Projetos Conceituais",
    description:
      "Projetos conceituais desenvolvidos internamente como demonstração de capacidade — não são trabalhos encomendados por essas marcas.",
  },
  howWeWork: {
    label: "Como Construímos",
    description:
      "Do briefing ao produto final — cada projeto passa pelas mesmas cinco etapas, sem atalhos.",
    steps: [
      {
        title: "Descobrir",
        description:
          "Entendemos marca, objetivo e público antes de desenhar qualquer tela.",
      },
      {
        title: "Estruturar",
        description:
          "Mapeamos páginas, fluxos e prioridades em um esqueleto claro.",
      },
      {
        title: "Projetar",
        description:
          "Desenhamos a interface com tipografia, grid e identidade aplicados.",
      },
      {
        title: "Construir",
        description:
          "Desenvolvemos com código limpo, performance e testes reais.",
      },
      {
        title: "Lançar",
        description:
          "Publicamos, validamos e entregamos um produto pronto para crescer.",
      },
    ],
  },
  servicesSection: {
    label: "Serviços",
    items: [
      {
        name: "Website",
        slug: "site",
        description: "Sites institucionais editoriais, rápidos e memoráveis.",
      },
      {
        name: "E-commerce",
        slug: "loja-virtual",
        description: "Lojas de alta conversão sem parecer template.",
      },
      {
        name: "App",
        slug: "aplicativo",
        description: "Aplicativos completos, do onboarding ao uso diário.",
      },
      {
        name: "Produto Digital",
        slug: "plataforma",
        description: "Produtos digitais com identidade e sistema próprios.",
      },
      {
        name: "Sistemas",
        slug: "sistema",
        description: "Design systems e painéis internos que escalam.",
      },
      {
        name: "Automação",
        slug: "automacao",
        description: "Fluxos e integrações que tiram trabalho manual do time.",
      },
    ],
  },
  studio: {
    label: "Estúdio",
    paragraph:
      "A ALUMNA existe para quem está cansado de sites que parecem todos iguais. Tratamos cada projeto como um laboratório: testamos, refinamos, e só entregamos o que realmente funciona — visualmente e tecnicamente.",
    facts: [
      { label: "Fundado", value: "2026" },
      { label: "Fundadora", value: "Ana Clara R. Oliveira" },
      { label: "Base", value: "Remoto, Brasil" },
      { label: "Foco", value: "Design + Engenharia" },
    ],
  },
  faq: [
    {
      question: "Quanto tempo leva para criar um site?",
      answer:
        "Varia com o escopo — uma landing page costuma levar poucas semanas; sites e produtos mais complexos, mais tempo. O prazo é definido no briefing, depois do diagnóstico inicial.",
    },
    {
      question: "O domínio está incluso?",
      answer:
        "Não por padrão. Domínio é o endereço do site (ex: seunome.com.br), registrado à parte junto a um provedor. Podemos orientar ou cuidar do registro por você.",
    },
    {
      question: "Preciso comprar um domínio?",
      answer:
        "Só antes do lançamento. Para desenvolver o projeto, não é necessário — o domínio entra na reta final, quando o site vai ao ar.",
    },
    {
      question: "Posso começar o projeto sem ter um domínio?",
      answer:
        "Sim, sem problema. O domínio pode ser resolvido em paralelo, a qualquer momento antes do lançamento.",
    },
    {
      question: "Onde o site fica hospedado?",
      answer:
        "Em provedores de nuvem confiáveis (como Vercel), escolhidos conforme a necessidade técnica do projeto. Hospedagem é o serviço que mantém o site no ar.",
    },
    {
      question: "Quanto custa a hospedagem?",
      answer:
        "Depende do provedor, do tráfego e dos recursos que o projeto exige — não é um valor fixo. Para a maioria dos sites institucionais, o custo costuma ser baixo ou dentro de planos gratuitos.",
    },
    {
      question: "A hospedagem está inclusa?",
      answer:
        "Não faz parte automaticamente do desenvolvimento. Pode ser contratada separadamente ou incluída como parte da Manutenção e evolução — isso é combinado no orçamento.",
    },
    {
      question: "Vocês fazem correções depois da entrega?",
      answer:
        "Sim. Erros de implementação — algo que não funciona como combinado no escopo — são corrigidos dentro das condições definidas no projeto.",
    },
    {
      question: "O que acontece se eu encontrar um erro depois da entrega?",
      answer:
        "Você reporta e avaliamos: se for um erro de implementação, é corrigido conforme as condições do projeto. Se for uma alteração, novo conteúdo ou nova funcionalidade, isso é tratado como uma nova etapa.",
    },
    {
      question: "Existe garantia?",
      answer:
        "Garantimos que o que foi entregue funciona de acordo com o escopo combinado. Não é uma garantia vitalícia ou ilimitada — as condições exatas ficam registradas no orçamento de cada projeto.",
    },
    {
      question: "O site funciona no celular?",
      answer:
        "Sim. Todo projeto é construído responsivo, testado em desktop, tablet e celular antes da entrega.",
    },
    {
      question: "Vocês criam aplicativos para Android e iPhone?",
      answer: "Sim, desenvolvemos aplicativos mobile completos para as duas plataformas.",
    },
    {
      question: "Aplicativos precisam de hospedagem?",
      answer:
        "Geralmente sim, quando o app depende de um servidor (login, dados, notificações). Aplicativos simples e totalmente locais podem dispensar isso — avaliamos caso a caso.",
    },
    {
      question: "É possível criar painel administrativo?",
      answer:
        "Sim. É uma funcionalidade comum em sistemas e plataformas — permite gerenciar conteúdo, pedidos ou dados sem mexer em código.",
    },
    {
      question: "É possível integrar WhatsApp, pagamentos e outras ferramentas?",
      answer:
        "Sim. Integrações com WhatsApp, meios de pagamento, CRMs e outras ferramentas externas são recursos comuns nos projetos — cada uma tem seu próprio custo e condições, definidos pelo provedor do serviço.",
    },
    {
      question: "Quem fica com os arquivos e acessos?",
      answer:
        "Você. Recomendamos que domínio, hospedagem e contas de serviços fiquem sempre registrados no seu nome, com os acessos compartilhados com você ao final do projeto.",
    },
    {
      question: "Posso solicitar alterações durante o projeto?",
      answer:
        "Sim, dentro do escopo combinado. Mudanças que ampliam o escopo original podem impactar prazo e valor — nesses casos, ajustamos juntos antes de seguir.",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "Normalmente dividido por etapas do projeto (entrada + parcelas ao longo do desenvolvimento). A forma exata é definida no orçamento, antes do início.",
    },
    {
      question: "Domínio e serviços de terceiros ficam no nome de quem?",
      answer:
        "Recomendamos que fiquem sempre no seu nome — domínio, hospedagem e integrações. Isso garante que você tem controle total sobre o que é seu.",
    },
    {
      question: "Vocês fazem manutenção depois do lançamento?",
      answer:
        "Sim, como serviço opcional — Manutenção e evolução, com suporte contínuo, pequenas atualizações e acompanhamento do que já foi lançado.",
    },
  ],
  finalCta: {
    headlineLine1: "Sua próxima experiência",
    headlineLine2: "digital começa aqui.",
    ctaLabel: "Começar um Projeto",
  },
};

const BLOB_PATHNAME = "alumna/site-content.json";

/**
 * Server-only read. Always resolves — falls back to `DEFAULT_CONTENT` on
 * any failure (blob not created yet, network hiccup, malformed JSON) so a
 * storage problem degrades to "shows the original copy", never a crash.
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const result = await get(BLOB_PATHNAME, {
      access: "private",
      // The admin panel calls `revalidatePath` after every save, but that
      // only invalidates Next's own render cache — Vercel Blob's `get()`
      // also caches at the CDN layer by default (`useCache: true`), which
      // `revalidatePath` has no way to reach. Without this, an edit could
      // still serve the previous content until that CDN entry expired on
      // its own. The content here is a few KB and edited rarely, so
      // reading straight from origin every time is a fine trade.
      useCache: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result || result.statusCode !== 200) return DEFAULT_CONTENT;
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text) as Partial<SiteContent>;
    // Shallow-merge over defaults so a field added to the schema after the
    // blob was last saved still has a sane value instead of `undefined`.
    return { ...DEFAULT_CONTENT, ...parsed };
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await put(BLOB_PATHNAME, JSON.stringify(content, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}
