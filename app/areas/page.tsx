import type { Metadata } from "next";
import Link from "next/link";
import { cityPages, regionAnchor } from "@/lib/cities";

const SITE_URL = "https://www.apexcurtains.com";
const canonicalUrl = `${SITE_URL}/areas`;

export const metadata: Metadata = {
  title: { absolute: "Areas We Cover | Apex Curtains" },
  description:
    "Specialist curtain surveys and installation throughout England and Wales for apex, angled, triangular, gable-end and unusual architectural windows.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Areas We Cover | Apex Curtains",
    description:
      "Find Apex Curtains service areas and local specialist guidance for difficult architectural windows across England and Wales.",
    url: canonicalUrl,
    siteName: "Apex Curtains",
    type: "website",
  },
};

const regionGroups = Array.from(
  cityPages.reduce((groups, city) => {
    const existing = groups.get(city.region) || [];
    existing.push(city);
    groups.set(city.region, existing);
    return groups;
  }, new Map<string, typeof cityPages>())
).sort(([a], [b]) => a.localeCompare(b));

export default function AreasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Areas We Cover",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#areas`,
        itemListElement: cityPages.map((city, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: city.name,
          url: `${SITE_URL}/areas/${city.slug}`,
        })),
      },
    ],
  };

  return (
    <main className="studio-paper-page min-h-screen overflow-hidden bg-apex-navy-900 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="studio-wrap areas-intro">
        <nav aria-label="Breadcrumb" className="guide-breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Areas</span></nav>
        <h1>Specialist curtains across England and Wales</h1>
        <p>Find local guidance on shaped windows, surveying and installation. If your town is missing, <Link className="studio-link" href="/start-designing">send us your postcode and window details</Link> so we can discuss your project.</p>
        <nav className="region-index" aria-label="Jump to a region">
          <details><summary>Find your region</summary>
            <ul>{regionGroups.map(([region]) => <li key={region}><a href={`#${regionAnchor(region)}`}>{region}</a></li>)}</ul>
          </details>
        </nav>
      </section>
      <section className="studio-wrap areas-directory" aria-label="Areas by region">
        {regionGroups.map(([region, cities]) => (
          <section key={region} id={regionAnchor(region)} className="area-region">
            <h2>{region}</h2>
            <ul className="areas-city-list">{cities.map(city => (
              <li key={city.slug}><Link href={`/areas/${city.slug}`}>{city.name}<span aria-hidden="true">↗</span></Link></li>
            ))}</ul>
          </section>
        ))}
      </section>
      <nav className="studio-wrap areas-related" aria-label="Plan your curtains">
        <Link href="/window-types">Window shapes</Link><Link href="/curtain-design-guide">Curtain design guide</Link>
        <Link href="/curtain-tracks">Track options</Link><Link href="/gallery">Completed installations</Link>
      </nav>
    </main>
  );
}
