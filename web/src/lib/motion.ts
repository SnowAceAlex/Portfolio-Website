"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

// Hydration-safe: renders as `false` on the server and during hydration, then
// updates. motion's useReducedMotion reads the media query on the first client
// render, which mismatches the server HTML and makes React re-render the root.
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
