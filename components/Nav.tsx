"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import AccountButton from "@/components/auth/AccountButton";

type Item = { href: string; label: string };
type Group = { label: string; items: Item[] };

// Flat top-level links + grouped dropdowns keep the bar tidy.
const primary: Item[] = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/play", label: "Vibe Check ✨" },
];

const groups: Group[] = [
  {
    label: "Heritage",
    items: [
      { href: "/history", label: "History & Kulam" },
      { href: "/directory", label: "Kulam Directory" },
      { href: "/rituals", label: "Rituals Library" },
      { href: "/temples", label: "Kula Deivam Map" },
    ],
  },
  {
    label: "Matching",
    items: [
      { href: "/horoscope", label: "Thirumana Porutham" },
      { href: "/rasi-kattam", label: "Rasi Kattam Builder" },
      { href: "/compatibility", label: "Porutham Guide" },
    ],
  },
  {
    label: "Wedding Tools",
    items: [
      { href: "/mandapams", label: "Kalyana Mandapams" },
      { href: "/wedding", label: "Marriage Needs" },
      { href: "/planner", label: "Wedding Planner" },
      { href: "/guests", label: "Guest List" },
    ],
  },
];

const allFlat: Item[] = [
  ...primary,
  ...groups.flatMap((g) => g.items),
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-teal-700 via-emerald-600 to-emerald-500 text-white shadow-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="block h-12 w-12 overflow-hidden rounded-xl shadow-md ring-1 ring-white/30">
            <Image
              src={icon}
              alt="Kamma Nest"
              width={48}
              height={48}
              className="h-full w-full scale-[1.45] object-cover"
              priority
            />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-2xl font-bold">
              Kamma Nest
            </span>
            <span className="hidden text-[11px] font-medium text-white/80 sm:block">
              Grandma&apos;s rituals, modern couple&apos;s app
            </span>
          </span>
        </Link>

        {/* desktop menu */}
        <div className="hidden items-center gap-1 lg:flex">
          {primary.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-white/15"
            >
              {l.label}
            </Link>
          ))}

          {groups.map((g) => (
            <div key={g.label} className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-white/15">
                {g.label}
                <span className="text-xs opacity-80 transition group-hover:rotate-180">
                  ▾
                </span>
              </button>
              {/* dropdown */}
              <div className="invisible absolute left-0 top-full z-50 min-w-[200px] translate-y-1 rounded-xl bg-white p-1.5 text-kulam-dark opacity-0 shadow-xl ring-1 ring-black/5 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {g.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-emerald-50 hover:text-kulam"
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="ml-1">
            <AccountButton />
          </div>
        </div>

        {/* mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <AccountButton />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="rounded-lg p-2 text-2xl leading-none ring-1 ring-white/30"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-white/15 bg-emerald-700/95 px-4 py-3 lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {allFlat.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/15"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
