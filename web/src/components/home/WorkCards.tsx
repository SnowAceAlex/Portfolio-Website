import Link from "next/link";
import type { CSSProperties } from "react";
import { ProjectImage } from "@/components/ProjectImage";
import { Section } from "@/components/home/Section";
import { Tag } from "@/components/Tag";
import { projects } from "@/content/site";

// The layout repeats every four cards, so 2–8 projects all sit well.
const flex = ["7 1 400px", "5 1 300px", "5 1 300px", "7 1 400px"];
const tilt = ["-0.8deg", "0.7deg", "0.6deg", "-0.6deg"];
const count = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export function WorkCards() {
  return (
    <Section
      id="work"
      kicker="EXIT 01"
      title="Selected work."
      note={
        <>
          {count[projects.length] ?? projects.length} so far,
          <br />
          more on the way
        </>
      }
      bodyClassName="flex flex-wrap gap-x-[22px] gap-y-9"
    >
      {projects.map((project, i) => {
        const tags = project.stack.length > 4 ? [...project.stack.slice(0, 3), `+${project.stack.length - 3}`] : project.stack;
        return (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            style={{ flex: flex[i % 4], "--tilt": tilt[i % 4] } as CSSProperties}
            className="ink-hover relative block min-w-0 no-underline transition-[rotate,translate] duration-500 ease-lift hover:-translate-y-[5px] focus-visible:-translate-y-[5px] desk:rotate-(--tilt) desk:hover:rotate-0 desk:focus-visible:rotate-0"
          >
            {/* washi tape */}
            <span
              className="absolute -top-[11px] left-1/2 z-[2] -ml-[45px] h-[22px] w-[90px] -rotate-3 border border-line bg-[color-mix(in_oklch,var(--ink)_14%,var(--panel))]"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-panel">
              <ProjectImage
                project={project}
                sizes="(min-width: 900px) 40vw, 100vw"
                placeholderClassName="p-4 pb-[120px]"
              />
              <span className="absolute right-3 top-3 rounded-[5px] border-[1.5px] border-ink bg-panel px-2 py-1 text-[10px] tracking-[.14em]">
                VIEW TRIP ↗
              </span>
            </div>
            <div className="absolute bottom-3.5 left-3.5 max-w-[calc(100%-56px)] rounded-[5px] border-[1.5px] border-ink bg-panel px-3.5 pb-3 pt-[11px]">
              <p className="truncate text-[9.5px] uppercase leading-[1.5] tracking-[.14em]">
                EXIT {project.exitCode} · {project.kind}
              </p>
              <h3 className="mt-1 font-serif text-[clamp(24px,2.4vw,30px)] leading-[1.05]">{project.title}</h3>
              <div className="mt-[9px] flex flex-wrap gap-[5px]">
                {tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
      <div className="flex flex-[1_1_100%] justify-end">
        <Link href="/projects" className="pill pill-outline">
          All projects →
        </Link>
      </div>
    </Section>
  );
}
