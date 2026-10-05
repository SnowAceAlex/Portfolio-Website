"use client";

import { site } from "@/content/site";
import { useCopyEmail } from "@/lib/copy";

// The email as an underlined button that copies it, with a handwritten hint beside (inline)
// or under (stacked) it: "← click to copy", then "copied! see you on the road" for 1.8s.
export function CopyEmail({ layout = "inline" }: { layout?: "inline" | "stacked" }) {
  const { copied, copy } = useCopyEmail();
  const stacked = layout === "stacked";

  return (
    <div className={stacked ? "mt-2.5" : "flex flex-wrap items-center gap-3"}>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${site.email}`}
        className={`block text-left underline underline-offset-4 [overflow-wrap:anywhere] ${
          stacked ? "text-[15px]" : "text-[clamp(13px,1.4vw,16px)]"
        }`}
      >
        {site.email}
      </button>
      <span className={`font-hand text-[23px] leading-none ${stacked ? "mt-1.5 block" : ""}`} role="status" aria-live="polite">
        {copied ? "copied! see you on the road" : "← click to copy"}
      </span>
    </div>
  );
}
