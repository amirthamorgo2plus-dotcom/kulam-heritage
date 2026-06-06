"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Stop } from "@/components/GuestMap";

const GuestMap = dynamic(() => import("@/components/GuestMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-lg border border-kulam-gold/40 bg-white text-stone-400">
      Loading map…
    </div>
  ),
});

type Side = "Bride" | "Groom" | "";
type RSVP = "To invite" | "Invited" | "Confirmed" | "Declined";
type Invite = "Pending" | "Given";

interface Guest {
  id: string;
  name: string;
  side: Side;
  pax: number;
  phone: string;
  relation: string;
  address: string;
  lat?: number;
  lng?: number;
  status: RSVP;
  invite: Invite;
}

const KEY = "kh_guests_v1";
const statuses: RSVP[] = ["To invite", "Invited", "Confirmed", "Declined"];

const blankForm = { name: "", side: "" as Side, pax: 1, phone: "", relation: "", address: "", coords: "" };

// Pull lat/lng out of a Google Maps link or a plain "lat, lng" string.
function parseCoords(s: string): { lat: number; lng: number } | null {
  if (!s) return null;
  const at = s.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (at) return { lat: +at[1], lng: +at[2] };
  const q = s.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (q) return { lat: +q[1], lng: +q[2] };
  const any = s.match(/(-?\d{1,2}\.\d{3,})\s*,\s*(-?\d{1,3}\.\d{3,})/);
  if (any) return { lat: +any[1], lng: +any[2] };
  return null;
}

// Geocode an address via OpenStreetMap, trying a few variants for a better hit.
async function geocode(q: string): Promise<{ lat: number; lng: number } | null> {
  const variants = [
    `${q}, Tamil Nadu, India`,
    `${q}, India`,
    q,
    `${q.split(",").pop()?.trim()}, Tamil Nadu, India`, // last part = town/city
  ];
  for (const v of variants) {
    if (!v.trim()) continue;
    try {
      const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
        encodeURIComponent(v);
      const r = await fetch(url, { headers: { Accept: "application/json" } });
      const j = await r.json();
      if (j[0]) return { lat: parseFloat(j[0].lat), lng: parseFloat(j[0].lon) };
    } catch {
      /* try next */
    }
  }
  return null;
}

