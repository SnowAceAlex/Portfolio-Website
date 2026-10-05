"use client";

import { useSyncExternalStore } from "react";

export const TZ = "Asia/Ho_Chi_Minh";

// One shared 1s ticker for every live clock on the page.
let now = 0;
let timer: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();

function subscribe(onTick: () => void) {
  listeners.add(onTick);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(onTick);
    if (!listeners.size) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

// Hydration-safe: `null` on the server and during hydration (render a placeholder), then the
// current time, updated every second.
export function useNow(): Date | null {
  const ms = useSyncExternalStore(
    subscribe,
    () => now || (now = Date.now()),
    () => 0,
  );
  return ms ? new Date(ms) : null;
}

// "03 OCT"
export const formatDay = (d: Date) =>
  d.toLocaleDateString("en-GB", { timeZone: TZ, day: "2-digit", month: "short" }).toUpperCase();

// "14:05:09"
export const formatTime = (d: Date) => d.toLocaleTimeString("en-GB", { timeZone: TZ, hour12: false });

// "14:05"
export const formatTimeShort = (d: Date) =>
  d.toLocaleTimeString("en-GB", { timeZone: TZ, hour12: false, hour: "2-digit", minute: "2-digit" });

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 0 = Monday … 6 = Sunday, in Saigon.
export const weekdayIndex = (d: Date) =>
  weekdays.indexOf(new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(d));
