"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { SectionLabel } from "@/components/section-label";
import { ProcessCanvas } from "@/components/process-canvas";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Descobrir",
    desc: "Entendemos marca, objetivo e público antes de desenhar qualquer tela.",
  },
  {
    n: "02",
    title: "Estruturar",
    desc: "Mapeamos páginas, fluxos e prioridades em um esqueleto claro.",
  },
  {
    n: "03",
    title: "Projetar",
    desc: "Desenhamos a interface com tipografia, grid e identidade aplicados.",
  },
  {
    n: "04",
    title: "Construir",
    desc: "Desenvolvemos com código limpo, performance e testes reais.",
  },
  {
    n: "05",
    title: "Lançar",
    desc: "Publicamos, validamos e entregamos um produto pronto para crescer.",
  },
] as const;

const STEP_COUNT = PROCESS_STEPS.length;

function StepList({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex flex-col gap-0">
      {PROCESS_STEPS.map((step, i) => {
        const isActive = i === activeStep;
        const isDone = i < activeStep;
        return (
          <div key={step.n} className="flex gap-4 sm:gap-5">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "font-mono text-xs transition-colors duration-300",
                  isActive || isDone ? "text-accent" : "text-paper-faint"
                )}
              >
                {step.n}
              </span>
              {i < STEP_COUNT - 1 && (
                <span className="relative my-1.5 w-px flex-1 bg-line">
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 w-px bg-accent transition-[height] duration-300",
                      isDone ? "h-full" : "h-0"
                    )}
                  />
                </span>
              )}
            </div>
            <div
              className={cn(
                "pb-8 transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-40"
              )}
            >
              <p
                className={cn(
                  "font-display text-xl font-semibold uppercase tracking-tight transition-colors duration-300 sm:text-2xl",
                  isActive ? "text-paper" : "text-paper-dim"
                )}
              >
                {step.title}
              </p>
              {isActive && (
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper-dim">
                  {step.desc}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ScrollDrivenProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stepProgress = useTransform(scrollYProgress, (v) =>
    Math.min(STEP_COUNT - 1, Math.floor(v * STEP_COUNT))
  );

  useMotionValueEvent(stepProgress, "change", (v) => setActiveStep(v));

  return (
    <div ref={containerRef} className="relative h-[380vh]">
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] max-h-[720px] flex-col justify-center">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <StepList activeStep={activeStep} />

          <div className="h-[300px] sm:h-[380px] lg:h-[440px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
              >
                <ProcessCanvas step={activeStep} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticProcess() {
  return (
    <div className="flex flex-col gap-16">
      {PROCESS_STEPS.map((step, i) => (
        <div
          key={step.n}
          className="grid gap-8 border-t border-line pt-8 sm:grid-cols-[200px_1fr] sm:gap-12"
        >
          <div>
            <span className="font-mono text-xs text-accent">{step.n}</span>
            <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight">
              {step.title}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper-dim">
              {step.desc}
            </p>
          </div>
          <div className="h-[280px] sm:h-[340px]">
            <ProcessCanvas step={i} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HowWeWork() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="border-b border-line px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="02" label="Como Construímos" />
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper-dim">
          Do briefing ao produto final — cada projeto passa pelas mesmas
          cinco etapas, sem atalhos.
        </p>

        <div className="mt-16">
          {reducedMotion ? <StaticProcess /> : <ScrollDrivenProcess />}
        </div>
      </div>
    </section>
  );
}
