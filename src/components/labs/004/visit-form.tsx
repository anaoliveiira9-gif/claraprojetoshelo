"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { serif } from "./theme";

export function VisitForm({ propertyTitulo }: { propertyTitulo: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [nome, setNome] = useState("");
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("done");
  }

  // Move focus to the confirmation heading once it appears, so keyboard and
  // screen-reader users — left focused on a submit button that just vanished
  // from the DOM — land somewhere that announces the outcome. `role="status"`
  // + `aria-live` also covers anyone not tracking focus (e.g. braille users).
  useEffect(() => {
    if (status === "done") {
      confirmationHeadingRef.current?.focus();
    }
  }, [status]);

  if (status === "done") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-3 rounded-sm border border-[#2F4A3B]/30 bg-[#2F4A3B]/5 p-6"
      >
        <CheckCircle2 className="h-6 w-6 text-[#2F4A3B]" aria-hidden="true" />
        <h3
          ref={confirmationHeadingRef}
          tabIndex={-1}
          className={`${serif} text-xl text-[#241E1A] focus:outline-none`}
        >
          Visita solicitada
        </h3>
        <p className="text-sm text-[#6B6157]">
          {nome ? `${nome}, recebemos` : "Recebemos"} seu pedido de visita para{" "}
          <span className="text-[#241E1A]">{propertyTitulo}</span>. Nossa equipe entrará em
          contato em breve para confirmar o horário.
        </p>
        <button
          type="button"
          data-cursor-hover
          onClick={() => setStatus("idle")}
          className="text-xs uppercase tracking-[0.16em] text-[#6B6157] underline underline-offset-4 hover:text-[#241E1A]"
        >
          Agendar outra visita
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-sm border border-[#DDD5C8] bg-[#F8F5F0] p-6 sm:grid-cols-2"
    >
      <label className="block sm:col-span-1">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">Nome</span>
        <input
          required
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1.5 text-sm text-[#241E1A] focus:border-[#2F4A3B] focus:outline-none"
        />
      </label>

      <label className="block sm:col-span-1">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
          E-mail
        </span>
        <input
          required
          type="email"
          className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1.5 text-sm text-[#241E1A] focus:border-[#2F4A3B] focus:outline-none"
        />
      </label>

      <label className="block sm:col-span-1">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
          Telefone
        </span>
        <input
          required
          type="tel"
          placeholder="(11) 99999-0000"
          className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1.5 text-sm text-[#241E1A] placeholder:text-[#6B6157]/60 focus:border-[#2F4A3B] focus:outline-none"
        />
      </label>

      <label className="block sm:col-span-1">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#6B6157]">
          Data preferida
        </span>
        <input
          required
          type="date"
          className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1.5 text-sm text-[#241E1A] focus:border-[#2F4A3B] focus:outline-none"
        />
      </label>

      <button
        type="submit"
        aria-disabled={status === "loading"}
        aria-live="polite"
        data-cursor-hover
        className={cn(
          "mt-2 inline-flex w-fit items-center rounded-sm bg-[#2F4A3B] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#F8F5F0] transition-opacity hover:opacity-90 sm:col-span-2",
          status === "loading" && "opacity-60",
        )}
      >
        {status === "loading" ? "Enviando…" : "Solicitar visita"}
      </button>
    </form>
  );
}
