"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { motion, useAnimationFrame } from "motion/react";
import { EngineStart } from "@/components/hero/EngineStart";
import { Chip } from "@/components/Tag";
import { formatDay, formatTime, formatTimeShort, useNow } from "@/lib/clock";
import { useReducedMotionSafe } from "@/lib/motion";

const label = "text-[9px] tracking-[.16em] opacity-80";

// A road pass hanging from the rear-view mirror. Clicking it, or starting the engine below it,
// stamps "ENGINE ON" (once), kicks the swing and makes the 3D car hop.
export function RoadPass({ onStart }: { onStart: () => void }) {
  const reduce = useReducedMotionSafe();
  const now = useNow();
  const hanger = useRef<HTMLDivElement>(null);
  const kickAt = useRef<number | null>(null);
  const [stampTime, setStampTime] = useState<string | null>(null);

  // Idle swing ±1.6° (~5.6s), plus a damped kick on click. Still under reduced motion.
  useAnimationFrame((t) => {
    const el = hanger.current;
    if (!el) return;
    let angle = reduce ? 0 : Math.sin(t / 900) * 1.6;
    if (kickAt.current !== null && !reduce) {
      const e = (performance.now() - kickAt.current) / 1000;
      angle += 10 * Math.exp(-e * 1.6) * Math.sin(e * 7.5);
    }
    el.style.transform = `rotate(${angle}deg)`;
  });

  // Kick the swing and land the stamp (first time only): shared by the tag and the engine button.
  const ignite = () => {
    kickAt.current = performance.now();
    setStampTime((t) => t ?? formatTimeShort(new Date()));
  };

  const start = () => {
    ignite();
    onStart();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      start();
    }
  };

  return (
    <div className="relative flex min-h-[560px] min-w-0 flex-[5_1_320px] flex-col items-center overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel">
      <Chip className="absolute left-3.5 top-3.5">№ 01</Chip>
      {/* the rear-view mirror tab the pass hangs from */}
      <div className="-mt-[1.5px] h-3.5 w-[92px] rounded-b-[10px] border-[1.5px] border-t-0 border-ink bg-hatch" aria-hidden="true" />
      <div ref={hanger} className="flex origin-top flex-col items-center will-change-transform">
        <div className="h-[30px] w-[1.5px] bg-ink" aria-hidden="true" />
        <div
          role="button"
          tabIndex={0}
          onClick={start}
          onKeyDown={onKey}
          aria-label="Road pass. Click to start the engine."
          className="print-shadow relative -mt-2 w-[250px] cursor-pointer select-none rounded-2xl border-[1.5px] border-ink bg-panel px-5 pb-4 pt-[30px]"
        >
          <span
            className="absolute left-1/2 top-2.5 -ml-[8.5px] size-3.5 rounded-full border-[1.5px] border-ink bg-paper"
            aria-hidden="true"
          />
          <div className="flex justify-between whitespace-nowrap text-[9.5px] tracking-[.14em]">
            <span>ROAD PASS</span>
            <span>No. 2911</span>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-end gap-2">
            <div>
              <div className={label}>FROM</div>
              <div className="text-[22px] font-medium leading-[1.1]">HOME</div>
            </div>
            <div className="pb-[3px] text-[16px]" aria-hidden="true">
              →
            </div>
            <div>
              <div className={label}>TO</div>
              <div className="text-[22px] font-medium leading-[1.1]">WORK</div>
            </div>
          </div>
          <div className="-mx-5 my-3.5 border-t-[1.5px] border-dashed border-line" />
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-3">
            <div>
              <div className={label}>DRIVER</div>
              <div className="text-[14px] font-medium">you!</div>
            </div>
            <div>
              <div className={label}>PLATE</div>
              <div className="text-[14px] font-medium">SNOW·ACE</div>
            </div>
            <div>
              <div className={label}>TODAY</div>
              <div className="text-[14px] font-medium">{now ? formatDay(now) : "-- ---"}</div>
            </div>
            <div>
              <div className={label}>SAIGON</div>
              <div className="tabular text-[14px] font-medium">{now ? formatTime(now) : "--:--:--"}</div>
            </div>
          </div>
          <div className="-mx-5 mb-2.5 mt-3.5 border-t-[1.5px] border-dashed border-line" />
          <div className="font-hand text-[22px] leading-none">snow ace&apos;s 2026 portfolio</div>
          <div
            className="mt-2.5 h-6 bg-[repeating-linear-gradient(90deg,var(--ink)_0_2px,transparent_2px_4px,var(--ink)_4px_5px,transparent_5px_8px,var(--ink)_8px_11px,transparent_11px_13px)]"
            aria-hidden="true"
          />
          {stampTime && (
            <motion.div
              className="pointer-events-none absolute -right-[18px] bottom-11 flex size-[104px] flex-col items-center justify-center rounded-full border-[2.5px] border-ink bg-[color-mix(in_oklch,var(--panel)_70%,transparent)]"
              initial={{ scale: 1.7, rotate: -24, opacity: 0 }}
              animate={{ scale: 1, rotate: -14, opacity: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { default: { duration: 0.35, ease: [0.3, 1.6, 0.5, 1] }, opacity: { duration: 0.2 } }
              }
            >
              <span className="absolute inset-[5px] rounded-full border border-ink" aria-hidden="true" />
              <span className="text-[9px] tracking-[.18em]">ENGINE</span>
              <span className="text-[19px] font-medium leading-[1.1]">ON</span>
              <span className="text-[9px] tracking-[.08em]">{stampTime}</span>
            </motion.div>
          )}
        </div>
      </div>
      <EngineStart onStart={ignite} onRevPeak={onStart} />
    </div>
  );
}
