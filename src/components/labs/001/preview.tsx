/**
 * Static "poster" composition for the lab card / device-frame mockup.
 * No interactivity, no external fonts — just enough of Noir's mood
 * (deep near-black, oxblood glow, serif headline, a CTA fragment) to
 * read clearly at 200–460px wide inside overflow:hidden.
 */
export function LabPreview() {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5"
      style={{
        background:
          "radial-gradient(120% 90% at 25% 15%, rgba(124,42,42,0.4) 0%, rgba(13,11,10,0) 55%), radial-gradient(80% 70% at 80% 80%, rgba(241,233,221,0.08) 0%, rgba(13,11,10,0) 60%), #0D0B0A",
      }}
    >
      <span
        className="font-sans text-[9px] uppercase tracking-[0.35em]"
        style={{ color: "rgba(241,233,221,0.5)" }}
      >
        Noir · Sala de jantar
      </span>

      <div>
        <p
          className="font-serif italic leading-[1.05]"
          style={{ color: "#F1E9DD", fontSize: "clamp(20px, 12%, 34px)" }}
        >
          Uma noite,
          <br />
          <span style={{ color: "#7C2A2A" }}>bem servida.</span>
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span
          className="rounded-sm px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.2em]"
          style={{ background: "#7C2A2A", color: "#F1E9DD" }}
        >
          Reservar
        </span>
        <span
          className="font-sans text-[9px] tracking-[0.15em]"
          style={{ color: "rgba(241,233,221,0.35)" }}
        >
          Noite · Mesa · Horário
        </span>
      </div>
    </div>
  );
}
