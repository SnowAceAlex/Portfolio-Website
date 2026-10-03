import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { CopyEmail } from "@/components/CopyEmail";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-28 md:px-6 md:py-40">
      <Reveal>
        <h2 className="max-w-[16ch] text-5xl font-semibold leading-[1.02] tracking-tighter md:text-7xl">
          Let&apos;s build something together.
        </h2>
      </Reveal>
      <Reveal delay={0.12} className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <CopyEmail large />
        <Magnetic>
          <Link
            href="/contact"
            className="inline-flex h-14 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-8 text-base font-medium text-accent-fg transition-transform duration-300 hover:-translate-y-px active:scale-[0.98]"
          >
            Say hello
            <ArrowUpRightIcon size={18} weight="bold" />
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
