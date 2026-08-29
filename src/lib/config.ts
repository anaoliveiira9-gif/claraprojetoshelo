/**
 * Code-only site config — payment methods and navigation links.
 * Brand identity and contact details are editable content now, not code:
 * see `src/lib/site-content.ts` (persisted in Vercel Blob, edited from
 * `/admin`). Read them via `useSiteContent()` in client components, or
 * `getSiteContent()` directly in server components.
 */

/**
 * Payment methods offered in the mocked budget/checkout flow.
 * These are UI placeholders only — no real gateway is wired up.
 * When integrating, swap the functions in `src/lib/payments.ts`
 * for real calls (e.g. Stripe, Pagar.me, Mercado Pago, Asaas) and
 * this list keeps working unchanged.
 */
export const PAYMENT_METHODS = [
  {
    id: "pix",
    label: "PIX",
    description: "Confirmação imediata. QR Code ou copia e cola.",
  },
  {
    id: "boleto",
    label: "Boleto",
    description: "Compensação em até 2 dias úteis.",
  },
  {
    id: "cartao",
    label: "Cartão de Crédito",
    description: "Em até 12x, sujeito a taxas da operadora.",
  },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

export const NAV_LINKS = [
  { href: "/#how-we-work", label: "Como Construímos" },
  { href: "/#labs", label: "Labs" },
  { href: "/#services", label: "Serviços" },
  { href: "/#studio", label: "Estúdio" },
  { href: "/#faq", label: "FAQ" },
  { href: "/start-a-project", label: "Começar um Projeto" },
] as const;
