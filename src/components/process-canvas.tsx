import { cn } from "@/lib/utils";

const boxLine = "border border-line";
const textBar = "h-1.5 rounded-full bg-paper/20";
const microLabel =
  "font-mono text-[9px] uppercase tracking-[0.15em] text-paper-faint";

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden border border-line bg-ink-soft/40 p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

function DiscoverCanvas() {
  const tags = ["Marca", "Objetivo", "Público", "Contexto", "Referências"];
  return (
    <Panel>
      <span className={microLabel}>brief.txt</span>
      <div className="mt-5 flex flex-col gap-2.5">
        <span className={cn(textBar, "w-[85%]")} />
        <span className={cn(textBar, "w-[60%]")} />
        <span className={cn(textBar, "w-[72%]")} />
        <span className="flex items-center gap-1.5">
          <span className={cn(textBar, "w-[40%]")} />
          <span className="h-3 w-px animate-pulse bg-accent" />
        </span>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        {tags.map((tag, i) => (
          <span
            key={tag}
            style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.5}deg)` }}
            className="rounded-sm border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper-dim"
          >
            {tag}
          </span>
        ))}
      </div>
    </Panel>
  );
}

function StructureCanvas() {
  return (
    <Panel>
      <span className={microLabel}>sitemap</span>
      <div className="relative mt-8 flex flex-1 flex-col items-center">
        <div className={cn(boxLine, "w-28 py-2 text-center")}>
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-paper-dim">
            Home
          </span>
        </div>
        <div className="h-8 w-px bg-line" />
        <div className="h-px w-[70%] bg-line" />
        <div className="flex w-[70%] justify-between">
          {["Sobre", "Serviços", "Contato"].map((page) => (
            <div key={page} className="flex flex-col items-center">
              <div className="h-8 w-px bg-line" />
              <div className={cn(boxLine, "w-20 py-2 text-center")}>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-paper-dim">
                  {page}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function DesignCanvas() {
  return (
    <Panel>
      <div className="flex items-center justify-between">
        <span className={microLabel}>interface</span>
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
      <div className="mt-5 flex items-center justify-between border-b border-line pb-3">
        <span className={cn(textBar, "w-10")} />
        <div className="flex gap-3">
          <span className={cn(textBar, "w-6")} />
          <span className={cn(textBar, "w-6")} />
          <span className={cn(textBar, "w-6")} />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <span className="font-display text-lg font-semibold uppercase tracking-tight text-paper">
          Título
        </span>
        <span className={cn(textBar, "w-[55%]")} />
      </div>
      <div className="mt-6 grid flex-1 grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              boxLine,
              "flex items-end p-1.5",
              i === 1 && "border-accent/50"
            )}
          >
            <span
              className={cn(
                "h-1 w-full rounded-full",
                i === 1 ? "bg-accent/60" : "bg-paper/15"
              )}
            />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function BuildCanvas() {
  const lines = [0, 12, 4, 20, 8, 16, 0, 24];
  return (
    <Panel>
      <div className="flex items-center justify-between">
        <span className={microLabel}>build.log</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
          testes 12/12
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {lines.map((indent, i) => (
          <div
            key={i}
            style={{ marginLeft: `${indent}px` }}
            className="flex items-center gap-2"
          >
            <span className="h-1 w-1 rounded-full bg-paper/25" />
            <span
              className={cn(
                textBar,
                i % 3 === 0 ? "w-24 bg-accent/40" : "w-32"
              )}
            />
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <div className="h-1 w-full overflow-hidden rounded-full bg-paper/10">
          <div className="h-full w-[86%] rounded-full bg-accent" />
        </div>
        <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.1em] text-paper-faint">
          Deploy — 86%
        </span>
      </div>
    </Panel>
  );
}

function LaunchCanvas() {
  return (
    <Panel>
      <div className="flex items-center justify-between">
        <span className={microLabel}>produto final</span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Ao vivo
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col border border-line">
        <div className="flex items-center justify-between border-b border-line px-3 py-2">
          <span className={cn(textBar, "w-8")} />
          <div className="flex gap-2">
            <span className={cn(textBar, "w-5")} />
            <span className={cn(textBar, "w-5")} />
            <span className="rounded-sm bg-accent px-2 py-0.5 font-mono text-[7px] uppercase text-ink">
              Começar
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start justify-center gap-2 px-3 py-4">
          <span className="font-display text-xl font-semibold uppercase tracking-tight">
            Alumna
          </span>
          <span className={cn(textBar, "w-[70%]")} />
        </div>
        <div className="grid grid-cols-4 gap-1.5 border-t border-line p-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={cn(boxLine, "aspect-square")} />
          ))}
        </div>
      </div>
    </Panel>
  );
}

const CANVASES = [
  DiscoverCanvas,
  StructureCanvas,
  DesignCanvas,
  BuildCanvas,
  LaunchCanvas,
];

export function ProcessCanvas({ step }: { step: number }) {
  const Canvas = CANVASES[Math.min(step, CANVASES.length - 1)];
  return <Canvas />;
}
