import { FAQ_ITEMS } from "@/lib/faq-data";

export default function AdminFaqPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        FAQ
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        {FAQ_ITEMS.length} perguntas publicadas na seção &ldquo;Perguntas
        Frequentes&rdquo; do site. O conteúdo vive em{" "}
        <code className="text-paper">
          src/components/sections/faq.tsx
        </code>{" "}
        — edição direta aqui é um próximo passo.
      </p>

      <div className="mt-10 flex flex-col divide-y divide-line border-t border-b border-line">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className="py-5">
            <p className="font-display text-base font-medium">{item.q}</p>
            <p className="mt-2 max-w-2xl text-sm text-paper-dim">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
