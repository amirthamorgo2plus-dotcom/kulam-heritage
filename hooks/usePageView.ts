"use client";

import { useEffect } from "react";

// Fires one page-view ping per path change. Fire-and-forget: errors are swallowed
// so tracking can never affect the page.
export function usePageView(path: string) {
  useEffect(() => {
    if (!path) return;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
      keepalive: true,
    }).catch(() => {});
  }, [path]);
}
