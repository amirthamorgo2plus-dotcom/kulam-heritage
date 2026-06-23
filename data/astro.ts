// Ashtakoota (36-guna) horoscope matching engine.
// This is an INDICATIVE calculator for v1 — a qualified astrologer should
// confirm any real alliance. It implements the eight kootas using standard
// nakshatra / rasi lookup tables.

export type Varna = "Brahmin" | "Kshatriya" | "Vaishya" | "Shudra";
export type Gana = "Deva" | "Manushya" | "Rakshasa";
export type Nadi = "Aadi" | "Madhya" | "Antya";
export type Planet =
  | "Sun"
  | "Moon"
  | "Mars"
  | "Mercury"
  | "Jupiter"
  | "Venus"
  | "Saturn";

export interface Rasi {
  id: number; // 1..12
  name: string; // Tamil name (romanised) — what Tamil Nadu families use
  tamilScript: string; // Tamil script
  sanskrit: string; // North-Indian / English reference
  lord: Planet;
  varna: Varna;
}

// Rasi names use the Tamil (Tamil Nadu) convention as primary.
export const rasis: Rasi[] = [
  { id: 1, name: "Mesham", tamilScript: "மேஷம்", sanskrit: "Mesha / Aries", lord: "Mars", varna: "Kshatriya" },
  { id: 2, name: "Rishabam", tamilScript: "ரிஷபம்", sanskrit: "Vrishabha / Taurus", lord: "Venus", varna: "Vaishya" },
  { id: 3, name: "Mithunam", tamilScript: "மிதுனம்", sanskrit: "Mithuna / Gemini", lord: "Mercury", varna: "Shudra" },
  { id: 4, name: "Kadagam", tamilScript: "கடகம்", sanskrit: "Karka / Cancer", lord: "Moon", varna: "Brahmin" },
  { id: 5, name: "Simmam", tamilScript: "சிம்மம்", sanskrit: "Simha / Leo", lord: "Sun", varna: "Kshatriya" },
  { id: 6, name: "Kanni", tamilScript: "கன்னி", sanskrit: "Kanya / Virgo", lord: "Mercury", varna: "Vaishya" },
  { id: 7, name: "Thulam", tamilScript: "துலாம்", sanskrit: "Tula / Libra", lord: "Venus", varna: "Shudra" },
  { id: 8, name: "Viruchigam", tamilScript: "விருச்சிகம்", sanskrit: "Vrishchika / Scorpio", lord: "Mars", varna: "Brahmin" },
  { id: 9, name: "Dhanusu", tamilScript: "தனுசு", sanskrit: "Dhanu / Sagittarius", lord: "Jupiter", varna: "Kshatriya" },
  { id: 10, name: "Magaram", tamilScript: "மகரம்", sanskrit: "Makara / Capricorn", lord: "Saturn", varna: "Vaishya" },
  { id: 11, name: "Kumbam", tamilScript: "கும்பம்", sanskrit: "Kumbha / Aquarius", lord: "Saturn", varna: "Shudra" },
  { id: 12, name: "Meenam", tamilScript: "மீனம்", sanskrit: "Meena / Pisces", lord: "Jupiter", varna: "Brahmin" },
];

export interface Nakshatra {
  id: number; // 1..27
  name: string; // Tamil natchathiram (romanised) — primary, Tamil Nadu usage
  tamilScript: string; // Tamil script
  sanskrit: string; // North-Indian / Sanskrit reference
  gana: Gana;
  nadi: Nadi;
  yoni: string; // animal
  yoniSex: "M" | "F";
}

