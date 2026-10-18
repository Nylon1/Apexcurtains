import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGalleryProjectBySlug } from "@/lib/gallery-projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://www.apexcurtains.com";

function absoluteImageUrl(value?: string | null) {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function evidenceLinks(category?: string | null, lining?: string | null) {
  const links = [
    { href: "/curtain-tracks", label: "Specialist curtain tracks" },
    { href: "/curtain-colours-and-tones", label: "Colour and tone" },
    {
      href: "/services/premium-installation",
      label: "Installation and aftercare",
    },
    { href: "/curtain-tiebacks", label: "Tiebacks and coverage" },
  ];

  const categoryText = (category || "").toLowerCase();
  if (categoryText.includes("apex")) {
    links.unshift({ href: "/apex-curtains", label: "Apex curtain guidance" });
  } else if (categoryText.includes("triang")) {
    links.unshift({
      href: "/triangular-window-curtains",
      label: "Triangular window guidance",
    });
  } else if (categoryText.includes("gable")) {
    links.unshift({ href: "/gable-end-curtains", label: "Gable-end guidance" });
  } else if (/angled|sloping|asymmetric/.test(categoryText)) {
    links.unshift({
      href: "/angled-window-curtains",
      label: "Angled-window curtain guidance",
    });
  } else {
    links.unshift({
      href: "/window-types",
      label: "Architectural window types",
    });
  }

  if (/apex|triang|gable/.test(categoryText)) {
    links.push({
      href: "/angled-window-curtains#opening-and-stacking",
      label: "Opening curtains on a slope",
    });
  }

  if ((lining || "").toLowerCase().includes("blackout")) {
    links.push({
      href: "/curtain-linings#blackout-lining",
      label: "Blackout and light gaps",
    });
  }

  return links;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getGalleryProjectBySlug(slug);

  if (!data) {
    return {
      title: { absolute: "Gallery Project | Apex Curtains" },
      description: "View a curtain installation project by Apex Curtains.",
      robots: { index: false, follow: true },
    };
  }

  const canonicalUrl = `${SITE_URL}/gallery/${data.slug || slug}`;
  const title = `${data.title} | Apex Curtains Gallery`;
  const description =
    data.summary ||
    data.brief ||
    `View this ${data.category || "curtain"} project by Apex Curtains${
      data.location ? ` in ${data.location}` : ""
    }.`;
  const imageUrl = absoluteImageUrl(data.image_url);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Apex Curtains",
      type: "article",
      images: imageUrl ? [{ url: imageUrl, alt: data.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getGalleryProjectBySlug(slug);

  if (!data) notFound();

  const canonicalUrl = `${SITE_URL}/gallery/${data.slug || slug}`;
  const imageUrl = absoluteImageUrl(data.image_url);
  const related = evidenceLinks(data.category, data.lining);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: data.title,
        description:
          data.summary ||
          data.brief ||
          `Apex Curtains project page for ${data.title}.`,
        image: imageUrl ? [imageUrl] : [],
        datePublished: data.created_at || undefined,
        mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: data.title,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${canonicalUrl}#article` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Gallery",
            item: `${SITE_URL}/gallery`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: data.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  const evidence = [
    data.category && { label: "Window type", value: data.category },
    data.room && { label: "Room", value: data.room },
    data.heading && { label: "Curtain heading", value: data.heading },
    data.lining && { label: "Lining", value: data.lining },
    data.location && { label: "Location", value: data.location },
  ].filter(Boolean) as { label: string; value: string }[];

  const story = [
    ["The brief", data.brief],
    ["The challenge", data.challenge],
    ["The solution", data.solution],
    ["The finished room", data.result],
  ].filter(([, text]) => text);
  return (
    <main className="window-editorial project-editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="guide-hero">
        <div className="guide-hero-copy">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/gallery">Gallery</Link>
          </nav>
          <p className="editorial-eyebrow">
            {data.location} / An Apex installation
          </p>
          <h1>{data.title}</h1>
          {data.summary && <p className="guide-intro">{data.summary}</p>}
        </div>
        {imageUrl && (
          <figure className="guide-hero-image">
            <Image
              src={imageUrl}
              alt={data.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 900px) 100vw, 55vw"
            />
            <figcaption>
              Installation photography · {data.location || "Apex Curtains"}
            </figcaption>
          </figure>
        )}
      </section>
      <div className="project-story-layout">
        <aside>
          <p className="editorial-eyebrow">The details</p>
          <dl className="project-facts">
            {evidence.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          <Link href="/start-designing" className="editorial-button">
            Discuss a similar window ↗
          </Link>
          {data.slug === "wave-pleat-apex-curtains-milton-keynes" && (
            <Link href="/room-visualiser?room=apex-bedroom" className="editorial-text-link">Visualise a similar look ↗</Link>
          )}
        </aside>
        <div>
          {story.map(([title, text]) => (
            <section className="guide-section" key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          {!story.length && data.summary && (
            <section className="guide-section">
              <h2>The project</h2>
              <p>{data.summary}</p>
            </section>
          )}
          <section className="guide-section">
            <p className="editorial-eyebrow">
              Bring the detail into your own room
            </p>
            <h2>Consider the complete curtain.</h2>
            <p>
              The right specification connects the appearance of the fabric with
              the window geometry, lining, stack position and fixing surface.
              Explore the details relevant to your own home.
            </p>
            <div className="guide-inline-links">
              {related.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label} ↗
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">Your own perspective</p>
        <h2>Every window starts a new story.</h2>
        <p>
          Share a photograph of your room and the feeling you want to achieve.
        </p>
        <Link href="/start-designing" className="editorial-button">
          Start your project ↗
        </Link>
        <Link href="/gallery" className="editorial-text-link">
          Continue exploring the portfolio
        </Link>
      </section>
    </main>
  );
}
