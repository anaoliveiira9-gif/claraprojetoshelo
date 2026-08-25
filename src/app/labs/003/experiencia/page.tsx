import type { Metadata } from "next";
import {
  AmbiancePanel,
  Display,
  Eyebrow,
  GhostButton,
  PrimaryButton,
  Rule,
} from "@/components/labs/003/noir-ui";
import { MENU_TEASER } from "@/components/labs/003/menu-data";

export const metadata: Metadata = {
  title: "Noir — Sala de jantar",
};

export default function NoirHomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-28 sm:px-10 sm:pt-36">
      {/* Hero */}
      <section className="grid gap-10 sm:grid-cols-2 sm:items-center sm:gap-16">
        <div>
          <Eyebrow>Noir · Sala de jantar</Eyebrow>
          <Display className="mt-5 text-[13vw] sm:text-6xl">
            Uma noite,
            <br />
            <span className="italic text-[#7C2A2A]">bem servida.</span>
          </Display>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#F1E9DD]/70">
            Cozinha autoral em ambiente de luz baixa e mesas espaçadas —
            pensada para conversas longas, taças cheias e pratos que chegam
            no seu tempo.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <PrimaryButton href="/labs/003/experiencia/reserva">
              Reservar mesa
            </PrimaryButton>
            <GhostButton href="/labs/003/experiencia/menu">
              Ver o menu
            </GhostButton>
          </div>
        </div>
        <AmbiancePanel className="aspect-[4/5] w-full" variant="warm" />
      </section>

      {/* O espaço */}
      <section className="mt-32 grid gap-10 sm:mt-40 sm:grid-cols-2 sm:items-center sm:gap-16">
        <AmbiancePanel
          className="order-2 aspect-[4/3] w-full sm:order-1"
          variant="deep"
        />
        <div className="order-1 sm:order-2">
          <Rule />
          <Eyebrow className="mt-4">O espaço</Eyebrow>
          <Display as="h2" className="mt-3 text-4xl sm:text-5xl">
            Vinte e duas mesas, luz de vela.
          </Display>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#F1E9DD]/70">
            Um salão baixo, forrado em madeira escura e linho, onde cada mesa
            recebe seu próprio círculo de luz. Sem pressa, sem ruído — só o
            som de talheres e taças.
          </p>
        </div>
      </section>

      {/* Menu teaser */}
      <section className="mt-32 sm:mt-40">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Rule />
            <Eyebrow className="mt-4">Da cozinha</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl sm:text-5xl">
              Alguns destaques
            </Display>
          </div>
          <GhostButton href="/labs/003/experiencia/menu">
            Menu completo
          </GhostButton>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[#F1E9DD]/10 bg-[#F1E9DD]/10 sm:grid-cols-2">
          {MENU_TEASER.map((item) => (
            <li
              key={item.name}
              className="flex items-start justify-between gap-6 bg-[#0D0B0A] p-6 sm:p-8"
            >
              <div>
                <Display as="h3" className="text-xl sm:text-2xl">
                  {item.name}
                </Display>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#F1E9DD]/60">
                  {item.description}
                </p>
              </div>
              <span className="shrink-0 font-sans text-sm text-[#F1E9DD]/50">
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Chef teaser */}
      <section className="mt-32 grid gap-10 sm:mt-40 sm:grid-cols-[2fr_3fr] sm:items-center sm:gap-16">
        <AmbiancePanel className="aspect-square w-full" variant="warm" />
        <div>
          <Rule />
          <Eyebrow className="mt-4">Cozinha</Eyebrow>
          <Display as="h2" className="mt-3 text-4xl sm:text-5xl">
            Assinado por Marina Sales
          </Display>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#F1E9DD]/70">
            Formada em cozinha clássica francesa e criada entre feiras
            livres do interior, Marina lidera a cozinha do Noir com pratos
            que cruzam técnica europeia e ingredientes brasileiros de
            estação.
          </p>
        </div>
      </section>

      {/* Reservar CTA */}
      <section className="mt-32 flex flex-col items-center rounded-sm border border-[#F1E9DD]/10 px-6 py-20 text-center sm:mt-40">
        <Eyebrow>Mesas limitadas por noite</Eyebrow>
        <Display as="h2" className="mt-4 max-w-xl text-4xl sm:text-5xl">
          Reserve sua mesa
        </Display>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#F1E9DD]/70">
          Escolha a data, o número de pessoas e o horário — em menos de um
          minuto.
        </p>
        <PrimaryButton href="/labs/003/experiencia/reserva" className="mt-8">
          Começar reserva
        </PrimaryButton>
      </section>
    </main>
  );
}
