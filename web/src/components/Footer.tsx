import { CarProfileIcon } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";

const links = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Resume", href: site.resume },
];

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-6">
      {/* A tiny car keeps driving along the footer line, the sign-off of the trip */}
      <div className="relative h-8 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0 border-t border-line" />
        <div className="footer-drive absolute inset-x-0 bottom-0">
          <CarProfileIcon size={22} weight="fill" className="block translate-y-[3px] text-accent" />
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between">
        <p className="max-w-[46ch] text-sm leading-relaxed text-muted">
          Designed and built by {site.name}, somewhere between a code editor and an open road.
        </p>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              {link.label}
            </a>
          ))}
          <span className="text-sm text-muted">&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