// 27 natchathiram — Tamil names primary, with Sanskrit reference.
export const nakshatras: Nakshatra[] = [
  { id: 1, name: "Aswini", tamilScript: "அசுவினி", sanskrit: "Ashwini", gana: "Deva", nadi: "Aadi", yoni: "Horse", yoniSex: "M" },
  { id: 2, name: "Bharani", tamilScript: "பரணி", sanskrit: "Bharani", gana: "Manushya", nadi: "Madhya", yoni: "Elephant", yoniSex: "M" },
  { id: 3, name: "Karthigai", tamilScript: "கார்த்திகை", sanskrit: "Krittika", gana: "Rakshasa", nadi: "Antya", yoni: "Sheep", yoniSex: "F" },
  { id: 4, name: "Rohini", tamilScript: "ரோகிணி", sanskrit: "Rohini", gana: "Manushya", nadi: "Antya", yoni: "Serpent", yoniSex: "M" },
  { id: 5, name: "Mirugasirisham", tamilScript: "மிருகசீரிஷம்", sanskrit: "Mrigashira", gana: "Deva", nadi: "Madhya", yoni: "Serpent", yoniSex: "F" },
  { id: 6, name: "Thiruvathirai", tamilScript: "திருவாதிரை", sanskrit: "Ardra", gana: "Manushya", nadi: "Aadi", yoni: "Dog", yoniSex: "F" },
  { id: 7, name: "Punarpoosam", tamilScript: "புனர்பூசம்", sanskrit: "Punarvasu", gana: "Deva", nadi: "Aadi", yoni: "Cat", yoniSex: "F" },
  { id: 8, name: "Poosam", tamilScript: "பூசம்", sanskrit: "Pushya", gana: "Deva", nadi: "Madhya", yoni: "Sheep", yoniSex: "M" },
  { id: 9, name: "Ayilyam", tamilScript: "ஆயில்யம்", sanskrit: "Ashlesha", gana: "Rakshasa", nadi: "Antya", yoni: "Cat", yoniSex: "M" },
  { id: 10, name: "Magham", tamilScript: "மகம்", sanskrit: "Magha", gana: "Rakshasa", nadi: "Antya", yoni: "Rat", yoniSex: "M" },
  { id: 11, name: "Pooram", tamilScript: "பூரம்", sanskrit: "Purva Phalguni", gana: "Manushya", nadi: "Madhya", yoni: "Rat", yoniSex: "F" },
  { id: 12, name: "Uthiram", tamilScript: "உத்திரம்", sanskrit: "Uttara Phalguni", gana: "Manushya", nadi: "Aadi", yoni: "Cow", yoniSex: "M" },
  { id: 13, name: "Astham", tamilScript: "அஸ்தம்", sanskrit: "Hasta", gana: "Deva", nadi: "Aadi", yoni: "Buffalo", yoniSex: "F" },
  { id: 14, name: "Chithirai", tamilScript: "சித்திரை", sanskrit: "Chitra", gana: "Rakshasa", nadi: "Madhya", yoni: "Tiger", yoniSex: "F" },
  { id: 15, name: "Swathi", tamilScript: "சுவாதி", sanskrit: "Swati", gana: "Deva", nadi: "Antya", yoni: "Buffalo", yoniSex: "M" },
  { id: 16, name: "Visakam", tamilScript: "விசாகம்", sanskrit: "Vishakha", gana: "Rakshasa", nadi: "Antya", yoni: "Tiger", yoniSex: "M" },
  { id: 17, name: "Anusham", tamilScript: "அனுஷம்", sanskrit: "Anuradha", gana: "Deva", nadi: "Madhya", yoni: "Deer", yoniSex: "F" },
  { id: 18, name: "Kettai", tamilScript: "கேட்டை", sanskrit: "Jyeshtha", gana: "Rakshasa", nadi: "Aadi", yoni: "Deer", yoniSex: "M" },
  { id: 19, name: "Moolam", tamilScript: "மூலம்", sanskrit: "Mula", gana: "Rakshasa", nadi: "Aadi", yoni: "Dog", yoniSex: "M" },
  { id: 20, name: "Pooradam", tamilScript: "பூராடம்", sanskrit: "Purva Ashadha", gana: "Manushya", nadi: "Madhya", yoni: "Monkey", yoniSex: "M" },
  { id: 21, name: "Uthiradam", tamilScript: "உத்திராடம்", sanskrit: "Uttara Ashadha", gana: "Manushya", nadi: "Antya", yoni: "Mongoose", yoniSex: "F" },
  { id: 22, name: "Thiruvonam", tamilScript: "திருவோணம்", sanskrit: "Shravana", gana: "Deva", nadi: "Antya", yoni: "Monkey", yoniSex: "F" },
  { id: 23, name: "Avittam", tamilScript: "அவிட்டம்", sanskrit: "Dhanishta", gana: "Rakshasa", nadi: "Madhya", yoni: "Lion", yoniSex: "F" },
  { id: 24, name: "Sadhayam", tamilScript: "சதயம்", sanskrit: "Shatabhisha", gana: "Rakshasa", nadi: "Aadi", yoni: "Horse", yoniSex: "F" },
  { id: 25, name: "Pooratathi", tamilScript: "பூரட்டாதி", sanskrit: "Purva Bhadrapada", gana: "Manushya", nadi: "Aadi", yoni: "Lion", yoniSex: "M" },
  { id: 26, name: "Uthiratathi", tamilScript: "உத்திரட்டாதி", sanskrit: "Uttara Bhadrapada", gana: "Manushya", nadi: "Madhya", yoni: "Cow", yoniSex: "F" },
  { id: 27, name: "Revathi", tamilScript: "ரேவதி", sanskrit: "Revati", gana: "Deva", nadi: "Antya", yoni: "Elephant", yoniSex: "F" },
];

