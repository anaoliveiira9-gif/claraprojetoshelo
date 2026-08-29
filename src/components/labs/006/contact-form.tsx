"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F1F0EB]";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const successHeadingRef = useRef<HTMLParagraphElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  // Move focus to the success message when it appears, and back to the
  // first field when the form reappears after "Enviar outra mensagem" —
  // otherwise the clicked button unmounts and keyboard/screen-reader focus
  // is silently lost to the document body. Skip on initial mount.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (submitted) {
      successHeadingRef.current?.focus();
    } else {
      nameInputRef.current?.focus();
    }
  }, [submitted]);

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-3 border border-[#161615] bg-[#F1F0EB] px-6 py-10 sm:px-10"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#2E4A5E] text-[#2E4A5E]">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <p
          ref={successHeadingRef}
          tabIndex={-1}
          className="text-xl font-bold uppercase tracking-tight outline-none"
        >
          Mensagem enviada
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-[#161615]/70">
          Obrigado{name ? `, ${name.split(" ")[0]}` : ""}. Este é um demo de
          portfólio — nenhum dado foi enviado de verdade — mas em um projeto
          real nossa equipe responderia em até dois dias úteis.
        </p>
        <button
          type="button"
          data-cursor-hover
          onClick={() => {
            setSubmitted(false);
            setName("");
          }}
          className={`mt-2 [font-family:var(--font-atelier-mono)] text-xs uppercase tracking-[0.15em] text-[#2E4A5E] underline underline-offset-4 hover:text-[#161615] ${FOCUS_RING}`}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[#161615]/20 bg-[#F1F0EB] p-6 sm:p-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.15em] text-[#161615]/65">
            Nome
          </span>
          <input
            ref={nameInputRef}
            required
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Seu nome"
            className={`border-b border-[#161615]/30 bg-transparent py-2 text-base text-[#161615] transition-colors placeholder:text-[#161615]/35 focus:border-[#2E4A5E] ${FOCUS_RING}`}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.15em] text-[#161615]/65">
            E-mail
          </span>
          <input
            required
            type="email"
            placeholder="voce@email.com"
            className={`border-b border-[#161615]/30 bg-transparent py-2 text-base text-[#161615] transition-colors placeholder:text-[#161615]/35 focus:border-[#2E4A5E] ${FOCUS_RING}`}
          />
        </label>
      </div>

      <label className="mt-6 flex flex-col gap-2">
        <span className="[font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.15em] text-[#161615]/65">
          Mensagem
        </span>
        <textarea
          required
          rows={4}
          placeholder="Conte um pouco sobre o projeto…"
          className={`resize-none border-b border-[#161615]/30 bg-transparent py-2 text-base text-[#161615] transition-colors placeholder:text-[#161615]/35 focus:border-[#2E4A5E] ${FOCUS_RING}`}
        />
      </label>

      <button
        type="submit"
        data-cursor-hover
        className={`group mt-8 flex items-center gap-2 border border-[#161615] px-6 py-3 [font-family:var(--font-atelier-mono)] text-xs uppercase tracking-[0.15em] transition-colors hover:border-[#2E4A5E] hover:text-[#2E4A5E] ${FOCUS_RING}`}
      >
        Enviar mensagem
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </button>
    </form>
  );
}
