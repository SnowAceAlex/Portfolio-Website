import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { IllustrationSlot } from "@/components/IllustrationSlot";
import { site } from "@/content/site";

// EXIT 04: the closing call to action, with the copyable email.
export function ClosingCta() {
  return (
    <section
      id="say-hello"
      aria-labelledby="say-hello-title"
      className="mt-[clamp(56px,7vw,88px)] flex scroll-mt-[90px] flex-wrap gap-3.5"
    >
      <div className="flex min-w-0 flex-[7_1_420px] flex-col gap-[22px] rounded-2xl border-[1.5px] border-ink bg-panel p-[clamp(22px,3.4vw,44px)]">
        <p className="text-[11px] tracking-[.2em]">EXIT 04</p>
        <h2
          id="say-hello-title"
          className="text-balance font-serif text-[clamp(40px,5vw,68px)] leading-none tracking-[-.015em]"
        >
          Let&apos;s build something <em>together.</em>
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/contact" className="pill pill-ink px-5!">
            Say hello →
          </Link>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-outline px-5!"
          >
            Resume
          </a>
        </div>
        <div className="border-t-[1.5px] border-dashed border-line pt-[18px]">
          <CopyEmail />
        </div>
      </div>
      <IllustrationSlot
        label={
          "Illustration · petrol station at night\none pump, one light, the car topping up"
        }
        image={{
          src: "/mirror-selfie.jpg",
          alt: "Vinh taking a mirror selfie in a white hallway",
          position: "center 95%",
          zoom: 1.15,
        }}
        sizes="(min-width: 900px) 40vw, 100vw"
        className="min-h-[300px] flex-[5_1_300px] rounded-2xl border-[1.5px] border-ink p-4"
      />
    </section>
  );
}
