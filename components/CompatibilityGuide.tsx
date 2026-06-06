"use client";

import { useMemo, useState } from "react";
import {
  nakshatras,
  rasis,
  rankRasis,
  rankNakshatras,
} from "@/data/astro";

function Bar({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  const color = pct >= 70 ? "bg-kulam-emerald" : pct >= 45 ? "bg-kulam-gold" : "bg-kulam";
  return (
    <div className="h-2 w-24 overflow-hidden rounded-full bg-stone-200">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function CompatibilityGuide() {
  const [rasi, setRasi] = useState(1);
  const [nak, setNak] = useState(1);

  const rasiRanks = useMemo(() => rankRasis(rasi), [rasi]);
  const nakRanks = useMemo(() => rankNakshatras(nak), [nak]);

  return (
    <div className="space-y-10">
      {/* Gothram & Kulam rule */}
      <section className="rounded-xl border border-kulam-emerald/50 bg-kulam-emerald/10 p-5">
        <h2 className="text-xl font-bold text-kulam-dark">Gothram &amp; Kulam Rule</h2>
        <ul className="mt-3 space-y-2 text-sm text-stone-700">
          <li>
            <span className="font-semibold text-kulam">Gothram must be different.</span>{" "}
            Marriage within the <em>same</em> gothram (sagotra) is traditionally not
            allowed — the families are considered to share a common ancestor. So the
            bride&apos;s and groom&apos;s gothrams should not match.
          </li>
          <li>
            <span className="font-semibold text-kulam">Same kulam / kula deivam:</span>{" "}
            customs vary — many families avoid alliances within the same kulam or with
            the same kula deivam, while others allow it as long as the gothram differs.
            Confirm with your elders.
          </li>
          <li className="text-stone-500">
            ✓ Different gothram = acceptable &nbsp;·&nbsp; ✗ Same gothram = avoided
          </li>
        </ul>
      </section>

      {/* Rasi compatibility */}
      <section>
        <h2 className="mb-1 text-xl font-bold text-kulam">Best Rasi (Moon Sign) Matches</h2>
        <p className="mb-3 text-sm text-stone-600">
          Pick a rasi to see which rasis pair best (based on Bhakoot, Graha Maitri,
          Varna &amp; Vashya). Pairs with a Bhakoot concern are flagged.
        </p>
        <select
          value={rasi}
          onChange={(e) => setRasi(Number(e.target.value))}
          className="mb-4 rounded border border-kulam/40 bg-white px-3 py-2 text-sm"
        >
          {rasis.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
        <div className="grid gap-2 sm:grid-cols-2">
          {rasiRanks.map((r, i) => (
            <div
              key={r.rasi.id}
              className={`flex items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 text-sm ${
                i < 4 ? "border-kulam-emerald/50" : "border-stone-200"
              }`}
            >
              <span className="font-semibold text-kulam-dark">{r.rasi.name}</span>
              <div className="flex items-center gap-2">
                {!r.bhakootOk && (
                  <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-700">
                    Bhakoot
                  </span>
                )}
                <Bar score={r.score} max={r.max} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-stone-400">
          Top matches are highlighted in green. Bhakoot = a traditional family-harmony
          concern for that pair.
        </p>
      </section>

      {/* Nakshatra compatibility */}
      <section>
        <h2 className="mb-1 text-xl font-bold text-kulam">Best Nakshatra (Star) Matches</h2>
        <p className="mb-3 text-sm text-stone-600">
          Pick a birth star to see the most compatible stars (based on Tara, Yoni,
          Gana &amp; Nadi). Same-Nadi pairs are flagged as a concern.
        </p>
        <select
          value={nak}
          onChange={(e) => setNak(Number(e.target.value))}
          className="mb-4 rounded border border-kulam/40 bg-white px-3 py-2 text-sm"
        >
          {nakshatras.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name}
            </option>
          ))}
        </select>
        <div className="grid gap-2 sm:grid-cols-2">
          {nakRanks.slice(0, 12).map((n, i) => (
            <div
              key={n.nak.id}
              className={`flex items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 text-sm ${
                i < 4 ? "border-kulam-emerald/50" : "border-stone-200"
              }`}
            >
              <span className="font-semibold text-kulam-dark">{n.nak.name}</span>
              <div className="flex items-center gap-2">
                {n.sameNadi && (
                  <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-700">
                    Nadi
                  </span>
                )}
                <Bar score={n.score} max={n.max} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-stone-400">
          Showing the top 12 matching stars. For a full bride-and-groom check use the
          Horoscope Match calculator.
        </p>
      </section>
    </div>
  );
}
