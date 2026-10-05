"use client";

import { InkAvatar } from "@/components/InkAvatar";
import { useShell } from "@/components/ShellProvider";
import { site } from "@/content/site";
import { setTheme, useTheme } from "@/lib/theme";

// Below 900px the sidebar is hidden; its essentials live here, at the top of the home page.
export function MobileProfile() {
  const { openFastLane } = useShell();
  const night = useTheme() === "dark";

  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border-[1.5px] border-ink bg-panel p-5 desk:hidden">
      <div className="flex items-center gap-3.5">
        <InkAvatar size={58} />
        <div>
          <p className="font-serif text-[36px] leading-none">{site.name}.</p>
          <p className="font-hand text-[23px] leading-none">aka {site.handle}</p>
        </div>
      </div>
      <p className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-[11.5px]">
        {site.affiliations.slice(0, 2).map((a) => (
          <span key={a.at}>{a.short}</span>
        ))}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={openFastLane}
          className="min-h-11 flex-1 rounded-[6px] border-[1.5px] border-ink bg-ink text-[11px] uppercase tracking-[.14em] text-panel"
        >
          Fast lane →
        </button>
        <button
          type="button"
          onClick={() => setTheme(night ? "light" : "dark")}
          aria-pressed={night}
          className="min-h-11 flex-1 rounded-[6px] border-[1.5px] border-ink text-[11px] uppercase tracking-[.14em]"
        >
          Night {night ? "on" : "off"}
        </button>
      </div>
    </div>
  );
}
