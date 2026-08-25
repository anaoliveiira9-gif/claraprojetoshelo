"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { OrbitMark } from "@/components/labs/004/logo";

export default function OrbitLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !senha.trim()) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }
    router.push("/labs/004/experiencia/app");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)]">
            <OrbitMark className="h-5 w-5 text-[var(--orbit-accent)]" />
          </span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-[var(--orbit-ink)]">
              Entrar no Orbit
            </h1>
            <p className="mt-1 text-sm text-[var(--orbit-secondary)]">
              Inteligência operacional para o seu time.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-6"
        >
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[var(--orbit-secondary)]">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@empresa.com"
                autoComplete="email"
                className="rounded-md border border-[var(--orbit-border)] bg-[var(--orbit-bg)] px-3 py-2 text-sm text-[var(--orbit-ink)] outline-none placeholder:text-[var(--orbit-secondary)] focus:border-[var(--orbit-accent)]"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[var(--orbit-secondary)]">Senha</span>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="rounded-md border border-[var(--orbit-border)] bg-[var(--orbit-bg)] px-3 py-2 text-sm text-[var(--orbit-ink)] outline-none placeholder:text-[var(--orbit-secondary)] focus:border-[var(--orbit-accent)]"
              />
            </label>

            {error ? (
              <p className="text-xs text-[var(--orbit-negative)]">{error}</p>
            ) : null}

            <button
              type="submit"
              data-cursor-hover
              className="mt-1 rounded-md bg-[var(--orbit-accent)] py-2 text-sm font-medium text-[var(--orbit-accent-ink)] transition-opacity hover:opacity-90"
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-[var(--orbit-secondary)]">
          Ambiente de demonstração — qualquer credencial preenchida dá acesso.
        </p>
      </div>
    </main>
  );
}
