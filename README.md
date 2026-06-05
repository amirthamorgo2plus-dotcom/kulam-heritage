# Kulam Heritage

A heritage & wedding-planning web app for the Tamil Nadu **Kammavar Naidu** community —
history, kulam directory, rituals, kula deivam temple map, horoscope matching,
kalyana mandapams, wedding vendors, and a personal wedding-task planner.

Built with **Next.js 14 + Tailwind CSS**. Works fully standalone (no database
required); Supabase is optional for a larger, admin-managed catalog later.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3002

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com) — it
auto-detects Next.js. No environment variables are required to run as-is.

## Optional: Supabase (for a growing catalog)

1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. Copy `.env.local.example` → `.env.local` and fill in your keys.
3. Seed the kulam list: `node scripts/seed-kulams.mjs`

## Notes

Content (kulam list, rituals, vendors) is community-sourced / illustrative and
should be verified with elders and a qualified astrologer before relying on it.
