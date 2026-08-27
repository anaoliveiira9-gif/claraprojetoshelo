export default function AdminLeadsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        Leads
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        Contatos recebidos pelo configurador (&ldquo;Começar um
        Projeto&rdquo;) e pelo briefing do orçamento.
      </p>

      <div className="mt-10 border border-line p-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
          Nenhum lead ainda
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-paper-dim">
          O envio do diagnóstico e do briefing hoje só é simulado no
          navegador de quem preenche — nada é salvo em nenhum servidor
          ainda. Para listar leads reais aqui, conecte um banco de dados
          (ex: Supabase) e troque os envios simulados em{" "}
          <code className="text-paper">src/lib/diagnostic.ts</code> e{" "}
          <code className="text-paper">src/lib/briefing.ts</code> por uma
          gravação real.
        </p>
      </div>
    </div>
  );
}
