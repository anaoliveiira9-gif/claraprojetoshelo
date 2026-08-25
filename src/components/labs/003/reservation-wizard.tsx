"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { Display, Eyebrow, GhostButton, PrimaryButton } from "@/components/labs/003/noir-ui";
import { buildMonthGrid, WEEKDAY_LABELS } from "@/components/labs/003/calendar";
import { getTimeSlots, createReservation, type ReservationConfirmation } from "@/components/labs/003/reservation";

const STEPS = ["Data", "Pessoas", "Horário", "Confirmação"] as const;

function formatDateLong(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function ReservationWizard() {
  const reducedMotion = usePrefersReducedMotion();

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<string | null>(null);
  const [people, setPeople] = useState(2);
  const [time, setTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(null);
  const [direction, setDirection] = useState(1);

  const today = useMemo(() => new Date(), []);
  const months = useMemo(() => {
    const first = buildMonthGrid(today.getFullYear(), today.getMonth(), today);
    const nextDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const second = buildMonthGrid(nextDate.getFullYear(), nextDate.getMonth(), today);
    return [first, second];
  }, [today]);

  const timeSlots = useMemo(() => (date ? getTimeSlots(date) : []), [date]);

  function goTo(nextStep: number) {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }

  function handleBack() {
    if (step === 0) return;
    goTo(step - 1);
  }

  function handleContinue() {
    if (step === 2) {
      void handleConfirm();
      return;
    }
    if (step < 3) goTo(step + 1);
  }

  async function handleConfirm() {
    if (!date || !time) return;
    setSubmitting(true);
    goTo(3);
    const result = await createReservation({ date, people, time });
    setConfirmation(result);
    setSubmitting(false);
  }

  function handleRestart() {
    setDate(null);
    setPeople(2);
    setTime(null);
    setConfirmation(null);
    setSubmitting(false);
    goTo(0);
  }

  const canContinue =
    (step === 0 && !!date) ||
    (step === 1 && people > 0) ||
    (step === 2 && !!time);

  const variants = reducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({ opacity: 0, x: dir * 12 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: dir * -12 }),
      };

  return (
    <div className="w-full">
      {/* Step indicator */}
      <ol className="mb-14 flex items-center gap-3 sm:gap-6">
        {STEPS.map((label, index) => {
          const isDone = index < step;
          const isCurrent = index === step;
          const isReachable = index < step && !submitting && !confirmation;
          return (
            <li key={label} className="flex items-center gap-3 sm:gap-6">
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && goTo(index)}
                data-cursor-hover={isReachable ? true : undefined}
                className={cn(
                  "flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] transition-colors",
                  isCurrent && "text-[#F1E9DD]",
                  !isCurrent && isDone && "text-[#F1E9DD]/50 hover:text-[#F1E9DD]/80",
                  !isCurrent && !isDone && "text-[#F1E9DD]/30",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
                    isCurrent && "border-[#7C2A2A] bg-[#7C2A2A] text-[#F1E9DD]",
                    !isCurrent && isDone && "border-[#F1E9DD]/40 text-[#F1E9DD]/60",
                    !isCurrent && !isDone && "border-[#F1E9DD]/20 text-[#F1E9DD]/30",
                  )}
                >
                  {isDone ? <Check className="h-3 w-3" /> : index + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {index < STEPS.length - 1 && (
                <span aria-hidden className="h-px w-6 bg-[#F1E9DD]/15 sm:w-10" />
              )}
            </li>
          );
        })}
      </ol>

      <div className="relative min-h-[360px]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reducedMotion ? 0.001 : 0.18, ease: "easeOut" }}
          >
            {step === 0 && (
              <div>
                <Eyebrow>Passo 1</Eyebrow>
                <Display as="h2" className="mt-3 text-3xl sm:text-4xl">
                  Escolha a data
                </Display>

                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  {months.map(({ weeks, label }) => (
                    <div key={label}>
                      <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-[#F1E9DD]/50">
                        {label}
                      </p>
                      <div className="grid grid-cols-7 gap-1.5">
                        {WEEKDAY_LABELS.map((w, i) => (
                          <span
                            key={`${label}-wd-${i}`}
                            className="flex h-7 items-center justify-center font-sans text-[10px] text-[#F1E9DD]/35"
                          >
                            {w}
                          </span>
                        ))}
                        {weeks.flat().map((cell, i) => {
                          if (!cell) return <span key={`${label}-empty-${i}`} />;
                          const isSelected = date === cell.iso;
                          return (
                            <button
                              key={cell.iso}
                              type="button"
                              disabled={cell.isPast}
                              data-cursor-hover={!cell.isPast ? true : undefined}
                              onClick={() => setDate(cell.iso)}
                              className={cn(
                                "flex h-9 items-center justify-center rounded-sm font-sans text-xs transition-colors",
                                cell.isPast && "text-[#F1E9DD]/15",
                                !cell.isPast &&
                                  !isSelected &&
                                  "text-[#F1E9DD]/70 hover:bg-[#F1E9DD]/10",
                                isSelected && "bg-[#7C2A2A] text-[#F1E9DD]",
                              )}
                            >
                              {cell.date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <Eyebrow>Passo 2</Eyebrow>
                <Display as="h2" className="mt-3 text-3xl sm:text-4xl">
                  Quantas pessoas?
                </Display>

                <div className="mt-12 flex items-center gap-8">
                  <button
                    type="button"
                    data-cursor-hover
                    disabled={people <= 1}
                    onClick={() => setPeople((p) => Math.max(1, p - 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F1E9DD]/25 text-[#F1E9DD] transition-colors hover:border-[#7C2A2A] hover:text-[#7C2A2A] disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Diminuir número de pessoas"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-[family-name:var(--font-noir-display)] text-6xl tabular-nums">
                    {people}
                  </span>
                  <button
                    type="button"
                    data-cursor-hover
                    disabled={people >= 10}
                    onClick={() => setPeople((p) => Math.min(10, p + 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F1E9DD]/25 text-[#F1E9DD] transition-colors hover:border-[#7C2A2A] hover:text-[#7C2A2A] disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Aumentar número de pessoas"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#F1E9DD]/50">
                    {people === 1 ? "pessoa" : "pessoas"}
                  </span>
                </div>

                <div className="mt-10 flex flex-wrap gap-2">
                  {[2, 4, 6, 8].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      data-cursor-hover
                      onClick={() => setPeople(preset)}
                      className={cn(
                        "rounded-full border px-4 py-1.5 font-sans text-xs transition-colors",
                        people === preset
                          ? "border-[#7C2A2A] bg-[#7C2A2A] text-[#F1E9DD]"
                          : "border-[#F1E9DD]/20 text-[#F1E9DD]/60 hover:border-[#F1E9DD]/50",
                      )}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && date && (
              <div>
                <Eyebrow>Passo 3</Eyebrow>
                <Display as="h2" className="mt-3 text-3xl sm:text-4xl">
                  Escolha o horário
                </Display>
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.15em] text-[#F1E9DD]/40">
                  {formatDateLong(date)}
                </p>

                <div className="mt-10 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      data-cursor-hover={slot.available ? true : undefined}
                      onClick={() => setTime(slot.time)}
                      className={cn(
                        "rounded-sm border px-4 py-3 font-sans text-sm transition-colors",
                        !slot.available && "border-[#F1E9DD]/5 text-[#F1E9DD]/20 line-through",
                        slot.available &&
                          time !== slot.time &&
                          "border-[#F1E9DD]/20 text-[#F1E9DD]/80 hover:border-[#F1E9DD]/50",
                        slot.available &&
                          time === slot.time &&
                          "border-[#7C2A2A] bg-[#7C2A2A] text-[#F1E9DD]",
                      )}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                {submitting && !confirmation && (
                  <div className="flex flex-col items-center py-16 text-center">
                    <Eyebrow>Confirmando</Eyebrow>
                    <Display as="h2" className="mt-3 text-3xl sm:text-4xl">
                      Preparando sua mesa…
                    </Display>
                    <div className="mt-8 h-px w-24 overflow-hidden bg-[#F1E9DD]/10">
                      <motion.div
                        className="h-full w-1/2 bg-[#7C2A2A]"
                        animate={
                          reducedMotion
                            ? { opacity: [1, 0.4, 1] }
                            : { x: ["-100%", "200%"] }
                        }
                        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                )}

                {confirmation && (
                  <div className="flex flex-col items-center py-8 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#7C2A2A] text-[#7C2A2A]">
                      <Check className="h-5 w-5" />
                    </span>
                    <Eyebrow className="mt-6">Reserva confirmada</Eyebrow>
                    <Display as="h2" className="mt-3 text-4xl sm:text-5xl">
                      {confirmation.code}
                    </Display>

                    <dl className="mt-10 grid w-full max-w-sm grid-cols-2 gap-y-4 border-t border-[#F1E9DD]/10 pt-8 text-left">
                      <dt className="font-sans text-xs uppercase tracking-[0.15em] text-[#F1E9DD]/40">
                        Data
                      </dt>
                      <dd className="text-right font-sans text-sm capitalize text-[#F1E9DD]/80">
                        {formatDateLong(confirmation.selection.date)}
                      </dd>
                      <dt className="font-sans text-xs uppercase tracking-[0.15em] text-[#F1E9DD]/40">
                        Pessoas
                      </dt>
                      <dd className="text-right font-sans text-sm text-[#F1E9DD]/80">
                        {confirmation.selection.people}
                      </dd>
                      <dt className="font-sans text-xs uppercase tracking-[0.15em] text-[#F1E9DD]/40">
                        Horário
                      </dt>
                      <dd className="text-right font-sans text-sm text-[#F1E9DD]/80">
                        {confirmation.selection.time}
                      </dd>
                    </dl>

                    <GhostButton onClick={handleRestart} className="mt-10">
                      Nova reserva
                    </GhostButton>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step < 3 && (
        <div className="mt-12 flex items-center justify-between border-t border-[#F1E9DD]/10 pt-8">
          <GhostButton
            onClick={handleBack}
            disabled={step === 0}
            className={cn(step === 0 && "invisible")}
          >
            Voltar
          </GhostButton>
          <PrimaryButton onClick={handleContinue} disabled={!canContinue}>
            {step === 2 ? "Confirmar reserva" : "Continuar"}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
