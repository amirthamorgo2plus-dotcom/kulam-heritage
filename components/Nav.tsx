import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/history", label: "History" },
  { href: "/directory", label: "Kulam Directory" },
  { href: "/rituals", label: "Rituals" },
  { href: "/temples", label: "Kula Deivam Map" },
  { href: "/horoscope", label: "Horoscope Match" },
  { href: "/compatibility", label: "Porutham Guide" },
  { href: "/mandapams", label: "Mandapams" },
  { href: "/wedding", label: "Marriage Needs" },
  { href: "/planner", label: "Planner" },
  { href: "/guests", label: "Guest List" },
];

export default function Nav() {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold">
          <span className="text-kulam-gold">॥</span> Kulam Heritage
        </Link>
        <ul className="flex flex-wrap gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded px-3 py-1.5 transition hover:bg-kulam hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
