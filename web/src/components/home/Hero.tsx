"use client";

import Link from "next/link";
import { useRef } from "react";
import { HeroScene, type SceneHandle } from "@/components/hero/HeroScene";
import { RoadPass } from "@/components/home/RoadPass";
import { Chip } from "@/components/Tag";
import { site } from "@/content/site";

// KM 0: the 3D drive with the intro underneath, and the road pass that starts the engine.
export function Hero() {
  const scene = useRef<SceneHandle>(null);

  return (
    <div className="flex flex-wrap items-stretch gap-3.5">
      <div className="flex min-w-0 flex-[7_1_440px] flex-col overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel">
        <div className="relative h-[clamp(250px,30vw,380px)]">
          <HeroScene handle={scene} />
          <Chip className="pointer-events-none absolute left-3.5 top-3.5">KM 0</Chip>
          <p className="pointer-events-none absolute bottom-2.5 right-4 font-hand text-[24px]">psst, click the car</p>
        </div>
        <div className="flex flex-wrap items-end gap-x-8 gap-y-[18px] border-t-[1.5px] border-ink p-[clamp(18px,2.4vw,28px)]">
          <div className="min-w-0 flex-[1_1_340px]">
            <h1 className="text-balance font-serif text-[clamp(30px,3.3vw,46px)] leading-[1.04] tracking-[-.015em]">
              Full-stack developer, <em>taking the scenic route.</em>
            </h1>
            <p className="mt-3.5 max-w-[52ch] text-pretty text-[13px] leading-[1.75]">{site.intro}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/contact" className="pill pill-ink">
              Say hello →
            </Link>
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="pill pill-outline">
              Resume
            </a>
          </div>
        </div>
      </div>
      <RoadPass onStart={() => scene.current?.hop()} />
    </div>
  );
}
