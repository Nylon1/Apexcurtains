import type { MetadataRoute } from "next";

const baseUrl = "https://apexcurtains.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${baseUrl}/sitemap-pages.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-advice.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-gallery.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/sitemap-areas.xml`,
      lastModified: now,
    },
  ];
}