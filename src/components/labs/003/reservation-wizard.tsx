"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import {
  AmbiancePanel,
  Display,
  Eyebrow,
  GhostButton,
  NOIR_FOCUS_RING,
  PrimaryButton,
} from "@/components/labs/003/noir-ui";
import { buildMonthGrid, WEEKDAY_LABELS } from "@/components/labs/003/calendar";
import {
  getTimeSlots,
  createReservation,
  TABLES,
  getTableById,
  getTableCapacityMax,
  type ReservationConfirmation,
} from "@/components/labs/003/reservation";

const STEPS = ["Noite", "Mesa", "Horário", "Confirmação"] as const;

function formatDateLong(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/**
 * Every step's ambient panel is retuned from the choices made so far —
 * the point is that "which night", "which table" and "which hour" each
 * visibly shift the room's light, not just the text beside it.
 */
function useAmbiance(
  step: number,
  date: string | null,
  tableId: string | null,
  time: string | null,
  timeSlots: { time: string; available: boolean }[],
) {
  return useMemo(() => {
    const table = getTableById(tableId);

    if (step === 0) {
      if (!date) return { variant: "deep" as const, glowX: 60, glowY: 65, intensity: 0.45 };
      const [y, m, d] = date.split("-").map(Number);
      const weekday = new Date(y, m - 1, d).getDay();
      const isWeekend = weekday === 5 || weekday === 6;
      return isWeekend
        ? { variant: "warm" as const, glowX: 28, glowY: 22, intensity: 1 }
        : { variant: "deep" as const, glowX: 68, glowY: 38, intensity: 0.7 };
    }

    if (step === 1) {
      if (!table) return { variant: "deep" as const, glowX: 50, glowY: 50, intensity: 0.55 };
      return table.mood === "warm"
        ? { variant: "warm" as const, glowX: 24, glowY: 24, intensity: 1 }
        : { variant: "deep" as const, glowX: 72, glowY: 42, intensity: 0.85 };
    }

    if (step === 2) {
      const base = table?.mood ?? "warm";
      if (!time || timeSlots.length === 0) {
        return { variant: base, glowX: base === "warm" ? 28 : 70, glowY: 30, intensity: 0.6 };
      }
      const idx = timeSlots.findIndex((s) => s.time === time);
      const lateness = idx <= 0 ? 0 : idx / Math.max(1, timeSlots.length - 1);
      return {
        variant: base,
        glowX: base === "warm" ? 26 : 70,
        glowY: 20 + lateness * 55,
        intensity: 1 - lateness * 0.55,
      };
    }

    // Confirmation
    return { variant: table?.mood ?? "warm", glowX: 40, glowY: 32, intensity: 1 };
  }, [step, date, tableId, time, timeSlots]);
}

export function ReservationWizard() {
  const reducedMotion = usePrefersReducedMotion();

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<string | null>(null);
  const [tableId, setTableId] = useState<string | null>(null);
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
  const table = getTableById(tableId);
  const maxPeople = table ? getTableCapacityMax(table) : 10;
  const ambiance = useAmbiance(step, date, tableId, time, timeSlots);

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
    if (!date || !time || !tableId) return;
    if (!timeSlots.some((s) => s.time === time && s.available)) return;
    setSubmitting(true);
    goTo(3);
    const result = await createReservation({ date, people, time, tableId });
    setConfirmation(result);
    setSubmitting(false);
  }

  function handleRestart() {
    setDate(null);
    setTableId(null);
    setPeople(2);
    setTime(null);
    setConfirmation(null);
    setSubmitting(false);
    goTo(0);
  }

  const isSelectedTimeAvailable = !time || timeSlots.some((s) => s.time === time && s.available);

  const canContinue =
    (step === 0 && !!date) ||
    (step === 1 && !!tableId && people > 0) ||
    (step === 2 && !!time && isSelectedTimeAvailable);

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
          const stateLabel = isCurrent
            ? "etapa atual"
            : isDone
              ? "concluída"
              : "bloqueada";
          return (
            <li key={label} className="flex items-center gap-3 sm:gap-6">
              <button
                type="button"
                disabled={!isReachable}
                onClick={() => isReachable && goTo(index)}
                data-cursor-hover={isReachable ? true : undefined}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-sm font-sans text-[11px] uppercase tracking-[0.2em] transition-colors",
                  NOIR_FOCUS_RING,
                  isCurrent && "text-[#F1E9DD]",
                  !isCurrent && isDone && "text-[#F1E9DD]/55 hover:text-[#F1E9DD]/80",
                  !isCurrent && !isDone && "text-[#F1E9DD]/30",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
                    isCurrent && "border-[#7C2A2A] bg-[#7C2A2A] text-[#F1E9DD]",
                    !isCurrent && isDone && "border-[#F1E9DD]/40 text-[#F1E9DD]/60",
                    !isCurrent && !isDone && "border-[#F1E9DD]/20 text-[#F1E9DD]/30",
                  )}
                >
                  {isDone ? <Check className="h-3 w-3" /> : index + 1}
                </span>
                <span aria-hidden className="hidden sm:inline">
                  {label}
                </span>
                <span className="sr-only">
                  Passo {index + 1} de {STEPS.length}: {label}, {stateLabel}
                </span>
              </button>
              {index < STEPS.length - 1 && (
                <span aria-hidden className="h-px w-6 bg-[#F1E9DD]/15 sm:w-10" />
              )}
            </li>
          );
        })}
      </ol>

      {step < 3 ? (
        <div className="grid gap-8 sm:grid-cols-[0.9fr_1.3fr] sm:items-stretch sm:gap-12">
          {/* Ambiance rail — retuned per choice, not just decorative */}
          <div className="order-2 sm:order-1">
            <AmbiancePanel
              className="h-40 w-full sm:sticky sm:top-28 sm:h-[420px] lg:h-[480px]"
              variant={ambiance.variant}
              glowX={ambiance.glowX}
              glowY={ambiance.glowY}
              intensity={ambiance.intensity}
            >
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#F1E9DD]/60">
                  {step === 0 && "A noite"}
                  {step === 1 && "A mesa"}
                  {step === 2 && "O horário"}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-noir-display)] text-lg italic text-[#F1E9DD]/85 sm:text-xl">
                  {step === 0 && (date ? formatDateLong(date) : "Ainda por escolher")}
                  {step === 1 && (table ? table.label : "Ainda por escolher")}
                  {step === 2 && (time ? time : "Ainda por escolher")}
                </p>
              </div>
            </AmbiancePanel>
          </div>

          <div className="relative order-1 min-h-[360px] sm:order-2">
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
                      Escolha a noite
                    </Display>

                    <div className="mt-10 grid gap-10 sm:grid-cols-2">
                      {months.map(({ weeks, label }) => (
                        <div key={label}>
                          <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-[#F1E9DD]/55">
                            {label}
                          </p>
                          <div className="grid grid-cols-7 gap-1.5">
                            {WEEKDAY_LABELS.map((w, i) => (
                              <span
                                key={`${label}-wd-${i}`}
                                aria-hidden
                                className="flex h-7 items-center justify-center font-sans text-[10px] text-[#F1E9DD]/55"
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
                                  aria-disabled={cell.isPast || undefined}
                                  aria-current={isSelected ? "date" : undefined}
                                  aria-label={`${formatDateLong(cell.iso)}${
                                    cell.isPast ? ", indisponível" : ""
                                  }`}
                                  data-cursor-hover={!cell.isPast ? true : undefined}
                                  onClick={() => {
                                    if (cell.iso === date) return;
                                    setDate(cell.iso);
                                    // Time slot availability is date-specific — a previously
                                    // chosen hour may not exist/be free on the new night.
                                    setTime(null);
                                  }}
                                  className={cn(
                                    "flex h-9 items-center justify-center rounded-sm font-sans text-xs transition-colors",
                                    NOIR_FOCUS_RING,
                                    cell.isPast && "text-[#F1E9DD]/15",
                                    !cell.isPast &&
                                      !isSelected &&
                                      "text-[#F1E9DD]/70 hover:bg-[#F1E9DD]/10",
                                    isSelected && "bg-[#7C2A2A] text-[#F1E9DD]",
                                  )}
                                >
                                  <span aria-hidden>{cell.date.getDate()}</span>
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
                      Escolha uma mesa
                    </Display>

                    <div className="mt-8 flex flex-col gap-2.5">
                      {TABLES.map((option) => {
                        const isSelected = tableId === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            data-cursor-hover
                            aria-pressed={isSelected}
                            onClick={() => {
                              setTableId(option.id);
                              // A table's capacity is a real ceiling, not decoration —
                              // clamp any already-chosen party size down to fit it.
                              const max = getTableCapacityMax(option);
                              setPeople((p) => Math.min(p, max));
                            }}
                            className={cn(
                              "flex items-start justify-between gap-6 rounded-sm border px-5 py-4 text-left transition-colors",
                              NOIR_FOCUS_RING,
                              isSelected
                                ? "border-[#7C2A2A] bg-[#7C2A2A]/10"
                                : "border-[#F1E9DD]/15 hover:border-[#F1E9DD]/35",
                            )}
                          >
                            <div>
                              <p
                                className={cn(
                                  "font-[family-name:var(--font-noir-display)] text-lg sm:text-xl",
                                  isSelected ? "text-[#F1E9DD]" : "text-[#F1E9DD]/85",
                                )}
                              >
                                {option.label}
                              </p>
                              <p className="mt-1 max-w-sm text-sm leading-relaxed text-[#F1E9DD]/55">
                                {option.description}
                              </p>
                            </div>
                            <span className="shrink-0 pt-1 font-sans text-[11px] uppercase tracking-[0.15em] text-[#F1E9DD]/55">
                              {option.capacity}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-9 flex items-center gap-5 border-t border-[#F1E9DD]/10 pt-8">
                      <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#F1E9DD]/55">
                        Pessoas
                      </span>
                      <button
                        type="button"
                        data-cursor-hover
                        disabled={people <= 1}
                        onClick={() => setPeople((p) => Math.max(1, p - 1))}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border border-[#F1E9DD]/25 text-[#F1E9DD] transition-colors hover:border-[#7C2A2A] hover:text-[#7C2A2A] disabled:cursor-not-allowed disabled:opacity-30",
                          NOIR_FOCUS_RING,
                        )}
                        aria-label="Diminuir número de pessoas"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span
                        className="font-[family-name:var(--font-noir-display)] text-3xl tabular-nums"
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        <span className="sr-only">Número de pessoas: </span>
                        {people}
                      </span>
                      <button
                        type="button"
                        data-cursor-hover
                        disabled={people >= maxPeople}
                        onClick={() => setPeople((p) => Math.min(maxPeople, p + 1))}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border border-[#F1E9DD]/25 text-[#F1E9DD] transition-colors hover:border-[#7C2A2A] hover:text-[#7C2A2A] disabled:cursor-not-allowed disabled:opacity-30",
                          NOIR_FOCUS_RING,
                        )}
                        aria-label="Aumentar número de pessoas"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      {table && (
                        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#F1E9DD]/55">
                          Máx. {maxPeople} nesta mesa
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {step === 2 && date && (
                  <div>
                    <Eyebrow>Passo 3</Eyebrow>
                    <Display as="h2" className="mt-3 text-3xl sm:text-4xl">
                      Escolha o horário
                    </Display>
                    <p className="mt-2 font-sans text-xs uppercase tracking-[0.15em] text-[#F1E9DD]/55">
                      {formatDateLong(date)} · {table?.label}
                    </p>

                    <div className="mt-10 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          aria-disabled={!slot.available || undefined}
                          aria-pressed={slot.available ? time === slot.time : undefined}
                          aria-label={
                            slot.available ? undefined : `${slot.time}, indisponível`
                          }
                          data-cursor-hover={slot.available ? true : undefined}
                          onClick={() => setTime(slot.time)}
                          className={cn(
                            "rounded-sm border px-4 py-3 font-sans text-sm transition-colors",
                            NOIR_FOCUS_RING,
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="relative" role="status" aria-live="polite">
          {submitting && !confirmation && (
            <div className="flex flex-col items-center py-16 text-center">
              <Eyebrow>Confirmando</Eyebrow>
              <Display as="h2" className="mt-3 text-3xl sm:text-4xl">
                Preparando {table ? `a ${table.label}` : "sua mesa"}…
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
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reducedMotion ? 0.001 : 0.4, ease: "easeOut" }}
              className="relative mx-auto max-w-md py-6"
            >
              <AmbiancePanel
                className="absolute inset-0 -z-10"
                variant={ambiance.variant}
                glowX={ambiance.glowX}
                glowY={ambiance.glowY}
                intensity={ambiance.intensity}
              />

              {/* The reservation card — an engraved keepsake, not a toast */}
              <div className="relative border border-[#F1E9DD]/25 bg-[#0D0B0A]/70 px-8 py-12 backdrop-blur-sm sm:px-12 sm:py-14">
                <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[#7C2A2A]/70" />
                <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[#7C2A2A]/70" />
                <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-[#7C2A2A]/70" />
                <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#7C2A2A]/70" />

                <div className="flex flex-col items-center text-center">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7C2A2A] text-[#7C2A2A]"
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <Eyebrow className="mt-6">Reserva confirmada</Eyebrow>
                  <Display as="h2" className="mt-3 text-4xl tracking-[0.02em] sm:text-5xl">
                    {confirmation.code}
                  </Display>
                </div>

                <div className="mx-auto mt-10 h-px w-full bg-[#F1E9DD]/10" />

                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
                  <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#F1E9DD]/55">
                    Noite
                  </dt>
                  <dd className="text-right font-[family-name:var(--font-noir-display)] text-base capitalize text-[#F1E9DD]/90">
                    {formatDateLong(confirmation.selection.date)}
                  </dd>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#F1E9DD]/55">
                    Mesa
                  </dt>
                  <dd className="text-right font-[family-name:var(--font-noir-display)] text-base text-[#F1E9DD]/90">
                    {getTableById(confirmation.selection.tableId)?.label ?? "—"}
                  </dd>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#F1E9DD]/55">
                    Horário
                  </dt>
                  <dd className="text-right font-[family-name:var(--font-noir-display)] text-base text-[#F1E9DD]/90">
                    {confirmation.selection.time}
                  </dd>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#F1E9DD]/55">
                    Pessoas
                  </dt>
                  <dd className="text-right font-[family-name:var(--font-noir-display)] text-base text-[#F1E9DD]/90">
                    {confirmation.selection.people}
                  </dd>
                </dl>

                <div className="mt-11 flex justify-center">
                  <GhostButton onClick={handleRestart}>Nova reserva</GhostButton>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

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
