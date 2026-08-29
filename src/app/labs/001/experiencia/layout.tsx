import type { ReactNode } from "react";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { LabExitBar } from "@/components/labs/lab-exit-bar";
import { NoirNav } from "@/components/labs/001/noir-nav";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-noir-display",
});

const sans = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-noir-sans",
});

/**
 * Root of the Noir micro-experience. Fully overrides ALUMNA's tokens with
 * its own palette/type via this wrapping div — the LabExitBar deliberately
 * stays in ALUMNA's own styling so it always reads as "the way out".
 */
export default function ExperienciaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen bg-[#0D0B0A] font-[family-name:var(--font-noir-sans)] text-[#F1E9DD] antialiased`}
    >
      <LabExitBar labIndex="001" labName="Noir" />
      <NoirNav />
      {children}
    </div>
  );
}
