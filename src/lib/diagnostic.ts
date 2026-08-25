export const BUILD_OPTIONS = [
  "Site",
  "E-commerce",
  "App",
  "Sistema",
  "Produto Digital",
  "Outro",
] as const;

export const NEED_OPTIONS = [
  "Vender",
  "Agendar",
  "Captar",
  "Automatizar",
  "Gerenciar",
  "Integrar",
] as const;

export const PRIORITY_OPTIONS = [
  "Marca",
  "Experiência",
  "Performance",
  "Conversão",
  "Tecnologia",
] as const;

export type BuildOption = (typeof BUILD_OPTIONS)[number];
export type NeedOption = (typeof NEED_OPTIONS)[number];
export type PriorityOption = (typeof PRIORITY_OPTIONS)[number];

export interface ProjectSelection {
  build: BuildOption | null;
  needs: NeedOption[];
  priorities: PriorityOption[];
}

export interface ContactInfo {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
}

export type ScopeTier = "Essencial" | "Autoral" | "Sistema Completo";

export interface ScopeSuggestion {
  tier: ScopeTier;
  description: string;
}

const BASE_WEIGHT: Record<BuildOption, number> = {
  Site: 1,
  "E-commerce": 2.4,
  App: 2.8,
  Sistema: 3.2,
  "Produto Digital": 3,
  Outro: 1.5,
};

/**
 * Sugestão de escopo qualitativa, sem valores monetários ou prazos —
 * isso é deliberado (ver instruções do orçamento). Serve como ponto de
 * partida para a conversa com a equipe, não como cálculo final. Quando
 * houver uma lógica real de orçamento, ela troca esta função por uma
 * chamada de API mantendo a mesma assinatura.
 */
export function suggestScope(selection: ProjectSelection): ScopeSuggestion {
  const base = selection.build ? BASE_WEIGHT[selection.build] : 1;
  const complexity =
    base + selection.needs.length * 0.35 + selection.priorities.length * 0.15;

  if (complexity < 1.8) {
    return {
      tier: "Essencial",
      description:
        "Projeto direto ao ponto: identidade aplicada, escopo enxuto, execução rápida.",
    };
  }

  if (complexity < 3.2) {
    return {
      tier: "Autoral",
      description:
        "Projeto completo, com sistema de design próprio e integrações essenciais.",
    };
  }

  return {
    tier: "Sistema Completo",
    description:
      "Produto digital robusto — múltiplos fluxos, painéis e automações prontos para escalar.",
  };
}

export interface DiagnosticPayload {
  project: ProjectSelection;
  contact: ContactInfo;
  scope: ScopeSuggestion;
  meta: {
    submittedAt: string;
    source: "start-a-project";
  };
}

export function buildDiagnosticPayload(
  project: ProjectSelection,
  contact: ContactInfo
): DiagnosticPayload {
  return {
    project,
    contact,
    scope: suggestScope(project),
    meta: {
      submittedAt: new Date().toISOString(),
      source: "start-a-project",
    },
  };
}

/**
 * Mocked submission — no backend wired up yet. Swap the body for a real
 * call (e.g. POST /api/diagnostico, a CRM webhook, a Supabase insert)
 * when ready; `DiagnosticPayload` above is already the shape that
 * endpoint should accept, so the call site doesn't need to change.
 */
export async function submitDiagnostic(
  payload: DiagnosticPayload
): Promise<{ ok: true; receivedAt: string }> {
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, receivedAt: new Date().toISOString() };
}
