"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * True on devices with a real hover-capable pointer (mouse/trackpad).
 * Touch devices fall back to always-visible/tap-to-select instead of
 * hover-to-reveal, since a `:hover`-only affordance is otherwise invisible
 * and unreachable on touch.
 *
 * Built on useSyncExternalStore (the React-endorsed way to read a
 * browser-only source without a hydration mismatch — same pattern as the
 * localStorage store in eter-context.tsx): the server/first-paint snapshot
 * is always the touch-safe `false`, the client snapshot is the real value.
 */
export function useHoverCapable() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