// ---- Koota scoring helpers ----

const varnaRank: Record<Varna, number> = {
  Shudra: 1,
  Vaishya: 2,
  Kshatriya: 3,
  Brahmin: 4,
};

function varnaKoota(boyRasi: Rasi, girlRasi: Rasi): number {
  // 1 point if groom's varna >= bride's varna.
  return varnaRank[boyRasi.varna] >= varnaRank[girlRasi.varna] ? 1 : 0;
}

// Vashya: rasi -> group; simplified compatibility (max 2).
const vashyaGroup: Record<number, string> = {
  1: "Chatushpada", 2: "Chatushpada", 5: "Vanachara", 9: "Manava",
  10: "Chatushpada", 3: "Manava", 6: "Manava", 7: "Manava", 11: "Manava",
  4: "Jalachara", 12: "Jalachara", 8: "Keeta",
};
function vashyaKoota(boyRasi: Rasi, girlRasi: Rasi): number {
  const a = vashyaGroup[boyRasi.id];
  const b = vashyaGroup[girlRasi.id];
  if (a === b) return 2;
  // Friendly-ish groupings get partial; otherwise neutral 1.
  const friendly = new Set(["Chatushpada|Vanachara", "Manava|Keeta"]);
  if (friendly.has([a, b].sort().join("|"))) return 1;
  return 1;
}

function taraKoota(boyN: Nakshatra, girlN: Nakshatra): number {
  const dir = (from: number, to: number) => {
    const count = ((to - from + 27) % 27) + 1;
    const rem = count % 9;
    return rem === 3 || rem === 5 || rem === 7 ? 0 : 1.5;
  };
  return dir(boyN.id, girlN.id) + dir(girlN.id, boyN.id);
}

const yoniEnemies = new Set(
  [
    ["Cat", "Rat"],
    ["Cow", "Tiger"],
    ["Elephant", "Lion"],
    ["Horse", "Buffalo"],
    ["Dog", "Deer"],
    ["Monkey", "Sheep"],
    ["Serpent", "Mongoose"],
  ].map((p) => p.sort().join("|"))
);
function yoniKoota(boyN: Nakshatra, girlN: Nakshatra): number {
  if (boyN.yoni === girlN.yoni) return 4;
  if (yoniEnemies.has([boyN.yoni, girlN.yoni].sort().join("|"))) return 0;
  return 2; // neutral (indicative)
}

