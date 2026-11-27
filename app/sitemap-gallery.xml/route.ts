import { NextResponse } from "next/server";
import { getGalleryProjects } from "@/lib/gallery-projects";
import { buildXml, formatSitemapDate, fullImageUrl, fullUrl } from "@/lib/sitemap-utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getGalleryProjects();
  const urls = projects.filter((project) => Boolean(project.slug)).map((project) => ({
    loc: fullUrl(`/gallery/${project.slug}`),
    lastmod: formatSitemapDate(project.updated_at || project.created_at),
    changefreq: "monthly",
    priority: "0.80",
    images: project.story
      ? project.story.media.map((image) => fullImageUrl(image.src))
      : project.image_url ? [fullImageUrl(project.image_url)] : [],
  }));
  return new NextResponse(buildXml(urls), {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "no-store" },
  });
}
