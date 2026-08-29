"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { NovaTabBar } from "@/components/labs/002/tab-bar";
import { NovaNotificationsPanel } from "@/components/labs/002/notifications-panel";

const TITLES: Record<string, string> = {
  "/labs/002/experiencia/inicio": "NOVA",
  "/labs/002/experiencia/descobrir": "Descobrir",
  "/labs/002/experiencia/mapa": "Mapa",
  "/labs/002/experiencia/favoritos": "Favoritos",
  "/labs/002/experiencia/perfil": "Perfil",
};

export default function AppShellLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const title = (pathname && TITLES[pathname]) ?? "NOVA";

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-[#EAE3D6] px-4 py-3.5">
        <span className="text-[15px] font-extrabold tracking-tight text-[#1A1712]">
          {title}
        </span>
        <button
          type="button"
          data-cursor-hover
          onClick={() => setNotificationsOpen(true)}
          aria-label="Notificações"
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#EAE3D6] bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93B6C] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <Bell className="h-3.5 w-3.5 text-[#1A1712]" />
          <span
            aria-hidden="true"
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#D93B6C]"
          />
        </button>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="absolute inset-0"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <NovaTabBar />

      <NovaNotificationsPanel
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
