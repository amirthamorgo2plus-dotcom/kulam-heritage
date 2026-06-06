"use client";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import kulams from "@/data/kulams.json";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Kulam {
  id: number;
  surname: string;
  house: string | null;
  gothram: string | null;
  kuladeivam: string | null;
  place: string | null;
  lat?: number;
  lng?: number;
  geo?: string;
}

const data = kulams as Kulam[];

export default function TempleMap() {
  const [q, setQ] = useState("");

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
  }, [q]);

  // Group kulams that share a location into one marker.
  const groups = useMemo(() => {
    const map = new Map<string, { lat: number; lng: number; place: string; items: Kulam[] }>();
    for (const k of filtered) {
      const key = `${k.lat!.toFixed(4)},${k.lng!.toFixed(4)}`;
      if (!map.has(key))
        map.set(key, { lat: k.lat!, lng: k.lng!, place: k.place || "", items: [] });
      map.get(key)!.items.push(k);
    }
    return Array.from(map.values());
  }, [filtered]);

  const mappedCount = filtered.length;
  const unmapped = data.filter((k) => k.lat == null).length;

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
          {mappedCount} kulams at {groups.length} locations
        </span>
      </div>

      <div className="h-[520px] overflow-hidden rounded-lg border border-kulam-gold/40 shadow">
        <MapContainer center={[11.0, 77.4]} zoom={9} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {groups.map((g, i) => (
            <Marker key={i} position={[g.lat, g.lng]} icon={icon}>
              <Popup>
                <div className="max-h-56 space-y-2 overflow-y-auto">
                  <div className="font-bold text-kulam-dark">{g.place}</div>
                  {g.items.map((k) => (
                    <div key={k.id} className="border-t border-stone-100 pt-1 text-xs">
                      <div className="font-semibold">
                        {k.surname}
                        {k.house ? ` (${k.house})` : ""}
                      </div>
                      {k.kuladeivam && <div>🛕 {k.kuladeivam}</div>}
                      {k.gothram && <div className="text-stone-500">Gothram: {k.gothram}</div>}
                    </div>
                  ))}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <p className="text-xs italic text-stone-500">
        Pins are placed by the temple&apos;s town/locality (approximate, not the
        exact shrine).{" "}
        {unmapped > 0 &&
          `${unmapped} entries with unrecognised place names aren't pinned yet — find them in the Kulam Directory.`}{" "}
        Confirm your family&apos;s kula deivam with elders.
      </p>
    </div>
  );
}
