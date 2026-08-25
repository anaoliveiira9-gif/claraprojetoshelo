import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { BudgetFlow } from "@/components/budget-flow";

export const metadata: Metadata = {
  title: "Orçamento — ALUMNA",
};

function readParam(
  params: { [key: string]: string | string[] | undefined },
  key: string
) {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

export default async function OrcamentoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const build = readParam(params, "build");
  const needs = readParam(params, "needs");
  const priorities = readParam(params, "priorities");
  const name = readParam(params, "name");
  const email = readParam(params, "email");
  const company = readParam(params, "company");

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1000px]">
        <SectionLabel label="Orçamento" />
        <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase leading-[1.02] tracking-tight">
          Do diagnóstico à confirmação.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper-dim">
          Revise o escopo sugerido e simule a forma de pagamento. Um
          orçamento real é enviado após a análise do diagnóstico pela
          equipe.
        </p>
      </div>

      <div className="mt-16">
        <BudgetFlow
          build={build}
          needs={needs}
          priorities={priorities}
          name={name}
          email={email}
          company={company}
        />
      </div>
    </section>
  );
}
