"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Vibe Check ✨ — fun Gen-Z compatibility mini-game (Family / Friends mode).
// Blends This-or-That + Sunshine/Moonshine + Chinese zodiac into one score.
// Self-contained: @react-three/fiber + drei only, no external 3D assets.
// (Originally drafted via Z.ai; flow + imports fixed for production.)

import React, { useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export interface VibeResult {
  mode: "family" | "friends";
  score: number;
  vibe: number;
  sunMoon: [string, string];
  zodiac: [string, string];
  verdict: string;
  zodiacNote: string;
}

// --- Bilingual UI text (Tamil first) ---
const T = {
  intro: {
    title: "வைப் செக் ✨",
    sub: "Vibe Check",
    desc: "உங்கள் பொருத்தத்தை கண்டுபிடிப்போம்! / Let's find your compatibility!",
    start: "தொடங்கு / Start",
  },
  thisOrThat: {
    title: "இது அல்லது அது ⚡",
    sub: "This or That",
    qs: [
      { ta: "பில்டர் காபி ☕", en: "Filter coffee ☕", alt: { ta: "கோல்ட் காபி 🧊", en: "Cold coffee 🧊" } },
      { ta: "சனிக்கிழமை: கோவில் 🛕", en: "Saturday: Kovil 🛕", alt: { ta: "சனிக்கிழமை: ஓய்வு 😎", en: "Saturday: Chill 😎" } },
      { ta: "WhatsApp: ❤️", en: "WhatsApp forwards: Love ❤️", alt: { ta: "WhatsApp: மியூட் 🔕", en: "WhatsApp forwards: Mute 🔕" } },
      { ta: "சமையல்: பாரம்பரியம் 🍲", en: "Cooking: Traditional 🍲", alt: { ta: "சமையல்: புதுமை 🧪", en: "Cooking: Experiment 🧪" } },
      { ta: "திட்டங்கள்: தற்காலிகம் 🎲", en: "Plans: Spontaneous 🎲", alt: { ta: "திட்டங்கள்: திட்டமிட்ட 🗓️", en: "Plans: Scheduled 🗓️" } },
    ],
  },
  sunMoon: {
    title: "சூரியன் ☀️ / சந்திரன் 🌙",
    sub: "Sunshine / Moonshine",
    qs: [
      { ta: "காலை பறவை 🌅", en: "Morning bird 🌅", alt: { ta: "இரவு ஆந்தை 🌙", en: "Night owl 🌙" } },
      { ta: "சத்தமான கூட்டம் 🎉", en: "Loud crowd 🎉", alt: { ta: "அமைதியான மூலை 🛋️", en: "Cosy corner 🛋️" } },
      { ta: "தலைமை எடுக்க 🚀", en: "Take the lead 🚀", alt: { ta: "ஓட்டத்தில் போக 🌊", en: "Go with the flow 🌊" } },
    ],
  },
  zodiac: {
    title: "ராசி பொருத்தம் 🐉",
    sub: "Zodiac Match",
    prompt: "உங்கள் விலங்கை தேர்வு செய்யவும் / Pick your animal",
  },
  result: {
    share: "பகிர் 📤",
    again: "மீண்டும் விளையாடு 🔁",
    verdicts: [
      { min: 85, ta: "ஆன்ம சொரூபம்! 💚", en: "Soulmates-ah! 💚 instant goals" },
      { min: 60, ta: "அழகான குழப்பம் — சாயுடன் நல்லது ☕", en: "Cute chaos — works with chai ☕" },
      { min: 0, ta: "எதிரெதிர் புதுமை… குடும்பத்துக்கு வேடிக்கை 😂", en: "Opposites… entertaining for the family group 😂" },
    ],
  },
  turn: "முறை / Turn",
};

const ZODIAC_ANIMALS = [
  { emoji: "🐀", name: "Rat" }, { emoji: "🐂", name: "Ox" }, { emoji: "🐅", name: "Tiger" },
  { emoji: "🐇", name: "Rabbit" }, { emoji: "🐉", name: "Dragon" }, { emoji: "🐍", name: "Snake" },
  { emoji: "🐎", name: "Horse" }, { emoji: "🐐", name: "Goat" }, { emoji: "🐒", name: "Monkey" },
  { emoji: "🐓", name: "Rooster" }, { emoji: "🐕", name: "Dog" }, { emoji: "🐖", name: "Pig" },
];

function getZodiacScore(a: number, b: number) {
  if (a < 0 || b < 0) return { score: 70, note: "" };
  const trines = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]];
  const secretFriends = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
  const clashes = [[0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]];
  for (const g of trines)
    if (g.includes(a) && g.includes(b))
      return { score: 100, note: `${ZODIAC_ANIMALS[a].emoji} + ${ZODIAC_ANIMALS[b].emoji} = power duo!` };
  for (const p of secretFriends)
    if ((p[0] === a && p[1] === b) || (p[1] === a && p[0] === b))
      return { score: 95, note: `${ZODIAC_ANIMALS[a].emoji} + ${ZODIAC_ANIMALS[b].emoji} = secret friends!` };
  for (const p of clashes)
    if ((p[0] === a && p[1] === b) || (p[1] === a && p[0] === b))
      return { score: 45, note: `${ZODIAC_ANIMALS[a].emoji} + ${ZODIAC_ANIMALS[b].emoji} = spicy opposites!` };
  return { score: 70, note: `${ZODIAC_ANIMALS[a].emoji} + ${ZODIAC_ANIMALS[b].emoji} = cute combo!` };
}

