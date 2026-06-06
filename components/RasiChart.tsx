// South-Indian style rasi chart (fixed 4x4 grid, signs in fixed positions).
// Presentational only — safe as a server component.

const RASI_NAMES: Record<number, string> = {
  1: "Mesham", 2: "Rishabam", 3: "Mithunam", 4: "Kadagam",
  5: "Simmam", 6: "Kanni", 7: "Thulam", 8: "Vrichigam",
  9: "Dhanusu", 10: "Magaram", 11: "Kumbam", 12: "Meenam",
};

// rasi id -> [gridRow, gridColumn] in the South-Indian layout.
const POS: Record<number, [number, number]> = {
  12: [1, 1], 1: [1, 2], 2: [1, 3], 3: [1, 4],
  11: [2, 1], 4: [2, 4],
  10: [3, 1], 5: [3, 4],
  9: [4, 1], 8: [4, 2], 7: [4, 3], 6: [4, 4],
};

const ABBR: Record<string, string> = {
  Lagna: "La", Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
  Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
};

export default function RasiChart({
  title,
  subtitle,
  planets,
  lagnaRasi,
}: {
  title: string;
  subtitle?: string;
  planets: Record<string, number>;
  lagnaRasi: number;
}) {
  const byRasi: Record<number, string[]> = {};
  for (const [planet, rasi] of Object.entries(planets)) {
    (byRasi[rasi] ||= []).push(ABBR[planet] || planet.slice(0, 2));
  }

  return (
    <div>
      <div className="mb-2 text-center">
        <div className="font-bold text-kulam-dark">{title}</div>
        {subtitle && <div className="text-xs text-stone-500">{subtitle}</div>}
      </div>
      <div className="mx-auto grid aspect-square w-full max-w-xs grid-cols-4 grid-rows-4 overflow-hidden rounded-lg border-2 border-kulam/40 bg-white">
        {Object.entries(POS).map(([rasiStr, [row, col]]) => {
          const rasi = Number(rasiStr);
          const isLagna = rasi === lagnaRasi;
          return (
            <div
              key={rasi}
              style={{ gridRow: row, gridColumn: col }}
              className={`relative border border-kulam/15 p-1 ${
                isLagna ? "bg-kulam-gold/15 ring-2 ring-inset ring-kulam-gold" : ""
              }`}
            >
              <div className="text-[8px] leading-none text-stone-400">
                {RASI_NAMES[rasi]}
              </div>
              <div className="mt-0.5 flex flex-wrap gap-0.5">
                {(byRasi[rasi] || []).map((p, i) => (
                  <span
                    key={i}
                    className={`text-[11px] font-bold ${
                      p === "La" ? "text-kulam-gold" : "text-kulam-dark"
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        {/* Center label */}
        <div
          style={{ gridRow: "2 / 4", gridColumn: "2 / 4" }}
          className="flex flex-col items-center justify-center border border-kulam/15 bg-kulam/5 text-center"
        >
          <span className="text-xs font-bold text-kulam">Rasi</span>
          <span className="text-[9px] text-stone-400">South Indian</span>
        </div>
      </div>
    </div>
  );
}
