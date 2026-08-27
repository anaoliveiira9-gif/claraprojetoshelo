"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { EmailLink, WhatsappLink } from "@/components/contact-links";
import {
  BUILD_OPTIONS,
  OBJECTIVE_OPTIONS,
  FEATURE_OPTIONS,
  PRIORITY_OPTIONS,
  ADDON_OPTIONS,
  STYLE_OPTIONS,
  suggestScope,
  buildDiagnosticPayload,
  submitDiagnostic,
  type BuildOption,
  type ContactInfo,
  type ObjectiveOption,
  type FeatureOption,
  type PriorityOption,
  type AddonOption,
  type StyleOption,
  type ProjectSelection,
} from "@/lib/diagnostic";
import { getService, formatEstimate, type ServiceSlug } from "@/lib/pricing";
import {
  STEP_HINTS,
  BUILD_DESCRIPTIONS,
  OBJECTIVE_DESCRIPTIONS,
  FEATURE_DESCRIPTIONS,
  PRIORITY_DESCRIPTIONS,
  ADDON_DESCRIPTIONS,
  STYLE_DESCRIPTIONS,
} from "@/lib/configurator-copy";

const STEPS = [
  "O que vamos criar?",
  "Qual é o objetivo?",
  "O que ele precisa ter?",
  "O que é mais importante?",
  "O que você gostaria de adicionar?",
  "Como você imagina esse projeto?",
  "Dados de contato",
  "Seu projeto",
] as const;

const BUILD_ALIASES: Record<string, BuildOption> = {
  website: "Site",
  "loja-virtual": "Loja virtual",
  ecommerce: "Loja virtual",
  "e-commerce": "Loja virtual",
  app: "Aplicativo",
  sistemas: "Sistema",
  saas: "Plataforma",
  plataforma: "Plataforma",
};

