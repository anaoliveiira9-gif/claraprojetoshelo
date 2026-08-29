import type { Metadata } from "next";
import { AmbiancePanel, Display, Eyebrow, PrimaryButton, Rule } from "@/components/labs/001/noir-ui";
import { MENU } from "@/components/labs/001/menu-data";

export const metadata: Metadata = {
  title: "Noir — Menu",
};

export default function NoirMenuPage() {
  return (
    <main className="pb-32 pt-28 sm:pt-36">
      {/* Intro sits off-center against a wide ambient field, rather than
          a centered block, to keep the same low-light, unhurried mood
          established on the home page. */}
      <section className="relative mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-[3fr_2fr] sm:items-end sm:gap-16 sm:px-10">
        <div>
          <Eyebrow>Noir · Carta</Eyebrow>
          <Display className="mt-4 text-5xl sm:text-7xl">Menu</Display>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#F1E9DD]/70">
            Pratos autorais preparados com ingredientes de estação. A carta
            muda conforme a colheita — estes são os destaques da temporada
            atual.
          </p>
        </div>
        <AmbiancePanel className="aspect-[5/3] w-full" variant="deep" glowX={70} glowY={35} />
      </section>

      <div className="mx-auto mt-20 flex max-w-3xl flex-col gap-20 px-6 sm:mt-28 sm:px-10">
        {MENU.map((category, index) => (
          <section
            key={category.id}
            id={category.id}
            className={index % 2 === 1 ? "sm:ml-10" : undefined}
          >
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

      <div className="mx-auto mt-24 max-w-3xl px-6 sm:px-10">
        <div className="flex flex-col items-center gap-4 rounded-sm border border-[#F1E9DD]/10 px-6 py-16 text-center">
          <Eyebrow>Pronto para experimentar?</Eyebrow>
          <Display as="h2" className="text-3xl sm:text-4xl">
            Reserve sua mesa
          </Display>
          <PrimaryButton href="/labs/001/experiencia/reserva" className="mt-4">
            Reservar
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}
