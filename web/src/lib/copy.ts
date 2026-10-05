"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

// Copies the email address and flags `copied` for 1.8s. Falls back to the mail client
// when the clipboard is blocked.
export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      window.location.href = `mailto:${site.email}`;
      return;
    }
    clearTimeout(timer.current);
    setCopied(true);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }, []);

  return { copied, copy };
}
