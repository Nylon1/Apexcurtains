import type { NextConfig } from "next";
import legacyUrls from "./lib/legacy-redirects.json";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),
  outputFileTracingIncludes: {
    "/api/atelier/**/*": [
      "./public/visualiser/double-pinch-gable-desktop.webp",
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "apexcurtains.com" }],
        destination: "https://www.apexcurtains.com/:path*",
        permanent: true,
      },
      // Exact legacy paths only. Encode the former emoji slugs as browsers do.
      // Next preserves query parameters and its existing slash normalization.
      ...legacyUrls.redirects.map(({ source, destination }) => ({
        source: encodeURI(source),
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
