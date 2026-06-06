import MandapamMapLoader from "@/components/MandapamMapLoader";
import { mandapams as fallback, type Mandapam } from "@/data/mandapams";
import { supabase } from "@/lib/supabase";

export const metadata = { title: "Kalyana Mandapams — Kulam Heritage" };
export const dynamic = "force-dynamic";

async function getMandapams(): Promise<Mandapam[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("venues")
      .select("id, name, area, district, lat, lng, capacity_min, capacity_max, plate_veg, plate_nonveg, ac")
      .order("name");
    if (!error && data && data.length) {
      return data.map((v) => ({
        id: String(v.id),
        name: v.name,
        area: v.area ?? "",
        district: v.district ?? "",
        lat: v.lat ?? 0,
        lng: v.lng ?? 0,
        capacityMin: v.capacity_min ?? undefined,
        capacityMax: v.capacity_max ?? undefined,
        plateVeg: v.plate_veg ?? undefined,
        plateNonVeg: v.plate_nonveg ?? undefined,
      }));
    }
  }
  return fallback;
}

export default async function MandapamsPage() {
  const data = await getMandapams();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Kalyana Mandapams
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Real wedding halls in Coimbatore. Set your per-plate budget and guest
          count, then see matching mandapams on the map.
        </p>
      </header>

      <MandapamMapLoader data={data} />

      <p className="text-xs italic text-stone-500">
        Real listings sourced from public directories; per-plate prices and
        capacities are indicative and map pins are approximate to the locality —
        always confirm directly with the venue.
      </p>
    </div>
  );
}
