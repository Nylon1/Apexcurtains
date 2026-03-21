import { NextResponse } from "next/server";
import { defaultAdvicePosts } from "@/lib/advice-posts";
import { buildXml, dedupeByLoc, fullImageUrl, fullUrl } from "@/lib/sitemap-utils";

export async function GET() {
  const urls = dedupeByLoc(
    defaultAdvicePosts.map((post) => ({
      loc: fullUrl(`/advice/${post.slug}`),
      lastmod: post.published_at
        ? new Date(post.published_at).toISOString()
        : new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.80",
    images: post.image_url ? [post.image_url] : [],
    }))
  );

  return new NextResponse(buildXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}