export function LabPreview() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#EFEAE3] p-4 text-[#241E1A]">
      <p className="font-serif text-[13px] leading-none">Vértice</p>

      <div className="mt-3 flex flex-1 gap-2">
        <div className="relative flex-1 overflow-hidden rounded-sm border border-[#DDD5C8] bg-[#F8F5F0]">
          <svg viewBox="0 0 100 70" className="h-full w-full" aria-hidden="true">
            <rect x={0} y={0} width={100} height={70} fill="#F8F5F0" />
            {[14, 28, 42, 56, 70].map((x) => (
              <line key={x} x1={x} y1={0} x2={x} y2={70} stroke="#DDD5C8" strokeWidth={0.6} />
            ))}
            {[14, 28, 42, 56].map((y) => (
              <line key={y} x1={0} y1={y} x2={100} y2={y} stroke="#DDD5C8" strokeWidth={0.6} />
            ))}
            <circle cx={26} cy={22} r={4.5} fill="none" stroke="#2F4A3B" strokeWidth={1} opacity={0.5} />
            <circle cx={26} cy={22} r={3} fill="#2F4A3B" />
            <circle cx={58} cy={34} r={2.2} fill="#2F4A3B" opacity={0.8} />
            <circle cx={44} cy={50} r={2.2} fill="#2F4A3B" opacity={0.8} />
            <circle cx={78} cy={16} r={2.2} fill="#2F4A3B" opacity={0.8} />
          </svg>
        </div>

        <div className="flex w-[38%] flex-col gap-1.5">
          <div className="flex items-center justify-between rounded-sm border border-[#2F4A3B] bg-[#F8F5F0] px-1.5 py-1.5">
            <span className="truncate font-sans text-[6.5px] text-[#6B6157]">Jardins</span>
            <span className="shrink-0 font-sans text-[6.5px] text-[#2F4A3B]">R$ 4,8M</span>
          </div>
          <div className="flex items-center justify-between rounded-sm border border-[#DDD5C8] bg-[#F8F5F0] px-1.5 py-1.5">
            <span className="truncate font-sans text-[6.5px] text-[#6B6157]">Leblon</span>
            <span className="shrink-0 font-sans text-[6.5px] text-[#2F4A3B]">R$ 3,2M</span>
          </div>
          <div className="flex items-center justify-between rounded-sm border border-[#DDD5C8] bg-[#F8F5F0] px-1.5 py-1.5">
            <span className="truncate font-sans text-[6.5px] text-[#6B6157]">Moema</span>
            <span className="shrink-0 font-sans text-[6.5px] text-[#2F4A3B]">R$ 2,6M</span>
          </div>
        </div>
      </div>
    </div>
  );
}
