"use client";

import dynamic from "next/dynamic";

// Leaflet must run client-side only.
const TempleMap = dynamic(() => import("@/components/TempleMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] items-center justify-center rounded-lg border border-kulam-gold/40 bg-white text-stone-400">
      Loading map…
    </div>
  ),
});

export default function TemplesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Kula Deivam Temple Map
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Family-deity (kula deivam) temples associated with Kammavar Naidu kulams
          — drawn from the published kulam / inti-peru list, mostly in the
          Coimbatore–Tirupur belt. Click a marker for details, or filter by kulam
          to find your family&apos;s shrine.
        </p>
      </header>

      <TempleMap />

      <p className="text-xs italic text-stone-500">
        A sample of ~8 of the 100+ documented entries; coordinates are
        approximate to the locality, not the exact shrine. Confirm your
        family&apos;s kula deivam with elders.
      </p>
    </div>
  );
}
