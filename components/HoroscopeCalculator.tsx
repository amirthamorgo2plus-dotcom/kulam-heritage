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

  const pct = result ? Math.round((result.total / result.max) * 100) : 0;
  const good = result ? result.total >= 18 : false;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <PersonInputs label="Groom (Boy)" nak={boyNak} setNak={setBoyNak} rasi={boyRasi} setRasi={setBoyRasi} />
        <PersonInputs label="Bride (Girl)" nak={girlNak} setNak={setGirlNak} rasi={girlRasi} setRasi={setGirlRasi} />
      </div>

      <button
        onClick={() => setResult(matchHoroscopes(boyNak, boyRasi, girlNak, girlRasi))}
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
