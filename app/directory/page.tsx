import KulamDirectory from "@/components/KulamDirectory";

export const metadata = { title: "Kulam Directory — Kulam Heritage" };

export default function DirectoryPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Kulam Directory
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          The Kammavar kulam list — search by surname (inti peru), gothram, kula
          deivam temple or place to find your family&apos;s clan and deity.
        </p>
      </header>

      <KulamDirectory />

      <p className="text-xs italic text-stone-500">
        Transcribed from the community&apos;s published Kammavar kulam / gothram /
        kuladeivam list. Spellings follow the source; please report corrections.
      </p>
    </div>
  );
}
