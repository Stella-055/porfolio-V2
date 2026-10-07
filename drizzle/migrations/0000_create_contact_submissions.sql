create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

grant all on public.contact_submissions to service_role;

alter table public.contact_submissions enable row level security;

-- No anon/authenticated policies: submissions are written only from server code.
-- The table stays fully locked to client-facing roles by default.