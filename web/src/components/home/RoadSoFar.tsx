"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { CarGlyph } from "@/components/CarGlyph";
import { IllustrationSlot } from "@/components/IllustrationSlot";
import { Section } from "@/components/home/Section";
import { Chip } from "@/components/Tag";
import { journey, nextStop } from "@/content/site";

const CAR_H = 40;

// The road so far: a vertical road with a top-down car that drives down it as you scroll.
export function RoadSoFar() {
  const road = useRef<HTMLDivElement>(null);
  const travel = useMotionValue(0);
  // progress = (0.55·vh − top) / height, clamped: starts when the road's top reaches 55% of the viewport.
  const { scrollYProgress } = useScroll({ target: road, offset: ["start 55%", "end 55%"] });
  const y = useTransform(() => scrollYProgress.get() * travel.get());

  useEffect(() => {
    const el = road.current;
    if (!el) return;
    const ro = new ResizeObserver(() => travel.set(Math.max(0, el.offsetHeight - CAR_H)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [travel]);

  return (
    <Section
      id="journey"
      kicker="EXIT 03"
      title="The road so far."
      note={
        <>
          school, hackathons
          <br />
          and a few trophies
        </>
      }
    >
      <div ref={road} className="relative pl-[86px]">
        <div
          className="absolute inset-y-0 left-3.5 w-11 border-x-[1.5px] border-ink bg-panel"
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 left-1/2 border-l-[1.5px] border-dashed border-ink opacity-45" />
        </div>
        <motion.div className="absolute left-[25px] top-0 z-[2] will-change-transform" style={{ y }} aria-hidden="true">
          <CarGlyph view="top" />
        </motion.div>
        <ol>
          {journey.map((stop) => (
            <li key={stop.km} className="relative pb-12">
              <span className="absolute -left-7 top-3 w-6 border-t-[1.5px] border-ink" aria-hidden="true" />
              <div className="flex items-center gap-2.5">
                <Chip size="md">KM {stop.km}</Chip>
                <span className="whitespace-nowrap text-[10.5px] uppercase tracking-[.16em]">{stop.date}</span>
              </div>
              <h3 className="mt-3 font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.08]">{stop.title}</h3>
              <p className="mt-2 max-w-[58ch] text-pretty text-[13px] leading-[1.75]">{stop.body}</p>
              {stop.illustration && (
                <IllustrationSlot
                  label={stop.illustration.label}
                  src={stop.illustration.src}
                  className="mt-4 h-[190px] rounded-[14px] border-[1.5px] border-ink p-3.5"
                />
              )}
            </li>
          ))}
          <li className="relative pb-2">
            <span className="absolute -left-7 top-[26px] w-6 border-t-[1.5px] border-dashed border-ink" aria-hidden="true" />
            <div className="rounded-[14px] border-[1.5px] border-dashed border-ink bg-panel px-5 py-[18px]">
              <div className="flex items-center gap-2.5">
                <Chip filled size="md">
                  KM ?
                </Chip>
                <span className="text-[10.5px] tracking-[.16em]">NEXT STOP</span>
              </div>
              <h3 className="mt-3 font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.08]">{nextStop.title}</h3>
              <p className="mt-2 max-w-[58ch] text-[13px] leading-[1.75]">{nextStop.body}</p>
            </div>
          </li>
        </ol>
      </div>
    </Section>
  );
}
