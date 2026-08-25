"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, CalendarCheck, MapPinned, Sparkles, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const NOTIFICATIONS = [
  {
    id: "n1",
    icon: CalendarCheck,
    title: "Sua reserva foi confirmada",
    body: "Feira do Largo, sábado às 11h. Nos vemos lá!",
    time: "há 2h",
  },
  {
    id: "n2",
    icon: MapPinned,
    title: "Novo evento perto de você",
    body: "Sarau de Vinil acabou de entrar em cartaz na Vila Baixa.",
    time: "há 5h",
  },
  {
    id: "n3",
    icon: Sparkles,
    title: "Selecionado para você",
    body: "Com base nos seus favoritos: Trilha do Mirante Verde.",
    time: "ontem",
  },
];

export function NovaNotificationsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Fechar notificações"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-40 bg-[#1A1712]/40"
          />
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-3 bottom-3 z-50 overflow-hidden rounded-2xl border border-[#EAE3D6] bg-[#FAF7F2] shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#EAE3D6] px-4 py-3.5">
              <span className="flex items-center gap-2 text-[14px] font-bold text-[#1A1712]">
                <Bell className="h-4 w-4 text-[#D93B6C]" />
                Notificações
              </span>
              <button
                type="button"
                data-cursor-hover
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white"
              >
                <X className="h-3.5 w-3.5 text-[#1A1712]" />
              </button>
            </div>
            <div className="flex max-h-[340px] flex-col gap-2 overflow-y-auto p-3">
              {NOTIFICATIONS.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className="flex gap-3 rounded-xl bg-white p-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D93B6C]/10">
                      <Icon className="h-4 w-4 text-[#D93B6C]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-[#1A1712]">
                        {notification.title}
                      </p>
                      <p className="text-[12px] leading-snug text-[#8A8175]">
                        {notification.body}
                      </p>
                      <p className="mt-1 text-[10.5px] text-[#8A8175]">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
