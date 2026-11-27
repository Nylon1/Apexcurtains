import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GalleryCollection, { type GalleryCard } from "@/components/gallery/GalleryCollection";
import { getGalleryProjects } from "@/lib/gallery-projects";
import { portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: { absolute: "Curtain Projects & Interiors | Apex Curtains Gallery" },
  description: "Explore real Apex curtain installations: shaped windows, tall glazing, motorised curtains and hospitality interiors. Technical detail, considered interiors and installation films.",
  alternates: { canonical: "https://www.apexcurtains.com/gallery" },
  openGraph: { title: "Curtain projects, considered from every angle", description: "Real installations. Individual interiors. Explore the Apex Curtains portfolio.", url: "https://www.apexcurtains.com/gallery", images: [{ url: "/projects/portfolio/windermere-2.webp" }] },
};

export default async function GalleryPage() {
  const projects = await getGalleryProjects();
  const cards: GalleryCard[] = projects.map((project) => ({
    slug: project.slug, title: project.title, label: project.location,
    summary: project.summary, themes: project.story?.themes || ["Shaped windows"],
    image: project.story?.media[0] || { src: project.image_url, width: 1200, height: 1600, alt: project.title, caption: project.title },
    hasFilm: Boolean(project.story?.film),
  }));
  const hero = portfolio.projects.windermere.media[0];
  const airport = portfolio.projects["manchester-airport-lounge"];
  return <main className="portfolio-page">
    <header className="portfolio-hero studio-wrap">
      <div className="portfolio-hero-copy">
        <p className="portfolio-eyebrow">The Apex portfolio</p>
        <h1>Considered from<br /><em>every angle.</em></h1>
        <p className="portfolio-lead">The shape of a window. The way a curtain moves. The character of a room.</p>
        <p>Explore the technical details and interior choices behind our curtain installations, from a bedroom gable to a whole wall of glazing.</p>
        <Link className="studio-button" href="#project-archive">Explore the collection</Link>
        <div className="portfolio-hero-note"><span>In focus · Windermere</span><p>Golden folds, exposed timber and a gable shown open and closed.</p><Link href="/gallery/windermere" className="portfolio-text-link">Discover the project</Link></div>
      </div>
      <Link href="/gallery/windermere" className="portfolio-cover" aria-label="View the Windermere curtain project">
        <Image src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} sizes="(max-width: 850px) 90vw, 53vw" loading="eager" fetchPriority="high" />
      </Link>
    </header>
    <section className="portfolio-introduction studio-wrap" aria-label="About the collection"><p>Architecture sets the outline.<br /><em>The detail makes it personal.</em></p><div>Each story brings the curtain solution and the interior together: headings along a slope, layers across glass, fabric beside timber, and movement at room scale.</div></section>
    <section className="studio-wrap portfolio-collection" id="project-archive" aria-labelledby="collection-title">
      <div className="portfolio-section-heading"><div><p className="portfolio-eyebrow">Places, materials & details</p><h2 id="collection-title">The project collection</h2></div><p>Find an opening like yours, or follow a detail that catches your eye.</p></div>
      <GalleryCollection projects={cards} />
    </section>
    <section className="portfolio-feature" aria-labelledby="hospitality-title"><div className="studio-wrap portfolio-feature-inner">
      <Link href="/gallery/manchester-airport-lounge"><Image src={airport.media[0].src} alt={airport.media[0].alt} width={airport.media[0].width} height={airport.media[0].height} sizes="(max-width: 850px) 90vw, 57vw" /></Link>
      <div><p className="portfolio-eyebrow">Beyond the home</p><h2 id="hospitality-title">Part of a larger interior.</h2><p>At Manchester Airport, the curtain run sits alongside curved seating, timber partitions and ceiling details. Measuring, curtain and track supply, installation and dressing form one connected project.</p><Link href="/gallery/manchester-airport-lounge" className="portfolio-text-link">Explore the lounge installation</Link></div>
    </div></section>
    <section className="portfolio-cta studio-wrap"><p className="portfolio-eyebrow">Your window, your interior</p><h2>Let’s give your room<br /><em>its own story.</em></h2><p>Share the window shape, the feeling you want to create and how you would like the curtains to open.</p><Link className="studio-button" href="/architectural-curtain-project-planner">Discuss your project</Link></section>
  </main>;
}
