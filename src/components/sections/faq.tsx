"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/components/site-content-provider";

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        data-cursor-hover
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span
          className={cn(
            "font-display text-base font-medium tracking-tight transition-colors sm:text-lg",
            isOpen ? "text-accent" : "text-paper"
          )}
        >
          {item.question}
        </span>
        <span
          className={cn(
            "shrink-0 font-mono text-lg leading-none text-paper-faint transition-transform duration-200",
            isOpen && "rotate-45 text-accent"
          )}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 text-sm leading-relaxed text-paper-dim">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const { faq } = useSiteContent();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="border-b border-line px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="05" label="Perguntas Frequentes" />
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-paper-dim">
          As dúvidas mais comuns de quem está avaliando começar um projeto
          com a ALUMNA.
        </p>

        <div className="mt-14 max-w-3xl border-t border-line">
          {faq.map((item, i) => (
            <Reveal key={item.question} delay={Math.min(i, 6) * 0.02}>
              <FaqItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
