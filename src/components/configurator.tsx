"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import {
  BUILD_OPTIONS,
  NEED_OPTIONS,
  PRIORITY_OPTIONS,
  suggestScope,
  buildDiagnosticPayload,
  submitDiagnostic,
  type BuildOption,
  type ContactInfo,
  type NeedOption,
  type PriorityOption,
  type ProjectSelection,
} from "@/lib/diagnostic";

const STEPS = [
  "O que vamos criar?",
  "O que precisa acontecer?",
  "O que é prioridade?",
  "Dados de contato",
  "Seu projeto",
] as const;

const BUILD_ALIASES: Record<string, BuildOption> = {
  website: "Site",
  sistemas: "Sistema",
};

function Tile({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover
      aria-pressed={active}
      className={cn(
        "flex items-center justify-between gap-3 border px-6 py-5 text-left font-display text-xl font-medium uppercase tracking-tight transition-colors sm:text-2xl",
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-line text-paper hover:border-paper-dim"
      )}
    >
      {children}
      <span
        className={cn(
          "font-mono text-xs",
          active ? "text-accent" : "text-paper-faint"
        )}
      >
        {active ? "✓" : "→"}
      </span>
    </button>
  );
}

function StepShell({
  step,
  children,
  reducedMotion,
}: {
  step: number;
  children: React.ReactNode;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return <div>{children}</div>;
  }
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const emptyContact: ContactInfo = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
};

