import type { Metadata } from "next";
import { Display, Eyebrow } from "@/components/labs/003/noir-ui";
import { ReservationWizard } from "@/components/labs/003/reservation-wizard";

export const metadata: Metadata = {
  title: "Noir — Reservar",
};

export default function NoirReservaPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-32 pt-28 sm:px-10 sm:pt-36">
      <Eyebrow>Noir · Reserva</Eyebrow>
      <Display className="mt-4 text-5xl sm:text-6xl">Reservar mesa</Display>
      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#F1E9DD]/70">
        Uma pequena jornada, não um formulário: a noite, a mesa, o horário —
        e sua reserva fica pronta em segundos.
      </p>

      <div className="mt-16">
        <ReservationWizard />
      </div>
    </main>
  );
}
