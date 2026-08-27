import Link from "next/link";
import { LABS } from "@/lib/labs";

export default function AdminLabsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        Labs
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        Os 6 laboratórios publicados no site. Conteúdo, textos e a
        experiência interativa de cada um vivem em{" "}
        <code className="text-paper">src/lib/labs.ts</code> e{" "}
        <code className="text-paper">src/app/labs/</code> — edição direta
        aqui é um próximo passo.
      </p>

      <div className="mt-10 flex flex-col divide-y divide-line border-t border-b border-line">
        {LABS.map((lab) => (
          <div
            key={lab.slug}
            className="flex flex-wrap items-center justify-between gap-4 py-5"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Lab {lab.index} — {lab.category}
              </span>
              <p className="mt-1 font-display text-lg font-medium">
                {lab.client}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-paper-faint">
                {lab.year}
              </span>
              <Link
                href={`/labs/${lab.slug}`}
                target="_blank"
                data-cursor-hover
                className="font-mono text-xs uppercase tracking-[0.2em] text-paper underline underline-offset-4 hover:text-accent"
              >
                Ver no site →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
