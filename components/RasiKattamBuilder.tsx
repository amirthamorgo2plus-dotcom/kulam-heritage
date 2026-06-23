"use client";

import { useEffect, useState } from "react";
import { rasis } from "@/data/astro";
import RasiChart from "@/components/RasiChart";

// Planets in the order they're shown. `key` matches RasiChart's ABBR map.
const PLANETS: { key: string; tamil: string; tamilScript: string }[] = [
  { key: "Lagna", tamil: "Lagnam", tamilScript: "லக்னம்" },
  { key: "Sun", tamil: "Suriyan", tamilScript: "சூரியன்" },
  { key: "Moon", tamil: "Chandiran", tamilScript: "சந்திரன்" },
  { key: "Mars", tamil: "Sevvai", tamilScript: "செவ்வாய்" },
  { key: "Mercury", tamil: "Budhan", tamilScript: "புதன்" },
  { key: "Jupiter", tamil: "Guru", tamilScript: "குரு" },
  { key: "Venus", tamil: "Sukran", tamilScript: "சுக்கிரன்" },
  { key: "Saturn", tamil: "Sani", tamilScript: "சனி" },
  { key: "Rahu", tamil: "Ragu", tamilScript: "ராகு" },
  { key: "Ketu", tamil: "Kethu", tamilScript: "கேது" },
];

// Romanised rasi names (for the downloadable canvas, which can't render Tamil).
const RASI_ROMAN: Record<number, string> = {
  1: "Mesham", 2: "Rishabam", 3: "Mithunam", 4: "Kadagam",
  5: "Simmam", 6: "Kanni", 7: "Thulam", 8: "Vrichigam",
  9: "Dhanusu", 10: "Magaram", 11: "Kumbam", 12: "Meenam",
};
const ABBR: Record<string, string> = {
  Lagna: "La", Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};
const POS: Record<number, [number, number]> = {
  12: [0, 0], 1: [0, 1], 2: [0, 2], 3: [0, 3],
  11: [1, 0], 4: [1, 3],
  10: [2, 0], 5: [2, 3],
  9: [3, 0], 8: [3, 1], 7: [3, 2], 6: [3, 3],
};

const KEY = "kammanest_kattam";

type Placement = Record<string, number>;

const DEFAULT: Placement = {
  Lagna: 1, Sun: 1, Moon: 4, Mars: 8, Mercury: 2, Jupiter: 9,
  Venus: 3, Saturn: 11, Rahu: 6, Ketu: 12,
};

export default function RasiKattamBuilder() {
  const [name, setName] = useState("");
  const [place, setPlace] = useState<Placement>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { name?: string; place?: Placement };
        if (saved.place) setPlace({ ...DEFAULT, ...saved.place });
        if (saved.name) setName(saved.name);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify({ name, place }));
  }, [name, place, hydrated]);

  const set = (planet: string, rasi: number) =>
    setPlace((p) => ({ ...p, [planet]: rasi }));

  const reset = () => {
    setPlace(DEFAULT);
    setName("");
  };

  const download = () => {
    const S = 720;
    const c = document.createElement("canvas");
    c.width = S;
    c.height = S + 120;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);

    // header
    ctx.fillStyle = "#134e4a";
    ctx.font = "bold 34px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(name ? `${name} — Rasi Kattam` : "Rasi Kattam", S / 2, 50);

    const top = 80;
    const cell = S / 4;
    const byRasi: Record<number, string[]> = {};
    for (const [planet, rasi] of Object.entries(place)) {
      if (planet === "Lagna") continue;
      (byRasi[rasi] ||= []).push(ABBR[planet]);
    }

    ctx.strokeStyle = "#0f766e";
    ctx.lineWidth = 2;
    for (let r = 1; r <= 12; r++) {
      const [row, col] = POS[r];
      const x = col * cell;
      const y = top + row * cell;
      const isLagna = place.Lagna === r;
      if (isLagna) {
        ctx.fillStyle = "rgba(234,179,8,0.18)";
        ctx.fillRect(x, y, cell, cell);
      }
      ctx.strokeRect(x, y, cell, cell);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "13px Georgia";
      ctx.textAlign = "left";
      ctx.fillText(RASI_ROMAN[r], x + 6, y + 18);
      // planets
      ctx.fillStyle = "#134e4a";
      ctx.font = "bold 19px Georgia";
      const items = [...(isLagna ? ["La"] : []), ...(byRasi[r] || [])];
      items.forEach((p, i) => {
        const px = x + 8 + (i % 3) * 34;
        const py = y + 44 + Math.floor(i / 3) * 26;
        ctx.fillStyle = p === "La" ? "#b8860b" : "#134e4a";
        ctx.fillText(p, px, py);
      });
    }
    // centre
    ctx.fillStyle = "#0f766e";
    ctx.font = "bold 22px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("Rasi", S / 2, top + 2 * cell - 6);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px Georgia";
    ctx.fillText("South Indian", S / 2, top + 2 * cell + 16);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "italic 18px Georgia";
    ctx.fillText("Kamma Nest", S / 2, S + 108);

    const url = c.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "rasi-kattam.png";
    a.click();
  };

  // feed the live chart (RasiChart needs planet keys + lagnaRasi)
  const chartPlanets: Record<string, number> = { ...place };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* controls */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <label className="mb-1 block text-sm font-semibold text-stone-700">
          Name (optional)
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Maapillai / Pen name"
          className="mb-4 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam"
        />

        <p className="mb-2 text-sm font-semibold text-stone-700">
          Place each graham (planet) in its rasi:
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {PLANETS.map((pl) => (
            <div key={pl.key} className="flex items-center gap-2">
              <span className="w-28 flex-none text-sm font-semibold text-kulam-dark">
                {pl.tamil}
                <span className="ml-1 font-normal text-stone-400">
                  {pl.tamilScript}
                </span>
              </span>
              <select
                value={place[pl.key]}
                onChange={(e) => set(pl.key, Number(e.target.value))}
                className="flex-1 rounded border border-stone-300 px-2 py-1.5 text-sm outline-none focus:border-kulam"
              >
                {rasis.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} · {r.tamilScript}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={download}
            className="rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110"
          >
            ⬇ Download chart
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Reset
          </button>
        </div>
        <p className="mt-3 text-xs text-stone-400">
          Your chart is saved on this device automatically.
        </p>
      </div>

      {/* live chart */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <RasiChart
          title={name ? `${name} — Rasi Kattam` : "Your Rasi Kattam"}
          subtitle="South-Indian chart · place all 9 grahams + lagnam"
          planets={chartPlanets}
          lagnaRasi={place.Lagna}
        />
        <p className="mt-4 text-center text-xs text-stone-400">
          La = Lagnam · Su Suriyan · Mo Chandiran · Ma Sevvai · Me Budhan · Ju
          Guru · Ve Sukran · Sa Sani · Ra Ragu · Ke Kethu
        </p>
      </div>
    </div>
  );
}
