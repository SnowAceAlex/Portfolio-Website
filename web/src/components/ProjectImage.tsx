import Image from "next/image";
import { IllustrationSlot } from "@/components/IllustrationSlot";
import type { Project } from "@/content/site";

// A project screenshot printed in ink (see .ink-* in globals.css), or the hatched placeholder
// when there is no image yet. Fills its positioned parent. Put `ink-hover` on the hover target.
export function ProjectImage({
  project,
  sizes,
  colour = false,
  short = false,
  priority = false,
  placeholderClassName = "p-4",
}: {
  project: Project;
  sizes: string;
  colour?: boolean;
  short?: boolean;
  priority?: boolean;
  placeholderClassName?: string;
}) {
  if (!project.image) {
    const label = project.placeholder?.[short ? "short" : "long"] ?? `Illustration · ${project.title}`;
    return (
      <div className="absolute inset-0">
        <IllustrationSlot label={label} className={`size-full ${placeholderClassName}`} />
      </div>
    );
  }
  return (
    <div className={`absolute inset-0 ${colour ? "ink-colour" : ""}`}>
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="ink-photo object-cover object-left-top"
      />
      <span className="ink-tint" aria-hidden="true" />
      <span className="ink-paper" aria-hidden="true" />
    </div>
  );
}
