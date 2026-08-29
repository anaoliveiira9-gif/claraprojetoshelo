"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LineChart as LineChartIcon,
  Table2,
  Zap,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OrbitWordmark } from "@/components/labs/003/logo";

const NAV_ITEMS = [
  { href: "/labs/003/experiencia/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/labs/003/experiencia/app/metricas", label: "Métricas", icon: LineChartIcon },
  { href: "/labs/003/experiencia/app/dados", label: "Dados", icon: Table2 },
  { href: "/labs/003/experiencia/app/automacoes", label: "Automações", icon: Zap },
  { href: "/labs/003/experiencia/app/configuracoes", label: "Configurações", icon: Settings },
];

export function OrbitSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-[var(--orbit-border)] bg-[var(--orbit-surface)] px-3 py-4 md:flex">
      <div className="px-2 pb-6">
        <OrbitWordmark />
      </div>
      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/labs/003/experiencia/app"
              ? pathname === item.href
              : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-cursor-hover
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-[var(--orbit-accent)]/10 font-medium text-[var(--orbit-accent)]"
                  : "text-[var(--orbit-secondary)] hover:bg-[var(--orbit-bg)] hover:text-[var(--orbit-ink)]",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--orbit-border)] px-2 pt-4">
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.14em] text-[var(--orbit-secondary)]">
          Orbit v2.4
        </p>
      </div>
    </aside>
  );
}

export function OrbitMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-0.5 overflow-x-auto border-b border-[var(--orbit-border)] bg-[var(--orbit-surface)] px-2 py-1.5 md:hidden">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/labs/003/experiencia/app"
            ? pathname === item.href
            : pathname?.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            data-cursor-hover
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-colors",
              active
                ? "bg-[var(--orbit-accent)]/10 font-medium text-[var(--orbit-accent)]"
                : "text-[var(--orbit-secondary)] hover:bg-[var(--orbit-bg)] hover:text-[var(--orbit-ink)]",
            )}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
