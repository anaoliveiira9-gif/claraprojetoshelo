"use client";

import { useState } from "react";
import { Zap, Plus, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleSwitch } from "@/components/labs/003/toggle-switch";

type RunStatus = "success" | "warning";

type Automation = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  frequency: string;
  lastRun: string;
  lastRunStatus: RunStatus;
  nextRun: string;
  history: number[];
};

const SEED_AUTOMATIONS: Automation[] = [
  {
    id: "auto-1",
    name: "Reconciliação diária",
    description: "Concilia lançamentos financeiros com o ERP todas as manhãs às 06h00.",
    enabled: true,
    frequency: "Diária às 06h00",
    lastRun: "hoje às 06:03",
    lastRunStatus: "success",
    nextRun: "amanhã às 06h00",
    history: [1, 1, 1, 1, 0.5, 1, 1],
  },
  {
    id: "auto-2",
    name: "Alerta de processo atrasado",
    description: "Notifica o responsável quando um processo ultrapassa o prazo estipulado.",
    enabled: true,
    frequency: "Contínua — verifica a cada 15 min",
    lastRun: "há 9 min",
    lastRunStatus: "success",
    nextRun: "em 6 min",
    history: [1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: "auto-3",
    name: "Sincronização de estoque",
    description: "Atualiza níveis de estoque entre centros de distribuição a cada hora.",
    enabled: false,
    frequency: "A cada 1 hora",
    lastRun: "ontem às 18:00",
    lastRunStatus: "warning",
    nextRun: "pausada",
    history: [1, 1, 0.5, 1, 0.5, 0, 0],
  },
  {
    id: "auto-4",
    name: "Relatório semanal por e-mail",
    description: "Envia um resumo de métricas operacionais toda sexta-feira às 17h00.",
    enabled: true,
    frequency: "Semanal às sextas, 17h00",
    lastRun: "sexta-feira às 17:01",
    lastRunStatus: "success",
    nextRun: "próxima sexta às 17h00",
    history: [1, 1, 1, 1, 1, 1, 1],
  },
];

function HistorySparkline({ history, enabled }: { history: number[]; enabled: boolean }) {
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      {history.map((v, i) => (
        <span
          key={i}
          className={cn(
            "w-1 rounded-[1px]",
            !enabled
              ? "bg-[var(--orbit-border)]"
              : v === 0
                ? "bg-[var(--orbit-negative)]/50"
                : v < 1
                  ? "bg-[var(--orbit-accent)]/40"
                  : "bg-[var(--orbit-accent)]",
          )}
          style={{ height: `${6 + v * 12}px` }}
        />
      ))}
    </div>
  );
}

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
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]">
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
              className={cn(
                "flex flex-col gap-4 rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4 transition-opacity sm:flex-row sm:items-center sm:justify-between",
                !a.enabled && "opacity-70",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]"
                >
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--orbit-ink)]">{a.name}</p>
                  <p className="mt-0.5 max-w-md text-xs leading-relaxed text-[var(--orbit-secondary)]">
                    {a.description}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[var(--orbit-secondary)]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {a.frequency}
                    </span>
                    <span className="flex items-center gap-1">
                      {a.lastRunStatus === "success" ? (
                        <CheckCircle2
                          className="h-3 w-3 text-[var(--orbit-accent)]"
                          aria-label="Sucesso"
                        />
                      ) : (
                        <AlertTriangle
                          className="h-3 w-3 text-[var(--orbit-negative)]"
                          aria-label="Atenção"
                        />
                      )}
                      Última execução: {a.lastRun}
                    </span>
                    <span>Próxima: {a.nextRun}</span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4 sm:pl-4">
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <span className="text-[10px] uppercase tracking-wide text-[var(--orbit-secondary)]">
                    7 dias
                  </span>
                  <HistorySparkline history={a.history} enabled={a.enabled} />
                </div>
                <ToggleSwitch
                  checked={a.enabled}
                  onChange={(next) => toggle(a.id, next)}
                  label={`Ativar automação ${a.name}`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
