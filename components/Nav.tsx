import Link from "next/link";
import Image from "next/image";
import icon from "@/app/icon.png";
import AccountButton from "@/components/auth/AccountButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
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
          <Image src={icon} alt="Kamma Nest" width={32} height={32} className="rounded-lg" priority />
          Kamma Nest
        </Link>
        <div className="flex flex-wrap items-center gap-2">
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
          <AccountButton />
        </div>
      </nav>
    </header>
  );
}
