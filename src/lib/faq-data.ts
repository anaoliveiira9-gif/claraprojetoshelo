/**
 * FAQ content — kept out of `faq.tsx` (a "use client" component) so server
 * components (like the admin panel) can import this plain data without
 * crossing the client-boundary, which breaks static export of the data.
 */
export const FAQ_ITEMS = [
  {
    q: "Quanto tempo leva para criar um site?",
    a: "Varia com o escopo — uma landing page costuma levar poucas semanas; sites e produtos mais complexos, mais tempo. O prazo é definido no briefing, depois do diagnóstico inicial.",
  },
  {
    q: "O domínio está incluso?",
    a: "Não por padrão. Domínio é o endereço do site (ex: seunome.com.br), registrado à parte junto a um provedor. Podemos orientar ou cuidar do registro por você.",
  },
  {
    q: "Preciso comprar um domínio?",
    a: "Só antes do lançamento. Para desenvolver o projeto, não é necessário — o domínio entra na reta final, quando o site vai ao ar.",
  },
  {
    q: "Posso começar o projeto sem ter um domínio?",
    a: "Sim, sem problema. O domínio pode ser resolvido em paralelo, a qualquer momento antes do lançamento.",
  },
  {
    q: "Onde o site fica hospedado?",
    a: "Em provedores de nuvem confiáveis (como Vercel), escolhidos conforme a necessidade técnica do projeto. Hospedagem é o serviço que mantém o site no ar.",
  },
  {
    q: "Quanto custa a hospedagem?",
    a: "Depende do provedor, do tráfego e dos recursos que o projeto exige — não é um valor fixo. Para a maioria dos sites institucionais, o custo costuma ser baixo ou dentro de planos gratuitos.",
  },
  {
    q: "A hospedagem está inclusa?",
    a: "Não faz parte automaticamente do desenvolvimento. Pode ser contratada separadamente ou incluída como parte da Manutenção e evolução — isso é combinado no orçamento.",
  },
  {
    q: "Vocês fazem correções depois da entrega?",
    a: "Sim. Erros de implementação — algo que não funciona como combinado no escopo — são corrigidos dentro das condições definidas no projeto.",
  },
  {
    q: "O que acontece se eu encontrar um erro depois da entrega?",
    a: "Você reporta e avaliamos: se for um erro de implementação, é corrigido conforme as condições do projeto. Se for uma alteração, novo conteúdo ou nova funcionalidade, isso é tratado como uma nova etapa.",
  },
  {
    q: "Existe garantia?",
    a: "Garantimos que o que foi entregue funciona de acordo com o escopo combinado. Não é uma garantia vitalícia ou ilimitada — as condições exatas ficam registradas no orçamento de cada projeto.",
  },
  {
    q: "O site funciona no celular?",
    a: "Sim. Todo projeto é construído responsivo, testado em desktop, tablet e celular antes da entrega.",
  },
  {
    q: "Vocês criam aplicativos para Android e iPhone?",
    a: "Sim, desenvolvemos aplicativos mobile completos para as duas plataformas.",
  },
  {
    q: "Aplicativos precisam de hospedagem?",
    a: "Geralmente sim, quando o app depende de um servidor (login, dados, notificações). Aplicativos simples e totalmente locais podem dispensar isso — avaliamos caso a caso.",
  },
  {
    q: "É possível criar painel administrativo?",
    a: "Sim. É uma funcionalidade comum em sistemas e plataformas — permite gerenciar conteúdo, pedidos ou dados sem mexer em código.",
  },
  {
    q: "É possível integrar WhatsApp, pagamentos e outras ferramentas?",
    a: "Sim. Integrações com WhatsApp, meios de pagamento, CRMs e outras ferramentas externas são recursos comuns nos projetos — cada uma tem seu próprio custo e condições, definidos pelo provedor do serviço.",
  },
  {
    q: "Quem fica com os arquivos e acessos?",
    a: "Você. Recomendamos que domínio, hospedagem e contas de serviços fiquem sempre registrados no seu nome, com os acessos compartilhados com você ao final do projeto.",
  },
  {
    q: "Posso solicitar alterações durante o projeto?",
    a: "Sim, dentro do escopo combinado. Mudanças que ampliam o escopo original podem impactar prazo e valor — nesses casos, ajustamos juntos antes de seguir.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Normalmente dividido por etapas do projeto (entrada + parcelas ao longo do desenvolvimento). A forma exata é definida no orçamento, antes do início.",
  },
  {
    q: "Domínio e serviços de terceiros ficam no nome de quem?",
    a: "Recomendamos que fiquem sempre no seu nome — domínio, hospedagem e integrações. Isso garante que você tem controle total sobre o que é seu.",
  },
  {
    q: "Vocês fazem manutenção depois do lançamento?",
    a: "Sim, como serviço opcional — Manutenção e evolução, com suporte contínuo, pequenas atualizações e acompanhamento do que já foi lançado.",
  },
] as const;
