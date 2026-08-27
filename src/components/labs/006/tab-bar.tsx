"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, Home, Map, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/labs/006/experiencia/inicio", label: "Início", icon: Home },
  {
    href: "/labs/006/experiencia/descobrir",
    label: "Descobrir",
    icon: Compass,
  },
  { href: "/labs/006/experiencia/mapa", label: "Mapa", icon: Map },
  {
    href: "/labs/006/experiencia/favoritos",
    label: "Favoritos",
    icon: Heart,
  },
  { href: "/labs/006/experiencia/perfil", label: "Perfil", icon: User },
];

export function NovaTabBar() {
  const pathname = usePathname();

  return (
    <nav className="flex shrink-0 items-stretch border-t border-[#EAE3D6] bg-white/95 px-1.5 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-1.5 backdrop-blur-sm">
      {TABS.map((tab) => {
        const active = pathname?.startsWith(tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            data-cursor-hover
            aria-current={active ? "page" : undefined}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D93B6C] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <span
              className={cn(
                "flex h-6 w-9 items-center justify-center rounded-full transition-colors",
                active && "bg-[#D93B6C]/10",
              )}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px] transition-colors",
                  active ? "text-[#D93B6C]" : "text-[#6D665C]",
                )}
                strokeWidth={active ? 2.4 : 2}
              />
            </span>
            <span
              className={cn(
                "text-[10px] font-semibold transition-colors",
                active ? "text-[#D62A5F]" : "text-[#6D665C]",
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
