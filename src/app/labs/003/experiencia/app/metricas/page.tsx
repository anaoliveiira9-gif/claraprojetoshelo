"use client";

import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandChart, useAnimatedValue } from "@/components/labs/003/charts/command-chart";
import { DonutChart } from "@/components/labs/003/charts/donut-chart";
import {
  PERIOD_OPTIONS,
  METRIC_OPTIONS,
  CATEGORY_BREAKDOWN,
  seriesFor,
  aggregateFor,
  type Period,
  type MetricKey,
} from "@/components/labs/003/metrics-data";

const AGGREGATE_LABEL: Record<MetricKey, string> = {
  volume: "Total no período",
  erro: "Média do período",
  tempo: "Média do período",
  sla: "Média do período",
};

export default function OrbitMetricasPage() {
  const [period, setPeriod] = useState<Period>("7d");
  const [metric, setMetric] = useState<MetricKey>("volume");

  const metricOpt = METRIC_OPTIONS.find((m) => m.value === metric)!;
  const chartData = useMemo(() => seriesFor(metric, period), [metric, period]);
  const aggregate = useMemo(() => aggregateFor(metric, period), [metric, period]);
  const displayAggregate = useAnimatedValue(aggregate);

  const first = chartData[0].value;
  const last = chartData[chartData.length - 1].value;
  const changePct = first === 0 ? 0 : ((last - first) / first) * 100;
  const positive = metric === "erro" ? changePct <= 0 : changePct >= 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--orbit-ink)]">
            Métricas
          </h1>
          <p className="mt-1 text-sm text-[var(--orbit-secondary)]">
            Indicadores operacionais detalhados por período.
          </p>
        </div>

        <div
          role="group"
          aria-label="Selecionar período"
          className="inline-flex w-fit rounded-md border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-0.5"
        >
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              data-cursor-hover
              aria-pressed={period === opt.value}
              onClick={() => setPeriod(opt.value)}
              className={cn(
                "rounded-[5px] px-3 py-1.5 text-xs font-medium transition-colors",
                period === opt.value
                  ? "bg-[var(--orbit-accent)] text-[var(--orbit-accent-ink)]"
                  : "text-[var(--orbit-secondary)] hover:text-[var(--orbit-ink)]",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div
            role="group"
            aria-label="Selecionar métrica"
            className="flex flex-wrap gap-1.5"
          >
            {METRIC_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                data-cursor-hover
                aria-pressed={metric === opt.value}
                onClick={() => setMetric(opt.value)}
                className={cn(
                  "rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors",
                  metric === opt.value
                    ? "border-[var(--orbit-accent)] bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]"
                    : "border-[var(--orbit-border)] text-[var(--orbit-secondary)] hover:border-[var(--orbit-ink)]/20 hover:text-[var(--orbit-ink)]",
                )}
              >
                {opt.short}
              </button>
            ))}
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--orbit-secondary)]">
              {AGGREGATE_LABEL[metric]}
            </p>
            <div className="mt-1 flex items-baseline gap-2 sm:justify-end">
              <span className="font-[family-name:var(--font-jetbrains)] text-2xl font-medium tabular-nums text-[var(--orbit-ink)]">
                {metricOpt.format(displayAggregate)}
              </span>
              <span
                className={cn(
                  "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-[family-name:var(--font-jetbrains)] text-xs tabular-nums",
                  positive
                    ? "bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]"
                    : "bg-[var(--orbit-negative)]/10 text-[var(--orbit-negative)]",
                )}
              >
                {positive ? (
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
                ) : (
                  <ArrowDownRight className="h-3 w-3" strokeWidth={2.25} />
                )}
                {Math.abs(changePct).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <CommandChart data={chartData} color={metricOpt.color} formatValue={metricOpt.format} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
          <h2 className="mb-3 text-sm font-semibold text-[var(--orbit-ink)]">
            Origem do volume
          </h2>
          <DonutChart data={CATEGORY_BREAKDOWN} />
        </div>

        <div className="flex flex-col justify-center gap-2 rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
          <h2 className="text-sm font-semibold text-[var(--orbit-ink)]">Leitura do período</h2>
          <p className="text-sm leading-relaxed text-[var(--orbit-secondary)]">
            {metric === "volume" &&
              "O volume processado acompanha o ritmo semanal, com pico às sextas-feiras e queda natural no fim de semana — sem sinais de fila acumulada."}
            {metric === "erro" &&
              "A taxa de erro vem em trajetória de queda consistente, refletindo o amadurecimento das automações de reconciliação e validação de dados."}
            {metric === "tempo" &&
              "O tempo médio de execução encolheu período a período, puxado pela automação de tarefas antes feitas manualmente pelas áreas de Financeiro e TI."}
            {metric === "sla" &&
              "O SLA cumprido segue acima da meta interna de 92%, com melhora mais visível nos últimos dois trimestres."}
          </p>
        </div>
      </div>
    </div>
  );
}
