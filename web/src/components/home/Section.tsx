import type { ReactNode } from "react";

// A home-page stretch of road: kicker, serif title and a handwritten note on the left, content on the right.
export function Section({
  id,
  kicker,
  title,
  note,
  children,
  bodyClassName = "",
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  note: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-[clamp(56px,7vw,96px)] flex scroll-mt-[90px] flex-wrap gap-x-[clamp(20px,3vw,48px)] gap-y-7 border-t border-line pt-[clamp(28px,4vw,48px)]"
    >
      <div className="max-w-[300px] flex-[1_1_210px]">
        <p className="text-[11px] tracking-[.2em]">{kicker}</p>
        <h2
          id={`${id}-title`}
          className="mt-2.5 font-serif text-[clamp(42px,4.8vw,64px)] leading-[.98] tracking-[-.015em]"
        >
          {title}
        </h2>
        <p className="mt-3 font-hand text-[25px] leading-[1.05]">{note}</p>
      </div>
      <div className={`min-w-0 flex-[4_1_520px] pt-3 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
