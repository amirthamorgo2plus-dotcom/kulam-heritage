-- Page-view tracking. Written server-side by /api/track (service-role key only).
-- Consumed by an external admin dashboard later. Run this in the Supabase SQL editor.

create table if not exists page_views (
  path text not null,
  viewed_at date not null default current_date,
  count integer not null default 1,
  primary key (path, viewed_at)
);

-- Speeds up the dashboard's date-range / trend queries.
create index if not exists page_views_date_idx on page_views (viewed_at desc);

alter table page_views enable row level security;

-- No anon/public access at all. Only the service-role key (used by /api/track)
-- can write, because the service role bypasses RLS. With no permissive policy,
-- inserts/updates from anon are default-denied.
create policy "service role only" on page_views using (false);

-- Atomic upsert-increment. supabase-js .upsert() can't express `count = count + 1`,
-- so the API route calls this via rpc('increment_page_view', { p_path }).
-- SECURITY INVOKER (default): if a non-service-role ever calls it, RLS still blocks
-- the write.
create or replace function increment_page_view(p_path text)
returns void
language sql
as $$
  insert into page_views (path, viewed_at, count)
  values (p_path, current_date, 1)
  on conflict (path, viewed_at)
  do update set count = page_views.count + 1;
$$;
