export function LabPreview() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#F6F1E9] font-sans text-[#171512]">
      <div className="flex items-center justify-between border-b border-[#171512]/10 px-3 py-2">
        <span className="font-serif text-[10px] tracking-[0.1em]">ÉTÉR</span>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full border border-[#171512]/40" />
          <span className="h-2 w-2 rounded-full border border-[#171512]/40" />
          <span className="h-2 w-2 rounded-full bg-[#171512]/70" />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
        <span className="text-[6px] uppercase tracking-[0.3em] text-[#171512]/45">
          Navegue pelo cheiro
        </span>
        <p className="font-serif text-[11px] leading-[1.15] tracking-tight">
          MADEIRA · PELE · <span className="text-[#B4915B]">FUMAÇA</span>
          <br />
          FLOR · ÂMBAR
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 border-t border-[#171512]/10 p-3">
        {[
          ["#8A5A2B", "#3A2412"],
          ["#6B7A73", "#22302B"],
          ["#D9C9B8", "#8C7A63"],
        ].map(([a, b], i) => (
          <div
            key={i}
            className="aspect-[3/4]"
            style={{ background: `linear-gradient(180deg, ${a}, ${b})` }}
          />
        ))}
      </div>
    </div>
  );
}
