import type { ReactNode } from "react";

// Stack tag: 1px ink, radius 3px. `sm` is the uppercase card size, `md` the trip-card size.
export function Tag({ children, size = "sm" }: { children: ReactNode; size?: "sm" | "md" }) {
  return (
    <span
      className={`rounded-[3px] border border-ink ${
        size === "sm" ? "px-1.5 py-0.5 text-[9.5px] uppercase tracking-[.06em]" : "px-[7px] py-[3px] text-[10.5px] tracking-[.04em]"
      }`}
    >
      {children}
    </span>
  );
}

// Label box: 1.5px ink, radius 5px, small spaced caps ("KM 0", "№ 01"). `filled` inverts it.
export function Chip({
  children,
  filled = false,
  className = "",
}: {
  children: ReactNode;
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`whitespace-nowrap rounded-[5px] border-[1.5px] border-ink px-2 py-[3px] text-[10px] tracking-[.16em] ${
        filled ? "bg-ink text-panel" : "bg-panel"
      } ${className}`}
    >
      {children}
    </span>
  );
}
