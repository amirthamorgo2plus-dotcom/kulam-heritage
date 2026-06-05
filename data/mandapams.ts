// REAL kalyana mandapam / marriage hall data for Coimbatore, sourced from
// weddingz.in listings. Pricing is PER PLATE (catering), as commonly quoted in
// Tamil Nadu, with seating-capacity ranges.
//
// NOTE ON COORDINATES: lat/lng are approximate, geocoded to the venue's
// LOCALITY, not surveyed GPS. Confirm price, capacity and availability with
// the venue before booking.

export interface Mandapam {
  id: string;
  name: string;
  area: string;
  district: string;
  lat: number;
  lng: number;
  capacityMin: number;
  capacityMax: number;
  plateVeg?: number; // ₹ per plate (veg); omitted = price on request
  plateNonVeg?: number; // ₹ per plate (non-veg), if offered
}

export const mandapams: Mandapam[] = [
  {
    id: "cbe-jenneys",
    name: "Jenneys Residency",
    area: "Peelamedu",
    district: "Coimbatore",
    lat: 11.0259,
    lng: 77.001,
    capacityMin: 10,
    capacityMax: 2250,
    plateVeg: 625,
    plateNonVeg: 820,
  },
  {
    id: "cbe-hemambigai",
    name: "Hemambigai Marriage Hall",
    area: "Eachanari",
    district: "Coimbatore",
    lat: 10.9333,
    lng: 76.9667,
    capacityMin: 500,
    capacityMax: 750,
    plateVeg: 300,
    plateNonVeg: 400,
  },
  {
    id: "cbe-ayyapan",
    name: "Sri Ayyapan Pooja Sangam",
    area: "Ram Nagar",
    district: "Coimbatore",
    lat: 11.0027,
    lng: 76.9706,
    capacityMin: 350,
    capacityMax: 600,
    plateVeg: 300,
  },
  {
    id: "cbe-lemeridien",
    name: "Le Meridien",
    area: "Neelambur",
    district: "Coimbatore",
    lat: 11.075,
    lng: 77.13,
    capacityMin: 14,
    capacityMax: 2700,
    plateVeg: 1200,
    plateNonVeg: 1400,
  },
  {
    id: "cbe-anandhaas",
    name: "Shree Anandhaas",
    area: "Vadavalli",
    district: "Coimbatore",
    lat: 11.026,
    lng: 76.887,
    capacityMin: 100,
    capacityMax: 400,
    plateVeg: 400,
  },
  {
    id: "cbe-aksshayam",
    name: "Shree Aksshayam",
    area: "Avarampalayam",
    district: "Coimbatore",
    lat: 11.029,
    lng: 76.987,
    capacityMin: 200,
    capacityMax: 300,
    plateVeg: 350,
  },
  {
    id: "cbe-suguna",
    name: "Suguna Kalyana Mandapam",
    area: "Peelamedu",
    district: "Coimbatore",
    lat: 11.0265,
    lng: 77.0025,
    capacityMin: 800,
    capacityMax: 1200,
    plateVeg: 400,
  },
  {
    id: "cbe-selvam",
    name: "Selvam Mahaal",
    area: "Eachanari",
    district: "Coimbatore",
    lat: 10.934,
    lng: 76.968,
    capacityMin: 400,
    capacityMax: 1800,
    plateVeg: 350,
    plateNonVeg: 450,
  },
  {
    id: "cbe-vijaypark",
    name: "Vijay Park Inn",
    area: "Ram Nagar",
    district: "Coimbatore",
    lat: 11.0035,
    lng: 76.9712,
    capacityMin: 30,
    capacityMax: 550,
    plateVeg: 300,
    plateNonVeg: 400,
  },
  {
    id: "cbe-annapoorna",
    name: "Sree Annapoorna",
    area: "Saibaba Colony",
    district: "Coimbatore",
    lat: 11.023,
    lng: 76.945,
    capacityMin: 120,
    capacityMax: 200,
    plateVeg: 245,
  },
  {
    id: "cbe-manimahal",
    name: "Mani Mahal",
    area: "Peelamedu (Kamarajar Road)",
    district: "Coimbatore",
    lat: 11.0262,
    lng: 77.005,
    capacityMin: 300,
    capacityMax: 1200,
    // Pure-veg, fully AC pillarless hall; plate price on request.
  },
  {
    id: "cbe-krishnagounder",
    name: "Sri Krishna Gounder Kalyana Mandapam",
    area: "Ganapathy",
    district: "Coimbatore",
    lat: 11.038,
    lng: 76.97,
    capacityMin: 1000,
    capacityMax: 1500,
    // AC hall, large parking; plate price on request.
  },
];

// Bounds for the per-plate budget filter UI.
export const PLATE_FLOOR = 200;
export const PLATE_CEIL = 1400;
