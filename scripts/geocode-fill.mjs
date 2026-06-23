// Fill coordinates for kulams that are still unmapped (lat == null), so every
// kulam appears on the temple map. Strategy per place:
//   1) manual OVERRIDES (exact)            -> geo: "precise"
//   2) OpenStreetMap, first segment        -> geo: "precise"
//   3) district HINT token match           -> geo: "approx"
//   4) OpenStreetMap, last segment (town)  -> geo: "approx"
//   5) Kongu-belt region fallback + jitter -> geo: "region"
// Only touches rows where lat == null; the 66 already-precise rows are kept.
import { readFileSync, writeFileSync } from "node:fs";

const KONGU = { latMin: 10.0, latMax: 11.65, lngMin: 76.6, lngMax: 78.25 };
const inKongu = (lat, lng) =>
  lat >= KONGU.latMin && lat <= KONGU.latMax && lng >= KONGU.lngMin && lng <= KONGU.lngMax;
const inTN = (lat, lng) => lat >= 8.0 && lat <= 13.7 && lng >= 76.0 && lng <= 80.7;

const OVERRIDES = {
  "peelamedu": [11.0278, 76.9986], "avarampalayam": [11.029, 76.987],
  "kalapatti": [11.075, 77.03], "palladam": [10.9708, 77.2817],
  "sooloor": [11.024, 77.124], "soolur": [11.024, 77.124],
  "ganapathy": [11.038, 76.97], "ondipudhur": [10.995, 77.03],
  "veloor": [10.9, 78.1], "r.veloor": [10.9, 78.1],
};

// District / nearby-town hints -> approximate coords. Matched as a token
// anywhere in the place string.
const HINTS = {
  "aravakurichi": [10.7561, 78.0386], "aravakkurichi": [10.7561, 78.0386],
  "aravei": [10.7561, 78.0386], "pazhani": [10.45, 77.52], "palani": [10.45, 77.52],
  "vedachandur": [10.53, 77.95], "vedachandoor": [10.53, 77.95],
  "dindigul": [10.3624, 77.9695], "kovai": [11.0, 76.97], "kovei": [11.0, 76.97],
  "kodumudi": [11.078, 77.883], "dharapuram": [10.7297, 77.532],
  "tharapuram": [10.7297, 77.532], "thaarapuram": [10.7297, 77.532],
  "karur": [10.96, 78.08], "karor": [10.96, 78.08], "karoor": [10.96, 78.08],
  "sivakasi": [9.4496, 77.7983], "kovilpatti": [9.17, 77.87],
  "madurai": [9.9252, 78.1198], "moolanoor": [10.83, 78.07],
  "sevur": [10.8, 78.0], "rangasamuthiram": [10.7, 77.55],
  "gandipatti": [10.5, 77.9], "aandipatti": [10.0, 77.6],
  "arupukottei": [9.51, 78.1], "modakkupati": [10.7, 77.9],
  "narasingaapuram": [10.76, 78.04], "naarapatti": [10.8, 78.0],
  "pollachi": [10.66, 77.0], "udumalai": [10.5862, 77.2497],
  "chinnakalaiyamuthoor": [10.45, 77.5], "chinnakaliyamuthoor": [10.45, 77.5],
  "uppar arugil": [10.7297, 77.532], "pattanam": [11.0, 77.0],
  "veerapandi": [11.16, 77.36], "pudur": [11.0, 76.97],
};

// Kongu-belt centroid for the final fallback (a few truly-unknown hamlets).
const REGION = [10.95, 77.55];

const normalize = (raw) =>
  raw.toLowerCase().trim()
    .replace(/aa/g, "a").replace(/oo/g, "o").replace(/ee/g, "e").replace(/ii/g, "i")
    .replace(/\s+/g, " ").trim();

async function geocode(q, bounded = true) {
  let url =
    "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=" +
    encodeURIComponent(q + ", Tamil Nadu, India");
  if (bounded) url += "&viewbox=76.6,11.65,78.25,10.0&bounded=1";
  const res = await fetch(url, { headers: { "User-Agent": "kamma-nest/1.0 (heritage map)" } });
  if (!res.ok) return null;
  const j = await res.json();
  if (!j.length) return null;
  const lat = parseFloat(j[0].lat), lng = parseFloat(j[0].lon);
  const ok = bounded ? inKongu(lat, lng) : inTN(lat, lng);
  return ok ? [lat, lng] : null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const jitter = (id) => (((id * 2654435761) % 1000) / 1000 - 0.5) * 0.18; // ±0.09°

const rows = JSON.parse(readFileSync("data/kulams.json"));
const cache = {};
let precise = 0, approx = 0, region = 0, kept = 0;

for (const r of rows) {
  if (r.lat != null) { kept++; continue; }          // keep already-mapped
  if (!r.place) { r.lat = null; r.lng = null; r.geo = "none"; continue; }

  if (cache[r.place]) { Object.assign(r, cache[r.place]); tally(r.geo); continue; }

  const segs = r.place.split(/[;,]/).map((s) => normalize(s)).filter(Boolean);
  const first = segs[0];
  const last = segs[segs.length - 1];
  let coords = null, geo = "none";

  if (OVERRIDES[first]) { coords = OVERRIDES[first]; geo = "precise"; }
  if (!coords) { coords = await geocode(first, true); if (coords) geo = "precise"; await sleep(1100); }
  if (!coords) {
    const tok = Object.keys(HINTS).find((h) => r.place.toLowerCase().includes(h));
    if (tok) { coords = HINTS[tok]; geo = "approx"; }
  }
  if (!coords && last && last !== first) {
    coords = await geocode(last, true); if (coords) geo = "approx"; await sleep(1100);
  }
  if (!coords) { coords = [REGION[0] + jitter(r.id), REGION[1] + jitter(r.id + 7)]; geo = "region"; }

  const result = { lat: coords[0], lng: coords[1], geo };
  cache[r.place] = result;
  Object.assign(r, result);
  tally(geo);
  console.log(`${r.place} -> ${geo} ${coords.map((n) => n.toFixed(3)).join(",")}`);
}

function tally(g) {
  if (g === "precise") precise++; else if (g === "approx") approx++;
  else if (g === "region") region++;
}

writeFileSync("data/kulams.json", JSON.stringify(rows, null, 2) + "\n");
console.log(`\nDone. kept=${kept} +precise=${precise} +approx=${approx} +region=${region}`);
