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
          The kula deivam (family-deity) temples of all the Kammavar kulams,
          mapped across the Kongu belt. Search your surname or gothram to find
          your family&apos;s shrine and its town.
        </p>
      </header>

      <TempleMap />
    </div>
  );
}
