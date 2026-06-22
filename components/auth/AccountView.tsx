"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { getMarketMandapam } from "@/data/mandapamMarket";
import Stars from "@/components/marketplace/Stars";

export default function AccountView() {
  const { user, openLogin, savedVenueIds, enquiries, reviews, toggleSave } =
    useAuth();

  if (!user) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <h1 className="font-serif text-2xl font-bold text-kulam-dark">
          Your account
        </h1>
        <p className="mt-2 text-stone-600">
          Sign in to see your saved mandapams, enquiries and reviews. Your data
          is kept with your account.
        </p>
        <button
          onClick={openLogin}
          className="mt-4 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-5 py-2.5 font-semibold text-white shadow transition hover:brightness-110"
        >
          Sign in
        </button>
      </div>
    );
  }

  const saved = savedVenueIds
    .map((id) => getMarketMandapam(id))
    .filter(Boolean);

  return (
    <div className="space-y-8">
      <header className="rounded-2xl bg-gradient-to-br from-kulam to-kulam-dark px-6 py-8 text-kulam-cream shadow-lg">
        <h1 className="font-serif text-2xl font-bold">
          Welcome, {user.name.split(" ")[0]} 👋
        </h1>
        <p className="text-kulam-cream/90">{user.email}</p>
      </header>

      {/* Saved venues */}
      <section>
        <h2 className="font-serif text-xl font-bold text-kulam-dark">
          Saved mandapams ({saved.length})
        </h2>
        {saved.length === 0 ? (
          <p className="mt-2 text-stone-600">
            Nothing saved yet.{" "}
            <Link href="/marketplace" className="text-kulam underline">
              Browse the marketplace
            </Link>{" "}
            and tap the heart.
          </p>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map(
              (m) =>
                m && (
                  <div
                    key={m.id}
                    className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
                  >
                    <Link
                      href={`/marketplace/${m.id}`}
                      className="font-serif font-bold text-kulam-dark hover:underline"
                    >
                      {m.name}
                    </Link>
                    <p className="text-sm text-stone-500">{m.area}</p>
                    <Stars value={m.rating} size="text-xs" />
                    <button
                      onClick={() => toggleSave(m.id)}
                      className="mt-2 block text-xs text-stone-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ),
            )}
          </div>
        )}
      </section>

      {/* Enquiries */}
      <section>
        <h2 className="font-serif text-xl font-bold text-kulam-dark">
          My enquiries ({enquiries.length})
        </h2>
        {enquiries.length === 0 ? (
          <p className="mt-2 text-stone-600">No enquiries sent yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {enquiries.map((e, i) => (
              <li
                key={i}
                className="rounded-lg border border-stone-200 bg-white p-3 text-sm shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={`/marketplace/${e.venueId}`}
                    className="font-semibold text-kulam-dark hover:underline"
                  >
                    {e.venueName}
                  </Link>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">
                    Awaiting response
                  </span>
                </div>
                <p className="text-stone-600">
                  {e.date || "Date TBD"} · {e.guests} guests
                </p>
                {e.message && (
                  <p className="mt-1 text-stone-500">“{e.message}”</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Reviews */}
      <section>
        <h2 className="font-serif text-xl font-bold text-kulam-dark">
          My reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p className="mt-2 text-stone-600">You haven&apos;t reviewed yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {reviews.map((r, i) => {
              const m = getMarketMandapam(r.venueId);
              return (
                <li
                  key={i}
                  className="rounded-lg border border-stone-200 bg-white p-3 text-sm shadow-sm"
                >
                  <Link
                    href={`/marketplace/${r.venueId}`}
                    className="font-semibold text-kulam-dark hover:underline"
                  >
                    {m?.name ?? r.venueId}
                  </Link>
                  <Stars value={r.rating} size="text-xs" />
                  <p className="mt-1 text-stone-700">{r.text}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
