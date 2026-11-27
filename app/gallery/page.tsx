import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import GalleryCollection from "@/components/gallery/GalleryCollection";
import { getGalleryProjects } from "@/lib/gallery-projects";
import { studioPhotos } from "@/lib/studio-photography";

export const metadata: Metadata = {
  title: { absolute: "Curtains in Real Homes | Apex Curtains Project Gallery" },
  description:
    "Explore Apex’s real curtain installations: shaped windows, considered fabrics and the details that bring an interior together.",
  alternates: { canonical: "https://www.apexcurtains.com/gallery" },
};

export default async function GalleryPage() {
  const projects = await getGalleryProjects();
  return (
    <main className="window-editorial gallery-editorial studio-gallery">
      <header className="studio-gallery-hero studio-wrap">
        <div>
          <p className="studio-kicker">Apex Curtains</p>
          <h1>Selected curtain installations</h1>
          <p>Shaped windows, tall glazing and the curtain details that make each room distinct.</p>
          <Link href="#project-archive" className="studio-link">Browse all projects <span aria-hidden="true">↓</span></Link>
        </div>
        <Link href="/gallery/pinch-pleat-curtains-oxford-oxford" className="studio-image-link">
          <figure>
            <Image src={studioPhotos.oxford.src} alt={studioPhotos.oxford.alt} width={1600} height={1200} sizes="(max-width: 800px) 92vw, 60vw" fetchPriority="high" />
            <figcaption className="studio-caption">Oxford · Read the residential gable case study <span aria-hidden="true">↗</span></figcaption>
          </figure>
        </Link>
      </header>
      <section className="studio-wrap studio-gallery-feature" aria-labelledby="featured-installations">
        <figure><Image src={studioPhotos.lounge.src} alt={studioPhotos.lounge.alt} width={1824} height={1026} sizes="(max-width: 800px) 92vw, 54vw" /></figure>
        <div>
          <p className="studio-kicker">Hospitality installation</p>
          <h2 id="featured-installations">Manchester Airport lounge</h2>
          <p>Commercial curtains and tracks coordinated with a finished hospitality interior.</p>
          <Link className="studio-link" href="/commercial-curtain-track-installation#manchester-airport">View the project <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <section
        className="studio-wrap studio-gallery-archive"
        id="project-archive"
        aria-labelledby="archive-title"
      >
        <h2 id="archive-title">The project archive</h2>
        {projects.length ? (
          <GalleryCollection projects={projects} />
        ) : (
          <p>
            Our project collection is temporarily unavailable.{" "}
            <Link href="/apex-curtains" className="editorial-text-link">
              Explore our apex curtain installations
            </Link>{" "}
            or contact us to discuss a similar window.
          </p>
        )}
      </section>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">From inspiration to your home</p>
        <h2>A room that feels like you.</h2>
        <p>
          Bring us your window, your ideas and the feeling you want to create.
          We will help you connect the fabric, track and finishing details.
        </p>
        <Link href="/start-designing" className="editorial-button">
          Begin your curtain project ↗
        </Link>
        <Link
          href="/advice/buying-apex-curtains-online"
          className="editorial-text-link"
        >
          Why specialist measuring matters
        </Link>
      </section>
    </main>
  );
}
