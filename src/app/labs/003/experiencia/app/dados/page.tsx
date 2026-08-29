import { DataTable } from "@/components/labs/003/data-table";

export default function OrbitDadosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--orbit-ink)]">Dados</h1>
        <p className="mt-1 text-sm text-[var(--orbit-secondary)]">
          Processos operacionais em andamento em todas as áreas.
        </p>
      </div>

      <DataTable />
    </div>
  );
}
