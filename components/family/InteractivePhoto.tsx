"use client";

import { useState } from "react";
import type { PhotoTag } from "@/data/familyPhoto";

// Reusable interactive photo: an <img> with %-positioned hotspot overlays.
// Hover a hotspot → tooltip with the relationship. Click → a card slides up.
// In `editable` mode, clicking the photo reports the %-coords via onAddSpot.
export default function InteractivePhoto({
  src,
  tags,
  editable = false,
  onAddSpot,
}: {
  src: string;
  tags: PhotoTag[];
  editable?: boolean;
  onAddSpot?: (x: number, y: number) => void;
}) {
  const [active, setActive] = useState<PhotoTag | null>(null);

  function handlePhotoClick(e: React.MouseEvent<HTMLImageElement>) {
    if (!editable || !onAddSpot) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    onAddSpot(+x.toFixed(1), +y.toFixed(1));
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Family photo — tap a tagged person"
          onClick={handlePhotoClick}
          draggable={false}
          className="block w-full select-none"
          style={{ cursor: editable ? "crosshair" : "default" }}
        />

        {tags.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive(t);
            }}
            style={{ left: `${t.x}%`, top: `${t.y}%` }}
            aria-label={`${t.name} — ${t.rel}`}
            className="group absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-kulam/25 shadow ring-2 ring-kulam-gold transition hover:scale-110 hover:bg-kulam-gold/40 sm:h-11 sm:w-11"
          >
            <span className="pointer-events-none absolute bottom-[135%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-kulam-dark px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
              {t.rel}
            </span>
          </button>
        ))}
      </div>

      {/* Detail card — bottom sheet on mobile, centred dialog on desktop. */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          onClick={() => setActive(null)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-6 pt-7 shadow-2xl sm:m-4 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-500 transition hover:bg-stone-200"
            >
              ✕
            </button>
            <div className="text-xs font-bold uppercase tracking-wide text-kulam-gold">
              {active.rel}
            </div>
            <h3 className="mt-1 font-serif text-2xl font-bold text-kulam-dark">
              {active.name}
            </h3>
            {active.intro && (
              <p className="mt-2 leading-relaxed text-stone-600">
                {active.intro}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
