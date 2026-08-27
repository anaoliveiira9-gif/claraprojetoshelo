"use client";

import { useMemo, useState } from "react";
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
  const orderNumber = useMemo(() => fakeOrderNumber(), []);

  const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 38;
  const total = cartTotal + shipping;

  const canAdvance =
    (step === 0 && cartProducts.length > 0) ||
    (step === 1 && data.nome.trim() && /\S+@\S+\.\S+/.test(data.email)) ||
    (step === 2 && address.rua.trim() && address.cidade.trim()) ||
    step === 3 ||
    step === 4;

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
      <div className="flex items-center gap-2 font-eter-sans text-[10px] uppercase tracking-[0.15em] text-[#171512]/50">
        {STEPS.map((label, i) => (
          <span key={label} className="flex items-center gap-2">
            <span className={i <= step ? "text-[#B4915B]" : undefined}>
              {String(i + 1).padStart(2, "0")} {label}
            </span>
            {i < STEPS.length - 1 && <span>—</span>}
          </span>
        ))}
      </div>

      <div className="mt-10">
        {step === 0 && (
          <div>
            <h1 className="font-eter-serif text-3xl">Sua sacola</h1>
            <ul className="mt-8 flex flex-col gap-6">
              {cartProducts.map(({ product, quantity }) => (
                <li
                  key={product.slug}
                  className="flex items-center justify-between gap-4 border-b border-[#171512]/10 pb-6"
                >
                  <div>
                    <p className="font-eter-serif text-lg">{product.name}</p>
                    <p className="text-xs text-[#171512]/50">{product.size}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        data-cursor-hover
                        onClick={() => setQuantity(product.slug, quantity - 1)}
                        className="h-6 w-6 border border-[#171512]/20"
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        data-cursor-hover
                        onClick={() => setQuantity(product.slug, quantity + 1)}
                        className="h-6 w-6 border border-[#171512]/20"
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
            <h1 className="font-eter-serif text-3xl">Seus dados</h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Nome completo"
                value={data.nome}
                onChange={(e) => setData((d) => ({ ...d, nome: e.target.value }))}
                className="border border-[#171512]/20 bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/40 focus:border-[#171512] focus:outline-none sm:col-span-2"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={data.email}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                className="border border-[#171512]/20 bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/40 focus:border-[#171512] focus:outline-none sm:col-span-2"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-eter-serif text-3xl">Entrega</h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Endereço"
                value={address.rua}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, rua: e.target.value }))
                }
                className="border border-[#171512]/20 bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/40 focus:border-[#171512] focus:outline-none sm:col-span-2"
              />
              <input
                placeholder="Cidade"
                value={address.cidade}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, cidade: e.target.value }))
                }
                className="border border-[#171512]/20 bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/40 focus:border-[#171512] focus:outline-none"
              />
              <input
                placeholder="CEP"
                value={address.cep}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, cep: e.target.value }))
                }
                className="border border-[#171512]/20 bg-transparent px-4 py-3 text-sm placeholder:text-[#171512]/40 focus:border-[#171512] focus:outline-none"
              />
            </div>
            <p className="mt-4 text-xs text-[#171512]/50">
              {shipping === 0
                ? "Frete grátis para este pedido."
                : `Frete: ${formatPrice(shipping)}`}
            </p>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="font-eter-serif text-3xl">Pagamento</h1>
            <p className="mt-2 text-xs text-[#171512]/50">
              Demonstração — nenhuma cobrança real é feita.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {PAYMENT_METHODS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  data-cursor-hover
                  onClick={() => setMethod(option.id)}
                  className={cn(
                    "border px-4 py-4 text-xs uppercase tracking-[0.15em] transition-colors",
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
              className="mt-8 flex w-full items-center justify-center bg-[#171512] px-6 py-4 font-eter-sans text-xs uppercase tracking-[0.2em] text-[#F6F1E9] transition-colors hover:bg-[#B4915B] disabled:opacity-50 sm:w-fit sm:px-10"
            >
              {processing
                ? "Processando…"
                : `Confirmar pedido — ${formatPrice(total)}`}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <p className="font-eter-sans text-[11px] uppercase tracking-[0.2em] text-[#B4915B]">
              Pedido confirmado
            </p>
            <h1 className="font-eter-serif mt-3 text-3xl sm:text-4xl">
              Obrigada, {data.nome.split(" ")[0] || "cliente"}.
            </h1>
            <p className="mt-4 text-sm text-[#171512]/60">
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
            className="font-eter-sans text-xs uppercase tracking-[0.15em] text-[#171512]/50 transition-colors hover:text-[#171512] disabled:opacity-0"
          >
            ← Voltar
          </button>
          {step < 3 && (
            <button
              type="button"
              data-cursor-hover
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              disabled={!canAdvance}
              className="border border-[#171512] px-6 py-3 font-eter-sans text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[#171512] hover:text-[#F6F1E9] disabled:cursor-not-allowed disabled:opacity-30"
            >
              Continuar →
            </button>
          )}
        </div>
      )}
    </main>
  );
}
