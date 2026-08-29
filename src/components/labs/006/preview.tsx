export function LabPreview() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#FAFAF8] font-sans text-[#161615]">
      {/* nav row */}
      <div className="flex items-center justify-between border-b border-[#161615]/15 px-3 py-2">
        <span className="text-[8px] font-black uppercase tracking-[0.15em]">Atelier 17</span>
        <div className="flex gap-2 text-[6px] uppercase tracking-[0.1em] text-[#161615]/50">
          <span>Projetos</span>
          <span>Equipe</span>
          <span className="text-[#2E4A5E]">Contato</span>
        </div>
      </div>

      {/* hero */}
      <div className="flex-1 px-3 pt-3">
        <span className="text-[6px] uppercase tracking-[0.2em] text-[#2E4A5E]">
          Planta → Espaço → Fotografia
        </span>
        <p className="mt-1 text-[11px] font-black uppercase leading-[0.95] tracking-tighter">
          A planta comanda a casa
        </p>
        <div className="mt-1.5 flex gap-1">
          {["Sala", "Cozinha", "Pátio", "Suíte"].map((room, i) => (
            <span
              key={room}
              className={
                i === 2
                  ? "border border-[#2E4A5E] bg-[#2E4A5E]/10 px-1 py-0.5 text-[5px] uppercase tracking-[0.08em] text-[#2E4A5E]"
                  : "border border-[#161615]/20 px-1 py-0.5 text-[5px] uppercase tracking-[0.08em] text-[#161615]/50"
              }
            >
              {room}
            </span>
          ))}
        </div>
      </div>

      {/* project teaser block — highlighted room drives the composition */}
      <div className="border-t border-[#161615]/15 p-3">
        <div className="relative aspect-[16/7] w-full overflow-hidden border border-[#161615]/20 bg-[#F1F0EB]">
          <svg viewBox="0 0 200 90" className="h-full w-full" aria-hidden="true">
            <rect x="14" y="10" width="55" height="70" fill="none" stroke="#161615" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="75" y="10" width="111" height="20" fill="none" stroke="#161615" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="75" y="60" width="111" height="20" fill="none" stroke="#161615" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="75" y="34" width="55" height="22" fill="#2E4A5E" fillOpacity="0.18" stroke="#2E4A5E" strokeWidth="1.2" />
            <line x1="0" y1="80" x2="200" y2="80" stroke="#161615" strokeOpacity="0.25" strokeWidth="1" />
          </svg>
        </div>
        <div className="mt-1.5 flex items-baseline justify-between">
          <span className="text-[8px] font-bold uppercase tracking-tight">Casa Pátio</span>
          <span className="text-[6px] uppercase tracking-[0.1em] text-[#161615]/50">
            Itaipava · Planta interativa
          </span>
        </div>
      </div>
    </div>
  );
}
