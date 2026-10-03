"use client";

import { useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { CarGlyph } from "@/components/CarGlyph";
import { InkAvatar } from "@/components/InkAvatar";
import { useShell } from "@/components/ShellProvider";
import { site } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/motion";
import { setTheme, useTheme } from "@/lib/theme";

const snow = [
  { left: 18, top: 6, size: 3 },
  { left: 74, top: 16, size: 2 },
  { left: 128, top: 4, size: 3 },
  { left: 170, top: 20, size: 2 },
];

// Desktop only (≥900px): fixed under the nav, always on screen while the page scrolls.
export function Sidebar() {
  const { openFastLane } = useShell();
  const theme = useTheme();
  const night = theme === "dark";

  return (
    <aside className="fixed left-0 top-[81px] z-20 hidden h-[min(calc(100vh-81px),840px)] w-[252px] flex-col border-r border-line pb-6 pl-8 pr-6 pt-[30px] desk:flex">
      <InkAvatar size={66} />
      <p className="mt-[18px] font-serif text-[46px] leading-[.95] tracking-[-.01em]">
        Vinh
        <br />
        Bui.
      </p>
      <p className="mt-1.5 font-hand text-[26px] leading-none">aka {site.handle}</p>
      <p className="mt-4 text-pretty text-[12.5px] leading-[1.7]">“{site.tagline}”</p>
      <ul className="mt-[22px] flex flex-col gap-3 text-[12px] leading-[1.45]">
        {site.affiliations.map((a) => (
          <li key={a.at}>
            <span className="block font-medium">{a.at}</span>
            <span className="block opacity-85">{a.what}</span>
          </li>
        ))}
      </ul>
      <DrivingStrip />
      <div className="mt-3.5 flex flex-col gap-2">
        <button
          type="button"
          onClick={openFastLane}
          className="flex items-center justify-between rounded-[6px] border-[1.5px] border-ink bg-ink px-3 py-2.5 text-[11px] uppercase tracking-[.14em] text-panel transition-opacity hover:opacity-88"
        >
          <span>Fast lane</span>
          <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme(night ? "light" : "dark")}
          aria-pressed={night}
          className="flex items-center justify-between rounded-[6px] border-[1.5px] border-ink px-3 py-[9px] text-[11px] uppercase tracking-[.14em] transition-colors hover:bg-hatch"
        >
          <span>Night drive</span>
          <span>{night ? "on" : "off"}</span>
        </button>
      </div>
    </aside>
  );
}

// The small car loops left to right at 26px/s over a two-line road; parked under reduced motion.
function DrivingStrip() {
  const car = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();

  useAnimationFrame((t) => {
    const el = car.current;
    if (!el) return;
    const span = (el.parentElement?.clientWidth ?? 190) + 50;
    const x = reduce ? 70 : ((t / 1000) * 26) % span - 44;
    el.style.transform = `translateX(${x}px)`;
  });

  return (
    <div className="relative mt-auto h-[58px] flex-none overflow-hidden" aria-hidden="true">
      {snow.map((s) => (
        <span
          key={s.left}
          className="absolute rounded-full bg-ink opacity-50"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-[9px] border-t-[1.5px] border-ink" />
      <div className="absolute inset-x-0 bottom-[3px] border-t-[1.5px] border-dashed border-ink opacity-35" />
      <div ref={car} className="absolute bottom-[10px] left-0 will-change-transform" style={{ transform: "translateX(70px)" }}>
        <CarGlyph />
      </div>
    </div>
  );
}
