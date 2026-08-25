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

export const CONTACT = {
  email: "ola@alumna.studio",
  phone: "+55 11 0000-0000",
  phoneDisplay: "+55 11 0000-0000",
  whatsappNumber: "5511000000000", // digits only, country code + DDD + number
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}`;
  },
  instagram: "https://instagram.com/alumna.studio",
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
