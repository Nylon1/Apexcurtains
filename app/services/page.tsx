import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo-metadata";
import ServicesExperience from "@/components/consultation/ServicesExperience";

export const metadata: Metadata = {
  title: {
    absolute: "Curtain Services: Survey, Design & Installation | Apex Curtains",
  },
  description:
    "Explore Apex's complete made-to-measure curtain service: specialist survey, design, manufacture, tracks, linings, fitting and aftercare for shaped windows.",
  alternates: { canonical: `${SITE_URL}/services` },
};
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/services#webpage`,
  url: `${SITE_URL}/services`,
  name: "Curtain services: survey, design and installation",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};
export default function Page() {
  return (
    <ServicesExperience
      structuredData={
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      }
    />
  );
}
