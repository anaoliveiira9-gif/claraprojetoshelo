import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import { LabExitBar } from "@/components/labs/lab-exit-bar";
import { FavoritesProvider } from "@/components/labs/006/favorites-context";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nova",
});

/**
 * Root of the NOVA app-shell. Fully overrides ALUMNA's dark tokens with
 * NOVA's own cream/ink/magenta palette via this wrapping div, and constrains
 * everything to a phone-proportioned column so it reads as a real app even
 * when opened directly in a wide browser window.
 */
export default function ExperienciaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${manrope.variable} min-h-screen bg-[#EDE6D6] font-[family-name:var(--font-nova)] antialiased`}
    >
      <LabExitBar labIndex="006" labName="Nova" />
      <FavoritesProvider>
        <div className="flex min-h-screen w-full justify-center sm:py-8">
          <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-[#FAF7F2] text-[#1A1712] sm:h-[900px] sm:max-h-[calc(100dvh-4rem)] sm:rounded-[2.5rem] sm:border sm:border-[#DCD3BF] sm:shadow-2xl">
            {children}
          </div>
        </div>
      </FavoritesProvider>
    </div>
  );
}
