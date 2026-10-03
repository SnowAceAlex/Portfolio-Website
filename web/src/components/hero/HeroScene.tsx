"use client";

import dynamic from "next/dynamic";
import { Component, useRef, useState, type ReactNode, type RefObject } from "react";
import { useInView } from "motion/react";
import { CarGlyph } from "@/components/CarGlyph";
import { useTheme } from "@/lib/theme";
import { useReducedMotionSafe } from "@/lib/motion";

// What the rest of the page can ask of the scene (the road pass makes the car hop).
export type SceneHandle = { hop: () => void };

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

export function HeroScene({ handle }: { handle?: RefObject<SceneHandle | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const reduce = useReducedMotionSafe();
  const theme = useTheme();
  const [ready, setReady] = useState(false);

  const fallback = (
    <div className="grid h-full place-items-center">
      <CarGlyph width={88} height={44} />
    </div>
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-panel">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
        <SceneBoundary fallback={fallback}>
          <RoadScene
            theme={theme}
            active={inView && !reduce}
            reduce={reduce}
            handle={handle}
            onReady={() => setReady(true)}
          />
        </SceneBoundary>
      </div>
    </div>
  );
}
