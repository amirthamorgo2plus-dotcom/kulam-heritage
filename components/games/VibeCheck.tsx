"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Vibe Check ✨ — fun Gen-Z compatibility mini-game (Family / Friends).
// Layers: This-or-That + Sun/Moon sign compatibility + Chinese zodiac.
// Self-contained: @react-three/fiber + drei only, no external 3D assets.

import { useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export interface VibeResult {
  mode: "family" | "friends";
  score: number;
  vibesPct: number;
  sunScore: number;
  moonScore: number;
  zodiacScore: number;
  sun: [string, string];
  moon: [string, string];
  zodiac: [string, string];
  verdict: string;
}

// ---- Player labels & colors ----
const P1 = { color: "#8B5CF6", glow: "#A78BFA" }; // violet
const P2 = { color: "#06B6D4", glow: "#67E8F9" }; // cyan

// ---- This-or-That question banks (English, mode-specific) ----
const QUESTIONS: Record<"family" | "friends", { a: string; b: string }[]> = {
  family: [
    { a: "Sunday lunch — traditional feast 🍛", b: "Order in 🛵" },
    { a: "WhatsApp forwards — send daily 💌", b: "Mute them 🔕" },
    { a: "Festival prep — weeks ahead 📅", b: "Last minute 🎲" },
    { a: "Cooking — by the recipe 📖", b: "By hand & feel 🤲" },
    { a: "Free evening — TV serial 📺", b: "Reels & web series 🎬" },
  ],
  friends: [
    { a: "Night out — big party 🎉", b: "Chill cafe ☕" },
    { a: "Trip — planned itinerary 🗓️", b: "Spontaneous road trip 🚗" },
    { a: "Texting — instant reply ⚡", b: "Reply after 3 days 🐢" },
    { a: "Bills — split to the rupee 🧮", b: "\"I got it\" 💸" },
    { a: "Weekend — adventure 🏔️", b: "Netflix 🛋️" },
  ],
};

// ---- Western zodiac (sun & moon) ----
type Element = "fire" | "earth" | "air" | "water";
const SIGNS: { sym: string; name: string; el: Element }[] = [
  { sym: "♈", name: "Aries", el: "fire" }, { sym: "♉", name: "Taurus", el: "earth" },
  { sym: "♊", name: "Gemini", el: "air" }, { sym: "♋", name: "Cancer", el: "water" },
  { sym: "♌", name: "Leo", el: "fire" }, { sym: "♍", name: "Virgo", el: "earth" },
  { sym: "♎", name: "Libra", el: "air" }, { sym: "♏", name: "Scorpio", el: "water" },
  { sym: "♐", name: "Sagittarius", el: "fire" }, { sym: "♑", name: "Capricorn", el: "earth" },
  { sym: "♒", name: "Aquarius", el: "air" }, { sym: "♓", name: "Pisces", el: "water" },
];
function elementScore(a: number, b: number): number {
  if (a < 0 || b < 0) return 70;
  const e1 = SIGNS[a].el, e2 = SIGNS[b].el;
  const key = [e1, e2].sort().join("-");
  const table: Record<string, number> = {
    "air-fire": 95, "earth-water": 95,
    "air-air": 82, "earth-earth": 82, "fire-fire": 82, "water-water": 82,
    "earth-fire": 62, "air-water": 62,
    "earth-air": 45, "fire-water": 42,
  };
  return table[key] ?? 70;
}

// ---- Chinese zodiac ----
const ANIMALS = [
  { e: "🐀", n: "Rat" }, { e: "🐂", n: "Ox" }, { e: "🐅", n: "Tiger" }, { e: "🐇", n: "Rabbit" },
  { e: "🐉", n: "Dragon" }, { e: "🐍", n: "Snake" }, { e: "🐎", n: "Horse" }, { e: "🐐", n: "Goat" },
  { e: "🐒", n: "Monkey" }, { e: "🐓", n: "Rooster" }, { e: "🐕", n: "Dog" }, { e: "🐖", n: "Pig" },
];
function zodiacScore(a: number, b: number): number {
  if (a < 0 || b < 0) return 70;
  const trines = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]];
  const friends = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
  const clashes = [[0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]];
  for (const g of trines) if (g.includes(a) && g.includes(b)) return 100;
  for (const p of friends) if ((p[0] === a && p[1] === b) || (p[1] === a && p[0] === b)) return 95;
  for (const p of clashes) if ((p[0] === a && p[1] === b) || (p[1] === a && p[0] === b)) return 45;
  return 72;
}

