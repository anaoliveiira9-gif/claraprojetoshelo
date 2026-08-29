"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Wires up the baseline behavior a modal overlay (drawer, full-screen
 * search) needs to be a real dialog rather than a floating div:
 * - moves focus inside when it opens
 * - traps Tab/Shift+Tab within it while open
 * - closes on Escape
 * - returns focus to whatever element opened it, once it closes
 *
 * Attach the returned ref to the dialog's outer container (the element
 * that carries role="dialog").
 */
export function useDialogA11y<T extends HTMLElement>(
  open: boolean,
  onClose: () => void
) {
  const containerRef = useRef<T>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Capture/restore focus around the open<->closed transition.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
    } else if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [open]);

  // Initial focus, Tab trap, Escape-to-close — only while open.
  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;

    const focusable = container?.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR
    );
    focusable?.[0]?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !container) return;
      const items = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return containerRef;
}
