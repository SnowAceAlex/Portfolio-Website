"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { site } from "@/content/site";

// Copies the email address; falls back to opening the mail client if the clipboard is blocked.
export function CopyEmail({ className = "", large = false }: { className?: string; large?: boolean }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex items-center gap-3 text-left active:scale-[0.99] ${className}`}
      aria-label={`Copy email address ${site.email}`}
    >
      <span className={large ? "break-all text-2xl font-medium tracking-tight md:text-4xl" : "text-[15px] font-medium"}>
        {site.email}
      </span>
      <span
        className={`relative grid shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-fg group-hover:text-fg ${
          large ? "size-11" : "size-8"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
          >
            {copied ? <CheckIcon size={large ? 18 : 14} weight="bold" /> : <CopyIcon size={large ? 18 : 14} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}
