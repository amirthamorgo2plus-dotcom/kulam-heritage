"use client";

import dynamic from "next/dynamic";

const MandapamMap = dynamic(() => import("@/components/MandapamMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[460px] items-center justify-center rounded-lg border border-kulam-gold/40 bg-white text-stone-400">
      Loading mandapams…
    </div>
  ),
});

export default function MandapamsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Kalyana Mandapams
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Real wedding halls in Coimbatore. Set your per-plate budget and guest
          count, then see matching mandapams on the map. (More cities to follow.)
        </p>
      </header>

      <MandapamMap />

      <p className="text-xs italic text-stone-500">
        Real listings sourced from public directories; per-plate prices and
        capacities are indicative and map pins are approximate to the locality —
        always confirm directly with the venue.
      </p>
    </div>
  );
}
