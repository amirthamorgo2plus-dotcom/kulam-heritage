import Link from "next/link";
import HoroscopeCalculator from "@/components/HoroscopeCalculator";

export const metadata = { title: "Horoscope Match — Kulam Heritage" };

export default function HoroscopePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Horoscope Matching
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Ashtakoota (36-guna) compatibility based on the bride&apos;s and
          groom&apos;s nakshatra and rasi. A score of 18 or more is traditionally
          considered acceptable.
        </p>
        <Link
          href="/compatibility"
          className="mt-3 inline-block text-sm font-semibold text-kulam underline"
        >
          → See which gothrams, rasis &amp; nakshatras match (Porutham Guide)
        </Link>
      </header>

      <HoroscopeCalculator />
    </div>
  );
}
