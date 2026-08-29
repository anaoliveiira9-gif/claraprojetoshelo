import { Fraunces, Inter } from "next/font/google";
import { LabExitBar } from "@/components/labs/lab-exit-bar";
import { EterProvider } from "@/components/labs/005/eter-context";
import { EterNav } from "@/components/labs/005/eter-nav";
import { CartDrawer } from "@/components/labs/005/cart-drawer";
import { WishlistDrawer } from "@/components/labs/005/wishlist-drawer";
import { SearchOverlay } from "@/components/labs/005/search-overlay";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-eter-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-eter-sans",
  display: "swap",
});

export default function EterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} eter-scope min-h-screen bg-[#F6F1E9] text-[#171512]`}
      style={{ fontFamily: "var(--font-eter-sans)" }}
    >
      <style>{`
        .font-eter-serif { font-family: var(--font-eter-serif), serif; }
        .font-eter-sans { font-family: var(--font-eter-sans), sans-serif; }
        /*
         * The site-wide :focus-visible outline (globals.css) uses
         * var(--accent), ALUMNA's orange — it doesn't read as this lab's
         * own identity against ÉTÉR's cream/ink palette, and several
         * interactive elements here already pair focus:outline-none with
         * their own treatment, which would otherwise suppress it
         * unpredictably. This lab gets its own ring instead, built from
         * its own ink color (#171512), which has strong contrast against
         * every background used in this experience.
         */
        .eter-scope :focus-visible {
          outline: 2px solid #171512;
          outline-offset: 3px;
          border-radius: 1px;
        }
      `}</style>
      <LabExitBar labIndex="005" labName="Éter" />
      <EterProvider>
        <EterNav />
        {children}
        <CartDrawer />
        <WishlistDrawer />
        <SearchOverlay />
      </EterProvider>
    </div>
  );
}
