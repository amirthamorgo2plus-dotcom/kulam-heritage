import Link from "next/link";
import RasiKattamBuilder from "@/components/RasiKattamBuilder";

export const metadata = {
  title: "Rasi Kattam Builder — Kamma Nest",
  description:
    "Build your own South-Indian rasi kattam — place all nine grahams and lagnam into their rasis, see the chart live and download it.",
};

export default function RasiKattamPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Rasi Kattam Builder
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Draw your own jathagam (rasi kattam) the South-Indian way — choose the
          rasi for each graham (planet) and lagnam, watch the chart fill in live,
          then download it to share. Use it alongside the{" "}
          <Link href="/horoscope" className="font-semibold text-kulam underline">
            Thirumana Porutham
          </Link>{" "}
          match.
        </p>
      </header>

      <RasiKattamBuilder />

      <p className="text-xs italic text-stone-500">
        For drawing &amp; reference only. For an exact jathagam from a date,
        time and place of birth, consult a qualified astrologer (jothidar).
      </p>
    </div>
  );
}
