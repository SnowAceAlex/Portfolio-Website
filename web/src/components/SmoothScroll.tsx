"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export function SmoothScroll() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <ReactLenis root options={{ lerp: 0.12, anchors: { offset: -96 } }} />;
}
