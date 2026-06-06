// Gen-Z compatibility dimensions — each mirrors a traditional porutham, so
// parents see the porutham and children see the modern meaning. Options are
// ordinal (index distance = how far apart the two partners are).

export interface GenZDim {
  porutham: string; // traditional name
  traditional: string; // traditional meaning
  modern: string; // gen-z meaning
  question: string;
  options: string[]; // exactly 3, ordered
}

export const genzDims: GenZDim[] = [
  {
    porutham: "Dina",
    traditional: "Health & longevity",
    modern: "Mental health & emotional support",
    question: "Openness about feelings / mental health",
    options: ["Very open", "Somewhat", "Quite private"],
  },
  {
    porutham: "Gana",
    traditional: "Temperament match",
    modern: "Emotional intelligence & conflict style",
    question: "When there's a disagreement, you…",
    options: ["Talk it out calmly", "Need space, then talk", "Tend to avoid it"],
  },
  {
    porutham: "Mahendra",
    traditional: "Prosperity & growth",
    modern: "Career, finances & work–life balance",
    question: "Career vs family priority",
    options: ["Career-driven", "Balanced", "Family-first"],
  },
  {
    porutham: "Yoni",
    traditional: "Physical compatibility",
    modern: "Love languages & independence vs togetherness",
    question: "Time together vs personal space",
    options: ["Lots of together time", "A healthy mix", "Value independence"],
  },
  {
    porutham: "Rasi",
    traditional: "Zodiac harmony",
    modern: "Lifestyle, hobbies & social compatibility",
    question: "Ideal lifestyle",
    options: ["Homebody", "A bit of both", "Out & social"],
  },
  {
    porutham: "Rasi Athipathi",
    traditional: "Planetary lord friendship",
    modern: "Values, ethics & cultural openness",
    question: "Overall outlook",
    options: ["Traditional", "Balanced", "Modern"],
  },
  {
    porutham: "Vasya",
    traditional: "Attraction & bonding",
    modern: "Digital presence & social-media comfort",
    question: "Social media style",
    options: ["Very active online", "Moderate", "Mostly offline"],
  },
  {
    porutham: "Rajju",
    traditional: "Marital longevity",
    modern: "Commitment mindset & family planning",
    question: "Family planning view",
    options: ["Kids fairly soon", "Later / open", "Unsure / no kids"],
  },
  {
    porutham: "Vedha",
    traditional: "Avoidance of conflict",
    modern: "Transparency, trust & openness",
    question: "Openness (phone, finances, friends)",
    options: ["Fully open", "Some privacy", "Strongly independent"],
  },
  {
    porutham: "Nadi",
    traditional: "Health & heredity",
    modern: "Wellness, fitness & diet goals",
    question: "Wellness & food",
    options: ["Health & veg focused", "Flexible", "Foodie, no limits"],
  },
];
