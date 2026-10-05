import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailImage } from "@/components/DetailImage";
import { ProjectImage } from "@/components/ProjectImage";
import { Chip, Tag } from "@/components/Tag";
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

const field = "text-[9.5px] tracking-[.16em]";

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="flex flex-col gap-[clamp(28px,4vw,48px)]">
      <div>
        <Link href="/projects" className="text-[11px] tracking-[.16em] no-underline hover:underline">
          ← EXIT 01 · ALL PROJECTS
        </Link>
        <div className="mt-[22px] flex flex-wrap items-end gap-x-[clamp(20px,4vw,56px)] gap-y-6">
          <div className="min-w-0 flex-[3_1_420px]">
            <p className="text-[11px] uppercase tracking-[.18em]">
              Exit {project.exitCode} · {project.kind}
            </p>
            <h1 className="mt-3 font-serif text-[clamp(60px,8.5vw,120px)] leading-[.92] tracking-[-.025em]">
              {project.title}.
            </h1>
            <p className="mt-[18px] max-w-[54ch] text-pretty text-[14px] leading-[1.75]">{project.summary}</p>
          </div>
          <aside
            aria-label="Trip card"
            className="min-w-0 max-w-[420px] flex-[2_1_280px] overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-panel"
          >
            <div className="flex justify-between bg-ink px-4 py-[9px] text-[10px] tracking-[.18em] text-panel">
              <span>TRIP CARD</span>
              <span>No. {project.exitCode}</span>
            </div>
            <div className="flex flex-col gap-3.5 p-4">
              <dl className="flex flex-col gap-3.5">
                <div>
                  <dt className={field}>TYPE</dt>
                  <dd className="mt-[3px] text-[13.5px]">{project.kind}</dd>
                </div>
                <div>
                  <dt className={field}>SCOPE</dt>
                  <dd className="mt-[3px] text-[13.5px]">{project.scope}</dd>
                </div>
                <div>
                  <dt className={field}>STACK</dt>
                  <dd className="mt-[7px] flex flex-wrap gap-[5px]">
                    {project.stack.map((t) => (
                      <Tag key={t} size="md">
                        {t}
                      </Tag>
                    ))}
                  </dd>
                </div>
              </dl>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-ink justify-between! px-4!"
              >
                <span>View code</span>
                <span aria-hidden="true">↗</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-outline justify-between! px-4!"
                >
                  <span>Live site</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>

      <DetailImage project={project} />

      <section aria-labelledby="built-title" className="flex flex-wrap gap-x-[clamp(20px,4vw,56px)] gap-y-6">
        <div className="max-w-[300px] flex-[1_1_220px]">
          <h2 id="built-title" className="font-serif text-[clamp(36px,4vw,52px)] leading-none">
            What I built.
          </h2>
          <p className="mt-2.5 font-hand text-[24px]">the stops along the way</p>
        </div>
        <ol className="min-w-0 flex-[3_1_420px] border-t-[1.5px] border-ink">
          {project.highlights.map((h, i) => (
            <li key={h} className="flex items-baseline gap-[18px] border-b border-line py-[18px]">
              <Chip size="md" className="flex-none tracking-[.12em]!">
                KM {i}
              </Chip>
              <span className="text-pretty text-[14px] leading-[1.7]">{h}</span>
            </li>
          ))}
        </ol>
      </section>

      {next.slug !== project.slug && (
        <Link
          href={`/projects/${next.slug}`}
          className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border-[1.5px] border-ink bg-panel p-[clamp(18px,3vw,32px)] no-underline transition-shadow hover:shadow-[6px_7px_0_var(--hatch)] focus-visible:shadow-[6px_7px_0_var(--hatch)]"
        >
          <div className="min-w-0">
            <p className="text-[11px] tracking-[.18em]">NEXT EXIT →</p>
            <p className="mt-2 font-serif text-[clamp(44px,6vw,80px)] leading-none">{next.title}.</p>
            <p className="mt-2 text-[12.5px]">{next.kind}</p>
          </div>
          <div className="relative aspect-[4/3] w-[min(280px,100%)] rotate-[1.5deg] overflow-hidden rounded-xl border-[1.5px] border-ink">
            <ProjectImage project={next} sizes="280px" short placeholderClassName="p-3" />
          </div>
        </Link>
      )}
    </article>
  );
}
