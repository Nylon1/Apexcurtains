import { requireStaff, getJob, apiError, AtelierError } from "@/lib/atelier/server";
import { documentSource, generateTermsCopy } from "@/lib/atelier/documents";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { db } = await requireStaff();
    const job = await getJob((await ctx.params).id, db);
    const url = new URL(req.url);
    const rawVersion = url.searchParams.get("version");
    const revision = rawVersion
      ? Number(rawVersion)
      : job.approved_version === job.version
        ? job.version
        : undefined;
    if (
      revision !== undefined &&
      (!Number.isSafeInteger(revision) || revision < 1)
    ) throw new AtelierError("Invalid document version.", 400);

    const source = await documentSource(job, revision);
    const pdf = await generateTermsCopy(source);
    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${url.searchParams.get("download") === "1" ? "attachment" : "inline"}; filename="${job.reference}-agreed-terms-v${source.job.version}.pdf"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return apiError(error);
  }
}
