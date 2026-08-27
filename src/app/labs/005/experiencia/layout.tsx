import { Newsreader } from "next/font/google";
import { LabExitBar } from "@/components/labs/lab-exit-bar";
import { FavoritesProvider } from "@/components/labs/005/favorites-context";
import { VerticeChrome } from "@/components/labs/005/vertice-chrome";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

/**
 * VÉRTICE lives inside ALUMNA's lab shell but deliberately overrides the
 * dark copper tokens with its own warm-stone / forest-green identity, kept
 * local to this subtree via the wrapping div below.
 */
export default function ExperienciaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`vertice-scope ${newsreader.variable} font-sans`}>
      {/*
       * ALUMNA's site-wide `:focus-visible` ring (globals.css) uses its own
       * copper --accent, which doesn't belong to Vértice's warm-stone/forest
       * identity and isn't in scope to change globally. Scoping an override
       * to Vértice's own forest green here keeps the ring on-brand without
       * touching the shared stylesheet.
       */}
      <style>{`.vertice-scope :focus-visible { outline-color: #2F4A3B; }`}</style>
      <LabExitBar labIndex="005" labName="Vértice" />
      <FavoritesProvider>
        <VerticeChrome>{children}</VerticeChrome>
      </FavoritesProvider>
    </div>
  );
}
