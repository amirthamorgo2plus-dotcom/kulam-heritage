"use client";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { temples } from "@/data/temples";

// Fix default marker icons under bundlers (point to CDN assets).
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function TempleMap() {
  const allKulams = useMemo(() => {
    const s = new Set<string>();
    temples.forEach((t) => t.associatedKulams.forEach((g) => s.add(g)));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const [kulam, setKulam] = useState("All");

  const visible = useMemo(
    () =>
      kulam === "All"
        ? temples
        : temples.filter((t) => t.associatedKulams.includes(kulam)),
    [kulam]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold">Filter by kulam:</label>
        <select
          value={kulam}
          onChange={(e) => setKulam(e.target.value)}
          className="rounded border border-kulam/40 bg-white px-3 py-1.5 text-sm"
        >
          {allKulams.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <span className="text-sm text-stone-500">
          {visible.length} temple{visible.length === 1 ? "" : "s"} shown
        </span>
      </div>

      <div className="h-[480px] overflow-hidden rounded-lg border border-kulam-gold/40 shadow">
        <MapContainer
          center={[11.0, 77.15]}
          zoom={10}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {visible.map((t) => (
            <Marker key={t.id} position={[t.lat, t.lng]} icon={icon}>
              <Popup>
                <div className="space-y-1">
                  <div className="font-bold text-kulam-dark">{t.name}</div>
                  <div className="text-xs">{t.deity}</div>
                  <div className="text-xs text-stone-600">
                    {t.village}, {t.district}, {t.state}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">Kulams:</span>{" "}
                    {t.associatedKulams.join(", ")}
                  </div>
                  {t.note && (
                    <div className="text-xs italic text-stone-500">{t.note}</div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
