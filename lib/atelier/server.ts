import "server-only";
import { createClient as createSupabase } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { jobDataSchema, type Job, type Asset, type Delivery } from "./model";

export class AtelierError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function service() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key)
    throw new AtelierError(
      "The atelier database connection is unavailable.",
      503,
    );
  return createSupabase(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
export async function requireStaff() {
  const auth = await createClient();
  const {
    data: { user },
    error,
  } = await auth.auth.getUser();
  if (error || !user)
    throw new AtelierError("Please sign in to the Apex Atelier.", 401);
  const { data: member, error: membershipError } = await auth
    .from("apex_atelier_staff")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (membershipError)
    throw new AtelierError(
      "Staff access could not be checked. Please try again.",
      503,
    );
  if (!member)
    throw new AtelierError("This workspace is reserved for Apex staff.", 403);
  return { user, db: service() };
}
export function uuid(value: string) {
  if (!z.uuid().safeParse(value).success)
    throw new AtelierError("Invalid project reference.", 400);
  return value;
}
export async function requestJson(req: Request) {
  if (Number(req.headers.get("content-length") || 0) > 400000)
    throw new AtelierError("The job is too large.", 413);
  const raw = await req.text();
  if (raw.length > 400000) throw new AtelierError("The job is too large.", 413);
  try {
    return JSON.parse(raw);
  } catch {
    throw new AtelierError("Please check the submitted details.");
  }
}
export function checkOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (
    origin &&
    origin !== new URL(req.url).origin &&
    (!/^https?:\/\//.test(origin) ||
      new URL(origin).host !== req.headers.get("host"))
  )
    throw new AtelierError(
      "Please submit this request from the Apex site.",
      403,
    );
  if (req.headers.get("sec-fetch-site") === "cross-site")
    throw new AtelierError("Cross-site requests are not accepted.", 403);
}
export function apiError(error: unknown) {
  if (error instanceof AtelierError)
    return Response.json({ error: error.message }, { status: error.status });
  if (error instanceof z.ZodError)
    return Response.json(
      {
        error: "Please check the highlighted details.",
        issues: error.issues.map((v) => `${v.path.join(".")}: ${v.message}`),
      },
      { status: 400 },
    );
  console.error(
    "Atelier operation failed",
    error instanceof Error ? error.message : "Database operation",
  );
  return Response.json(
    {
      error:
        "We couldn't complete that action. Your saved job is safe; please try again.",
    },
    { status: 500 },
  );
}
export function parseJob(raw: unknown): Job {
  const row = raw as Job;
  return { ...row, data: jobDataSchema.parse(row.data) };
}
export async function getJob(id: string, db = service()) {
  const { data, error } = await db
    .from("apex_atelier_jobs")
    .select("*")
    .eq("id", uuid(id))
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new AtelierError("This project could not be found.", 404);
  return parseJob(data);
}
export async function getAssets(job: Job, db = service()): Promise<Asset[]> {
  const { data, error } = await db
    .from("apex_atelier_assets")
    .select("*")
    .eq("job_id", job.id)
    .in(
      "window_id",
      job.data.windows.map((w) => w.id),
    )
    .order("created_at");
  if (error) throw error;
  return data ?? [];
}
export async function getDeliveries(
  jobId: string,
  db = service(),
): Promise<Delivery[]> {
  const { data, error } = await db
    .from("apex_atelier_deliveries")
    .select("id,revision,kind,recipient,status,sent_at,error")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
