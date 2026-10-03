import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { HeroScene } from "@/components/hero/HeroScene";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-28 md:px-6 md:pt-32">
      <Reveal className="flex items-center gap-3">
        <Image
          src="/avatar.png"
          alt={`${site.name}'s memoji avatar`}
          width={48}
          height={48}
          priority
          className="size-12 rounded-full bg-surface ring-1 ring-line"
        />
        <p className="text-base text-muted">Hi, I&apos;m Vinh.</p>
      </Reveal>

      <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.02] tracking-tighter sm:text-6xl lg:text-[5.25rem]">
        <RevealWords text="Full-stack developer," delay={0.1} className="block" />
        <RevealWords text="taking the scenic route." delay={0.28} className="block text-muted" />
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col lg:col-span-4">
          <Reveal delay={0.5}>
            <p className="max-w-[40ch] text-lg leading-relaxed text-muted">
              Final-year Computer Science student at IU, VNU-HCMC. I build web apps, and I love cars, road trips and race
              weekends.
            </p>
          </Reveal>

          <Reveal delay={0.62} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 text-[15px] font-medium text-accent-fg transition-transform duration-300 hover:-translate-y-px active:scale-[0.98]"
              >
                Say hello
                <ArrowUpRightIcon size={16} weight="bold" />
              </Link>
            </Magnetic>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center whitespace-nowrap rounded-full border border-line px-6 text-[15px] font-medium text-fg transition-colors duration-300 hover:bg-surface active:scale-[0.98]"
            >
              Resume
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-8">
          <div className="aspect-4/3 w-full sm:aspect-video">
            <HeroScene />
          </div>
          <p className="mt-3 font-mono text-xs text-muted">Snow Ace, out for a drive. Click the car.</p>
        </Reveal>
      </div>
    </section>
  );
}