// Planetary friendship for Graha Maitri.
const friends: Record<Planet, Planet[]> = {
  Sun: ["Moon", "Mars", "Jupiter"],
  Moon: ["Sun", "Mercury"],
  Mars: ["Sun", "Moon", "Jupiter"],
  Mercury: ["Sun", "Venus"],
  Jupiter: ["Sun", "Moon", "Mars"],
  Venus: ["Mercury", "Saturn"],
  Saturn: ["Mercury", "Venus"],
};
const enemies: Record<Planet, Planet[]> = {
  Sun: ["Venus", "Saturn"],
  Moon: [],
  Mars: ["Mercury"],
  Mercury: ["Moon"],
  Jupiter: ["Mercury", "Venus"],
  Venus: ["Sun", "Moon"],
  Saturn: ["Sun", "Moon", "Mars"],
};
function relation(a: Planet, b: Planet): "friend" | "enemy" | "neutral" {
  if (a === b) return "friend";
  if (friends[a].includes(b)) return "friend";
  if (enemies[a].includes(b)) return "enemy";
  return "neutral";
}
function grahaMaitriKoota(boyRasi: Rasi, girlRasi: Rasi): number {
  const r1 = relation(boyRasi.lord, girlRasi.lord);
  const r2 = relation(girlRasi.lord, boyRasi.lord);
  const key = [r1, r2].sort().join("|");
  const table: Record<string, number> = {
    "friend|friend": 5,
    "friend|neutral": 4,
    "neutral|neutral": 3,
    "enemy|friend": 1,
    "enemy|neutral": 0.5,
    "enemy|enemy": 0,
  };
  return table[key] ?? 3;
}

function ganaKoota(boyN: Nakshatra, girlN: Nakshatra): number {
  const g = (x: Gana) => x;
  const b = g(boyN.gana);
  const gi = g(girlN.gana);
  if (b === gi) return 6;
  const pair = [b, gi].sort().join("|");
  const table: Record<string, number> = {
    "Deva|Manushya": 5,
    "Deva|Rakshasa": 1,
    "Manushya|Rakshasa": 0,
  };
  return table[pair] ?? 6;
}

function bhakootKoota(boyRasi: Rasi, girlRasi: Rasi): number {
  const d1 = ((girlRasi.id - boyRasi.id + 12) % 12) + 1;
  const d2 = ((boyRasi.id - girlRasi.id + 12) % 12) + 1;
  const bad = new Set([2, 12, 5, 9, 6, 8]);
  return bad.has(d1) || bad.has(d2) ? 0 : 7;
}

function nadiKoota(boyN: Nakshatra, girlN: Nakshatra): number {
  return boyN.nadi === girlN.nadi ? 0 : 8;
}

export interface KootaResult {
  name: string;
  max: number;
  score: number;
  note: string;
}

export interface MatchResult {
  total: number;
  max: number;
  kootas: KootaResult[];
  verdict: string;
  sameNadi: boolean;
  sameGana: boolean;
}

// ---- Compatibility rankings (for the Porutham Guide) ----

export interface RasiRank {
  rasi: Rasi;
  score: number;
  max: number;
  bhakootOk: boolean;
}

// Rank all rasis against a chosen rasi using the rasi-based kootas
// (Varna + Vashya + Graha Maitri + Bhakoot; max 15).
export function rankRasis(rasiId: number): RasiRank[] {
  const base = rasis.find((r) => r.id === rasiId)!;
  return rasis
    .filter((r) => r.id !== rasiId)
    .map((r) => {
      const bh = bhakootKoota(base, r);
      const score =
        varnaKoota(base, r) + vashyaKoota(base, r) + grahaMaitriKoota(base, r) + bh;
      return { rasi: r, score, max: 1 + 2 + 5 + 7, bhakootOk: bh > 0 };
    })
    .sort((a, b) => b.score - a.score);
}

export interface NakRank {
  nak: Nakshatra;
  score: number;
  max: number;
  sameNadi: boolean;
}

