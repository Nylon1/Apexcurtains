import { NextResponse } from "next/server";
import { getAdvicePosts } from "@/lib/advice-posts";
import { buildXml, dedupeByLoc, fullImageUrl, fullUrl } from "@/lib/sitemap-utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getAdvicePosts();

  const urls = dedupeByLoc(
    posts.map((post) => ({
      loc: fullUrl(`/advice/${post.slug}`),
      lastmod: post.published_at
        ? new Date(post.published_at).toISOString()
        : new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.80",
      images: post.image_url ? [fullImageUrl(post.image_url)] : [],
    }))
  );

  return new NextResponse(buildXml(urls), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}