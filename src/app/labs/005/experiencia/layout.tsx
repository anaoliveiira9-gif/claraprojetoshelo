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
    <div className={`${newsreader.variable} font-sans`}>
      <LabExitBar labIndex="005" labName="Vértice" />
      <FavoritesProvider>
        <VerticeChrome>{children}</VerticeChrome>
      </FavoritesProvider>
    </div>
  );
}
