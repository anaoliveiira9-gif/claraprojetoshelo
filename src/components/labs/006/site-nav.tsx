"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const BASE = "/labs/006/experiencia";

const LINKS = [
  { href: BASE, label: "Início", match: BASE },
  { href: `${BASE}/projetos`, label: "Projetos", match: `${BASE}/projetos` },
  { href: `${BASE}/equipe`, label: "Equipe", match: `${BASE}/equipe` },
  { href: `${BASE}/contato`, label: "Contato", match: `${BASE}/contato` },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-14 z-[70] flex justify-end px-4 pt-3 sm:top-0 sm:px-8 sm:pt-6">
      <nav
        aria-label="Navegação principal"
        className="flex items-center gap-1 border border-[#161615]/15 bg-[#FAFAF8]/90 px-2 py-1.5 backdrop-blur-md sm:gap-2 sm:px-3"
      >
        {LINKS.map((link) => {
          const active =
            link.match === BASE ? pathname === BASE : pathname?.startsWith(link.match);
          return (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-hover
              aria-current={active ? "page" : undefined}
              className={cn(
                "px-2 py-1 [font-family:var(--font-atelier-mono)] text-[10px] uppercase tracking-[0.14em] transition-colors sm:text-[11px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]",
                active ? "text-[#2E4A5E]" : "text-[#161615]/70 hover:text-[#161615]",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
