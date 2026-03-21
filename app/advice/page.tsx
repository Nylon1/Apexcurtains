import AdvicePageClient from "@/components/advice/AdvicePageClient";
import { createClient } from "@/lib/supabase/server";
import type { AdvicePost } from "@/lib/advice-posts";

export const revalidate = 60;

export default async function AdvicePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("advice_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
  }

  const posts: AdvicePost[] = (data || []).map((item: any) => ({
    id: String(item.id),
    title: item.title || "",
    slug: item.slug || "",
    category: item.category || "",
    excerpt: item.excerpt || "",
    content: item.content || "",
    image_url: item.image_url || "",
    featured: !!item.featured,
    published: item.published ?? true,
    meta_title: item.meta_title || "",
    meta_description: item.meta_description || "",
    focus_keyword: item.focus_keyword || "",
    related_service: item.related_service || "",
    published_at: item.published_at || "",
    updated_at: item.updated_at || "",
  }));

  return <AdvicePageClient posts={posts} />;
}