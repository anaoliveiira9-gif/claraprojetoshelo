"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROCESSOS, type Processo, type ProcessoStatus } from "@/components/labs/004/dados-data";

type SortKey = keyof Pick<
  Processo,
  "id" | "nome" | "area" | "responsavel" | "status" | "prioridade" | "prazo" | "progresso"
>;

const COLUMNS: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "id", label: "ID" },
  { key: "nome", label: "Processo" },
  { key: "area", label: "Área" },
  { key: "responsavel", label: "Responsável" },
  { key: "status", label: "Status" },
  { key: "prioridade", label: "Prioridade" },
  { key: "prazo", label: "Prazo" },
  { key: "progresso", label: "Progresso", numeric: true },
];

const STATUS_STYLES: Record<ProcessoStatus, string> = {
  "Concluído": "bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]",
  "Em andamento": "bg-[var(--orbit-ink)]/8 text-[var(--orbit-ink)]",
  "Pendente": "bg-[var(--orbit-secondary)]/15 text-[var(--orbit-secondary)]",
  "Atrasado": "bg-[var(--orbit-negative)]/10 text-[var(--orbit-negative)]",
};

const PAGE_SIZE = 10;

export function DataTable() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("prazo");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROCESSOS;
    return PROCESSOS.filter((p) =>
      [p.id, p.nome, p.area, p.responsavel, p.status, p.prioridade].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      let cmp: number;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv), "pt-BR");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  return (
    <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)]">
      <div className="flex flex-col gap-3 border-b border-[var(--orbit-border)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-[var(--orbit-ink)]">Processos</h2>
          <p className="mt-0.5 text-xs text-[var(--orbit-secondary)]">
            {sorted.length} de {PROCESSOS.length} registros
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--orbit-secondary)]" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar processo, área, responsável…"
            className="w-full rounded-md border border-[var(--orbit-border)] bg-[var(--orbit-bg)] py-1.5 pl-8 pr-3 text-sm text-[var(--orbit-ink)] outline-none placeholder:text-[var(--orbit-secondary)] focus:border-[var(--orbit-accent)]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--orbit-border)]">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-4 py-2.5">
                  <button
                    type="button"
                    data-cursor-hover
                    onClick={() => handleSort(col.key)}
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-[var(--orbit-secondary)] transition-colors hover:text-[var(--orbit-ink)]",
                      col.numeric && "ml-auto",
                    )}
                  >
                    {col.label}
                    {sortKey === col.key ? (
                      sortDir === "asc" ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-30" />
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[var(--orbit-border)] last:border-b-0 hover:bg-[var(--orbit-bg)]"
              >
                <td className="px-4 py-2.5 font-[family-name:var(--font-jetbrains)] text-xs tabular-nums text-[var(--orbit-secondary)]">
                  {row.id}
                </td>
                <td className="px-4 py-2.5 text-[var(--orbit-ink)]">{row.nome}</td>
                <td className="px-4 py-2.5 text-[var(--orbit-secondary)]">{row.area}</td>
                <td className="px-4 py-2.5 text-[var(--orbit-secondary)]">{row.responsavel}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                      STATUS_STYLES[row.status],
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-[var(--orbit-secondary)]">{row.prioridade}</td>
                <td className="px-4 py-2.5 font-[family-name:var(--font-jetbrains)] text-xs tabular-nums text-[var(--orbit-secondary)]">
                  {row.prazo}
                </td>
                <td className="px-4 py-2.5 text-right font-[family-name:var(--font-jetbrains)] text-xs tabular-nums text-[var(--orbit-ink)]">
                  {row.progresso}%
                </td>
              </tr>
            ))}
            {pageRows.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-4 py-10 text-center text-sm text-[var(--orbit-secondary)]"
                >
                  Nenhum processo encontrado para &ldquo;{query}&rdquo;.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--orbit-border)] px-4 py-3">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs tabular-nums text-[var(--orbit-secondary)]">
          Página {currentPage} de {totalPages}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-cursor-hover
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 rounded-md border border-[var(--orbit-border)] px-2.5 py-1.5 text-xs text-[var(--orbit-ink)] transition-colors hover:border-[var(--orbit-accent)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--orbit-border)]"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Anterior
          </button>
          <button
            type="button"
            data-cursor-hover
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center gap-1 rounded-md border border-[var(--orbit-border)] px-2.5 py-1.5 text-xs text-[var(--orbit-ink)] transition-colors hover:border-[var(--orbit-accent)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--orbit-border)]"
          >
            Próxima <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
