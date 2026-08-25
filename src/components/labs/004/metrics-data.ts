import type { ChartPoint } from "@/components/labs/004/charts/line-chart";

export const WEEKLY_THROUGHPUT: ChartPoint[] = [
  { label: "Seg", value: 412 },
  { label: "Ter", value: 468 },
  { label: "Qua", value: 441 },
  { label: "Qui", value: 503 },
  { label: "Sex", value: 552 },
  { label: "Sáb", value: 298 },
  { label: "Dom", value: 214 },
];

export const MONTHLY_THROUGHPUT: ChartPoint[] = [
  { label: "Jan", value: 8210 },
  { label: "Fev", value: 8640 },
  { label: "Mar", value: 9120 },
  { label: "Abr", value: 8890 },
  { label: "Mai", value: 9540 },
  { label: "Jun", value: 10120 },
  { label: "Jul", value: 10480 },
  { label: "Ago", value: 11020 },
];

export const QUARTERLY_THROUGHPUT: ChartPoint[] = [
  { label: "T1", value: 24980 },
  { label: "T2", value: 27310 },
  { label: "T3", value: 29640 },
  { label: "T4", value: 26800 },
];

export type Period = "7d" | "30d" | "12m";

export const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "12m", label: "12 meses" },
];

export function dataForPeriod(period: Period): ChartPoint[] {
  if (period === "7d") return WEEKLY_THROUGHPUT;
  if (period === "30d") return MONTHLY_THROUGHPUT.slice(-4);
  return MONTHLY_THROUGHPUT;
}

export const ERROR_RATE_BY_PERIOD: Record<Period, ChartPoint[]> = {
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
  "12m": QUARTERLY_THROUGHPUT.map((d, i) => ({
    label: d.label,
    value: [2.4, 1.9, 1.5, 1.1][i] ?? 1.5,
  })),
};

export const CATEGORY_BREAKDOWN = [
  { label: "Automações", value: 38, color: "#136156" },
  { label: "Processos manuais", value: 27, color: "#3E8E7E" },
  { label: "Integrações", value: 21, color: "#8FBCB2" },
  { label: "Outros", value: 14, color: "#C7D3CF" },
];
