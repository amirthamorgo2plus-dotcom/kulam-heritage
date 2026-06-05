// SAMPLE / ILLUSTRATIVE "marriage needs in one place" data.
// A start-to-finish wedding checklist + vendor categories (including
// Kanchipuram silk shops). Demo data — verify vendors independently.

export interface ChecklistStage {
  phase: string;
  timing: string;
  tasks: string[];
}

// Start-to-end journey for a Kammavar Naidu wedding.
export const checklist: ChecklistStage[] = [
  {
    phase: "Match & fix",
    timing: "3–6 months before",
    tasks: [
      "Horoscope matching (see Horoscope tool)",
      "Pen paarthal / families meet",
      "Nichayathartham (engagement) & fix muhurtham",
    ],
  },
  {
    phase: "Book the big things",
    timing: "2–4 months before",
    tasks: [
      "Book kalyana mandapam (see Mandapams map)",
      "Book purohit / priest for the muhurtham",
      "Confirm caterer & menu",
      "Book photographer & videographer",
    ],
  },
  {
    phase: "Shopping",
    timing: "1–2 months before",
    tasks: [
      "Kanchipuram silk sarees & wedding attire",
      "Bridal & family jewellery",
      "Wedding invitations (printed + digital)",
      "Return gifts / thamboolam bags",
    ],
  },
  {
    phase: "Final week",
    timing: "1 week before",
    tasks: [
      "Pellikuthuru / Pellikoduku (turmeric) arrangements",
      "Book bridal makeup & mehndi artist",
      "Nadaswaram / music troupe",
      "Transport & guest logistics",
    ],
  },
  {
    phase: "Wedding day",
    timing: "Muhurtham",
    tasks: [
      "Mangala Snanam & getting ready",
      "Kanyadanam & Mangalyadharanam (thaali)",
      "Saptapadi, talambralu & blessings",
      "Reception",
    ],
  },
];

export interface Vendor {
  name: string;
  area: string;
  district: string;
  note?: string;
}

export interface VendorCategory {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  vendors: Vendor[];
}

