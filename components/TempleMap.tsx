"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import kulams from "@/data/kulams.json";
import { useAuth } from "@/components/auth/AuthProvider";

function FitBounds({ pts }: { pts: [number, number][] }) {
  const map = useMap();
  const key = pts.map((p) => p.join(",")).join("|");
  useEffect(() => {
    if (!pts.length) return;
    if (pts.length === 1) map.setView(pts[0], 12);
    else map.fitBounds(pts, { padding: [40, 40], maxZoom: 13 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}

// Coloured teardrop pin (no external coloured-marker images needed).
function pin(color: string) {
  return L.divIcon({
    className: "",
    html: `<svg width="26" height="38" viewBox="0 0 26 38" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0C6 0 0 5.6 0 13c0 9.2 13 25 13 25s13-15.8 13-25C26 5.6 20 0 13 0z" fill="${color}" stroke="white" stroke-width="1.5"/>
      <circle cx="13" cy="13" r="5" fill="white"/></svg>`,
    iconSize: [26, 38],
    iconAnchor: [13, 38],
    popupAnchor: [0, -34],
  });
}
const ICON = {
  precise: pin("#2563eb"), // blue
  approx: pin("#eab308"), // gold — approximate (district/region)
  edited: pin("#16a34a"), // green — admin-corrected
  selected: pin("#dc2626"), // red — currently editing
};

interface Kulam {
  id: number;
  surname: string;
  house: string | null;
  gothram: string | null;
  kuladeivam: string | null;
  place: string | null;
  lat?: number | null;
  lng?: number | null;
  geo?: string;
}

const base = kulams as Kulam[];
const OVERRIDE_KEY = "kammanest_kulam_geo";

function ClickToPlace({
  active,
  onPick,
}: {
  active: boolean;
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (active) onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function TempleMap() {
  const { user, requireAuth } = useAuth();
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [overrides, setOverrides] = useState<Record<number, [number, number]>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(OVERRIDE_KEY);
      if (raw) setOverrides(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (hydrated) localStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides));
  }, [overrides, hydrated]);

  // Apply admin overrides on top of the seeded data.
  const data: Kulam[] = useMemo(
    () =>
      base.map((k) => {
        const o = overrides[k.id];
        return o ? { ...k, lat: o[0], lng: o[1], geo: "edited" } : k;
      }),
    [overrides]
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return data.filter((k) => {
      if (k.lat == null || k.lng == null) return false;
      if (!term) return true;
      return [k.surname, k.house, k.gothram, k.kuladeivam, k.place]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [q, data]);

  // Group kulams sharing a location into one marker.
  const groups = useMemo(() => {
    const m = new Map<
      string,
      { lat: number; lng: number; place: string; geo: string; items: Kulam[] }
    >();
    for (const k of filtered) {
      const key = `${k.lat!.toFixed(4)},${k.lng!.toFixed(4)}`;
      if (!m.has(key))
        m.set(key, {
          lat: k.lat!,
          lng: k.lng!,
          place: k.place || "",
          geo: k.geo || "precise",
          items: [],
        });
      m.get(key)!.items.push(k);
    }
    return Array.from(m.values());
  }, [filtered]);

  const approxCount = filtered.filter(
    (k) => k.geo === "approx" || k.geo === "region"
  ).length;
  const editedCount = Object.keys(overrides).length;
  const selected = data.find((k) => k.id === selectedId) || null;

  const setLocation = (lat: number, lng: number) => {
    if (selectedId == null) return;
    setOverrides((o) => ({ ...o, [selectedId]: [lat, lng] }));
  };
  const clearOverride = (id: number) =>
    setOverrides((o) => {
      const n = { ...o };
      delete n[id];
      return n;
    });

  const enterEdit = () => {
    if (!requireAuth()) return; // signed-in admins only (prototype)
    setEdit(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search your surname, gothram, temple or place…"
          className="w-full max-w-md rounded-lg border border-kulam/40 px-3 py-2 text-sm"
        />
        <span className="text-sm text-stone-500">
          {filtered.length} kulams at {groups.length} locations
        </span>
        {!edit ? (
          <button
            onClick={enterEdit}
            className="ml-auto rounded-lg border border-kulam/40 px-3 py-1.5 text-sm font-semibold text-kulam transition hover:bg-kulam hover:text-white"
          >
            ✎ Admin: edit locations
          </button>
        ) : (
          <button
            onClick={() => {
              setEdit(false);
              setSelectedId(null);
            }}
            className="ml-auto rounded-lg bg-kulam px-3 py-1.5 text-sm font-semibold text-white"
          >
            ✓ Done editing
          </button>
        )}
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
        <span>🔵 Exact</span>
        <span>🟡 Approximate (by town/region)</span>
        <span>🟢 Admin-corrected</span>
        {approxCount > 0 && (
          <span className="text-stone-400">· {approxCount} approximate</span>
        )}
        {editedCount > 0 && (
          <span className="text-stone-400">· {editedCount} corrected</span>
        )}
      </div>

      {/* admin edit panel */}
      {edit && (
        <div className="rounded-lg border border-kulam/30 bg-kulam/5 p-3 text-sm">
          {!user && (
            <p className="text-red-700">Sign in as admin to edit locations.</p>
          )}
          {!selected ? (
            <p className="text-stone-600">
              <strong>Edit mode:</strong> pick a kulam below, then{" "}
              <strong>click the map</strong> (or drag its red pin) to set its
              exact location.
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span>
                Editing <strong>{selected.surname}</strong>
                {selected.place ? ` · ${selected.place}` : ""} —{" "}
                {selected.lat != null
                  ? `${selected.lat.toFixed(4)}, ${selected.lng!.toFixed(4)}`
                  : "no location"}
              </span>
              {overrides[selected.id] && (
                <button
                  onClick={() => clearOverride(selected.id)}
                  className="rounded border border-stone-300 px-2 py-0.5 text-xs hover:bg-white"
                >
                  Reset to original
                </button>
              )}
              <button
                onClick={() => setSelectedId(null)}
                className="rounded border border-stone-300 px-2 py-0.5 text-xs hover:bg-white"
              >
                Done
              </button>
            </div>
          )}

          {/* kulam picker */}
          <div className="mt-2 max-h-40 overflow-y-auto rounded border border-stone-200 bg-white">
            {filtered.slice(0, 60).map((k) => (
              <button
                key={k.id}
                onClick={() => setSelectedId(k.id)}
                className={`flex w-full items-center justify-between gap-2 border-b border-stone-100 px-2 py-1 text-left text-xs hover:bg-emerald-50 ${
                  selectedId === k.id ? "bg-emerald-100" : ""
                }`}
              >
                <span className="font-semibold">{k.surname}</span>
                <span className="text-stone-500">
                  {k.place} ·{" "}
                  <span
                    className={
                      k.geo === "edited"
                        ? "text-green-600"
                        : k.geo === "approx" || k.geo === "region"
                        ? "text-amber-600"
                        : "text-blue-600"
                    }
                  >
                    {k.geo === "edited"
                      ? "corrected"
                      : k.geo === "approx" || k.geo === "region"
                      ? "approx"
                      : "exact"}
                  </span>
                </span>
              </button>
            ))}
            {filtered.length > 60 && (
              <p className="px-2 py-1 text-[11px] text-stone-400">
                Showing first 60 — search to narrow down.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="h-[520px] overflow-hidden rounded-lg border border-kulam-gold/40 shadow">
        <MapContainer center={[11.0, 77.4]} zoom={9} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds pts={groups.map((g) => [g.lat, g.lng]) as [number, number][]} />
          <ClickToPlace active={edit && selectedId != null} onPick={setLocation} />

          {groups.map((g, i) => {
            const isSel = edit && g.items.some((k) => k.id === selectedId);
            const icon = isSel
              ? ICON.selected
              : g.geo === "edited"
              ? ICON.edited
              : g.geo === "approx" || g.geo === "region"
              ? ICON.approx
              : ICON.precise;
            return (
              <Marker
                key={`${g.lat},${g.lng},${i}`}
                position={[g.lat, g.lng]}
                icon={icon}
                draggable={isSel}
                eventHandlers={
                  isSel
                    ? { dragend: (e) => {
                        const ll = e.target.getLatLng();
                        setLocation(ll.lat, ll.lng);
                      } }
                    : undefined
                }
              >
                <Popup>
                  <div className="max-h-56 space-y-2 overflow-y-auto">
                    <div className="font-bold text-kulam-dark">{g.place}</div>
                    {(g.geo === "approx" || g.geo === "region") && (
                      <div className="text-[11px] text-amber-600">
                        Approximate (placed by town/region) — confirm the exact
                        shrine with elders.
                      </div>
                    )}
                    {g.items.map((k) => (
                      <div key={k.id} className="border-t border-stone-100 pt-1 text-xs">
                        <div className="font-semibold">
                          {k.surname}
                          {k.house ? ` (${k.house})` : ""}
                        </div>
                        {k.kuladeivam && <div>🛕 {k.kuladeivam}</div>}
                        {k.gothram && (
                          <div className="text-stone-500">Gothram: {k.gothram}</div>
                        )}
                        {edit && (
                          <button
                            onClick={() => setSelectedId(k.id)}
                            className="mt-1 rounded bg-kulam px-2 py-0.5 text-[11px] font-semibold text-white"
                          >
                            ✎ Edit this location
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <p className="text-xs italic text-stone-500">
        Pins are placed by the temple&apos;s town/locality (approximate, not the
        exact shrine). Admin-corrected pins are saved on this device. Confirm
        your family&apos;s kula deivam with elders.
      </p>
    </div>
  );
}
