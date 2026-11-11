import type { Metadata } from "next";
import Link from "next/link";
import { HEALTHCARE_ROOT } from "@/lib/healthcare/catalogue";
import { canonicalMetadata, SITE_URL } from "@/lib/seo-metadata";
export function healthcareMetadata(
  title: string,
  description: string,
  path = "",
): Metadata {
  const route = `${HEALTHCARE_ROOT}${path}`;
  return {
    ...canonicalMetadata(route),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${route}`,
      siteName: "Apex Curtains",
    },
    twitter: { title, description, card: "summary" },
  };
}
export function Breadcrumbs({
  current,
  path,
}: {
  current?: string;
  path?: string;
}) {
  const items = [
    { name: "Professionals", path: "/professionals" },
    { name: "Healthcare", path: HEALTHCARE_ROOT },
    ...(current ? [{ name: current, path: `${HEALTHCARE_ROOT}/${path}` }] : []),
  ];
  return (
    <>
      <nav className="hc-breadcrumb" aria-label="Breadcrumb">
        {items.map((i, n) => (
          <span key={i.path}>
            {n > 0 && <span aria-hidden="true"> / </span>}
            {n === items.length - 1 ? (
              <span aria-current="page">{i.name}</span>
            ) : (
              <Link href={i.path}>{i.name}</Link>
            )}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((v, n) => ({
              "@type": "ListItem",
              position: n + 1,
              name: v.name,
              item: `${SITE_URL}${v.path}`,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
export function HealthcareCta() {
  return (
    <section className="hc-cta">
      <div>
        <p className="hc-eyebrow">Start with your space</p>
        <h2>
          Let’s make privacy
          <br />
          part of the plan.
        </h2>
        <p>One room, a refurbishment or a complete healthcare project.</p>
      </div>
      <div>
        <Link
          className="hc-button hc-button-light"
          href={`${HEALTHCARE_ROOT}/quotation`}
        >
          Discuss your healthcare project →
        </Link>
        <p>
          Or call <a href="tel:08007720367">0800 772 0367</a>
        </p>
      </div>
    </section>
  );
}
