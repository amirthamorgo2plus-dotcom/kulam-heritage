"use client";

import { useEffect, useMemo, useState } from "react";
import { checklist } from "@/data/wedding";

interface CustomTask {
  id: string;
  phaseIndex: number;
  label: string;
}

const KEY_DONE = "kh_planner_v1_done";
const KEY_CUSTOM = "kh_planner_v1_custom";
const KEY_DATE = "kh_planner_v1_date";

// Stable id for a default task.
const defId = (p: number, t: number) => `d-${p}-${t}`;

export default function WeddingPlanner() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [custom, setCustom] = useState<CustomTask[]>([]);
  const [weddingDate, setWeddingDate] = useState("");
  const [drafts, setDrafts] = useState<Record<number, string>>({});

  // Load saved state after mount (avoids SSR/hydration mismatch).
  useEffect(() => {
    try {
      const d = localStorage.getItem(KEY_DONE);
      if (d) setDone(new Set(JSON.parse(d)));
      const c = localStorage.getItem(KEY_CUSTOM);
      if (c) setCustom(JSON.parse(c));
      const dt = localStorage.getItem(KEY_DATE);
      if (dt) setWeddingDate(dt);
    } catch {
      /* ignore corrupt storage */
    }
    setMounted(true);
  }, []);

  // Persist.
  useEffect(() => {
    if (mounted) localStorage.setItem(KEY_DONE, JSON.stringify(Array.from(done)));
  }, [done, mounted]);
  useEffect(() => {
    if (mounted) localStorage.setItem(KEY_CUSTOM, JSON.stringify(custom));
  }, [custom, mounted]);
  useEffect(() => {
    if (mounted) localStorage.setItem(KEY_DATE, weddingDate);
  }, [weddingDate, mounted]);

  // All tasks per phase = defaults + custom.
  const phases = useMemo(
    () =>
      checklist.map((stage, p) => {
        const defaults = stage.tasks.map((label, t) => ({
          id: defId(p, t),
          label,
          custom: false,
        }));
        const extra = custom
          .filter((c) => c.phaseIndex === p)
          .map((c) => ({ id: c.id, label: c.label, custom: true }));
        const tasks: { id: string; label: string; custom: boolean }[] = [
          ...defaults,
          ...extra,
        ];
        return { ...stage, tasks };
      }),
    [custom]
  );

  const allIds = useMemo(
    () => phases.flatMap((ph) => ph.tasks.map((t) => t.id)),
    [phases]
  );
  const total = allIds.length;
  const completed = allIds.filter((id) => done.has(id)).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const daysToGo = useMemo(() => {
    if (!weddingDate) return null;
    const target = new Date(weddingDate + "T00:00:00");
    if (isNaN(target.getTime())) return null;
    const now = new Date();
    const ms = target.getTime() - new Date(now.toDateString()).getTime();
    return Math.round(ms / 86400000);
  }, [weddingDate]);

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const addCustom = (p: number) => {
    const label = (drafts[p] || "").trim();
    if (!label) return;
    setCustom((prev) => [
      ...prev,
      { id: `c-${p}-${Date.now()}`, phaseIndex: p, label },
    ]);
    setDrafts((prev) => ({ ...prev, [p]: "" }));
  };

  const removeCustom = (id: string) => {
    setCustom((prev) => prev.filter((c) => c.id !== id));
    setDone((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const resetAll = () => {
    if (!confirm("Reset all progress, custom tasks and the date?")) return;
    setDone(new Set());
    setCustom([]);
    setWeddingDate("");
  };

  // Progress ring geometry.
  const R = 52;
  const C = 2 * Math.PI * R;

  if (!mounted) {
    return (
      <div className="h-40 animate-pulse rounded-xl border border-kulam-gold/40 bg-white" />
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard */}
      <div className="grid items-center gap-6 rounded-2xl border border-kulam-gold/40 bg-white p-6 shadow-sm sm:grid-cols-[auto_1fr]">
        <div className="relative mx-auto h-32 w-32">
          <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" stroke="#eee" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={pct === 100 ? "#15803d" : "#9a2d1f"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (pct / 100) * C}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-kulam-dark">{pct}%</span>
            <span className="text-xs text-stone-500">
              {completed}/{total}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Wedding / muhurtham date
            </label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="rounded border border-stone-300 px-3 py-1.5 text-sm"
            />
          </div>
          {daysToGo !== null && (
            <div className="text-lg font-semibold text-kulam">
              {daysToGo > 0
                ? `🗓️ ${daysToGo} days to go!`
                : daysToGo === 0
                ? "🎉 It's the big day!"
                : `Married ${Math.abs(daysToGo)} days ago 💍`}
            </div>
          )}
          {pct === 100 ? (
            <div className="rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-800">
              🎊 All tasks done — wishing you a blessed wedding!
            </div>
          ) : (
            <p className="text-sm text-stone-500">
              Tick tasks as you finish. Your progress is saved on this device.
            </p>
          )}
          <button
            onClick={resetAll}
            className="text-xs text-stone-400 underline hover:text-kulam"
          >
            Reset everything
          </button>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-5">
        {phases.map((ph, p) => {
          const phDone = ph.tasks.filter((t) => done.has(t.id)).length;
          const phPct = ph.tasks.length
            ? Math.round((phDone / ph.tasks.length) * 100)
            : 0;
          return (
            <section
              key={p}
              className="rounded-xl border border-kulam-gold/40 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-kulam text-sm font-bold text-white">
                    {p + 1}
                  </span>
                  <h3 className="font-bold text-kulam-dark">{ph.phase}</h3>
                  <span className="rounded-full bg-kulam/10 px-2 py-0.5 text-xs text-kulam">
                    {ph.timing}
                  </span>
                </div>
                <span className="text-xs font-semibold text-stone-500">
                  {phDone}/{ph.tasks.length}
                </span>
              </div>

              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
                <div
                  className={`h-full transition-all duration-500 ${
                    phPct === 100 ? "bg-green-600" : "bg-kulam-gold"
                  }`}
                  style={{ width: `${phPct}%` }}
                />
              </div>

              <ul className="mt-3 space-y-1">
                {ph.tasks.map((t) => {
                  const isDone = done.has(t.id);
                  return (
                    <li
                      key={t.id}
                      className="group flex items-center gap-2 rounded px-1 py-1 hover:bg-kulam/5"
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggle(t.id)}
                        className="h-4 w-4 flex-none accent-kulam"
                      />
                      <span
                        onClick={() => toggle(t.id)}
                        className={`flex-1 cursor-pointer text-sm ${
                          isDone ? "text-stone-400 line-through" : "text-stone-700"
                        }`}
                      >
                        {t.label}
                      </span>
                      {t.custom && (
                        <button
                          onClick={() => removeCustom(t.id)}
                          className="text-xs text-stone-300 opacity-0 transition group-hover:opacity-100 hover:text-red-500"
                          aria-label="Remove task"
                        >
                          ✕
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-2 flex gap-2">
                <input
                  value={drafts[p] || ""}
                  onChange={(e) =>
                    setDrafts((prev) => ({ ...prev, [p]: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && addCustom(p)}
                  placeholder="Add your own task…"
                  className="flex-1 rounded border border-stone-200 px-2 py-1 text-sm"
                />
                <button
                  onClick={() => addCustom(p)}
                  className="rounded bg-kulam/10 px-3 py-1 text-sm font-semibold text-kulam hover:bg-kulam/20"
                >
                  + Add
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
