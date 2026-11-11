-- Private healthcare leads. Apply to an isolated preview database before release.
create table public.healthcare_enquiries (
 id uuid primary key, reference text not null unique, fingerprint text not null,
 data jsonb not null, status text not null default 'uploading' check(status in ('uploading','received')),
 lease_until timestamptz, created_at timestamptz not null default now(),
 notification_status text not null default 'pending' check(notification_status in ('pending','sending','sent','failed','uncertain')),
 notification_started_at timestamptz, notification_first_attempt_at timestamptz, notification_error text, provider_id text,
 followup_status text not null default 'new' check(followup_status in ('new','reviewing','quoted','closed')),
 staff_notes text not null default '', approved_specification text, approved_by uuid references auth.users(id), approved_at timestamptz
);
create index healthcare_enquiries_created on public.healthcare_enquiries(created_at desc);
create table public.healthcare_enquiry_files (
 id uuid primary key default gen_random_uuid(), enquiry_id uuid not null references public.healthcare_enquiries(id) on delete cascade,
 path text not null unique, name text not null, mime_type text not null, size integer not null,
 created_at timestamptz not null default now()
);
create index healthcare_files_enquiry on public.healthcare_enquiry_files(enquiry_id);
create table public.healthcare_rate_limits (key text primary key, hits integer not null, window_start timestamptz not null);
alter table public.healthcare_enquiries enable row level security;
alter table public.healthcare_enquiry_files enable row level security;
alter table public.healthcare_rate_limits enable row level security;
revoke all on public.healthcare_enquiries, public.healthcare_enquiry_files, public.healthcare_rate_limits from public,anon,authenticated;
grant all on public.healthcare_enquiries, public.healthcare_enquiry_files, public.healthcare_rate_limits to service_role;
-- No direct browser policies: all staff access is through existing Apex staff membership checks.

create function public.healthcare_begin_enquiry(p_id uuid,p_fingerprint text,p_data jsonb,p_rate_key text,p_ip_key text)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare existing public.healthcare_enquiries; hits integer; ip_hits integer; ref text;
begin
 perform pg_advisory_xact_lock(hashtextextended(p_id::text,0));
 select * into existing from public.healthcare_enquiries where id=p_id for update;
 if found then
   if existing.fingerprint<>p_fingerprint then return jsonb_build_object('error','CONFLICT'); end if;
   if existing.status='received' then return jsonb_build_object('complete',true,'reference',existing.reference); end if;
   if existing.lease_until>now() then return jsonb_build_object('error','BUSY'); end if;
   update public.healthcare_enquiries set lease_until=now()+interval '60 seconds' where id=p_id;
   return jsonb_build_object('complete',false,'reference',existing.reference);
 end if;
 delete from public.healthcare_rate_limits where window_start < now()-interval '2 hours';
 insert into public.healthcare_rate_limits as r(key,hits,window_start) values('email:'||p_rate_key,1,now())
 on conflict(key) do update set hits=case when r.window_start<now()-interval '1 hour' then 1 else r.hits+1 end,
 window_start=case when r.window_start<now()-interval '1 hour' then now() else r.window_start end returning r.hits into hits;
 insert into public.healthcare_rate_limits as r(key,hits,window_start) values('ip:'||p_ip_key,1,now())
 on conflict(key) do update set hits=case when r.window_start<now()-interval '1 hour' then 1 else r.hits+1 end,
 window_start=case when r.window_start<now()-interval '1 hour' then now() else r.window_start end returning r.hits into ip_hits;
 if hits>5 or ip_hits>20 then return jsonb_build_object('error','RATE_LIMIT'); end if;
 ref := 'AH-'||upper(replace(p_id::text,'-',''));
 insert into public.healthcare_enquiries(id,reference,fingerprint,data,lease_until) values(p_id,ref,p_fingerprint,p_data,now()+interval '60 seconds');
 return jsonb_build_object('complete',false,'reference',ref);
end; $$;
revoke all on function public.healthcare_begin_enquiry(uuid,text,jsonb,text,text) from public,anon,authenticated;
grant execute on function public.healthcare_begin_enquiry(uuid,text,jsonb,text,text) to service_role;

create function public.healthcare_claim_notification(p_id uuid) returns boolean language plpgsql security invoker set search_path='' as $$
declare e public.healthcare_enquiries;
begin
 select * into e from public.healthcare_enquiries where id=p_id for update;
 if not found or e.status<>'received' or e.notification_status in ('sent','uncertain') then return false; end if;
 if e.notification_status='sending' and e.notification_started_at>now()-interval '2 minutes' then return false; end if;
 if e.notification_first_attempt_at<now()-interval '23 hours' then
   update public.healthcare_enquiries set notification_status='uncertain',notification_error='Check provider logs before sending again: idempotency window elapsed' where id=p_id;
   return false;
 end if;
 update public.healthcare_enquiries set notification_status='sending',notification_started_at=now(),notification_first_attempt_at=coalesce(notification_first_attempt_at,now()) where id=p_id;
 return true;
end; $$;
revoke all on function public.healthcare_claim_notification(uuid) from public,anon,authenticated;
grant execute on function public.healthcare_claim_notification(uuid) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('healthcare-enquiries','healthcare-enquiries',false,3145728,array['image/jpeg','application/pdf']);
-- No public storage policy. Staff download endpoint enforces membership and attachment disposition.
