export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
        ],
      },
    ],
    sitemap: "https://apexcurtains.com/sitemap.xml",
  };
}