export function LabPreview() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#EFEAE3] p-4 text-[#241E1A]">
      <p className="font-serif text-[13px] leading-none">Vértice</p>

      <div className="mt-3 flex items-center gap-2 rounded-sm border border-[#DDD5C8] bg-[#F8F5F0] px-2.5 py-2">
        <span className="flex-1 truncate font-sans text-[8px] text-[#7A6F63]">
          Jardins, São Paulo…
        </span>
        <span className="shrink-0 rounded-sm bg-[#2F4A3B] px-2 py-1 font-sans text-[7px] uppercase tracking-[0.1em] text-[#F8F5F0]">
          Buscar
        </span>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-2 gap-2">
        <div className="flex flex-col overflow-hidden rounded-sm border border-[#DDD5C8] bg-[#F8F5F0]">
          <div
            className="aspect-[4/3] w-full"
            style={{ background: "linear-gradient(135deg, #E8DCC8, #C9A67E)" }}
          />
          <div className="flex items-center justify-between px-1.5 py-1">
            <span className="font-sans text-[6.5px] text-[#7A6F63]">Cobertura</span>
            <span className="font-sans text-[6.5px] text-[#2F4A3B]">R$ 4,8M</span>
          </div>
        </div>
        <div className="flex flex-col overflow-hidden rounded-sm border border-[#DDD5C8] bg-[#F8F5F0]">
          <div
            className="aspect-[4/3] w-full"
            style={{ background: "linear-gradient(135deg, #DCE3D5, #2F4A3B)" }}
          />
          <div className="flex items-center justify-between px-1.5 py-1">
            <span className="font-sans text-[6.5px] text-[#7A6F63]">Apartamento</span>
            <span className="font-sans text-[6.5px] text-[#2F4A3B]">R$ 3,2M</span>
          </div>
        </div>
      </div>
    </div>
  );
}
