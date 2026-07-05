-- FUTURE PHASE (not required for the current localStorage-based feature).
-- Shared, sign-in-backed Interactive Family Photos. Run when moving off
-- per-browser storage. Images go in a Supabase Storage bucket "family-photos";
-- this stores the metadata + tags.

create table if not exists public.family_photos (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid references auth.users (id) default auth.uid(),
  title       text,
  image_path  text not null,            -- path in the "family-photos" storage bucket
  created_at  timestamptz default now()
);

create table if not exists public.family_photo_tags (
  id            uuid primary key default gen_random_uuid(),
  photo_id      uuid not null references public.family_photos (id) on delete cascade,
  x             double precision not null,  -- 0–100 (% from left)
  y             double precision not null,  -- 0–100 (% from top)
  name          text not null,
  relationship  text,                       -- "Mama (மாமா) · mother's brother"
  intro         text,
  audio_path    text,                        -- optional voice note in the "family-photos" bucket
  kulam_id      bigint references public.kulams (id),  -- optional link to directory
  created_at    timestamptz default now()
);
create index if not exists family_photo_tags_photo_idx on public.family_photo_tags (photo_id);

alter table public.family_photos      enable row level security;
alter table public.family_photo_tags  enable row level security;

-- Owner manages their own photos; tags readable/writable through their photo.
create policy "own photos"      on public.family_photos     for all
  using (auth.uid() = owner) with check (auth.uid() = owner);
create policy "own photo tags"  on public.family_photo_tags for all
  using (exists (select 1 from public.family_photos p
                 where p.id = photo_id and p.owner = auth.uid()))
  with check (exists (select 1 from public.family_photos p
                      where p.id = photo_id and p.owner = auth.uid()));
