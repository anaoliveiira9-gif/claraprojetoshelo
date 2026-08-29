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
import { useSiteContent } from "@/components/site-content-provider";

type ProcessStep = { n: string; title: string; desc: string };

const STEP_COUNT = 5;

function StepList({
  steps,
  activeStep,
  displayStep,
  onSelect,
  onPreview,
  onPreviewEnd,
}: {
  steps: ProcessStep[];
  activeStep: number;
  displayStep: number;
  onSelect: (i: number) => void;
  onPreview: (i: number) => void;
  onPreviewEnd: () => void;
}) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => {
        const isActive = i === displayStep;
        const isDone = i < activeStep;
        return (
          <button
            key={step.n}
            type="button"
            data-cursor-hover
            onClick={() => onSelect(i)}
            onMouseEnter={() => onPreview(i)}
            onMouseLeave={onPreviewEnd}
            onFocus={() => onPreview(i)}
            onBlur={onPreviewEnd}
            className="flex gap-4 text-left sm:gap-5"
          >
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "font-mono text-xs transition-colors duration-200",
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
                "pb-8 transition-opacity duration-200",
                isActive ? "opacity-100" : "opacity-40"
              )}
            >
              <p
                className={cn(
                  "font-display text-xl font-semibold uppercase tracking-tight transition-colors duration-200 sm:text-2xl",
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
          </button>
        );
      })}
    </div>
  );
}

function ScrollDrivenProcess({ steps }: { steps: ProcessStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [previewStep, setPreviewStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const stepProgress = useTransform(scrollYProgress, (v) =>
    Math.min(STEP_COUNT - 1, Math.floor(v * STEP_COUNT))
  );

  useMotionValueEvent(stepProgress, "change", (v) => setActiveStep(v));

  function jumpToStep(i: number) {
    const container = containerRef.current;
    if (!container) return;
    const frac = (i + 0.5) / STEP_COUNT;
    const top = container.getBoundingClientRect().top + window.scrollY;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + frac * scrollableHeight,
      behavior: "smooth",
    });
  }

  const displayStep = previewStep ?? activeStep;

  return (
    <div ref={containerRef} className="relative h-[380vh]">
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] max-h-[720px] flex-col justify-center">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <StepList
            steps={steps}
            activeStep={activeStep}
            displayStep={displayStep}
            onSelect={jumpToStep}
            onPreview={setPreviewStep}
            onPreviewEnd={() => setPreviewStep(null)}
          />

          <div className="h-[300px] sm:h-[380px] lg:h-[440px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={displayStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full"
              >
                <ProcessCanvas step={displayStep} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticProcess({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="flex flex-col gap-16">
      {steps.map((step, i) => (
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
  const { howWeWork } = useSiteContent();
  const steps: ProcessStep[] = howWeWork.steps.map((step, i) => ({
    n: String(i + 1).padStart(2, "0"),
    title: step.title,
    desc: step.description,
  }));

  return (
    <section id="how-we-work" className="border-b border-line px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="01" label={howWeWork.label} />
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper-dim">
          {howWeWork.description}
        </p>

        <div className="mt-16">
          {reducedMotion ? (
            <StaticProcess steps={steps} />
          ) : (
            <ScrollDrivenProcess steps={steps} />
          )}
        </div>
      </div>
    </section>
  );
}
