import type { PaymentMethodId } from "@/lib/config";

/**
 * Mocked payment layer. Nothing here talks to a real gateway — each
 * function simulates latency and returns a fake confirmation so the
 * checkout UI has something real to render. No monetary value is
 * fabricated here on purpose: the real amount only exists once the
 * studio reviews the diagnostic and prepares an actual quote.
 *
 * To go live, swap the body of each function for a real call (Stripe,
 * Mercado Pago, Pagar.me, Asaas...) and keep the same return shape, or
 * update the call sites in `src/app/orcamento` to match the new response.
 */

export interface MockChargeResult {
  method: PaymentMethodId;
  status: "confirmed" | "pending";
  reference: string;
  detail: string;
}

function fakeReference() {
  return `AL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createMockCharge(
  method: PaymentMethodId
): Promise<MockChargeResult> {
  await wait(1100);

  const reference = fakeReference();

  switch (method) {
    case "pix":
      return {
        method,
        status: "confirmed",
        reference,
        detail:
          "QR Code ilustrativo gerado. O valor real é definido após a aprovação do orçamento.",
      };
    case "boleto":
      return {
        method,
        status: "pending",
        reference,
        detail:
          "Boleto ilustrativo gerado. O valor real é definido após a aprovação do orçamento.",
      };
    case "cartao":
      return {
        method,
        status: "confirmed",
        reference,
        detail:
          "Cobrança ilustrativa autorizada. O valor real é definido após a aprovação do orçamento.",
      };
  }
}
