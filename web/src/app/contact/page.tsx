import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vinh Bui about internships, roles or projects.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-4 pb-24 pt-32 md:grid-cols-12 md:px-6 md:pt-40">
      <Reveal className="md:col-span-5">
        <h1 className="text-5xl font-semibold leading-[1.02] tracking-tighter md:text-7xl">Say hello.</h1>
        <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">
          Have a role, a project or a question? Send a message and I will get back to you.
        </p>
        <div className="mt-10">
          <p className="text-sm text-muted">Prefer email?</p>
          <CopyEmail className="mt-2" />
        </div>
      </Reveal>
      <Reveal delay={0.1} className="md:col-span-7">
        <ContactForm />
      </Reveal>
    </div>
  );
}
