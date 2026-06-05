// REAL kula deivam (family deity) temple data for the Tamil Nadu Kammavar
// Naidu community, sourced from the published Kammavar kulam / inti-peru /
// kuladeivam list (kammavarkalyanamalai.com). This is a SAMPLE of ~8 of the
// 100+ documented entries — the full list (e.g. the "Kammavar Kulam & Gothram"
// Scribd document) can be ingested later.
//
// NOTE ON COORDINATES: lat/lng are approximate, geocoded to the temple's
// LOCALITY (e.g. Peelamedu, Palladam), not surveyed GPS of the shrine itself.
// Confirm the exact temple and your own family's kula deivam with elders.

export interface Temple {
  id: string;
  name: string; // temple / deity kovil
  deity: string;
  village: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  // Kulam groups + inti perus (surnames) that hold this as kula deivam.
  associatedKulams: string[];
  note?: string;
}

export const temples: Temple[] = [
  {
    id: "peelamedu-renukadevi",
    name: "Sri Renukadevi Ellammal Kovil",
    deity: "Goddess Renuka Devi (Ellammal)",
    village: "Peelamedu",
    district: "Coimbatore",
    state: "Tamil Nadu",
    lat: 11.0259,
    lng: 77.001,
    associatedKulams: ["Kaangallar", "Kakarla", "Miledi"],
    note: "Renuka Devi is widely revered as a principal kula deivam of the Kammavar community.",
  },
  {
    id: "peelamedu-endammal",
    name: "Endammal Kovil",
    deity: "Goddess Endammal",
    village: "Peelamedu",
    district: "Coimbatore",
    state: "Tamil Nadu",
    lat: 11.027,
    lng: 77.003,
    associatedKulams: ["Neerkondaar", "Neerukonda", "Pogunulla", "Etipaal"],
  },
  {
    id: "peelamedu-rangammal",
    name: "Rangammal Kovil",
    deity: "Goddess Rangammal",
    village: "Peelamedu",
    district: "Coimbatore",
    state: "Tamil Nadu",
    lat: 11.0248,
    lng: 76.999,
    associatedKulams: ["Namboorar", "Edutla"],
  },
  {
    id: "palladam-angaala",
    name: "Angaala Parameshwari Kovil",
    deity: "Goddess Angaala Parameshwari",
    village: "Palladam",
    district: "Tirupur",
    state: "Tamil Nadu",
    lat: 10.9926,
    lng: 77.2866,
    associatedKulams: ["Aavula Maarthar", "Avula", "Ponnuri", "Pogunulla"],
  },
  {
    id: "kallapalayam-lingammal",
    name: "Lingammal Kovil",
    deity: "Goddess Lingammal",
    village: "Kallapalayam",
    district: "Coimbatore",
    state: "Tamil Nadu",
    lat: 11.02,
    lng: 77.12,
    associatedKulams: ["Mallinnar", "Mallina", "Adhukoori"],
  },
  {
    id: "chinnametupalayam-devara",
    name: "Devara Kovil",
    deity: "Family deity (Devara)",
    village: "Chinna Mettupalayam",
    district: "Coimbatore",
    state: "Tamil Nadu",
    lat: 11.08,
    lng: 77.08,
    associatedKulams: ["Aarikatlaar", "Palulla", "Cherukunulla", "Selukoori"],
  },
  {
    id: "erichinapati-devara",
    name: "Devara Kovil",
    deity: "Family deity (Devara)",
    village: "Erichinapati (Pallapati)",
    district: "Tirupur",
    state: "Tamil Nadu",
    lat: 10.95,
    lng: 77.2,
    associatedKulams: ["Aarer", "Yenulla", "Yelpunulla"],
  },
  {
    id: "kundadam-errammal",
    name: "Errammal Kovil",
    deity: "Goddess Errammal",
    village: "Devarajapattanam (Kundadam), Dharapuram",
    district: "Tirupur",
    state: "Tamil Nadu",
    lat: 10.74,
    lng: 77.55,
    associatedKulams: ["Raavar", "Ravuri", "Guntur", "Chennamalla", "Pamidipalla"],
  },
];
