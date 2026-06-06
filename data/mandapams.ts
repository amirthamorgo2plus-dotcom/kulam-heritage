// Kalyana mandapams / wedding venues — curated real Coimbatore listings from
// public directories (verify capacity, price & availability with the venue).
// Data lives in venues.json; this is also the static fallback for the Supabase
// `venues` table (see supabase/seed-venues.sql).

import venues from "./venues.json";

export interface Mandapam {
  id: string;
  name: string;
  area: string;
  district: string;
  lat: number;
  lng: number;
  capacityMin?: number;
  capacityMax?: number; // omitted = capacity on request
  plateVeg?: number; // ₹ per plate (veg); omitted = price on request
  plateNonVeg?: number; // ₹ per plate (non-veg), if offered
}

export const mandapams: Mandapam[] = (venues as { id: number }[]).map((v) => ({
  ...v,
  id: String(v.id),
})) as Mandapam[];

// Bounds for the per-plate budget filter UI.
export const PLATE_FLOOR = 200;
export const PLATE_CEIL = 1400;
