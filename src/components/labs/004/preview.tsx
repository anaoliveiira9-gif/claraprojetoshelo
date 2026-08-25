/**
 * Static, non-interactive miniature of the Orbit dashboard for the lab
 * case-study device frame. Light-mode palette only, hardcoded hex values
 * (not the runtime CSS vars from theme.tsx) so it stays legible and
 * self-contained at small sizes without needing OrbitThemeProvider.
 */
export function LabPreview() {
  return (
    <div className="flex h-full w-full overflow-hidden bg-[#F5F6F7] font-sans text-[#111214]">
      {/* sidebar strip */}
      <div className="flex w-[22%] shrink-0 flex-col gap-2 border-r border-[#E4E6E9] bg-white px-2 py-3">
        <div className="mb-2 h-2 w-[70%] rounded-sm bg-[#136156]" />
        {["a", "b", "c", "d", "e"].map((k, i) => (
          <div
            key={k}
            className="h-1.5 w-full rounded-sm"
            style={{ backgroundColor: i === 0 ? "#13615633" : "#E4E6E9" }}
          />
        ))}
      </div>

      {/* main content */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        {/* topbar */}
        <div className="mb-1 flex items-center justify-between">
          <div className="h-2 w-[35%] rounded-sm bg-[#E4E6E9]" />
          <div className="h-2 w-2 rounded-full bg-[#136156]" />
        </div>

        {/* kpi cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-[3px] border border-[#E4E6E9] bg-white p-1.5"
            >
              <div className="h-1 w-[60%] rounded-sm bg-[#E4E6E9]" />
              <div className="h-2 w-[40%] rounded-sm bg-[#111214]" />
            </div>
          ))}
        </div>

        {/* chart card with bar-chart silhouette */}
        <div className="flex flex-1 flex-col justify-end gap-1 rounded-[3px] border border-[#E4E6E9] bg-white p-2">
          <div className="mb-1 h-1 w-[30%] rounded-sm bg-[#E4E6E9]" />
          <div className="flex flex-1 items-end gap-[3px]">
            {[40, 65, 50, 80, 95, 55, 35].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[1px] bg-[#136156]"
                style={{ height: `${h}%`, opacity: 0.85 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