const VERDICTS = [
  { min: 85, t: "Soulmates! 💚 instant goals" },
  { min: 70, t: "Strong vibes 💫 this one's a keeper" },
  { min: 55, t: "Cute chaos — works with chai ☕" },
  { min: 0, t: "Opposites… entertaining for the group 😂" },
];

interface PD { answers: number[]; sun: number | null; moon: number | null; animal: number | null; }
const empty = (): PD => ({ answers: [], sun: null, moon: null, animal: null });

// ---- 3D avatar ----
function Avatar({ position, color, glow, face, isActive, animal }: {
  position: [number, number, number]; color: string; glow: string;
  face: string; isActive: boolean; animal: number | null;
}) {
  const ref = useRef<any>(null);
  const ringRef = useRef<any>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 2) * 0.05;
      const t = isActive ? 1.12 : 0.88;
      ref.current.scale.lerp(new THREE.Vector3(t, t, t), 0.1);
    }
    if (ringRef.current) ringRef.current.rotation.z = s.clock.elapsedTime * 2;
  });
  return (
    <group position={position} ref={ref}>
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 1, 20]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <coneGeometry args={[0.22, 0.3, 16]} />
        <meshStandardMaterial color="#EAB308" flatShading />
      </mesh>
      <Html position={[0, 0.3, 0.51]} center distanceFactor={2} occlude>
        <div style={{ fontSize: "30px", userSelect: "none" }}>{face}</div>
      </Html>
      {isActive && (
        <mesh ref={ringRef} position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.06, 10, 40]} />
          <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={1.1} />
        </mesh>
      )}
      {animal !== null && (
        <Html position={[0, 1.45, 0]} center distanceFactor={3}>
          <div style={{ fontSize: "34px", userSelect: "none" }}>{ANIMALS[animal].e}</div>
        </Html>
      )}
    </group>
  );
}
function Hearts() {
  const hs = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i, x: (Math.random() - 0.5) * 2.4, y: (Math.random() - 0.5) * 2.4, z: (Math.random() - 0.5) * 1.5,
    s: 0.08 + Math.random() * 0.16,
  })), []);
  return (
    <group>
      {hs.map((h) => (
        <mesh key={h.id} position={[h.x, h.y, h.z]}>
          <sphereGeometry args={[h.s, 8, 8]} />
          <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={0.6} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// ---- result charts (pure SVG/CSS) ----
function bandColor(v: number) { return v >= 85 ? "#22C55E" : v >= 70 ? "#06B6D4" : v >= 55 ? "#EAB308" : "#FB7185"; }
function Donut({ value }: { value: number }) {
  const r = 52, c = 2 * Math.PI * r, off = c * (1 - value / 100), col = bandColor(value);
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" className="mx-auto">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#E5E7EB" strokeWidth="12" />
      <circle cx="65" cy="65" r={r} fill="none" stroke={col} strokeWidth="12" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 65 65)" />
      <text x="65" y="60" textAnchor="middle" fontSize="30" fontWeight="800" fill={col}>{value}</text>
      <text x="65" y="82" textAnchor="middle" fontSize="12" fill="#6B7280">/ 100</text>
    </svg>
  );
}
function Bar({ icon, label, value, sub }: { icon: string; label: string; value: number; sub: string }) {
  return (
    <div className="text-left">
      <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
        <span>{icon} {label} <span className="font-normal text-stone-400">· {sub}</span></span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-stone-200">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: bandColor(value) }} />
      </div>
    </div>
  );
}

type Phase = "intro" | "this" | "signs" | "zodiac" | "result";

export default function VibeCheck({ mode = "family", onComplete, onShare }: {
  mode?: "family" | "friends"; onComplete?: (r: VibeResult) => void; onShare?: (r: VibeResult) => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [active, setActive] = useState<1 | 2>(1);
  const [qi, setQi] = useState(0);
  const [signStep, setSignStep] = useState<0 | 1>(0); // 0=sun, 1=moon
  const [p1, setP1] = useState<PD>(empty());
  const [p2, setP2] = useState<PD>(empty());
  const [result, setResult] = useState<VibeResult | null>(null);

  const labels = mode === "friends"
    ? { p1: "You", p2: "Your BFF", f1: "😎", f2: "🫶" }
    : { p1: "Mother-in-law", p2: "Daughter-in-law", f1: "👵", f2: "👰" };
  const setP = active === 1 ? setP1 : setP2;
  const cur = active === 1 ? P1 : P2;

  const choose = (c: number) => {
    setP((d) => ({ ...d, answers: [...d.answers, c] }));
    if (qi < QUESTIONS[mode].length - 1) { setQi(qi + 1); return; }
    setQi(0);
    if (active === 1) setActive(2);
    else { setActive(1); setPhase("signs"); setSignStep(0); }
  };

  const pickSign = (i: number) => {
    if (signStep === 0) {
      setP((d) => ({ ...d, sun: i })); setSignStep(1); return;
    }
    setP((d) => ({ ...d, moon: i }));
    setSignStep(0);
    if (active === 1) setActive(2);
    else { setActive(1); setPhase("zodiac"); }
  };

  const pickAnimal = (i: number) => {
    if (active === 1) { setP1((d) => ({ ...d, animal: i })); setActive(2); }
    else { const f = { ...p2, animal: i }; setP2(f); finish(f); }
  };

  const finish = (p2f: PD) => {
    let m = 0; for (let i = 0; i < 5; i++) if (p1.answers[i] === p2f.answers[i]) m++;
    const vibes = Math.round((m / 5) * 100);
    const sun = elementScore(p1.sun ?? -1, p2f.sun ?? -1);
    const moon = elementScore(p1.moon ?? -1, p2f.moon ?? -1);
    const zo = zodiacScore(p1.animal ?? -1, p2f.animal ?? -1);
    const score = Math.round(vibes * 0.3 + sun * 0.25 + moon * 0.2 + zo * 0.25);
    const verdict = (VERDICTS.find((v) => score >= v.min) ?? VERDICTS[3]).t;
    const r: VibeResult = {
      mode, score, vibesPct: vibes, sunScore: sun, moonScore: moon, zodiacScore: zo,
      sun: [SIGNS[p1.sun ?? 0].name, SIGNS[p2f.sun ?? 0].name],
      moon: [SIGNS[p1.moon ?? 0].name, SIGNS[p2f.moon ?? 0].name],
      zodiac: [ANIMALS[p1.animal ?? 0].n, ANIMALS[p2f.animal ?? 0].n],
      verdict,
    };
    setResult(r); setPhase("result"); onComplete?.(r);
  };

  const reset = () => { setP1(empty()); setP2(empty()); setActive(1); setQi(0); setSignStep(0); setResult(null); setPhase("intro"); };

  const playing = phase === "this" || phase === "signs" || phase === "zodiac";

  // Turn card near each player
  const PlayerCard = ({ side }: { side: 1 | 2 }) => {
    const isAct = playing && active === side;
    const col = side === 1 ? P1 : P2;
    return (
      <div className={`flex flex-1 flex-col items-center rounded-xl border-2 px-2 py-1.5 transition ${isAct ? "scale-105 shadow-md" : "opacity-60"}`}
        style={{ borderColor: col.color, background: isAct ? `${col.color}1a` : "#fff" }}>
        <span className="text-xl">{side === 1 ? labels.f1 : labels.f2}</span>
        <span className="text-[11px] font-bold" style={{ color: col.color }}>{side === 1 ? labels.p1 : labels.p2}</span>
        {isAct && <span className="text-[10px] font-semibold text-stone-500">your turn 👇</span>}
      </div>
    );
  };

  return (
    <div className="relative mx-auto flex h-[660px] w-full max-w-md flex-col overflow-hidden rounded-2xl"
      style={{ background: "linear-gradient(180deg,#EEF2FF 0%,#ECFEFF 100%)" }}>

      {/* turn cards */}
      {phase !== "intro" && phase !== "result" && (
        <div className="z-20 flex gap-2 px-3 pt-3">
          <PlayerCard side={1} /><PlayerCard side={2} />
        </div>
      )}

      {/* 3D scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 3, 2]} intensity={0.7} />
          <Avatar position={[-1.2, phase === "result" ? -0.2 : 0, 0]} color={P1.color} glow={P1.glow}
            face={labels.f1} isActive={playing && active === 1} animal={p1.animal} />
          <Avatar position={[1.2, phase === "result" ? -0.2 : 0, 0]} color={P2.color} glow={P2.glow}
            face={labels.f2} isActive={playing && active === 2} animal={p2.animal} />
          {phase === "result" && <Hearts />}
        </Canvas>
      </div>

      {/* overlays */}
      <div className="relative z-20 mt-auto flex w-full flex-col items-center px-3 pb-4">
        {phase === "intro" && (
          <div className="mb-3 flex flex-col items-center rounded-2xl bg-white/85 p-5 text-center shadow-lg backdrop-blur">
            <h1 className="font-serif text-3xl font-bold text-kulam-dark">Vibe Check ✨</h1>
            <p className="mt-2 max-w-xs text-sm text-stone-600">This-or-That ⚡ + Sun & Moon signs ☀️🌙 + Chinese zodiac 🐉. Play, laugh, share!</p>
            <button onClick={() => setPhase("this")} className="mt-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-7 py-3 font-bold text-white shadow-lg active:scale-95">Start</button>
          </div>
        )}

        {phase === "this" && (
          <div className="mb-2 w-full rounded-2xl border bg-white/90 p-4 shadow-xl backdrop-blur" style={{ borderColor: cur.color }}>
            <p className="mb-3 text-center text-xs font-semibold text-stone-500">This or That ⚡ ({qi + 1}/5)</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => choose(0)} className="min-h-[52px] rounded-xl px-4 py-3 text-sm font-semibold text-white shadow active:scale-95" style={{ background: cur.color }}>{QUESTIONS[mode][qi].a}</button>
              <div className="text-center text-xs font-bold text-stone-400">— OR —</div>
              <button onClick={() => choose(1)} className="min-h-[52px] rounded-xl px-4 py-3 text-sm font-semibold text-white shadow active:scale-95" style={{ background: cur.glow }}>{QUESTIONS[mode][qi].b}</button>
            </div>
          </div>
        )}

        {phase === "signs" && (
          <div className="mb-2 w-full rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur" style={{ borderColor: cur.color }}>
            <p className="text-center text-sm font-bold text-kulam-dark">
              {signStep === 0 ? "Pick your Sun ☀️ sign" : "Pick your Moon 🌙 sign"}
            </p>
            <p className="mb-3 text-center text-[11px] text-stone-400">{active === 1 ? labels.p1 : labels.p2}</p>
            <div className="grid grid-cols-4 gap-2">
              {SIGNS.map((s, i) => (
                <button key={i} onClick={() => pickSign(i)}
                  className="flex flex-col items-center rounded-xl border border-stone-200 bg-gradient-to-b from-white to-stone-50 py-2 active:scale-90 hover:border-violet-300">
                  <span className="text-xl">{s.sym}</span>
                  <span className="text-[9px] text-stone-500">{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "zodiac" && (
          <div className="mb-2 w-full rounded-2xl border bg-white/95 p-3 shadow-xl backdrop-blur" style={{ borderColor: cur.color }}>
            <p className="text-center text-sm font-bold text-kulam-dark">Chinese Zodiac 🐉</p>
            <p className="mb-2 text-center text-[11px] text-stone-400">{active === 1 ? labels.p1 : labels.p2} · pick your sign</p>
            <ZodiacWheel onPick={pickAnimal} color={cur.color} />
          </div>
        )}

        {phase === "result" && result && (
          <div className="mb-2 w-full rounded-2xl border-2 border-violet-300 bg-white/95 p-4 text-center shadow-xl backdrop-blur">
            <Donut value={result.score} />
            <p className="mt-1 text-base font-bold text-kulam-dark">{result.verdict}</p>
            <div className="mt-3 space-y-2">
              <Bar icon="⚡" label="Vibes" value={result.vibesPct} sub="answers matched" />
              <Bar icon="☀️" label="Sun signs" value={result.sunScore} sub={`${result.sun[0]} + ${result.sun[1]}`} />
              <Bar icon="🌙" label="Moon signs" value={result.moonScore} sub={`${result.moon[0]} + ${result.moon[1]}`} />
              <Bar icon="🐉" label="Chinese" value={result.zodiacScore} sub={`${result.zodiac[0]} + ${result.zodiac[1]}`} />
            </div>
            <div className="mt-4 flex justify-center gap-3">
              <button onClick={() => onShare?.(result)} className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-2 text-sm font-bold text-white shadow active:scale-95">Share 📤</button>
              <button onClick={reset} className="rounded-full border-2 border-stone-300 bg-white px-5 py-2 text-sm font-bold text-stone-600 shadow active:scale-95">Play again 🔁</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Circular Chinese-zodiac wheel
function ZodiacWheel({ onPick, color }: { onPick: (i: number) => void; color: string }) {
  const size = 260, R = 100, center = size / 2;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div className="absolute rounded-full" style={{ inset: 18, border: `2px dashed ${color}55` }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[10px] font-semibold text-stone-400">
        tap your<br />animal 🐉
      </div>
      {ANIMALS.map((a, i) => {
        const ang = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const x = center + Math.cos(ang) * R, y = center + Math.sin(ang) * R;
        return (
          <button key={i} onClick={() => onPick(i)}
            className="absolute flex h-12 w-12 flex-col items-center justify-center rounded-full border border-stone-200 bg-white shadow-sm active:scale-90"
            style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}>
            <span className="text-xl leading-none">{a.e}</span>
            <span className="text-[7px] text-stone-400">{a.n}</span>
          </button>
        );
      })}
    </div>
  );
}
