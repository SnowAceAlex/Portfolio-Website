"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotionSafe } from "@/lib/motion";

export function SmoothScroll() {
  const reduce = useReducedMotionSafe();
  if (reduce) return null;
  return <ReactLenis root options={{ lerp: 0.12 }} />;
}
