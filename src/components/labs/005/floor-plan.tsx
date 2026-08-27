import type { Property } from "./data";

const WIDTH = 320;
const HEIGHT = 220;
const PAD = 12;

export function FloorPlan({ property }: { property: Property }) {
  if (property.tipo === "Terreno") {
    return (
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-full w-full"
        role="img"
        aria-label={`Planta esquemática: terreno de ${property.area} m².`}
      >
        <rect
          x={PAD}
          y={PAD}
          width={WIDTH - PAD * 2}
          height={HEIGHT - PAD * 2}
          fill="none"
          stroke="#241E1A"
          strokeWidth={1.2}
          strokeDasharray="4 3"
        />
        <text
          x={WIDTH / 2}
          y={HEIGHT / 2}
          textAnchor="middle"
          className="fill-[#6B6157]"
          fontSize={11}
        >
          Terreno {property.area} m²
        </text>
      </svg>
    );
  }

  const rooms = [
    "Sala de estar",
    "Cozinha",
    ...Array.from({ length: property.quartos }, (_, i) =>
      i === 0 ? "Suíte master" : `Quarto ${i + 1}`,
    ),
    ...Array.from({ length: property.banheiros }, (_, i) => `Banheiro ${i + 1}`),
  ];

  const cols = rooms.length <= 4 ? 2 : 3;
  const rows = Math.ceil(rooms.length / cols);
  const innerW = WIDTH - PAD * 2;
  const innerH = HEIGHT - PAD * 2;
  const cellW = innerW / cols;
  const cellH = innerH / rows;
  const gap = 3;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-full w-full"
      role="img"
      aria-label={`Planta esquemática com ${rooms.length} ambientes: ${rooms.join(", ")}.`}
    >
      <rect
        x={2}
        y={2}
        width={WIDTH - 4}
        height={HEIGHT - 4}
        fill="none"
        stroke="#241E1A"
        strokeWidth={1.4}
      />
      {rooms.map((room, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = PAD + col * cellW;
        const y = PAD + row * cellH;
        return (
          <g key={room + i}>
            <rect
              x={x + gap / 2}
              y={y + gap / 2}
              width={cellW - gap}
              height={cellH - gap}
              fill="none"
              stroke="#6B6157"
              strokeWidth={0.8}
            />
            <text
              x={x + cellW / 2}
              y={y + cellH / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={8}
              className="fill-[#241E1A]"
            >
              {room}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
