"use client";

import { useState } from "react";
import {
  nakshatras,
  rasis,
  matchHoroscopes,
  tenPoruthams,
  type MatchResult,
  type Porutham,
} from "@/data/astro";

// Gen-Z vibe verdict from the guna total.
function genZVibe(total: number): { line: string; sub: string } {
  if (total >= 32) return { line: "Written in the stars ✨", sub: "major green flags fr" };
  if (total >= 26) return { line: "Strong cosmic vibes 💫", sub: "this one's giving promise" };
  if (total >= 18) return { line: "Solid potential 🌙", sub: "worth exploring with intention" };
  return { line: "Stars say slow down 🤔", sub: "a lot to think about, no rush" };
}

function PersonInputs({
  label,
  nak,
  setNak,
  rasi,
  setRasi,
}: {
  label: string;
  nak: number;
  setNak: (n: number) => void;
  rasi: number;
  setRasi: (n: number) => void;
}) {
  return (
    <div className="rounded-lg border border-kulam/30 bg-white p-4">
      <h3 className="mb-3 font-bold text-kulam-dark">{label}</h3>
      <label className="mb-1 block text-sm font-semibold">Nakshatra (birth star)</label>
      <select
        value={nak}
        onChange={(e) => setNak(Number(e.target.value))}
        className="mb-3 w-full rounded border border-stone-300 px-2 py-1.5 text-sm"
      >
        {nakshatras.map((n) => (
          <option key={n.id} value={n.id}>
            {n.name}
          </option>
        ))}
      </select>
      <label className="mb-1 block text-sm font-semibold">Rasi (moon sign)</label>
      <select
        value={rasi}
        onChange={(e) => setRasi(Number(e.target.value))}
        className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm"
      >
        {rasis.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function HoroscopeCalculator() {
  const [boyNak, setBoyNak] = useState(1);
  const [boyRasi, setBoyRasi] = useState(1);
  const [girlNak, setGirlNak] = useState(4);
  const [girlRasi, setGirlRasi] = useState(2);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [poruthams, setPoruthams] = useState<Porutham[] | null>(null);
  const [ai, setAi] = useState<{ loading: boolean; text: string | null; error: string | null }>({
    loading: false,
    text: null,
    error: null,
  });

  const pct = result ? Math.round((result.total / result.max) * 100) : 0;
  const good = result ? result.total >= 18 : false;

  const runMatch = () => {
    setResult(matchHoroscopes(boyNak, boyRasi, girlNak, girlRasi));
    setPoruthams(tenPoruthams(boyNak, boyRasi, girlNak, girlRasi));
    setAi({ loading: false, text: null, error: null });
  };

  const getInsight = async () => {
    if (!result) return;
    setAi({ loading: true, text: null, error: null });
    try {
      const payload = {
        boy: {
          nakshatra: nakshatras.find((n) => n.id === boyNak)?.name,
          rasi: rasis.find((r) => r.id === boyRasi)?.name,
        },
        girl: {
          nakshatra: nakshatras.find((n) => n.id === girlNak)?.name,
          rasi: rasis.find((r) => r.id === girlRasi)?.name,
        },
        total: result.total,
        max: result.max,
        verdict: result.verdict,
        sameNadi: result.sameNadi,
        sameGana: result.sameGana,
        kootas: result.kootas.map((k) => ({ name: k.name, score: k.score, max: k.max })),
      };
      const res = await fetch("/api/jathaga-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.insight) setAi({ loading: false, text: data.insight, error: null });
      else
        setAi({
          loading: false,
          text: null,
          error:
            data.configured === false
              ? "AI insights aren't set up yet — add a free Gemini API key."
              : data.error || "Could not get an insight.",
        });
    } catch {
      setAi({ loading: false, text: null, error: "Could not reach the AI service." });
    }
  };

  const shareCard = async () => {
    if (!result) return;
    const vibe = genZVibe(result.total);
    const matches = poruthams ? poruthams.filter((p) => p.ok).length : 0;
    const boyName = nakshatras.find((n) => n.id === boyNak)?.name;
    const girlName = nakshatras.find((n) => n.id === girlNak)?.name;

    const c = document.createElement("canvas");
    c.width = 1080;
    c.height = 1350;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const g = ctx.createLinearGradient(0, 0, 1080, 1350);
    g.addColorStop(0, "#7C5CBF");
    g.addColorStop(1, "#4C3A77");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1080, 1350);
    ctx.textAlign = "center";

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "600 46px Georgia";
    ctx.fillText("✨ Cosmic Compatibility ✨", 540, 180);

    ctx.fillStyle = "#fff";
    ctx.font = "900 320px Georgia";
    ctx.fillText(`${pct}%`, 540, 560);

    ctx.fillStyle = "#EC8B73";
    ctx.font = "bold 60px Georgia";
    ctx.fillText(vibe.line, 540, 700);

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "italic 40px Georgia";
    ctx.fillText(vibe.sub, 540, 770);

    ctx.fillStyle = "#fff";
    ctx.font = "44px Georgia";
    ctx.fillText(`${boyName}  ✦  ${girlName}`, 540, 920);

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "40px Georgia";
    ctx.fillText(`${result.total}/36 guna  ·  ${matches}/10 porutham`, 540, 1010);

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "34px Georgia";
    ctx.fillText("Kamma Nest", 540, 1270);

    await new Promise<void>((resolve) =>
      c.toBlob(async (blob) => {
        if (!blob) return resolve();
        const file = new File([blob], "cosmic-compatibility.png", { type: "image/png" });
        const navAny = navigator as Navigator & {
          canShare?: (d: { files: File[] }) => boolean;
          share?: (d: { files?: File[]; title?: string; text?: string }) => Promise<void>;
        };
        try {
          if (navAny.canShare?.({ files: [file] }) && navAny.share) {
            await navAny.share({ files: [file], title: "Our Cosmic Compatibility ✨" });
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cosmic-compatibility.png";
            a.click();
            URL.revokeObjectURL(url);
          }
        } catch {
          /* user cancelled share */
        }
        resolve();
      }, "image/png")
    );
  };

  const vibe = result ? genZVibe(result.total) : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <PersonInputs label="Groom (Boy)" nak={boyNak} setNak={setBoyNak} rasi={boyRasi} setRasi={setBoyRasi} />
        <PersonInputs label="Bride (Girl)" nak={girlNak} setNak={setGirlNak} rasi={girlRasi} setRasi={setGirlRasi} />
      </div>

      <button
        onClick={runMatch}
        className="rounded-lg bg-kulam px-6 py-2.5 font-semibold text-white shadow transition hover:bg-kulam-dark"
      >
        Match Horoscopes
      </button>

      {result && (
        <div className="rounded-lg border border-kulam-gold/40 bg-white p-5 shadow">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="text-3xl font-bold text-kulam-dark">
              {result.total} / {result.max}
            </div>
            <div className={`text-lg font-semibold ${good ? "text-green-700" : "text-red-700"}`}>
              {result.verdict}
            </div>
          </div>

          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className={`h-full ${good ? "bg-kulam-emerald" : "bg-rose-400"}`}
              style={{ width: `${pct}%` }}
            />
          </div>

          {vibe && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-kulam/5 px-3 py-2">
              <div>
                <span className="text-base font-bold text-kulam">{vibe.line}</span>
                <span className="ml-2 text-sm text-stone-500">{vibe.sub}</span>
              </div>
              <button
                onClick={shareCard}
                className="rounded-lg bg-kulam-gold px-3 py-1.5 text-sm font-semibold text-white shadow transition hover:brightness-95"
              >
                📤 Share card
              </button>
            </div>
          )}

          {(result.sameNadi || result.sameGana) && (
            <ul className="mt-3 space-y-1 text-sm">
              {result.sameNadi && (
                <li className="text-red-700">
                  ⚠ Nadi dosha: both share the same Nadi (a significant traditional concern).
                </li>
              )}
              {result.sameGana && (
                <li className="text-amber-700">
                  ⓘ Both share the same Gana.
                </li>
              )}
            </ul>
          )}

          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b text-left text-stone-500">
                <th className="py-1">Koota</th>
                <th className="py-1">Score</th>
                <th className="py-1">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {result.kootas.map((k) => (
                <tr key={k.name} className="border-b border-stone-100">
                  <td className="py-1.5 font-semibold">{k.name}</td>
                  <td className="py-1.5">
                    {k.score} / {k.max}
                  </td>
                  <td className="py-1.5 text-stone-600">{k.note}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 10 Porutham (Tamil) */}
          {poruthams && (
            <div className="mt-6">
              <div className="mb-2 flex items-baseline justify-between">
                <h3 className="font-bold text-kulam-dark">10 Porutham (Tamil)</h3>
                <span className="text-sm font-semibold text-kulam">
                  {poruthams.filter((p) => p.ok).length} / 10 match
                </span>
              </div>
              <div className="space-y-1.5">
                {poruthams.map((p) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <span className="w-28 flex-none text-sm font-semibold">{p.name}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded-full bg-stone-100">
                      <div
                        className={`flex h-full items-center rounded-full px-2 text-[11px] font-semibold text-white ${
                          p.ok ? "bg-kulam-emerald" : "bg-rose-400"
                        }`}
                        style={{ width: p.ok ? "100%" : "38%" }}
                      >
                        {p.ok ? "✓ match" : "✗"}
                      </div>
                    </div>
                    <span className="hidden w-44 flex-none text-xs text-stone-500 sm:block">
                      {p.note}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs italic text-stone-400">
                Tamil Dasa Porutham — Rajju and Vedha are the most important. Indicative only.
              </p>
            </div>
          )}

          {/* AI insight */}
          <div className="mt-4 rounded-lg border border-kulam-emerald/50 bg-kulam-emerald/10 p-3">
            {!ai.text && !ai.loading && (
              <button
                onClick={getInsight}
                className="rounded-lg bg-kulam-emerald px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
              >
                ✨ Get AI insight
              </button>
            )}
            {ai.loading && (
              <p className="text-sm text-stone-500">✨ Generating insight…</p>
            )}
            {ai.text && (
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-kulam-emerald">
                  ✨ AI insight
                </div>
                <p className="whitespace-pre-line text-sm text-stone-700">{ai.text}</p>
                <p className="mt-1 text-[11px] italic text-stone-400">
                  AI-generated guidance — not a substitute for a qualified astrologer.
                </p>
              </div>
            )}
            {ai.error && <p className="text-sm text-red-600">{ai.error}</p>}
          </div>

          <p className="mt-4 text-xs italic text-stone-500">
            Indicative result only. The minimum recommended score is 18/36. Always
            confirm with a qualified astrologer, who also checks dosha, dasha and
            chart placement beyond guna matching.
          </p>
        </div>
      )}
    </div>
  );
}
