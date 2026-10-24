import {
  requireStaff,
  apiError,
  uuid,
  AtelierError,
} from "@/lib/atelier/server";
export const dynamic = "force-dynamic";
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { db } = await requireStaff();
    const id = uuid((await ctx.params).id);
    const { data: asset, error } = await db
      .from("apex_atelier_assets")
      .select("path")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    if (!asset) throw new AtelierError("Image not found.", 404);
    const { data, error: download } = await db.storage
      .from("apex-atelier")
      .download(asset.path);
    if (download || !data) throw download;
    return new Response(await data.arrayBuffer(), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e) {
    return apiError(e);
  }
}
