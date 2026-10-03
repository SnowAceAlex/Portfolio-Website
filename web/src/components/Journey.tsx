"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { CarProfileIcon } from "@phosphor-icons/react";
import type { JourneyStop } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/motion";

// A vertical road: the car drives down it as you scroll, lighting up each stop it passes.
export function Journey({ stops }: { stops: JourneyStop[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  const carY = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <ol ref={ref} className="relative pl-14 md:pl-20">
      {/* Asphalt strip with a dashed centre line */}
      <div className="absolute inset-y-0 left-3 w-5 rounded-full bg-sunken md:left-6 md:w-6" aria-hidden="true">
        <div className="absolute inset-y-3 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-line" />
        <motion.div
          className="absolute inset-x-[7px] top-0 h-full origin-top rounded-full bg-accent/25 md:inset-x-2"
          style={{ scaleY: reduce ? 1 : progress }}
        />
      </div>

      {/* The car, travelling along the road */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-3 w-5 md:left-6 md:w-6"
        style={{ y: reduce ? "0%" : carY }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-0 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-accent shadow-[0_6px_20px_-8px_rgb(15_18_23/0.3)] md:size-10">
          <CarProfileIcon size={20} weight="fill" />
        </span>
      </motion.div>

      {stops.map((stop, i) => (
        <Stop key={i} stop={stop} last={i === stops.length - 1} />
      ))}
    </ol>
  );
}

function Stop({ stop, last }: { stop: JourneyStop; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reached = useInView(ref, { margin: "0px 0px -45% 0px" });

  return (
    <li ref={ref} className={`relative ${last ? "pb-2" : "pb-16 md:pb-24"}`}>
      <span
        className={`absolute -left-[40px] top-2 size-3 rounded-full ring-4 ring-bg transition-colors duration-500 md:-left-[50px] ${
          reached ? "bg-accent" : "bg-line"
        }`}
        aria-hidden="true"
      />
      {stop.when && <p className="font-mono text-xs text-muted">{stop.when}</p>}
      <h3
        className={`text-2xl font-semibold tracking-tight transition-colors duration-500 md:text-3xl ${
          reached ? "text-fg" : "text-muted"
        }`}
      >
        {stop.title}
      </h3>
      {stop.place && <p className="mt-1 text-base text-muted">{stop.place}</p>}
      <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted">{stop.body}</p>
    </li>
  );
}
