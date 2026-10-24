import { z } from "zod";
import { approvalIssues } from "@/lib/atelier/model";
import {
  requireStaff,
  apiError,
  checkOrigin,
  requestJson,
  getJob,
  getAssets,
  AtelierError,
} from "@/lib/atelier/server";
export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    checkOrigin(req);
    const { db, user } = await requireStaff();
    const { version } = z
      .object({ version: z.number().int().positive() })
      .parse(await requestJson(req));
    const job = await getJob((await ctx.params).id, db);
    if (job.version !== version)
      throw new AtelierError(
        "Save and review the latest version before approving.",
        409,
      );
    const assets = await getAssets(job, db),
      issues = approvalIssues(job.data, assets);
    if (issues.length)
      return Response.json(
        { error: "A few details need your attention before release.", issues },
        { status: 422 },
      );
    const { error } = await db.rpc("apex_atelier_approve", {
      p_job_id: job.id,
      p_version: version,
      p_actor: user.id,
    });
    if (error) {
      if (error.message.includes("VERSION_CONFLICT"))
        throw new AtelierError(
          "This job changed during review. Please review it again.",
          409,
        );
      throw error;
    }
    return Response.json({ job: await getJob(job.id, db) });
  } catch (e) {
    return apiError(e);
  }
}
