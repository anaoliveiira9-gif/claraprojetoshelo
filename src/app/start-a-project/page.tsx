import { Suspense } from "react";
import type { Metadata } from "next";
import { Configurator } from "@/components/configurator";

export const metadata: Metadata = {
  title: "Começar um Projeto — ALUMNA",
};

export default function StartAProjectPage() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <Suspense fallback={null}>
        <Configurator />
      </Suspense>
    </section>
  );
}