// Rank all nakshatras against a chosen one using the star-based kootas
// (Tara + Yoni + Gana + Nadi; max 21).
export function rankNakshatras(nakId: number): NakRank[] {
  const base = nakshatras.find((n) => n.id === nakId)!;
  return nakshatras
    .filter((n) => n.id !== nakId)
    .map((n) => {
      const score =
        taraKoota(base, n) + yoniKoota(base, n) + ganaKoota(base, n) + nadiKoota(base, n);
      return { nak: n, score, max: 3 + 4 + 6 + 8, sameNadi: base.nadi === n.nadi };
    })
    .sort((a, b) => b.score - a.score);
}

// ---- 10 Porutham (Tamil Dasa Porutham) ----

// Rajju group per nakshatra id (same rajju between couple = dosha).
const RAJJU: Record<number, string> = {};
[1, 9, 10, 18, 19, 27].forEach((i) => (RAJJU[i] = "Paada (foot)"));
[2, 8, 11, 17, 20, 26].forEach((i) => (RAJJU[i] = "Kati (hip)"));
[3, 7, 12, 16, 21, 25].forEach((i) => (RAJJU[i] = "Udhara (stomach)"));
[4, 6, 13, 15, 22, 24].forEach((i) => (RAJJU[i] = "Kanta (neck)"));
[5, 14, 23].forEach((i) => (RAJJU[i] = "Sira (head)"));

// Mutually afflicting (Vedha) nakshatra pairs.
const VEDHA = new Set(
  [
    [1, 18], [2, 17], [3, 16], [4, 15], [5, 23], [6, 22], [7, 21],
    [8, 20], [9, 19], [10, 27], [11, 26], [12, 25], [13, 24],
  ].map((p) => p.sort((a, b) => a - b).join("-"))
);

export interface Porutham {
  name: string; // Tamil porutham name
  tamilScript: string;
  ok: boolean;
  note: string;
  critical?: boolean; // Rajju & Vedha — must-pass poruthams
}

export interface PoruthamResult {
  poruthams: Porutham[];
  matched: number;
  total: number;
  rajjuOk: boolean;
  vedhaOk: boolean;
  verdict: string;
  good: boolean;
}

export function tenPoruthams(
  boyNakId: number,
  boyRasiId: number,
  girlNakId: number,
  girlRasiId: number
): Porutham[] {
  const boyN = nakshatras.find((n) => n.id === boyNakId)!;
  const girlN = nakshatras.find((n) => n.id === girlNakId)!;
  const boyR = rasis.find((r) => r.id === boyRasiId)!;
  const girlR = rasis.find((r) => r.id === girlRasiId)!;

  const countGB = ((boyN.id - girlN.id + 27) % 27) + 1; // girl's star → boy's star
  const vedhaKey = [boyN.id, girlN.id].sort((a, b) => a - b).join("-");

  return [
    { name: "Dina", tamilScript: "தினம்", ok: [0, 2, 4, 6, 8].includes(countGB % 9), note: "Health & prosperity" },
    { name: "Gana", tamilScript: "கணம்", ok: ganaKoota(boyN, girlN) >= 5, note: "Temperament harmony" },
    { name: "Mahendra", tamilScript: "மகேந்திரம்", ok: [4, 7, 10, 13, 16, 19, 22, 25].includes(countGB), note: "Progeny & wellbeing" },
    { name: "Stree Deergha", tamilScript: "ஸ்திரீ தீர்க்கம்", ok: countGB > 9, note: "Longevity & welfare of the bride" },
    { name: "Yoni", tamilScript: "யோனி", ok: yoniKoota(boyN, girlN) >= 2, note: "Physical compatibility" },
    { name: "Rasi", tamilScript: "ராசி", ok: bhakootKoota(boyR, girlR) > 0, note: "Family welfare & progeny" },
    { name: "Rasi Athipathi", tamilScript: "ராசி அதிபதி", ok: grahaMaitriKoota(boyR, girlR) >= 3, note: "Mental affinity (rasi lords)" },
    { name: "Vasya", tamilScript: "வசியம்", ok: vashyaGroup[boyR.id] === vashyaGroup[girlR.id] || grahaMaitriKoota(boyR, girlR) >= 4, note: "Mutual attraction & bonding" },
    { name: "Rajju", tamilScript: "ரஜ்ஜு", ok: RAJJU[boyN.id] !== RAJJU[girlN.id], note: "Longevity of the husband — most important; same rajju is a dosha", critical: true },
    { name: "Vedhai", tamilScript: "வேதை", ok: !VEDHA.has(vedhaKey), note: "Absence of mutual affliction", critical: true },
  ];
}

