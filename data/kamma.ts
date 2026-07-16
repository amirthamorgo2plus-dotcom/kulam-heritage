// SAMPLE / ILLUSTRATIVE CONTENT — replace with community-vetted material.
// Scope: Tamil Nadu KAMMAVAR NAIDU (Kamma Naidu) community.
// Data is keyed by `kulamId` so other communities can be added later without
// changing the app structure.

export interface KulamSection {
  heading: string;
  body: string[];
}

export interface Kulam {
  id: string;
  name: string;
  aka: string[];
  region: string[];
  summary: string;
  sections: KulamSection[];
  // In the Tamil Nadu Kammavar tradition, families organise by "kulam" /
  // house-names (each with its own kula deivam) rather than Sanskrit gotras.
  kulamsLabel: string;
  kulams: string[];
}

export const kammas: Kulam = {
  id: "kammavar-naidu",
  name: "Kammavar Naidu",
  aka: ["Kamma Naidu", "Naidu"],
  region: [
    "Coimbatore",
    "Erode",
    "Salem",
    "Dharmapuri",
    "Chennai",
    "Madurai",
    "Theni",
    "Tirunelveli",
    "Thoothukudi",
  ],
  summary:
    "The Kammavar Naidus are a Telugu-origin community settled across Tamil Nadu, who migrated south several centuries ago and became prominent in agriculture, trade and public life — especially in the Kongu (Coimbatore–Erode–Salem) belt and the southern districts.",
  sections: [
    {
      heading: "How we got our name — Kammavar (கம்மவார்)",
      body: [
        "Community tradition traces the name to Sage Kamadhika (காமாதிகா முனிவர்), who worshipped the kammal (கம்மல் — the earring) of Mahalakshmi with great devotion. From that kammal were born kshatriya kings marked by truth, dharma and unwavering justice — and those who descended from it came to be called Kammavar (கம்மவார்).",
        "As kshatriyas, the community later fell under the wrath of Parasurama, who had vowed to destroy twenty-one generations of the royal line that killed his father, Jamadagni. It was Parasurama's own mother, Renuka Devi (ரேணுகா தேவி), who shielded the Kamma kulam from him.",
        "To keep them safe, she had them set aside the sacred thread (poonool), the crown and their royal office, tie the urumaal (உருமால்) on their heads, and take up the plough. From that day the Kamma kulam made agriculture their primary livelihood — and by her grace the kulam flourished. This is why Renuka Devi is revered as the community's protector and kula deivam to this day.",
      ],
    },
    {
      heading: "Migration & origins",
      body: [
        "Community tradition holds that the Kammavar Naidus migrated from the Andhra (Kammanadu) region to Tamil Nadu, with significant movement during the Vijayanagara period.",
        "Many served as warriors and administrators under the Nayak chieftains, which is why the community came to carry the title 'Naidu'.",
        "(Illustrative summary — historical accounts vary; confirm with scholarly and community sources.)",
      ],
    },
    {
      heading: "Where the community settled",
      body: [
        "West / Kongu zone: Coimbatore, Erode, Salem and Dharmapuri — historically agriculturists.",
        "South zone: Madurai, Theni, Tirunelveli and Thoothukudi.",
        "Large urban presence in Chennai and a growing global diaspora.",
      ],
    },
    {
      heading: "Culture & livelihood",
      body: [
        "Renowned as progressive farmers — Kammavar cultivators of the Coimbatore region were among the first in Tamil Nadu to adopt diesel and electric pump-set irrigation.",
        "The community is also well established in textiles, trade and the professions.",
        "Sri Renuka Devi is widely revered as the principal kula deivam (family deity), alongside house-specific shrines.",
      ],
    },
  ],
  kulamsLabel: "Kulam / inti-peru (house names)",
  // Sample of documented Kammavar kulams (each with its own kula deivam). The
  // full published list runs to 100+ inti-perus.
  kulams: [
    "Kaangallar",
    "Neerkondaar",
    "Namboorar",
    "Aavula Maarthar",
    "Mallinnar",
    "Aarikatlaar",
    "Aarer",
    "Raavar",
  ],
};
