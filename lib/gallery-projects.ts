import type { PortfolioStory } from "@/lib/portfolio-types";

export type Project = {
  id: number;
  title: string;
  slug: string;
  location: string;
  category: string;
  room: string;
  heading: string;
  lining: string;
  image_url: string;
  summary: string;
  brief: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
  story?: PortfolioStory;
};

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";
import { reconcileProject } from "@/lib/project-editorial";
import { applyPortfolioStory, mergePortfolioProjects, newPortfolioProjects, portfolio } from "@/lib/portfolio";

export const getGalleryProjectBySlug = cache(async (slug: string) => {
  const curated = newPortfolioProjects.find((project) => project.slug === slug);
  if (curated) return curated;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Gallery fetch error:", error);
    return null;
  }

  return data ? applyPortfolioStory(reconcileProject(data as Project), portfolio.archive[slug]) : null;
});

export const getGalleryProjects = cache(async (): Promise<Project[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Gallery list fetch error:", error.message);
    return newPortfolioProjects;
  }
  return mergePortfolioProjects(((data || []) as Project[]).map(reconcileProject));
});
