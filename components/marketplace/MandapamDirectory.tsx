"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { marketMandapams } from "@/data/mandapamMarket";
import { useAuth } from "@/components/auth/AuthProvider";
import Stars from "./Stars";

const SORTS = [
  { key: "rating", label: "Top rated" },
  { key: "priceLow", label: "Price: low to high" },
  { key: "capacity", label: "Capacity: high to low" },
] as const;
type SortKey = (typeof SORTS)[number]["key"];

export default function MandapamDirectory() {
  const { savedVenueIds, toggleSave, requireAuth } = useAuth();
  const [q, setQ] = useState("");
  const [maxPlate, setMaxPlate] = useState<number | "">("");
  const [minGuests, setMinGuests] = useState<number | "">("");
  const [acOnly, setAcOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("rating");

  const results = useMemo(() => {
    let r = marketMandapams.filter((m) => {
      if (q && !`${m.name} ${m.area}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (maxPlate !== "" && m.plateVeg && m.plateVeg > maxPlate) return false;
      if (minGuests !== "" && (m.capacityMax ?? 0) < minGuests) return false;
      if (acOnly && !m.ac) return false;
      if (verifiedOnly && !m.verified) return false;
      return true;
    });
    r = [...r].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "priceLow")
        return (a.plateVeg ?? 99999) - (b.plateVeg ?? 99999);
      return (b.capacityMax ?? 0) - (a.capacityMax ?? 0);
    });
    return r;
  }, [q, maxPlate, minGuests, acOnly, verifiedOnly, sort]);

  function onSave(id: string) {
    if (requireAuth()) toggleSave(id);
  }

  return (
    <div className="space-y-5">
      {/* filter bar */}
      <div className="grid gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search hall or area…"
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam lg:col-span-2"
        />
        <input
          type="number"
          value={maxPlate}
          onChange={(e) =>
            setMaxPlate(e.target.value ? Number(e.target.value) : "")
          }
          placeholder="Max ₹/plate"
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam"
        />
        <input
          type="number"
          value={minGuests}
          onChange={(e) =>
            setMinGuests(e.target.value ? Number(e.target.value) : "")
          }
          placeholder="Min guests"
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            checked={acOnly}
            onChange={(e) => setAcOnly(e.target.checked)}
          />
          A/C only
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
          />
          Verified only
        </label>
      </div>

      <p className="text-sm text-stone-500">
        {results.length} mandapam{results.length === 1 ? "" : "s"} in Coimbatore
      </p>

      {/* cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((m) => {
          const saved = savedVenueIds.includes(m.id);
          return (
            <div
              key={m.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div
                className="relative h-28"
                style={{ background: m.banner }}
              >
                <span className="absolute bottom-2 right-3 text-4xl opacity-80">
                  🏛️
                </span>
                <button
                  onClick={() => onSave(m.id)}
                  title={saved ? "Saved" : "Save"}
                  className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 text-sm shadow"
                >
                  {saved ? "❤️" : "🤍"}
                </button>
                {m.verified && (
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-kulam-dark">
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <Link
                  href={`/marketplace/${m.id}`}
                  className="font-serif text-lg font-bold text-kulam-dark hover:underline"
                >
                  {m.name}
                </Link>
                <p className="text-sm text-stone-500">
                  {m.area}, {m.district}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Stars value={m.rating} />
                  <span className="text-xs text-stone-500">
                    {m.rating} · {m.reviewCount} reviews
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1 text-xs text-stone-600">
                  {m.capacityMax && (
                    <span className="rounded bg-stone-100 px-2 py-0.5">
                      up to {m.capacityMax} guests
                    </span>
                  )}
                  {m.plateVeg && (
                    <span className="rounded bg-stone-100 px-2 py-0.5">
                      ₹{m.plateVeg}/plate
                    </span>
                  )}
                  {m.ac && (
                    <span className="rounded bg-stone-100 px-2 py-0.5">A/C</span>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/marketplace/${m.id}`}
                    className="flex-1 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-3 py-2 text-center text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    View & enquire
                  </Link>
                  <button
                    onClick={() => onSave(m.id)}
                    className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
                  >
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
