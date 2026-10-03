"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/content/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#journey", label: "Journey" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-line/80 bg-surface/70 pl-5 pr-2 shadow-[0_8px_30px_-12px_rgb(15_18_23/0.12)] backdrop-blur-xl">
        <Link href="/" className="text-[15px] font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 hover:bg-sunken hover:text-fg ${
                  active ? "text-fg" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <span className="mx-1 h-5 w-px bg-line" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-sunken active:scale-[0.96]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-2xl border border-line bg-surface/95 p-2 backdrop-blur-xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base text-fg hover:bg-sunken"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
