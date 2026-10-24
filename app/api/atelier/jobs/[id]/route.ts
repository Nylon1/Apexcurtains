import { z } from "zod";
import { jobDataSchema } from "@/lib/atelier/model";
import {
  requireStaff,
  apiError,
  checkOrigin,
  requestJson,
  getJob,
  getAssets,
  getDeliveries,
  uuid,
  AtelierError,
} from "@/lib/atelier/server";
type Context = { params: Promise<{ id: string }> };
export const dynamic = "force-dynamic";
export async function GET(_req: Request, ctx: Context) {
  try {
    const { db } = await requireStaff();
    const job = await getJob((await ctx.params).id, db);
    const [assets, deliveries] = await Promise.all([
      getAssets(job, db),
      getDeliveries(job.id, db),
    ]);
    return Response.json(
      { job, assets, deliveries },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return apiError(e);
  }
}
export async function PUT(req: Request, ctx: Context) {
  try {
    checkOrigin(req);
    const { db } = await requireStaff();
    const id = uuid((await ctx.params).id);
    const input = z
      .object({ version: z.number().int().positive(), data: jobDataSchema })
      .parse(await requestJson(req));
    const { data, error } = await db
      .from("apex_atelier_jobs")
      .update({
        data: input.data,
        version: input.version + 1,
        status: "draft",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("version", input.version)
      .select()
      .maybeSingle();
    if (error) throw error;
    if (!data)
      throw new AtelierError(
        "This job changed in another tab. Reload it before saving so no work is overwritten.",
        409,
      );
    return Response.json({ job: data });
  } catch (e) {
    return apiError(e);
  }
}
