import { getSiteContent } from "@/lib/site-content";
import { ContentEditor } from "./content-editor";

export default async function AdminConteudoPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        Conteúdo
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        Textos da página inicial. Cada bloco salva de forma independente —
        mudanças aparecem no site em poucos segundos.
      </p>

      <div className="mt-10">
        <ContentEditor initial={content} />
      </div>
    </div>
  );
}
