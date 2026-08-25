import { cn } from "@/lib/utils";

const GRADIENTS = [
  ["#E8DCC8", "#C9A67E"],
  ["#DCE3D5", "#2F4A3B"],
  ["#EFEAE3", "#9C9182"],
  ["#E7D9CE", "#B0704F"],
  ["#F3EEE1", "#5C6B4F"],
  ["#E3DED2", "#24382C"],
] as const;

/** Deterministic tiny PRNG so the same property always renders the same lines. */
function mulberry32(seed: number) {
  let a = Math.floor(seed * 4294967296) || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function PropertyVisual({
  seed,
  panelIndex = 0,
  label,
  className,
}: {
  seed: number;
  panelIndex?: number;
  label?: string;
  className?: string;
}) {
  const rand = mulberry32(seed + panelIndex * 7.919);
  const palette = GRADIENTS[Math.floor(seed * GRADIENTS.length + panelIndex) % GRADIENTS.length];
  const angle = Math.round(rand() * 360);
  const [from, to] = palette;

  const lines = Array.from({ length: 3 }, () => ({
    x1: rand() * 100,
    y1: rand() * 100,
    x2: rand() * 100,
    y2: rand() * 100,
  }));
  const circleCx = rand() * 100;
  const circleCy = rand() * 100;
  const circleR = 8 + rand() * 18;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `linear-gradient(${angle}deg, ${from}, ${to})`,
      }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-30 mix-blend-overlay"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <circle
          cx={circleCx}
          cy={circleCy}
          r={circleR}
          fill="none"
          stroke="#241E1A"
          strokeWidth={0.4}
        />
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#241E1A"
            strokeWidth={0.3}
          />
        ))}
      </svg>
      {label && (
        <span className="absolute bottom-2 left-2 font-sans text-[10px] uppercase tracking-[0.2em] text-[#241E1A]/50">
          {label}
        </span>
      )}
    </div>
  );
}
