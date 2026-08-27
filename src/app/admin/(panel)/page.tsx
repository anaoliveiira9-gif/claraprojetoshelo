import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { SERVICES } from "@/lib/pricing";
import { LABS } from "@/lib/labs";

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] ${
        ok ? "text-accent" : "text-paper-faint"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-accent" : "bg-paper-faint"}`}
      />
      {label}
    </span>
  );
}

function Card({
  title,
  value,
  href,
  hint,
}: {
  title: string;
  value: string;
  href?: string;
  hint?: string;
}) {
  const inner = (
    <div className="border border-line p-6 transition-colors hover:border-paper-dim">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
        {title}
      </p>
      <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
      {hint && <p className="mt-2 text-xs text-paper-faint">{hint}</p>}
    </div>
  );
  return href ? (
    <Link href={href} data-cursor-hover>
      {inner}
    </Link>
  ) : (
    inner
  );
}

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold uppercase tracking-tight">
        Painel
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
        Visão geral da ALUMNA. Serviços, LABs e FAQ ainda são editados no
        código-fonte — este painel te dá uma leitura rápida do que está
        configurado antes de expandirmos para edição direta.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Serviços cadastrados"
          value={String(SERVICES.length)}
          href="/admin/servicos"
        />
        <Card title="Labs publicados" value={String(LABS.length)} href="/admin/labs" />
        <Card
          title="Contato"
          value={CONTACT.email || CONTACT.whatsappNumber ? "Configurado" : "Pendente"}
          hint={
            CONTACT.email || CONTACT.whatsappNumber
              ? undefined
              : "E-mail e WhatsApp ainda não foram definidos em src/lib/config.ts"
          }
          href="/admin/configuracoes"
        />
      </div>

      <div className="mt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
          Métricas de navegação
        </p>
        <div className="mt-4 border border-line p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-paper-dim">
                Visitantes, páginas mais acessadas, dispositivos, países e
                origem dos acessos são coletados automaticamente pelo Vercel
                Analytics — dados reais, sem nada inventado aqui.
              </p>
              <p className="mt-2 text-xs text-paper-faint">
                Os números levam alguns dias para aparecer depois do primeiro
                deploy com tráfego real.
              </p>
            </div>
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="shrink-0 border border-paper px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent hover:text-accent"
            >
              Abrir Vercel Analytics →
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-faint">
          Leads e uso do configurador
        </p>
        <div className="mt-4 border border-line p-6">
          <StatusPill ok={false} label="Sem banco de dados conectado" />
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper-dim">
            O diagnóstico do configurador ainda não é salvo em lugar nenhum —
            hoje ele só é simulado no navegador de quem preenche. Para
            receber leads e ver quais serviços são mais selecionados aqui
            dentro, é preciso conectar um banco de dados real (ex: Supabase).
            Nada é exibido nesta seção até isso existir, para não mostrar
            números inventados.
          </p>
          <Link
            href="/admin/leads"
            data-cursor-hover
            className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.2em] text-paper underline underline-offset-4 hover:text-accent"
          >
            Ver detalhes →
          </Link>
        </div>
      </div>
    </div>
  );
}
