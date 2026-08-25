"use client";

import { useState } from "react";
import { Zap, Plus } from "lucide-react";
import { ToggleSwitch } from "@/components/labs/004/toggle-switch";

type Automation = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

const SEED_AUTOMATIONS: Automation[] = [
  {
    id: "auto-1",
    name: "Reconciliação diária",
    description: "Concilia lançamentos financeiros com o ERP todas as manhãs às 06h00.",
    enabled: true,
  },
  {
    id: "auto-2",
    name: "Alerta de processo atrasado",
    description: "Notifica o responsável quando um processo ultrapassa o prazo estipulado.",
    enabled: true,
  },
  {
    id: "auto-3",
    name: "Sincronização de estoque",
    description: "Atualiza níveis de estoque entre centros de distribuição a cada hora.",
    enabled: false,
  },
  {
    id: "auto-4",
    name: "Relatório semanal por e-mail",
    description: "Envia um resumo de métricas operacionais toda sexta-feira às 17h00.",
    enabled: true,
  },
];

export default function OrbitAutomacoesPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);

  function handleCreate() {
    setAutomations(SEED_AUTOMATIONS);
  }

  function toggle(id: string, next: boolean) {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: next } : a)),
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--orbit-ink)]">
            Automações
          </h1>
          <p className="mt-1 text-sm text-[var(--orbit-secondary)]">
            Regras que executam ações operacionais sem intervenção manual.
          </p>
        </div>
        {automations.length > 0 ? (
          <button
            type="button"
            data-cursor-hover
            onClick={handleCreate}
            className="flex items-center gap-1.5 rounded-md bg-[var(--orbit-accent)] px-3 py-2 text-xs font-medium text-[var(--orbit-accent-ink)] transition-opacity hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" />
            Criar automação
          </button>
        ) : null}
      </div>

      {automations.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[var(--orbit-border)] bg-[var(--orbit-surface)] px-6 py-16 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]">
            <Zap className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-[var(--orbit-ink)]">
              Nenhuma automação criada
            </h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-[var(--orbit-secondary)]">
              Configure regras para executar tarefas repetitivas automaticamente e liberar
              tempo do seu time.
            </p>
          </div>
          <button
            type="button"
            data-cursor-hover
            onClick={handleCreate}
            className="mt-2 flex items-center gap-1.5 rounded-md bg-[var(--orbit-accent)] px-3.5 py-2 text-sm font-medium text-[var(--orbit-accent-ink)] transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Criar automação
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {automations.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]">
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--orbit-ink)]">{a.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--orbit-secondary)]">
                    {a.description}
                  </p>
                </div>
              </div>
              <ToggleSwitch
                checked={a.enabled}
                onChange={(next) => toggle(a.id, next)}
                label={`Ativar automação ${a.name}`}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
