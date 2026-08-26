/**
 * Single source of truth for ALUMNA's public-facing data.
 * Replace the placeholder values below with real data when available —
 * nothing else in the codebase needs to change.
 */

export const BRAND = {
  name: "ALUMNA",
  suffix: "Digital Experience",
  legalName: "Alumna Estúdio Digital",
  founder: "Ana Clara R. Oliveira",
  foundedYear: 2026,
  city: "Brasil",
} as const;

/**
 * Real contact details go here once they exist — every call site reads
 * from this object and already handles `null` gracefully (renders a
 * disabled "em breve" state instead of a link), so filling these in is
 * the only change needed to turn on real WhatsApp/e-mail contact.
 */
export const CONTACT = {
  email: null as string | null,
  whatsappNumber: null as string | null, // digits only: country code + DDD + number
  get whatsappUrl() {
    return this.whatsappNumber ? `https://wa.me/${this.whatsappNumber}` : null;
  },
  instagram: null as string | null,
  address: "Disponível para projetos em todo o Brasil, remoto por padrão.",
} as const;

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
  { href: "/#labs", label: "Labs" },
  { href: "/#services", label: "Serviços" },
  { href: "/#studio", label: "Estúdio" },
  { href: "/start-a-project", label: "Começar um Projeto" },
] as const;
