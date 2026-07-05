// Data model for the Interactive Family Photo. Coordinates are percentages of
// the image box, so hotspots stay put on any screen size.
// (Same shape as the original HTML prototype: { x, y, name, rel, intro }.)

export interface PhotoTag {
  x: number; // 0–100 (% from left)
  y: number; // 0–100 (% from top)
  name: string;
  rel: string; // relationship label, e.g. "Mama (மாமா) · mother's brother"
  intro: string; // 1–2 line intro
  audio?: string; // optional recorded/uploaded voice note (data URL or path)
}

// Seeded demo used on the homepage so first-time visitors feel the magic.
export const sampleFamilyPhoto = "/sample-family.jpeg";

export const sampleFamilyTags: PhotoTag[] = [
  {
    x: 30,
    y: 16,
    name: "Venkitaswamy",
    rel: "Thatha (தாத்தா) · grandfather",
    intro: "The family elder — quiet, wise, and endlessly patient.",
  },
  {
    x: 44,
    y: 19,
    name: "Ranga Nayaki",
    rel: "Paati (பாட்டி) · grandmother",
    intro: "Keeper of the family's recipes, rituals and stories.",
  },
  {
    x: 60,
    y: 19,
    name: "Savithri",
    rel: "Amma (அம்மா) · mother",
    intro: "Holds the home together; the heart of every festival.",
  },
  {
    x: 71,
    y: 42,
    name: "Shreya",
    rel: "Pethi (பேத்தி) · granddaughter",
    intro: "The youngest — loves drawing kolams and learning Paati's songs.",
  },
];
