import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    ...(project.image && {
      openGraph: { images: [{ url: project.image.src, width: project.image.width, height: project.image.height }] },
    }),
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-32 md:px-6 md:pt-40">
      <Reveal>
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeftIcon size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Projects
        </Link>
        <h1 className="mt-8 text-5xl font-semibold tracking-tighter md:text-7xl">{project.title}</h1>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">{project.summary}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        <div className="overflow-hidden rounded-2xl bg-sunken ring-1 ring-line">
          {project.image && <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            className="w-full"
          />}
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <h2 className="text-2xl font-semibold tracking-tight">What I built</h2>
          <ul className="mt-6 space-y-4">
            {project.highlights.map((h) => (
              <li key={h} className="max-w-[60ch] text-base leading-relaxed text-muted">
                {h}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <dl className="space-y-6">
            <div>
              <dt className="text-sm text-muted">Type</dt>
              <dd className="mt-1 text-base">
                {project.kind}
                
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-sm font-medium text-accent-fg transition-transform hover:-translate-y-px active:scale-[0.98]"
            >
              View code
              <ArrowUpRightIcon size={14} weight="bold" />
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center whitespace-nowrap rounded-full border border-line px-5 text-sm font-medium transition-colors hover:bg-surface active:scale-[0.98]"
              >
                Live site
              </a>
            )}
          </div>
        </Reveal>
      </div>

      {next.slug !== project.slug && (
        <Reveal className="mt-28 border-t border-line pt-10">
          <Link href={`/projects/${next.slug}`} className="group flex items-end justify-between gap-6">
            <span>
              <span className="block text-sm text-muted">Next project</span>
              <span className="mt-2 block text-4xl font-semibold tracking-tighter transition-transform duration-500 ease-out-soft group-hover:translate-x-2 md:text-6xl">
                {next.title}
              </span>
            </span>
            <ArrowUpRightIcon size={32} className="shrink-0" aria-hidden="true" />
          </Link>
        </Reveal>
      )}
    </article>
  );
}
