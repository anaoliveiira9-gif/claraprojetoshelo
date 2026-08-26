import type { ReactNode } from "react";
import { CONTACT } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
 * Renders a real mailto:/wa.me link once CONTACT.email / .whatsappNumber
 * are filled in (see src/lib/config.ts); until then, renders the same
 * visual treatment as a disabled, clearly-not-yet-active control instead
 * of a fabricated number or address.
 */

export function EmailLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  if (!CONTACT.email) {
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
    <a
      href={`mailto:${CONTACT.email}`}
      data-cursor-hover
      className={className}
    >
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
  if (!CONTACT.whatsappUrl) {
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
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className={className}
    >
      {children}
    </a>
  );
}
