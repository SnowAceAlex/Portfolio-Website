import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { ContactCta } from "@/components/ContactCta";
import { Hero } from "@/components/hero/Hero";
import { Journey } from "@/components/Journey";
import { Reveal } from "@/components/motion/Reveal";
import { QuickLinks } from "@/components/QuickLinks";
import { WorkList } from "@/components/WorkList";
import { journey, projects } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinks />

      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-28 md:px-6 md:pt-40">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">Selected work</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 md:mt-14">
          <WorkList projects={projects} />
        </Reveal>
        <Reveal className="mt-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-base text-muted transition-colors hover:text-fg"
          >
            All projects
            <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <section
        id="journey"
        className="mx-auto grid max-w-6xl scroll-mt-24 grid-cols-1 gap-12 px-4 pt-28 md:grid-cols-12 md:px-6 md:pt-40"
      >
        <div className="md:col-span-4">
          <Reveal className="md:sticky md:top-32">
            <h2 className="text-balance text-4xl font-semibold tracking-tighter md:text-5xl">The road so far</h2>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Journey stops={journey} />
        </div>
      </section>

      <section className="pt-28 md:pt-40">
        <Reveal className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">What I build with</h2>
        </Reveal>
      </section>

      <ContactCta />
    </>
  );
}
