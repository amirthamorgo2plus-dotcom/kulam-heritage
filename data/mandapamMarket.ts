// Marketplace view over the real Coimbatore venue list. The base facts (name,
// area, capacity, per-plate price) are real; the marketplace fields below
// (rating, reviews, amenities, verification) are PROTOTYPE/illustrative data
// generated deterministically from the venue id so the demo is stable across
// reloads. In Phase 1 these become real columns + a reviews table in Supabase.

import { mandapams, type Mandapam } from "./mandapams";

export interface SeedReview {
  author: string;
  rating: number;
  text: string;
  when: string;
}

export interface MarketMandapam extends Mandapam {
  rating: number; // 1-5, one decimal
  reviewCount: number;
  verified: boolean;
  ac: boolean;
  amenities: string[];
  about: string;
  seedReviews: SeedReview[];
  banner: string; // CSS linear-gradient (inline style; avoids Tailwind purge of dynamic classes)
}

// tiny deterministic PRNG (mulberry32) seeded per venue id
function seeded(id: number) {
  let t = id + 0x6d2b79f5;
  return () => {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const AMENITIES = [
  "Air-conditioned",
  "Car parking",
  "In-house catering",
  "Bridal room",
  "Generator backup",
  "Stage decoration",
  "Dining hall",
  "Guest rooms",
  "Valet service",
];

const REVIEW_POOL: { text: string; rating: number }[] = [
  { text: "Spacious hall and the staff handled our muhurtham timing perfectly.", rating: 5 },
  { text: "Great location, easy parking for guests. Catering was tasty.", rating: 4 },
  { text: "Clean bridal room and good A/C. Slightly tight for 1000+ guests.", rating: 4 },
  { text: "Beautiful stage decoration options. Booking process was smooth.", rating: 5 },
  { text: "Value for money for a Coimbatore wedding. Would recommend.", rating: 4 },
  { text: "Management was responsive and flexible with our ritual needs.", rating: 5 },
  { text: "Decent hall but the dining area gets crowded at peak time.", rating: 3 },
];

const NAMES = [
  "Anitha R.", "Karthik S.", "Meena V.", "Suresh K.", "Lakshmi N.",
  "Arun P.", "Divya M.", "Ganesh B.", "Revathi T.", "Vijay G.",
];

const gradients = [
  "linear-gradient(135deg, #14b8a6, #059669)",
  "linear-gradient(135deg, #10b981, #0891b2)",
  "linear-gradient(135deg, #0e7490, #0f766e)",
  "linear-gradient(135deg, #0d9488, #16a34a)",
];

export const marketMandapams: MarketMandapam[] = mandapams.map((m) => {
  const id = Number(m.id);
  const rnd = seeded(id);
  const rating = Math.round((3.6 + rnd() * 1.4) * 10) / 10; // 3.6 - 5.0
  const reviewCount = 6 + Math.floor(rnd() * 90);
  const verified = rnd() > 0.35;
  const ac =
    /a\/c|ac\b/i.test(m.name) || rnd() > 0.5;

  // pick 3-5 amenities deterministically
  const amenityCount = 3 + Math.floor(rnd() * 3);
  const pool = [...AMENITIES];
  const amenities: string[] = [];
  for (let i = 0; i < amenityCount && pool.length; i++) {
    amenities.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);
  }

  // 2-3 seed reviews
  const rc = 2 + Math.floor(rnd() * 2);
  const seedReviews: SeedReview[] = [];
  for (let i = 0; i < rc; i++) {
    const r = REVIEW_POOL[Math.floor(rnd() * REVIEW_POOL.length)];
    seedReviews.push({
      author: NAMES[Math.floor(rnd() * NAMES.length)],
      rating: r.rating,
      text: r.text,
      when: `${1 + Math.floor(rnd() * 11)} months ago`,
    });
  }

  const g = gradients[id % gradients.length];

  return {
    ...m,
    rating,
    reviewCount,
    verified,
    ac,
    amenities,
    about: `${m.name} is a kalyana mandapam in ${m.area}, ${m.district}${
      m.capacityMax ? `, accommodating up to ${m.capacityMax} guests` : ""
    }. A popular choice for Kammavar Naidu weddings and receptions.`,
    seedReviews,
    banner: g,
  };
});

export function getMarketMandapam(id: string): MarketMandapam | undefined {
  return marketMandapams.find((m) => m.id === id);
}
