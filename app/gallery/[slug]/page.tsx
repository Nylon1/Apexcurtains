import type { Metadata } from "next";
import Link from "next/link";
import ProjectPhotograph from "@/components/gallery/ProjectPhotograph";
import { newPortfolioProjects } from "@/lib/portfolio";
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
  const project = await getGalleryProjectBySlug(slug);
  if (!project) notFound();
  const story = project.story;
  const media = story?.media || [{ src: project.image_url, width: 1200, height: 1600, alt: project.title, caption: project.location || "Apex curtain installation" }];
  const sections = story ? [
    { eyebrow: "The technical detail", ...story.technical },
    { eyebrow: "The interior", ...story.interior },
  ] : [
    { eyebrow: "The project", title: "The curtain arrangement", text: project.brief || project.summary },
    { eyebrow: "The interior", title: "Within the room", text: project.result },
  ].filter((section) => section.text);
  const facts = story?.facts || [
    { label: "Window", value: project.category }, { label: "Setting", value: project.room },
  ].filter((fact) => fact.value);
  const related = story?.services || [{ href: "/curtain-tracks", label: "Specialist curtain tracks" }, { href: "/window-types", label: "Architectural window types" }];
  const nextProjects = newPortfolioProjects.filter((item) => item.slug !== slug && item.story?.themes.some((theme) => story?.themes.includes(theme))).slice(0, 2);
  const canonicalUrl = `${SITE_URL}/gallery/${project.slug}`;
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "Article", "@id": `${canonicalUrl}#article`, headline: project.title,
        description: project.summary, image: media.map((image) => absoluteImageUrl(image.src)),
        mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
        author: { "@id": `${SITE_URL}/#organization` }, publisher: { "@id": `${SITE_URL}/#organization` },
        ...(project.created_at ? { datePublished: project.created_at } : {}),
      },
      { "@type": "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: project.title, isPartOf: { "@id": `${SITE_URL}/#website` } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Gallery", item: `${SITE_URL}/gallery` },
        { "@type": "ListItem", position: 3, name: project.title, item: canonicalUrl },
      ] },
    ],
  };
  return <main className="portfolio-page portfolio-project">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className="portfolio-project-hero studio-wrap">
      <div className="portfolio-project-intro">
        <nav className="portfolio-breadcrumb" aria-label="Breadcrumb"><Link href="/gallery">The portfolio</Link><span aria-hidden="true"> / </span><span>{project.location}</span></nav>
        <p className="portfolio-eyebrow">{project.location} · An Apex installation</p>
        <h1>{project.title}</h1>
        <p className="portfolio-lead">{project.summary}</p>
        <div className="portfolio-story-nav"><a href="#project-story" className="portfolio-text-link">The detail & the interior</a>{story?.film && <a href="#project-film" className="portfolio-text-link">Watch the film</a>}</div>
        <dl className="portfolio-facts">{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
      </div>
      <ProjectPhotograph photo={media[0]} hero />
    </header>
    <div className="portfolio-story studio-wrap" id="project-story">
      {sections.map((section) => <section key={section.eyebrow}><p className="portfolio-eyebrow">{section.eyebrow}</p><h2>{section.title}</h2><p>{section.text}</p></section>)}
    </div>
    {story?.film && <section className="portfolio-film-section" id="project-film"><div className="studio-wrap portfolio-film-layout"><div><p className="portfolio-eyebrow">The installation film</p><h2>See the detail<br /><em>in motion.</em></h2><p>{story.film.description}</p></div><figure><video controls playsInline preload="none" poster={story.film.poster} aria-label={`${project.location}: ${project.title}`} aria-describedby="project-film-description"><source src={story.film.src} type="video/mp4" /><a href={story.film.src}>Watch the project film</a></video><figcaption id="project-film-description">{story.film.description}</figcaption></figure></div></section>}
    {media.length > 1 && <section className="studio-wrap portfolio-photographs" aria-labelledby="photographs-title"><div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">A closer look</p><h2 id="photographs-title">Through the project</h2></div><p>Explore the photographs in full to see the shape, folds and setting.</p></div><div className="portfolio-photo-grid">{media.slice(1).map((photo) => <ProjectPhotograph photo={photo} key={photo.src} />)}</div></section>}
    <section className="studio-wrap portfolio-related" aria-labelledby="guidance-title"><div><p className="portfolio-eyebrow">For your own interior</p><h2 id="guidance-title">Explore the possibilities.</h2></div><div className="portfolio-guidance-links">{related.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div></section>
    <section className="portfolio-cta studio-wrap"><p className="portfolio-eyebrow">A similar window. A different story.</p><h2>What could work<br /><em>in your room?</em></h2><p>Tell us about your window, your interior and how you want the curtains to move.</p><Link href="/architectural-curtain-project-planner" className="studio-button">Discuss your project</Link><Link href="/gallery#project-archive" className="portfolio-text-link">Back to the collection</Link></section>
    {nextProjects.length > 0 && <nav className="studio-wrap portfolio-next" aria-label="More project stories">{nextProjects.map((item) => <Link href={`/gallery/${item.slug}`} key={item.slug}><span className="portfolio-eyebrow">Explore {item.location}</span><span>{item.title}</span></Link>)}</nav>}
  </main>;
}
