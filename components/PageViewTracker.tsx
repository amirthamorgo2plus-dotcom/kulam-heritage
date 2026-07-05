"use client";

import { usePathname } from "next/navigation";
import { usePageView } from "@/hooks/usePageView";

// Mounted once in the root layout — captures every client navigation.
export default function PageViewTracker() {
  usePageView(usePathname());
  return null;
}
