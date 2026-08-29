import { KpiCard } from "@/components/labs/003/kpi-card";
import { LineChart } from "@/components/labs/003/charts/line-chart";
import { BarChart } from "@/components/labs/003/charts/bar-chart";
import { WEEKLY_THROUGHPUT, CATEGORY_BREAKDOWN, INSIGHTS } from "@/components/labs/003/metrics-data";
import { DonutChart } from "@/components/labs/003/charts/donut-chart";
import { InsightBanner } from "@/components/labs/003/insight-banner";
import { ActivityFeed } from "@/components/labs/003/activity-feed";

export default function OrbitDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--orbit-ink)]">
          Visão geral
        </h1>
        <p className="mt-1 text-sm text-[var(--orbit-secondary)]">
          Resumo das operações da última semana.
        </p>
      </div>

      <InsightBanner text={INSIGHTS[0]} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Processos ativos"
          value="312"
          delta="4,8%"
          trend="up"
          caption="vs. semana anterior"
        />
        <KpiCard
          label="Taxa de conclusão"
          value="91,2"
          unit="%"
          delta="1,3%"
          trend="up"
          caption="vs. semana anterior"
        />
        <KpiCard
          label="Tempo médio"
          value="2,4"
          unit="h"
          delta="0,6%"
          trend="down"
          caption="vs. semana anterior"
        />
        <KpiCard
          label="Automações ativas"
          value="18"
          delta="2"
          trend="up"
          caption="novas este mês"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4 xl:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--orbit-ink)]">
              Volume processado — 7 dias
            </h2>
            <span className="font-[family-name:var(--font-jetbrains)] text-xs tabular-nums text-[var(--orbit-secondary)]">
              total 2.888
            </span>
          </div>
          <LineChart data={WEEKLY_THROUGHPUT} />
        </div>

        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
          <h2 className="mb-3 text-sm font-semibold text-[var(--orbit-ink)]">
            Distribuição por tipo
          </h2>
          <DonutChart data={CATEGORY_BREAKDOWN} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4 xl:col-span-2">
          <h2 className="mb-2 text-sm font-semibold text-[var(--orbit-ink)]">
            Processos concluídos por dia
          </h2>
          <BarChart
            data={WEEKLY_THROUGHPUT.map((d) => ({ ...d, value: Math.round(d.value * 0.72) }))}
          />
        </div>

        <ActivityFeed />
      </div>
    </div>
  );
}
