import RitualsLibrary from "@/components/RitualsLibrary";

export const metadata = { title: "Rituals Library — Kulam Heritage" };

export default function RitualsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Rituals Library
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Kammavar Naidu ceremonies in our own words — the story behind each one,
          how it is kept, and the reasoning our elders gave. Shown in Tamil with
          an English reading alongside.
        </p>
      </header>

      <RitualsLibrary />

      <p className="text-xs italic text-stone-500">
        These are community traditions passed down through generations, not
        academic history — customs vary by family and region. Please verify with
        your elders. More rituals are being added from community sources.
      </p>
    </div>
  );
}
