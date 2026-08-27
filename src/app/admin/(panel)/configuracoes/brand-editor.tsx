"use client";

import { useState, useTransition } from "react";
import type { SiteContent } from "@/lib/site-content";
import { DISPLAY_FONTS, BODY_FONTS } from "@/lib/site-content";
import {
  saveBrandAndContact,
  saveTypography,
  type SaveState,
} from "@/lib/site-content-actions";

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
      />
    </label>
  );
}

export function BrandEditor({
  brand: initialBrand,
  contact: initialContact,
}: {
  brand: SiteContent["brand"];
  contact: SiteContent["contact"];
}) {
  const [brand, setBrand] = useState(initialBrand);
  const [contact, setContact] = useState(initialContact);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  function save() {
    startTransition(async () =>
      setState(await saveBrandAndContact(brand, contact))
    );
  }

  return (
    <div className="border border-line p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        Marca
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nome" value={brand.name} onChange={(v) => { setBrand((b) => ({ ...b, name: v })); setState({}); }} />
        <Field label="Complemento" value={brand.suffix} onChange={(v) => { setBrand((b) => ({ ...b, suffix: v })); setState({}); }} />
        <Field label="Razão social" value={brand.legalName} onChange={(v) => { setBrand((b) => ({ ...b, legalName: v })); setState({}); }} />
        <Field label="Fundadora" value={brand.founder} onChange={(v) => { setBrand((b) => ({ ...b, founder: v })); setState({}); }} />
        <Field
          label="Ano de fundação"
          value={String(brand.foundedYear)}
          onChange={(v) => {
            const n = Number(v.replace(/\D/g, ""));
            setBrand((b) => ({ ...b, foundedYear: Number.isFinite(n) ? n : b.foundedYear }));
            setState({});
          }}
        />
        <Field label="Cidade / base" value={brand.city} onChange={(v) => { setBrand((b) => ({ ...b, city: v })); setState({}); }} />
      </div>

      <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        Contato
      </p>
      <p className="mt-2 text-xs text-paper-faint">
        Deixe em branco para manter o estado &ldquo;em breve&rdquo; no site.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          label="E-mail"
          value={contact.email ?? ""}
          placeholder="contato@alumna.studio"
          onChange={(v) => { setContact((c) => ({ ...c, email: v || null })); setState({}); }}
        />
        <Field
          label="WhatsApp (só números, com DDI+DDD)"
          value={contact.whatsappNumber ?? ""}
          placeholder="5511999999999"
          onChange={(v) => { setContact((c) => ({ ...c, whatsappNumber: v || null })); setState({}); }}
        />
        <Field
          label="Instagram"
          value={contact.instagram ?? ""}
          placeholder="@alumna.studio"
          onChange={(v) => { setContact((c) => ({ ...c, instagram: v || null })); setState({}); }}
        />
        <Field
          label="Endereço / disponibilidade"
          value={contact.address}
          onChange={(v) => { setContact((c) => ({ ...c, address: v })); setState({}); }}
        />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          data-cursor-hover
          className="flex items-center gap-3 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {pending ? "Salvando…" : "Salvar"}
        </button>
        <span role="status" aria-live="polite">
          {state.saved && (
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              Salvo ✓
            </span>
          )}
          {state.error && <span className="text-xs text-accent">{state.error}</span>}
        </span>
      </div>
    </div>
  );
}

export function TypographyEditor({
  typography: initial,
}: {
  typography: SiteContent["typography"];
}) {
  const [typography, setTypography] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  function save() {
    startTransition(async () => setState(await saveTypography(typography)));
  }

  return (
    <div className="mt-8 border border-line p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        Tipografia
      </p>
      <p className="mt-2 max-w-md text-xs text-paper-faint">
        Fonte de título (usada em destaques e headings) e fonte de texto
        corrido, aplicadas no site inteiro.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
            Título
          </span>
          <div className="mt-3 flex flex-col gap-2">
            {(Object.keys(DISPLAY_FONTS) as (keyof typeof DISPLAY_FONTS)[]).map((key) => (
              <button
                key={key}
                type="button"
                data-cursor-hover
                onClick={() => {
                  setTypography((t) => ({ ...t, display: key }));
                  setState({});
                }}
                aria-pressed={typography.display === key}
                className={`flex items-center justify-between border px-4 py-3 text-left text-sm transition-colors ${
                  typography.display === key
                    ? "border-accent text-accent"
                    : "border-line text-paper-dim hover:border-paper-dim"
                }`}
              >
                {DISPLAY_FONTS[key].label}
                {typography.display === key && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
            Texto corrido
          </span>
          <div className="mt-3 flex flex-col gap-2">
            {(Object.keys(BODY_FONTS) as (keyof typeof BODY_FONTS)[]).map((key) => (
              <button
                key={key}
                type="button"
                data-cursor-hover
                onClick={() => {
                  setTypography((t) => ({ ...t, body: key }));
                  setState({});
                }}
                aria-pressed={typography.body === key}
                className={`flex items-center justify-between border px-4 py-3 text-left text-sm transition-colors ${
                  typography.body === key
                    ? "border-accent text-accent"
                    : "border-line text-paper-dim hover:border-paper-dim"
                }`}
              >
                {BODY_FONTS[key].label}
                {typography.body === key && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          data-cursor-hover
          className="flex items-center gap-3 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {pending ? "Salvando…" : "Salvar"}
        </button>
        <span role="status" aria-live="polite">
          {state.saved && (
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              Salvo ✓
            </span>
          )}
          {state.error && <span className="text-xs text-accent">{state.error}</span>}
        </span>
      </div>
    </div>
  );
}
