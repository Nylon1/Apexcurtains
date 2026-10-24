import { z } from "zod";
import {
  requireStaff,
  getJob,
  apiError,
  AtelierError,
} from "@/lib/atelier/server";
import { documentSource, generateDocument } from "@/lib/atelier/documents";
export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";
export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string; kind: string }> },
) {
  try {
    const { db } = await requireStaff();
    const { id, kind: raw } = await ctx.params,
      kind = z.enum(["brochure", "workroom", "fitter"]).parse(raw);
    const job = await getJob(id, db);
    const url = new URL(req.url),
      version = url.searchParams.get("version");
    const revision = version
      ? Number(version)
      : job.approved_version === job.version
        ? job.version
        : undefined;
    if (
      revision !== undefined &&
      (!Number.isSafeInteger(revision) || revision < 1)
    )
      throw new AtelierError("Invalid document version.");
    const pdf = await generateDocument(
      kind,
      await documentSource(job, revision),
    );
    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${url.searchParams.get("download") === "1" ? "attachment" : "inline"}; filename="${job.reference}-${kind}-v${revision ?? job.version}.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    return apiError(e);
  }
}
