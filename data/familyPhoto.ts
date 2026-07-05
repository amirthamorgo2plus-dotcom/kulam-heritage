// Data model for the Interactive Family Photo. Coordinates are percentages of
// the image box, so hotspots stay put on any screen size.
// (Same shape as the original HTML prototype: { x, y, name, rel, intro }.)

export interface PhotoTag {
  x: number; // 0–100 (% from left)
  y: number; // 0–100 (% from top)
  name: string;
  rel: string; // relationship label, e.g. "Mama (மாமா) · mother's brother"
  intro: string; // 1–2 line intro
}

// Seeded demo used on the homepage so first-time visitors feel the magic.
export const sampleFamilyPhoto = "/sample-family.jpeg";

export const sampleFamilyTags: PhotoTag[] = [
  {
    x: 15,
    y: 40,
    name: "Raman Naidu",
    rel: "Thatha (தாத்தா) · great-grandfather",
    intro: "Started the family coconut farm in 1955. Everyone's beloved elder.",
  },
  {
    x: 33,
    y: 41,
    name: "Lakshmi",
    rel: "Paati (பாட்டி) · great-grandmother",
    intro: "Famous for her Pongal feasts and endless stories.",
  },
  {
    x: 52,
    y: 38,
    name: "Suresh",
    rel: "Mama (மாமா) · mother's brother",
    intro: "Runs the textile shop in town. Always cracking jokes.",
  },
  {
    x: 70,
    y: 40,
    name: "Kamala",
    rel: "Atthai (அத்தை) · father's sister",
    intro: "A teacher, settled in Chennai. The family's wise voice.",
  },
  {
    x: 84,
    y: 44,
    name: "Arjun",
    rel: "Anna (அண்ணா) · elder cousin",
    intro: "The cricket champion of the family. Studying engineering.",
  },
];