interface PlayerData {
  thisOrThat: number[];
  sunMoon: number[];
  zodiac: number | null;
}
const emptyPlayer = (): PlayerData => ({ thisOrThat: [], sunMoon: [], zodiac: null });

function Avatar({
  position, color, face, sunMoon, zodiac, isActive,
}: {
  position: [number, number, number];
  color: string;
  face: string;
  sunMoon: "sun" | "moon" | null;
  zodiac: number | null;
  isActive: boolean;
}) {
  const meshRef = useRef<any>(null);
  const orbitRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      const t = isActive ? 1.1 : 0.85;
      meshRef.current.scale.lerp(new THREE.Vector3(t, t, t), 0.1);
    }
    if (orbitRef.current) orbitRef.current.rotation.y = state.clock.elapsedTime * 1.5;
  });

  return (
    <group position={position} ref={meshRef}>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1, 16]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 0.2, 8]} />
        <meshStandardMaterial color="#EAB308" flatShading />
      </mesh>
      <Html position={[0, 0.3, 0.51]} center distanceFactor={2} occlude>
        <div style={{ fontSize: "32px", userSelect: "none" }}>{face}</div>
      </Html>
      {sunMoon && (
        <group ref={orbitRef}>
          <mesh position={[0.7, 0.3, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial
              color={sunMoon === "sun" ? "#EAB308" : "#F3F4F6"}
              emissive={sunMoon === "sun" ? "#EAB308" : "#F3F4F6"}
              emissiveIntensity={0.8}
              flatShading
            />
          </mesh>
        </group>
      )}
      {zodiac !== null && (
        <Html position={[0, 1.4, 0]} center distanceFactor={3}>
          <div style={{ fontSize: "36px", userSelect: "none" }}>{ZODIAC_ANIMALS[zodiac].emoji}</div>
        </Html>
      )}
    </group>
  );
}

function HeartBurst() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
        scale: 0.1 + Math.random() * 0.2,
      })),
    []
  );
  return (
    <group>
      {hearts.map((h) => (
        <mesh key={h.id} position={[h.x * 0.5, h.y * 0.5, h.z * 0.5]}>
          <sphereGeometry args={[h.scale, 8, 8]} />
          <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={0.5} transparent opacity={0.8} />
        </mesh>
      ))}
      <Html center distanceFactor={4}>
        <div style={{ fontSize: "48px", userSelect: "none" }}>💖</div>
      </Html>
    </group>
  );
}

type Phase = "intro" | "this" | "sun" | "zodiac" | "result";

