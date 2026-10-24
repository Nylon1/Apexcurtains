import path from "node:path";
import sharp from "sharp";
import { brochureImages } from "./brochure";

/** Bundled editorial assets only: never fetch a URL supplied in a survey. */
export async function loadBrochureImages() {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(brochureImages).map(async ([key, file]) => [
        key,
        await sharp(path.join(process.cwd(), "public", file))
          .resize(1400, 1100, { fit: "inside" })
          .flatten({ background: "#F7F3EC" })
          .jpeg({ quality: 88 })
          .toBuffer(),
      ]),
    ),
  );
}
