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
  const shapes = process.argv.includes("--shapes");
  if (shapes) {
    Object.assign(job.data.windows[0], {
      apexShape: "flat-top",
      flatTopWidthMm: 800,
      apexPosition: "offset",
      apexOffsetMm: 1000,
    });
    Object.assign(job.data.windows[1], {
      type: "apex",
      apexShape: "other",
      otherShapeMeasurements:
        "Arched top. Overall width 2200 mm; crown 2600 mm; spring line 2200 mm. Dimensions from the same level baseline.\nConfirm the curved track template against the site photograph.",
    });
  }
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
    await writeFile(`${out}/${shapes ? "shapes-" : ""}${kind}.pdf`, bytes);
    console.log(`${kind}: ${bytes.length} bytes`);
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
