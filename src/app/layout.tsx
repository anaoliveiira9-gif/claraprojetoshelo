import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { BRAND } from "@/lib/config";
import { SiteChrome } from "@/components/site-chrome";
import { Cursor } from "@/components/cursor";
import { GrainOverlay } from "@/components/grain-overlay";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.suffix}`,
  description:
    "ALUMNA é um estúdio independente de design, tecnologia e experiências digitais. Websites, e-commerce, apps, produtos digitais, sistemas e automação.",
  metadataBase: new URL("https://alumna.studio"),
  openGraph: {
    title: `${BRAND.name} — ${BRAND.suffix}`,
    description:
      "Criamos experiências digitais para marcas que não querem parecer com todas as outras.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ink text-paper antialiased selection:bg-accent selection:text-paper">
        <GrainOverlay />
        <Cursor />
        <SiteChrome>
          <main className="flex-1">{children}</main>
        </SiteChrome>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
