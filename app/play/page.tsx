"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { VibeResult } from "@/components/games/VibeCheck";

// Lazy-load the 3D game so react-three-fiber never weighs down the main app.
const VibeCheck = dynamic(() => import("@/components/games/VibeCheck"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex h-[640px] w-full max-w-md items-center justify-center rounded-2xl bg-emerald-50 text-stone-400">
      Loading game…
    </div>
  ),
});

export default function PlayPage() {
  const [mode, setMode] = useState<"family" | "friends">("family");
  // key forces a fresh game when switching mode
  const [round, setRound] = useState(0);

  const handleComplete = (r: VibeResult) => {
    // Phase-1 hook point: fire `game_played` event / gate sign-in here.
    // eslint-disable-next-line no-console
    console.log("vibe_check_complete", r);
  };

  const handleShare = (r: VibeResult) => {
    const text =
      `✨ Vibe Check ✨\n` +
      `${r.mode === "family" ? "Mother-in-law 👵 & Daughter-in-law 👰" : "Me 😎 & my BFF 🫶"}\n` +
      `Score: ${r.score}/100 — ${r.verdict}\n` +
      `⚡ Vibes ${r.vibesPct}% · ☀️ ${r.sun[0]}+${r.sun[1]} · 🌙 ${r.moon[0]}+${r.moon[1]} · 🐉 ${r.zodiac[0]}+${r.zodiac[1]}\n` +
      `Try yours on Kamma Nest 💚`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") window.open(url, "_blank");
  };

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">Vibe Check ✨</h1>
        <p className="mt-2 text-stone-600">
          A fun compatibility game — This-or-That ⚡ + Sun &amp; Moon signs ☀️🌙 +
          Chinese zodiac 🐉. Play, laugh, share. (Just for fun!)
        </p>
      </header>

      {/* mode toggle */}
      <div className="flex justify-center gap-2">
        {(["family", "friends"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setRound((n) => n + 1);
            }}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              mode === m
                ? "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow"
                : "border border-stone-300 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {m === "family" ? "👵 Family Mode" : "🫶 Friends Mode"}
          </button>
        ))}
      </div>

      <VibeCheck key={`${mode}-${round}`} mode={mode} onComplete={handleComplete} onShare={handleShare} />

      <p className="text-center text-xs italic text-stone-400">
        Just-for-fun entertainment — not a real compatibility judgement. Be kind 💚
      </p>
    </div>
  );
}
