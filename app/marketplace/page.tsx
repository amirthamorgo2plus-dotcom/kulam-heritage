import MandapamDirectory from "@/components/marketplace/MandapamDirectory";

export const metadata = {
  title: "Wedding Marketplace — Kamma Nest",
  description:
    "Browse and book verified kalyana mandapams in Coimbatore. Compare ratings, prices and capacity, save favourites and send enquiries.",
};

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-gradient-to-br from-kulam to-kulam-dark px-6 py-10 text-kulam-cream shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-kulam-gold">
          Wedding Marketplace · Kalyana Mandapams
        </p>
        <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
          Find your perfect wedding hall
        </h1>
        <p className="mt-2 max-w-2xl text-kulam-cream/90">
          Verified Coimbatore mandapams with real ratings and reviews. Browse
          freely — sign in to save favourites and send enquiries. Both you and
          the venue rate each other after the event.
        </p>
      </header>

      <MandapamDirectory />

      <p className="text-xs italic text-stone-500">
        Prototype: venue facts are from public directories; ratings, reviews and
        verification badges are illustrative sample data for this demo.
      </p>
    </div>
  );
}
