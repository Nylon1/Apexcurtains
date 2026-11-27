import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
      <section className="gallery-wrap" aria-labelledby="featured-installations">
        <h2 id="featured-installations" className="text-3xl">Selected architectural installations</h2>
        <div className="mt-5 grid gap-7 sm:grid-cols-2">
          <article>
            <Image src="/projects/pinch-pleat-curtains-oxford-oxford.jpeg" alt="Shaped curtains frame a broad residential gable with matching tiebacks" width={1600} height={1200} sizes="(max-width: 640px) 90vw, (max-width: 1200px) 45vw, 560px" className="aspect-[4/3] w-full object-cover" />
            <h3 className="mt-4 text-xl">Oxford residential gable</h3>
            <p className="mt-2">A shaped curtain line follows the glazed gable. Tiebacks gather the curtains to frame the view.</p>
            <Link className="editorial-text-link" href="/gallery/pinch-pleat-curtains-oxford-oxford">View the Oxford installation ↗</Link>
          </article>
          <article>
            <Image src="/images/commercial/airport-lounge-main.jpeg" alt="Curtains installed in the finished Manchester Airport lounge interior" width={1824} height={1026} sizes="(max-width: 640px) 90vw, (max-width: 1200px) 45vw, 560px" className="aspect-[4/3] w-full object-cover" />
            <h3 className="mt-4 text-xl">Manchester Airport lounge</h3>
            <p className="mt-2">Commercial curtain and track installation coordinated with a finished hospitality interior.</p>
            <Link className="editorial-text-link" href="/commercial-curtain-track-installation#manchester-airport">View the airport lounge project ↗</Link>
          </article>
        </div>
      </section>
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
