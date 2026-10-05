"use client";

import { useMemo, useState } from "react";

// A road from HOME to ANYWHERE; the more scenic, the more it wiggles (sine envelope plus a 2.3× harmonic).
function route(s: number) {
  const amp = 4 + s * 0.42;
  const freq = 0.6 + s * 0.035;
  const steps = 90;
  let d = "";
  let length = 0;
  let px = 0;
  let py = 0;
  for (let k = 0; k <= steps; k++) {
    const t = k / steps;
    const x = 16 + t * 268;
    const env = Math.sin(Math.PI * t);
    const y =
      55 +
      amp * env * Math.sin(t * Math.PI * 2 * freq) +
      amp * 0.25 * env * Math.sin(t * Math.PI * 2 * freq * 2.3 + 1);
    d += `${k ? " L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    if (k) length += Math.hypot(x - px, y - py);
    px = x;
    py = y;
  }
  return { d, km: Math.round((300 * length) / 268) };
}

function note(s: number) {
  if (s < 20) return "The fast way. Boring.";
  if (s < 55) return "Now we're talking.";
  if (s < 85) return "The long way round, every time.";
  return "Every hairpin on the map.";
}

export function ScenicRoute() {
  const [scenic, setScenic] = useState(70);
  const { d, km } = useMemo(() => route(scenic), [scenic]);

  return (
    <div className="overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel">
      <div className="flex min-h-[172px] flex-col gap-1.5 border-b-[1.5px] border-ink px-4 pb-3.5 pt-3">
        <svg viewBox="0 0 300 110" className="block h-auto w-full overflow-visible" aria-hidden="true">
          <path d={d} className="fill-none stroke-ink" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} className="fill-none stroke-panel" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} className="fill-none stroke-ink" strokeWidth="1" strokeDasharray="4 5" strokeLinecap="round" />
          <circle cx="16" cy="55" r="6" className="fill-ink" />
          <circle cx="284" cy="55" r="6" className="fill-panel stroke-ink" strokeWidth="2" />
        </svg>
        <div className="flex items-baseline justify-between text-[9.5px] tracking-[.16em]">
          <span>HOME</span>
          <span className="tabular font-serif text-[22px] tracking-normal" aria-live="polite">
            {km} km
          </span>
          <span>ANYWHERE</span>
        </div>
        <label className="flex min-h-8 items-center gap-2.5 text-[9.5px] tracking-[.14em]">
          <span>FAST</span>
          <input
            type="range"
            min={0}
            max={100}
            value={scenic}
            onChange={(e) => setScenic(Number(e.target.value))}
            aria-label="How scenic is the route"
            className="min-w-0 flex-1 cursor-pointer accent-ink"
          />
          <span>SCENIC</span>
        </label>
      </div>
      <div className="px-4 py-3.5">
        <p className="text-[10px] tracking-[.16em]">ROAD TRIPS</p>
        <h3 className="mt-1 font-serif text-[24px] leading-[1.1]">{note(scenic)}</h3>
      </div>
    </div>
  );
}
