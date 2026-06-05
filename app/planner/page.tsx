import WeddingPlanner from "@/components/WeddingPlanner";

export const metadata = { title: "Wedding Planner & Tracker — Kulam Heritage" };

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-kulam-dark">
          My Wedding Planner
        </h1>
        <p className="mt-2 max-w-3xl text-stone-700">
          Starting the process? Set your date and track every task from
          match-making to reception. Tick things off, add your own tasks, and
          watch your progress fill up — everything saves automatically on this
          device.
        </p>
      </header>

      <WeddingPlanner />

      <p className="text-xs italic text-stone-500">
        Your planner is private and stored only in this browser (no account
        needed in v1). Clearing browser data will reset it.
      </p>
    </div>
  );
}
