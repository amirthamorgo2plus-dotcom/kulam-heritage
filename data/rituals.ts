// SAMPLE / ILLUSTRATIVE ritual descriptions — verify with community elders.
// Keyed by kulamId + lifeEvent so other kulams/events extend this list.

export interface RitualStep {
  title: string;
  detail: string;
  significance?: string; // why it is done / what it means
}

export interface Ritual {
  id: string;
  kulamId: string;
  lifeEvent: "Wedding" | "Naming" | "Festival" | "Coming of Age" | "Other";
  title: string;
  summary: string;
  steps: RitualStep[];
}

export const rituals: Ritual[] = [
  {
    id: "kamma-wedding",
    kulamId: "kammavar-naidu",
    lifeEvent: "Wedding",
    title: "Kammavar Naidu Wedding",
    summary:
      "A Kammavar Naidu wedding blends Telugu-origin rites with Tamil Nadu customs, centred on horoscope matching, the muhurtham and the kula deivam's blessings.",
    steps: [
      {
        title: "Pen Paarthal / Pelli Choopulu",
        detail:
          "The two families formally meet so the prospective bride and groom can see each other, often over coffee and tiffin at the bride's home.",
        significance:
          "Marks consent of both families to explore the alliance before any commitment.",
      },
      {
        title: "Jathakam / Horoscope matching",
        detail:
          "The families exchange horoscopes and an astrologer compares them (Ashtakoota / guna match). The alliance usually proceeds only on a satisfactory score.",
        significance:
          "Checks long-term compatibility and auspiciousness — see the Horoscope tool.",
      },
      {
        title: "Nichayathartham (Engagement)",
        detail:
          "Betrothal at which elders exchange plates of fruit, betel, turmeric and gifts, and the priest fixes the wedding muhurtham (auspicious date & time).",
        significance:
          "Publicly seals the alliance and locks the date the rest of the planning is built around.",
      },
      {
        title: "Pandhakaal & Naandi",
        detail:
          "A day or two before, a sanctified pole/post is planted and a Naandi (ancestor-remembrance) ceremony invokes blessings of forefathers.",
        significance:
          "Seeks the blessings of family ancestors and removes obstacles before the rites begin.",
      },
      {
        title: "Pellikuthuru & Pellikoduku",
        detail:
          "Turmeric and oil are applied to the bride and groom at their respective homes, followed by Mangala Snanam (auspicious bath), new clothes and aarti.",
        significance:
          "Purifies and beautifies the couple; turmeric is auspicious and protective.",
      },
      {
        title: "Snakatam / Kashi Yatra (groom)",
        detail:
          "The groom playfully pretends to renounce worldly life for Kashi; the bride's brother persuades him to return and marry — light-hearted and symbolic.",
        significance:
          "Symbolises the groom choosing married (householder) life over asceticism.",
      },
      {
        title: "Kanyadanam",
        detail:
          "At the muhurtham the bride's parents formally give her hand to the groom, pouring sacred water as the priest chants.",
        significance:
          "The most sacred gift a parent can make — entrusting their daughter to the groom.",
      },
      {
        title: "Mangalyadharanam (Thaali tying)",
        detail:
          "The groom ties the thaali (mangalsutra) around the bride's neck — typically three knots — as the nadaswaram reaches a crescendo (getti melam).",
        significance:
          "The defining moment of the marriage; the couple are now wed.",
      },
      {
        title: "Saptapadi (seven steps)",
        detail:
          "The couple take seven steps together around the sacred fire (homam), each step a shared vow.",
        significance:
          "Each step is a promise — nourishment, strength, prosperity, happiness, progeny, seasons, and lifelong friendship.",
      },
      {
        title: "Talambralu",
        detail:
          "The newly-weds joyfully shower each other with pearl-mixed rice amid laughter and family cheer.",
        significance:
          "A playful blessing for prosperity, fertility and a joyful union.",
      },
      {
        title: "Reception & Grihapravesam",
        detail:
          "A reception celebrates with guests; later the bride is welcomed into the groom's home (Grihapravesam).",
        significance:
          "Introduces the couple to the wider community and welcomes the bride to her new home.",
      },
    ],
  },
  {
    id: "kamma-barasala",
    kulamId: "kammavar-naidu",
    lifeEvent: "Naming",
    title: "Barasala (Naming Ceremony)",
    summary:
      "Held typically on the 21st day, the infant is formally named, often based on the birth star (nakshatra).",
    steps: [
      {
        title: "Cradle ceremony",
        detail: "The baby is placed in a decorated cradle amid blessings.",
      },
      {
        title: "Naming",
        detail:
          "An auspicious name is chosen, frequently guided by the birth nakshatra's syllable.",
      },
    ],
  },
  {
    id: "kamma-sankranti",
    kulamId: "kammavar-naidu",
    lifeEvent: "Festival",
    title: "Sankranti",
    summary:
      "The harvest festival is the most important seasonal celebration in the Kamma agrarian heartland.",
    steps: [
      {
        title: "Bhogi",
        detail: "Bonfires and discarding of the old on the first day.",
      },
      {
        title: "Makara Sankranti",
        detail: "Family gatherings, rangoli (muggulu), and new harvest offerings.",
      },
      {
        title: "Kanuma",
        detail: "Honouring cattle that support the farming livelihood.",
      },
    ],
  },
];
