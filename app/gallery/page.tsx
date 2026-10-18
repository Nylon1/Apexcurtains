import type { Metadata } from "next";
import Link from "next/link";
import GalleryCollection from "@/components/gallery/GalleryCollection";
import { getGalleryProjects } from "@/lib/gallery-projects";

export const metadata: Metadata = {
  title: { absolute: "Curtains in Real Homes | Apex Curtains Project Gallery" },
  description:
    "Explore Apex’s real curtain installations: shaped windows, considered fabrics and the details that bring an interior together.",
  alternates: { canonical: "https://www.apexcurtains.com/gallery" },
};

export default async function GalleryPage() {
  const projects = await getGalleryProjects();
  return (
    <main className="window-editorial gallery-editorial">
      <header className="collection-intro">
        <p className="editorial-eyebrow">The Apex portfolio</p>
        <h1>
          Beautiful windows.
          <br />
          <em>Individual homes.</em>
        </h1>
        <p>
          Real rooms, carefully dressed. Explore the architecture, proportions
          and finishing details behind our curtain installations.
        </p>
        <div className="guide-inline-links">
          <Link href="/curtain-colours-and-tones">
            Find your colour direction ↗
          </Link>
          <Link href="/window-types">Explore your window shape ↗</Link>
        </div>
      </header>
      <section
        className="gallery-wrap"
        aria-label="Curtain installation projects"
      >
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
