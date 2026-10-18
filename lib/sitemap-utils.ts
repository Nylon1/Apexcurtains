export const baseUrl = "https://www.apexcurtains.com";

export type XmlUrlItem = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  images?: string[];
};

export function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;",
  })[character]!);
}

export function formatSitemapDate(value?: string | Date | null) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().split("T")[0];
}

export function buildXml(urls: XmlUrlItem[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${dedupeByLoc(urls)
    .map((url) => ({ ...url, lastmod: formatSitemapDate(url.lastmod) }))
    .map(
      (url) => `
    <url>
      <loc>${escapeXml(url.loc)}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
      ${url.changefreq ? `<changefreq>${escapeXml(url.changefreq)}</changefreq>` : ""}
      ${url.priority ? `<priority>${escapeXml(url.priority)}</priority>` : ""}
      ${[...new Set((url.images || []).filter(Boolean))]
        .map(
          (img) => `
      <image:image>
        <image:loc>${escapeXml(img)}</image:loc>
      </image:image>`
        )
        .join("")}
    </url>`
    )
    .join("")}
</urlset>`;
}

export function fullUrl(route: string) {
  return `${baseUrl}${route}`;
}

export function fullImageUrl(imagePath: string) {
  if (!imagePath) return "";
  try {
    const url = new URL(imagePath, `${baseUrl}/`);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

export function dedupeByLoc<T extends { loc: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.loc || item.loc.includes("undefined") || seen.has(item.loc)) return false;
    seen.add(item.loc);
    return true;
  });
}
