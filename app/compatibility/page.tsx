import Link from "next/link";
import CompatibilityGuide from "@/components/CompatibilityGuide";

export const metadata = { title: "Porutham Guide — Kulam Heritage" };

export default function CompatibilityPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Porutham Guide
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Which gothrams and kulams can match, and which rasis and nakshatras pair
          best. Use this as a quick reference, then run a full check in the{" "}
          <Link href="/horoscope" className="font-semibold text-kulam underline">
            Horoscope Match
          </Link>{" "}
          calculator.
        </p>
      </header>

      <CompatibilityGuide />

      <p className="text-xs italic text-stone-500">
        A simplified guide based on Ashtakoota principles — always confirm with a
        qualified astrologer and your family elders before deciding an alliance.
      </p>
    </div>
  );
}
