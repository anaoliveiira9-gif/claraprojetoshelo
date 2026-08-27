import {
  BUILD_OPTIONS,
  OBJECTIVE_OPTIONS,
  FEATURE_OPTIONS,
  PRIORITY_OPTIONS,
  ADDON_OPTIONS,
  STYLE_OPTIONS,
  computeEstimate,
  type BuildOption,
  type ObjectiveOption,
  type FeatureOption,
  type PriorityOption,
  type AddonOption,
  type StyleOption,
  type EstimateResult,
  type ServiceSlug,
} from "@/lib/pricing";

export {
  BUILD_OPTIONS,
  OBJECTIVE_OPTIONS,
  FEATURE_OPTIONS,
  PRIORITY_OPTIONS,
  ADDON_OPTIONS,
  STYLE_OPTIONS,
  type BuildOption,
  type ObjectiveOption,
  type FeatureOption,
  type PriorityOption,
  type AddonOption,
  type StyleOption,
};

export interface ProjectSelection {
  builds: BuildOption[];
  objectives: ObjectiveOption[];
  features: FeatureOption[];
  priorities: PriorityOption[];
  addons: AddonOption[];
  style: StyleOption | null;
  /** Present when the visitor arrived from a /servicos/[slug] page. */
  initialService?: ServiceSlug;
}

export interface ContactInfo {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
}

/**
 * Estimativa de investimento — não é orçamento fechado. Combina o
 * preço-base do tipo de projeto com o nível de complexidade sinalizado
 * pelas respostas, descontando o que já é naturalmente esperado do tipo
 * de projeto escolhido. Toda a lógica de preço vive em `@/lib/pricing`;
 * esta função só decide o que perguntar e como resumir a conversa.
 */
export function suggestScope(selection: ProjectSelection): EstimateResult {
  return computeEstimate({
    builds: selection.builds,
    objectives: selection.objectives,
    features: selection.features,
    priorities: selection.priorities,
    addons: selection.addons,
    style: selection.style,
    initialService: selection.initialService,
  });
}

export interface DiagnosticPayload {
  project: ProjectSelection;
  contact: ContactInfo;
  estimate: EstimateResult;
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
    estimate: suggestScope(project),
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
