"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { CarGlyph } from "@/components/CarGlyph";
import { projects } from "@/content/site";
import { scrollToSection } from "@/lib/scroll";

const exits = [
  { label: "home", num: "EXIT 0", href: "/", id: "home" },
  { label: "work", num: "EXIT 1", href: "/#work", id: "work" },
  { label: "career", num: "EXIT 2", href: "/#experience", id: "experience" },
  { label: "journey", num: "EXIT 3", href: "/#journey", id: "journey" },
  { label: "contact", num: "EXIT 4", href: "/contact", id: "say-hello" },
];

// Which exit a route belongs to. `null` means the home page, where scroll-spy decides; -1 is off-road (404).
function exitForRoute(pathname: string): number | null {
  if (pathname === "/") return null;
  if (pathname === "/projects" || projects.some((p) => pathname === `/projects/${p.slug}`)) return 1;
  if (pathname === "/contact") return 4;
  return -1;
}

// The section whose top has passed 40% of the viewport; the bottom of the page counts as contact.
function spy() {
  let active = 0;
  exits.forEach(({ id }, i) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = i;
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = exits.length - 1;
  return active;
}

// A two-lane road across the top with five exit signs. The car parks above the active exit.
export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [spied, setSpied] = useState(0);
  const routeExit = exitForRoute(pathname);
  const active = routeExit ?? spied;

  useEffect(() => {
    if (routeExit !== null) return;
    const update = () => setSpied(spy());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [routeExit]);

  const onExit = (e: MouseEvent<HTMLAnchorElement>, i: number) => {
    // On the home page the first four exits are sections: scroll there instead of navigating.
    if (routeExit !== null || i === exits.length - 1) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    scrollToSection(exits[i].id, lenis);
  };

  const carLeft = active < 0 ? "-6%" : `${((active + 0.5) / exits.length) * 100}%`;

  return (
    // Fixed, not sticky: it stays on screen whatever its ancestors do. The layout reserves its 81px.
    <header className="fixed inset-x-0 top-0 z-30 border-b border-line bg-paper transition-[background-color] duration-[600ms]">
      <div className="relative h-20">
        <div className="absolute inset-x-0 top-6 h-4 border-y-[1.5px] border-ink" aria-hidden="true">
          <div className="absolute inset-x-0 top-[5px] border-t-[1.5px] border-dashed border-ink opacity-50" />
        </div>
        <nav
          aria-label="Primary"
          className="absolute inset-y-0 left-[clamp(8px,4vw,56px)] right-[clamp(8px,4vw,56px)] grid grid-cols-5"
        >
          <div
            className="pointer-events-none absolute top-[5px] -translate-x-1/2 transition-[left] duration-1000 ease-road motion-reduce:transition-none"
            style={{ left: carLeft }}
            aria-hidden="true"
          >
            <CarGlyph width={38} height={19} />
          </div>
          {exits.map((exit, i) => {
            const on = i === active;
            return (
              <Link
                key={exit.label}
                href={exit.href}
                onClick={(e) => onExit(e, i)}
                aria-current={on ? (routeExit === null ? "location" : "page") : undefined}
                className="mt-[37px] flex flex-col items-center self-start justify-self-center no-underline"
              >
                <span className="h-[7px] w-[1.5px] bg-ink" aria-hidden="true" />
                <span
                  className={`flex items-baseline gap-1.5 whitespace-nowrap rounded-[5px] border-[1.5px] border-ink px-1.5 pb-1 pt-[3px] text-[12px] transition-colors duration-[400ms] sm:px-[9px] ${
                    on ? "bg-ink text-panel" : "bg-transparent text-ink"
                  }`}
                >
                  <span className="hidden text-[9px] tracking-[.14em] opacity-80 lg:inline">{exit.num}</span>
                  <span>{exit.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
