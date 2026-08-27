"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/site-content";
import { DEFAULT_CONTENT } from "@/lib/site-content";

const SiteContentContext = createContext<SiteContent>(DEFAULT_CONTENT);

export function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

/** Read the site's editable content — set once, server-side, in the root layout. */
export function useSiteContent(): SiteContent {
  return useContext(SiteContentContext);
}
