import fs from "fs";
import path from "path";

export const baseUrl = "https://apexcurtains.com";

export type XmlUrlItem = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  images?: string[];
};

export function buildXml(urls: XmlUrlItem[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
      ${url.priority ? `<priority>${url.priority}</priority>` : ""}
      ${(url.images || [])
        .map(
          (img) => `
      <image:image>
        <image:loc>${img}</image:loc>
      </image:image>`
        )
        .join("")}
    </url>`
    )
    .join("")}
</urlset>`;
}

export function hasPageFile(folderPath: string) {
  return (
    fs.existsSync(path.join(folderPath, "page.tsx")) ||
    fs.existsSync(path.join(folderPath, "page.ts")) ||
    fs.existsSync(path.join(folderPath, "page.jsx")) ||
    fs.existsSync(path.join(folderPath, "page.js"))
  );
}

export function isRealPageFolder(name: string) {
  return (
    !name.startsWith("(") &&
    !name.startsWith("[") &&
    !name.startsWith("_") &&
    name !== "api" &&
    name !== "admin" &&
    name !== "layout" &&
    name !== "ui" &&
    name !== "seo" &&
    name !== "undefined"
  );
}

export function getChildPageRoutes(folderPath: string, baseRoute: string): string[] {
  if (!fs.existsSync(folderPath)) return [];

  const entries = fs.readdirSync(folderPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && isRealPageFolder(entry.name))
    .filter((entry) => hasPageFile(path.join(folderPath, entry.name)))
    .map((entry) => `${baseRoute}/${entry.name}`);
}

export function dedupeRoutes(routes: string[]) {
  return [...new Set(routes)].filter(Boolean).filter((route) => !route.includes("undefined"));
}

export function fullUrl(route: string) {
  return `${baseUrl}${route}`;
}

export function fullImageUrl(imagePath: string) {
  if (imagePath.startsWith("http")) return imagePath;
  return `${baseUrl}${imagePath}`;
}

export function fileExistsInPublic(relativePath: string) {
  const publicDir = path.join(process.cwd(), "public");
  return fs.existsSync(path.join(publicDir, relativePath.replace(/^\//, "")));
}