export const vendorCategories: VendorCategory[] = [
  {
    id: "silk",
    title: "Kanchipuram Silk Shops",
    icon: "🥻",
    blurb:
      "Traditional Kanchipuram (Kanjivaram) silk sarees for the bride, groom's family and guests.",
    vendors: [
      { name: "Nalli Silks", area: "Multiple branches", district: "Kanchipuram / Chennai" },
      { name: "Kumaran Silks", area: "T. Nagar", district: "Chennai" },
      { name: "RmKV Silks", area: "Multiple branches", district: "Chennai / Tirunelveli" },
      { name: "Pothys", area: "T. Nagar", district: "Chennai" },
      { name: "Sundari Silks", area: "Mylapore", district: "Chennai" },
      { name: "Kanchi Kamakshi Silks", area: "Kanchipuram town", district: "Kanchipuram" },
      { name: "AS Babu Sah", area: "Gandhi Road", district: "Kanchipuram" },
    ],
  },
  {
    id: "jewellery",
    title: "Jewellery",
    icon: "💍",
    blurb: "Bridal gold, diamond and temple jewellery.",
    vendors: [
      { name: "GRT Jewellers", area: "Multiple branches", district: "Tamil Nadu" },
      { name: "Lalitha Jewellery", area: "Multiple branches", district: "Tamil Nadu" },
      { name: "Joyalukkas", area: "Multiple branches", district: "Tamil Nadu" },
    ],
  },
  {
    id: "purohit",
    title: "Purohit / Priests",
    icon: "🕉️",
    blurb: "Vadhyars for muhurtham, homam and ceremonies.",
    vendors: [
      { name: "Sri Vaidika Purohit Service", area: "RS Puram", district: "Coimbatore" },
      { name: "Madurai Vadhyar Mandram", area: "Mattuthavani", district: "Madurai" },
    ],
  },
  {
    id: "planners",
    title: "Wedding Planners",
    icon: "📋",
    blurb: "End-to-end planners who coordinate venue, vendors and the day-of run.",
    vendors: [
      { name: "Kovai Wedding Planners", area: "RS Puram", district: "Coimbatore" },
      { name: "Shaadi Events", area: "Anna Nagar", district: "Chennai" },
      { name: "Madurai Mangalam Planners", area: "K.K. Nagar", district: "Madurai" },
    ],
  },
  {
    id: "catering",
    title: "Catering / Food",
    icon: "🍛",
    blurb: "Traditional Tamil vegetarian sadya, tiffin counters & wedding feasts.",
    vendors: [
      { name: "Kongu Catering Service", area: "Gandhipuram", district: "Coimbatore" },
      { name: "Sri Annapoorna Caterers", area: "T. Nagar", district: "Chennai" },
      { name: "Adyar Ananda Bhavan Catering", area: "Multiple branches", district: "Tamil Nadu" },
    ],
  },
  {
    id: "decor",
    title: "Decoration & Flowers",
    icon: "🌸",
    blurb: "Stage, mandapam and flower decoration.",
    vendors: [
      { name: "Malligai Event Decor", area: "Adyar", district: "Chennai" },
      { name: "Kovai Flower Decorators", area: "RS Puram", district: "Coimbatore" },
    ],
  },
  {
    id: "photo",
    title: "Photography & Video",
    icon: "📸",
    blurb: "Candid photography, traditional video and drone coverage.",
    vendors: [
      { name: "Click Studio", area: "Anna Nagar", district: "Chennai" },
      { name: "Moments Madurai", area: "K.K. Nagar", district: "Madurai" },
    ],
  },
  {
    id: "makeup",
    title: "Bridal Makeup & Mehndi",
    icon: "💄",
    blurb: "Bridal makeup artists and mehndi (henna) designers.",
    vendors: [
      { name: "Bridal Glow Studio", area: "T. Nagar", district: "Chennai" },
      { name: "Henna by Priya", area: "Race Course", district: "Coimbatore" },
    ],
  },
  {
    id: "music",
    title: "Nadaswaram & Music",
    icon: "🎵",
    blurb: "Nadaswaram-thavil troupes and reception music.",
    vendors: [
      { name: "Thanjavur Nadaswara Mandram", area: "Town", district: "Thanjavur" },
      { name: "Melam Events", area: "Anna Nagar", district: "Chennai" },
    ],
  },
  {
    id: "invites",
    title: "Invitations",
    icon: "✉️",
    blurb: "Printed wedding cards and digital invitations.",
    vendors: [
      { name: "Sri Karthik Cards", area: "Town Hall", district: "Coimbatore" },
      { name: "Chennai Wedding Cards", area: "Sowcarpet", district: "Chennai" },
    ],
  },
  {
    id: "returngifts",
    title: "Return Gifts — Shops",
    icon: "🎁",
    blurb: "Where to buy thamboolam bags and return gifts in bulk.",
    vendors: [
      { name: "Pongal Gift Centre (silver & brass)", area: "Town Hall", district: "Coimbatore" },
      { name: "Giri Trading (pooja items)", area: "Mylapore", district: "Chennai" },
      { name: "Poompuhar Handicrafts (TN govt)", area: "Multiple branches", district: "Tamil Nadu" },
    ],
  },
];

// Return-gift IDEAS (what to give), with rough budgets, grouped by guest tier.
export interface GiftIdea {
  name: string;
  budget: string;
  bestFor: string;
}

export const returnGiftIdeas: GiftIdea[] = [
  { name: "Silver kumkum / coin (chandi)", budget: "₹300–1,500", bestFor: "Close relatives, sumangali" },
  { name: "Brass / kuthuvilakku lamp", budget: "₹250–800", bestFor: "Elders & special guests" },
  { name: "Steel / copper water bottle set", budget: "₹150–500", bestFor: "All guests (practical)" },
  { name: "Dry-fruit / sweet box", budget: "₹120–400", bestFor: "All guests" },
  { name: "Sandalwood / mysore soap & attar set", budget: "₹100–350", bestFor: "All guests" },
  { name: "Eco bag + seed/plant sapling", budget: "₹80–200", bestFor: "Younger guests, eco-conscious" },
  { name: "Mini pooja kit (haldi-kumkum-mirror)", budget: "₹60–150", bestFor: "Bulk / large guest list" },
  { name: "Kanchipuram-print fridge magnet / coaster", budget: "₹50–120", bestFor: "Out-of-town guests" },
];
