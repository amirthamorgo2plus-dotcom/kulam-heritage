// Seed the `kulams` table from data/kulams.json.
// Usage (after creating the Supabase project + running schema.sql):
//   1. Put NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
//   2. node scripts/seed-kulams.mjs
//
// Uses the service-role key so it can write past RLS. Keep that key secret —
// never expose it to the browser.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

const rows = JSON.parse(readFileSync(new URL("../data/kulams.json", import.meta.url)));

const payload = rows.map((r) => ({
  id: r.id,
  surname: r.surname,
  house: r.house || null,
  gothram: r.gothram || null,
  kuladeivam: r.kuladeivam || null,
  place: r.place || null,
}));

const { error, count } = await supabase
  .from("kulams")
  .upsert(payload, { onConflict: "id", count: "exact" });

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}
console.log(`Seeded ${count ?? payload.length} kulams ✔`);
