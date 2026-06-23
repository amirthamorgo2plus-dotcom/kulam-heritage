"use client";

import { useState } from "react";
import {
  nakshatras,
  rasis,
  poruthamMatch,
  type PoruthamResult,
} from "@/data/astro";

// Gen-Z vibe verdict from the porutham count.
function genZVibe(matched: number, rajjuOk: boolean): { line: string; sub: string } {
  if (!rajjuOk) return { line: "Stars say pause 🤔", sub: "rajju needs a closer look" };
  if (matched >= 8) return { line: "Written in the stars ✨", sub: "major green flags fr" };
  if (matched >= 6) return { line: "Strong cosmic vibes 💫", sub: "this one's giving promise" };
  if (matched >= 4) return { line: "Solid potential 🌙", sub: "worth exploring with intention" };
  return { line: "Stars say slow down 🤔", sub: "a lot to think about, no rush" };
}

function PersonInputs({
  label,
  nak,
  setNak,
  rasi,
  setRasi,
}: {
  label: string;
  nak: number;
  setNak: (n: number) => void;
  rasi: number;
  setRasi: (n: number) => void;
}) {
  return (
    <div className="rounded-lg border border-kulam/30 bg-white p-4">
      <h3 className="mb-3 font-bold text-kulam-dark">{label}</h3>
      <label className="mb-1 block text-sm font-semibold">
        Natchathiram (birth star)
      </label>
      <select
        value={nak}
        onChange={(e) => setNak(Number(e.target.value))}
        className="mb-3 w-full rounded border border-stone-300 px-2 py-1.5 text-sm"
      >
        {nakshatras.map((n) => (
          <option key={n.id} value={n.id}>
            {n.name} · {n.tamilScript}
          </option>
        ))}
      </select>
      <label className="mb-1 block text-sm font-semibold">Rasi (moon sign)</label>
      <select
        value={rasi}
        onChange={(e) => setRasi(Number(e.target.value))}
        className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm"
      >
        {rasis.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name} · {r.tamilScript}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function HoroscopeCalculator() {
  const [boyNak, setBoyNak] = useState(1);
  const [boyRasi, setBoyRasi] = useState(1);
  const [girlNak, setGirlNak] = useState(4);
  const [girlRasi, setGirlRasi] = useState(2);
  const [result, setResult] = useState<PoruthamResult | null>(null);
  const [ai, setAi] = useState<{ loading: boolean; text: string | null; error: string | null }>({
    loading: false,
    text: null,
    error: null,
  });

  const pct = result ? Math.round((result.matched / result.total) * 100) : 0;
  const good = result ? result.good : false;

  const runMatch = () => {
    setResult(poruthamMatch(boyNak, boyRasi, girlNak, girlRasi));
    setAi({ loading: false, text: null, error: null });
  };

  const getInsight = async () => {
    if (!result) return;
    setAi({ loading: true, text: null, error: null });
    try {
      const payload = {
        boy: {
          nakshatra: nakshatras.find((n) => n.id === boyNak)?.name,
          rasi: rasis.find((r) => r.id === boyRasi)?.name,
        },
        girl: {
          nakshatra: nakshatras.find((n) => n.id === girlNak)?.name,
          rasi: rasis.find((r) => r.id === girlRasi)?.name,
        },
        system: "10 Porutham (Tamil Dasa Porutham)",
        matched: result.matched,
        total: result.total,
        verdict: result.verdict,
        rajjuOk: result.rajjuOk,
        vedhaOk: result.vedhaOk,
        poruthams: result.poruthams.map((p) => ({ name: p.name, ok: p.ok })),
      };
      const res = await fetch("/api/jathaga-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.insight) setAi({ loading: false, text: data.insight, error: null });
      else
        setAi({
          loading: false,
          text: null,
          error:
            data.configured === false
              ? "AI insights aren't set up yet — add a free Gemini API key."
              : data.error || "Could not get an insight.",
        });
    } catch {
      setAi({ loading: false, text: null, error: "Could not reach the AI service." });
    }
  };

  const shareCard = async () => {
    if (!result) return;
    const vibe = genZVibe(result.matched, result.rajjuOk);
    const boyName = nakshatras.find((n) => n.id === boyNak)?.name;
    const girlName = nakshatras.find((n) => n.id === girlNak)?.name;

    const c = document.createElement("canvas");
    c.width = 1080;
    c.height = 1350;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const g = ctx.createLinearGradient(0, 0, 1080, 1350);
    g.addColorStop(0, "#0f766e");
    g.addColorStop(1, "#134e4a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 1080, 1350);
    ctx.textAlign = "center";

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "600 46px Georgia";
    ctx.fillText("✨ Thirumana Porutham ✨", 540, 180);

    ctx.fillStyle = "#fff";
    ctx.font = "900 300px Georgia";
    ctx.fillText(`${result.matched}/10`, 540, 540);

    ctx.fillStyle = "#EAB308";
    ctx.font = "bold 56px Georgia";
    ctx.fillText(vibe.line, 540, 680);

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "italic 40px Georgia";
    ctx.fillText(vibe.sub, 540, 750);

    ctx.fillStyle = "#fff";
    ctx.font = "44px Georgia";
    ctx.fillText(`${boyName}  ✦  ${girlName}`, 540, 910);

    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "38px Georgia";
    ctx.fillText(
      `${result.matched}/10 porutham  ·  Rajju ${result.rajjuOk ? "OK" : "dosham"}`,
      540,
      1000
    );

    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "34px Georgia";
    ctx.fillText("Kamma Nest", 540, 1270);

    await new Promise<void>((resolve) =>
      c.toBlob(async (blob) => {
        if (!blob) return resolve();
        const file = new File([blob], "thirumana-porutham.png", { type: "image/png" });
        const navAny = navigator as Navigator & {
          canShare?: (d: { files: File[] }) => boolean;
          share?: (d: { files?: File[]; title?: string; text?: string }) => Promise<void>;
        };
        try {
          if (navAny.canShare?.({ files: [file] }) && navAny.share) {
            await navAny.share({ files: [file], title: "Our Thirumana Porutham ✨" });
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "thirumana-porutham.png";
            a.click();
            URL.revokeObjectURL(url);
          }
        } catch {
          /* user cancelled share */
        }
        resolve();
      }, "image/png")
    );
  };

  const vibe = result ? genZVibe(result.matched, result.rajjuOk) : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <PersonInputs label="Maapillai (Groom)" nak={boyNak} setNak={setBoyNak} rasi={boyRasi} setRasi={setBoyRasi} />
        <PersonInputs label="Pen (Bride)" nak={girlNak} setNak={setGirlNak} rasi={girlRasi} setRasi={setGirlRasi} />
      </div>

      <button
        onClick={runMatch}
        className="rounded-lg bg-kulam px-6 py-2.5 font-semibold text-white shadow transition hover:bg-kulam-dark"
      >
        Check Porutham
      </button>

      {result && (
        <div className="rounded-lg border border-kulam-gold/40 bg-white p-5 shadow">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="text-3xl font-bold text-kulam-dark">
              {result.matched} / {result.total}
              <span className="ml-2 text-base font-semibold text-stone-500">
                porutham
              </span>
            </div>
            <div className={`text-lg font-semibold ${good ? "text-green-700" : "text-red-700"}`}>
              {result.verdict}
            </div>
          </div>

          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className={`h-full ${good ? "bg-kulam-emerald" : "bg-rose-400"}`}
              style={{ width: `${pct}%` }}
            />
          </div>

          {vibe && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-kulam/5 px-3 py-2">
              <div>
                <span className="text-base font-bold text-kulam">{vibe.line}</span>
                <span className="ml-2 text-sm text-stone-500">{vibe.sub}</span>
              </div>
              <button
                onClick={shareCard}
                className="rounded-lg bg-kulam-gold px-3 py-1.5 text-sm font-semibold text-white shadow transition hover:brightness-95"
              >
                📤 Share card
              </button>
            </div>
          )}

          {/* critical dosham flags */}
          {(!result.rajjuOk || !result.vedhaOk) && (
            <ul className="mt-3 space-y-1 text-sm">
              {!result.rajjuOk && (
                <li className="text-red-700">
                  ⚠ Rajju dosham: both share the same Rajju — the most important
                  porutham; traditionally avoided.
                </li>
              )}
              {!result.vedhaOk && (
                <li className="text-amber-700">
                  ⓘ Vedhai: the stars mutually afflict (vedha) — review carefully.
                </li>
              )}
            </ul>
          )}

          {/* 10 Porutham (Tamil Dasa Porutham) */}
          <div className="mt-5">
            <h3 className="mb-2 font-bold text-kulam-dark">
              10 Porutham · Thirumana Porutham
            </h3>
            <div className="space-y-1.5">
              {result.poruthams.map((p) => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="w-36 flex-none text-sm font-semibold">
                    {p.name}
                    <span className="ml-1 font-normal text-stone-400">
                      {p.tamilScript}
                    </span>
                    {p.critical && (
                      <span className="ml-1 rounded bg-amber-100 px-1 text-[10px] font-semibold text-amber-700">
                        key
                      </span>
                    )}
                  </span>
                  <div className="h-5 flex-1 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className={`flex h-full items-center rounded-full px-2 text-[11px] font-semibold text-white ${
                        p.ok ? "bg-kulam-emerald" : "bg-rose-400"
                      }`}
                      style={{ width: p.ok ? "100%" : "38%" }}
                    >
                      {p.ok ? "✓ porutham" : "✗"}
                    </div>
                  </div>
                  <span className="hidden w-44 flex-none text-xs text-stone-500 sm:block">
                    {p.note}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs italic text-stone-400">
              Tamil Dasa Porutham — Rajju &amp; Vedhai are the most important.
              Indicative only.
            </p>
          </div>

          {/* AI insight */}
          <div className="mt-4 rounded-lg border border-kulam-emerald/50 bg-kulam-emerald/10 p-3">
            {!ai.text && !ai.loading && (
              <button
                onClick={getInsight}
                className="rounded-lg bg-kulam-emerald px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
              >
                ✨ Get AI insight
              </button>
            )}
            {ai.loading && (
              <p className="text-sm text-stone-500">✨ Generating insight…</p>
            )}
            {ai.text && (
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-kulam-emerald">
                  ✨ AI insight
                </div>
                <p className="whitespace-pre-line text-sm text-stone-700">{ai.text}</p>
                <p className="mt-1 text-[11px] italic text-stone-400">
                  AI-generated guidance — not a substitute for a qualified astrologer.
                </p>
              </div>
            )}
            {ai.error && <p className="text-sm text-red-600">{ai.error}</p>}
          </div>

          <p className="mt-4 text-xs italic text-stone-500">
            Indicative result only, based on the Tamil 10-Porutham system. Always
            confirm with a qualified astrologer, who also checks dosham, dasa and
            chart placement beyond porutham matching.
          </p>
        </div>
      )}
    </div>
  );
}
