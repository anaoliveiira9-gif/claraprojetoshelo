import { getSiteContent } from "@/lib/site-content";
import { AdminAccessForm } from "@/components/admin/access-form";
import { BrandEditor, TypographyEditor } from "./brand-editor";

export default async function AdminConfiguracoesPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        Configurações
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        Marca, contato e tipografia usados em todo o site.
      </p>

      <div className="mt-10">
        <BrandEditor brand={content.brand} contact={content.contact} />
        <TypographyEditor typography={content.typography} />
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
