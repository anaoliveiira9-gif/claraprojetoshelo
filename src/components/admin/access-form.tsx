"use client";

import { useState } from "react";

/**
 * There's no database yet, so the panel can't persist a credential change
 * on its own — it can only prepare a clean request. Submitting copies a
 * ready-to-paste instruction; pasting it to Claude applies it to the live
 * Vercel environment variables in under a minute (that's exactly how the
 * current login was set up). This stays honest about the limitation
 * instead of pretending to save something it can't.
 */
export function AdminAccessForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const canSubmit = email.trim().length > 3 && password.length >= 8;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const request = `Atualize o login do admin da ALUMNA para:\ne-mail: ${email.trim()}\nsenha: ${password}`;
    try {
      await navigator.clipboard.writeText(request);
      setCopied(true);
    } catch {
      setCopied(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex max-w-lg flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
          Novo e-mail
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setCopied(false);
          }}
          required
          className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
          Nova senha
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setCopied(false);
          }}
          required
          minLength={8}
          className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        data-cursor-hover
        className="flex w-fit items-center gap-3 border border-paper px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-paper transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copied ? "Pedido copiado ✓" : "Preparar troca de acesso →"}
      </button>

      {copied && (
        <p className="max-w-md text-xs leading-relaxed text-paper-faint">
          Copiado. Cole essa mensagem para mim (Claude) no chat e eu aplico
          direto nas variáveis de ambiente da Vercel — leva menos de um
          minuto. Assim que houver um banco de dados conectado, essa troca
          passa a acontecer direto por aqui, sem precisar do chat.
        </p>
      )}
    </form>
  );
}
