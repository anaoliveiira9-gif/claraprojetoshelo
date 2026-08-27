import { getSiteContent } from "@/lib/site-content";
import { FaqEditor } from "./faq-editor";

export default async function AdminFaqPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        FAQ
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        {content.faq.length} perguntas publicadas na seção &ldquo;Perguntas
        Frequentes&rdquo; do site. Edite, reordene, adicione ou remova
        abaixo — o site atualiza ao salvar.
      </p>

      <div className="mt-10">
        <FaqEditor initial={content.faq} />
      </div>
    </div>
  );
}
