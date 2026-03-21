import { NextResponse } from "next/server";
import { defaultProjects } from "@/lib/gallery-projects";
import { buildXml, dedupeByLoc, fullImageUrl, fullUrl } from "@/lib/sitemap-utils";

export async function GET() {
  const urls = dedupeByLoc(
    defaultProjects.map((project, index) => ({
      loc: fullUrl(`/gallery#project-${project.id ?? index + 1}`),
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.82",
      images: project.image ? [fullImageUrl(project.image)] : [],
    }))
  );

  return new NextResponse(buildXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}