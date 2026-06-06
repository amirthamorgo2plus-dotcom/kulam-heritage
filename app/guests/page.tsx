import GuestList from "@/components/GuestList";

export const metadata = { title: "Guest List — Kulam Heritage" };

export default function GuestsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          Guest List
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Plan one side at a time — switch between the bride&apos;s and
          groom&apos;s side, add guests with their address, see them on a map,
          track which invitations are given vs pending, and plan a delivery route.
        </p>
      </header>

      <GuestList />

      <p className="text-xs italic text-stone-500">
        Saved on this device for now. Use <strong>Export CSV</strong> to keep a
        backup. When Supabase is connected, your list will move to a secure
        account so it&apos;s safe and reachable from any device.
      </p>
    </div>
  );
}
