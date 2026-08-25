import type { ReactNode } from "react";
import type { Metadata } from "next";
import { LabExitBar } from "@/components/labs/lab-exit-bar";
import { OrbitThemeProvider } from "@/components/labs/004/theme";

export const metadata: Metadata = {
  title: "Orbit — Inteligência Operacional",
};

/**
 * Root of the Orbit micro-experience. Owns its own light/dark theme system
 * (scoped via OrbitThemeProvider) and its own palette/type, overriding
 * ALUMNA's dark tokens entirely. The LabExitBar deliberately keeps ALUMNA's
 * own styling so it always reads as "the way out".
 */
export default function ExperienciaLayout({ children }: { children: ReactNode }) {
  return (
    <OrbitThemeProvider>
      <LabExitBar labIndex="004" labName="Orbit" />
      {children}
    </OrbitThemeProvider>
  );
}
