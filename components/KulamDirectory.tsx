"use client";

import { useMemo, useState } from "react";

export interface Kulam {
  id: number;
  surname: string;
  house: string | null;
  gothram: string | null;
  kuladeivam: string | null;
  place: string | null;
}

export default function KulamDirectory({ data }: { data: Kulam[] }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data;
    return data.filter((k) =>
      [k.surname, k.house, k.gothram, k.kuladeivam, k.place]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search surname, gothram, temple or place…"
          className="w-full max-w-md rounded-lg border border-kulam/40 px-3 py-2 text-sm"
        />
        <span className="text-sm text-stone-500">
          {results.length} of {data.length} kulams
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-kulam-gold/40 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="bg-kulam/5 text-left text-stone-500">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Surname (inti peru)</th>
              <th className="px-3 py-2">House name</th>
              <th className="px-3 py-2">Gothram</th>
              <th className="px-3 py-2">Kula deivam</th>
              <th className="px-3 py-2">Place</th>
            </tr>
          </thead>
          <tbody>
            {results.map((k) => (
              <tr key={k.id} className="border-t border-stone-100 align-top hover:bg-kulam/5">
                <td className="px-3 py-2 text-stone-400">{k.id}</td>
                <td className="px-3 py-2 font-semibold text-kulam-dark">{k.surname}</td>
                <td className="px-3 py-2 text-stone-600">{k.house || "—"}</td>
                <td className="px-3 py-2 text-stone-600">{k.gothram || "—"}</td>
                <td className="px-3 py-2 text-kulam">{k.kuladeivam || "—"}</td>
                <td className="px-3 py-2 text-stone-600">{k.place || "—"}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-stone-400">
                  No matching kulams.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
