// Tamil kinship dictionary — so photo tags can show the relationship in our own
// words (Tamil script + a plain-English gloss). Used by the /family-photo tagger.

export interface KinshipTerm {
  term: string; // romanised
  tamil: string; // Tamil script
  english: string; // short English meaning
}

export const kinshipTerms: KinshipTerm[] = [
  { term: "Thatha", tamil: "தாத்தா", english: "grandfather" },
  { term: "Paati", tamil: "பாட்டி", english: "grandmother" },
  { term: "Appa", tamil: "அப்பா", english: "father" },
  { term: "Amma", tamil: "அம்மா", english: "mother" },
  { term: "Periyappa", tamil: "பெரியப்பா", english: "father's elder brother" },
  { term: "Chithappa", tamil: "சித்தப்பா", english: "father's younger brother" },
  { term: "Periyamma", tamil: "பெரியம்மா", english: "mother's elder sister" },
  { term: "Chithi", tamil: "சித்தி", english: "mother's younger sister" },
  { term: "Mama", tamil: "மாமா", english: "mother's brother / father-in-law" },
  { term: "Maami", tamil: "மாமி", english: "mama's wife / mother-in-law" },
  { term: "Atthai", tamil: "அத்தை", english: "father's sister" },
  { term: "Anna", tamil: "அண்ணா", english: "elder brother" },
  { term: "Akka", tamil: "அக்கா", english: "elder sister" },
  { term: "Thambi", tamil: "தம்பி", english: "younger brother" },
  { term: "Thangai", tamil: "தங்கை", english: "younger sister" },
  { term: "Machan", tamil: "மச்சான்", english: "brother-in-law / male cousin" },
  { term: "Naathanaar", tamil: "நாத்தனார்", english: "husband's sister" },
  { term: "Mapillai", tamil: "மாப்பிள்ளை", english: "son-in-law / groom" },
  { term: "Marumagal", tamil: "மருமகள்", english: "daughter-in-law" },
  { term: "Marumagan", tamil: "மருமகன்", english: "son-in-law / nephew" },
  { term: "Peran", tamil: "பேரன்", english: "grandson" },
  { term: "Pethi", tamil: "பேத்தி", english: "granddaughter" },
];

// Builds the label stored on a tag, e.g. "Mama (மாமா) · mother's brother".
export function kinshipLabel(t: KinshipTerm): string {
  return `${t.term} (${t.tamil}) · ${t.english}`;
}
