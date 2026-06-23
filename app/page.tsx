import Link from "next/link";
import { marketMandapams } from "@/data/mandapamMarket";

// Signature features — the things that make Kamma Nest special.
const features = [
  {
    href: "/rituals",
    icon: "🪔",
    title: "The Science Behind Rituals",
    desc: "Every ceremony explained in three layers — what you do, why, and the Ayurvedic, social & astronomical reasoning behind it.",
    tag: "Our soul",
  },
  {
    href: "/marketplace",
    icon: "💍",
    title: "Wedding Marketplace",
    desc: "Browse & book verified kalyana mandapams with real ratings, reviews and enquiries. Vendors, planners & more coming soon.",
    tag: "New",
  },
  {
    href: "/horoscope",
    icon: "✨",
    title: "Thirumana Porutham",
    desc: "Free Tamil 10-Porutham match using natchathiram & rasi — Rajju, Vedhai and all ten, with a shareable card.",
  },
  {
    href: "/temples",
    icon: "🛕",
    title: "Kula Deivam Temple Map",
    desc: "Find your family-deity temples across Tamil Nadu on an interactive map, filtered by kulam.",
  },
  {
    href: "/directory",
    icon: "🔎",
    title: "Kulam Directory",
    desc: "Search 220+ Kammavar kulams by surname, gothram and kula deivam.",
  },
  {
    href: "/planner",
    icon: "✅",
    title: "Wedding Planner & Guests",
    desc: "Track every wedding task and manage your guest list with RSVPs, head count and map pins.",
  },
];

// "Coming next" pillars from the platform plan.
const pillars = [
  { icon: "🧳", label: "Honeymoon packages" },
  { icon: "💬", label: "Marriage counselling" },
  { icon: "🎶", label: "Music classes" },
  { icon: "🧒", label: "Values for children" },
  { icon: "🤝", label: "Social responsibility" },
  { icon: "⭐", label: "Two-way ratings" },
];

export default function Home() {
  const venueCount = marketMandapams.length;
  const stats = [
    { value: `${venueCount}+`, label: "Verified mandapams" },
    { value: "220+", label: "Kammavar kulams" },
    { value: "10", label: "Porutham match" },
    { value: "6", label: "Life & wedding pillars" },
  ];

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-700 via-emerald-700 to-kulam-dark px-6 py-16 text-center text-kulam-cream shadow-xl sm:py-20">
        <div className="pointer-events-none absolute -right-10 -top-10 text-[10rem] opacity-10">
          🛕
        </div>
        <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider ring-1 ring-white/30">
          For the Tamil Nadu Kammavar Naidu community
        </span>
        <h1 className="mt-5 font-serif text-4xl font-bold sm:text-6xl">
          Kamma Nest
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xl font-semibold text-kulam-gold sm:text-2xl">
          Grandma&apos;s rituals, modern couple&apos;s app
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-kulam-cream/90">
          Understand the meaning behind every tradition, plan your wedding with
          trusted suppliers, and keep your roots close — all in one place.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/marketplace"
            className="rounded-xl bg-kulam-gold px-6 py-3 font-bold text-kulam-dark shadow-lg transition hover:brightness-110"
          >
            Browse Marketplace →
          </Link>
          <Link
            href="/rituals"
            className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
          >
            Explore Rituals
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="-mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-kulam-gold/30 bg-white p-5 text-center shadow-sm"
          >
            <div className="font-serif text-3xl font-bold text-kulam">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-stone-500">{s.label}</div>
          </div>
        ))}
      </section>

      {/* SPECIAL FEATURES */}
      <section>
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-kulam-dark">
            What makes Kamma Nest special
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-stone-600">
            Heritage you can understand, weddings you can plan, traditions you
            can pass on.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group relative flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-kulam/40 hover:shadow-lg"
            >
              {f.tag && (
                <span className="absolute right-4 top-4 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  {f.tag}
                </span>
              )}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-100 text-3xl">
                {f.icon}
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-kulam-dark group-hover:text-kulam">
                {f.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-stone-600">{f.desc}</p>
              <span className="mt-4 text-sm font-semibold text-kulam">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* MARKETPLACE BANNER */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-kulam-dark to-teal-700 p-8 text-kulam-cream shadow-lg sm:p-12">
        <div className="grid items-center gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              One trusted marketplace for your whole wedding
            </h2>
            <p className="mt-3 max-w-xl text-kulam-cream/90">
              Compare verified mandapams, read real reviews, save your
              favourites and send enquiries — then rate each other after the
              big day. Sign in to keep your shortlist and bookings in one place.
            </p>
            <Link
              href="/marketplace"
              className="mt-5 inline-block rounded-xl bg-kulam-gold px-6 py-3 font-bold text-kulam-dark shadow transition hover:brightness-110"
            >
              Find your wedding hall →
            </Link>
          </div>
          <div className="text-center text-7xl sm:text-8xl">🏛️</div>
        </div>
      </section>

      {/* COMING NEXT */}
      <section className="rounded-3xl border border-kulam-gold/30 bg-white p-8 text-center shadow-sm">
        <h2 className="font-serif text-2xl font-bold text-kulam-dark">
          Growing into your complete life &amp; wedding platform
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-stone-600">
          Kamma Nest is becoming a community marketplace inspired by the best of
          modern platforms — with these pillars coming next:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {pillars.map((p) => (
            <span
              key={p.label}
              className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-kulam-dark"
            >
              <span className="text-lg">{p.icon}</span>
              {p.label}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
