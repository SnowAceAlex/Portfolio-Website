"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useShell } from "@/components/ShellProvider";
import { Chip } from "@/components/Tag";
import { fastLane, projects, site } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/motion";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// The recruiter drawer: the 20-second version, sliding in from the right.
export function FastLane() {
  const { fastLaneOpen, closeFastLane } = useShell();
  const reduce = useReducedMotionSafe();
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!fastLaneOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    lenis?.stop();
    closeBtn.current?.focus();

    // Esc closes; Tab and Shift+Tab stay inside the drawer.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeFastLane();
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panel.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
      opener?.focus();
    };
  }, [fastLaneOpen, closeFastLane, lenis]);

  const ease = [0.2, 0.8, 0.2, 1] as const;
  const duration = reduce ? 0 : 0.45;

  return (
    <AnimatePresence>
      {fastLaneOpen && (
        <div key="fast-lane" className="fixed inset-0 z-[60] flex justify-end">
          <motion.div
            className="absolute inset-0 bg-[color-mix(in_oklch,var(--paper)_72%,transparent)]"
            onClick={closeFastLane}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease }}
            aria-hidden="true"
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fast-lane-title"
            data-lenis-prevent
            className="relative flex h-full max-h-dvh w-[min(460px,100%)] flex-col gap-5 overflow-auto border-l-[1.5px] border-ink bg-panel px-[clamp(20px,4vw,34px)] py-[26px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration, ease }}
          >
            <div className="flex items-center justify-between">
              <Chip filled>FAST LANE</Chip>
              <button
                ref={closeBtn}
                type="button"
                onClick={closeFastLane}
                className="min-h-10 px-1 text-[11px] tracking-[.12em]"
              >
                × BACK TO THE SCENIC ROUTE
              </button>
            </div>
            <div>
              <h2 id="fast-lane-title" className="font-serif text-[44px] leading-none">
                {site.name}.
              </h2>
              <p className="mt-1 font-hand text-[25px]">the 20-second version</p>
            </div>
            <dl className="flex flex-col border-t-[1.5px] border-ink">
              {fastLane.map((row) => (
                <div key={row.k} className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-b border-line py-3">
                  <dt className="pt-[3px] text-[9.5px] tracking-[.16em]">{row.k}</dt>
                  <dd className="text-[13px] leading-[1.6]">{row.v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-2">
              <p className="text-[9.5px] tracking-[.16em]">PROJECTS</p>
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  onClick={closeFastLane}
                  className="flex justify-between gap-3 rounded-[8px] border-[1.5px] border-ink px-3 py-2.5 no-underline transition-colors hover:bg-hatch"
                >
                  <span>
                    <span className="font-serif text-[20px]">{p.title}</span>
                    <span className="text-[11px]"> · {p.kind}</span>
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="pill pill-ink min-h-[46px]! flex-1">
                Resume ↓
              </a>
              <Link href="/contact" onClick={closeFastLane} className="pill pill-outline min-h-[46px]! flex-1">
                Say hello →
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
