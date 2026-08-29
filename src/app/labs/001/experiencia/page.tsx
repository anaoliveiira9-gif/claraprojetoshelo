import type { Metadata } from "next";
import {
  AmbiancePanel,
  Display,
  Eyebrow,
  GhostButton,
  PrimaryButton,
  Rule,
} from "@/components/labs/001/noir-ui";
import { MENU_TEASER } from "@/components/labs/001/menu-data";

export const metadata: Metadata = {
  title: "Noir — Sala de jantar",
};

export default function NoirHomePage() {
  const [featured, ...rest] = MENU_TEASER;

  return (
    <main className="pb-32">
      {/* Hero — full-bleed, text anchored low and left rather than a
          centered split, so the room reads before the copy does. */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden border-b border-[#F1E9DD]/10">
        <AmbiancePanel
          className="absolute inset-0 rounded-none border-0"
          variant="warm"
          glowX={22}
          glowY={18}
        />
        <div className="relative z-10 w-full px-6 pb-16 pt-40 sm:px-10 sm:pb-24 lg:px-16">
          <Eyebrow>Noir · Sala de jantar</Eyebrow>
          <Display className="mt-5 max-w-3xl text-[15vw] leading-[0.95] sm:text-7xl lg:text-8xl">
            Uma noite,
            <br />
            <span className="italic text-[#7C2A2A]">bem servida.</span>
          </Display>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-sm text-[15px] leading-relaxed text-[#F1E9DD]/70">
              Cozinha autoral em ambiente de luz baixa e mesas espaçadas —
              pensada para conversas longas, taças cheias e pratos que chegam
              no seu tempo.
            </p>
            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="/labs/001/experiencia/reserva">
                Reservar mesa
              </PrimaryButton>
              <GhostButton href="/labs/001/experiencia/menu">
                Ver o menu
              </GhostButton>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* O espaço — the panel takes the lion's share; copy is a narrow
            column pinned to the outer edge instead of a 50/50 split. */}
        <section className="mt-32 grid gap-10 sm:mt-44 sm:grid-cols-[3fr_2fr] sm:items-end sm:gap-6 lg:gap-10">
          <AmbiancePanel
            className="aspect-[16/10] w-full"
            variant="deep"
            glowX={72}
            glowY={30}
          />
          <div className="sm:pb-4">
            <Rule />
            <Eyebrow className="mt-4">O espaço</Eyebrow>
            <Display as="h2" className="mt-3 text-4xl sm:text-5xl">
              Vinte e duas mesas, luz de vela.
            </Display>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#F1E9DD]/70">
              Um salão baixo, forrado em madeira escura e linho, onde cada
              mesa recebe seu próprio círculo de luz. Sem pressa, sem ruído —
              só o som de talheres e taças.
            </p>
          </div>
        </section>

        {/* Menu teaser — one dish singled out large, the rest kept small
            and quiet beside it, instead of a uniform grid. */}
        <section className="mt-32 sm:mt-44">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Rule />
              <Eyebrow className="mt-4">Da cozinha</Eyebrow>
              <Display as="h2" className="mt-3 text-4xl sm:text-5xl">
                Alguns destaques
              </Display>
            </div>
            <GhostButton href="/labs/001/experiencia/menu">
              Menu completo
            </GhostButton>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[#F1E9DD]/10 bg-[#F1E9DD]/10 sm:grid-cols-[1.6fr_1fr]">
            {featured && (
              <div className="flex flex-col justify-end bg-[#0D0B0A] p-8 sm:p-12">
                <Eyebrow>Prato da casa</Eyebrow>
                <Display as="h3" className="mt-3 text-3xl sm:text-4xl">
                  {featured.name}
                </Display>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#F1E9DD]/60">
                  {featured.description}
                </p>
                <span className="mt-6 font-sans text-sm text-[#F1E9DD]/50">
                  {featured.price}
                </span>
              </div>
            )}
            <ul className="flex flex-col divide-y divide-[#F1E9DD]/10 bg-[#F1E9DD]/10">
              {rest.map((item) => (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-6 bg-[#0D0B0A] p-6 sm:p-7"
                >
                  <div>
                    <Display as="h3" className="text-lg sm:text-xl">
                      {item.name}
                    </Display>
                    <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-[#F1E9DD]/60">
                      {item.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-sans text-sm text-[#F1E9DD]/50">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Chef teaser — the panel bleeds past the text column's edge to
            break the grid rather than sitting neatly inside it. */}
        <section className="relative mt-32 sm:mt-44">
          <div className="grid gap-10 sm:grid-cols-[1fr_2fr] sm:items-center sm:gap-16">
            <AmbiancePanel
              className="aspect-[3/4] w-full sm:-ml-10 lg:-ml-24"
              variant="warm"
              glowX={35}
              glowY={65}
            />
            <div>
              <Rule />
              <Eyebrow className="mt-4">Cozinha</Eyebrow>
              <Display as="h2" className="mt-3 text-4xl sm:text-5xl">
                Assinado por Marina Sales
              </Display>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#F1E9DD]/70">
                Formada em cozinha clássica francesa e criada entre feiras
                livres do interior, Marina lidera a cozinha do Noir com
                pratos que cruzam técnica europeia e ingredientes brasileiros
                de estação.
              </p>
            </div>
          </div>
        </section>

        {/* Reservar CTA — left-aligned inside a full-bleed dark band
            instead of a centered boxed callout. */}
      </div>

      <section className="relative mt-32 overflow-hidden border-y border-[#F1E9DD]/10 sm:mt-44">
        <AmbiancePanel className="absolute inset-0 rounded-none border-0" variant="deep" glowX={78} glowY={70} intensity={0.8} />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <Eyebrow>Mesas limitadas por noite</Eyebrow>
          <Display as="h2" className="mt-4 max-w-xl text-4xl sm:text-6xl">
            Reserve sua mesa
          </Display>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#F1E9DD]/70">
            Escolha a noite, a mesa e o horário — uma pequena jornada, não um
            formulário.
          </p>
          <PrimaryButton href="/labs/001/experiencia/reserva" className="mt-8">
            Começar reserva
          </PrimaryButton>
        </div>
      </section>
    </main>
  );
}
