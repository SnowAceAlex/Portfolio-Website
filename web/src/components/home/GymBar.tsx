"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { trainingSplit } from "@/content/site";
import { useNow, weekdayIndex } from "@/lib/clock";
import { useReducedMotionSafe } from "@/lib/motion";

type Kg = 20 | 10 | 5 | 2.5;

const PLATES: Record<Kg, { w: number; h: number; fill: string }> = {
  20: { w: 16, h: 118, fill: "bg-ink" },
  10: { w: 13, h: 94, fill: "bg-panel" },
  5: { w: 10, h: 70, fill: "bg-ink" },
  2.5: { w: 8, h: 52, fill: "bg-hatch" },
};
const LOADS: Kg[] = [20, 10, 5, 2.5];
const BAR_KG = 20;

// Plates per side the sleeves fit at this width: 7, or 5 under 900px, or 4 under 480px.
function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}
function useMaxPlates() {
  return useSyncExternalStore(
    subscribe,
    () => (window.innerWidth < 480 ? 4 : window.innerWidth < 900 ? 5 : 7),
    () => 7,
  );
}

function noteFor(total: number, full: boolean) {
  if (full) return "sleeves full, spot me";
  if (total <= 20) return "empty bar. warm-up";
  if (total < 70) return "warming up";
  if (total < 110) return "working sets";
  if (total < 150) return "heavy day";
  return "PR attempt. spot me?";
}

const button =
  "min-h-11 min-w-[52px] rounded-[6px] border-[1.5px] border-ink bg-panel px-3 text-[13px] transition-colors hover:bg-hatch active:translate-y-px";

// Gym panel: load the bar (plates mirrored on both sides) and the weekly split.
export function GymBar() {
  const [plates, setPlates] = useState<Kg[]>([20, 10]);
  const max = useMaxPlates();
  const reduce = useReducedMotionSafe();
  const now = useNow();
  const today = now ? weekdayIndex(now) : -1;

  const loaded = plates.slice(0, max);
  const total = BAR_KG + 2 * loaded.reduce((sum, kg) => sum + kg, 0);
  const full = plates.length >= max;

  const side = (dir: "left" | "right") => (
    <div
      className={`relative flex h-full min-w-0 flex-[1_1_0] items-center gap-0.5 ${dir === "left" ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`absolute inset-x-0 top-1/2 -mt-[5px] h-2.5 border-[1.5px] border-ink bg-panel ${
          dir === "left" ? "rounded-l-[3px]" : "rounded-r-[3px]"
        }`}
      />
      {loaded.map((kg, i) => (
        <motion.div
          key={i}
          className={`relative z-[1] flex-none rounded-[4px] border-[1.5px] border-ink ${PLATES[kg].fill}`}
          style={{ width: PLATES[kg].w }}
          initial={reduce ? false : { height: 0 }}
          animate={{ height: PLATES[kg].h }}
          transition={{ duration: 0.25, ease: [0.3, 1.5, 0.5, 1] }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex min-w-0 flex-[7_1_420px] flex-col overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel">
      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1.5 border-b-[1.5px] border-ink bg-ink px-[18px] py-[9px] text-[10px] tracking-[.16em] text-panel">
        <span>GYM · WEIGHT TRAINING</span>
        <span>MOST FAVOURITE HOBBY</span>
      </div>
      <div className="flex flex-col gap-[18px] p-[clamp(18px,2.4vw,26px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2.5">
          <div className="min-w-0">
            <h3 className="font-serif text-[clamp(30px,3vw,40px)] leading-none">Tuning the engine.</h3>
            <p className="mt-2 max-w-[46ch] text-pretty text-[13px] leading-[1.7]">
              Most days end under a barbell. Same as code: show up, add a little weight, keep good form.
            </p>
          </div>
          <div className="text-right" aria-live="polite">
            <p className="tabular font-serif text-[clamp(44px,5vw,64px)] leading-[.9]">
              {total}
              <span className="text-[.45em]"> kg</span>
            </p>
            <p className="mt-1 font-hand text-[24px] leading-none">{noteFor(total, full)}</p>
          </div>
        </div>

        <div className="relative flex h-[140px] items-center" role="img" aria-label={`Barbell loaded to ${total} kg`}>
          <div className="absolute inset-x-0 bottom-0 border-t-[1.5px] border-ink" />
          <div className="absolute inset-x-0 -bottom-[7px] border-t-[1.5px] border-dashed border-line" />
          {side("left")}
          <div className="h-[30px] w-[9px] flex-none rounded-[2px] bg-ink" />
          <div className="h-1.5 min-w-10 flex-[1.3_1_0] border-[1.5px] border-ink bg-[repeating-linear-gradient(90deg,var(--ink)_0_1px,transparent_1px_4px)]" />
          <div className="h-[30px] w-[9px] flex-none rounded-[2px] bg-ink" />
          {side("right")}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[10px] tracking-[.16em]">LOAD THE BAR</span>
          {LOADS.map((kg) => (
            <button
              key={kg}
              type="button"
              className={button}
              onClick={() => setPlates((p) => (p.length >= max ? p : [...p, kg]))}
              aria-label={`Add ${kg} kg plates`}
            >
              +{kg}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPlates([])}
            className="ml-auto min-h-11 px-1 font-hand text-[24px] underline"
          >
            strip the bar
          </button>
        </div>

        <ul className="grid grid-cols-7 gap-1 border-t-[1.5px] border-dashed border-line pt-4" aria-label="Weekly split">
          {trainingSplit.map((d, i) => (
            <li
              key={d.day}
              aria-current={i === today ? "date" : undefined}
              className={`flex min-w-0 flex-col items-center gap-1 rounded-[6px] border-[1.5px] border-ink px-0.5 py-2 ${
                i === today ? "bg-ink text-panel" : ""
              }`}
            >
              <span className="text-[9px] tracking-[.12em]">{d.day}</span>
              <span className="max-w-full truncate text-[11px] font-medium tracking-[.04em]">{d.focus}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
