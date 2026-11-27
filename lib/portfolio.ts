import content from "@/lib/portfolio-content.json";
import type { PortfolioEdition, PortfolioStory } from "@/lib/portfolio-types";
import type { Project } from "@/lib/gallery-projects";

export const portfolio = content as PortfolioEdition;

export function applyPortfolioStory(project: Project, story?: PortfolioStory): Project {
  if (!story) return project;
  return {
    ...project,
    title: story.title,
    location: story.label,
    summary: story.summary,
    category: story.category,
    room: story.room,
    image_url: story.media[0].src,
    heading: "",
    lining: "",
    story,
  };
}

export const newPortfolioProjects: Project[] = Object.entries(portfolio.projects).map(
  ([slug, story], index) => applyPortfolioStory({
    id: -index - 1,
    slug,
    title: story.title,
    location: story.label,
    category: story.category,
    room: story.room,
    heading: "",
    lining: "",
    image_url: story.media[0].src,
    summary: story.summary,
    brief: "",
    challenge: "",
    solution: "",
    result: "",
    tags: story.themes,
  }, story),
);

export function mergePortfolioProjects(projects: Project[]): Project[] {
  const existing = new Set(projects.map((project) => project.slug));
  return [
    ...newPortfolioProjects.filter((project) => !existing.has(project.slug)),
    ...projects.map((project) => applyPortfolioStory(project, portfolio.projects[project.slug] || portfolio.archive[project.slug])),
  ];
}
