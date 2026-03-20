import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const baseUrl = "https://apexcurtains.com";

function buildXml(
  urls: Array<{
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: string;
  }>
) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
      ${url.priority ? `<priority>${url.priority}</priority>` : ""}
    </url>`
    )
    .join("")}
</urlset>`;

  return xml;
}

function isRealPageFolder(name: string) {
  return (
    !name.startsWith("(") &&
    !name.startsWith("[") &&
    !name.startsWith("_") &&
    name !== "api" &&
    name !== "page.tsx"
  );
}

function hasPageFile(folderPath: string) {
  return (
    fs.existsSync(path.join(folderPath, "page.tsx")) ||
    fs.existsSync(path.join(folderPath, "page.ts")) ||
    fs.existsSync(path.join(folderPath, "page.jsx")) ||
    fs.existsSync(path.join(folderPath, "page.js"))
  );
}

export async function GET() {
  const adviceDir = path.join(process.cwd(), "app", "advice");
  const now = new Date().toISOString();

  let routes: string[] = [];

  if (fs.existsSync(adviceDir)) {
    const entries = fs.readdirSync(adviceDir, { withFileTypes: true });

    routes = entries
      .filter((entry) => entry.isDirectory() && isRealPageFolder(entry.name))
      .filter((entry) => hasPageFile(path.join(adviceDir, entry.name)))
      .map((entry) => `/advice/${entry.name}`);
  }

  const urls = routes.map((route) => ({
    loc: `${baseUrl}${route}`,
    lastmod: now,
    changefreq: "monthly",
    priority: "0.80",
  }));

  return new NextResponse(buildXml(urls), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}