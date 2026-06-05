"use client";

import dynamic from "next/dynamic";
import type { Mandapam } from "@/data/mandapams";

// Leaflet must load client-side only.
const MandapamMap = dynamic(() => import("@/components/MandapamMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] items-center justify-center rounded-lg border border-kulam-gold/40 bg-white text-stone-400">
      Loading mandapams…
    </div>
  ),
});

export default function MandapamMapLoader({ data }: { data: Mandapam[] }) {
  return <MandapamMap mandapams={data} />;
}
