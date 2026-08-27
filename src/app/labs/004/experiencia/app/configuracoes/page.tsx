"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useOrbitTheme } from "@/components/labs/004/theme";

export default function OrbitConfiguracoesPage() {
  const { theme, toggle } = useOrbitTheme();
  const [empresa, setEmpresa] = useState("Ferronova Metalúrgica Ltda.");
  const [fuso, setFuso] = useState("America/Sao_Paulo");
  const [idioma, setIdioma] = useState("pt-BR");
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--orbit-ink)]">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-[var(--orbit-secondary)]">
          Preferências da conta e da organização.
        </p>
      </div>

      <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </span>
            <div>
              <p className="text-sm font-medium text-[var(--orbit-ink)]">Aparência</p>
              <p className="text-xs text-[var(--orbit-secondary)]">
                {theme === "dark" ? "Tema escuro ativado" : "Tema claro ativado"}
              </p>
            </div>
          </div>
          <button
            type="button"
            data-cursor-hover
            onClick={toggle}
            className="rounded-md border border-[var(--orbit-border)] px-3 py-1.5 text-xs font-medium text-[var(--orbit-ink)] transition-colors hover:border-[var(--orbit-accent)]"
          >
            Alternar para {theme === "dark" ? "claro" : "escuro"}
          </button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
        className="flex flex-col gap-4 rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4"
      >
        <h2 className="text-sm font-semibold text-[var(--orbit-ink)]">Organização</h2>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[var(--orbit-secondary)]">
            Nome da empresa
          </span>
          <input
            value={empresa}
            onChange={(e) => {
              setEmpresa(e.target.value);
              setSaved(false);
            }}
            className="rounded-md border border-[var(--orbit-border)] bg-[var(--orbit-bg)] px-3 py-2 text-sm text-[var(--orbit-ink)] outline-none focus:border-[var(--orbit-accent)]"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[var(--orbit-secondary)]">Fuso horário</span>
          <select
            value={fuso}
            onChange={(e) => {
              setFuso(e.target.value);
              setSaved(false);
            }}
            className="rounded-md border border-[var(--orbit-border)] bg-[var(--orbit-bg)] px-3 py-2 text-sm text-[var(--orbit-ink)] outline-none focus:border-[var(--orbit-accent)]"
          >
            <option value="America/Sao_Paulo">América/São Paulo (GMT-3)</option>
            <option value="America/Manaus">América/Manaus (GMT-4)</option>
            <option value="America/Noronha">América/Noronha (GMT-2)</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[var(--orbit-secondary)]">Idioma</span>
          <select
            value={idioma}
            onChange={(e) => {
              setIdioma(e.target.value);
              setSaved(false);
            }}
            className="rounded-md border border-[var(--orbit-border)] bg-[var(--orbit-bg)] px-3 py-2 text-sm text-[var(--orbit-ink)] outline-none focus:border-[var(--orbit-accent)]"
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
            <option value="es-ES">Español</option>
          </select>
        </label>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            data-cursor-hover
            className="rounded-md bg-[var(--orbit-accent)] px-3.5 py-2 text-sm font-medium text-[var(--orbit-accent-ink)] transition-opacity hover:opacity-90"
          >
            Salvar alterações
          </button>
          {saved ? (
            <span className="text-xs text-[var(--orbit-accent)]">Preferências salvas.</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