// Headline result for the 10-Porutham (Tamil Dasa Porutham) system.
export function poruthamMatch(
  boyNakId: number,
  boyRasiId: number,
  girlNakId: number,
  girlRasiId: number
): PoruthamResult {
  const poruthams = tenPoruthams(boyNakId, boyRasiId, girlNakId, girlRasiId);
  const matched = poruthams.filter((p) => p.ok).length;
  const rajjuOk = poruthams.find((p) => p.name === "Rajju")!.ok;
  const vedhaOk = poruthams.find((p) => p.name === "Vedhai")!.ok;

  let verdict: string;
  let good: boolean;
  if (!rajjuOk) {
    verdict = "Rajju dosham — traditionally not recommended.";
    good = false;
  } else if (matched >= 8) {
    verdict = "Excellent match (uthamam).";
    good = true;
  } else if (matched >= 6) {
    verdict = "Good match (madhyamam).";
    good = true;
  } else if (matched >= 4) {
    verdict = "Acceptable — review with an astrologer.";
    good = true;
  } else {
    verdict = "Below the usual threshold. Consult an astrologer.";
    good = false;
  }

  return { poruthams, matched, total: 10, rajjuOk, vedhaOk, verdict, good };
}

export function matchHoroscopes(
  boyNakId: number,
  boyRasiId: number,
  girlNakId: number,
  girlRasiId: number
): MatchResult {
  const boyN = nakshatras.find((n) => n.id === boyNakId)!;
  const girlN = nakshatras.find((n) => n.id === girlNakId)!;
  const boyR = rasis.find((r) => r.id === boyRasiId)!;
  const girlR = rasis.find((r) => r.id === girlRasiId)!;

  const kootas: KootaResult[] = [
    { name: "Varna", max: 1, score: varnaKoota(boyR, girlR), note: "Spiritual compatibility / ego." },
    { name: "Vashya", max: 2, score: vashyaKoota(boyR, girlR), note: "Mutual attraction & control." },
    { name: "Tara", max: 3, score: taraKoota(boyN, girlN), note: "Health & well-being (birth star)." },
    { name: "Yoni", max: 4, score: yoniKoota(boyN, girlN), note: "Physical & temperamental compatibility." },
    { name: "Graha Maitri", max: 5, score: grahaMaitriKoota(boyR, girlR), note: "Mental affinity (rasi lords)." },
    { name: "Gana", max: 6, score: ganaKoota(boyN, girlN), note: "Temperament (Deva/Manushya/Rakshasa)." },
    { name: "Bhakoot", max: 7, score: bhakootKoota(boyR, girlR), note: "Family welfare & prosperity." },
    { name: "Nadi", max: 8, score: nadiKoota(boyN, girlN), note: "Health & progeny — heavily weighted." },
  ];

  const total = kootas.reduce((s, k) => s + k.score, 0);
  const max = 36;

  let verdict: string;
  if (total >= 32) verdict = "Excellent match.";
  else if (total >= 26) verdict = "Very good match.";
  else if (total >= 18) verdict = "Acceptable / good match.";
  else verdict = "Below the recommended threshold (18). Consult an astrologer.";

  return {
    total,
    max,
    kootas,
    verdict,
    sameNadi: boyN.nadi === girlN.nadi,
    sameGana: boyN.gana === girlN.gana,
  };
}
