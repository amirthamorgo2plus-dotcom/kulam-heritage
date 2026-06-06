"use client";

import { useState } from "react";

const MAX_MB = 5;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function Uploader({
  label,
  file,
  setFile,
}: {
  label: string;
  file: File | null;
  setFile: (f: File | null) => void;
}) {
  return (
    <div className="rounded-lg border border-kulam/30 bg-white p-4">
      <h3 className="mb-2 font-bold text-kulam-dark">{label}</h3>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-stone-600 file:mr-3 file:rounded file:border-0 file:bg-kulam file:px-3 file:py-1.5 file:text-white"
      />
      {file && (
        <p className="mt-2 text-xs text-stone-500">
          {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
          {file.size > MAX_MB * 1024 * 1024 && (
            <span className="text-red-600"> — too large (max {MAX_MB} MB)</span>
          )}
        </p>
      )}
    </div>
  );
}

export default function JathagamReport() {
  const [groom, setGroom] = useState<File | null>(null);
  const [bride, setBride] = useState<File | null>(null);
  const [state, setState] = useState<{ loading: boolean; report: string | null; error: string | null }>({
    loading: false,
    report: null,
    error: null,
  });

  const tooBig =
    (groom && groom.size > MAX_MB * 1024 * 1024) ||
    (bride && bride.size > MAX_MB * 1024 * 1024);
  const ready = groom && bride && !tooBig && !state.loading;

  const generate = async () => {
    if (!groom || !bride) return;
    setState({ loading: true, report: null, error: null });
    try {
      const [g, b] = await Promise.all([readAsDataUrl(groom), readAsDataUrl(bride)]);
      const res = await fetch("/api/jathaga-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groom: g, bride: b }),
      });
      const data = await res.json();
      if (data.report) setState({ loading: false, report: data.report, error: null });
      else
        setState({
          loading: false,
          report: null,
          error:
            data.configured === false
              ? "AI isn't set up yet — add a free Gemini API key."
              : data.error || "Could not generate the report.",
        });
    } catch {
      setState({ loading: false, report: null, error: "Something went wrong. Try again." });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Uploader label="Groom's horoscope" file={groom} setFile={setGroom} />
        <Uploader label="Bride's horoscope" file={bride} setFile={setBride} />
      </div>

      <button
        onClick={generate}
        disabled={!ready}
        className="rounded-lg bg-kulam-emerald px-6 py-2.5 font-semibold text-white shadow transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {state.loading ? "✨ Reading the charts…" : "✨ Generate AI Report"}
      </button>

      {state.loading && (
        <p className="text-sm text-stone-500">
          This can take 10–30 seconds while the AI reads both horoscopes…
        </p>
      )}
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      {state.report && (
        <div className="rounded-xl border border-kulam-emerald/50 bg-white p-5 shadow">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-kulam-emerald">
            ✨ AI Porutham Report
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-stone-700">
            {state.report}
          </p>
          <p className="mt-3 text-[11px] italic text-stone-400">
            AI-generated from the uploaded images — readings can have errors. Always
            confirm with a qualified astrologer.
          </p>
        </div>
      )}

      <p className="text-xs text-stone-400">
        Tip: upload clear, well-lit photos (or PDFs) of each horoscope page, max {MAX_MB} MB
        each. Your images are sent only to generate the report and are not stored by this app.
      </p>
    </div>
  );
}
