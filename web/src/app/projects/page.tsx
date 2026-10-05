import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProjectImage } from "@/components/ProjectImage";
import { Tag } from "@/components/Tag";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Full-stack applications and systems built by Vinh Bui.",
};

const tilt = ["-0.8deg", "0.7deg", "0.6deg", "-0.6deg"];

export default function ProjectsPage() {
  return (
    <section aria-labelledby="projects-title" className="flex flex-col gap-[clamp(28px,4vw,48px)]">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[.18em]">EXIT 01 · ALL PROJECTS</p>
          <h1
            id="projects-title"
            className="mt-3 font-serif text-[clamp(60px,8.5vw,120px)] leading-[.92] tracking-[-.025em]"
          >
            The trip log.
          </h1>
          <p className="mt-4 max-w-[54ch] text-pretty text-[14px] leading-[1.75]">
            Apps and systems I have built across the web, the backend and everything in between.
          </p>
        </div>
        <p className="font-hand text-[28px] leading-none">{projects.length} stops logged, more to come</p>
      </div>

      <ol className="border-t-[1.5px] border-ink">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              style={{ "--tilt": tilt[i % 4] } as CSSProperties}
              className="ink-hover group flex flex-wrap items-center gap-x-[clamp(18px,3vw,40px)] gap-y-[18px] border-b-[1.5px] border-ink py-[clamp(16px,2.2vw,24px)] no-underline"
            >
              <span className="w-14 flex-none text-[11px] tracking-[.14em]">No. {String(i + 1).padStart(2, "0")}</span>
              <div className="relative aspect-[4/3] min-w-40 flex-[0_1_240px] overflow-hidden rounded-[10px] border-[1.5px] border-ink bg-panel transition-[rotate,translate] duration-500 ease-lift group-hover:-translate-y-[5px] group-focus-visible:-translate-y-[5px] desk:rotate-(--tilt) desk:group-hover:rotate-0 desk:group-focus-visible:rotate-0">
                <ProjectImage project={project} sizes="240px" short placeholderClassName="p-2.5" />
              </div>
              <div className="min-w-0 flex-[3_1_300px]">
                <p className="text-[10px] uppercase tracking-[.16em]">{project.kind}</p>
                <h2 className="mt-1.5 font-serif text-[clamp(34px,3.6vw,52px)] leading-none">{project.title}</h2>
                <p className="mt-2.5 max-w-[60ch] text-pretty text-[13px] leading-[1.7]">{project.summary}</p>
                <div className="mt-3 flex flex-wrap gap-[5px]">
                  {project.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
              <span
                className="flex size-11 flex-none items-center justify-center rounded-full border-[1.5px] border-ink text-[16px] transition-colors duration-300 group-hover:bg-ink group-hover:text-panel group-focus-visible:bg-ink group-focus-visible:text-panel"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </li>
        ))}
        <li className="flex flex-wrap items-center gap-3 border-b-[1.5px] border-dashed border-line py-5">
          <span className="w-14 flex-none text-[11px] tracking-[.14em]">NEXT</span>
          <span className="font-hand text-[26px] leading-none">this stretch of road is still being paved</span>
        </li>
      </ol>
    </section>
  );
}
