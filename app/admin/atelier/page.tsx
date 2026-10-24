import Atelier from "@/components/atelier/Atelier";
import AtelierLogin from "@/components/atelier/Login";
import { requireStaff, AtelierError, parseJob } from "@/lib/atelier/server";
import type { Job } from "@/lib/atelier/model";
export const dynamic = "force-dynamic";
export default async function Page() {
  let jobs: Job[] = [];
  let denied: boolean | null = null;
  try {
    const { db } = await requireStaff();
    const { data, error } = await db
      .from("apex_atelier_jobs")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    jobs = (data ?? []).map(parseJob);
  } catch (e) {
    if (e instanceof AtelierError && [401, 403].includes(e.status))
      denied = e.status === 403;
    else throw e;
  }
  return denied === null ? (
    <Atelier initialJobs={jobs} />
  ) : (
    <AtelierLogin denied={denied} />
  );
}
