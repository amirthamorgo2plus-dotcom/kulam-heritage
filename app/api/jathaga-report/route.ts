import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // vision over 2 images can take a while

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

// Pull mime + base64 out of a data URL.
function parseDataUrl(dataUrl: string): { mime: string; data: string } | null {
  const m = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!m) return null;
  return { mime: m[1], data: m[2] };
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      { configured: false, error: "AI is not configured yet — add a Gemini API key." },
      { status: 200 }
    );
  }

  let body: { groom?: string; bride?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const groom = body.groom ? parseDataUrl(body.groom) : null;
  const bride = body.bride ? parseDataUrl(body.bride) : null;
  if (!groom || !bride) {
    return NextResponse.json(
      { error: "Please upload both the groom's and bride's horoscope." },
      { status: 400 }
    );
  }

  const prompt = `You are an experienced Vedic astrologer helping a Tamil Nadu Kammavar Naidu family. Two horoscope (jathagam) documents are attached: IMAGE 1 is the GROOM's, IMAGE 2 is the BRIDE's. They may be in Tamil and contain birth details and a rasi/navamsa chart.

Produce a clear, structured report with these sections:

1. EXTRACTED DETAILS (for each, Groom then Bride): name (if shown), date/time/place of birth, Lagna (ascendant), Rasi (moon sign), Nakshatra (birth star) and pada, and Gothram if shown. If a value is not legible, write "not clear" — do NOT guess.

2. PORUTHAM / GUNA ANALYSIS: assess the key matches used in Tamil tradition — Dina, Gana, Mahendra, Stree Deergha, Yoni, Rasi, Rasi Athipathi, Vasya, Rajju and Vedha porutham. For each, say whether it matches and a one-line reason.

3. DOSHAM CHECK: note any Rajju dosha, Nadi dosha, Bhakoot, or Sevvai/Mangal dosha you can infer, and how serious it is.

4. OVERALL VERDICT: a short paragraph — overall compatibility (e.g. good / acceptable / needs caution) and the main strengths and concerns.

Be balanced and non-deterministic; do not promise outcomes. End with: "Please confirm this reading with your family astrologer before deciding." Use plain text with clear section labels (no markdown symbols like # or *).`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: groom.mime, data: groom.data } },
                { inline_data: { mime_type: bride.mime, data: bride.data } },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 2600,
            // Disable thinking so the full report fits in the token budget.
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
    const report = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    if (!report) {
      return NextResponse.json(
        { error: "The AI couldn't read the charts. Try clearer photos." },
        { status: 502 }
      );
    }
    return NextResponse.json({ configured: true, report });
  } catch {
    return NextResponse.json({ error: "Could not reach the AI service." }, { status: 502 });
  }
}
