"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { type MarketMandapam } from "@/data/mandapamMarket";
import Stars from "./Stars";

export default function MandapamProfile({ m }: { m: MarketMandapam }) {
  const {
    user,
    savedVenueIds,
    toggleSave,
    requireAuth,
    addEnquiry,
    addReview,
    reviews,
    enquiries,
  } = useAuth();

  const saved = savedVenueIds.includes(m.id);
  const myReviews = reviews.filter((r) => r.venueId === m.id);
  const myEnquiry = enquiries.find((e) => e.venueId === m.id);

  // enquiry form
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  // review form
  const [stars, setStars] = useState(5);
  const [reviewText, setReviewText] = useState("");

  function submitEnquiry(e: React.FormEvent) {
    e.preventDefault();
    if (!requireAuth()) return;
    addEnquiry({
      venueId: m.id,
      venueName: m.name,
      date,
      guests: Number(guests) || 0,
      message,
    });
    setSent(true);
    setMessage("");
  }

  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!reviewText.trim()) return;
    addReview({ venueId: m.id, rating: stars, text: reviewText.trim() });
    setReviewText("");
  }

  const allReviews = [
    ...myReviews.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
      when: "just now",
      mine: true,
    })),
    ...m.seedReviews.map((r) => ({ ...r, mine: false })),
  ];

  return (
    <div className="space-y-6">
      <Link href="/marketplace" className="text-sm text-kulam hover:underline">
        ← Back to marketplace
      </Link>

      {/* banner */}
      <div
        className="relative flex h-40 items-end rounded-2xl p-5 text-white shadow"
        style={{ background: m.banner }}
      >
        <span className="absolute right-5 top-4 text-6xl opacity-70">🏛️</span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-3xl font-bold">{m.name}</h1>
            {m.verified && (
              <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-kulam-dark">
                ✓ Verified
              </span>
            )}
          </div>
          <p className="text-white/90">
            {m.area}, {m.district}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Stars value={m.rating} />
            <span className="text-sm">
              {m.rating} · {m.reviewCount} reviews
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* left: details + reviews */}
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-kulam-dark">
              About
            </h2>
            <p className="mt-2 text-stone-700">{m.about}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {m.capacityMax && (
                <span className="rounded-full bg-stone-100 px-3 py-1">
                  Capacity {m.capacityMin ? `${m.capacityMin}–` : "up to "}
                  {m.capacityMax}
                </span>
              )}
              {m.plateVeg && (
                <span className="rounded-full bg-stone-100 px-3 py-1">
                  ₹{m.plateVeg}/plate (veg)
                </span>
              )}
              {m.plateNonVeg && (
                <span className="rounded-full bg-stone-100 px-3 py-1">
                  ₹{m.plateNonVeg}/plate (non-veg)
                </span>
              )}
            </div>
            <h3 className="mt-4 text-sm font-semibold text-stone-700">
              Amenities
            </h3>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-stone-600">
              {m.amenities.map((a) => (
                <span key={a} className="rounded bg-emerald-50 px-2 py-0.5">
                  {a}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-kulam-dark">
              Reviews
            </h2>

            {/* write a review (gated) */}
            <form onSubmit={submitReview} className="mt-3 rounded-lg bg-stone-50 p-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-stone-700">
                  Your rating:
                </span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStars(n)}
                    className={n <= stars ? "text-kulam-gold" : "text-stone-300"}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={
                  user
                    ? "Share your experience…"
                    : "Sign in to leave a review…"
                }
                className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam"
                rows={2}
              />
              <button
                type="submit"
                className="mt-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {user ? "Post review" : "Sign in to review"}
              </button>
            </form>

            <ul className="mt-4 space-y-3">
              {allReviews.map((r, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-stone-100 p-3 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-kulam-dark">
                      {r.author}
                      {r.mine && (
                        <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-xs text-emerald-700">
                          You
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-stone-400">{r.when}</span>
                  </div>
                  <Stars value={r.rating} size="text-xs" />
                  <p className="mt-1 text-stone-700">{r.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* right: enquiry box */}
        <div className="space-y-4">
          <div className="sticky top-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-kulam-dark">
              Enquire / Request booking
            </h2>
            {myEnquiry && !sent && (
              <p className="mt-2 rounded bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                You enquired on {myEnquiry.date || "—"} for {myEnquiry.guests}{" "}
                guests.
              </p>
            )}
            {sent ? (
              <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
                ✓ Enquiry sent! The venue will respond in your{" "}
                <Link href="/account" className="font-semibold underline">
                  account
                </Link>
                .
              </div>
            ) : (
              <form onSubmit={submitEnquiry} className="mt-3 space-y-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam"
                />
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Number of guests"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the venue about your event…"
                  rows={3}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-kulam"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-teal-600 to-emerald-500 px-4 py-2.5 font-semibold text-white shadow transition hover:brightness-110"
                >
                  {user ? "Send enquiry" : "Sign in to enquire"}
                </button>
              </form>
            )}
            <button
              onClick={() => requireAuth() && toggleSave(m.id)}
              className="mt-2 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              {saved ? "❤️ Saved" : "🤍 Save to favourites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
