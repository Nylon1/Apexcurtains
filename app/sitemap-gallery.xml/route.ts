import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildXml, fullImageUrl, fullUrl } from "@/lib/sitemap-utils";

export const dynamic = "force-dynamic";

function formatSitemapDate(dateValue?: string | Date | null) {
  const date = dateValue ? new Date(dateValue) : new Date();

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().split("T")[0];
  }

  return date.toISOString().split("T")[0];
}

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
    loc: fullUrl(`/gallery/${project.slug || project.id}`),
    lastmod: formatSitemapDate(project.updated_at || project.created_at),
    changefreq: "monthly",
    priority: "0.80",
    images: project.image_url ? [fullImageUrl(project.image_url)] : [],
  }));

  return new NextResponse(buildXml(urls), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}