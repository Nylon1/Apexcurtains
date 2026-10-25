import { readFile, mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Reuse the existing brand artwork, with room for rounded and maskable icons.
const logo = await readFile(
  "public/images/apex-logo-stacked-light.svg",
  "utf8",
);
const paths = logo
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>[\s\S]*$/, "");
await mkdir("public/web-apps", { recursive: true });
for (const [kind, background] of [
  ["public", "#1b3430"],
  ["admin", "#102b3b"],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="${background}"/><g transform="translate(106 62) scale(.3)">${paths}</g></svg>`;
  await writeFile(`public/web-apps/${kind}-icon.svg`, svg);
  for (const size of [180, 192, 512])
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(`public/web-apps/${kind}-${size}.png`);
}
