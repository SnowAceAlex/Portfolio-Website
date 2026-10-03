import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Full-stack applications and systems built by Vinh Bui.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 md:px-6 md:pt-40">
      <Reveal>
        <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">Projects</h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
          Apps and systems I have built across the web, the backend and everything in between.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "md:mt-24" : undefined}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="overflow-hidden rounded-2xl bg-sunken ring-1 ring-line">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover object-left-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{project.title}</h2>
                  <p className="mt-1 text-base text-muted">{project.kind}</p>
                </div>
                <ArrowUpRightIcon
                  size={24}
                  className="mt-1 shrink-0 transition-transform duration-500 ease-out-soft group-hover:-translate-y-1 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
              <p className="mt-3 max-w-[50ch] text-base leading-relaxed text-muted">{project.summary}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
