import Link from "next/link";
import HoroscopeCalculator from "@/components/HoroscopeCalculator";
import JathagamReport from "@/components/JathagamReport";

export const metadata = { title: "Thirumana Porutham — Kamma Nest" };

export default function HoroscopePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Thirumana Porutham (10 Porutham)
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          The Tamil 10-Porutham match based on the bride&apos;s and groom&apos;s
          natchathiram (birth star) and rasi. Rajju and Vedhai are the most
          important poruthams; 6 or more matching is traditionally considered a
          good alliance.
        </p>
        <div className="mt-3 flex flex-col gap-1 text-sm font-semibold text-kulam">
          <Link href="/compatibility" className="underline">
            → See which gothrams, rasis &amp; nakshatras match (Porutham Guide)
          </Link>
          <Link href="/sample" className="underline">
            → View a sample jathagam match (with charts)
          </Link>
        </div>
      </header>

      <HoroscopeCalculator />

      <section className="mt-12 border-t border-kulam-gold/30 pt-8">
        <h2 className="font-serif text-2xl font-bold text-kulam-dark">
          Upload Horoscopes for an AI Report
        </h2>
        <p className="mb-5 mt-2 max-w-3xl text-stone-700">
          Have the printed jathagam pages? Upload the groom&apos;s and bride&apos;s
          horoscopes and the AI will read the details (even in Tamil) and give a
          detailed porutham report.
        </p>
        <JathagamReport />
      </section>
    </div>
  );
}
