import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { sampleJob, type DocumentKind } from "../lib/atelier/model";
import { renderJobPdf } from "../lib/atelier/pdf";
import { forestTracks } from "../lib/atelier/tracks";
import { loadBrochureImages } from "../lib/atelier/brochure-assets";

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
  const illustrations = await loadBrochureImages();
  const shapes = process.argv.includes("--shapes");
  const long = process.argv.includes("--long");
  const multi = process.argv.includes("--multi");
  const widthCheck = process.argv.includes("--width-check");
  if (widthCheck) {
    const first = job.data.windows[0];
    job.data.windows = [
      [1410, 2140, 1615, 47.7],
      [1370, 2090, 1615, 477],
      [1360, 1470, 1020, 477],
    ].map(([widthMm, longDropMm, sideDrop, repeatMm], index) => ({
      ...first,
      id: `width-check-${index}`,
      name: `Allowance example ${index + 1}`,
      widthMm,
      longDropMm,
      leftDropMm: sideDrop,
      rightDropMm: sideDrop,
      fabricWidthMm: 1370,
      liningWidthMm: 1370,
      pattern: "straight" as const,
      repeatMm,
      heading: "Pencil pleat",
      fabricCode:
        "https://example.com/fabric-library?view=browse-fabrics&query=illustrative-fabric&page=1",
      designNotes:
        "Illustrative calculation check. Pattern repeats are intentionally different to verify the entered values are preserved.",
    }));
  }
  if (multi) {
    const [apex, standard] = job.data.windows;
    job.data.windows = Array.from({ length: 6 }, (_, i) => ({
      ...(i % 2 ? standard : apex),
      id: `multi-window-${i + 1}`,
      room: ["Drawing room", "Principal bedroom", "Garden room"][i % 3],
      name: i < 3 ? "Main window" : "Side window",
      colour: [
        "Warm flax",
        "Soft sage",
        "Deep blue",
        "Terracotta",
        "Dusky rose",
        "Charcoal",
      ][i],
      designNotes: "",
    }));
  }
  if (long) {
    job.data.customerEmail = "alexandra@example.com";
    job.data.phone = "0800 000 0000";
    job.data.customerName =
      "Alexandra & Christopher Montgomery-Wellington and family";
    job.data.address =
      "The Old Rectory, Garden Wing\n14 Long Meadow Lane\nLittle Wetherington\nWestshire\nAB12 3CD\nFictional pagination sample only";
    job.data.welcomeNote =
      "This collection brings quiet texture and thoughtful detail to the rooms you share. ".repeat(
        20,
      ) + "WELCOME END";
    job.data.windows[0].designNotes =
      "A gentle palette of warm flax and soft chalk connects the window with the garden. Compare the cloth with your furnishings in daylight and evening light. ".repeat(
        11,
      ) + "DESIGN END";
    job.data.windows[0].careInstructions =
      "Please refer to the sewn-in label and contact Apex before any professional treatment. Keep this advice with the collection for future reference. ".repeat(
        15,
      ) + "CARE END";
    job.data.voucherDetails =
      "Please quote the personal code when discussing your next order. ".repeat(
        10,
      ) + "VOUCHER END";
    job.data.windows[0].patternNotes =
      "Keep the chosen motif aligned across the panels and confirm the sample before cutting. ".repeat(
        12,
      ) + "SPECIFICATION END";
  }
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
      illustrations,
      trackPhotos: Object.fromEntries(
        await Promise.all(
          forestTracks.map(async (track) => [
            track.id,
            await sharp(`public${track.image}`)
              .flatten({ background: "#ffffff" })
              .jpeg()
              .toBuffer(),
          ]),
        ),
      ),
      draft: true,
    });
    await writeFile(
      `${out}/${widthCheck ? "width-check-" : multi ? "multi-" : long ? "long-" : shapes ? "shapes-" : ""}${kind}.pdf`,
      bytes,
    );
    console.log(`${kind}: ${bytes.length} bytes`);
  }
}
main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
