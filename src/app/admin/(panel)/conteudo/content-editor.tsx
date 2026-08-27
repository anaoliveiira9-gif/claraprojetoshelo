"use client";

import { useState, useTransition } from "react";
import type { SiteContent } from "@/lib/site-content";
import {
  saveHero,
  saveLabsSection,
  saveHowWeWork,
  saveServicesSection,
  saveStudio,
  saveFinalCta,
  type SaveState,
} from "@/lib/site-content-actions";

function Field({
  label,
  value,
  onChange,
  multiline,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
        />
      )}
    </label>
  );
}

function SaveBar({
  pending,
  state,
  onSave,
}: {
  pending: boolean;
  state: SaveState;
  onSave: () => void;
}) {
  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        type="button"
        onClick={onSave}
        disabled={pending}
        data-cursor-hover
        className="flex items-center gap-3 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {pending ? "Salvando…" : "Salvar"}
      </button>
      {state.saved && (
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
          Salvo ✓
        </span>
      )}
      {state.error && (
        <span className="text-xs text-accent">{state.error}</span>
      )}
    </div>
  );
}

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-line p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        {title}
      </p>
      {hint && <p className="mt-2 text-xs text-paper-faint">{hint}</p>}
      <div className="mt-6 flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function ContentEditor({ initial }: { initial: SiteContent }) {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard initial={initial.hero} />
      <LabsSectionCard initial={initial.labsSection} />
      <HowWeWorkCard initial={initial.howWeWork} />
      <ServicesSectionCard initial={initial.servicesSection} />
      <StudioCard initial={initial.studio} />
      <FinalCtaCard initial={initial.finalCta} />
    </div>
  );
}

