// Two SAMPLE jathagams (illustrative) to demonstrate the charts & matching.
// Planet -> rasi id (1=Mesha … 12=Meena). Includes "Lagna" (ascendant).

export interface SampleChart {
  name: string;
  gender: "Groom" | "Bride";
  lagnaRasi: number;
  moonRasi: number; // rasi used for matching
  nakshatraId: number; // birth star (1..27)
  nakshatra: string;
  rasiName: string;
  dob: string;
  planets: Record<string, number>;
}

export const groomSample: SampleChart = {
  name: "Arjun (sample)",
  gender: "Groom",
  lagnaRasi: 1,
  moonRasi: 1,
  nakshatraId: 1,
  nakshatra: "Ashwini",
  rasiName: "Mesha",
  dob: "12 Mar 1996, 06:20, Coimbatore",
  planets: {
    Lagna: 1,
    Sun: 5,
    Moon: 1,
    Mars: 8,
    Mercury: 4,
    Jupiter: 9,
    Venus: 2,
    Saturn: 11,
    Rahu: 3,
    Ketu: 9,
  },
};

export const brideSample: SampleChart = {
  name: "Priya (sample)",
  gender: "Bride",
  lagnaRasi: 4,
  moonRasi: 2,
  nakshatraId: 4,
  nakshatra: "Rohini",
  rasiName: "Rishabam",
  dob: "28 Jul 1998, 14:05, Madurai",
  planets: {
    Lagna: 4,
    Sun: 6,
    Moon: 2,
    Mars: 1,
    Mercury: 5,
    Jupiter: 12,
    Venus: 4,
    Saturn: 7,
    Rahu: 11,
    Ketu: 5,
  },
};
