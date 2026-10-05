"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { Chip } from "@/components/Tag";
import { useReducedMotionSafe } from "@/lib/motion";

const SVG_NS = "http://www.w3.org/2000/svg";
const MAX_FLAKES = 46;
const WIPE_MS = 1100;

const pines = [
  "140,150 160,112 180,150",
  "185,150 200,122 215,150",
  "780,150 802,106 824,150",
  "830,150 846,118 862,150",
  "60,175 84,128 108,175",
  "900,180 926,126 952,180",
];

// KM 0.5, the driver's seat: scroll to speed up, snow settles on the glass, the wipers clear it.
// Everything moves through refs in one rAF loop that only runs while the panel is on screen.
export function Windshield() {
  const panel = useRef<HTMLDivElement>(null);
  const dash = useRef<SVGLineElement>(null);
  const snow = useRef<SVGGElement>(null);
  const wiperL = useRef<SVGLineElement>(null);
  const wiperR = useRef<SVGLineElement>(null);
  const needle = useRef<SVGLineElement>(null);
  const kmh = useRef<HTMLDivElement>(null);
  const speed = useRef(0);
  const wipe = useRef<{ start: number; cleared: boolean } | null>(null);
  const inView = useInView(panel);
  const reduce = useReducedMotionSafe();

  // Every scroll adds |Δy|·0.6 km/h, capped at 180.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      speed.current = Math.min(180, speed.current + Math.abs(window.scrollY - lastY) * 0.6);
      lastY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let last = performance.now();
    let dashOffset = 0;

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      // Speed decays at 60 km/h per second; the needle sweeps -120°..120° for 0..180.
      speed.current = Math.max(0, speed.current - dt * 60);
      const v = Math.round(speed.current);
      needle.current?.setAttribute("transform", `rotate(${-120 + (v / 180) * 240} 300 300)`);
      if (kmh.current) kmh.current.textContent = `${v} km/h`;

      if (!reduce && dash.current) {
        dashOffset += dt * (40 + speed.current * 3);
        dash.current.style.strokeDashoffset = String(-dashOffset);
      }

      const glass = snow.current;
      if (glass && !reduce && glass.childElementCount < MAX_FLAKES && Math.random() < dt * 1.4) {
        const flake = document.createElementNS(SVG_NS, "circle");
        flake.setAttribute("cx", (90 + Math.random() * 820).toFixed(0));
        flake.setAttribute("cy", (40 + Math.random() * 190).toFixed(0));
        flake.setAttribute("r", (1.6 + Math.random() * 2.6).toFixed(1));
        flake.setAttribute("opacity", "0.75");
        glass.appendChild(flake);
      }

      // Both wipers sweep sin(πt)·68° over 1.1s; the glass is clear a quarter of the way in.
      let angle = 0;
      const w = wipe.current;
      if (w) {
        const e = (t - w.start) / WIPE_MS;
        if (e >= 1) wipe.current = null;
        else {
          angle = Math.sin(Math.PI * e) * 68;
          if (e > 0.25 && !w.cleared) {
            w.cleared = true;
            glass?.replaceChildren();
          }
        }
      }
      wiperL.current?.setAttribute("transform", `rotate(${angle} 330 246)`);
      wiperR.current?.setAttribute("transform", `rotate(${angle} 680 246)`);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  const onWipe = () => {
    if (reduce) snow.current?.replaceChildren();
    else wipe.current = { start: performance.now(), cleared: false };
  };

  return (
    <div
      ref={panel}
      className="relative h-[clamp(220px,26vw,340px)] overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel"
    >
      <svg
        viewBox="0 0 1000 340"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 block size-full"
        role="img"
        aria-label="Line drawing of a snowy road seen through a car windshield"
      >
        <g className="fill-none stroke-ink" strokeWidth="1.5" opacity=".45">
          <polyline points="0,150 90,112 170,138 260,96 360,142 450,118 520,150" />
          <polyline points="560,150 640,104 720,134 810,90 900,128 1000,108" />
        </g>
        <line x1="0" y1="150" x2="1000" y2="150" className="stroke-ink" strokeWidth="1.5" />
        {pines.map((points) => (
          <polygon key={points} points={points} className="fill-panel stroke-ink" strokeWidth="1.5" />
        ))}
        <line x1="488" y1="150" x2="150" y2="340" className="stroke-ink" strokeWidth="2" />
        <line x1="512" y1="150" x2="850" y2="340" className="stroke-ink" strokeWidth="2" />
        <line ref={dash} x1="500" y1="150" x2="500" y2="340" className="stroke-ink" strokeWidth="3" strokeDasharray="18 22" />
        <g className="stroke-ink" strokeWidth="1.2" opacity=".5">
          <line x1="300" y1="200" x2="330" y2="204" />
          <line x1="660" y1="220" x2="694" y2="226" />
          <line x1="250" y1="250" x2="290" y2="256" />
          <line x1="740" y1="270" x2="782" y2="278" />
        </g>
        <g ref={snow} className="fill-ink" />
        {/* the windshield frame: an even-odd panel with the glass cut out */}
        <path
          fillRule="evenodd"
          d="M0 0 H1000 V340 H0 Z M70 26 Q500 4 930 26 Q962 140 986 252 Q500 232 14 252 Q38 140 70 26 Z"
          className="fill-panel stroke-ink"
          strokeWidth="3"
        />
        <path d="M8 40 L58 30 M942 30 L992 40" className="stroke-ink" strokeWidth="1.5" opacity=".5" />
        <line x1="500" y1="10" x2="500" y2="26" className="stroke-ink" strokeWidth="3" />
        <rect x="440" y="24" width="120" height="34" rx="12" className="fill-panel stroke-ink" strokeWidth="3" />
        <line x1="482" y1="58" x2="482" y2="84" className="stroke-ink" strokeWidth="1.5" />
        <rect x="470" y="82" width="24" height="34" rx="4" className="fill-panel stroke-ink" strokeWidth="2" />
        <line ref={wiperL} x1="330" y1="246" x2="80" y2="236" className="stroke-ink" strokeWidth="5" strokeLinecap="round" />
        <line ref={wiperR} x1="680" y1="246" x2="430" y2="236" className="stroke-ink" strokeWidth="5" strokeLinecap="round" />
        <path d="M0 252 Q500 226 1000 252 V340 H0 Z" className="fill-panel stroke-ink" strokeWidth="3" />
        <path d="M0 268 Q500 244 1000 268" className="fill-none stroke-ink" strokeWidth="1.2" opacity=".45" />
        <circle cx="300" cy="300" r="46" className="fill-panel stroke-ink" strokeWidth="2" />
        <path d="M262 316 A42 42 0 1 1 338 316" className="fill-none stroke-ink" strokeWidth="1.5" strokeDasharray="2 8" />
        <line
          ref={needle}
          x1="300"
          y1="300"
          x2="300"
          y2="266"
          transform="rotate(-120 300 300)"
          className="stroke-ink"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="300" cy="300" r="4" className="fill-ink" />
        <circle cx="300" cy="372" r="104" className="fill-none stroke-ink" strokeWidth="16" />
        <path d="M210 340 L300 352 L390 340" className="fill-none stroke-ink" strokeWidth="12" strokeLinejoin="round" />
        <circle cx="300" cy="356" r="26" className="fill-ink" />
      </svg>
      <Chip className="absolute left-3.5 top-3.5">
        KM 0.5<span className="hidden md:inline"> · DRIVER&apos;S SEAT</span>
      </Chip>
      <p className="pointer-events-none absolute right-3.5 top-3.5 text-right font-hand text-[20px] leading-none md:top-3 md:text-[22px]">
        scroll to drive<span className="hidden md:inline">,</span>
        <span className="hidden md:block">wipers when it snows</span>
      </p>
      <div className="absolute bottom-3 right-3 flex items-center gap-2.5">
        <div
          ref={kmh}
          className="tabular whitespace-nowrap rounded-[6px] border-[1.5px] border-ink bg-panel px-2.5 py-1.5 text-[11px] tracking-[.08em]"
        >
          0 km/h
        </div>
        <button
          type="button"
          onClick={onWipe}
          className="min-h-10 whitespace-nowrap rounded-full border-[1.5px] border-ink bg-ink px-3.5 text-[11px] tracking-[.14em] text-panel transition-opacity hover:opacity-88"
        >
          WIPERS
        </button>
      </div>
    </div>
  );
}
