"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { Project } from "@/content/site";
import { useReducedMotionSafe } from "@/lib/motion";

const PREVIEW_W = 360;

// Big project titles; on desktop a preview card follows the cursor while hovering a row.
export function WorkList({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotionSafe();
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    x.set(e.clientX + 24);
    y.set(e.clientY - PREVIEW_W * 0.35);
  };

  const current = active === null ? null : projects[active];

  return (
    <div className="relative">
      <ul className="group/list border-t border-line" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className="border-b border-line transition-opacity duration-500 md:group-hover/list:opacity-35 md:hover:!opacity-100"
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group/row grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:py-10"
            >
              <div className="overflow-hidden rounded-2xl bg-sunken md:hidden">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="100vw"
                  className="aspect-[16/10] w-full object-cover object-left-top"
                />
              </div>
              <h3 className="text-4xl font-semibold tracking-tighter transition-transform duration-500 ease-out-soft md:col-span-5 md:text-6xl md:group-hover/row:translate-x-2">
                {project.title}
              </h3>
              <p className="text-base text-muted md:col-span-3">{project.kind}</p>
              <p className="font-mono text-xs leading-relaxed text-muted md:col-span-3">
                {project.stack.slice(0, 4).join(", ")}
              </p>
              <span className="hidden justify-self-end text-fg md:col-span-1 md:block" aria-hidden="true">
                <ArrowUpRightIcon
                  size={28}
                  className="transition-transform duration-500 ease-out-soft group-hover/row:-translate-y-1 group-hover/row:translate-x-1"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {!reduce && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
          style={{ x: sx, y: sy, width: PREVIEW_W }}
          aria-hidden="true"
        >
          <AnimatePresence>
            {current && (
              <motion.div
                key={current.slug}
                className="absolute inset-x-0 top-0 overflow-hidden rounded-2xl bg-sunken shadow-[0_30px_60px_-20px_rgb(15_18_23/0.35)] ring-1 ring-line"
                initial={{ opacity: 0, scale: 0.86, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <Image
                  src={current.image.src}
                  alt=""
                  width={current.image.width}
                  height={current.image.height}
                  sizes={`${PREVIEW_W}px`}
                  className="aspect-[4/3] w-full object-cover object-left-top"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
