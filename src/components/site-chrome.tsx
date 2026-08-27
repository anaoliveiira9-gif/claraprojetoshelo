"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const EXPERIENCE_PATTERN = /^\/labs\/\d{3}\/experiencia/;
const ADMIN_PATTERN = /^\/admin(\/|$)/;

/**
 * Every lab's interactive product lives under /labs/0XX/experiencia and
 * defines its own visual identity — it must not carry ALUMNA's own
 * header/footer chrome. The admin panel has its own dedicated layout for
 * the same reason. Everything else on the site keeps it.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExperience = EXPERIENCE_PATTERN.test(pathname);
  const isAdmin = ADMIN_PATTERN.test(pathname);

  if (isExperience || isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
