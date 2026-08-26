import type { ChartPoint } from "@/components/labs/004/charts/line-chart";

export type Period = "7d" | "30d" | "12m";

export const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "12m", label: "12 meses" },
];

export type MetricKey = "volume" | "erro" | "tempo" | "sla";

export const METRIC_OPTIONS: {
  value: MetricKey;
  label: string;
  short: string;
  color: string;
  aggregate: "sum" | "avg" | "last";
  format: (value: number) => string;
}[] = [
  {
    value: "volume",
    label: "Volume processado",
    short: "Volume",
    color: "var(--orbit-accent)",
    aggregate: "sum",
    format: (v) => Math.round(v).toLocaleString("pt-BR"),
  },
  {
    value: "erro",
    label: "Taxa de erro",
    short: "Erros",
    color: "var(--orbit-negative)",
    aggregate: "avg",
    format: (v) => `${v.toFixed(1)}%`,
  },
  {
    value: "tempo",
    label: "Tempo médio",
    short: "Tempo médio",
    color: "var(--orbit-accent)",
    aggregate: "avg",
    format: (v) => `${v.toFixed(1)}h`,
  },
  {
    value: "sla",
    label: "SLA cumprido",
    short: "SLA",
    color: "var(--orbit-accent)",
    aggregate: "avg",
    format: (v) => `${Math.round(v)}%`,
  },
];

// Every period keeps a fixed point count across all metrics (7 / 4 / 4),
// so the command chart can morph smoothly between metric and period changes.
const METRIC_SERIES: Record<MetricKey, Record<Period, ChartPoint[]>> = {
  volume: {
    "7d": [
      { label: "Seg", value: 412 },
      { label: "Ter", value: 468 },
      { label: "Qua", value: 441 },
      { label: "Qui", value: 503 },
      { label: "Sex", value: 552 },
      { label: "Sáb", value: 298 },
      { label: "Dom", value: 214 },
    ],
    "30d": [
      { label: "Sem 1", value: 2104 },
      { label: "Sem 2", value: 2356 },
      { label: "Sem 3", value: 2481 },
      { label: "Sem 4", value: 2612 },
    ],
    "12m": [
      { label: "T1", value: 24980 },
      { label: "T2", value: 27310 },
      { label: "T3", value: 29640 },
      { label: "T4", value: 31820 },
    ],
  },
  erro: {
    "7d": [
      { label: "Seg", value: 1.8 },
      { label: "Ter", value: 1.4 },
      { label: "Qua", value: 2.1 },
      { label: "Qui", value: 1.2 },
      { label: "Sex", value: 0.9 },
      { label: "Sáb", value: 1.1 },
      { label: "Dom", value: 0.7 },
    ],
    "30d": [
      { label: "Sem 1", value: 1.9 },
      { label: "Sem 2", value: 1.6 },
      { label: "Sem 3", value: 1.3 },
      { label: "Sem 4", value: 1.0 },
    ],
    "12m": [
      { label: "T1", value: 2.4 },
      { label: "T2", value: 1.9 },
      { label: "T3", value: 1.5 },
      { label: "T4", value: 1.1 },
    ],
  },
  tempo: {
    "7d": [
      { label: "Seg", value: 2.6 },
      { label: "Ter", value: 2.5 },
      { label: "Qua", value: 2.4 },
      { label: "Qui", value: 2.3 },
      { label: "Sex", value: 2.2 },
      { label: "Sáb", value: 2.6 },
      { label: "Dom", value: 2.8 },
    ],
    "30d": [
      { label: "Sem 1", value: 2.8 },
      { label: "Sem 2", value: 2.6 },
      { label: "Sem 3", value: 2.5 },
      { label: "Sem 4", value: 2.3 },
    ],
    "12m": [
      { label: "T1", value: 3.1 },
      { label: "T2", value: 2.8 },
      { label: "T3", value: 2.5 },
      { label: "T4", value: 2.3 },
    ],
  },
  sla: {
    "7d": [
      { label: "Seg", value: 94 },
      { label: "Ter", value: 95 },
      { label: "Qua", value: 93 },
      { label: "Qui", value: 96 },
      { label: "Sex", value: 97 },
      { label: "Sáb", value: 95 },
      { label: "Dom", value: 94 },
    ],
    "30d": [
      { label: "Sem 1", value: 93 },
      { label: "Sem 2", value: 94 },
      { label: "Sem 3", value: 95 },
      { label: "Sem 4", value: 96 },
    ],
    "12m": [
      { label: "T1", value: 90 },
      { label: "T2", value: 92 },
      { label: "T3", value: 94 },
      { label: "T4", value: 96 },
    ],
  },
};

export function seriesFor(metric: MetricKey, period: Period): ChartPoint[] {
  return METRIC_SERIES[metric][period];
}

export function aggregateFor(metric: MetricKey, period: Period): number {
  const opt = METRIC_OPTIONS.find((m) => m.value === metric)!;
  const points = seriesFor(metric, period);
  const values = points.map((p) => p.value);
  if (opt.aggregate === "sum") return values.reduce((a, b) => a + b, 0);
  if (opt.aggregate === "last") return values[values.length - 1];
  return values.reduce((a, b) => a + b, 0) / values.length;
}

// Kept for the dashboard's own static cards/preview — deliberately not fed
// through the period selector.
export const WEEKLY_THROUGHPUT: ChartPoint[] = METRIC_SERIES.volume["7d"];

export const CATEGORY_BREAKDOWN = [
  { label: "Automações", value: 38, color: "#136156" },
  { label: "Processos manuais", value: 27, color: "#3E8E7E" },
  { label: "Integrações", value: 21, color: "#8FBCB2" },
  { label: "Outros", value: 14, color: "#C7D3CF" },
];

export const INSIGHTS: string[] = [
  "Processos concluídos cresceram 12% esta semana — Operações e Financeiro puxam o ritmo, enquanto a taxa de erro segue no menor patamar do trimestre.",
  "O tempo médio de execução caiu 18 minutos desde o último trimestre, impulsionado pela automação de reconciliação diária.",
  "SLA cumprido chegou a 97% na sexta-feira, o melhor dia dos últimos 30.",
];
