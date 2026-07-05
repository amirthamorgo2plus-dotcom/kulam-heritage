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
    </article>
  );
}
