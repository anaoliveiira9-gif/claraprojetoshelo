"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LineChart } from "@/components/labs/004/charts/line-chart";
import { BarChart } from "@/components/labs/004/charts/bar-chart";
import { DonutChart } from "@/components/labs/004/charts/donut-chart";
import {
  PERIOD_OPTIONS,
  CATEGORY_BREAKDOWN,
  dataForPeriod,
  ERROR_RATE_BY_PERIOD,
  type Period,
} from "@/components/labs/004/metrics-data";

export default function OrbitMetricasPage() {
  const [period, setPeriod] = useState<Period>("7d");

  const throughput = dataForPeriod(period);
  const errorRate = ERROR_RATE_BY_PERIOD[period];

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
        <h2 className="mb-2 text-sm font-semibold text-[var(--orbit-ink)]">
          Volume processado
        </h2>
        <LineChart
          data={throughput}
          formatValue={(v) => v.toLocaleString("pt-BR")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
          <h2 className="mb-2 text-sm font-semibold text-[var(--orbit-ink)]">
            Taxa de erro (%)
          </h2>
          <BarChart
            data={errorRate}
            color="var(--orbit-negative)"
            formatValue={(v) => `${v.toFixed(1)}%`}
          />
        </div>

        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
          <h2 className="mb-3 text-sm font-semibold text-[var(--orbit-ink)]">
            Origem do volume
          </h2>
          <DonutChart data={CATEGORY_BREAKDOWN} />
        </div>
      </div>
    </div>
  );
}
