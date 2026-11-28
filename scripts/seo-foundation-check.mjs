import fs from "node:fs";

const checks = [];

function read(path) {
  return fs.readFileSync(path, "utf8");
}

function expect(name, condition, detail) {
  checks.push({ name, ok: Boolean(condition), detail });
}

const layout = read("app/layout.tsx");
const homePage = read("app/page.tsx");
const robots = read("app/robots.ts");
const sitemapUtils = read("lib/sitemap-utils.ts");
const sitemapPages = read("app/sitemap-pages.xml/route.ts");
const advicePosts = read("lib/advice-posts.ts");
const advicePage = read("app/advice/[slug]/page.tsx");
const galleryProjectPage = read("app/gallery/[slug]/page.tsx");
const cityPage = read("app/areas/[city]/page.tsx");
const reviewsPage = read("app/reviews/page.tsx");
const reviewsPreview = read("components/homepage/ReviewsPreview.tsx");
const mediaPage = read("app/seen-on-tv/page.tsx");
const proxy = read("proxy.ts");
const nextConfig = read("next.config.ts");

const hasWwwOrigin =
  layout.includes('const SITE_URL = "https://www.apexcurtains.com"') &&
  (layout.includes("metadataBase: new URL(SITE_URL)") ||
    layout.includes('metadataBase: new URL("https://www.apexcurtains.com")'));

const hasPermanentHostRedirect =
  nextConfig.includes("permanent: true") &&
  nextConfig.includes('type: "host"') &&
  nextConfig.includes('value: "apexcurtains.com"') &&
  nextConfig.includes('destination: "https://www.apexcurtains.com/:path*"');

const embeddedReviewCount = (reviewsPage.match(/\n    name: "/g) || []).length;

expect(
  "final canonical origin is www",
  hasWwwOrigin,
  "Root metadataBase must resolve to the production www origin."
);
expect(
  "root does not force homepage canonical",
  !layout.includes('canonical: "/"'),
  "A global homepage canonical would collapse child-page signals."
);
expect(
  "sitemap utilities use www",
  sitemapUtils.includes('baseUrl = "https://www.apexcurtains.com"'),
  "All XML sitemap URLs must use the final host."
);
expect(
  "robots points to www sitemap",
  robots.includes('https://www.apexcurtains.com/sitemap.xml'),
  "robots.txt must advertise the final sitemap URL."
);
expect(
  "broken journey hub is not in static sitemap",
  !sitemapPages.includes('loc: `${baseUrl}/journey`'),
  "The nonexistent /journey hub must not be submitted."
);
expect(
  "homepage sitemap image uses real asset",
  sitemapPages.includes("studioPhotos.oxford.src"),
  "The homepage image entry must reference an existing asset."
);
expect(
  "published advice is filtered",
  advicePosts.includes('.eq("published", true)'),
  "Draft advice records must not enter public inventory/sitemaps."
);
expect(
  "duplicate advice slug is retired",
  advicePage.includes('best-curtains-for-apex-windows-expert-guide'),
  "Known duplicate advice URL must remain covered by a permanent redirect."
);
expect(
  "admin routes are server protected",
  proxy.includes('matcher: ["/admin/:path*"]') && proxy.includes('!user'),
  "Admin protection must run before client rendering."
);
expect(
  "non-www host permanently redirects",
  hasPermanentHostRedirect,
  "The non-www host must permanently consolidate to www."
);
expect(
  "gallery project metadata and schema use www",
  galleryProjectPage.includes('const SITE_URL = "https://www.apexcurtains.com"') &&
    galleryProjectPage.includes('const canonicalUrl = `${SITE_URL}/gallery/${data.slug || slug}`') &&
    !galleryProjectPage.includes("https://apexcurtains.com/gallery/"),
  "Gallery project canonical, Open Graph and structured data must use the final www origin."
);
expect(
  "city schema preserves local representation with connected IDs",
  cityPage.includes('const localRepresentativeId = `${canonicalUrl}#local-representative`') &&
    cityPage.includes('"@id": localRepresentativeId') &&
    cityPage.includes("addressLocality: cityData.name") &&
    cityPage.includes('"@id": `${SITE_URL}/#organization`'),
  "City pages must preserve the confirmed local address/locality model while connecting it to the main Apex organization."
);
expect(
  "reviews preserve the indexable route without unsupported testimonials",
  !reviewsPage.includes("function makeReviews") &&
    !reviewsPage.includes("sampleTexts") &&
    embeddedReviewCount === 0 &&
    !reviewsPage.includes("<blockquote") &&
    !reviewsPage.includes("aggregateRating") &&
    reviewsPage.includes('id="customer-stories"') &&
    reviewsPage.includes('canonical: `${SITE_URL}/reviews`') &&
    !reviewsPage.includes("index: false"),
  "The approved interim reviews page must preserve its canonical and legacy fragment without publishing sample-origin quotes or ratings."
);
expect(
  "reviews route remains included in sitemap",
  sitemapPages.includes('loc: `${baseUrl}/reviews`'),
  "The established reviews URL should remain indexable and included in the XML sitemap."
);
expect(
  "legacy homepage trust component avoids unsupported review claims",
  !reviewsPreview.includes("Sarah L") &&
    !reviewsPreview.includes("David R") &&
    !reviewsPreview.includes("Emma W") &&
    reviewsPreview.includes('href="/reviews"') &&
    !reviewsPreview.includes("real customer reviews") &&
    !reviewsPreview.includes("<blockquote"),
  "The legacy component must not reintroduce unsupported customer testimony when reused."
);
expect(
  "homepage opens directly onto the real architectural project",
  !homePage.includes("ApexEntryScreen") &&
    homePage.includes("<Hero />") &&
    homePage.includes('id="real-projects"'),
  "The homepage should open directly on the project-led hero with no timed entry modal."
);
expect(
  "20MB entry video is removed",
  !fs.existsSync("public/videos/apex-entry.mp4"),
  "The retired 20MB autoplay entry video must not remain in the production bundle."
);
expect(
  "verified TV advertising claim is indexable",
  !mediaPage.includes("index: false") &&
    mediaPage.includes("paid television advertising") &&
    sitemapPages.includes('loc: `${baseUrl}/seen-on-tv`'),
  "The confirmed TV advertising page should be indexable, accurately framed as advertising, and included in the sitemap."
);

const failed = checks.filter((check) => !check.ok);
for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.name}`);
  if (!check.ok) console.log(`      ${check.detail}`);
}

if (failed.length) {
  console.error(`\n${failed.length} SEO foundation check(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${checks.length} SEO foundation checks passed.`);
