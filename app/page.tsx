import Link from "next/link";

const cards = [
  {
    href: "/history",
    title: "History & Kulam",
    desc: "Migration, regions, kulams and culture of the Kammavar Naidu community.",
    icon: "📜",
  },
  {
    href: "/directory",
    title: "Kulam Directory",
    desc: "Search 220+ Kammavar kulams by surname, gothram & kula deivam.",
    icon: "🔎",
  },
  {
    href: "/rituals",
    title: "Rituals Library",
    desc: "Weddings, naming ceremonies and festivals — step by step.",
    icon: "🪔",
  },
  {
    href: "/temples",
    title: "Kula Deivam Map",
    desc: "Family-deity temples across Tamil Nadu on a map, filtered by kulam.",
    icon: "🛕",
  },
  {
    href: "/horoscope",
    title: "Horoscope Match",
    desc: "Free Ashtakoota 36-guna compatibility calculator.",
    icon: "✨",
  },
  {
    href: "/mandapams",
    title: "Kalyana Mandapams",
    desc: "Wedding halls on a map — filter by budget, capacity & district.",
    icon: "🏛️",
  },
  {
    href: "/wedding",
    title: "Marriage Needs",
    desc: "Vendors for every need + return-gift ideas, incl. Kanchipuram silk.",
    icon: "🎉",
  },
  {
    href: "/planner",
    title: "Wedding Planner",
    desc: "Track every task start-to-finish with a live progress tracker.",
    icon: "✅",
  },
  {
    href: "/guests",
    title: "Guest List",
    desc: "Manage guests, RSVP status & head count, with CSV export.",
    icon: "📇",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-br from-kulam to-kulam-dark px-6 py-14 text-center text-kulam-cream shadow-lg">
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">
          Kulam Heritage
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-kulam-cream/90">
          The history, rituals, kula deivam temples and horoscope traditions of
          the Tamil Nadu Kammavar Naidu community — gathered in one place.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/history"
            className="rounded-lg bg-kulam-gold px-5 py-2.5 font-semibold text-kulam-dark shadow transition hover:brightness-110"
          >
            Explore History
          </Link>
          <Link
            href="/temples"
            className="rounded-lg border border-kulam-cream/50 px-5 py-2.5 font-semibold transition hover:bg-white/10"
          >
            Open Temple Map
          </Link>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-xl border border-kulam-gold/40 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="text-3xl">{c.icon}</div>
            <h2 className="mt-3 text-xl font-bold text-kulam-dark group-hover:text-kulam">
              {c.title}
            </h2>
            <p className="mt-1 text-stone-600">{c.desc}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-kulam-gold/30 bg-kulam-cream p-5 text-sm text-stone-600">
        <p>
          <strong>Roadmap:</strong> v1 covers Kamma heritage content. Future
          phases add accounts, matrimony with map / job / salary / age filters,
          and additional kulams — all built on the same data model.
        </p>
      </section>
    </div>
  );
}
