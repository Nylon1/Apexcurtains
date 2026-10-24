import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { sampleJob, type DocumentKind } from "../lib/atelier/model";
import { renderJobPdf } from "../lib/atelier/pdf";

async function main() {
  const out = ".next/atelier-qa";
  await mkdir(out, { recursive: true });
  const inspiration = await sharp(
    "public/visualiser/double-pinch-gable-desktop.webp",
  )
    .resize(1200)
    .jpeg({ quality: 85 })
    .toBuffer();
  const job = sampleJob();
  for (const kind of ["brochure", "workroom", "fitter"] as DocumentKind[]) {
    const bytes = await renderJobPdf(kind, {
      job,
      assets: [],
      photos: {},
      inspiration,
      trackPhotos: {
        "forest-ks": await sharp("public/atelier-products/forest-ks-white.webp")
          .flatten({ background: "#ffffff" })
          .jpeg()
          .toBuffer(),
      },
      draft: true,
    });
    await writeFile(`${out}/${kind}.pdf`, bytes);
    console.log(`${kind}: ${bytes.length} bytes`);
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
