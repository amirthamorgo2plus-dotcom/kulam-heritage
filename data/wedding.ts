// "Marriage needs" data: start-to-finish checklist, vendor categories, real
// Coimbatore vendor listings (sourced from public web directories — verify
// contact/price before booking), and return-gift ideas.
//
// `vendorsSeed` is the static fallback AND the source for the Supabase
// `vendors` table seed (supabase/seed-vendors.sql).

export interface ChecklistStage {
  phase: string;
  timing: string;
  tasks: string[];
}

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

// Category metadata (display order, heading, icon).
export interface VendorCategory {
  id: string;
  title: string;
  icon: string;
  blurb: string;
}

export const vendorCategories: VendorCategory[] = [
  { id: "silk", title: "Kanchipuram Silk Shops", icon: "🥻", blurb: "Kanchipuram (Kanjivaram) silk sarees for the bride, family and guests." },
  { id: "jewellery", title: "Jewellery", icon: "💍", blurb: "Bridal gold, diamond and temple jewellery." },
  { id: "catering", title: "Catering / Food", icon: "🍛", blurb: "Traditional Tamil vegetarian sadya & wedding feasts." },
  { id: "planner", title: "Wedding Planners", icon: "📋", blurb: "End-to-end planners who coordinate venue, vendors and the day-of run." },
  { id: "photo", title: "Photography & Video", icon: "📸", blurb: "Candid photography, cinematography and pre-wedding shoots." },
  { id: "decor", title: "Decoration & Flowers", icon: "🌸", blurb: "Stage, mandapam and floral decoration." },
  { id: "makeup", title: "Bridal Makeup & Mehndi", icon: "💄", blurb: "Bridal makeup artists, hairstyling and mehndi designers." },
  { id: "purohit", title: "Purohit / Priests", icon: "🕉️", blurb: "Vadhyars for muhurtham, homam and ceremonies." },
  { id: "music", title: "Nadaswaram & Music", icon: "🎵", blurb: "Nadaswaram-thavil troupes and reception music." },
  { id: "invites", title: "Invitations", icon: "✉️", blurb: "Printed wedding cards and digital invitations." },
  { id: "returngifts", title: "Return Gifts — Shops", icon: "🎁", blurb: "Where to buy thamboolam bags and return gifts in bulk." },
];

export interface Vendor {
  category: string;
  name: string;
  area: string;
  district: string;
  priceInfo?: string;
  phone?: string;
}

