import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { z } from "zod";
import {
  requireStaff,
  apiError,
  checkOrigin,
  getJob,
  AtelierError,
} from "@/lib/atelier/server";
export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    checkOrigin(req);
    const { db } = await requireStaff();
    const job = await getJob((await ctx.params).id, db);
    if (job.status !== "draft")
      throw new AtelierError(
        "Save a new draft before adding photos to an approved job.",
        409,
      );
    if (Number(req.headers.get("content-length") || 0) > 4000000)
      throw new AtelierError("Please choose an image smaller than 4 MB.", 413);
    const form = await req.formData();
    const windowId = z.uuid().parse(form.get("windowId"));
    const kind = z.enum(["window", "fabric", "detail"]).parse(form.get("kind"));
    const file = form.get("file");
    if (!job.data.windows.some((w) => w.id === windowId))
      throw new AtelierError("Save this window before adding a photograph.");
    if (
      !(file instanceof File) ||
      file.size > 3800000 ||
      !file.type.startsWith("image/")
    )
      throw new AtelierError("Choose a JPG, PNG or WebP image under 3.8 MB.");
    const { count } = await db
      .from("apex_atelier_assets")
      .select("id", { count: "exact", head: true })
      .eq("job_id", job.id)
      .eq("window_id", windowId);
    if ((count ?? 0) >= 6)
      throw new AtelierError("Each window can hold up to six photographs.");
    const buffer = await sharp(Buffer.from(await file.arrayBuffer()), {
      limitInputPixels: 40000000,
    })
      .rotate()
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 84 })
      .toBuffer();
    const id = randomUUID(),
      path = `${job.id}/${windowId}/${id}.jpg`;
    const { error: uploadError } = await db.storage
      .from("apex-atelier")
      .upload(path, buffer, { contentType: "image/jpeg", upsert: false });
    if (uploadError) throw uploadError;
    const { data, error } = await db
      .from("apex_atelier_assets")
      .insert({
        id,
        job_id: job.id,
        window_id: windowId,
        kind,
        path,
        caption: String(form.get("caption") || "").slice(0, 300),
      })
      .select()
      .single();
    if (error) {
      await db.storage.from("apex-atelier").remove([path]);
      throw error;
    }
    return Response.json({ asset: data });
  } catch (e) {
    return apiError(e);
  }
}
