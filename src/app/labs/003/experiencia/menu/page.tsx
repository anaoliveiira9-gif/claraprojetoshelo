import type { Metadata } from "next";
import { Display, Eyebrow, PrimaryButton, Rule } from "@/components/labs/003/noir-ui";
import { MENU } from "@/components/labs/003/menu-data";

export const metadata: Metadata = {
  title: "Noir — Menu",
};

export default function NoirMenuPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-32 pt-28 sm:px-10 sm:pt-36">
      <Eyebrow>Noir · Carta</Eyebrow>
      <Display className="mt-4 text-5xl sm:text-6xl">Menu</Display>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#F1E9DD]/70">
        Pratos autorais preparados com ingredientes de estação. A carta muda
        conforme a colheita — estes são os destaques da temporada atual.
      </p>

      <div className="mt-16 flex flex-col gap-20">
        {MENU.map((category) => (
          <section key={category.id} id={category.id}>
            <Rule />
            <Display as="h2" className="mt-4 text-3xl sm:text-4xl">
              {category.label}
            </Display>

            <ul className="mt-8 flex flex-col divide-y divide-[#F1E9DD]/10 border-t border-[#F1E9DD]/10">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-6 py-6"
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-noir-display)] text-xl text-[#F1E9DD] sm:text-2xl">
                      {item.name}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[#F1E9DD]/60">
                      {item.description}
                    </p>
                  </div>
                  <span className="shrink-0 pt-1 font-sans text-sm text-[#F1E9DD]/50">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-24 flex flex-col items-center gap-4 rounded-sm border border-[#F1E9DD]/10 px-6 py-16 text-center">
        <Eyebrow>Pronto para experimentar?</Eyebrow>
        <Display as="h2" className="text-3xl sm:text-4xl">
          Reserve sua mesa
        </Display>
        <PrimaryButton href="/labs/003/experiencia/reserva" className="mt-4">
          Reservar
        </PrimaryButton>
      </div>
    </main>
  );
}
