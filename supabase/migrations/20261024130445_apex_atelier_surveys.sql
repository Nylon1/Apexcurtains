-- Apex Atelier is an internal staff workspace, separate from customer accounts.
create table public.apex_atelier_staff (
 user_id uuid primary key references auth.users(id) on delete cascade,
 created_at timestamptz not null default now()
);
alter table public.apex_atelier_staff enable row level security;
revoke all on public.apex_atelier_staff from anon, authenticated;
grant select on public.apex_atelier_staff to authenticated;
grant all on public.apex_atelier_staff to service_role;
create policy "Read own atelier membership" on public.apex_atelier_staff for select to authenticated using (user_id = (select auth.uid()));
-- Preserve the existing CMS owner's access, established by its gallery policies.
insert into public.apex_atelier_staff(user_id)
 select id from auth.users where lower(email)='hmaliks924@gmail.com' and email_confirmed_at is not null;

create table public.apex_atelier_jobs (
 id uuid primary key default gen_random_uuid(), reference text unique not null,
 version integer not null default 1 check(version>0), approved_version integer,
 status text not null default 'draft' check(status in ('draft','approved','complete')),
 data jsonb not null, completion jsonb not null default '{}',
 created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.apex_atelier_assets (
 id uuid primary key default gen_random_uuid(), job_id uuid not null references public.apex_atelier_jobs(id) on delete cascade,
 window_id uuid not null, kind text not null check(kind in ('window','fabric','detail')),
 path text not null unique, caption text not null default '', created_at timestamptz not null default now()
);
create index on public.apex_atelier_assets(job_id);
create table public.apex_atelier_revisions (
 job_id uuid not null references public.apex_atelier_jobs(id) on delete cascade,
 revision integer not null, data jsonb not null, assets jsonb not null,
 approved_by uuid not null references auth.users(id), approved_at timestamptz not null default now(),
 primary key(job_id,revision)
);
create table public.apex_atelier_deliveries (
 id uuid primary key default gen_random_uuid(), job_id uuid not null, revision integer not null,
 kind text not null check(kind in ('brochure','workroom','fitter')), recipient text not null,
 status text not null default 'pending' check(status in ('pending','sending','sent','failed','uncertain')),
 provider_id text, error text, pdf_path text, started_at timestamptz, first_attempt_at timestamptz,
 sent_at timestamptz, created_at timestamptz not null default now(),
 foreign key(job_id,revision) references public.apex_atelier_revisions(job_id,revision) on delete cascade,
 unique(job_id,revision,kind)
);
create index on public.apex_atelier_deliveries(job_id);

alter table public.apex_atelier_jobs enable row level security;
alter table public.apex_atelier_assets enable row level security;
alter table public.apex_atelier_revisions enable row level security;
alter table public.apex_atelier_deliveries enable row level security;
revoke all on public.apex_atelier_jobs, public.apex_atelier_assets, public.apex_atelier_revisions, public.apex_atelier_deliveries from anon, authenticated;
grant select on public.apex_atelier_jobs, public.apex_atelier_assets, public.apex_atelier_revisions, public.apex_atelier_deliveries to authenticated;
grant all on public.apex_atelier_jobs, public.apex_atelier_assets, public.apex_atelier_revisions, public.apex_atelier_deliveries to service_role;
create policy "Staff read jobs" on public.apex_atelier_jobs for select to authenticated using (exists(select 1 from public.apex_atelier_staff where user_id=(select auth.uid())));
create policy "Staff read assets" on public.apex_atelier_assets for select to authenticated using (exists(select 1 from public.apex_atelier_staff where user_id=(select auth.uid())));
create policy "Staff read revisions" on public.apex_atelier_revisions for select to authenticated using (exists(select 1 from public.apex_atelier_staff where user_id=(select auth.uid())));
create policy "Staff read delivery log" on public.apex_atelier_deliveries for select to authenticated using (exists(select 1 from public.apex_atelier_staff where user_id=(select auth.uid())));

-- An approval freezes both data and image references and queues all recipients atomically.
create function public.apex_atelier_approve(p_job_id uuid,p_version integer,p_actor uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare j public.apex_atelier_jobs; images jsonb;
begin
 if not exists(select 1 from public.apex_atelier_staff where user_id=p_actor) then raise exception 'STAFF_REQUIRED'; end if;
 select * into j from public.apex_atelier_jobs where id=p_job_id for update;
 if not found then raise exception 'NOT_FOUND'; end if;
 if j.version<>p_version then raise exception 'VERSION_CONFLICT'; end if;
 select coalesce(jsonb_agg(to_jsonb(a)),'[]') into images from public.apex_atelier_assets a where job_id=p_job_id and window_id::text in (select value->>'id' from jsonb_array_elements(j.data->'windows'));
 insert into public.apex_atelier_revisions(job_id,revision,data,assets,approved_by) values(j.id,j.version,j.data,images,p_actor) on conflict do nothing;
 insert into public.apex_atelier_deliveries(job_id,revision,kind,recipient) values
 (j.id,j.version,'brochure',j.data->>'customerEmail'),(j.id,j.version,'workroom',j.data->>'workshopEmail'),(j.id,j.version,'fitter',j.data->>'fitterEmail') on conflict do nothing;
 update public.apex_atelier_jobs set approved_version=j.version,status='approved',updated_at=now() where id=j.id;
 return jsonb_build_object('revision',j.version);
end; $$;
revoke all on function public.apex_atelier_approve(uuid,integer,uuid) from public,anon,authenticated;
grant execute on function public.apex_atelier_approve(uuid,integer,uuid) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('apex-atelier','apex-atelier',false,10485760,array['image/jpeg','application/pdf']);
-- Storage is served only through authenticated, staff-checked server endpoints.
