import { SERVICES, formatBRL } from "@/lib/pricing";

export default function AdminServicosPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        Serviços & Preços
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        Catálogo de serviços e preços de entrada usados no site e no
        configurador. Toda a lógica de preço (pesos, sinergias, faixas) vive
        centralizada em{" "}
        <code className="text-paper">src/lib/pricing.ts</code> — editar aqui
        ainda não está disponível nesta primeira versão do painel; esta
        página é a leitura do que está publicado agora.
      </p>

      <div className="mt-10 overflow-x-auto border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line font-mono text-[11px] uppercase tracking-[0.15em] text-paper-faint">
              <th className="px-5 py-4">Serviço</th>
              <th className="px-5 py-4">Slug</th>
              <th className="px-5 py-4">A partir de</th>
              <th className="px-5 py-4">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((s) => (
              <tr key={s.slug} className="border-b border-line last:border-b-0">
                <td className="px-5 py-4 font-display font-medium">{s.name}</td>
                <td className="px-5 py-4 font-mono text-xs text-paper-faint">
                  /servicos/{s.slug}
                </td>
                <td className="px-5 py-4 text-accent">
                  {formatBRL(s.basePrice)}
                  {s.isRecurring ? "/mês" : ""}
                </td>
                <td className="px-5 py-4 text-paper-dim">
                  {s.buildOption ? "Tipo de projeto" : "Adicional"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
