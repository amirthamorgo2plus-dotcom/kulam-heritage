import { NextResponse } from "next/server";

// Server-side only — GEMINI_API_KEY is never exposed to the browser.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

interface Koota {
  name: string;
  score: number;
  max: number;
}
interface Body {
  boy?: { nakshatra: string; rasi: string };
  girl?: { nakshatra: string; rasi: string };
  total?: number;
  max?: number;
  verdict?: string;
  sameNadi?: boolean;
  sameGana?: boolean;
  kootas?: Koota[];
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { configured: false, error: "AI insights are not configured yet." },
      { status: 200 }
    );
  }

  let b: Body;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const kootaLines = (b.kootas || [])
    .map((k) => `- ${k.name}: ${k.score}/${k.max}`)
    .join("\n");

  const prompt = `You are a warm, respectful Vedic astrology assistant helping a Tamil Nadu Kammavar Naidu family understand a horoscope (jathaga porutham) match.

Match details (Ashtakoota / guna milan):
- Groom: nakshatra ${b.boy?.nakshatra}, rasi ${b.boy?.rasi}
- Bride: nakshatra ${b.girl?.nakshatra}, rasi ${b.girl?.rasi}
- Total score: ${b.total}/${b.max ?? 36} (${b.verdict})
- Nadi dosha present: ${b.sameNadi ? "yes" : "no"}
- Same gana: ${b.sameGana ? "yes" : "no"}
Koota breakdown:
${kootaLines}

Write a balanced, encouraging insight in 3–4 short sentences (about 70–110 words). Mention 1–2 strengths and, if any, 1 area to be mindful of (e.g. Nadi or Bhakoot if low). Be gentle and non-deterministic — do not predict the future or give guarantees. End with one short line reminding them to confirm with a qualified astrologer. Plain text, no markdown headings.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            // gemini-2.5-flash is a thinking model; disable thinking so the
            // token budget goes to the actual answer (avoids truncation).
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: `Gemini error (${res.status}).`, detail: detail.slice(0, 300) },
        { status: 502 }
      );
    }

    const data = await res.json();
    const insight =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    if (!insight) {
      return NextResponse.json({ error: "No insight returned." }, { status: 502 });
    }
    return NextResponse.json({ configured: true, insight });
  } catch {
    return NextResponse.json({ error: "Could not reach the AI service." }, { status: 502 });
  }
}
