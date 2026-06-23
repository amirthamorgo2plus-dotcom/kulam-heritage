import Link from "next/link";
import RasiChart from "@/components/RasiChart";
import { groomSample, brideSample } from "@/data/sampleJathagam";
import { poruthamMatch } from "@/data/astro";

export const metadata = { title: "Sample Jathagam Match — Kamma Nest" };

export default function SamplePage() {
  const result = poruthamMatch(
    groomSample.nakshatraId,
    groomSample.moonRasi,
    brideSample.nakshatraId,
    brideSample.moonRasi
  );
  const poruthams = result.poruthams;
  const matches = result.matched;
  const pct = Math.round((result.matched / result.total) * 100);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Sample Jathagam Match
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          An example of two horoscopes and how they&apos;re visualised and matched.
          Try your own in the{" "}
          <Link href="/horoscope" className="font-semibold text-kulam underline">
            Horoscope Match
          </Link>{" "}
          tool.
        </p>
      </header>

      {/* The two charts */}
      <section className="grid gap-8 sm:grid-cols-2">
        {[groomSample, brideSample].map((c) => (
          <div key={c.name} className="rounded-xl border border-kulam-gold/40 bg-white p-4 shadow-sm">
            <RasiChart
              title={`${c.gender}: ${c.name}`}
              subtitle={`${c.nakshatra} · ${c.rasiName} · Lagna ${RASI(c.lagnaRasi)}`}
              planets={c.planets}
              lagnaRasi={c.lagnaRasi}
            />
            <div className="mt-3 text-xs text-stone-500">
              <div>📅 {c.dob}</div>
              <div className="mt-1">
                <span className="font-semibold">Star:</span> {c.nakshatra} ·{" "}
                <span className="font-semibold">Rasi:</span> {c.rasiName}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Legend */}
      <p className="-mt-4 text-xs text-stone-400">
        La = Lagna (ascendant, gold) · Su Sun · Mo Moon · Ma Mars · Me Mercury ·
        Ju Jupiter · Ve Venus · Sa Saturn · Ra Rahu · Ke Ketu
      </p>

      {/* Match summary */}
      <section className="rounded-xl border border-kulam-emerald/50 bg-kulam-emerald/10 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-3xl font-bold text-kulam-dark">
            {matches} / 10 <span className="text-base font-normal text-stone-500">porutham</span>
          </div>
          <div className="text-lg font-semibold text-kulam">
            {pct}% · Rajju {result.rajjuOk ? "OK" : "dosham"}
          </div>
        </div>
        <p className="mt-1 text-sm text-stone-600">{result.verdict}</p>
      </section>

      {/* 10 porutham bars */}
      <section>
        <h2 className="mb-3 text-xl font-bold text-kulam">10 Porutham</h2>
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
              <span className="hidden w-44 flex-none text-xs text-stone-500 sm:block">{p.note}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs italic text-stone-500">
        Sample data for illustration only. Always confirm with a qualified
        astrologer.
      </p>
    </div>
  );
}

function RASI(id: number) {
  const names: Record<number, string> = {
    1: "Mesha", 2: "Rishabam", 3: "Mithunam", 4: "Kadagam", 5: "Simmam",
    6: "Kanni", 7: "Thulam", 8: "Vrichigam", 9: "Dhanusu", 10: "Magaram",
    11: "Kumbam", 12: "Meenam",
  };
  return names[id] || "";
}
