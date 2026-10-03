import Image from "next/image";
import type { ReactNode } from "react";

// Holds a hand-drawn ink illustration. Until `src` is delivered it shows the hatched
// placeholder with its label (use "\n" in the label for the second line).
export function IllustrationSlot({
  label,
  src,
  className = "",
  labelClassName = "",
  children,
}: {
  label: string;
  src?: string;
  className?: string;
  labelClassName?: string;
  children?: ReactNode;
}) {
  const [title, ...rest] = label.split("\n");
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${src ? "bg-panel" : "hatch"} ${className}`}
    >
      {src ? (
        <Image src={src} alt={label.replace("\n", ", ")} fill sizes="(min-width: 900px) 50vw, 100vw" className="object-contain" />
      ) : (
        <p
          className={`max-w-[320px] border border-dashed border-ink bg-panel px-3 py-2 text-center text-[10.5px] uppercase leading-[1.6] tracking-[.06em] ${labelClassName}`}
        >
          {title}
          {rest.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      )}
      {children}
    </div>
  );
}
