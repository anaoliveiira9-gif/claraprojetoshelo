"use client";

import { useState, useTransition } from "react";
import type { SiteContent } from "@/lib/site-content";
import { saveFaq, type SaveState } from "@/lib/site-content-actions";

type FaqItem = SiteContent["faq"][number];

export function FaqEditor({ initial }: { initial: SiteContent["faq"] }) {
  const [items, setItems] = useState<FaqItem[]>(initial);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<SaveState>({});

  function update(i: number, field: keyof FaqItem, value: string) {
    setItems((cur) => {
      const next = [...cur];
      next[i] = { ...next[i], [field]: value };
      return next;
    });
    setState({});
  }

  function remove(i: number) {
    setItems((cur) => cur.filter((_, idx) => idx !== i));
    setState({});
  }

  function move(i: number, dir: -1 | 1) {
    setItems((cur) => {
      const j = i + dir;
      if (j < 0 || j >= cur.length) return cur;
      const next = [...cur];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setState({});
  }

  function addItem() {
    setItems((cur) => [...cur, { question: "", answer: "" }]);
    setState({});
  }

  function handleSave() {
    startTransition(async () => setState(await saveFaq(items)));
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {items.map((item, i) => (
          <fieldset key={i} className="border border-line p-5">
            <legend className="sr-only">Pergunta {i + 1}</legend>
            <div className="flex items-start justify-between gap-4">
              <span aria-hidden="true" className="pt-3 font-mono text-xs text-paper-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-3">
                <label className="flex flex-col gap-2">
                  <span className="sr-only">Pergunta {i + 1}</span>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => update(i, "question", e.target.value)}
                    placeholder="Pergunta"
                    className="border border-line bg-transparent px-4 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="sr-only">Resposta {i + 1}</span>
                  <textarea
                    value={item.answer}
                    onChange={(e) => update(i, "answer", e.target.value)}
                    placeholder="Resposta"
                    rows={2}
                    className="border border-line bg-transparent px-4 py-2.5 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
                  />
                </label>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label={`Mover pergunta ${i + 1} para cima`}
                  className="font-mono text-xs text-paper-faint transition-colors hover:text-paper disabled:opacity-20"
                >
                  <span aria-hidden="true">↑</span>
                </button>
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label={`Mover pergunta ${i + 1} para baixo`}
                  className="font-mono text-xs text-paper-faint transition-colors hover:text-paper disabled:opacity-20"
                >
                  <span aria-hidden="true">↓</span>
                </button>
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => remove(i)}
                  aria-label={`Remover pergunta ${i + 1}`}
                  className="font-mono text-xs text-paper-faint transition-colors hover:text-accent"
                >
                  <span aria-hidden="true">✕</span>
                </button>
              </div>
            </div>
          </fieldset>
        ))}
      </div>

      <button
        type="button"
        data-cursor-hover
        onClick={addItem}
        className="mt-6 flex items-center gap-3 border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.25em] text-paper-dim transition-colors hover:border-paper hover:text-paper"
      >
        + Adicionar pergunta
      </button>

      <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
        <button
          type="button"
          onClick={handleSave}
          disabled={pending}
          data-cursor-hover
          className="flex items-center gap-3 bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-paper disabled:opacity-50"
        >
          {pending ? "Salvando…" : "Salvar FAQ"}
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
