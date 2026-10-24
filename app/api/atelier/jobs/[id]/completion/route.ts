import { z } from "zod";
import { handoverChecklist } from "@/lib/atelier/model";
import {
  requireStaff,
  apiError,
  checkOrigin,
  requestJson,
  getJob,
  AtelierError,
} from "@/lib/atelier/server";
export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    checkOrigin(req);
    const { db } = await requireStaff();
    const job = await getJob((await ctx.params).id, db);
    const input = z
      .object({
        checks: z.record(z.string().max(250), z.boolean()),
        complete: z.boolean().default(false),
      })
      .parse(await requestJson(req));
    if (Object.keys(input.checks).length > 100)
      throw new AtelierError("Too many checklist items.");
    const handoverDone = handoverChecklist.every((item) => input.checks[item]);
    if (input.complete && !handoverDone)
      throw new AtelierError(
        "Finish the handover checks before completing this project.",
      );
    if (
      input.complete &&
      (job.approved_version !== job.version || job.status === "draft")
    )
      throw new AtelierError("Approve the latest job before completing it.");
    const { data, error } = await db
      .from("apex_atelier_jobs")
      .update({
        completion: input.checks,
        status: input.complete
          ? "complete"
          : job.status === "complete" && !handoverDone
            ? "approved"
            : job.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", job.id)
      .eq("version", job.version)
      .select()
      .single();
    if (error) throw error;
    return Response.json({ job: data });
  } catch (e) {
    return apiError(e);
  }
}
