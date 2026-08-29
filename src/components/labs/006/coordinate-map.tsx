const INK = "#161615";
const ACCENT = "#2E4A5E";

/** Small stylized coordinate-grid marker — not a real map. */
export function CoordinateMap({ coordinate, location }: { coordinate: string; location: string }) {
  return (
    <div className="border border-[#161615]/15 bg-[#F1F0EB] p-6 sm:p-8">
      <svg viewBox="0 0 200 160" className="h-auto w-full" role="img" aria-label={`Marcador esquemático de ${location}`}>
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 25} y1="0" x2={i * 25} y2="160" stroke={INK} strokeOpacity="0.12" strokeWidth="1" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 25} x2="200" y2={i * 25} stroke={INK} strokeOpacity="0.12" strokeWidth="1" />
        ))}
        <line x1="100" y1="0" x2="100" y2="160" stroke={INK} strokeOpacity="0.3" strokeWidth="1" />
        <line x1="0" y1="80" x2="200" y2="80" stroke={INK} strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="118" cy="62" r="16" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="1" />
        <circle cx="118" cy="62" r="4" fill={ACCENT} />
        <line x1="118" y1="62" x2="150" y2="30" stroke={ACCENT} strokeWidth="1" />
      </svg>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.1em] text-[#161615]/70">
          {location}
        </p>
        <p className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.1em] text-[#2E4A5E]">
          {coordinate}
        </p>
      </div>
    </div>
  );
}
