"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { useTheme } from "@/lib/theme";
import { useReducedMotionSafe } from "@/lib/motion";

// three.js is heavy, so it ships in its own chunk and only loads in the browser.
const RoadScene = dynamic(() => import("./RoadScene"), { ssr: false });

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const reduce = useReducedMotionSafe();
  const theme = useTheme();
  const [ready, setReady] = useState(false);

  const fallback = (
    <div className="grid h-full place-items-center">
      <Image src="/avatar.png" alt="" width={200} height={200} className="opacity-90" />
    </div>
  );

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden rounded-2xl bg-sunken">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-out-soft ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <SceneBoundary fallback={fallback}>
          <RoadScene theme={theme} active={inView && !reduce} reduce={reduce} onReady={() => setReady(true)} />
        </SceneBoundary>
      </div>
      {!ready && <div className="absolute inset-0 animate-pulse bg-sunken" aria-hidden="true" />}
    </div>
  );
}
