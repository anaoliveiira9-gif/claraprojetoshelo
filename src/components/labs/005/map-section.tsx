import type { Property } from "./data";

const SIZE = 320;

export function MapSection({ property }: { property: Property }) {
  const pinX = 40 + property.seed * (SIZE - 80);
  const pinY = 40 + ((property.seed * 37) % 1) * (SIZE - 80) * 0.6 + 40;

  const streets = Array.from({ length: 6 }, (_, i) => ({
    horizontal: i % 2 === 0,
    offset: (i / 6) * SIZE,
  }));

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE * 0.6}`}
      className="h-full w-full"
      aria-hidden="true"
      role="img"
    >
      <rect x={0} y={0} width={SIZE} height={SIZE * 0.6} fill="#EFEAE3" />
      {streets.map((s, i) =>
        s.horizontal ? (
          <line
            key={i}
            x1={0}
            y1={s.offset * 0.6}
            x2={SIZE}
            y2={s.offset * 0.6}
            stroke="#DDD5C8"
            strokeWidth={2}
          />
        ) : (
          <line
            key={i}
            x1={s.offset}
            y1={0}
            x2={s.offset}
            y2={SIZE * 0.6}
            stroke="#DDD5C8"
            strokeWidth={2}
          />
        ),
      )}
      <circle cx={pinX} cy={pinY} r={30} fill="#2F4A3B" opacity={0.08} />
      <path
        d={`M ${pinX} ${pinY - 16} c -8 0 -14 6 -14 14 c 0 10 14 24 14 24 s 14 -14 14 -24 c 0 -8 -6 -14 -14 -14 z`}
        fill="#2F4A3B"
      />
      <circle cx={pinX} cy={pinY - 3} r={4} fill="#F8F5F0" />
      <text
        x={pinX}
        y={pinY + 30}
        textAnchor="middle"
        fontSize={9}
        className="fill-[#241E1A]"
      >
        {property.bairro}
      </text>
    </svg>
  );
}
