-- One O Buildcon — Supabase schema for the admin project manager.
-- Run this in the Supabase SQL editor (Dashboard > SQL).

-- 1. Projects table -----------------------------------------------------------
create table if not exists public.projects (
  slug                  text primary key,
  sort_order            integer not null default 0,
  category              text not null,                 -- bungalow | rowhouse | residential | farmhouse
  status                text not null,                 -- completed | ongoing | pipeline
  area                  text,
  year                  text,
  duration              text,
  budget                text,

  -- English content
  en_name               text not null,
  en_type               text,
  en_location           text,
  en_desc               text,
  en_highlights         text[] default '{}',
  en_testimonial_quote  text,
  en_testimonial_author text,

  -- Marathi content (optional — UI falls back to English when empty)
  mr_name               text,
  mr_type               text,
  mr_location           text,
  mr_desc               text,
  mr_highlights         text[] default '{}',
  mr_testimonial_quote  text,
  mr_testimonial_author text,

  -- Gallery
  photos                text[] default '{}',

  created_at            timestamptz not null default now()
);

create index if not exists projects_sort_order_idx on public.projects (sort_order);

-- 2. Row Level Security -------------------------------------------------------
-- Public read access (the marketing site reads via the anon key on the server,
-- but writes always go through the service-role key which bypasses RLS).
alter table public.projects enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
  on public.projects for select
  using (true);

-- 3. Storage bucket for project photos ---------------------------------------
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do nothing;

-- Public read of photos.
drop policy if exists "Public can read project photos" on storage.objects;
create policy "Public can read project photos"
  on storage.objects for select
  using (bucket_id = 'projects');

-- Uploads/deletes are performed server-side with the service-role key, which
-- bypasses storage RLS. If you want to allow authenticated client uploads,
-- add insert/delete policies scoped to bucket_id = 'projects' here.
