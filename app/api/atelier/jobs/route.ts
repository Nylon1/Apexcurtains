import { randomUUID } from "node:crypto";
import { jobDataSchema } from "@/lib/atelier/model";
import {
  requireStaff,
  apiError,
  checkOrigin,
  requestJson,
} from "@/lib/atelier/server";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { db } = await requireStaff();
    const { data, error } = await db
      .from("apex_atelier_jobs")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return Response.json(
      { jobs: data },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return apiError(e);
  }
}
export async function POST(req: Request) {
  try {
    checkOrigin(req);
    const { db, user } = await requireStaff();
    const input = jobDataSchema.parse(await requestJson(req));
    const id = randomUUID();
    const { data, error } = await db
      .from("apex_atelier_jobs")
      .insert({
        id,
        reference: `APX-${new Date().getFullYear()}-${id.slice(0, 8).toUpperCase()}`,
        data: input,
        created_by: user.id,
      })
      .select()
      .single();
    if (error) throw error;
    return Response.json({ job: data }, { status: 201 });
  } catch (e) {
    return apiError(e);
  }
}
