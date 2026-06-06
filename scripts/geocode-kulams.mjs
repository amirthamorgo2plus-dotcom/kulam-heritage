// One-off: geocode each kulam's `place` to lat/lng and write back into
// data/kulams.json. Uses OpenStreetMap Nominatim (rate-limited, 1 req/sec) with
// spelling normalization + manual overrides + region-hint fallbacks.
import { readFileSync, writeFileSync } from "node:fs";

// Kammavar kula deivams are overwhelmingly in the Kongu belt. Constrain place
// lookups to this box to avoid matching same-named villages elsewhere in TN.
const KONGU = { latMin: 10.0, latMax: 11.65, lngMin: 76.6, lngMax: 78.25 };
const inKongu = (lat, lng) =>
  lat >= KONGU.latMin && lat <= KONGU.latMax &&
  lng >= KONGU.lngMin && lng <= KONGU.lngMax;
// Wider TN bounds for explicit far-region hints (Sivakasi, Vilathikulam, etc.).
const inTN = (lat, lng) => lat >= 8.0 && lat <= 13.7 && lng >= 76.0 && lng <= 80.7;

// Confident manual coords for common / oddly-spelled places (Kongu belt).
const OVERRIDES = {
  "peelamedu": [11.0278, 76.9986], "avarampalayam": [11.029, 76.987],
  "kalapatti": [11.075, 77.03], "palladam": [10.9708, 77.2817],
  "kallapalayam": [10.9524, 77.0806], "chinna mettupalayam": [11.08, 77.08],
  "erichinapati": [10.95, 77.2], "coimbatore": [11.0, 76.97],
  "ganapathy": [11.038, 76.97], "kovai": [11.0, 76.97],
  "ondipudur": [10.995, 77.03], "uppilipalayam": [11.0, 77.0],
};

// Region hints (from parentheses / district mentions) -> approximate town coords.
const HINTS = {
  "karoor": [10.96, 78.08], "karur": [10.96, 78.08], "karoor vattam": [10.96, 78.08],
  "udumalai": [10.5862, 77.2497], "dharapuram": [10.7297, 77.532],
  "dindigul": [10.3624, 77.9695], "sivakasi": [9.4496, 77.7983],
  "vilaathikulam": [9.128, 78.157], "vedachandur": [10.53, 77.95],
  "vedachandoor": [10.53, 77.95], "kundadam": [10.74, 77.55],
  "pudur": [11.0, 76.97], "tharapuram": [10.7297, 77.532],
  "thaarapuram": [10.7297, 77.532], "kodumudi": [11.078, 77.883],
};

const normalize = (raw) => {
  let hint = null;
  const m = raw.match(/\(([^)]+)\)/);
  if (m) hint = m[1].trim().toLowerCase();
  let s = raw.replace(/\([^)]*\)/g, " ");        // drop parentheticals
  s = s.split(",")[0];                             // first segment only
  s = s.toLowerCase().trim();
  s = s.replace(/aa/g, "a").replace(/oo/g, "o").replace(/ee/g, "e").replace(/ii/g, "i");
  s = s.replace(/\s+/g, " ").trim();
  return { norm: s, hint };
};

// bounded=true restricts to the Kongu viewbox (for village lookups);
// bounded=false allows anywhere in TN (for far-region hint towns).
async function geocode(q, bounded = true) {
  let url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=" +
    encodeURIComponent(q + ", Tamil Nadu, India");
  if (bounded) url += "&viewbox=76.6,11.65,78.25,10.0&bounded=1";
  const res = await fetch(url, { headers: { "User-Agent": "kulam-heritage-app/1.0 (heritage map)" } });
  if (!res.ok) return null;
  const j = await res.json();
  if (!j.length) return null;
  const lat = parseFloat(j[0].lat), lng = parseFloat(j[0].lon);
  const ok = bounded ? inKongu(lat, lng) : inTN(lat, lng);
  return ok ? [lat, lng] : null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const rows = JSON.parse(readFileSync("data/kulams.json"));
const cache = {};
let precise = 0, approx = 0, none = 0;

for (const r of rows) {
  // Skip rows already geocoded in a previous run (incremental).
  if (r.geo) {
    if (r.geo === "precise") precise++; else if (r.geo === "approx") approx++; else none++;
    continue;
  }
  if (!r.place) { r.lat = null; r.lng = null; r.geo = "none"; none++; continue; }
  if (cache[r.place]) {
    Object.assign(r, cache[r.place]);
    cache[r.place].geo === "approx" ? approx++ : precise++;
    continue;
  }
  const { norm, hint } = normalize(r.place);
  let coords = null, geo = "none";

  if (OVERRIDES[norm]) { coords = OVERRIDES[norm]; geo = "precise"; }
  if (!coords) { coords = await geocode(norm, true); if (coords) geo = "precise"; await sleep(1100); }
  if (!coords && hint && HINTS[hint]) { coords = HINTS[hint]; geo = "approx"; }
  if (!coords && hint) { coords = await geocode(hint, false); if (coords) geo = "approx"; await sleep(1100); }

  // null out coords when nothing resolved (clears any stale value from a prior run).
  const result = coords
    ? { lat: coords[0], lng: coords[1], geo }
    : { lat: null, lng: null, geo: "none" };
  cache[r.place] = result;
  Object.assign(r, result);
  if (geo === "precise") precise++; else if (geo === "approx") approx++; else none++;
  console.log(`${r.place} -> ${geo} ${coords ? coords.join(",") : ""}`);
}

writeFileSync("data/kulams.json", JSON.stringify(rows, null, 2) + "\n");
console.log(`\nDone. precise=${precise} approx=${approx} none=${none} / ${rows.length}`);
