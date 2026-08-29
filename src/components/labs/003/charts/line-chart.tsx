export type ChartPoint = { label: string; value: number };

const WIDTH = 640;
const HEIGHT = 220;
const PAD_X = 24;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

export function LineChart({
  data,
  color = "var(--orbit-accent)",
  formatValue = (v: number) => String(v),
}: {
  data: ChartPoint[];
  color?: string;
  formatValue?: (value: number) => string;
}) {
  if (data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const range = max - min || 1;
  const innerW = WIDTH - PAD_X * 2;
  const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const points = data.map((d, i) => {
    const x = PAD_X + (i / Math.max(1, data.length - 1)) * innerW;
    const y = PAD_TOP + innerH - ((d.value - min) / range) * innerH;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");

  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(2)},${(PAD_TOP + innerH).toFixed(2)} L${points[0].x.toFixed(2)},${(PAD_TOP + innerH).toFixed(2)} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) => PAD_TOP + innerH * t);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full"
      role="img"
      aria-label="Gráfico de linha"
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
      <path d={areaPath} fill={color} opacity={0.08} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5} fill={color}>
          <title>{`${p.label}: ${formatValue(p.value)}`}</title>
        </circle>
      ))}
      {points.map((p, i) =>
        i % Math.ceil(points.length / 8) === 0 || i === points.length - 1 ? (
          <text
            key={`label-${i}`}
            x={p.x}
            y={HEIGHT - 8}
            textAnchor="middle"
            className="fill-[var(--orbit-secondary)]"
            fontSize={10}
          >
            {p.label}
          </text>
        ) : null,
      )}
    </svg>
  );
}
