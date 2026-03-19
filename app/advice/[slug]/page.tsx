import { notFound } from "next/navigation";
import AdvicePostPageClient from "@/components/advice/AdvicePostPageClient";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPostBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("advice_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) return null;

  return {
    id: Number(data.id),
    title: data.title || "",
    slug: data.slug || "",
    category: data.category || "",
    excerpt: data.excerpt || "",
    content: data.content || "",
    image: data.image_url || "",
    featured: !!data.featured,
    published: data.published ?? true,
    meta_title: data.meta_title || "",
    meta_description: data.meta_description || "",
    related_service: data.related_service || "",
  };
}

async function getRelatedPosts(currentSlug: string, category: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("advice_posts")
    .select("*")
    .neq("slug", currentSlug)
    .eq("category", category)
    .eq("published", true)
    .limit(3);

  return (data || []).map((item: any) => ({
    id: Number(item.id),
    title: item.title || "",
    slug: item.slug || "",
    category: item.category || "",
    excerpt: item.excerpt || "",
    content: item.content || "",
    image: item.image_url || "",
    featured: !!item.featured,
    published: item.published ?? true,
    meta_title: item.meta_title || "",
    meta_description: item.meta_description || "",
    related_service: item.related_service || "",
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Advice | Apex Curtains",
      description: "Curtain advice for apex and unusual windows.",
    };
  }

  return {
    title: post.meta_title || `${post.title} | Apex Curtains`,
    description: post.meta_description || post.excerpt,
  };
}

export default async function AdvicePostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.slug, post.category);

  return <AdvicePostPageClient post={post} relatedPosts={relatedPosts} />;
}