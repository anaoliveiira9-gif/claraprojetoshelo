import { cn } from "@/lib/utils";

const INK = "#161615";
const ACCENT = "#2E4A5E";

/**
 * Abstract, non-photographic stand-ins for building imagery — flat
 * line-drawing / axonometric-style compositions built from rects and
 * strokes only. No two variants read the same at a glance.
 */
export function AbstractComposition({
  variant,
  className,
  label,
}: {
  variant: number;
  className?: string;
  label?: string;
}) {
  const v = ((variant - 1) % 6) + 1;

  return (
    <div className={cn("relative w-full overflow-hidden bg-[#F1F0EB]", className)}>
      <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {v === 1 && (
          <>
            <rect x="0" y="0" width="400" height="300" fill="#F1F0EB" />
            <rect x="40" y="60" width="220" height="180" fill="none" stroke={INK} strokeWidth="1.5" />
            <rect x="70" y="90" width="160" height="120" fill={ACCENT} fillOpacity="0.12" />
            <line x1="40" y1="150" x2="260" y2="150" stroke={INK} strokeWidth="1" strokeOpacity="0.4" />
            <line x1="150" y1="60" x2="150" y2="240" stroke={INK} strokeWidth="1" strokeOpacity="0.4" />
            <rect x="280" y="40" width="70" height="220" fill="none" stroke={ACCENT} strokeWidth="1.5" />
            <line x1="0" y1="270" x2="400" y2="270" stroke={INK} strokeWidth="1" strokeOpacity="0.25" />
          </>
        )}
        {v === 2 && (
          <>
            <rect x="0" y="0" width="400" height="300" fill="#F1F0EB" />
            {Array.from({ length: 7 }).map((_, i) => (
              <line
                key={i}
                x1={30 + i * 48}
                y1="30"
                x2={30 + i * 48}
                y2="270"
                stroke={i % 2 === 0 ? INK : ACCENT}
                strokeOpacity={i % 2 === 0 ? 0.5 : 0.6}
                strokeWidth="1.5"
              />
            ))}
            <rect x="30" y="30" width="336" height="60" fill={INK} fillOpacity="0.06" />
            <rect x="30" y="210" width="336" height="60" fill={ACCENT} fillOpacity="0.1" />
          </>
        )}
        {v === 3 && (
          <>
            <rect x="0" y="0" width="400" height="300" fill="#F1F0EB" />
            <polygon points="60,240 200,50 340,240" fill="none" stroke={INK} strokeWidth="1.5" />
            <line x1="60" y1="240" x2="340" y2="240" stroke={INK} strokeWidth="1.5" />
            <line x1="130" y1="150" x2="270" y2="150" stroke={ACCENT} strokeWidth="1.5" />
            <line x1="200" y1="50" x2="200" y2="240" stroke={INK} strokeWidth="1" strokeOpacity="0.35" />
            <rect x="150" y="180" width="100" height="60" fill={ACCENT} fillOpacity="0.1" />
          </>
        )}
        {v === 4 && (
          <>
            <rect x="0" y="0" width="400" height="300" fill="#F1F0EB" />
            <rect x="30" y="30" width="150" height="240" fill="none" stroke={INK} strokeWidth="1.5" />
            <rect x="200" y="30" width="170" height="110" fill="none" stroke={INK} strokeWidth="1.5" />
            <rect x="200" y="160" width="170" height="110" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="1.5" />
            <line x1="30" y1="150" x2="180" y2="150" stroke={INK} strokeOpacity="0.4" strokeWidth="1" />
          </>
        )}
        {v === 5 && (
          <>
            <rect x="0" y="0" width="400" height="300" fill="#F1F0EB" />
            <circle cx="200" cy="150" r="90" fill="none" stroke={INK} strokeWidth="1.5" />
            <circle cx="200" cy="150" r="55" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1" />
            <line x1="200" y1="30" x2="200" y2="270" stroke={INK} strokeOpacity="0.3" strokeWidth="1" />
            <line x1="80" y1="150" x2="320" y2="150" stroke={INK} strokeOpacity="0.3" strokeWidth="1" />
          </>
        )}
        {v === 6 && (
          <>
            <rect x="0" y="0" width="400" height="300" fill="#F1F0EB" />
            <rect x="40" y="40" width="320" height="220" fill="none" stroke={INK} strokeWidth="1.5" />
            {Array.from({ length: 5 }).map((_, i) => (
              <rect
                key={i}
                x={60 + i * 58}
                y={60 + (i % 2 === 0 ? 0 : 40)}
                width="40"
                height={i % 2 === 0 ? 150 : 110}
                fill={i % 2 === 0 ? ACCENT : "none"}
                fillOpacity="0.12"
                stroke={INK}
                strokeOpacity="0.5"
                strokeWidth="1"
              />
            ))}
          </>
        )}
      </svg>
      {label && (
        <span className="absolute bottom-2 left-2 [font-family:var(--font-atelier-mono)] text-[9px] uppercase tracking-[0.15em] text-[#161615]/65">
          {label}
        </span>
      )}
    </div>
  );
}
