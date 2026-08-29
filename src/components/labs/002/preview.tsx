const MOCK_CARDS = [
  {
    title: "Feira do Largo",
    tag: "Feira gastronômica",
    gradient: "linear-gradient(135deg, #F4A26A 0%, #D93B6C 100%)",
  },
  {
    title: "Linhas Soltas",
    tag: "Exposição",
    gradient: "linear-gradient(135deg, #7C9885 0%, #2F4858 100%)",
  },
];

/**
 * Small, static "poster" composition standing in for NOVA's Início feed.
 * Non-interactive — legible inside a device-frame mockup at ~200-460px wide.
 */
export function LabPreview() {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden bg-[#FAF7F2] font-sans text-[#1A1712]"
      style={{ fontFamily: "var(--font-nova, ui-sans-serif, sans-serif)" }}
    >
      <div className="flex items-center justify-between px-3 pt-3">
        <span className="text-[11px] font-extrabold tracking-tight">
          NOVA
        </span>
        <span className="h-4 w-4 rounded-full border border-[#EAE3D6] bg-white" />
      </div>

      <div className="flex-1 overflow-hidden px-3 pb-2 pt-2.5">
        <p className="text-[7px] font-medium text-[#6D665C]">
          Boa tarde, exploradora
        </p>
        <p className="mb-2 text-[11px] font-extrabold leading-tight tracking-tight">
          O que rola na cidade
        </p>

        <div className="flex flex-col gap-1.5">
          {MOCK_CARDS.map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-lg border border-[#EAE3D6] bg-white"
            >
              <div className="h-10 w-full" style={{ background: card.gradient }} />
              <div className="px-2 py-1.5">
                <p className="text-[6.5px] font-semibold uppercase tracking-[0.06em] text-[#D93B6C]">
                  {card.tag}
                </p>
                <p className="text-[8px] font-bold leading-tight">
                  {card.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-around border-t border-[#EAE3D6] bg-white py-1.5">
        {["Início", "Descobrir", "Mapa", "Favoritos", "Perfil"].map(
          (label, index) => (
            <span
              key={label}
              className={
                index === 0
                  ? "h-1.5 w-1.5 rounded-full bg-[#D93B6C]"
                  : "h-1.5 w-1.5 rounded-full bg-[#EAE3D6]"
              }
            />
          ),
        )}
      </div>
    </div>
  );
}
