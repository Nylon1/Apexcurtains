import { NextResponse } from "next/server";
import path from "path";
import { buildXml, getChildPageRoutes, dedupeRoutes, fullUrl } from "@/lib/sitemap-utils";

export async function GET() {
  const adviceDir = path.join(process.cwd(), "app", "advice");
  const now = new Date().toISOString();

  const routes = dedupeRoutes(getChildPageRoutes(adviceDir, "/advice"));

  const urls = routes.map((route) => ({
    loc: fullUrl(route),
    lastmod: now,
    changefreq: "monthly",
    priority: "0.80",
  }));

  return new NextResponse(buildXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}