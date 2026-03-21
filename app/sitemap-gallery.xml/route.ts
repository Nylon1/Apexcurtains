import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildXml, fullImageUrl, fullUrl } from "@/lib/sitemap-utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gallery sitemap error:", error);
    return new NextResponse("Failed to load gallery sitemap", {
      status: 500,
    });
  }

  const urls = (data || []).map((project: any) => ({
    // Use slug if you add one later, otherwise fall back to id
    loc: fullUrl(
      project.slug ? `/gallery/${project.slug}` : `/gallery/${project.id}`
    ),
    lastmod: project.created_at || new Date().toISOString(),
    changefreq: "monthly",
    priority: "0.80",
    images: project.image_url ? [fullImageUrl(project.image_url)] : [],
  }));

  return new NextResponse(buildXml(urls), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}