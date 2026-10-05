"use client";

import { useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { tools } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/motion";

function LuggageTag({ name }: { name: string }) {
  return (
    <li className="relative flex-none whitespace-nowrap rounded-[6px_14px_14px_6px] border-[1.5px] border-ink bg-panel py-2 pl-[26px] pr-3.5 text-[12.5px]">
      <span
        className="absolute left-[9px] top-1/2 -mt-[5px] size-[7px] rounded-full border-[1.5px] border-ink"
        aria-hidden="true"
      />
      {name}
    </li>
  );
}

// Trunk: the toolbox as luggage tags on a 24px/s marquee. A static wrapped list under reduced motion.
export function Trunk() {
  const reduce = useReducedMotionSafe();
  const track = useRef<HTMLDivElement>(null);
  const x = useRef(0);

  useAnimationFrame((_, delta) => {
    const el = track.current;
    if (!el || reduce) return;
    x.current += (Math.min(delta, 50) / 1000) * 24;
    const half = el.scrollWidth / 2 || 1;
    el.style.transform = `translateX(${-(x.current % half)}px)`;
  });

  return (
    <section aria-labelledby="trunk-title" className="mt-[clamp(56px,7vw,88px)]">
      <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-3.5">
          <span className="text-[11px] tracking-[.2em]">TRUNK</span>
          <h2 id="trunk-title" className="font-serif text-[30px]">
            Packed for the trip.
          </h2>
        </div>
        <p className="font-hand text-[23px]">plus Claude Code &amp; Cursor riding shotgun</p>
      </div>
      <div className="overflow-hidden border-y-[1.5px] border-ink py-3.5">
        {reduce ? (
          <ul className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <LuggageTag key={t} name={t} />
            ))}
          </ul>
        ) : (
          <div ref={track} className="flex w-max gap-3 will-change-transform">
            <ul className="flex gap-3">
              {tools.map((t) => (
                <LuggageTag key={t} name={t} />
              ))}
            </ul>
            {/* second copy makes the loop seamless */}
            <ul className="flex gap-3" aria-hidden="true">
              {tools.map((t) => (
                <LuggageTag key={t} name={t} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
