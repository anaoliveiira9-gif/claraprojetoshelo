import { Mail, MapPin, ShieldCheck } from "lucide-react";

export default function OrbitPerfilPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-[var(--orbit-ink)]">Perfil</h1>
        <p className="mt-1 text-sm text-[var(--orbit-secondary)]">
          Informações da sua conta no Orbit.
        </p>
      </div>

      <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--orbit-accent)] font-[family-name:var(--font-jetbrains)] text-lg font-medium text-[var(--orbit-accent-ink)]">
            HS
          </span>
          <div>
            <p className="text-base font-semibold text-[var(--orbit-ink)]">Heloísa Souza</p>
            <p className="text-sm text-[var(--orbit-secondary)]">
              Gerente de Operações · Metzler Metal Mecânica
            </p>
          </div>
        </div>

        <dl className="mt-5 flex flex-col gap-3 border-t border-[var(--orbit-border)] pt-4">
          <div className="flex items-center gap-2.5 text-sm">
            <Mail className="h-4 w-4 text-[var(--orbit-secondary)]" />
            <dt className="sr-only">E-mail</dt>
            <dd className="text-[var(--orbit-ink)]">heloisa.souza@metzler.com.br</dd>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <MapPin className="h-4 w-4 text-[var(--orbit-secondary)]" />
            <dt className="sr-only">Localização</dt>
            <dd className="text-[var(--orbit-ink)]">São Bernardo do Campo, SP</dd>
          </div>
          <div className="flex items-center gap-2.5 text-sm">
            <ShieldCheck className="h-4 w-4 text-[var(--orbit-secondary)]" />
            <dt className="sr-only">Permissão</dt>
            <dd className="text-[var(--orbit-ink)]">Administradora — acesso completo</dd>
          </div>
        </dl>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
          <p className="font-[family-name:var(--font-jetbrains)] text-xl font-medium tabular-nums text-[var(--orbit-ink)]">
            48
          </p>
          <p className="text-xs text-[var(--orbit-secondary)]">Processos criados</p>
        </div>
        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
          <p className="font-[family-name:var(--font-jetbrains)] text-xl font-medium tabular-nums text-[var(--orbit-ink)]">
            6
          </p>
          <p className="text-xs text-[var(--orbit-secondary)]">Automações mantidas</p>
        </div>
        <div className="rounded-lg border border-[var(--orbit-border)] bg-[var(--orbit-surface)] p-4">
          <p className="font-[family-name:var(--font-jetbrains)] text-xl font-medium tabular-nums text-[var(--orbit-ink)]">
            2023
          </p>
          <p className="text-xs text-[var(--orbit-secondary)]">Na plataforma desde</p>
        </div>
      </div>
    </div>
  );
}
