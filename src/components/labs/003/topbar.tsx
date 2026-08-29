"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    title: "Automação concluída",
    detail: "“Reconciliação diária” processou 214 registros sem erros.",
    time: "há 12 min",
  },
  {
    title: "Processo atrasado",
    detail: "PR-1045 — Reprocessamento de pedidos falhos venceu ontem.",
    time: "há 3 h",
  },
  {
    title: "Novo integrante",
    detail: "Felipe Ramos foi adicionado à área de Operações.",
    time: "há 1 dia",
  },
  {
    title: "Limite de fila",
    detail: "A fila de integrações atingiu 82% da capacidade configurada.",
    time: "há 2 dias",
  },
];

function useClickOutside(onOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOutside]);
  return ref;
}

/** Closes the dropdown on Escape and returns focus to its trigger button. */
function useCloseOnEscape(
  open: boolean,
  onClose: () => void,
  triggerRef: { current: HTMLButtonElement | null },
) {
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose, triggerRef]);
}

export function OrbitTopbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useClickOutside(() => setNotifOpen(false));
  const profileRef = useClickOutside(() => setProfileOpen(false));
  const notifTriggerRef = useRef<HTMLButtonElement>(null);
  const profileTriggerRef = useRef<HTMLButtonElement>(null);
  useCloseOnEscape(notifOpen, () => setNotifOpen(false), notifTriggerRef);
  useCloseOnEscape(profileOpen, () => setProfileOpen(false), profileTriggerRef);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[var(--orbit-border)] bg-[var(--orbit-surface)] px-4 sm:px-6">
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--orbit-secondary)]" />
        <input
          type="search"
          aria-label="Buscar processos, automações"
          placeholder="Buscar processos, automações…"
          className="w-full rounded-md border border-[var(--orbit-border)] bg-[var(--orbit-bg)] py-1.5 pl-8 pr-3 text-sm text-[var(--orbit-ink)] outline-none placeholder:text-[var(--orbit-secondary)] focus:border-[var(--orbit-accent)]"
        />
      </div>

      <div className="flex items-center gap-2">
        <div ref={notifRef} className="relative">
          <button
            ref={notifTriggerRef}
            type="button"
            data-cursor-hover
            aria-label={notifOpen ? "Fechar notificações" : `Notificações (${NOTIFICATIONS.length} novas)`}
            aria-expanded={notifOpen}
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-[var(--orbit-secondary)] transition-colors hover:border-[var(--orbit-border)] hover:text-[var(--orbit-ink)]",
              notifOpen && "border-[var(--orbit-border)] text-[var(--orbit-ink)]",
            )}
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--orbit-accent)]" aria-hidden="true" />
          </button>
          {notifOpen ? (
            <div
              role="group"
              aria-labelledby="orbit-notif-heading"
              className="absolute right-0 z-20 mt-2 w-80 rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)]"
            >
              <p
                id="orbit-notif-heading"
                className="px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--orbit-secondary)]"
              >
                Notificações
              </p>
              <ul className="flex flex-col">
                {NOTIFICATIONS.map((n, i) => (
                  <li
                    key={i}
                    className="rounded-md px-2.5 py-2 transition-colors hover:bg-[var(--orbit-bg)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-[var(--orbit-ink)]">{n.title}</p>
                      <span className="shrink-0 font-[family-name:var(--font-jetbrains)] text-[10px] tabular-nums text-[var(--orbit-secondary)]">
                        {n.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--orbit-secondary)]">
                      {n.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div ref={profileRef} className="relative">
          <button
            ref={profileTriggerRef}
            type="button"
            data-cursor-hover
            aria-label="Menu do perfil — Heloísa Souza"
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-[var(--orbit-bg)]"
          >
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--orbit-accent)] font-[family-name:var(--font-jetbrains)] text-xs font-medium text-[var(--orbit-accent-ink)]"
            >
              HS
            </span>
            <span className="hidden text-sm text-[var(--orbit-ink)] sm:inline">Heloísa Souza</span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-[var(--orbit-secondary)] sm:inline" aria-hidden="true" />
          </button>
          {profileOpen ? (
            <div
              role="menu"
              aria-label="Menu do perfil"
              className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)]"
            >
              <Link
                href="/labs/003/experiencia/app/perfil"
                role="menuitem"
                data-cursor-hover
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-[var(--orbit-ink)] transition-colors hover:bg-[var(--orbit-bg)]"
              >
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                Perfil
              </Link>
              <Link
                href="/labs/003/experiencia"
                role="menuitem"
                data-cursor-hover
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm text-[var(--orbit-secondary)] transition-colors hover:bg-[var(--orbit-bg)] hover:text-[var(--orbit-ink)]"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                Sair
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