function HeroCard({ initial }: { initial: SiteContent["hero"] }) {
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  function set<K extends keyof typeof value>(key: K, v: (typeof value)[K]) {
    setValue((cur) => ({ ...cur, [key]: v }));
    setState({});
  }

  return (
    <Card title="Home — Apresentação (Hero)">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Selo superior esquerdo" value={value.eyebrow} onChange={(v) => set("eyebrow", v)} />
        <Field label="Coordenadas (topo direito)" value={value.coordinates} onChange={(v) => set("coordinates", v)} />
        <Field label="Título — linha 1" value={value.titleLine1} onChange={(v) => set("titleLine1", v)} />
        <Field label="Título — linha 2" value={value.titleLine2} onChange={(v) => set("titleLine2", v)} />
      </div>
      <Field label="Frase de destaque" value={value.lead} onChange={(v) => set("lead", v)} multiline />
      <Field label="Descrição" value={value.description} onChange={(v) => set("description", v)} multiline />
      <Field label="Texto do botão" value={value.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
      <SaveBar
        pending={pending}
        state={state}
        onSave={() =>
          startTransition(async () => setState(await saveHero(value)))
        }
      />
    </Card>
  );
}

function LabsSectionCard({ initial }: { initial: SiteContent["labsSection"] }) {
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  return (
    <Card
      title="Home — Labs (introdução)"
      hint="Os 6 LABs em si (conteúdo, telas, interações) não são editáveis por aqui ainda — só o texto de abertura da seção."
    >
      <Field
        label="Título da seção"
        value={value.label}
        onChange={(v) => {
          setValue((c) => ({ ...c, label: v }));
          setState({});
        }}
      />
      <Field
        label="Descrição"
        value={value.description}
        onChange={(v) => {
          setValue((c) => ({ ...c, description: v }));
          setState({});
        }}
        multiline
      />
      <SaveBar
        pending={pending}
        state={state}
        onSave={() =>
          startTransition(async () => setState(await saveLabsSection(value)))
        }
      />
    </Card>
  );
}

function HowWeWorkCard({ initial }: { initial: SiteContent["howWeWork"] }) {
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  function setStep(i: number, field: "title" | "description", v: string) {
    setValue((cur) => {
      const steps = [...cur.steps];
      steps[i] = { ...steps[i], [field]: v };
      return { ...cur, steps };
    });
    setState({});
  }

  return (
    <Card
      title="Home — Como Construímos"
      hint="As 5 etapas são fixas (cada uma tem sua própria ilustração) — dá para editar o título e o texto de cada uma, não adicionar ou remover."
    >
      <Field
        label="Título da seção"
        value={value.label}
        onChange={(v) => {
          setValue((c) => ({ ...c, label: v }));
          setState({});
        }}
      />
      <Field
        label="Descrição"
        value={value.description}
        onChange={(v) => {
          setValue((c) => ({ ...c, description: v }));
          setState({});
        }}
        multiline
      />
      <div className="mt-2 flex flex-col gap-5 border-t border-line pt-5">
        {value.steps.map((step, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-[auto_1fr_2fr] sm:items-start">
            <span className="pt-3 font-mono text-xs text-paper-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Field
              label="Título"
              value={step.title}
              onChange={(v) => setStep(i, "title", v)}
            />
            <Field
              label="Descrição"
              value={step.description}
              onChange={(v) => setStep(i, "description", v)}
            />
          </div>
        ))}
      </div>
      <SaveBar
        pending={pending}
        state={state}
        onSave={() =>
          startTransition(async () => setState(await saveHowWeWork(value)))
        }
      />
    </Card>
  );
}

function ServicesSectionCard({
  initial,
}: {
  initial: SiteContent["servicesSection"];
}) {
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  function setItem(i: number, field: "name" | "description", v: string) {
    setValue((cur) => {
      const items = [...cur.items];
      items[i] = { ...items[i], [field]: v };
      return { ...cur, items };
    });
    setState({});
  }

  return (
    <Card
      title="Home — Serviços (lista de destaque)"
      hint="Essa é a lista curta mostrada na home. Preços e o catálogo completo continuam em /servicos — ainda não editáveis por aqui."
    >
      <Field
        label="Título da seção"
        value={value.label}
        onChange={(v) => {
          setValue((c) => ({ ...c, label: v }));
          setState({});
        }}
      />
      <div className="mt-2 flex flex-col gap-5 border-t border-line pt-5">
        {value.items.map((item, i) => (
          <div key={item.slug} className="grid gap-3 sm:grid-cols-2">
            <Field label="Nome" value={item.name} onChange={(v) => setItem(i, "name", v)} />
            <Field
              label="Descrição"
              value={item.description}
              onChange={(v) => setItem(i, "description", v)}
            />
          </div>
        ))}
      </div>
      <SaveBar
        pending={pending}
        state={state}
        onSave={() =>
          startTransition(async () => setState(await saveServicesSection(value)))
        }
      />
    </Card>
  );
}

function StudioCard({ initial }: { initial: SiteContent["studio"] }) {
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  function setFact(i: number, field: "label" | "value", v: string) {
    setValue((cur) => {
      const facts = [...cur.facts];
      facts[i] = { ...facts[i], [field]: v };
      return { ...cur, facts };
    });
    setState({});
  }

  return (
    <Card title="Home — Estúdio">
      <Field
        label="Título da seção"
        value={value.label}
        onChange={(v) => {
          setValue((c) => ({ ...c, label: v }));
          setState({});
        }}
      />
      <Field
        label="Parágrafo"
        value={value.paragraph}
        onChange={(v) => {
          setValue((c) => ({ ...c, paragraph: v }));
          setState({});
        }}
        multiline
        rows={4}
      />
      <div className="mt-2 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
        {value.facts.map((fact, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field label="Rótulo" value={fact.label} onChange={(v) => setFact(i, "label", v)} />
            <Field label="Valor" value={fact.value} onChange={(v) => setFact(i, "value", v)} />
          </div>
        ))}
      </div>
      <SaveBar
        pending={pending}
        state={state}
        onSave={() =>
          startTransition(async () => setState(await saveStudio(value)))
        }
      />
    </Card>
  );
}

function FinalCtaCard({ initial }: { initial: SiteContent["finalCta"] }) {
  const [value, setValue] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  function set<K extends keyof typeof value>(key: K, v: (typeof value)[K]) {
    setValue((cur) => ({ ...cur, [key]: v }));
    setState({});
  }

  return (
    <Card title="Home — Encerramento">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Título — linha 1" value={value.headlineLine1} onChange={(v) => set("headlineLine1", v)} />
        <Field label="Título — linha 2" value={value.headlineLine2} onChange={(v) => set("headlineLine2", v)} />
      </div>
      <Field label="Texto do botão" value={value.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
      <SaveBar
        pending={pending}
        state={state}
        onSave={() =>
          startTransition(async () => setState(await saveFinalCta(value)))
        }
      />
    </Card>
  );
}