export default function VibeCheck({
  mode = "family",
  onComplete,
  onShare,
}: {
  mode?: "family" | "friends";
  onComplete?: (r: VibeResult) => void;
  onShare?: (r: VibeResult) => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [qIndex, setQIndex] = useState(0);
  const [p1, setP1] = useState<PlayerData>(emptyPlayer());
  const [p2, setP2] = useState<PlayerData>(emptyPlayer());
  const [result, setResult] = useState<VibeResult | null>(null);

  const labels = useMemo(
    () => (mode === "friends" ? { p1: "You 😎", p2: "Your BFF 🫶" } : { p1: "Amma-in-law 👵", p2: "Marumagal 👰" }),
    [mode]
  );

  const sunTypeOf = (d: PlayerData): "sun" | "moon" =>
    d.sunMoon.filter((x) => x === 0).length >= 2 ? "sun" : "moon";

  // Clean 2-player × 3-round state machine.
  const handleChoice = (choice: number) => {
    const round: "thisOrThat" | "sunMoon" = phase === "this" ? "thisOrThat" : "sunMoon";
    const total = round === "thisOrThat" ? 5 : 3;
    const update = (d: PlayerData): PlayerData => ({ ...d, [round]: [...d[round], choice] });
    if (activePlayer === 1) setP1(update); else setP2(update);

    if (qIndex < total - 1) {
      setQIndex(qIndex + 1);
      return;
    }
    setQIndex(0);
    if (activePlayer === 1) {
      setActivePlayer(2); // same round, player 2
    } else {
      setActivePlayer(1);
      setPhase(phase === "this" ? "sun" : "zodiac"); // next round
    }
  };

  const handleZodiac = (animal: number) => {
    if (activePlayer === 1) {
      setP1((d) => ({ ...d, zodiac: animal }));
      setActivePlayer(2);
    } else {
      const p2Final = { ...p2, zodiac: animal };
      setP2(p2Final);
      finish(p2Final);
    }
  };

  const finish = (p2Final: PlayerData) => {
    let matches = 0;
    for (let i = 0; i < 5; i++) if (p1.thisOrThat[i] === p2Final.thisOrThat[i]) matches++;
    const totScore = (matches / 5) * 100;

    const t1 = sunTypeOf(p1);
    const t2 = sunTypeOf(p2Final);
    const smScore = t1 !== t2 ? 90 : t1 === "sun" ? 75 : 85;

    const z = getZodiacScore(p1.zodiac ?? -1, p2Final.zodiac ?? -1);
    const finalScore = Math.round(totScore * 0.4 + smScore * 0.3 + z.score * 0.3);

    const v = finalScore >= 85 ? T.result.verdicts[0] : finalScore >= 60 ? T.result.verdicts[1] : T.result.verdicts[2];
    const res: VibeResult = {
      mode,
      score: finalScore,
      vibe: finalScore,
      sunMoon: [t1, t2],
      zodiac: [ZODIAC_ANIMALS[p1.zodiac ?? 0].name, ZODIAC_ANIMALS[p2Final.zodiac ?? 0].name],
      verdict: `${v.ta} / ${v.en}`,
      zodiacNote: z.note,
    };
    setResult(res);
    setPhase("result");
    onComplete?.(res);
  };

  const reset = () => {
    setP1(emptyPlayer());
    setP2(emptyPlayer());
    setActivePlayer(1);
    setQIndex(0);
    setResult(null);
    setPhase("intro");
  };

  const playing = phase === "this" || phase === "sun" || phase === "zodiac";
  const p1Face = labels.p1.split(" ")[1] || "👵";
  const p2Face = labels.p2.split(" ")[1] || "👰";

  const renderUI = () => {
    if (phase === "intro")
      return (
        <div className="flex flex-col items-center p-4 text-center">
          <h1 className="text-3xl font-bold text-[var(--deep-teal)]">{T.intro.title}</h1>
          <p className="mb-2 text-lg text-[var(--gold)]">{T.intro.sub}</p>
          <p className="mb-6 text-sm text-[var(--deep-teal)]">{T.intro.desc}</p>
          <button onClick={() => setPhase("this")} className="rounded-full bg-[var(--matcha)] px-6 py-3 font-bold text-white shadow-lg transition-transform active:scale-95">
            {T.intro.start}
          </button>
        </div>
      );

    if (phase === "result" && result)
      return (
        <div className="flex w-full max-w-sm flex-col items-center p-4 text-center">
          <div className="mb-4 w-full rounded-2xl border-2 border-[var(--gold)] bg-white/80 p-4 shadow-xl backdrop-blur-sm">
            <div className="text-3xl font-extrabold text-[var(--matcha)]">{result.score}/100</div>
            <h2 className="mt-1 text-lg font-bold text-[var(--deep-teal)]">{result.verdict.split(" / ")[0]}</h2>
            <p className="mb-3 text-sm text-[var(--deep-teal)]">{result.verdict.split(" / ")[1]}</p>
            <div className="grid grid-cols-2 gap-2 text-left text-xs">
              <div className="rounded-lg bg-[var(--matcha)]/20 p-2"><span className="font-bold">⚡ Vibes</span><br />{Math.round(result.vibe * 0.4)}% match</div>
              <div className="rounded-lg bg-[var(--gold)]/20 p-2"><span className="font-bold">☀️🌙 Combo</span><br />{result.sunMoon[0]} + {result.sunMoon[1]}</div>
              <div className="col-span-2 rounded-lg bg-[var(--deep-teal)]/10 p-2"><span className="font-bold">🐉 Zodiac</span><br />{result.zodiacNote}</div>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => onShare?.(result)} className="rounded-full bg-[var(--deep-teal)] px-5 py-2 text-sm font-bold text-white shadow-md transition-transform active:scale-95">{T.result.share}</button>
            <button onClick={reset} className="rounded-full border-2 border-[var(--deep-teal)] bg-white px-5 py-2 text-sm font-bold text-[var(--deep-teal)] shadow-md transition-transform active:scale-95">{T.result.again}</button>
          </div>
        </div>
      );

    if (phase === "this" || phase === "sun") {
      const isThis = phase === "this";
      const qs = isThis ? T.thisOrThat.qs : T.sunMoon.qs;
      const q = qs[qIndex];
      const activeLabel = activePlayer === 1 ? labels.p1 : labels.p2;
      return (
        <div className="flex w-full max-w-sm flex-col items-center p-4">
          <div className="mb-2 rounded-full bg-white/70 px-4 py-1 text-center shadow-sm">
            <span className="text-xs font-bold text-[var(--deep-teal)]">{T.turn}: </span>
            <span className="text-sm font-bold text-[var(--matcha)]">{activeLabel}</span>
          </div>
          <div className="mb-4 w-full rounded-2xl border border-[var(--gold)] bg-white/90 p-4 shadow-xl backdrop-blur-md">
            <h3 className="text-center text-lg font-bold text-[var(--deep-teal)]">{isThis ? T.thisOrThat.title : T.sunMoon.title}</h3>
            <p className="mb-4 text-center text-xs text-gray-500">{(isThis ? T.thisOrThat.sub : T.sunMoon.sub)} ({qIndex + 1}/{qs.length})</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => handleChoice(0)} className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[var(--matcha)] px-4 py-3 font-semibold text-white shadow-md transition-transform active:scale-95">{q.ta} <span className="mx-2 text-white/50">|</span> {q.en}</button>
              <div className="text-center text-xs font-bold text-[var(--gold)]">அல்லது / OR</div>
              <button onClick={() => handleChoice(1)} className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[var(--deep-teal)] px-4 py-3 font-semibold text-white shadow-md transition-transform active:scale-95">{q.alt.ta} <span className="mx-2 text-white/50">|</span> {q.alt.en}</button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="relative mx-auto flex h-[640px] w-full max-w-md flex-col items-center justify-end overflow-hidden rounded-2xl pb-4"
      style={{
        ["--matcha" as any]: "#22C55E",
        ["--deep-teal" as any]: "#134E4A",
        ["--gold" as any]: "#EAB308",
        background: "linear-gradient(180deg, #E6FFFA 0%, #F0FDF4 100%)",
      }}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 2, 2]} intensity={0.8} />
          <Avatar position={[-1.2, phase === "result" ? -0.2 : 0, 0]} color="#134E4A" face={p1Face}
            sunMoon={p1.sunMoon.length === 3 ? sunTypeOf(p1) : null} zodiac={p1.zodiac} isActive={playing && activePlayer === 1} />
          <Avatar position={[1.2, phase === "result" ? -0.2 : 0, 0]} color="#22C55E" face={p2Face}
            sunMoon={p2.sunMoon.length === 3 ? sunTypeOf(p2) : null} zodiac={p2.zodiac} isActive={playing && activePlayer === 2} />
          {phase === "result" && <HeartBurst />}
        </Canvas>
      </div>

      {phase === "zodiac" && (
        <div className="absolute left-0 right-0 top-1/4 z-10 flex justify-center">
          <div className="w-[90%] max-w-sm rounded-2xl border border-[var(--gold)] bg-white/90 p-3 shadow-xl backdrop-blur-md">
            <h3 className="text-center text-lg font-bold text-[var(--deep-teal)]">{T.zodiac.title}</h3>
            <p className="mb-1 text-center text-xs font-semibold text-[var(--matcha)]">{T.turn}: {activePlayer === 1 ? labels.p1 : labels.p2}</p>
            <p className="mb-3 text-center text-xs text-gray-500">{T.zodiac.prompt}</p>
            <div className="grid grid-cols-4 gap-2">
              {ZODIAC_ANIMALS.map((a, i) => (
                <button key={i} onClick={() => handleZodiac(i)} className="flex items-center justify-center rounded-lg bg-[var(--matcha)]/10 p-2 text-3xl transition-transform hover:bg-[var(--matcha)]/30 active:scale-90">{a.emoji}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-20 mb-4 flex w-full justify-center">{renderUI()}</div>
    </div>
  );
}
