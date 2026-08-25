"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const BASE = "/labs/003/experiencia";

const LINKS = [
  { href: BASE, label: "Início" },
  { href: `${BASE}/menu`, label: "Menu" },
  { href: `${BASE}/reserva`, label: "Reservar" },
];

/**
 * Internal wayfinding for the Noir micro-site. Mirrors the exit bar's
 * fixed-pill treatment but sits top-right and uses Noir's own palette,
 * since this is the one nav the visitor uses while inside the experience.
 */
export function NoirNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação Noir"
      className="fixed right-3 top-3 z-[80] flex items-center gap-1 rounded-full border border-[#F1E9DD]/15 bg-[#0D0B0A]/90 p-1 backdrop-blur-md sm:right-5 sm:top-5"
    >
      {LINKS.map((link) => {
        const isActive =
          link.href === BASE
            ? pathname === BASE
            : pathname?.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            data-cursor-hover
            className={cn(
              "rounded-full px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.15em] transition-colors",
              isActive
                ? "bg-[#7C2A2A] text-[#F1E9DD]"
                : "text-[#F1E9DD]/60 hover:text-[#F1E9DD]",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
