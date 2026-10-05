"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Shell = { fastLaneOpen: boolean; openFastLane: () => void; closeFastLane: () => void };

const ShellContext = createContext<Shell | null>(null);

// Shared shell state: the Fast lane drawer opens from both the sidebar and the mobile profile panel.
export function ShellProvider({ children }: { children: ReactNode }) {
  const [fastLaneOpen, setOpen] = useState(false);
  const value = useMemo(
    () => ({ fastLaneOpen, openFastLane: () => setOpen(true), closeFastLane: () => setOpen(false) }),
    [fastLaneOpen],
  );
  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell() {
  const shell = useContext(ShellContext);
  if (!shell) throw new Error("useShell must be used inside <ShellProvider>");
  return shell;
}
