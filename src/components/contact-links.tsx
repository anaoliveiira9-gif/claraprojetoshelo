"use client";

import type { ReactNode } from "react";
import { useSiteContent } from "@/components/site-content-provider";
import { cn } from "@/lib/utils";

/**
 * Renders a real mailto:/wa.me link once the admin panel has set an
 * e-mail / WhatsApp number (see `src/lib/site-content.ts`); until then,
 * renders the same visual treatment as a disabled, clearly-not-yet-active
 * control instead of a fabricated number or address.
 */

export function EmailLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { contact } = useSiteContent();
  if (!contact.email) {
    return (
      <span
        aria-disabled="true"
        title="E-mail em configuração"
        className={cn(className, "cursor-not-allowed opacity-40")}
      >
        {children}
      </span>
    );
  }
  return (
    <a href={`mailto:${contact.email}`} data-cursor-hover className={className}>
      {children}
    </a>
  );
}

export function WhatsappLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { contact } = useSiteContent();
  const whatsappUrl = contact.whatsappNumber
    ? `https://wa.me/${contact.whatsappNumber}`
    : null;
  if (!whatsappUrl) {
    return (
      <span
        aria-disabled="true"
        title="WhatsApp em configuração"
        className={cn(className, "cursor-not-allowed opacity-40")}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className={className}
    >
      {children}
    </a>
  );
}
