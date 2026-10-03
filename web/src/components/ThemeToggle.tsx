"use client";

import { AnimatePresence, motion } from "motion/react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { setTheme, useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full text-fg transition-colors hover:bg-sunken active:scale-[0.96]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="grid place-items-center"
        >
          {theme === "dark" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
