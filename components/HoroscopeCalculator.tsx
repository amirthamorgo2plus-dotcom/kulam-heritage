"use client";

import { useState } from "react";
import { nakshatras, rasis, matchHoroscopes, type MatchResult } from "@/data/astro";

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
  const [ai, setAi] = useState<{ loading: boolean; text: string | null; error: string | null }>({
    loading: false,
    text: null,
    error: null,
  });

  const pct = result ? Math.round((result.total / result.max) * 100) : 0;
  const good = result ? result.total >= 18 : false;

  const runMatch = () => {
    setResult(matchHoroscopes(boyNak, boyRasi, girlNak, girlRasi));
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
              className={`h-full ${good ? "bg-green-600" : "bg-red-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>

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
