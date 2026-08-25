export type ChartPoint = { label: string; value: number };

const WIDTH = 640;
const HEIGHT = 220;
const PAD_X = 24;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

export function BarChart({
  data,
  color = "var(--orbit-accent)",
  formatValue = (v: number) => String(v),
}: {
  data: ChartPoint[];
  color?: string;
  formatValue?: (value: number) => string;
}) {
  if (data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value), 1);
  const innerW = WIDTH - PAD_X * 2;
  const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const gap = 8;
  const barW = Math.max(4, innerW / data.length - gap);

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => PAD_TOP + innerH * t);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full"
      role="img"
      aria-label="Gráfico de barras"
    >
      {gridLines.map((y, i) => (
        <line
          key={i}
          x1={PAD_X}
          x2={WIDTH - PAD_X}
          y1={y}
          y2={y}
          stroke="var(--orbit-border)"
          strokeWidth={1}
        />
      ))}
      {data.map((d, i) => {
        const h = (d.value / max) * innerH;
        const x = PAD_X + i * (barW + gap);
        const y = PAD_TOP + innerH - h;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={Math.max(h, 1)}
              rx={2}
              fill={color}
              opacity={0.85}
            >
              <title>
                {d.label}: {formatValue(d.value)}
              </title>
            </rect>
            <text
              x={x + barW / 2}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-[var(--orbit-secondary)]"
              fontSize={10}
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
