import Link from "next/link";
import { Logo } from "@/components/logo";
import { logoutAction } from "@/lib/admin-actions";

const NAV = [
  { href: "/admin", label: "Painel" },
  { href: "/admin/conteudo", label: "Conteúdo" },
  { href: "/admin/servicos", label: "Serviços & Preços" },
  { href: "/admin/labs", label: "Labs" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/configuracoes", label: "Configurações" },
] as const;

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-paper lg:flex-row">
      <aside className="flex shrink-0 flex-col justify-between border-b border-line px-5 py-6 lg:w-64 lg:border-b-0 lg:border-r lg:px-6 lg:py-10">
        <div>
          <Link
            href="/admin"
            data-cursor-hover
            className="flex items-center gap-2.5"
          >
            <Logo className="h-6 w-6 text-accent" />
            <span className="font-display text-sm font-semibold uppercase tracking-[0.15em]">
              ALUMNA / Admin
            </span>
          </Link>

          <nav className="mt-10 flex flex-row flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor-hover
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-dim transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:mt-0">
          <Link
            href="/"
            data-cursor-hover
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint transition-colors hover:text-paper"
          >
            ← Ver site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              data-cursor-hover
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint transition-colors hover:text-accent"
            >
              Sair
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-[1100px]">{children}</div>
      </main>
    </div>
  );
}
