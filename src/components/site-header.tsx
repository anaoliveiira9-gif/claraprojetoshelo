"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { NAV_LINKS } from "@/lib/config";
import { useSiteContent } from "@/components/site-content-provider";

export function SiteHeader() {
  const { brand } = useSiteContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-ink/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-paper"
          data-cursor-hover
        >
          <Logo className="h-6 w-6 text-accent" />
          <span className="font-display text-sm font-semibold uppercase tracking-[0.15em]">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-dim transition-colors hover:text-paper"
              data-cursor-hover
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/start-a-project"
          data-cursor-hover
          className="group hidden items-center gap-2 border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent hover:text-accent md:flex"
        >
          Começar um Projeto
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

        <button
          type="button"
          aria-label="Abrir menu"
          data-cursor-hover
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-paper transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.2em] text-paper-dim"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
