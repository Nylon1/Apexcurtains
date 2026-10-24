import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  type Job,
  type Asset,
  type DocumentKind,
  jobDataSchema,
  selectedFabricPhoto,
} from "./model";
import { renderJobPdf } from "./pdf";
import { service, getAssets, AtelierError } from "./server";

export async function documentSource(job: Job, revision?: number) {
  const db = service();
  if (revision) {
    const { data, error } = await db
      .from("apex_atelier_revisions")
      .select("data,assets")
      .eq("job_id", job.id)
      .eq("revision", revision)
      .maybeSingle();
    if (error) throw error;
    if (!data)
      throw new AtelierError("That approved version was not found.", 404);
    return {
      job: { ...job, version: revision, data: jobDataSchema.parse(data.data) },
      assets: data.assets as Asset[],
      draft: false,
    };
  }
  return {
    job,
    assets: await getAssets(job, db),
    draft: job.approved_version !== job.version,
  };
}
export async function generateDocument(
  kind: DocumentKind,
  source: { job: Job; assets: Asset[]; draft: boolean },
) {
  const db = service(),
    photos: Record<string, Buffer> = {};
  // Fetch only images needed for the documents; never fetch arbitrary URLs supplied by a user.
  const selected = source.assets.filter(
    (a, i, all) =>
      kind !== "brochure" ||
      (a.kind === "fabric"
        ? selectedFabricPhoto(all, a.window_id)?.id === a.id
        : all.findIndex(
            (b) => b.window_id === a.window_id && b.kind === a.kind,
          ) === i && a.kind === "window"),
  );
  for (let i = 0; i < selected.length; i += 5) {
    await Promise.all(
      selected.slice(i, i + 5).map(async (a) => {
        const { data, error } = await db.storage
          .from("apex-atelier")
          .download(a.path);
        if (error || !data)
          throw new AtelierError(
            "A saved image could not be loaded. Try again before releasing the documents.",
            503,
          );
        photos[a.id] = await sharp(Buffer.from(await data.arrayBuffer()))
          .resize(1100, 1000, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toBuffer();
      }),
    );
  }
  const inspiration = await sharp(
    await readFile(
      path.join(
        process.cwd(),
        "public/visualiser/double-pinch-gable-desktop.webp",
      ),
    ),
  )
    .resize(1200, 1000, { fit: "inside" })
    .jpeg({ quality: 85 })
    .toBuffer();
  return renderJobPdf(kind, { ...source, photos, inspiration });
}