export function Configurator() {
  const searchParams = useSearchParams();
  const focusParam = searchParams.get("focus");
  const reducedMotion = usePrefersReducedMotion();

  const initialBuild: BuildOption | null = useMemo(() => {
    if (!focusParam) return null;
    const key = focusParam.toLowerCase();
    const aliased = BUILD_ALIASES[key];
    if (aliased) return aliased;
    const match = BUILD_OPTIONS.find((option) => option.toLowerCase() === key);
    return match ?? null;
  }, [focusParam]);

  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<ProjectSelection>({
    build: initialBuild,
    needs: [],
    priorities: [],
  });
  const [contact, setContact] = useState<ContactInfo>(emptyContact);

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "sent"
  >("idle");

  const scope = useMemo(() => suggestScope(selection), [selection]);

  const contactValid =
    contact.name.trim().length > 0 && /\S+@\S+\.\S+/.test(contact.email);

  const canAdvance =
    (step === 0 && selection.build !== null) ||
    (step === 1 && selection.needs.length > 0) ||
    (step === 2 && selection.priorities.length > 0) ||
    (step === 3 && contactValid) ||
    step === 4;

  function toggleNeed(need: NeedOption) {
    setSelection((prev) => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter((n) => n !== need)
        : [...prev.needs, need],
    }));
  }

  function togglePriority(priority: PriorityOption) {
    setSelection((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter((p) => p !== priority)
        : [...prev.priorities, priority],
    }));
  }

  async function handleSubmit() {
    setSubmitStatus("sending");
    const payload = buildDiagnosticPayload(selection, contact);
    await submitDiagnostic(payload);
    setSubmitStatus("sent");
  }

  const orcamentoQuery = new URLSearchParams({
    build: selection.build ?? "",
    needs: selection.needs.join(","),
    priorities: selection.priorities.join(","),
    name: contact.name,
    email: contact.email,
    company: contact.company,
  }).toString();

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        {STEPS.map((label, i) => (
          <span key={label} className="flex items-center gap-2">
            <button
              type="button"
              data-cursor-hover
              disabled={i > step}
              onClick={() => i < step && setStep(i)}
              className={cn(
                "transition-colors",
                i <= step ? "text-accent" : "text-paper-faint",
                i < step && "hover:text-paper"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
            {i < STEPS.length - 1 && (
              <span className="h-px w-6 bg-line sm:w-10" />
            )}
          </span>
        ))}
      </div>

      <div className="mt-10 min-h-[420px]">
        <StepShell step={step} reducedMotion={reducedMotion}>
          <h1 className="font-display text-[clamp(1.8rem,5vw,3.2rem)] font-semibold uppercase leading-[1.05] tracking-tight">
            {STEPS[step]}
          </h1>

          <div className="mt-10">
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {BUILD_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  active={selection.build === option}
                  onClick={() =>
                    setSelection((prev) => ({ ...prev, build: option }))
                  }
                >
                  {option}
                </Tile>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {NEED_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  active={selection.needs.includes(option)}
                  onClick={() => toggleNeed(option)}
                >
                  {option}
                </Tile>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {PRIORITY_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  active={selection.priorities.includes(option)}
                  onClick={() => togglePriority(option)}
                >
                  {option}
                </Tile>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Nome"
                value={contact.name}
                onChange={(e) =>
                  setContact((c) => ({ ...c, name: e.target.value }))
                }
                data-cursor-hover
                className="border border-line bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
              />
              <input
                placeholder="Empresa (opcional)"
                value={contact.company}
                onChange={(e) =>
                  setContact((c) => ({ ...c, company: e.target.value }))
                }
                data-cursor-hover
                className="border border-line bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
              />
              <input
                required
                type="email"
                placeholder="E-mail"
                value={contact.email}
                onChange={(e) =>
                  setContact((c) => ({ ...c, email: e.target.value }))
                }
                data-cursor-hover
                className="border border-line bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
              />
              <input
                placeholder="WhatsApp (opcional)"
                value={contact.whatsapp}
                onChange={(e) =>
                  setContact((c) => ({ ...c, whatsapp: e.target.value }))
                }
                data-cursor-hover
                className="border border-line bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
              />
            </div>
          )}

          {step === 4 && (
            <div className="border border-line">
              <div className="grid gap-8 p-6 sm:grid-cols-2 sm:p-10">
                <div className="flex flex-col gap-6">
                  <SummaryRow
                    label="Projeto"
                    value={selection.build ?? "—"}
                    onEdit={() => setStep(0)}
                  />
                  <SummaryRow
                    label="Necessidades"
                    value={selection.needs.join(" · ") || "—"}
                    onEdit={() => setStep(1)}
                  />
                  <SummaryRow
                    label="Prioridades"
                    value={selection.priorities.join(" · ") || "—"}
                    onEdit={() => setStep(2)}
                  />
                  <SummaryRow
                    label="Contato"
                    value={[contact.name, contact.email]
                      .filter(Boolean)
                      .join(" · ")}
                    onEdit={() => setStep(3)}
                  />
                </div>

                <div className="border-t border-line pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    Escopo sugerido — {scope.tier}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                    {scope.description}
                  </p>
                  <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-paper-faint">
                    Valor e prazo são definidos pela equipe após a análise
                    deste diagnóstico — nada é calculado automaticamente
                    aqui.
                  </p>
                </div>
              </div>

              <div className="border-t border-line p-6 sm:p-10">
                {submitStatus === "sent" ? (
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                      Diagnóstico enviado
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                      Recebemos suas respostas. A ALUMNA responde em até 1
                      dia útil pelo e-mail informado.
                    </p>
                    <Link
                      href={`/orcamento?${orcamentoQuery}`}
                      data-cursor-hover
                      className="mt-6 inline-flex items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent"
                    >
                      Ver simulação de pagamento →
                    </Link>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!contactValid || submitStatus === "sending"}
                    data-cursor-hover
                    className="flex w-full items-center justify-center gap-3 bg-accent px-6 py-5 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-paper disabled:opacity-50 sm:w-fit"
                  >
                    {submitStatus === "sending"
                      ? "Enviando…"
                      : "Enviar diagnóstico →"}
                  </button>
                )}
              </div>
            </div>
          )}
          </div>
        </StepShell>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          data-cursor-hover
          className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim transition-colors hover:text-paper disabled:opacity-0"
        >
          ← Voltar
        </button>

        {step < 4 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(4, s + 1))}
            disabled={!canAdvance}
            data-cursor-hover
            className="flex items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
          >
            Continuar →
          </button>
        )}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
          {label}
        </p>
        <p className="mt-1.5 font-display text-lg font-medium">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        data-cursor-hover
        className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-paper-dim underline underline-offset-4 transition-colors hover:text-accent"
      >
        Editar
      </button>
    </div>
  );
}
