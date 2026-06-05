# Migration & Upgrade Guide (save this)

Steps for moving from the free trial to commercial / consolidated paid setup,
without losing data or downtime. Keep this file in the repo.

---

## 1. Vercel: Hobby (free) → Pro — SAFE, nothing to lose

Vercel only serves your built app; it stores **no app data**. Upgrading is a
billing change only.

1. vercel.com → your account → **Settings → Billing** → Upgrade to Pro.
2. Done. Same projects, same URLs, same GitHub links, same env vars.
3. No redeploy, no downtime, no data loss. It only raises limits and allows
   commercial use.

---

## 2. Supabase: Free → Pro on the SAME project — SAFE, in place

Keeps the database, tables, rows, auth users, and storage.

1. supabase.com → open the **organization** that owns the project.
2. **Settings → Billing → Upgrade to Pro** ($25/mo per org).
3. Done in place. No migration, no data loss. Also stops the 7-day auto-pause.

---

## 3. Supabase: moving a project to a DIFFERENT account — THE ONE TO PLAN

Only needed if an app's data lives in a throwaway/secondary Google account and
you want it under your main paid account. This IS a real migration. **Back up
first.**

### A. Back up the source
```bash
# Install the Supabase CLI once: https://supabase.com/docs/guides/cli
supabase login
# Dump schema + data from the SOURCE project (get the DB URL from
# Source project → Settings → Database → Connection string)
supabase db dump --db-url "postgresql://...SOURCE..." -f backup.sql
```
Also export anything not in Postgres:
- **Auth users:** Source → Authentication → Users → export (or use the CLI).
- **Storage files:** download buckets if you use Storage.

### B. Restore into the target (paid) account
1. Create a new project in the **target** account.
2. Run your `supabase/schema.sql` there first (or let the dump create tables).
3. Restore:
```bash
psql "postgresql://...TARGET..." -f backup.sql
```

### C. Re-point the app
1. Update `.env.local` → new `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Update the SAME vars in **Vercel → Project → Settings → Environment
   Variables**, then **Redeploy**.
3. Verify the app reads the new project, then retire the old one.

> **Avoid this entirely:** put each keeper app's data in the account you intend
> to keep long-term *from the start*, so you only ever do step 2 (in-place
> upgrade), never step 3.

---

## 4. Always-do before any migration
- Export your data (e.g., the Guest List has an **Export CSV** button; dump DB
  tables) and save a copy off-platform.
- Keep `.env.local` values backed up somewhere safe (they're git-ignored).
- Migrate during low traffic; test the new target before retiring the old one.
