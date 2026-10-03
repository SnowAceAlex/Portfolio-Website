"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "counting" | "go" | "jump" | "done";

const hints: Record<Exclude<Phase, "done">, string> = {
  idle: "click to start the lights",
  counting: "wait for lights out…",
  go: "click! click!",
  jump: "drive-through penalty. again?",
};

function resultNote(ms: number) {
  if (ms < 200) return "rocket start. suspicious.";
  if (ms < 300) return "podium pace";
  if (ms < 450) return "clean getaway";
  return "still on coffee #1";
}

const secs = (ms: number) => `${(ms / 1000).toFixed(3)} s`;

// Race weekends: five lights fill every 750ms, hold for 0.5–2.7s, then go out. React!
export function StartLights() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [lit, setLit] = useState(0);
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const goAt = useRef(0);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const tap = () => {
    if (phase === "counting") {
      clear();
      setLit(0);
      setPhase("jump");
      return;
    }
    if (phase === "go") {
      const t = performance.now() - goAt.current;
      setMs(t);
      setBest((b) => (b === null ? t : Math.min(b, t)));
      setPhase("done");
      return;
    }
    clear();
    setPhase("counting");
    setLit(0);
    setMs(null);
    for (let k = 1; k <= 5; k++) timers.current.push(setTimeout(() => setLit(k), k * 750));
    const hold = 5 * 750 + 500 + Math.random() * 2200;
    timers.current.push(
      setTimeout(() => {
        goAt.current = performance.now();
        setLit(0);
        setPhase("go");
      }, hold),
    );
  };

  const readout = phase === "jump" ? "Jump start" : phase === "go" ? "GO!" : ms !== null ? secs(ms) : "0.000 s";
  const hint = phase === "done" && ms !== null ? resultNote(ms) : hints[phase as Exclude<Phase, "done">];

  return (
    <div className="overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel">
      <button
        type="button"
        onPointerDown={(e) => {
          // React on press, not release: every millisecond counts.
          if (e.pointerType === "mouse" && e.button !== 0) return;
          e.preventDefault();
          tap();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!e.repeat) tap();
          }
        }}
        aria-label="Start-lights reaction game"
        className="flex min-h-[172px] w-full select-none flex-col items-center justify-center gap-2.5 border-b-[1.5px] border-ink px-3 py-4 [-webkit-tap-highlight-color:transparent]"
      >
        <span className="flex gap-[7px] rounded-[8px] border-[1.5px] border-ink bg-panel px-2.5 py-2" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((k) => (
            <span
              key={k}
              className={`size-[22px] rounded-full border-[1.5px] border-ink transition-colors duration-[60ms] ${
                phase === "counting" && lit >= k ? "bg-ink" : ""
              }`}
            />
          ))}
        </span>
        <span className="tabular font-serif text-[30px] leading-none" aria-live="polite">
          {readout}
        </span>
        <span className="text-center font-hand text-[22px] leading-none">{hint}</span>
      </button>
      <div className="flex items-end justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[.16em]">RACE WEEKENDS</p>
          <h3 className="mt-1 font-serif text-[24px] leading-[1.1]">Lights out, coffee in.</h3>
        </div>
        <div className="flex-none text-right">
          <p className="text-[9px] tracking-[.16em]">BEST</p>
          <p className="tabular text-[13px] font-medium">{best === null ? "—" : secs(best)}</p>
        </div>
      </div>
    </div>
  );
}
