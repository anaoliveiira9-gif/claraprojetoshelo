import { Fraunces, Inter } from "next/font/google";
import { LabExitBar } from "@/components/labs/lab-exit-bar";
import { EterProvider } from "@/components/labs/001/eter-context";
import { EterNav } from "@/components/labs/001/eter-nav";
import { CartDrawer } from "@/components/labs/001/cart-drawer";
import { WishlistDrawer } from "@/components/labs/001/wishlist-drawer";
import { SearchOverlay } from "@/components/labs/001/search-overlay";

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
      className={`${fraunces.variable} ${inter.variable} min-h-screen bg-[#F6F1E9] text-[#171512]`}
      style={{ fontFamily: "var(--font-eter-sans)" }}
    >
      <style>{`
        .font-eter-serif { font-family: var(--font-eter-serif), serif; }
        .font-eter-sans { font-family: var(--font-eter-sans), sans-serif; }
      `}</style>
      <LabExitBar labIndex="001" labName="Éter" />
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
