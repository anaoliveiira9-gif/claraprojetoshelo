export type DonutSlice = { label: string; value: number; color: string };

const SIZE = 200;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DonutChart({ data }: { data: DonutSlice[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  const slices = data.reduce<
    Array<DonutSlice & { fraction: number; dash: number; offset: number }>
  >((acc, slice) => {
    const fraction = slice.value / total;
    const dash = fraction * CIRCUMFERENCE;
    const offset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
    return [...acc, { ...slice, fraction, dash, offset }];
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-[160px] w-[160px] shrink-0 -rotate-90"
        role="img"
        aria-label="Distribuição por categoria"
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--orbit-border)"
          strokeWidth={STROKE}
        />
        {slices.map((slice, i) => (
          <circle
            key={i}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={slice.color}
            strokeWidth={STROKE}
            strokeDasharray={`${slice.dash} ${CIRCUMFERENCE - slice.dash}`}
            strokeDashoffset={-slice.offset}
          >
            <title>
              {slice.label}: {Math.round(slice.fraction * 100)}%
            </title>
          </circle>
        ))}
      </svg>
      <ul className="flex flex-col gap-2">
        {data.map((slice, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-[var(--orbit-ink)]">{slice.label}</span>
            <span className="font-[family-name:var(--font-jetbrains)] tabular-nums text-[var(--orbit-secondary)]">
              {Math.round((slice.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
