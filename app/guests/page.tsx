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
          Build your wedding guest list — track each guest&apos;s side, head
          count and RSVP status, and see the totals at a glance.
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
