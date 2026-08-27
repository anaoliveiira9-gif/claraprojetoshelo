import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
  Fraunces,
  Archivo,
  Manrope,
  Work_Sans,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { Cursor } from "@/components/cursor";
import { GrainOverlay } from "@/components/grain-overlay";
import { SiteContentProvider } from "@/components/site-content-provider";
import { getSiteContent, DISPLAY_FONTS, BODY_FONTS } from "@/lib/site-content";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const FONT_VARIABLES = [
  bricolage,
  spaceGrotesk,
  fraunces,
  archivo,
  inter,
  manrope,
  workSans,
  jetbrainsMono,
]
  .map((f) => f.variable)
  .join(" ");

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: `${content.brand.name} — ${content.brand.suffix}`,
    description:
      "ALUMNA é um estúdio independente de design, tecnologia e experiências digitais. Websites, e-commerce, apps, produtos digitais, sistemas e automação.",
    metadataBase: new URL("https://alumna.studio"),
    openGraph: {
      title: `${content.brand.name} — ${content.brand.suffix}`,
      description: content.hero.lead,
      type: "website",
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getSiteContent();
  const displayVar = DISPLAY_FONTS[content.typography.display].cssVar;
  const bodyVar = BODY_FONTS[content.typography.body].cssVar;

  return (
    <html
      lang="pt-BR"
      className={`${FONT_VARIABLES} h-full`}
      style={
        {
          "--font-display": `var(${displayVar})`,
          "--font-sans": `var(${bodyVar})`,
        } as React.CSSProperties
      }
    >
      <body className="flex min-h-full flex-col bg-ink text-paper antialiased selection:bg-accent selection:text-paper">
        <GrainOverlay />
        <Cursor />
        <SiteContentProvider content={content}>
          <SiteChrome>
            <main className="flex-1">{children}</main>
          </SiteChrome>
        </SiteContentProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
