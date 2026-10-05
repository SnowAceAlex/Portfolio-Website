import Image from "next/image";
import type { ReactNode } from "react";

export type SlotImage = {
  src: string;
  alt: string;
  // CSS object-position for the crop, e.g. "center 40%".
  position?: string;
  // Zoom factor, e.g. 1.15 = 15% closer. Zooms toward `position`.
  zoom?: number;
};

// Holds a photo or illustration, printed in ink until hovered (see .ink-* in globals.css).
// Until `image` is delivered it shows the hatched placeholder with its label
// (use "\n" in the label for the second line).
export function IllustrationSlot({
  label,
  image,
  sizes = "(min-width: 900px) 50vw, 100vw",
  className = "",
  labelClassName = "",
  children,
}: {
  label: string;
  image?: SlotImage;
  sizes?: string;
  className?: string;
  labelClassName?: string;
  children?: ReactNode;
}) {
  const [title, ...rest] = label.split("\n");
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${image ? "ink-hover bg-panel" : "hatch"} ${className}`}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="ink-photo object-cover"
            style={{
              objectPosition: image.position,
              transform: image.zoom ? `scale(${image.zoom})` : undefined,
              transformOrigin: image.position,
            }}
          />
          <span className="ink-tint" aria-hidden="true" />
          <span className="ink-paper" aria-hidden="true" />
        </>
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
