"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

function FitBounds({ pts }: { pts: [number, number][] }) {
  const map = useMap();
  const key = pts.map((p) => p.join(",")).join("|");
  useEffect(() => {
    if (!pts.length) return;
    if (pts.length === 1) map.setView(pts[0], 13);
    else map.fitBounds(pts, { padding: [40, 40], maxZoom: 13 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}
import { PLATE_FLOOR, PLATE_CEIL, type Mandapam } from "@/data/mandapams";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

const capacityText = (m: { capacityMin?: number; capacityMax?: number }) => {
  if (m.capacityMax == null) return "Capacity on request";
  if (m.capacityMin) return `${m.capacityMin}–${m.capacityMax} guests`;
  return `Up to ${m.capacityMax} guests`;
};

export default function MandapamMap({ mandapams }: { mandapams: Mandapam[] }) {
  const districts = useMemo(
    () => ["All", ...Array.from(new Set(mandapams.map((m) => m.district))).sort()],
    [mandapams]
  );

  const [maxPlate, setMaxPlate] = useState(PLATE_CEIL);
  const [minCapacity, setMinCapacity] = useState(0);
  const [district, setDistrict] = useState("All");

  const visible = useMemo(
    () =>
      mandapams.filter(
        (m) =>
          (m.plateVeg == null || m.plateVeg <= maxPlate) &&
          (m.capacityMax == null || m.capacityMax >= minCapacity) &&
          (district === "All" || m.district === district)
      ),
    [mandapams, maxPlate, minCapacity, district]
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 rounded-lg border border-kulam/30 bg-white p-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 flex justify-between text-sm font-semibold">
            <span>Max ₹ / plate (veg)</span>
            <span className="text-kulam">{inr(maxPlate)}</span>
          </label>
          <input
            type="range"
            min={PLATE_FLOOR}
            max={PLATE_CEIL}
            step={25}
            value={maxPlate}
            onChange={(e) => setMaxPlate(Number(e.target.value))}
            className="w-full accent-kulam"
          />
          <div className="flex justify-between text-xs text-stone-400">
            <span>{inr(PLATE_FLOOR)}</span>
            <span>{inr(PLATE_CEIL)}</span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Min guest capacity: {minCapacity || "any"}
          </label>
          <input
            type="range"
            min={0}
            max={2000}
            step={50}
            value={minCapacity}
            onChange={(e) => setMinCapacity(Number(e.target.value))}
            className="w-full accent-kulam"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full rounded border border-stone-300 px-2 py-1.5 text-sm"
          >
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-stone-500">
        {visible.length} mandapam{visible.length === 1 ? "" : "s"} match your
        filters
      </p>

      <div className="h-[460px] overflow-hidden rounded-lg border border-kulam-gold/40 shadow">
        <MapContainer center={[11.02, 77.0]} zoom={11} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds pts={visible.map((m) => [m.lat, m.lng]) as [number, number][]} />
          {visible.map((m) => (
            <Marker key={m.id} position={[m.lat, m.lng]} icon={icon}>
              <Popup>
                <div className="space-y-1">
                  <div className="font-bold text-kulam-dark">{m.name}</div>
                  <div className="text-xs text-stone-600">
                    {m.area}, {m.district}
                  </div>
                  <div className="text-xs">
                    {m.plateVeg != null ? (
                      <>
                        <span className="font-semibold">Veg:</span> {inr(m.plateVeg)}/plate
                        {m.plateNonVeg ? ` · Non-veg: ${inr(m.plateNonVeg)}/plate` : ""}
                      </>
                    ) : (
                      <span className="italic text-stone-500">Plate price on request</span>
                    )}
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold">Capacity:</span>{" "}
                    {capacityText(m)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((m) => (
          <div
            key={m.id}
            className="rounded-lg border border-kulam-gold/40 bg-white p-3 text-sm shadow-sm"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-bold text-kulam-dark">{m.name}</span>
              <span className="text-xs text-stone-500">{m.area}</span>
            </div>
            <div className="mt-1 font-semibold text-kulam">
              {m.plateVeg != null
                ? `${inr(m.plateVeg)}/plate veg${m.plateNonVeg ? ` · ${inr(m.plateNonVeg)} non-veg` : ""}`
                : "Price on request"}
            </div>
            <div className="text-xs text-stone-500">{capacityText(m)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
