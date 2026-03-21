import { NextResponse } from "next/server";
import { buildXml, baseUrl } from "@/lib/sitemap-utils";

export async function GET() {
  const now = new Date().toISOString();

  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: now,
      changefreq: "weekly",
      priority: "1.0",
      images: [`${baseUrl}/apex-hero.jpg`],
    },
    {
      loc: `${baseUrl}/window-types`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.95",
      images: [
        `${baseUrl}/window-types/apex-hero.jpg`,
        `${baseUrl}/window-types/triangular.jpeg`,
        `${baseUrl}/window-types/gable-end.jpeg`,
        `${baseUrl}/window-types/barn-conversion.jpeg`,
      ],
    },
    {
      loc: `${baseUrl}/gallery`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.95",
    },
    {
      loc: `${baseUrl}/advice`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.90",
    },
    {
      loc: `${baseUrl}/areas`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.88",
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.90",
    },
    {
      loc: `${baseUrl}/start-designing`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.95",
    },
    {
      loc: `${baseUrl}/faq`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.75",
    },
    {
      loc: `${baseUrl}/reviews`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.75",
    },
    {
      loc: `${baseUrl}/journey`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.75",
    },
    {
      loc: `${baseUrl}/get-curtain-quote`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.85",
    },
    {
      loc: `${baseUrl}/arlo-curtain-advisor`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.85",
    },
    {
      loc: `${baseUrl}/apex-curtains`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.95",
    },
    {
      loc: `${baseUrl}/apex-blinds`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.86",
    },
    {
      loc: `${baseUrl}/gable-end-curtains`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.92",
    },
    {
      loc: `${baseUrl}/barn-conversion-curtains`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.88",
    },
    {
      loc: `${baseUrl}/large-window-curtains`,
      lastmod: now,
      changefreq: "weekly",
      priority: "0.88",
    },
    {
      loc: `${baseUrl}/made-in-uk-curtains`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      loc: `${baseUrl}/price-promise`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      loc: `${baseUrl}/press`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.40",
    },
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: now,
      changefreq: "yearly",
      priority: "0.30",
    },
    {
      loc: `${baseUrl}/terms`,
      lastmod: now,
      changefreq: "yearly",
      priority: "0.30",
    },
    {
      loc: `${baseUrl}/cookies`,
      lastmod: now,
      changefreq: "yearly",
      priority: "0.30",
    },
    {
      loc: `${baseUrl}/data-request`,
      lastmod: now,
      changefreq: "yearly",
      priority: "0.20",
    },
    {
      loc: `${baseUrl}/seen-on-tv`,
      lastmod: now,
      changefreq: "monthly",
      priority: "0.40",
    },
  ];

  return new NextResponse(buildXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}