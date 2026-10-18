import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

// Reproducible derivatives only. Originals and governed catalogue are untouched.
const root = process.cwd();
const sources = JSON.parse(
  await fs.readFile("lib/visualiser/scene-sources.json", "utf8"),
);
const fabrics = JSON.parse(await fs.readFile("lib/oslo-fabrics.json", "utf8"));
const output = path.join(root, "public/visualiser");
await fs.mkdir(output, { recursive: true });
const palette = [];
for (const fabric of fabrics) {
  const input = await fs.readFile(path.join(root, "public", fabric.image));
  const { width, height } = await sharp(input).metadata();
  const { data, info } = await sharp(input)
    .extract({
      left: Math.floor(width * 0.2),
      top: Math.floor(height * 0.2),
      width: Math.floor(width * 0.6),
      height: Math.floor(height * 0.6),
    })
    .removeAlpha()
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const channels = [[], [], []];
  for (let i = 0; i < data.length; i += info.channels)
    for (let c = 0; c < 3; c++) channels[c].push(data[i + c]);
  const rgb = channels.map(
    (values) => values.sort((a, b) => a - b)[Math.floor(values.length / 2)],
  );
  palette.push({
    reference: fabric.reference,
    rgb,
    swatchSha256: createHash("sha256").update(input).digest("hex"),
  });
}
await fs.writeFile(
  "lib/visualiser/oslo-display-colours.json",
  JSON.stringify(
    {
      method:
        "Median sRGB of central 60% of each governed Oslo swatch. Display approximation, not a measured fabric colour.",
      colours: palette,
    },
    null,
    2,
  ) + "\n",
);
const manifest = [];
for (const scene of sources) {
  const input = await fs.readFile(path.join(root, "public", scene.source));
  const meta = await sharp(input).metadata();
  // Traces use a fixed viewBox; originals may have higher pixel density.
  if (Math.abs(meta.width / meta.height - scene.width / scene.height) > 0.001)
    throw Error(
      `Mask aspect ratio does not match ${scene.id}: ${meta.width}x${meta.height}`,
    );
  const assets = [];
  for (const [suffix, width, quality] of [
    ["mobile", 720, 86],
    ["desktop", 1200, 90],
    ["thumb", 160, 75],
  ]) {
    const filename = `${scene.id}-${suffix}.webp`;
    const bytes = await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    await fs.writeFile(path.join(output, filename), bytes);
    assets.push({
      file: `/visualiser/${filename}`,
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
  }
  manifest.push({
    id: scene.id,
    original: scene.source,
    originalSha256: createHash("sha256").update(input).digest("hex"),
    assets,
  });
}
await fs.writeFile(
  "lib/visualiser/assets.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  `Prepared ${sources.length} scenes and ${palette.length} sourced Oslo display colours.`,
);
