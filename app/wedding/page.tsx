import Link from "next/link";
import {
  checklist,
  vendorCategories,
  vendorsSeed,
  returnGiftIdeas,
  type Vendor,
} from "@/data/wedding";
import { supabase } from "@/lib/supabase";

export const metadata = { title: "Marriage Needs — Kulam Heritage" };
export const dynamic = "force-dynamic";

async function getVendors(): Promise<Vendor[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("vendors")
      .select("category, name, area, district, price_info")
      .order("category");
    if (!error && data && data.length) {
      return data.map((v) => ({
        category: v.category,
        name: v.name,
        area: v.area ?? "",
        district: v.district ?? "",
        priceInfo: v.price_info ?? undefined,
      }));
    }
  }
  return vendorsSeed;
}

export default async function WeddingPage() {
  const vendors = await getVendors();

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Marriage Needs — Start to Finish
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Everything for a Kammavar Naidu wedding in one place — a step-by-step
          checklist plus vendors for each need, including Kanchipuram silk shops.
        </p>
        <Link
          href="/planner"
          className="mt-4 inline-block rounded-lg bg-kulam px-5 py-2.5 font-semibold text-white shadow transition hover:bg-kulam-dark"
        >
          ▸ Start my wedding planner &amp; track tasks
        </Link>
      </header>

      {/* Journey / checklist */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-kulam">The Wedding Journey</h2>
        <ol className="relative space-y-5 border-l-2 border-kulam-gold/40 pl-6">
          {checklist.map((stage, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-kulam text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-bold text-kulam-dark">{stage.phase}</h3>
                <span className="rounded-full bg-kulam/10 px-2 py-0.5 text-xs text-kulam">
                  {stage.timing}
                </span>
              </div>
              <ul className="mt-1 list-disc pl-5 text-sm text-stone-700">
                {stage.tasks.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-stone-500">
          Tip: book your{" "}
          <Link href="/mandapams" className="font-semibold text-kulam underline">
            kalyana mandapam
          </Link>{" "}
          and check{" "}
          <Link href="/horoscope" className="font-semibold text-kulam underline">
            horoscope compatibility
          </Link>{" "}
          early.
        </p>
      </section>

      {/* Vendor categories */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-kulam">Vendors by Need</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {vendorCategories.map((c) => {
            const items = vendors.filter((v) => v.category === c.id);
            if (items.length === 0) return null;
            return (
              <div
                key={c.id}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  c.id === "silk"
                    ? "border-kulam-gold ring-1 ring-kulam-gold/40"
                    : "border-kulam-gold/40"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.icon}</span>
                  <h3 className="text-lg font-bold text-kulam-dark">{c.title}</h3>
                </div>
                <p className="mt-1 text-sm text-stone-600">{c.blurb}</p>
                <ul className="mt-3 space-y-1.5">
                  {items.map((v) => (
                    <li key={v.name} className="text-sm">
                      <span className="font-semibold">{v.name}</span>
                      <span className="text-stone-500">
                        {" "}
                        — {v.area}
                        {v.district ? `, ${v.district}` : ""}
                      </span>
                      {v.priceInfo && (
                        <span className="block text-xs text-kulam">{v.priceInfo}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Return gift ideas */}
      <section>
        <h2 className="mb-1 text-xl font-bold text-kulam">Return Gift Ideas</h2>
        <p className="mb-4 text-sm text-stone-600">
          What to give guests (thamboolam) — with rough budgets to suit your guest
          count.
        </p>
        <div className="overflow-hidden rounded-xl border border-kulam-gold/40 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-kulam/5 text-left text-stone-500">
                <th className="px-4 py-2">Gift idea</th>
                <th className="px-4 py-2">Budget</th>
                <th className="px-4 py-2">Best for</th>
              </tr>
            </thead>
            <tbody>
              {returnGiftIdeas.map((g) => (
                <tr key={g.name} className="border-t border-stone-100">
                  <td className="px-4 py-2 font-semibold text-kulam-dark">{g.name}</td>
                  <td className="px-4 py-2 text-kulam">{g.budget}</td>
                  <td className="px-4 py-2 text-stone-600">{g.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
