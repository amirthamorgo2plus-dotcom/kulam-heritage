import Link from "next/link";
import CompatibilityGuide from "@/components/CompatibilityGuide";
import GenZCompatibility from "@/components/GenZCompatibility";
import { genzDims } from "@/data/genz";

export const metadata = { title: "Porutham Guide — Kulam Heritage" };

export default function CompatibilityPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Compatibility Guide
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Two ways to look at a match — the <strong>traditional porutham</strong>{" "}
          (for the elders) and a <strong>modern Gen-Z compatibility</strong> check
          (for the couple). For the star-by-star score, use the{" "}
          <Link href="/horoscope" className="font-semibold text-kulam underline">
            Horoscope Match
          </Link>{" "}
          calculator.
        </p>
      </header>

      {/* Traditional vs Gen-Z mapping table */}
      <section>
        <h2 className="mb-1 text-xl font-bold text-kulam">
          🕉️ Traditional Porutham vs 🌍 Gen-Z Compatibility
        </h2>
        <p className="mb-4 text-sm text-stone-600">
          Each ancient porutham maps to something modern — so both generations see
          the same match in their own language.
        </p>
        <div className="overflow-x-auto rounded-xl border border-kulam-gold/40 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-kulam/5 text-left text-stone-500">
                <th className="px-4 py-2">Porutham</th>
                <th className="px-4 py-2">Traditional meaning</th>
                <th className="px-4 py-2">Gen-Z compatibility</th>
              </tr>
            </thead>
            <tbody>
              {genzDims.map((d) => (
                <tr key={d.porutham} className="border-t border-stone-100 align-top">
                  <td className="px-4 py-2 font-semibold text-kulam-dark">{d.porutham}</td>
                  <td className="px-4 py-2 text-stone-600">{d.traditional}</td>
                  <td className="px-4 py-2 text-kulam">{d.modern}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Gen-Z compatibility check */}
      <section>
        <h2 className="mb-1 text-xl font-bold text-kulam">Gen-Z Compatibility Check ✨</h2>
        <p className="mb-4 text-sm text-stone-600">
          Beyond the stars — a quick check on the things that matter day-to-day.
          Set each partner&apos;s answer and watch the match build.
        </p>
        <GenZCompatibility />
      </section>

      {/* Gothram / rasi / nakshatra reference */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-kulam">
          Gothram, Rasi &amp; Nakshatra Matching
        </h2>
        <CompatibilityGuide />
      </section>

      <p className="text-xs italic text-stone-500">
        A simplified guide — always confirm with a qualified astrologer and your
        family elders before deciding an alliance.
      </p>
    </div>
  );
}
