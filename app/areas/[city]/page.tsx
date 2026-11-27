import type { Metadata } from "next";
import Image from "next/image";
import { studioPhotos, type StudioPhoto } from "@/lib/studio-photography";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCityBySlug, regionAnchor } from "@/lib/cities";

const SITE_URL = "https://www.apexcurtains.com";

type PageProps = {
  params: Promise<{ city: string }>;
};

const localProjects: Partial<Record<string, { photo: StudioPhoto; href: string }>> = {
  oxford: { photo: studioPhotos.oxford, href: "/gallery/pinch-pleat-curtains-oxford-oxford" },
  cambridge: { photo: studioPhotos.cambridge, href: "/gallery/cambridge-apex-curtains-cambridge" },
  peterborough: { photo: studioPhotos.peterborough, href: "/gallery/peterborough-bedroom-blackout-curtains-peterborough" },
};

const windowTypes = [
  { label: "Apex windows", href: "/apex-curtains" },
  { label: "Triangular windows", href: "/triangular-window-curtains" },
  { label: "Angled windows", href: "/angled-window-curtains" },
  { label: "Gable end glazing", href: "/gable-end-curtains" },
  { label: "Large feature windows", href: "/large-window-curtains" },
  { label: "Tall and double-height glazing", href: "/tall-window-curtains" },
];

const faqs = [
  {
    q: "Can you help with apex and triangular windows?",
    a: "Yes. We specialise in apex, angled, triangular and other difficult window shapes that need more than a standard off-the-shelf approach.",
  },
  {
    q: "Do you offer blackout options?",
    a: "Yes. Blackout lining can be specified where darkness and light control matter, although the final result also depends on the window shape, track position and edge gaps.",
  },
  {
    q: "Can you advise if I am not sure what will work?",
    a: "Yes. That is exactly where our specialist service is most useful. You can use Ask Arlo or start by uploading a photo of your window.",
  },
  {
    q: "Do you make curtains to suit the shape of the room?",
    a: "Yes. We tailor our advice and recommendations around the glazing, ceiling line, room use and the style you want to achieve.",
  },
];

export async function generateStaticParams() {
  const { cityPages } = await import("@/lib/cities");
  return cityPages.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: { absolute: "Area Not Found | Apex Curtains" },
      robots: { index: false, follow: true },
    };
  }

  const canonicalUrl = `${SITE_URL}/areas/${cityData.slug}`;
  const title = `Apex Window Curtains in ${cityData.name} | Apex Curtains`;
  const description = `Bespoke curtains for apex, angled, triangular and unusual windows in ${cityData.name}. Specialist advice, elegant solutions and tailored installations.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Apex Curtains",
      type: "website",
    },
  };
}

export default async function AreaCityPage({ params }: PageProps) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) notFound();

  const localProject = localProjects[cityData.slug];
  const canonicalUrl = `${SITE_URL}/areas/${cityData.slug}`;
  const localRepresentativeId = `${canonicalUrl}#local-representative`;
  const serviceId = `${canonicalUrl}#service`;
  const webpageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": localRepresentativeId,
        name: `Apex Curtains – ${cityData.name}`,
        url: canonicalUrl,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        brand: { "@type": "Brand", name: "Apex Curtains" },
        areaServed: { "@type": "City", name: cityData.name },
        address: {
          "@type": "PostalAddress",
          addressLocality: cityData.name,
          addressRegion: cityData.region,
          addressCountry: "GB",
        },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: `Apex Window Curtains in ${cityData.name}`,
        serviceType: "Bespoke curtains for apex and unusual windows",
        provider: { "@id": localRepresentativeId },
        areaServed: { "@type": "City", name: cityData.name },
        description: `Specialist curtains for apex, angled, triangular and gable end windows in ${cityData.name}.`,
        url: canonicalUrl,
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: canonicalUrl,
        name: `Apex Window Curtains in ${cityData.name}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": serviceId },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Areas",
            item: `${SITE_URL}/areas`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: cityData.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <main className="area-page studio-paper-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="studio-wrap area-guide">
        <nav className="guide-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/areas">Areas</Link><span>/</span><span aria-current="page">{cityData.name}</span>
        </nav>
        <header className="area-opening">
          <div>
            <h1>Apex window curtains in {cityData.name}</h1>
            <p>{cityData.intro}</p>
          </div>
          <aside>
            <h2>Planning a survey</h2>
            <p>Share your postcode, window shape and what you want the curtains to do. A photo from floor level can help us see the glazing and the space around it.</p>
            <Link href="/architectural-curtain-project-planner" className="studio-button">Discuss your project</Link>
          </aside>
        </header>
        <div className="area-body">
          <section>
            <h2>Curtains for your space</h2>
            <p>{cityData.propertyFocus}</p><p>{cityData.styleFocus}</p>
            <p>For a bedroom, consider light around the edges as well as the lining. In a living space, decide how much of the view you want to keep when the curtains are open.</p>
            {localProject ? (
              <figure className="area-project">
                <Image src={localProject.photo.src} alt={localProject.photo.alt} width={localProject.photo.width} height={localProject.photo.height} sizes="(max-width: 760px) 90vw, 45vw" />
                <figcaption><Link className="studio-link" href={localProject.href}>See the {cityData.name} installation</Link></figcaption>
              </figure>
            ) : <Link href="/gallery" className="studio-link">See completed installations</Link>}
          </section>
          <nav aria-label="Window guides">
            <h2>Find your window shape</h2>
            <ul className="area-links">{windowTypes.map(item => <li key={item.href}><Link href={item.href}>{item.label}<span aria-hidden="true">↗</span></Link></li>)}</ul>
          </nav>
          <section>
            <h2>Questions before a survey</h2>
            {faqs.map(faq => <details key={faq.q} className="area-question"><summary>{faq.q}</summary><p>{faq.a}</p></details>)}
          </section>
          <section>
            <h2>Start with what you know</h2>
            <ul className="area-links">
              <li><Link href="/start-designing">Request a curtain quote <span aria-hidden="true">↗</span></Link></li>
              <li><Link href="/curtain-design-guide">Explore fabrics, linings and headings <span aria-hidden="true">↗</span></Link></li>
              <li><Link href="/arlo-curtain-advisor">Ask Arlo about your window <span aria-hidden="true">↗</span></Link></li>
              <li><Link href={`/areas#${regionAnchor(cityData.region)}`}>View areas in {cityData.region} <span aria-hidden="true">↗</span></Link></li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
