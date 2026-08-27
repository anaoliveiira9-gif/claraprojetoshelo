"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * `useSyncExternalStore` (not `useState` + an effect) on purpose: a
 * `useState(() => matchMedia(...).matches)` initializer runs once during
 * SSR (where `window` is undefined, so it's always `false`) and again,
 * independently, on the client's first render — which, for a reduced-
 * motion user, computes `true` immediately. That mismatch between what
 * the server sent and what the client's first pass renders is exactly
 * what React's hydration model forbids: components that branch their
 * output on this value (scroll-driven vs. static process, animated vs.
 * instant transitions) would hydrate the animated markup first and only
 * swap to the reduced version after mount — a flash of motion for the
 * one group of users this hook exists to protect, plus a hydration
 * warning. `useSyncExternalStore` is explicitly designed for this: it
 * takes a separate server snapshot, so the server-rendered output and
 * the client's first hydration pass agree from the start.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
