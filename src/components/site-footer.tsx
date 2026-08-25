import Link from "next/link";
import { Logo } from "@/components/logo";
import { BRAND, CONTACT, NAV_LINKS } from "@/lib/config";

export function SiteFooter() {
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
                {BRAND.name}
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
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-paper"
                  data-cursor-hover
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-paper"
                  data-cursor-hover
                >
                  WhatsApp
                </a>
              </li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
              Índice
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-paper-dim">
              <li>Website — E-commerce</li>
              <li>App — Produto Digital</li>
              <li>Sistemas — Automação</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BRAND.legalName}
          </span>
          <span>Est. {BRAND.foundedYear} — {BRAND.city}</span>
        </div>
      </div>
    </footer>
  );
}
