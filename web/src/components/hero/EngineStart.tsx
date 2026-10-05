"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { useReducedMotionSafe } from "@/lib/motion";

const MAX_RPM = 8000;
const HOP_DELAY = 650; // when the revs peak
const ARC = "M14 62 A46 46 0 0 1 106 62";

// Crank, a rev to 3400, then a gently wobbling idle; 0 once the engine is off.
function targetRpm(on: boolean, startedAt: number, now: number) {
  if (!on) return 0;
  const e = (now - startedAt) / 1000;
  if (e < 0.45) return 300 + Math.sin(e * 60) * 180;
  if (e < 1.1) return 3400;
  return 850 + Math.sin(now / 90) * 25 + Math.sin(now / 37) * 12;
}

// Push-to-start button and tachometer at the foot of the road pass. Starting the engine kicks the
// pass and lands the stamp (`onStart`), then hops the car when the revs peak (`onRevPeak`).
export function EngineStart({ onStart, onRevPeak }: { onStart: () => void; onRevPeak: () => void }) {
  const reduce = useReducedMotionSafe();
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const needle = useRef<SVGLineElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const rpm = useRef(0);
  const hopTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pressTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [engineOn, setEngineOn] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [pressed, setPressed] = useState(false);

  const draw = (value: number) => {
    needle.current?.setAttribute("transform", `rotate(${-90 + (value / MAX_RPM) * 180} 60 62)`);
    if (readout.current) readout.current.textContent = `${Math.round(value / 10) * 10} RPM`;
  };

  useEffect(
    () => () => {
      clearTimeout(hopTimer.current);
      clearTimeout(pressTimer.current);
    },
    [],
  );

  // One rAF loop while the hero is on screen and the needle has somewhere to go.
  useEffect(() => {
    if (reduce) {
      rpm.current = engineOn ? 900 : 0;
      draw(rpm.current);
      return;
    }
    if (!inView || (!engineOn && rpm.current === 0)) return;
    let raf = 0;
    let last = performance.now();
    const frame = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const target = targetRpm(engineOn, startedAt ?? t, t);
      const k = target > rpm.current ? 9 : 3.5;
      rpm.current += (target - rpm.current) * Math.min(1, dt * k);
      if (!engineOn && rpm.current < 5) rpm.current = 0;
      draw(rpm.current);
      if (engineOn || rpm.current > 0) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, engineOn, startedAt, reduce]);

  const press = () => {
    clearTimeout(pressTimer.current);
    setPressed(true);
    pressTimer.current = setTimeout(() => setPressed(false), 140);

    if (engineOn) {
      clearTimeout(hopTimer.current);
      setEngineOn(false);
      return;
    }
    setEngineOn(true);
    setStartedAt(performance.now());
    onStart();
    clearTimeout(hopTimer.current);
    if (reduce) onRevPeak();
    else hopTimer.current = setTimeout(onRevPeak, HOP_DELAY);
  };

  const hint = engineOn
    ? "engine on. enjoy the drive"
    : startedAt === null
      ? "press to start the engine"
      : "engine off. press to go again";

  return (
    <div
      ref={root}
      className="mt-auto flex w-full flex-wrap items-center justify-center gap-[clamp(14px,3vw,26px)] border-t-[1.5px] border-dashed border-line px-[18px] pb-[18px] pt-4"
    >
      <button
        type="button"
        onClick={press}
        aria-pressed={engineOn}
        aria-label="Engine start stop"
        className="relative flex size-24 flex-none items-center justify-center rounded-full border-[1.5px] border-ink bg-[repeating-conic-gradient(var(--ink)_0_2deg,transparent_2deg_10deg)] transition-shadow duration-[120ms] hover:shadow-[0_0_0_5px_var(--hatch)]"
      >
        <span className="absolute inset-[7px] rounded-full border-[1.5px] border-ink bg-panel" aria-hidden="true" />
        <span
          className={`relative flex size-[70px] flex-col items-center justify-center rounded-full border-2 border-ink ${
            engineOn ? "bg-ink text-panel shadow-[inset_0_0_0_3px_var(--panel)]" : "bg-panel text-ink shadow-[inset_0_-3px_0_var(--hatch)]"
          } ${pressed ? "scale-[.92]" : ""}`}
          style={{ transition: "transform .12s, background-color .35s, color .35s, box-shadow .12s" }}
          aria-hidden="true"
        >
          <span className={`mb-[3px] size-1.5 rounded-full border-[1.5px] border-current ${engineOn ? "bg-panel" : ""}`} />
          <span className="text-[8.5px] leading-tight tracking-[.16em]">ENGINE</span>
          <span className="text-[11px] font-medium leading-tight tracking-[.12em]">START</span>
          <span className="text-[8.5px] leading-tight tracking-[.16em]">STOP</span>
        </span>
      </button>

      <div className="flex flex-col items-center gap-1.5">
        <svg viewBox="0 0 120 70" width="120" height="70" className="block overflow-visible" aria-hidden="true">
          <path d={ARC} className="fill-none stroke-ink" strokeWidth="1.5" />
          <path d={ARC} className="fill-none stroke-ink" strokeWidth="6" strokeDasharray="1.2 10.3" opacity=".7" />
          <path d="M92 29 A46 46 0 0 1 106 62" className="fill-none stroke-ink" strokeWidth="5" opacity=".35" />
          <text x="60" y="48" textAnchor="middle" className="fill-ink font-mono" fontSize="7" style={{ letterSpacing: ".12em" }}>
            RPM ×1000
          </text>
          <line
            ref={needle}
            x1="60"
            y1="62"
            x2="60"
            y2="24"
            transform="rotate(-90 60 62)"
            className="stroke-ink"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="60" cy="62" r="4" className="fill-ink" />
        </svg>
        <span ref={readout} className="tabular text-[10.5px] tracking-[.12em]">
          0 RPM
        </span>
      </div>

      <p className="basis-full text-center font-hand text-[28px] leading-none" aria-live="polite">
        {hint}
      </p>
    </div>
  );
}
