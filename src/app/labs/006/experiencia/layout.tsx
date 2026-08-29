import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { LabExitBar } from "@/components/labs/lab-exit-bar";
import { SiteNav } from "@/components/labs/006/site-nav";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-atelier-display",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-atelier-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier 17 — Arquitetura",
  description:
    "Atelier 17, estúdio de arquitetura brasileiro — projetos residenciais, institucionais, comerciais e culturais.",
};

export default function ExperienciaLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${archivo.variable} ${plexMono.variable} relative min-h-screen bg-[#FAFAF8] text-[#161615] antialiased [font-family:var(--font-atelier-display)]`}
    >
      <LabExitBar labIndex="006" labName="Atelier 17" />
      <SiteNav />
      {children}
    </div>
  );
}
