"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACT, PAYMENT_METHODS, type PaymentMethodId } from "@/lib/config";
import { suggestScope, type ProjectSelection } from "@/lib/diagnostic";
import { submitBriefing } from "@/lib/briefing";
import { createMockCharge, type MockChargeResult } from "@/lib/payments";
import { SectionLabel } from "@/components/section-label";

function parseListParam(value: string | undefined) {
  if (!value) return [];
  return value.split(",").filter(Boolean);
}

export function BudgetFlow({
  build,
  needs,
  priorities,
  name,
  email,
  company,
}: {
  build?: string;
  needs?: string;
  priorities?: string;
  name?: string;
  email?: string;
  company?: string;
}) {
  const selection = useMemo<ProjectSelection>(
    () => ({
      build: (build as ProjectSelection["build"]) ?? null,
      needs: parseListParam(needs) as ProjectSelection["needs"],
      priorities: parseListParam(priorities) as ProjectSelection["priorities"],
    }),
    [build, needs, priorities]
  );

  const hasSelection = selection.build !== null;
  const scope = useMemo(() => suggestScope(selection), [selection]);

  const contactPrefilled = Boolean(name && email);

  const [briefing, setBriefing] = useState({
    name: name ?? "",
    email: email ?? "",
    company: company ?? "",
    message: "",
  });
  const [briefingStatus, setBriefingStatus] = useState<
    "idle" | "sending" | "sent"
  >(contactPrefilled ? "sent" : "idle");

  const [method, setMethod] = useState<PaymentMethodId>("pix");
  const [chargeStatus, setChargeStatus] = useState<
    "idle" | "processing" | "done"
  >("idle");
  const [charge, setCharge] = useState<MockChargeResult | null>(null);

  async function handleBriefingSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBriefingStatus("sending");
    await submitBriefing(briefing);
    setBriefingStatus("sent");
  }

  async function handleCharge() {
    setChargeStatus("processing");
    const result = await createMockCharge(method);
    setCharge(result);
    setChargeStatus("done");
  }

  return (
    <div className="mx-auto flex max-w-[1000px] flex-col gap-20">
      <div>
        <SectionLabel index="01" label="Escopo" />
        {hasSelection ? (
          <div className="mt-6 grid gap-6 border border-line p-6 sm:grid-cols-3 sm:p-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                Projeto
              </p>
              <p className="mt-2 font-display text-xl font-semibold">
                {selection.build}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                Nível
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-accent">
                {scope.tier}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                Escopo sugerido
              </p>
              <p className="mt-2 text-sm text-paper-dim">
                {scope.description}
              </p>
            </div>
          </div>
        ) : (
          <p className="mt-6 max-w-md text-sm leading-relaxed text-paper-dim">
            Nenhum projeto configurado ainda. Comece pelo{" "}
            <a
              href="/start-a-project"
              data-cursor-hover
              className="text-paper underline underline-offset-4"
            >
              diagnóstico
            </a>{" "}
            para gerar uma sugestão de escopo, ou envie o briefing abaixo
            diretamente.
          </p>
        )}
      </div>

      <div>
        <SectionLabel index="02" label="Briefing" />
        {briefingStatus === "sent" ? (
          <p className="mt-6 border border-line p-6 text-sm leading-relaxed text-paper-dim">
            {contactPrefilled
              ? `Briefing recebido junto do diagnóstico, ${name}. A ALUMNA responde em até 1 dia útil pelo e-mail informado.`
              : "Briefing recebido. A ALUMNA responde em até 1 dia útil pelo e-mail informado."}
          </p>
        ) : (
          <form
            onSubmit={handleBriefingSubmit}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <input
              required
              placeholder="Nome"
              value={briefing.name}
              onChange={(e) =>
                setBriefing((b) => ({ ...b, name: e.target.value }))
              }
              className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
            />
            <input
              required
              type="email"
              placeholder="E-mail"
              value={briefing.email}
              onChange={(e) =>
                setBriefing((b) => ({ ...b, email: e.target.value }))
              }
              className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
            />
            <input
              placeholder="Empresa (opcional)"
              value={briefing.company}
              onChange={(e) =>
                setBriefing((b) => ({ ...b, company: e.target.value }))
              }
              className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none sm:col-span-2"
            />
            <textarea
              placeholder="Conte sobre o projeto"
              rows={4}
              value={briefing.message}
              onChange={(e) =>
                setBriefing((b) => ({ ...b, message: e.target.value }))
              }
              className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none sm:col-span-2"
            />
            <button
              type="submit"
              disabled={briefingStatus === "sending"}
              data-cursor-hover
              className="flex items-center justify-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent disabled:opacity-50 sm:col-span-2 sm:w-fit"
            >
              {briefingStatus === "sending" ? "Enviando…" : "Enviar briefing"}
            </button>
          </form>
        )}
      </div>

      <div>
        <SectionLabel index="03" label="Pagamento" />
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-paper-dim">
          Estrutura de pagamento em preparação — nenhuma cobrança real é
          feita aqui e nenhum valor é calculado nesta etapa. Ao aprovar o
          orçamento, você recebe um link de pagamento real por e-mail ou
          WhatsApp.
        </p>

        <div className="mt-6 grid gap-px overflow-hidden bg-line sm:grid-cols-3">
          {PAYMENT_METHODS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setMethod(option.id);
                setChargeStatus("idle");
                setCharge(null);
              }}
              data-cursor-hover
              className={cn(
                "flex flex-col gap-1 bg-ink p-5 text-left transition-colors",
                method === option.id
                  ? "bg-ink-soft"
                  : "hover:bg-ink-soft/60"
              )}
            >
              <span
                className={cn(
                  "font-mono text-xs uppercase tracking-[0.2em]",
                  method === option.id ? "text-accent" : "text-paper"
                )}
              >
                {option.label}
              </span>
              <span className="text-xs text-paper-dim">
                {option.description}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 border border-line p-6 sm:p-8">
          {chargeStatus === "done" && charge ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {charge.status === "confirmed"
                  ? "Simulação confirmada"
                  : "Simulação pendente"}
              </p>
              <p className="mt-2 text-sm text-paper-dim">{charge.detail}</p>
              <p className="mt-4 font-mono text-xs text-paper-faint">
                Referência: {charge.reference}
              </p>
            </div>
          ) : (
            <>
              {method === "pix" && (
                <div className="flex items-center gap-6">
                  <div className="grid h-24 w-24 shrink-0 grid-cols-4 grid-rows-4 gap-0.5 bg-paper p-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          [1, 2, 4, 7, 9, 10, 12, 14].includes(i)
                            ? "bg-ink"
                            : "bg-transparent"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-paper-dim">
                    QR Code ilustrativo. Ao integrar um provedor PIX real, o
                    código dinâmico aparece aqui.
                  </p>
                </div>
              )}
              {method === "boleto" && (
                <div className="flex flex-col gap-3">
                  <div className="flex h-10 items-end gap-[2px]">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <span
                        key={i}
                        style={{ width: i % 3 === 0 ? 3 : 1 }}
                        className="h-full bg-paper/70"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-paper-dim">
                    Código de barras ilustrativo — o boleto real é gerado
                    após a aprovação do orçamento.
                  </p>
                </div>
              )}
              {method === "cartao" && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    disabled
                    placeholder="Número do cartão"
                    className="border border-line bg-transparent px-4 py-3 text-sm text-paper-faint"
                  />
                  <input
                    disabled
                    placeholder="Nome no cartão"
                    className="border border-line bg-transparent px-4 py-3 text-sm text-paper-faint"
                  />
                  <input
                    disabled
                    placeholder="Validade"
                    className="border border-line bg-transparent px-4 py-3 text-sm text-paper-faint"
                  />
                  <input
                    disabled
                    placeholder="CVV"
                    className="border border-line bg-transparent px-4 py-3 text-sm text-paper-faint"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleCharge}
                disabled={chargeStatus === "processing"}
                data-cursor-hover
                className="mt-6 flex items-center gap-3 bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-paper disabled:opacity-60"
              >
                {chargeStatus === "processing"
                  ? "Simulando…"
                  : "Simular confirmação →"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-line pt-10">
        <SectionLabel index="04" label="Fale direto com a ALUMNA" />
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={`mailto:${CONTACT.email}`}
            data-cursor-hover
            className="flex items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
          >
            E-mail →
          </a>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
          >
            WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
}
