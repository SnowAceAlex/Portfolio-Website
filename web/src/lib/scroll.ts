import type Lenis from "lenis";

// Clears the sticky 80px road nav with a little air.
export const NAV_OFFSET = 92;

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Smooth-scrolls to a y position: through Lenis when it is running, natively otherwise,
// and instantly under reduced motion.
export function scrollToY(y: number, lenis?: Lenis) {
  const top = Math.max(0, y);
  const reduce = prefersReduced();
  if (lenis) lenis.scrollTo(top, { immediate: reduce });
  else window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

export function scrollToSection(id: string, lenis?: Lenis) {
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToY(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET, lenis);
  return true;
}