// Real Coimbatore vendors from public directories (WedMeGood / WeddingWire /
// Sulekha / Justdial). Verify details before booking.
export const vendorsSeed: Vendor[] = [
  // Silk
  { category: "silk", name: "Nalli Silks", area: "Multiple branches", district: "Coimbatore / Chennai" },
  { category: "silk", name: "Pothys", area: "Multiple branches", district: "Coimbatore / Chennai" },
  { category: "silk", name: "RmKV Silks", area: "Multiple branches", district: "Coimbatore / Chennai" },
  { category: "silk", name: "The Chennai Silks", area: "Multiple branches", district: "Coimbatore" },
  { category: "silk", name: "Kanchi Kamakshi Silks", area: "Kanchipuram town", district: "Kanchipuram" },
  // Jewellery
  { category: "jewellery", name: "Sree Kumaran Thangamaligai", area: "Multiple branches", district: "Coimbatore" },
  { category: "jewellery", name: "Kirtilals", area: "Multiple branches", district: "Coimbatore" },
  { category: "jewellery", name: "GRT Jewellers", area: "Multiple branches", district: "Tamil Nadu" },
  { category: "jewellery", name: "Lalitha Jewellery", area: "Multiple branches", district: "Tamil Nadu" },
  // Catering
  { category: "catering", name: "Sai Lakshmi Event Management", area: "Coimbatore", district: "Coimbatore", priceInfo: "Pure veg, FSSAI 5-star; from ~₹250/plate" },
  { category: "catering", name: "Sowbagya Catering", area: "Coimbatore", district: "Coimbatore", priceInfo: "Brahmin pure veg" },
  { category: "catering", name: "Sri Vaishnava Catering (SVC)", area: "Coimbatore", district: "Coimbatore", priceInfo: "Iyengar Brahmin veg" },
  { category: "catering", name: "Celebration Catering & Events", area: "Ganapathy", district: "Coimbatore" },
  { category: "catering", name: "SS Catering", area: "Coimbatore", district: "Coimbatore", priceInfo: "Veg & non-veg" },
  { category: "catering", name: "Malamurthy Catering", area: "Coimbatore", district: "Coimbatore", priceInfo: "Authentic veg" },
  { category: "catering", name: "Kandha Foods", area: "Coimbatore", district: "Coimbatore" },
  // Planners
  { category: "planner", name: "Flora Weddings", area: "Coimbatore", district: "Coimbatore", priceInfo: "Eco-friendly weddings" },
  { category: "planner", name: "Utsav's Wedding Planners", area: "Coimbatore", district: "Coimbatore" },
  { category: "planner", name: "Mark 1 Decors", area: "Coimbatore", district: "Coimbatore" },
  { category: "planner", name: "Marriedly Wedding Planners", area: "Coimbatore", district: "Coimbatore" },
  { category: "planner", name: "Sarva Weddings", area: "Coimbatore", district: "Coimbatore" },
  { category: "planner", name: "Nityam Events", area: "Coimbatore", district: "Coimbatore" },
  { category: "planner", name: "The Tamarind Tree", area: "Coimbatore", district: "Coimbatore" },
  // Photography
  { category: "photo", name: "OOAK Photography", area: "Coimbatore", district: "Coimbatore", priceInfo: "Candid from ~₹30,000" },
  { category: "photo", name: "Studio Vaibhava", area: "Coimbatore", district: "Coimbatore", priceInfo: "Candid wedding photography" },
  { category: "photo", name: "Vimal Photography", area: "Coimbatore", district: "Coimbatore" },
  { category: "photo", name: "Zero Gravity Photography", area: "Coimbatore", district: "Coimbatore" },
  { category: "photo", name: "Nakshatra Studioz", area: "Coimbatore", district: "Coimbatore" },
  { category: "photo", name: "Camouflage Clicks", area: "Coimbatore", district: "Coimbatore" },
  { category: "photo", name: "Picturesque Studio", area: "Coimbatore", district: "Coimbatore" },
  { category: "photo", name: "Target Big Photography", area: "Coimbatore", district: "Coimbatore" },
  { category: "photo", name: "Twin Hearts Studio", area: "Coimbatore", district: "Coimbatore" },
  // Decoration
  { category: "decor", name: "Vinayaka Decorators", area: "Coimbatore", district: "Coimbatore" },
  { category: "decor", name: "Vasavi Decoration", area: "Coimbatore", district: "Coimbatore" },
  { category: "decor", name: "Surprise Machi", area: "Coimbatore", district: "Coimbatore" },
  { category: "decor", name: "Alayam Decorators", area: "Ganapathy", district: "Coimbatore" },
  { category: "decor", name: "PartyOne", area: "Coimbatore", district: "Coimbatore" },
  // Makeup
  { category: "makeup", name: "SAY Bridal Studio", area: "Coimbatore", district: "Coimbatore", priceInfo: "HD / airbrush bridal makeup" },
  { category: "makeup", name: "Steff Hair & Makeup", area: "Coimbatore", district: "Coimbatore" },
  { category: "makeup", name: "Bloom Bridal Studio", area: "Coimbatore", district: "Coimbatore" },
  { category: "makeup", name: "Makeup by Radha Nandaki", area: "Kavundampalayam", district: "Coimbatore" },
  { category: "makeup", name: "Sky Makeover Studio", area: "Coimbatore", district: "Coimbatore" },
  { category: "makeup", name: "Pradha Bridal Makeup Studio", area: "Coimbatore", district: "Coimbatore" },
  { category: "makeup", name: "Vaishuz Makeover", area: "Coimbatore", district: "Coimbatore" },
  { category: "makeup", name: "Pro Makeup Studio", area: "Coimbatore", district: "Coimbatore" },
  // Purohit
  { category: "purohit", name: "Kongu Vadhyar Service", area: "RS Puram", district: "Coimbatore" },
  // Music
  { category: "music", name: "Melam Events (Nadaswaram troupe)", area: "Coimbatore", district: "Coimbatore" },
  // Invitations
  { category: "invites", name: "Sri Karthik Cards", area: "Town Hall", district: "Coimbatore" },
  // Return gift shops
  { category: "returngifts", name: "Pongal Gift Centre (silver & brass)", area: "Town Hall", district: "Coimbatore" },
  { category: "returngifts", name: "Poompuhar Handicrafts (TN govt)", area: "Multiple branches", district: "Tamil Nadu" },
  { category: "returngifts", name: "Giri Trading (pooja items)", area: "Multiple branches", district: "Tamil Nadu" },
];

// Return-gift ideas (what to give), with rough budgets.
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
