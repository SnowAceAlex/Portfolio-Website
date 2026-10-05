import { Section } from "@/components/home/Section";
import { Tag } from "@/components/Tag";
import { experience } from "@/content/site";

// Miles on the clock: one logbook card per job, newest first.
export function Logbook() {
  return (
    <Section
      id="experience"
      kicker="EXIT 02"
      title="Miles on the clock."
      note={
        <>
          real codebases,
          <br />
          real users
        </>
      }
      bodyClassName="flex flex-col gap-4"
    >
      {experience.map((job, i) => {
        const entry = String(experience.length - i).padStart(2, "0");
        const where = (job.mode ?? job.location).toUpperCase();
        return (
          <article key={job.org} className="overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel">
            <div
              className={`flex flex-wrap justify-between gap-x-4 gap-y-1.5 border-b-[1.5px] border-ink px-[18px] py-[9px] text-[10px] tracking-[.16em] ${
                job.primary ? "bg-ink text-panel" : ""
              }`}
            >
              <span>
                LOGBOOK · ENTRY {entry} · {where}
              </span>
              <span>
                {job.start.toUpperCase()} – {job.end.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-9 gap-y-5 p-[clamp(18px,2.4vw,26px)]">
              <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-1.5">
                <h3 className="font-serif text-[clamp(30px,3vw,40px)] leading-none">{job.org}</h3>
                <p className="text-[13px] font-medium">{job.role}</p>
                <p className="text-pretty text-[12px] leading-[1.6]">{job.about}</p>
                <div className="mt-2.5 flex items-center gap-2.5">
                  <div className="flex overflow-hidden rounded-[5px] border-[1.5px] border-ink" aria-hidden="true">
                    {String(job.months)
                      .padStart(2, "0")
                      .split("")
                      .map((d, k) => (
                        <span
                          key={k}
                          className="tabular flex h-[30px] w-[22px] items-center justify-center border-r border-line text-[16px] font-medium last:border-r-0"
                        >
                          {d}
                        </span>
                      ))}
                  </div>
                  <span className="text-[9.5px] leading-[1.4] tracking-[.16em]">
                    <span className="sr-only">{job.months} </span>MONTHS
                    <br />
                    ON THE ROAD
                  </span>
                </div>
              </div>
              <div className="min-w-0 flex-[2_1_320px]">
                <ol className="border-t-[1.5px] border-ink">
                  {job.points.map((point, k) => (
                    <li key={k} className="flex items-baseline gap-3.5 border-b border-dashed border-line py-[11px]">
                      <span className="flex-none text-[10px] tracking-[.12em]">{String(k + 1).padStart(2, "0")}</span>
                      <span className="text-pretty text-[13px] leading-[1.65]">{point}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-3.5 flex flex-wrap gap-[5px]">
                  {job.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </Section>
  );
}
