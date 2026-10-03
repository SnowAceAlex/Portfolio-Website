import { FileTextIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";
import { CopyEmail } from "@/components/CopyEmail";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

const links = [
  { label: "Resume", href: site.resume, Icon: FileTextIcon },
  { label: "GitHub", href: site.github, Icon: GithubLogoIcon },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinLogoIcon },
];

// The short version for recruiters: everything useful, one glance.
export function QuickLinks() {
  return (
    <section aria-label="Quick links" className="mx-auto max-w-6xl px-4 md:px-6">
      <Reveal className="flex flex-col gap-6 border-y border-line py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-lg text-muted">
          In a hurry? <span className="text-fg">Here is the short version.</span>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-fg transition-colors duration-300 hover:bg-surface active:scale-[0.98]"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
          <span className="mx-2 hidden h-6 w-px bg-line md:block" aria-hidden="true" />
          <CopyEmail />
        </div>
      </Reveal>
    </section>
  );
}
