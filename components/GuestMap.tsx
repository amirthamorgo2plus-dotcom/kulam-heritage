"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

// Auto zoom/pan so all pins are visible (and centred on the exact spot).
function FitBounds({ pts }: { pts: [number, number][] }) {
  const map = useMap();
  const key = pts.map((p) => p.join(",")).join("|");
  useEffect(() => {
    if (!pts.length) return;
    if (pts.length === 1) map.setView(pts[0], 14);
    else map.fitBounds(pts, { padding: [40, 40], maxZoom: 14 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return null;
}

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  invite: "Pending" | "Given";
  address?: string;
}

const pin = (n: number, color: string) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${color};color:#fff;width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,.4);border:1.5px solid #fff"><span style="transform:rotate(45deg);font-size:12px;font-weight:700">${n}</span></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -26],
  });

export default function GuestMap({
  stops,
  showRoute,
}: {
  stops: Stop[];
  showRoute: boolean;
}) {
  const center: [number, number] = stops.length
    ? [
        stops.reduce((s, p) => s + p.lat, 0) / stops.length,
        stops.reduce((s, p) => s + p.lng, 0) / stops.length,
      ]
    : [11.0, 77.0];

  return (
    <div className="h-[420px] overflow-hidden rounded-lg border border-kulam-gold/40 shadow">
      <MapContainer center={center} zoom={stops.length ? 11 : 9} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds pts={stops.map((s) => [s.lat, s.lng]) as [number, number][]} />
        {showRoute && stops.length > 1 && (
          <Polyline
            positions={stops.map((s) => [s.lat, s.lng]) as [number, number][]}
            pathOptions={{ color: "#7C5CBF", weight: 3, dashArray: "6 8" }}
          />
        )}
        {stops.map((s, i) => (
          <Marker
            key={s.id}
            position={[s.lat, s.lng]}
            icon={pin(i + 1, s.invite === "Given" ? "#2DB39A" : "#EC8B73")}
          >
            <Popup>
              <div className="text-xs">
                <div className="font-bold text-kulam-dark">
                  {i + 1}. {s.name}
                </div>
                {s.address && <div className="text-stone-600">{s.address}</div>}
                <div className={s.invite === "Given" ? "text-emerald-700" : "text-orange-700"}>
                  Invitation: {s.invite}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
