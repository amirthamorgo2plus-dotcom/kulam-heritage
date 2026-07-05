"use client";

import Link from "next/link";
import InteractivePhoto from "./InteractivePhoto";
import { sampleFamilyPhoto, sampleFamilyTags } from "@/data/familyPhoto";

// Read-only, pre-tagged demo for the homepage — the "wow" hook.
export default function FamilyPhotoDemo() {
  return (
    <section className="rounded-3xl border border-kulam-gold/30 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm sm:p-10">
      <div className="text-center">
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-700">
          New
        </span>
        <h2 className="mt-3 font-serif text-3xl font-bold text-kulam-dark">
          Our Family — tap a person
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-stone-600">
          Hover or tap the glowing dots to see who&apos;s who — in our own Tamil
          kinship words. Teach the next generation and the diaspora how everyone
          is related.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl">
        <InteractivePhoto src={sampleFamilyPhoto} tags={sampleFamilyTags} />
        <p className="mt-2 text-center text-xs italic text-stone-400">
          🖼️ Sample photo is AI-generated for illustration — the names and
          relationships are examples.
        </p>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/family-photo"
          className="inline-block rounded-xl bg-kulam px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
        >
          Make your own interactive photo →
        </Link>
      </div>
    </section>
  );
}
