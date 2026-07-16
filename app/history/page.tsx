import { kammas } from "@/data/kamma";

export const metadata = { title: "Kamma History & Kulam — Kulam Heritage" };

const distribution = [
  { value: "65L", label: "Tamil Nadu" },
  { value: "40L", label: "Karnataka" },
  { value: "36.5L", label: "Andhra Pradesh" },
  { value: "22L", label: "Telangana" },
];

export default function HistoryPage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          {kammas.name} Kulam
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Also known as: {kammas.aka.join(", ")}
        </p>
        <p className="mt-1 text-sm text-stone-500">
          Regions: {kammas.region.join(", ")}
        </p>
        <p className="mt-4 max-w-3xl text-lg">{kammas.summary}</p>
      </header>

      <section className="rounded-2xl bg-kulam/5 px-6 py-8">
        <h2 className="text-center text-xl font-bold text-kulam-dark">
          Geographic Distribution
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {distribution.map((d) => (
            <div key={d.label} className="text-center">
              <div className="text-4xl font-extrabold text-kulam sm:text-5xl">
                {d.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-stone-500">
                {d.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs italic text-stone-500">
          Approximate Kammavar Naidu population by state.
        </p>
      </section>

      {kammas.sections.map((s) => (
        <section key={s.heading}>
          <h2 className="mb-2 text-xl font-bold text-kulam">{s.heading}</h2>
          <div className="space-y-2 text-stone-700">
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2 className="mb-3 text-xl font-bold text-kulam">{kammas.kulamsLabel}</h2>
        <div className="flex flex-wrap gap-2">
          {kammas.kulams.map((g) => (
            <span
              key={g}
              className="rounded-full border border-kulam-gold/50 bg-white px-3 py-1 text-sm"
            >
              {g}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs italic text-stone-500">
          Illustrative list — each kulam / house-name has its own kula deivam;
          traditions vary by family lineage.
        </p>
      </section>

      <section className="rounded-2xl border border-kulam-gold/30 bg-kulam/5 p-5">
        <h2 className="text-sm font-bold text-kulam-dark">Sources &amp; thanks</h2>
        <p className="mt-2 text-xs leading-relaxed text-stone-600">
          The origin of the name Kammavar and the account of Renuka Devi are
          retold here in our own words from community material generously shared
          by the{" "}
          <a
            href="https://www.kammavarthirumanaseva.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-kulam underline"
          >
            Peelamedu Kammavar Seva Sangam
          </a>{" "}
          (kammavarthirumanaseva.com), Coimbatore — with our thanks.
        </p>
        <p className="mt-2 text-xs italic text-stone-500">
          Disclaimer: these are community traditions passed down through
          generations, not academic history. Accounts vary by family and region —
          please verify with your elders.
        </p>
      </section>
    </article>
  );
}
