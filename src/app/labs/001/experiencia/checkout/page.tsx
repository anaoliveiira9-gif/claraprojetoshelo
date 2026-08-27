"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useEter } from "@/components/labs/001/eter-context";
import { formatPrice } from "@/components/labs/001/products";
import { cn } from "@/lib/utils";

const STEPS = ["Sacola", "Dados", "Entrega", "Pagamento", "Confirmação"] as const;

const PAYMENT_METHODS = [
  { id: "pix", label: "PIX" },
  { id: "cartao", label: "Cartão de Crédito" },
  { id: "boleto", label: "Boleto" },
] as const;

function fakeOrderNumber() {
  return `ETER-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export default function CheckoutPage() {
  const { cartProducts, cartTotal, setQuantity, clearCart } = useEter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ nome: "", email: "" });
  const [address, setAddress] = useState({
    rua: "",
    cidade: "",
    cep: "",
  });
  const [method, setMethod] = useState<(typeof PAYMENT_METHODS)[number]["id"]>(
    "pix"
  );
  const [processing, setProcessing] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [furthestStep, setFurthestStep] = useState(0);
  const orderNumber = useMemo(() => fakeOrderNumber(), []);

  // Each step renders its own heading; when the step changes, move focus
  // there so screen-reader users get told the content changed instead of
  // silently landing wherever the "Continuar"/stepper control happened to
  // be. Skipped on first mount so loading the page doesn't yank focus away
  // from wherever the user actually navigated in from.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 38;
  const total = cartTotal + shipping;

  const nomeValid = data.nome.trim().length > 0;
  const emailValid = /\S+@\S+\.\S+/.test(data.email);
  const ruaValid = address.rua.trim().length > 0;
  const cidadeValid = address.cidade.trim().length > 0;

  const canAdvance =
    (step === 0 && cartProducts.length > 0) ||
    (step === 1 && nomeValid && emailValid) ||
    (step === 2 && ruaValid && cidadeValid) ||
    step === 3 ||
    step === 4;

  function markTouched(field: string) {
    setTouched((t) => (t[field] ? t : { ...t, [field]: true }));
  }

  function goToStep(target: number) {
    // Only steps already reached can be jumped back to directly — this
    // mirrors "← Voltar" (never lets you skip ahead of validation) while
    // making the stepper itself a real, clickable piece of navigation
    // instead of a static progress label.
    if (target <= furthestStep && target !== step) setStep(target);
  }

  async function handlePay() {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1100));
    setProcessing(false);
    setStep(4);
    clearCart();
  }

  if (cartProducts.length === 0 && step === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="font-eter-serif text-2xl">Sua sacola está vazia.</p>
        <Link
          href="/labs/001/experiencia/produtos"
          data-cursor-hover
          className="mt-6 border border-[#171512] px-6 py-3 font-eter-sans text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#171512] hover:text-[#F6F1E9]"
        >
          Ver produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-16">
      <nav
        aria-label="Etapas do checkout"
        className="flex items-center gap-2 font-eter-sans text-[10px] uppercase tracking-[0.15em] text-[#171512]/70"
      >
        {STEPS.map((label, i) => {
          // Once the order is confirmed the cart is cleared, so the earlier
          // steps no longer have anything valid to show — the stepper stops
          // being a navigation control at that point, matching there being
          // no "← Voltar" control on the confirmation screen either.
          const reachable = step !== 4 && i <= furthestStep && i !== step;
          return (
            <span key={label} className="flex items-center gap-2">
              <button
                type="button"
                data-cursor-hover={reachable ? true : undefined}
                onClick={() => goToStep(i)}
                disabled={!reachable}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "transition-colors",
                  i <= step ? "text-[#7A5A28]" : undefined,
                  reachable
                    ? "cursor-pointer hover:text-[#171512]"
                    : "cursor-default"
                )}
              >
                {String(i + 1).padStart(2, "0")} {label}
              </button>
              {i < STEPS.length - 1 && <span aria-hidden="true">—</span>}
            </span>
          );
        })}
      </nav>

      <div className="mt-10">
        {step === 0 && (
          <div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-eter-serif text-3xl outline-none"
            >
              Sua sacola
            </h1>
            <ul className="mt-8 flex flex-col gap-6">
              {cartProducts.map(({ product, quantity }) => (
                <li
                  key={product.slug}
                  className="flex items-center justify-between gap-4 border-b border-[#171512]/10 pb-6"
                >
                  <div>
                    <p className="font-eter-serif text-lg">{product.name}</p>
                    <p className="text-xs text-[#171512]/70">{product.size}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        data-cursor-hover
                        aria-label={`Diminuir quantidade de ${product.name}`}
                        onClick={() => setQuantity(product.slug, quantity - 1)}
                        className="h-6 w-6 border border-[#171512]/20 transition-[border-color,transform] duration-150 hover:border-[#171512] active:scale-90"
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        data-cursor-hover
                        aria-label={`Aumentar quantidade de ${product.name}`}
                        onClick={() => setQuantity(product.slug, quantity + 1)}
                        className="h-6 w-6 border border-[#171512]/20 transition-[border-color,transform] duration-150 hover:border-[#171512] active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="text-sm">
                    {formatPrice(product.price * quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-eter-serif text-3xl outline-none"
            >
              Seus dados
            </h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="checkout-nome" className="sr-only">
                  Nome completo
                </label>
                <input
                  id="checkout-nome"
                  placeholder="Nome completo"
                  value={data.nome}
                  onChange={(e) =>
                    setData((d) => ({ ...d, nome: e.target.value }))
                  }
                  onBlur={() => markTouched("nome")}
                  aria-invalid={touched.nome && !nomeValid}
                  aria-describedby={
                    touched.nome && !nomeValid ? "checkout-nome-error" : undefined
                  }
                  className={cn(
                    "w-full border bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/60 focus:outline-none",
                    touched.nome && !nomeValid
                      ? "border-red-800/60 focus:border-red-800/60"
                      : "border-[#171512]/45 focus:border-[#171512]"
                  )}
                />
                {touched.nome && !nomeValid && (
                  <p
                    id="checkout-nome-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-800"
                  >
                    Informe seu nome completo.
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="checkout-email" className="sr-only">
                  E-mail
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  placeholder="E-mail"
                  value={data.email}
                  onChange={(e) =>
                    setData((d) => ({ ...d, email: e.target.value }))
                  }
                  onBlur={() => markTouched("email")}
                  aria-invalid={touched.email && !emailValid}
                  aria-describedby={
                    touched.email && !emailValid
                      ? "checkout-email-error"
                      : undefined
                  }
                  className={cn(
                    "w-full border bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/60 focus:outline-none",
                    touched.email && !emailValid
                      ? "border-red-800/60 focus:border-red-800/60"
                      : "border-[#171512]/45 focus:border-[#171512]"
                  )}
                />
                {touched.email && !emailValid && (
                  <p
                    id="checkout-email-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-800"
                  >
                    Informe um e-mail válido.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-eter-serif text-3xl outline-none"
            >
              Entrega
            </h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="checkout-rua" className="sr-only">
                  Endereço
                </label>
                <input
                  id="checkout-rua"
                  placeholder="Endereço"
                  value={address.rua}
                  onChange={(e) =>
                    setAddress((a) => ({ ...a, rua: e.target.value }))
                  }
                  onBlur={() => markTouched("rua")}
                  aria-invalid={touched.rua && !ruaValid}
                  aria-describedby={
                    touched.rua && !ruaValid ? "checkout-rua-error" : undefined
                  }
                  className={cn(
                    "w-full border bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/60 focus:outline-none",
                    touched.rua && !ruaValid
                      ? "border-red-800/60 focus:border-red-800/60"
                      : "border-[#171512]/45 focus:border-[#171512]"
                  )}
                />
                {touched.rua && !ruaValid && (
                  <p
                    id="checkout-rua-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-800"
                  >
                    Informe o endereço de entrega.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="checkout-cidade" className="sr-only">
                  Cidade
                </label>
                <input
                  id="checkout-cidade"
                  placeholder="Cidade"
                  value={address.cidade}
                  onChange={(e) =>
                    setAddress((a) => ({ ...a, cidade: e.target.value }))
                  }
                  onBlur={() => markTouched("cidade")}
                  aria-invalid={touched.cidade && !cidadeValid}
                  aria-describedby={
                    touched.cidade && !cidadeValid
                      ? "checkout-cidade-error"
                      : undefined
                  }
                  className={cn(
                    "w-full border bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/60 focus:outline-none",
                    touched.cidade && !cidadeValid
                      ? "border-red-800/60 focus:border-red-800/60"
                      : "border-[#171512]/45 focus:border-[#171512]"
                  )}
                />
                {touched.cidade && !cidadeValid && (
                  <p
                    id="checkout-cidade-error"
                    role="alert"
                    className="mt-1.5 text-xs text-red-800"
                  >
                    Informe a cidade.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="checkout-cep" className="sr-only">
                  CEP
                </label>
                <input
                  id="checkout-cep"
                  placeholder="CEP"
                  value={address.cep}
                  onChange={(e) =>
                    setAddress((a) => ({ ...a, cep: e.target.value }))
                  }
                  className="w-full border border-[#171512]/45 bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/60 focus:border-[#171512] focus:outline-none"
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-[#171512]/70">
              {shipping === 0
                ? "Frete grátis para este pedido."
                : `Frete: ${formatPrice(shipping)}`}
            </p>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-eter-serif text-3xl outline-none"
            >
              Pagamento
            </h1>
            <p className="mt-2 text-xs text-[#171512]/70">
              Demonstração — nenhuma cobrança real é feita.
            </p>
            <div
              role="group"
              aria-label="Forma de pagamento"
              className="mt-6 grid gap-3 sm:grid-cols-3"
            >
              {PAYMENT_METHODS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  data-cursor-hover
                  aria-pressed={method === option.id}
                  onClick={() => setMethod(option.id)}
                  className={cn(
                    "border px-4 py-4 text-xs uppercase tracking-[0.15em] transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.97]",
                    method === option.id
                      ? "border-[#171512] bg-[#171512] text-[#F6F1E9]"
                      : "border-[#171512]/20 text-[#171512]/70 hover:border-[#171512]"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              data-cursor-hover
              onClick={handlePay}
              disabled={processing}
              className="mt-8 flex w-full items-center justify-center bg-[#171512] px-6 py-4 font-eter-sans text-xs uppercase tracking-[0.2em] text-[#F6F1E9] transition-[background-color,transform] duration-150 hover:bg-[#7A5A28] active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 sm:w-fit sm:px-10"
            >
              {processing
                ? "Processando…"
                : `Confirmar pedido — ${formatPrice(total)}`}
            </button>
            <p className="sr-only" role="status" aria-live="polite">
              {processing ? "Processando pedido…" : ""}
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <p className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#7A5A28]">
              Pedido confirmado
            </p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-eter-serif mt-3 text-3xl outline-none sm:text-4xl"
            >
              Obrigada, {data.nome.split(" ")[0] || "cliente"}.
            </h1>
            <p className="mt-4 text-sm text-[#171512]/70">
              Seu pedido {orderNumber} foi recebido. Este é um checkout
              demonstrativo — nenhuma cobrança real foi feita.
            </p>
            <Link
              href="/labs/001/experiencia"
              data-cursor-hover
              className="mt-8 inline-flex border border-[#171512] px-8 py-3.5 font-eter-sans text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#171512] hover:text-[#F6F1E9]"
            >
              Voltar à loja
            </Link>
          </div>
        )}
      </div>

      {step < 4 && (
        <div className="mt-12 flex items-center justify-between border-t border-[#171512]/10 pt-6">
          <button
            type="button"
            data-cursor-hover
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="font-eter-sans text-xs uppercase tracking-[0.15em] text-[#171512]/70 transition-colors hover:text-[#171512] disabled:opacity-0"
          >
            ← Voltar
          </button>
          {step < 3 && (
            <button
              type="button"
              data-cursor-hover
              onClick={() => {
                if (canAdvance) {
                  setFurthestStep((f) => Math.max(f, step + 1));
                  setStep((s) => Math.min(3, s + 1));
                  return;
                }
                // Invalid — reveal the inline errors for this step instead
                // of silently doing nothing, so a disabled-looking button
                // still gives a clear reason when tapped.
                if (step === 1) {
                  setTouched((t) => ({ ...t, nome: true, email: true }));
                } else if (step === 2) {
                  setTouched((t) => ({ ...t, rua: true, cidade: true }));
                }
              }}
              className={cn(
                "border px-6 py-3 font-eter-sans text-xs uppercase tracking-[0.15em] transition-colors",
                canAdvance
                  ? "border-[#171512] text-[#171512] hover:bg-[#171512] hover:text-[#F6F1E9]"
                  : "border-[#171512]/30 text-[#171512]/40"
              )}
            >
              Continuar →
            </button>
          )}
        </div>
      )}
    </main>
  );
}
