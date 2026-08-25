import type { Metadata } from "next";
import { TEAM } from "@/components/labs/002/data";
import { Reveal } from "@/components/labs/002/reveal";
import { SiteFooter } from "@/components/labs/002/site-footer";

export const metadata: Metadata = {
  title: "Equipe — Atelier 17",
};

export default function EquipePage() {
  return (
    <main className="pt-24 sm:pt-28">
      <section className="border-b border-[#161615]/15 px-6 pb-12 pt-6 sm:px-10 sm:pb-16">
        <p className="[font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.25em] text-[#2E4A5E]">
          Quem desenha
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.92] tracking-tighter sm:text-7xl">
          Equipe
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#161615]/75">
          Uma equipe pequena e multidisciplinar, envolvida do estudo de
          viabilidade até o acompanhamento de obra.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-px bg-[#161615]/15 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member, i) => (
          <Reveal key={member.id} delay={(i % 3) * 0.05}>
            <div className="flex h-full flex-col gap-6 bg-[#FAFAF8] p-8 sm:p-10">
              <div
                className="flex h-20 w-20 items-center justify-center border border-[#161615]"
                style={{
                  background:
                    i % 2 === 0
                      ? "repeating-linear-gradient(135deg, #F1F0EB 0px, #F1F0EB 6px, #FAFAF8 6px, #FAFAF8 12px)"
                      : "#F1F0EB",
                }}
              >
                <span className="text-xl font-black tracking-tight text-[#2E4A5E]">
                  {member.initials}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold uppercase tracking-tight">{member.name}</h2>
                <p className="mt-1 [font-family:var(--font-atelier-mono)] text-[11px] uppercase tracking-[0.1em] text-[#161615]/55">
                  {member.role}
                </p>
              </div>
              <span className="mt-auto [font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.15em] text-[#161615]/35">
                {String(i + 1).padStart(2, "0")} / {TEAM.length.toString().padStart(2, "0")}
              </span>
            </div>
          </Reveal>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
