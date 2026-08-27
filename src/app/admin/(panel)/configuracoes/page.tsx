import { BRAND, CONTACT } from "@/lib/config";
import { AdminAccessForm } from "@/components/admin/access-form";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-4 last:border-b-0">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        {label}
      </span>
      <span className="font-display text-base">{value}</span>
    </div>
  );
}

export default function AdminConfiguracoesPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        Configurações
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        Dados de marca e contato usados em todo o site. Tudo isso é lido de
        um único arquivo — <code className="text-paper">src/lib/config.ts</code> —
        editar esses valores lá já reflete automaticamente em cada lugar do
        site que mostra esse dado.
      </p>

      <div className="mt-10 max-w-lg">
        <Row label="Nome" value={BRAND.name} />
        <Row label="Razão social" value={BRAND.legalName} />
        <Row label="Fundadora" value={BRAND.founder} />
        <Row
          label="E-mail"
          value={CONTACT.email ?? "Não configurado"}
        />
        <Row
          label="WhatsApp"
          value={CONTACT.whatsappNumber ?? "Não configurado"}
        />
        <Row label="Endereço / base" value={CONTACT.address} />
      </div>

      <div className="mt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
          Acesso ao painel
        </p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper-dim">
          O login usa um e-mail e senha únicos, definidos nas variáveis de
          ambiente <code className="text-paper">ADMIN_EMAIL</code>,{" "}
          <code className="text-paper">ADMIN_PASSWORD</code> e{" "}
          <code className="text-paper">ADMIN_SESSION_SECRET</code> — nenhuma
          credencial fica no código ou é enviada ao navegador.
        </p>
        <AdminAccessForm />
      </div>
    </div>
  );
}
