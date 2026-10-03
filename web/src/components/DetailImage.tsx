"use client";

import { useState } from "react";
import { ProjectImage } from "@/components/ProjectImage";
import type { Project } from "@/content/site";

const tape = "absolute -top-[11px] z-[2] h-6 w-[110px] border border-line bg-[color-mix(in_oklch,var(--ink)_14%,var(--panel))]";

// The project's hero shot, taped to the page, with an INK / COLOUR switch for the print treatment.
export function DetailImage({ project }: { project: Project }) {
  const [colour, setColour] = useState(false);
  const option = (on: boolean) => `min-h-9 px-3.5 ${on ? "bg-ink text-panel" : "text-ink"}`;

  return (
    <div className="relative">
      <span className={`${tape} left-[12%] -rotate-2`} aria-hidden="true" />
      <span className={`${tape} right-[12%] rotate-[2.5deg]`} aria-hidden="true" />
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel">
        <ProjectImage project={project} sizes="(min-width: 900px) 75vw, 100vw" colour={colour} priority placeholderClassName="p-6" />
        {project.image && (
          <div
            role="group"
            aria-label="Image treatment"
            className="absolute bottom-3.5 right-3.5 flex overflow-hidden rounded-full border-[1.5px] border-ink bg-panel text-[11px] tracking-[.1em]"
          >
            <button type="button" aria-pressed={!colour} onClick={() => setColour(false)} className={option(!colour)}>
              INK
            </button>
            <button type="button" aria-pressed={colour} onClick={() => setColour(true)} className={option(colour)}>
              COLOUR
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
