"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { CarGlyph } from "@/components/CarGlyph";
import { IllustrationSlot } from "@/components/IllustrationSlot";
import { InkAvatar } from "@/components/InkAvatar";
import { site } from "@/content/site";
import { useCopyEmail } from "@/lib/copy";
import { scrollToY } from "@/lib/scroll";

const linkClass = "underline underline-offset-[3px]";

// "End of the road": a rest stop with the car parked in its bay, then the sign-off.
export function Footer() {
  const lenis = useLenis();
  const { copied, copy } = useCopyEmail();

  return (
    <footer className="mt-[clamp(64px,8vw,110px)] flex flex-col">
      <div className="flex flex-col items-center" aria-hidden="true">
        <span className="rounded-[5px] border-[1.5px] border-ink bg-ink px-3 py-[5px] text-[11px] tracking-[.2em] text-panel">
          END OF THE ROAD
        </span>
        <span className="h-[18px] w-[1.5px] bg-ink" />
      </div>
      <IllustrationSlot
        label={"Illustration · roadside rest stop\nbench, vending machine, sleepy dog"}
        className="h-[clamp(170px,20vw,240px)] rounded-t-2xl border-[1.5px] border-b-0 border-ink p-3.5"
        labelClassName="mr-[60px] max-w-[calc(100%-120px)]"
      >
        <div className="absolute bottom-0 right-[clamp(20px,8%,90px)] flex h-10 w-16 items-end justify-center border-[1.5px] border-b-0 border-dashed border-ink bg-panel pb-0.5">
          <span className="absolute left-[5px] top-[3px] text-[9px] font-medium" aria-hidden="true">
            P
          </span>
          <CarGlyph />
        </div>
      </IllustrationSlot>
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-[18px] border-t-[1.5px] border-ink px-0.5 pb-2 pt-[22px]">
        <div className="flex min-w-0 flex-[1_1_300px] items-center gap-3">
          <InkAvatar size={40} />
          <div className="min-w-0">
            <p className="font-serif text-[22px] leading-none">{site.name}</p>
            <p className="mt-1 text-pretty text-[12px] leading-[1.6]">
              Designed and built by {site.name}, somewhere between a code editor and an open road.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2 text-[12px]">
          <Link href="/projects" className={linkClass}>
            Projects
          </Link>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn
          </a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Resume
          </a>
          <button type="button" onClick={copy} className={linkClass} aria-label={`Copy email address ${site.email}`}>
            Email
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? "Email copied" : ""}
          </span>
          <button
            type="button"
            onClick={() => scrollToY(0, lenis)}
            className="whitespace-nowrap rounded-[5px] border-[1.5px] border-ink px-[9px] py-1 text-[10.5px] tracking-[.14em]"
          >
            ↑ BACK TO KM 0
          </button>
        </div>
      </div>
    </footer>
  );
}