function Tile({
  active,
  onClick,
  label,
  description,
  role,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  description?: string;
  /** Pass "radio" for single-select steps (e.g. style) so screen readers
   * announce this group as mutually exclusive rather than independent
   * toggles. Defaults to a plain toggle button (aria-pressed). */
  role?: "radio";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover
      role={role}
      aria-pressed={role === "radio" ? undefined : active}
      aria-checked={role === "radio" ? active : undefined}
      className={cn(
        "flex items-start justify-between gap-3 border px-5 py-4 text-left transition-colors sm:px-6 sm:py-5",
        active
          ? "border-accent bg-accent/10"
          : "border-line hover:border-paper-dim"
      )}
    >
      <span className="flex flex-col gap-1">
        <span
          className={cn(
            "font-display text-lg font-medium uppercase leading-tight tracking-tight sm:text-xl",
            active ? "text-accent" : "text-paper"
          )}
        >
          {label}
        </span>
        {description && (
          <span
            className={cn(
              "text-xs leading-snug normal-case tracking-normal",
              active ? "text-accent/70" : "text-paper-faint"
            )}
          >
            {description}
          </span>
        )}
      </span>
      <span
        className={cn(
          "mt-1 shrink-0 font-mono text-xs",
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
  const servicoParam = searchParams.get("servico");
  const focusParam = searchParams.get("focus");
  const reducedMotion = usePrefersReducedMotion();

  const initialService = useMemo(() => {
    if (!servicoParam) return undefined;
    return getService(servicoParam)?.slug as ServiceSlug | undefined;
  }, [servicoParam]);

  const initialBuilds: BuildOption[] = useMemo(() => {
    if (initialService) {
      const svc = getService(initialService);
      return svc?.buildOption ? [svc.buildOption] : [];
    }
    if (!focusParam) return [];
    const key = focusParam.toLowerCase();
    const aliased = BUILD_ALIASES[key];
    if (aliased) return [aliased];
    const match = BUILD_OPTIONS.find((option) => option.toLowerCase() === key);
    return match ? [match] : [];
  }, [initialService, focusParam]);

  const initialAddons: AddonOption[] = useMemo(() => {
    if (!initialService) return [];
    const svc = getService(initialService);
    return svc?.addonOption ? [svc.addonOption] : [];
  }, [initialService]);

  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<ProjectSelection>({
    builds: initialBuilds,
    objectives: [],
    features: [],
    priorities: [],
    addons: initialAddons,
    style: null,
    initialService,
  });
  const [contact, setContact] = useState<ContactInfo>(emptyContact);
  const [emailTouched, setEmailTouched] = useState(false);
  const contactFieldIds = useId();

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "sent"
  >("idle");

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Runs once after the initial mount, strictly before any step change
    // can occur — flips the flag so the very first heading (step 0, on
    // page load) is never auto-focused, only headings that appear as a
    // *result* of navigating are.
    isFirstRender.current = false;
  }, []);

  // Move focus to each new step's heading so keyboard/screen-reader users
  // get an announcement and a sane tab-order reset on every step change —
  // without this, focus stays on the (now hidden or relocated) Continuar/
  // Voltar button and step changes are silent to assistive tech.
  //
  // This is a callback ref, not a `useEffect(() => ref.current?.focus(),
  // [step])`, because StepShell wraps the heading in
  // AnimatePresence mode="wait": the outgoing step's DOM is kept mounted
  // for its exit animation and the incoming heading isn't inserted into
  // the DOM until that finishes, so a step-keyed effect would fire while
  // `ref.current` is still null (or still the old node) and silently do
  // nothing. A callback ref fires exactly when the new heading node is
  // actually attached, whenever that happens to be.
  const headingRef = (node: HTMLHeadingElement | null) => {
    if (node && !isFirstRender.current) {
      node.focus();
    }
  };

  const estimate = useMemo(() => suggestScope(selection), [selection]);

  const contactValid =
    contact.name.trim().length > 0 && /\S+@\S+\.\S+/.test(contact.email);

  const canAdvance =
    (step === 0 && selection.builds.length > 0) ||
    step === 1 ||
    step === 2 ||
    step === 3 ||
    step === 4 ||
    (step === 5 && selection.style !== null) ||
    (step === 6 && contactValid) ||
    step === 7;

  function toggleBuild(build: BuildOption) {
    setSelection((prev) => ({
      ...prev,
      builds: prev.builds.includes(build)
        ? prev.builds.filter((b) => b !== build)
        : [...prev.builds, build],
    }));
  }

  function toggleObjective(objective: ObjectiveOption) {
    setSelection((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(objective)
        ? prev.objectives.filter((o) => o !== objective)
        : [...prev.objectives, objective],
    }));
  }

  function toggleFeature(feature: FeatureOption) {
    setSelection((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
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

  function toggleAddon(addon: AddonOption) {
    setSelection((prev) => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter((a) => a !== addon)
        : [...prev.addons, addon],
    }));
  }

  function setStyle(style: StyleOption) {
    setSelection((prev) => ({ ...prev, style }));
  }

  async function handleSubmit() {
    setSubmitStatus("sending");
    const payload = buildDiagnosticPayload(selection, contact);
    await submitDiagnostic(payload);
    setSubmitStatus("sent");
  }

  const orcamentoQuery = new URLSearchParams({
    builds: selection.builds.join(","),
    objectives: selection.objectives.join(","),
    features: selection.features.join(","),
    priorities: selection.priorities.join(","),
    addons: selection.addons.join(","),
    style: selection.style ?? "",
    ...(selection.initialService ? { servico: selection.initialService } : {}),
    name: contact.name,
    email: contact.email,
    company: contact.company,
  }).toString();

  return (
    <div className="mx-auto max-w-[1000px]">
      <nav
        aria-label="Progresso do formulário"
        className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint"
      >
        {STEPS.map((label, i) => {
          const isCurrent = i === step;
          const isCompleted = i < step;
          const status = isCurrent
            ? "etapa atual"
            : isCompleted
              ? "concluída"
              : "ainda não disponível";
          return (
            <span key={label} className="flex items-center gap-2">
              <button
                type="button"
                data-cursor-hover
                disabled={i > step}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Etapa ${i + 1} de ${STEPS.length}: ${label} (${status})`}
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
                <span className="h-px w-4 bg-line sm:w-6" aria-hidden="true" />
              )}
            </span>
          );
        })}
      </nav>

      <div className="mt-10 min-h-[420px]">
        <StepShell step={step} reducedMotion={reducedMotion}>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-[clamp(1.8rem,5vw,3.2rem)] font-semibold uppercase leading-[1.05] tracking-tight"
          >
            {STEPS[step]}
          </h1>
          <p className="sr-only" role="status">
            Etapa {step + 1} de {STEPS.length}: {STEPS[step]}
          </p>
          {STEP_HINTS[step] && (
            <p className="mt-3 max-w-md text-sm text-paper-dim">
              {STEP_HINTS[step]}
            </p>
          )}

          <div className="mt-10">
          {step === 0 && (
            <div
              role="group"
              aria-label={STEPS[0]}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {BUILD_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  label={option}
                  description={BUILD_DESCRIPTIONS[option]}
                  active={selection.builds.includes(option)}
                  onClick={() => toggleBuild(option)}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div
              role="group"
              aria-label={STEPS[1]}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {OBJECTIVE_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  label={option}
                  description={OBJECTIVE_DESCRIPTIONS[option]}
                  active={selection.objectives.includes(option)}
                  onClick={() => toggleObjective(option)}
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div
              role="group"
              aria-label={STEPS[2]}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {FEATURE_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  label={option}
                  description={FEATURE_DESCRIPTIONS[option]}
                  active={selection.features.includes(option)}
                  onClick={() => toggleFeature(option)}
                />
              ))}
            </div>
          )}

          {step === 3 && (
            <div
              role="group"
              aria-label={STEPS[3]}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {PRIORITY_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  label={option}
                  description={PRIORITY_DESCRIPTIONS[option]}
                  active={selection.priorities.includes(option)}
                  onClick={() => togglePriority(option)}
                />
              ))}
            </div>
          )}

          {step === 4 && (
            <div
              role="group"
              aria-label={STEPS[4]}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {ADDON_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  label={option}
                  description={ADDON_DESCRIPTIONS[option]}
                  active={selection.addons.includes(option)}
                  onClick={() => toggleAddon(option)}
                />
              ))}
            </div>
          )}

          {step === 5 && (
            <div
              role="radiogroup"
              aria-label={STEPS[5]}
              className="grid gap-3 sm:grid-cols-3"
            >
              {STYLE_OPTIONS.map((option) => (
                <Tile
                  key={option}
                  role="radio"
                  label={option}
                  description={STYLE_DESCRIPTIONS[option]}
                  active={selection.style === option}
                  onClick={() => setStyle(option)}
                />
              ))}
            </div>
          )}

          {step === 6 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${contactFieldIds}-name`} className="sr-only">
                  Nome
                </label>
                <input
                  id={`${contactFieldIds}-name`}
                  required
                  autoComplete="name"
                  placeholder="Nome"
                  value={contact.name}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, name: e.target.value }))
                  }
                  data-cursor-hover
                  className="w-full border border-line bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor={`${contactFieldIds}-company`}
                  className="sr-only"
                >
                  Empresa (opcional)
                </label>
                <input
                  id={`${contactFieldIds}-company`}
                  autoComplete="organization"
                  placeholder="Empresa (opcional)"
                  value={contact.company}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, company: e.target.value }))
                  }
                  data-cursor-hover
                  className="w-full border border-line bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor={`${contactFieldIds}-email`} className="sr-only">
                  E-mail
                </label>
                <input
                  id={`${contactFieldIds}-email`}
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="E-mail"
                  value={contact.email}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, email: e.target.value }))
                  }
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={
                    emailTouched && contact.email.length > 0 && !contactValid
                  }
                  aria-describedby={
                    emailTouched && contact.email.length > 0 && !contactValid
                      ? `${contactFieldIds}-email-error`
                      : undefined
                  }
                  data-cursor-hover
                  className="w-full border border-line bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
                />
                {emailTouched &&
                  contact.email.length > 0 &&
                  !contactValid && (
                    <p
                      id={`${contactFieldIds}-email-error`}
                      role="alert"
                      className="mt-1.5 text-xs text-red-400"
                    >
                      Informe um e-mail válido.
                    </p>
                  )}
              </div>
              <div>
                <label
                  htmlFor={`${contactFieldIds}-whatsapp`}
                  className="sr-only"
                >
                  WhatsApp (opcional)
                </label>
                <input
                  id={`${contactFieldIds}-whatsapp`}
                  type="tel"
                  autoComplete="tel"
                  placeholder="WhatsApp (opcional)"
                  value={contact.whatsapp}
                  onChange={(e) =>
                    setContact((c) => ({ ...c, whatsapp: e.target.value }))
                  }
                  data-cursor-hover
                  className="w-full border border-line bg-transparent px-4 py-4 text-base text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="border border-line">
              <div className="grid gap-8 p-6 sm:grid-cols-2 sm:p-10">
                <div className="flex flex-col gap-6">
                  <SummaryRow
                    label="Projeto"
                    value={selection.builds.join(" · ") || "—"}
                    onEdit={() => setStep(0)}
                  />
                  <SummaryRow
                    label="Objetivo"
                    value={selection.objectives.join(" · ") || "—"}
                    onEdit={() => setStep(1)}
                  />
                  <SummaryRow
                    label="Recursos"
                    value={selection.features.join(" · ") || "—"}
                    onEdit={() => setStep(2)}
                  />
                  <SummaryRow
                    label="Prioridades"
                    value={selection.priorities.join(" · ") || "—"}
                    onEdit={() => setStep(3)}
                  />
                  <SummaryRow
                    label="Adicionais"
                    value={selection.addons.join(" · ") || "—"}
                    onEdit={() => setStep(4)}
                  />
                  <SummaryRow
                    label="Estilo do projeto"
                    value={selection.style ?? "—"}
                    onEdit={() => setStep(5)}
                  />
                  <SummaryRow
                    label="Contato"
                    value={[contact.name, contact.email]
                      .filter(Boolean)
                      .join(" · ")}
                    onEdit={() => setStep(6)}
                  />
                </div>

                <div className="border-t border-line pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    Estimativa de Investimento
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {formatEstimate(estimate)}
                  </p>
                  <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-paper-faint">
                    Estimativa inicial com base nas escolhas acima. O valor
                    final depende do escopo definido no briefing e da
                    complexidade técnica do projeto.
                  </p>
                </div>
              </div>

              <div
                className="border-t border-line p-6 sm:p-10"
                role="status"
                aria-live="polite"
              >
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

              <div className="border-t border-line p-6 sm:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
                  Prefere conversar diretamente?
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <WhatsappLink className="flex items-center gap-3 border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent">
                    Falar pelo WhatsApp →
                  </WhatsappLink>
                  <EmailLink className="flex items-center gap-3 border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent">
                    Enviar um e-mail →
                  </EmailLink>
                </div>
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

        {step < 7 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(7, s + 1))}
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
        aria-label={`Editar ${label}`}
        data-cursor-hover
        className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-paper-dim underline underline-offset-4 transition-colors hover:text-accent"
      >
        Editar
      </button>
    </div>
  );
}