// Nearest-neighbour ordering for a simple delivery route.
function routeOrder(pts: Guest[]): Guest[] {
  if (pts.length <= 2) return pts;
  const used = new Set<number>([0]);
  const order = [0];
  while (order.length < pts.length) {
    const last = pts[order[order.length - 1]];
    let best = -1;
    let bd = Infinity;
    pts.forEach((p, i) => {
      if (!used.has(i)) {
        const d = (p.lat! - last.lat!) ** 2 + (p.lng! - last.lng!) ** 2;
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
    });
    used.add(best);
    order.push(best);
  }
  return order.map((i) => pts[i]);
}

export default function GuestList() {
  const [mounted, setMounted] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [form, setForm] = useState(blankForm);
  const [sideTab, setSideTab] = useState<"All" | "Bride" | "Groom">("All");
  const [showRoute, setShowRoute] = useState(false);
  const [busy, setBusy] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Guest>[];
        setGuests(
          parsed.map((g) => ({
            id: g.id || String(Math.random()),
            name: g.name || "",
            side: (g.side as Side) || "",
            pax: g.pax || 1,
            phone: g.phone || "",
            relation: g.relation || "",
            address: g.address || "",
            lat: g.lat,
            lng: g.lng,
            status: (g.status as RSVP) || "To invite",
            invite: (g.invite as Invite) || "Pending",
          }))
        );
      }
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(KEY, JSON.stringify(guests));
  }, [guests, mounted]);

  const sideFilter = (g: Guest) => sideTab === "All" || g.side === sideTab;
  const filtered = useMemo(() => guests.filter(sideFilter), [guests, sideTab]);

  const located = useMemo(() => filtered.filter((g) => g.lat != null && g.lng != null), [filtered]);
  const stops: Guest[] = useMemo(
    () => (showRoute ? routeOrder(located) : located),
    [located, showRoute]
  );

  const stat = useMemo(() => {
    const pax = (arr: Guest[]) => arr.reduce((n, g) => n + (g.pax || 1), 0);
    return {
      totalPax: pax(filtered),
      confirmed: pax(filtered.filter((g) => g.status === "Confirmed")),
      given: filtered.filter((g) => g.invite === "Given").length,
      pending: filtered.filter((g) => g.invite === "Pending").length,
    };
  }, [filtered]);

  const givenPct = filtered.length ? Math.round((stat.given / filtered.length) * 100) : 0;

  const update = (id: string, patch: Partial<Guest>) =>
    setGuests((p) => p.map((g) => (g.id === id ? { ...g, ...patch } : g)));
  const remove = (id: string) => setGuests((p) => p.filter((g) => g.id !== id));

  const submit = () => {
    if (!form.name.trim()) return;
    const pasted = parseCoords(form.coords);
    const fields = {
      name: form.name.trim(),
      side: form.side,
      pax: Math.max(1, Number(form.pax) || 1),
      phone: form.phone.trim(),
      relation: form.relation.trim(),
      address: form.address.trim(),
    };
    if (editId) {
      const orig = guests.find((g) => g.id === editId);
      const addrChanged = orig && orig.address !== fields.address;
      update(editId, {
        ...fields,
        // Pasted coords win; else clear coords if the address text changed.
        ...(pasted ? pasted : addrChanged ? { lat: undefined, lng: undefined } : {}),
      });
      setEditId(null);
    } else {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
      const side: Side = fields.side || (sideTab === "All" ? "" : sideTab);
      setGuests((p) => [
        ...p,
        { id, ...fields, side, status: "To invite", invite: "Pending", ...(pasted || {}) },
      ]);
    }
    setForm(blankForm);
  };

  // Bulk import: paste one guest per line as "Name, Address" (or "Name, Phone, Address").
  const importList = () => {
    const side: Side = sideTab === "All" ? "" : sideTab;
    const newGuests: Guest[] = [];
    importText.split("\n").forEach((line) => {
      const parts = line.split(",").map((s) => s.trim()).filter(Boolean);
      if (!parts.length) return;
      const name = parts[0];
      if (!name) return;
      // If a part looks like a phone, treat it as phone; rest = address.
      const phonePart = parts.slice(1).find((p) => /^[+\d][\d\s-]{6,}$/.test(p));
      const address = parts.slice(1).filter((p) => p !== phonePart).join(", ");
      newGuests.push({
        id: (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())),
        name,
        side,
        pax: 1,
        phone: phonePart || "",
        relation: "",
        address,
        status: "To invite",
        invite: "Pending",
      });
    });
    if (newGuests.length) setGuests((p) => [...p, ...newGuests]);
    setImportText("");
    setShowImport(false);
    if (newGuests.length)
      alert(`Added ${newGuests.length} guests. Now tap "Locate all" to place them on the map.`);
  };

  const startEdit = (g: Guest) => {
    setEditId(g.id);
    setForm({
      name: g.name,
      side: g.side,
      pax: g.pax,
      phone: g.phone,
      relation: g.relation,
      address: g.address,
      coords: g.lat != null && g.lng != null ? `${g.lat}, ${g.lng}` : "",
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(blankForm);
  };

  const locate = async (g: Guest) => {
    if (!g.address.trim()) return;
    setBusy(g.id);
    const c = await geocode(g.address);
    if (c) update(g.id, { lat: c.lat, lng: c.lng });
    else {
      // Drop a pin on Coimbatore so the user can drag it to the exact spot.
      update(g.id, { lat: 11.0168, lng: 76.9558 });
      alert(
        "Couldn't find that address exactly — I placed a pin near Coimbatore. Drag it on the map to the right spot."
      );
    }
    setBusy("");
  };

  const locateAll = async () => {
    const todo = filtered.filter((g) => g.address.trim() && g.lat == null);
    for (const g of todo) {
      setBusy(g.id);
      const c = await geocode(g.address);
      if (c) update(g.id, { lat: c.lat, lng: c.lng });
      await new Promise((r) => setTimeout(r, 1100)); // be kind to the free geocoder
    }
    setBusy("");
  };

  const mapsUrl =
    stops.length > 0
      ? "https://www.google.com/maps/dir/" + stops.map((s) => `${s.lat},${s.lng}`).join("/")
      : "";

  const exportCsv = () => {
    const head = ["Name", "Side", "Pax", "Phone", "Relation", "Address", "RSVP", "Invitation"];
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = filtered.map((g) =>
      [g.name, g.side, g.pax, g.phone, g.relation, g.address, g.status, g.invite].map(esc).join(",")
    );
    const blob = new Blob([[head.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
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
      {/* Side tabs */}
      <div className="flex gap-2">
        {(["All", "Bride", "Groom"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSideTab(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              sideTab === s
                ? "bg-kulam text-white shadow"
                : "bg-white text-kulam ring-1 ring-kulam/30 hover:bg-kulam/5"
            }`}
          >
            {s === "All" ? "Everyone" : `${s}'s side`}
          </button>
        ))}
      </div>

      {/* Summary + invitation chart */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total guests (pax)", value: stat.totalPax },
          { label: "RSVP confirmed", value: stat.confirmed },
          { label: "Invitations given", value: stat.given },
          { label: "Pending", value: stat.pending },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-kulam-gold/40 bg-white p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-kulam-dark">{s.value}</div>
            <div className="text-xs text-stone-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-kulam-gold/40 bg-white p-4">
        <div className="mb-1 flex justify-between text-sm font-semibold">
          <span>Invitation progress</span>
          <span className="text-kulam">{givenPct}% given</span>
        </div>
        <div className="flex h-4 overflow-hidden rounded-full bg-stone-100">
          <div className="bg-kulam-emerald" style={{ width: `${givenPct}%` }} />
          <div className="bg-kulam-gold" style={{ width: `${100 - givenPct}%` }} />
        </div>
        <div className="mt-1 flex gap-4 text-xs text-stone-500">
          <span>🟢 Given: {stat.given}</span>
          <span>🟠 Pending: {stat.pending}</span>
        </div>
      </div>

      {/* Add / edit guest */}
      <div className={`rounded-xl border bg-white p-4 ${editId ? "border-kulam ring-2 ring-kulam/30" : "border-kulam/30"}`}>
        <h3 className="mb-3 font-bold text-kulam-dark">
          {editId ? "✏️ Edit guest" : "Add a guest"}{" "}
          {!editId && sideTab !== "All" && <span className="text-kulam">({sideTab}&apos;s side)</span>}
        </h3>
        <div className="grid gap-2 sm:grid-cols-6">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name *" className="rounded border border-stone-300 px-2 py-1.5 text-sm sm:col-span-2" />
          <select value={form.side} onChange={(e) => setForm({ ...form, side: e.target.value as Side })} className="rounded border border-stone-300 px-2 py-1.5 text-sm">
            <option value="">Side…</option>
            <option value="Bride">Bride&apos;s</option>
            <option value="Groom">Groom&apos;s</option>
          </select>
          <input type="number" min={1} value={form.pax} onChange={(e) => setForm({ ...form, pax: Number(e.target.value) })} placeholder="Pax" className="rounded border border-stone-300 px-2 py-1.5 text-sm" />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded border border-stone-300 px-2 py-1.5 text-sm sm:col-span-2" />
          <input value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} placeholder="Relation (uncle, friend…)" className="rounded border border-stone-300 px-2 py-1.5 text-sm sm:col-span-3" />
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="Address / area / city (for the map)" className="rounded border border-stone-300 px-2 py-1.5 text-sm sm:col-span-3" />
          <input value={form.coords} onChange={(e) => setForm({ ...form, coords: e.target.value })} placeholder="📌 Google Maps link or lat, lng (exact pin)" className="rounded border border-stone-300 px-2 py-1.5 text-sm sm:col-span-4" />
          <div className="flex gap-2">
            <button onClick={submit} className="rounded bg-kulam px-4 py-1.5 text-sm font-semibold text-white hover:bg-kulam-dark">
              {editId ? "Save" : "+ Add"}
            </button>
            {editId && (
              <button onClick={cancelEdit} className="rounded border border-stone-300 px-3 py-1.5 text-sm font-semibold text-stone-500 hover:bg-stone-50">
                Cancel
              </button>
            )}
          </div>
        </div>
        <p className="mt-2 text-xs text-stone-400">
          * Name is required. Add the <strong>town/city</strong> for the map, or paste a{" "}
          <strong>Google Maps link / lat, lng</strong> for an exact pin.
        </p>
        <div className="mt-2">
          <button onClick={() => setShowImport((v) => !v)} className="text-sm font-semibold text-kulam underline">
            {showImport ? "Close import" : "📋 Paste a whole list"}
          </button>
        </div>
        {showImport && (
          <div className="mt-2 rounded-lg border border-kulam/30 bg-kulam/5 p-3">
            <p className="mb-1 text-xs text-stone-600">
              One guest per line, as <strong>Name, Address</strong> (phone optional). Side ={" "}
              {sideTab === "All" ? "(none — pick a side tab first to auto-tag)" : `${sideTab}'s`}.
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={5}
              placeholder={"Murugan Anna, RS Puram, Coimbatore\nLakshmi Athai, 98xxxxxxx, Gandhipuram, Coimbatore"}
              className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm"
            />
            <button onClick={importList} className="mt-2 rounded bg-kulam px-4 py-1.5 text-sm font-semibold text-white hover:bg-kulam-dark">
              Add these guests
            </button>
          </div>
        )}
      </div>

      {/* Map + route */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-bold text-kulam-dark">Map &amp; delivery route</h3>
          <span className="text-sm text-stone-500">{located.length} on map</span>
          <button onClick={locateAll} className="rounded border border-kulam/40 px-3 py-1 text-sm font-semibold text-kulam hover:bg-kulam/10">
            📍 Locate all
          </button>
          <button
            onClick={() => setShowRoute((v) => !v)}
            disabled={located.length < 2}
            className={`rounded px-3 py-1 text-sm font-semibold disabled:opacity-40 ${showRoute ? "bg-kulam text-white" : "border border-kulam/40 text-kulam hover:bg-kulam/10"}`}
          >
            🧭 {showRoute ? "Route on" : "Plan route"}
          </button>
          {showRoute && mapsUrl && (
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="rounded bg-kulam-emerald px-3 py-1 text-sm font-semibold text-white hover:brightness-95">
              ↗ Open in Google Maps
            </a>
          )}
        </div>
        <GuestMap
          stops={stops as Stop[]}
          showRoute={showRoute}
          onMove={(id, lat, lng) => update(id, { lat, lng })}
        />
        {located.length === 0 ? (
          <p className="text-xs text-stone-500">
            Add an address to a guest and tap <strong>Locate all</strong> (or 📍 on a row) to place them on the map.
          </p>
        ) : (
          <p className="text-xs text-stone-500">
            📌 The map snaps to the nearest known place — <strong>drag any pin to its exact spot</strong> so your route &amp; distances are accurate.
          </p>
        )}
      </div>

      {/* List */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-500">{filtered.length} guests</span>
        <button onClick={exportCsv} disabled={!filtered.length} className="rounded border border-kulam/40 px-3 py-1.5 text-sm font-semibold text-kulam hover:bg-kulam/10 disabled:opacity-40">
          ⬇ Export CSV
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-kulam-gold/40 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="bg-kulam/5 text-left text-stone-500">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Side</th>
              <th className="px-3 py-2">Pax</th>
              <th className="px-3 py-2">Address</th>
              <th className="px-3 py-2">RSVP</th>
              <th className="px-3 py-2">Invitation</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => (
              <tr key={g.id} className="border-t border-stone-100 align-top hover:bg-kulam/5">
                <td className="px-3 py-2 font-semibold text-kulam-dark">{g.name}</td>
                <td className="px-3 py-2 text-stone-600">{g.side || "—"}</td>
                <td className="px-3 py-2">{g.pax}</td>
                <td className="px-3 py-2 text-stone-600">
                  <div className="flex items-center gap-1">
                    <span className="max-w-[160px] truncate" title={g.address}>{g.address || "—"}</span>
                    {g.address && (
                      <button onClick={() => locate(g)} title="Find on map" className="flex-none text-xs">
                        {busy === g.id ? "⏳" : g.lat != null ? "✅" : "📍"}
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2">
                  <select value={g.status} onChange={(e) => update(g.id, { status: e.target.value as RSVP })} className="rounded border border-stone-200 px-1.5 py-1 text-xs">
                    {statuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => update(g.id, { invite: g.invite === "Given" ? "Pending" : "Given" })}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${g.invite === "Given" ? "bg-kulam-emerald text-white" : "bg-kulam-gold/20 text-orange-800"}`}
                  >
                    {g.invite === "Given" ? "✓ Given" : "Pending"}
                  </button>
                </td>
                <td className="px-3 py-2 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(g)} className="text-stone-400 hover:text-kulam" aria-label="Edit" title="Edit">✏️</button>
                    <button onClick={() => remove(g.id)} className="text-stone-300 hover:text-rose-500" aria-label="Remove" title="Remove">✕</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-stone-400">
                  No guests yet on this side — add your first above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
