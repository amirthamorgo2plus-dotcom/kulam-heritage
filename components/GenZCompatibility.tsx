"use client";

import { useMemo, useState } from "react";
import { genzDims } from "@/data/genz";

type Pair = { a: number; b: number };

function vibe(pct: number) {
  if (pct >= 80) return { line: "You two are so in sync ✨", sub: "low-key soulmates" };
  if (pct >= 60) return { line: "Strong vibes 💫", sub: "a few things to chat about" };
  if (pct >= 40) return { line: "Some real talks needed 👀", sub: "communication is key" };
  return { line: "Lots to align on 🗣️", sub: "go slow and talk it through" };
}

export default function GenZCompatibility() {
  const [ans, setAns] = useState<Pair[]>(genzDims.map(() => ({ a: 1, b: 1 })));

  const scored = useMemo(
    () =>
      genzDims.map((d, i) => {
        const dist = Math.abs(ans[i].a - ans[i].b); // 0,1,2
        const pct = dist === 0 ? 100 : dist === 1 ? 50 : 0;
        return { d, pct };
      }),
    [ans]
  );

  const overall = Math.round(scored.reduce((s, x) => s + x.pct, 0) / scored.length);
  const v = vibe(overall);

  const set = (i: number, who: "a" | "b", val: number) =>
    setAns((prev) => prev.map((p, idx) => (idx === i ? { ...p, [who]: val } : p)));

  const barColor = (pct: number) =>
    pct === 100 ? "bg-kulam-emerald" : pct === 50 ? "bg-kulam-gold" : "bg-rose-400";

  return (
    <div className="space-y-5">
      {/* Overall */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-kulam-emerald/50 bg-kulam-emerald/10 p-4">
        <div>
          <div className="text-3xl font-bold text-kulam-dark">{overall}%</div>
          <div className="text-sm">
            <span className="font-bold text-kulam">{v.line}</span>{" "}
            <span className="text-stone-500">{v.sub}</span>
          </div>
        </div>
        <div className="text-xs text-stone-500">
          Set each partner&apos;s answer — the chart updates live.
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-3">
        {scored.map(({ d, pct }, i) => (
          <div key={d.porutham} className="rounded-lg border border-stone-200 bg-white p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <h4 className="font-bold text-kulam-dark">{d.modern}</h4>
              <span className="text-[11px] text-stone-400">
                Porutham: {d.porutham} · {d.traditional}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-stone-500">{d.question}</p>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(["a", "b"] as const).map((who) => (
                <label key={who} className="text-xs">
                  <span className="text-stone-500">{who === "a" ? "Bride" : "Groom"}</span>
                  <select
                    value={ans[i][who]}
                    onChange={(e) => set(i, who, Number(e.target.value))}
                    className="mt-0.5 w-full rounded border border-stone-300 px-2 py-1.5 text-sm"
                  >
                    {d.options.map((o, oi) => (
                      <option key={oi} value={oi}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-stone-100">
                <div className={`h-full ${barColor(pct)} transition-all`} style={{ width: `${Math.max(pct, 8)}%` }} />
              </div>
              <span className="w-20 flex-none text-right text-[11px] font-semibold text-stone-500">
                {pct === 100 ? "aligned" : pct === 50 ? "close-ish" : "needs a chat"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs italic text-stone-400">
        A modern, just-for-fun compatibility check — pairs beautifully with the
        traditional porutham, but real conversations matter most. 💛
      </p>
    </div>
  );
}
