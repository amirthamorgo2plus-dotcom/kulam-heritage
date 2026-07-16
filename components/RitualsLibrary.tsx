"use client";

import { useState } from "react";
import { rituals, type Bi } from "@/data/rituals";

type Lang = "both" | "ta" | "en";

const OPTIONS: { key: Lang; label: string }[] = [
  { key: "both", label: "தமிழ் + English" },
  { key: "ta", label: "தமிழ்" },
  { key: "en", label: "English" },
];

/** Renders a bilingual value per the chosen language. */
function T({
  v,
  lang,
  className = "",
  taClassName = "",
  enClassName = "",
}: {
  v: Bi;
  lang: Lang;
  className?: string;
  taClassName?: string;
  enClassName?: string;
}) {
  // Fall back to English when no Tamil original exists for this field.
  if (lang === "ta") {
    return <span className={`${className} ${taClassName}`}>{v.ta || v.en}</span>;
  }
  if (lang === "en" || !v.ta) {
    return <span className={`${className} ${enClassName}`}>{v.en}</span>;
  }
  return (
    <span className={className}>
      <span className={`block ${taClassName}`}>{v.ta}</span>
      <span className={`mt-1 block ${enClassName}`}>{v.en}</span>
    </span>
  );
}

export default function RitualsLibrary() {
  const [lang, setLang] = useState<Lang>("both");

  // In "both" mode the English is the secondary reading, so mute it.
  const enMuted = lang === "both" ? "text-stone-500" : "";

  return (
    <div className="space-y-8">
      {/* Language toggle */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Language
        </span>
        <div className="flex gap-1 rounded-xl bg-stone-100 p-1">
          {OPTIONS.map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => setLang(o.key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                lang === o.key
                  ? "bg-kulam text-white shadow-sm"
                  : "text-stone-600 hover:bg-white"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {rituals.map((r) => (
          <section
            key={r.id}
            className="rounded-xl border border-kulam-gold/40 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-kulam/10 px-2.5 py-0.5 text-xs font-semibold text-kulam">
                {r.lifeEvent}
              </span>
              <h2 className="text-xl font-bold text-kulam-dark">
                <T v={r.title} lang={lang} />
              </h2>
            </div>

            <div className="mt-2 text-stone-700">
              <T v={r.summary} lang={lang} enClassName={enMuted} />
            </div>

            {r.story && (
              <div className="mt-4 rounded-xl border-l-4 border-kulam-gold bg-kulam-gold/5 p-4">
                <h3 className="font-serif text-base font-bold text-kulam-dark">
                  <T v={r.story.heading} lang={lang} />
                </h3>
                <div className="mt-2 space-y-3 text-sm leading-relaxed text-stone-700">
                  {r.story.body.map((p, i) => (
                    <p key={i}>
                      <T v={p} lang={lang} enClassName={enMuted} />
                    </p>
                  ))}
                </div>
              </div>
            )}

            <ol className="mt-4 space-y-3">
              {r.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-kulam text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-kulam-dark">
                      <T v={s.title} lang={lang} />
                    </div>
                    <div className="mt-0.5 text-sm leading-relaxed text-stone-600">
                      <T v={s.detail} lang={lang} enClassName={enMuted} />
                    </div>
                    {s.significance && (
                      <div className="mt-1.5 text-xs leading-relaxed text-kulam">
                        <span className="font-semibold">
                          {lang === "ta" ? "ஏன்: " : "Why: "}
                        </span>
                        <T v={s.significance} lang={lang} />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {r.closing && (
              <div className="mt-5 rounded-xl bg-kulam/5 p-4">
                <h3 className="font-serif text-base font-bold text-kulam-dark">
                  <T v={r.closing.heading} lang={lang} />
                </h3>
                <div className="mt-2 space-y-3 text-sm leading-relaxed text-stone-700">
                  {r.closing.body.map((p, i) => (
                    <p key={i}>
                      <T v={p} lang={lang} enClassName={enMuted} />
                    </p>
                  ))}
                </div>
              </div>
            )}

            {r.source && (
              <p className="mt-4 border-t border-stone-100 pt-3 text-xs italic text-stone-400">
                {r.source}
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
