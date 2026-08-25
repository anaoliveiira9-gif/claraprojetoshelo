"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { serif } from "./theme";

export function VisitForm({ propertyTitulo }: { propertyTitulo: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [nome, setNome] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-sm border border-[#2F4A3B]/30 bg-[#2F4A3B]/5 p-6">
        <CheckCircle2 className="h-6 w-6 text-[#2F4A3B]" />
        <h3 className={`${serif} text-xl text-[#241E1A]`}>Visita solicitada</h3>
        <p className="text-sm text-[#7A6F63]">
          {nome ? `${nome}, recebemos` : "Recebemos"} seu pedido de visita para{" "}
          <span className="text-[#241E1A]">{propertyTitulo}</span>. Nossa equipe entrará em
          contato em breve para confirmar o horário.
        </p>
        <button
          type="button"
          data-cursor-hover
          onClick={() => setStatus("idle")}
          className="text-xs uppercase tracking-[0.16em] text-[#7A6F63] underline underline-offset-4 hover:text-[#241E1A]"
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
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#7A6F63]">Nome</span>
        <input
          required
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1.5 text-sm text-[#241E1A] focus:border-[#2F4A3B] focus:outline-none"
        />
      </label>

      <label className="block sm:col-span-1">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#7A6F63]">
          E-mail
        </span>
        <input
          required
          type="email"
          className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1.5 text-sm text-[#241E1A] focus:border-[#2F4A3B] focus:outline-none"
        />
      </label>

      <label className="block sm:col-span-1">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#7A6F63]">
          Telefone
        </span>
        <input
          required
          type="tel"
          placeholder="(11) 99999-0000"
          className="mt-1 w-full border-b border-[#DDD5C8] bg-transparent pb-1.5 text-sm text-[#241E1A] placeholder:text-[#7A6F63]/60 focus:border-[#2F4A3B] focus:outline-none"
        />
      </label>

      <label className="block sm:col-span-1">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-[#7A6F63]">
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
        disabled={status === "loading"}
        data-cursor-hover
        className="mt-2 inline-flex w-fit items-center rounded-sm bg-[#2F4A3B] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#F8F5F0] transition-opacity hover:opacity-90 disabled:opacity-60 sm:col-span-2"
      >
        {status === "loading" ? "Enviando…" : "Solicitar visita"}
      </button>
    </form>
  );
}
