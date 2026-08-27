"use client";

import { useActionState } from "react";
import { Logo } from "@/components/logo";
import { loginAction, type LoginState } from "@/lib/admin-actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 text-paper">
          <Logo className="h-6 w-6 text-accent" />
          <span className="font-display text-sm font-semibold uppercase tracking-[0.15em]">
            ALUMNA / Admin
          </span>
        </div>

        <form action={formAction} className="mt-10 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
              Senha
            </span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
            />
          </label>

          {state?.error && (
            <p className="text-sm text-accent">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            data-cursor-hover
            className="mt-2 flex items-center justify-center gap-3 bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-paper disabled:opacity-50"
          >
            {pending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
