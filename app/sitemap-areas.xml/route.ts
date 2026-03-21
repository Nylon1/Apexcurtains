import { NextResponse } from "next/server";
import { cityPages } from "@/lib/cities";
import { buildXml, dedupeByLoc, fullUrl } from "@/lib/sitemap-utils";

export async function GET() {
  const urls = dedupeByLoc(
    cityPages.map((city) => ({
      loc: fullUrl(`/areas/${city.slug}`),
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.78",
    }))
  );

  return new NextResponse(buildXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}