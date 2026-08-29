"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type EventKind = "success" | "warning" | "info";

type ActivityEvent = {
  id: string;
  text: string;
  area: string;
  kind: EventKind;
  time: string;
};

const SEED_EVENTS: ActivityEvent[] = [
  {
    id: "seed-1",
    text: "Automação “Reconciliação diária” concluiu 214 registros sem erros.",
    area: "Financeiro",
    kind: "success",
    time: "há 2 min",
  },
  {
    id: "seed-2",
    text: "PR-1049 — Integração API logística Nexlog avançou para 72%.",
    area: "TI",
    kind: "info",
    time: "há 6 min",
  },
  {
    id: "seed-3",
    text: "Fila de integrações atingiu 82% da capacidade configurada.",
    area: "Operações",
    kind: "warning",
    time: "há 11 min",
  },
  {
    id: "seed-4",
    text: "Bianca Ferreira concluiu “Auditoria de acessos internos”.",
    area: "TI",
    kind: "success",
    time: "há 24 min",
  },
];

const EVENT_POOL: Omit<ActivityEvent, "id" | "time">[] = [
  {
    text: "Automação “Sincronização de estoque” executou sem erros.",
    area: "Operações",
    kind: "success",
  },
  {
    text: "PR-1042 — Reconciliação de faturas Q3 avançou para 68%.",
    area: "Financeiro",
    kind: "info",
  },
  {
    text: "Novo processo criado: “Auditoria de fornecedores Q3”.",
    area: "Compras",
    kind: "info",
  },
  {
    text: "PR-1045 ultrapassou o prazo estipulado.",
    area: "Operações",
    kind: "warning",
  },
  {
    text: "Marina Alves atualizou o status de “Fechamento contábil mensal”.",
    area: "Financeiro",
    kind: "info",
  },
  {
    text: "Automação “Alerta de processo atrasado” disparou 1 notificação.",
    area: "Operações",
    kind: "warning",
  },
  {
    text: "Felipe Ramos concluiu “Revisão de backups críticos”.",
    area: "TI",
    kind: "success",
  },
  {
    text: "Novo integrante adicionado à área Comercial.",
    area: "Comercial",
    kind: "info",
  },
];

const KIND_STYLES: Record<EventKind, { icon: typeof Info; className: string }> = {
  success: { icon: CheckCircle2, className: "bg-[var(--orbit-accent)]/10 text-[var(--orbit-accent)]" },
  warning: { icon: AlertTriangle, className: "bg-[var(--orbit-negative)]/10 text-[var(--orbit-negative)]" },
  info: { icon: Info, className: "bg-[var(--orbit-secondary)]/15 text-[var(--orbit-secondary)]" },
};

const MAX_EVENTS = 6;

export function ActivityFeed() {
  const reduced = usePrefersReducedMotion();
  const [events, setEvents] = useState<ActivityEvent[]>(SEED_EVENTS.slice(0, MAX_EVENTS));
  const counter = useRef(0);

  useEffect(() => {
    const delay = 6000 + Math.random() * 4000;
    const interval = setInterval(() => {
      const pick = EVENT_POOL[Math.floor(Math.random() * EVENT_POOL.length)];
      counter.current += 1;
      setEvents((prev) => [
        { ...pick, id: `live-${counter.current}-${Date.now()}`, time: "agora" },
        ...prev,
      ].slice(0, MAX_EVENTS));
    }, delay);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--orbit-ink)]">Atividade em tempo real</h2>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-[var(--orbit-secondary)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orbit-accent)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orbit-accent)]" />
          </span>
          ao vivo
        </span>
      </div>

      <ul className="flex flex-col gap-1" aria-live="polite" aria-atomic="false">
        <AnimatePresence initial={false}>
          {events.map((event) => {
            const style = KIND_STYLES[event.kind];
            const Icon = style.icon;
            return (
              <motion.li
                key={event.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-2.5 rounded-md px-1.5 py-2"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    style.className,
                  )}
                >
                  <Icon className="h-3 w-3" strokeWidth={2.25} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed text-[var(--orbit-ink)]">{event.text}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[var(--orbit-secondary)]">
                    <span>{event.area}</span>
                    <span>·</span>
                    <span className="font-[family-name:var(--font-jetbrains)] tabular-nums">
                      {event.time}
                    </span>
                  </p>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
