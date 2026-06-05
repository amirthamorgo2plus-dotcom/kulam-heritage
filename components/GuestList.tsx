"use client";

import { useEffect, useMemo, useState } from "react";

interface Guest {
  id: string;
  name: string;
  side: "Bride" | "Groom" | "";
  pax: number;
  phone: string;
  relation: string;
  status: "To invite" | "Invited" | "Confirmed" | "Declined";
  note: string;
}

const KEY = "kh_guests_v1";

const blankForm = {
  name: "",
  side: "" as Guest["side"],
  pax: 1,
  phone: "",
  relation: "",
};

const statuses: Guest["status"][] = ["To invite", "Invited", "Confirmed", "Declined"];

const statusColor: Record<Guest["status"], string> = {
  "To invite": "bg-stone-100 text-stone-600",
  Invited: "bg-amber-100 text-amber-800",
  Confirmed: "bg-green-100 text-green-800",
  Declined: "bg-red-100 text-red-700",
};

export default function GuestList() {
  const [mounted, setMounted] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [form, setForm] = useState(blankForm);
  const [fSide, setFSide] = useState("All");
  const [fStatus, setFStatus] = useState("All");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setGuests(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(KEY, JSON.stringify(guests));
  }, [guests, mounted]);

  const addGuest = () => {
    if (!form.name.trim()) return;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());
    setGuests((prev) => [
      ...prev,
      {
        id,
        name: form.name.trim(),
        side: form.side,
        pax: Math.max(1, Number(form.pax) || 1),
        phone: form.phone.trim(),
        relation: form.relation.trim(),
        status: "To invite",
        note: "",
      },
    ]);
    setForm(blankForm);
  };

  const update = (id: string, patch: Partial<Guest>) =>
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  const remove = (id: string) =>
    setGuests((prev) => prev.filter((g) => g.id !== id));

  const visible = useMemo(
    () =>
      guests.filter(
        (g) =>
          (fSide === "All" || g.side === fSide) &&
          (fStatus === "All" || g.status === fStatus)
      ),
    [guests, fSide, fStatus]
  );

  const stats = useMemo(() => {
    const sum = (arr: Guest[]) => arr.reduce((n, g) => n + (g.pax || 1), 0);
    return {
      heads: guests.length,
      pax: sum(guests),
      confirmed: sum(guests.filter((g) => g.status === "Confirmed")),
      bride: sum(guests.filter((g) => g.side === "Bride")),
      groom: sum(guests.filter((g) => g.side === "Groom")),
    };
  }, [guests]);

  const exportCsv = () => {
    const header = ["Name", "Side", "Pax", "Phone", "Relation", "Status", "Note"];
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = guests.map((g) =>
      [g.name, g.side, g.pax, g.phone, g.relation, g.status, g.note].map(esc).join(",")
    );
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "guest-list.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted)
    return <div className="h-40 animate-pulse rounded-xl border border-kulam-gold/40 bg-white" />;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total guests (pax)", value: stats.pax },
          { label: "Confirmed", value: stats.confirmed },
          { label: "Bride's side", value: stats.bride },
          { label: "Groom's side", value: stats.groom },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-kulam-gold/40 bg-white p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-kulam-dark">{s.value}</div>
            <div className="text-xs text-stone-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add form */}
      <div className="rounded-xl border border-kulam/30 bg-white p-4">
        <h3 className="mb-3 font-bold text-kulam-dark">Add a guest</h3>
        <div className="grid gap-2 sm:grid-cols-5">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && addGuest()}
            placeholder="Name *"
            className="rounded border border-stone-300 px-2 py-1.5 text-sm sm:col-span-2"
          />
          <select
            value={form.side}
            onChange={(e) => setForm({ ...form, side: e.target.value as Guest["side"] })}
            className="rounded border border-stone-300 px-2 py-1.5 text-sm"
          >
            <option value="">Side…</option>
            <option value="Bride">Bride&apos;s side</option>
            <option value="Groom">Groom&apos;s side</option>
          </select>
          <input
            type="number"
            min={1}
            value={form.pax}
            onChange={(e) => setForm({ ...form, pax: Number(e.target.value) })}
            placeholder="Pax"
            className="rounded border border-stone-300 px-2 py-1.5 text-sm"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="rounded border border-stone-300 px-2 py-1.5 text-sm"
          />
          <input
            value={form.relation}
            onChange={(e) => setForm({ ...form, relation: e.target.value })}
            placeholder="Relation (e.g. uncle, friend)"
            className="rounded border border-stone-300 px-2 py-1.5 text-sm sm:col-span-4"
          />
          <button
            onClick={addGuest}
            className="rounded bg-kulam px-4 py-1.5 text-sm font-semibold text-white hover:bg-kulam-dark"
          >
            + Add guest
          </button>
        </div>
      </div>

      {/* Filters + export */}
      <div className="flex flex-wrap items-center gap-3">
        <select value={fSide} onChange={(e) => setFSide(e.target.value)} className="rounded border border-stone-300 px-2 py-1.5 text-sm">
          <option>All</option>
          <option value="Bride">Bride&apos;s side</option>
          <option value="Groom">Groom&apos;s side</option>
        </select>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} className="rounded border border-stone-300 px-2 py-1.5 text-sm">
          <option>All</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span className="text-sm text-stone-500">{visible.length} shown</span>
        <button
          onClick={exportCsv}
          disabled={guests.length === 0}
          className="ml-auto rounded border border-kulam/40 px-3 py-1.5 text-sm font-semibold text-kulam hover:bg-kulam/10 disabled:opacity-40"
        >
          ⬇ Export CSV (backup)
        </button>
      </div>

      {/* List */}
      <div className="overflow-x-auto rounded-xl border border-kulam-gold/40 bg-white shadow-sm">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="bg-kulam/5 text-left text-stone-500">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Side</th>
              <th className="px-3 py-2">Pax</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Relation</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((g) => (
              <tr key={g.id} className="border-t border-stone-100 hover:bg-kulam/5">
                <td className="px-3 py-2 font-semibold text-kulam-dark">{g.name}</td>
                <td className="px-3 py-2 text-stone-600">{g.side || "—"}</td>
                <td className="px-3 py-2">{g.pax}</td>
                <td className="px-3 py-2 text-stone-600">{g.phone || "—"}</td>
                <td className="px-3 py-2 text-stone-600">{g.relation || "—"}</td>
                <td className="px-3 py-2">
                  <select
                    value={g.status}
                    onChange={(e) => update(g.id, { status: e.target.value as Guest["status"] })}
                    className={`rounded px-2 py-1 text-xs font-semibold ${statusColor[g.status]}`}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => remove(g.id)}
                    className="text-stone-300 hover:text-red-500"
                    aria-label="Remove guest"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-stone-400">
                  No guests yet — add your first above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
