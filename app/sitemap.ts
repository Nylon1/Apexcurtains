import { defaultProjects } from "../lib/gallery-projects";

export default function sitemap() {
  const baseUrl = "https://apexcurtains.com";

  const staticPages = [
    "",
    "/gallery",
    "/window-types",
    "/advice",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectPages = defaultProjects.map((project: any) => ({
    url: `${baseUrl}/gallery/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...projectPages];
}