import KulamDirectory, { type Kulam } from "@/components/KulamDirectory";
import { supabase } from "@/lib/supabase";
import kulamsJson from "@/data/kulams.json";

export const metadata = { title: "Kulam Directory — Kulam Heritage" };
// Always fetch fresh so newly added kulams show up immediately.
export const dynamic = "force-dynamic";

async function getKulams(): Promise<{ rows: Kulam[]; source: string }> {
  if (supabase) {
    const { data, error } = await supabase
      .from("kulams")
      .select("id, surname, house, gothram, kuladeivam, place")
      .order("id");
    if (!error && data && data.length) return { rows: data as Kulam[], source: "database" };
  }
  // Fallback to the bundled list if Supabase isn't configured/reachable.
  return { rows: kulamsJson as Kulam[], source: "file" };
}

export default async function DirectoryPage() {
  const { rows } = await getKulams();
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

      <KulamDirectory data={rows} />

      <p className="text-xs italic text-stone-500">
        Transcribed from the community&apos;s published Kammavar kulam / gothram /
        kuladeivam list. Spellings follow the source; please report corrections.
      </p>
    </div>
  );
}
