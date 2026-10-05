import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { IllustrationSlot } from "@/components/IllustrationSlot";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vinh Bui about internships, roles or projects.",
};

const links = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Resume", href: site.resume },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="flex flex-col gap-[clamp(24px,3.4vw,40px)]">
      <div>
        <p className="text-[11px] tracking-[.18em]">EXIT 04 · CONTACT</p>
        <h1
          id="contact-title"
          className="mt-3 font-serif text-[clamp(60px,8.5vw,120px)] leading-[.92] tracking-[-.025em]"
        >
          Say hello.
        </h1>
        <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.75]">
          Roles, projects, or a good road to recommend. Write it on the postcard.
        </p>
      </div>
      <div className="flex flex-wrap items-start gap-3.5">
        <div className="print-shadow min-w-0 flex-[7_1_460px] overflow-hidden rounded-2xl border-[1.5px] border-ink bg-panel">
          <ContactForm />
        </div>
        <div className="flex min-w-0 flex-[4_1_280px] flex-col gap-3.5">
          <div className="rounded-2xl border-[1.5px] border-ink bg-panel p-5">
            <p className="text-[10.5px] tracking-[.16em]">OR, DIRECTLY</p>
            <CopyEmail layout="stacked" />
            <ul className="mt-4 flex flex-col border-t border-line">
              {links.map((link) => (
                <li key={link.label} className="border-b border-line last:border-b-0">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between py-3 text-[13px] no-underline hover:underline"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <IllustrationSlot
            label={"Illustration · parking garage\nlevel 3, the car waiting while you write"}
            className="h-[230px] rounded-2xl border-[1.5px] border-ink p-3.5"
          />
        </div>
      </div>
    </section>
  );
}
