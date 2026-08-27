"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { NAV_LINKS } from "@/lib/config";
import { EmailLink, WhatsappLink } from "@/components/contact-links";
import { useSiteContent } from "@/components/site-content-provider";

export function SiteFooter() {
  const { brand, contact } = useSiteContent();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 text-paper"
              data-cursor-hover
            >
              <Logo className="h-7 w-7 text-accent" />
              <span className="font-display text-base font-semibold uppercase tracking-[0.15em]">
                {brand.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-dim">
              Estúdio independente de design, tecnologia e experiências
              digitais.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
              Navegação
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper-dim transition-colors hover:text-paper"
                    data-cursor-hover
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
              Contato
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-paper-dim">
              <li>
                <EmailLink className="transition-colors hover:text-paper">
                  {contact.email ?? "E-mail em breve"}
                </EmailLink>
              </li>
              <li>
                <WhatsappLink className="transition-colors hover:text-paper">
                  WhatsApp
                </WhatsappLink>
              </li>
              <li>{contact.address}</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
              Índice
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-paper-dim">
              <li>
                <Link
                  href="/servicos/site"
                  data-cursor-hover
                  className="transition-colors hover:text-paper"
                >
                  Website — E-commerce
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/aplicativo"
                  data-cursor-hover
                  className="transition-colors hover:text-paper"
                >
                  App — Produto Digital
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/sistema"
                  data-cursor-hover
                  className="transition-colors hover:text-paper"
                >
                  Sistemas — Automação
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {brand.legalName}
          </span>
          <span>Est. {brand.foundedYear} — {brand.city}</span>
        </div>
      </div>
    </footer>
  );
}
