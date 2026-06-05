import { rituals } from "@/data/rituals";

export const metadata = { title: "Rituals Library — Kulam Heritage" };

export default function RitualsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Rituals Library
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Traditional Kamma ceremonies across life events. Each is summarised with
          its key steps.
        </p>
      </header>

      <div className="space-y-6">
        {rituals.map((r) => (
          <section
            key={r.id}
            className="rounded-xl border border-kulam-gold/40 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-kulam/10 px-2.5 py-0.5 text-xs font-semibold text-kulam">
                {r.lifeEvent}
              </span>
              <h2 className="text-xl font-bold text-kulam-dark">{r.title}</h2>
            </div>
            <p className="mt-2 text-stone-700">{r.summary}</p>
            <ol className="mt-4 space-y-3">
              {r.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-kulam text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-stone-600">{s.detail}</div>
                    {s.significance && (
                      <div className="mt-1 text-xs text-kulam">
                        <span className="font-semibold">Why:</span> {s.significance}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
