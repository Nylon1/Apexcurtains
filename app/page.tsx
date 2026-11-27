import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/homepage/Hero";
import HomeWindowDiscovery from "@/components/homepage/HomeWindowDiscovery";
import LazyFabricQuiz from "@/components/performance/LazyFabricQuiz";
import { studioPhotos } from "@/lib/studio-photography";
import "./homepage.css";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "Apex Curtains | Apex, Gable & Architectural Window Curtains" },
  description: "UK specialists in complex, oversized and high-level curtain installations, from apex and gable windows to double-height glazing. Survey and fitting across England and Wales.",
  openGraph: {
    title: "Apex Curtains | Exceptional Curtains for Exceptional Windows",
    description: "Specialist survey, manufacture and installation for apex, gable, double-height and oversized windows across England and Wales.",
    url: "https://www.apexcurtains.com",
    type: "website",
    images: [{ url: studioPhotos.oxford.src, alt: studioPhotos.oxford.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Curtains | Exceptional Curtains for Exceptional Windows",
    description: "Made-to-measure curtains for apex, gable, double-height and oversized windows.",
    images: [studioPhotos.oxford.src],
  },
};

const selectedProjects = [
  { photo: studioPhotos.peterborough, name: "A bedroom beneath the eaves", href: "/gallery/peterborough-bedroom-blackout-curtains-peterborough" },
  { photo: studioPhotos.lounge, name: "Curtains for an airport lounge", href: "/commercial-curtain-track-installation#manchester-airport" },
];

const specialisms = [
  { title: "Apex and shaped windows", detail: "Curtains that follow the roofline, from triangular glazing to full-width gables.", href: "/apex-curtains" },
  { title: "Tall and double-height windows", detail: "Long drops for stairwells, mezzanines and rooms that rise through two storeys.", href: "/tall-window-curtains" },
  { title: "Oversized architectural curtains", detail: "Expansive glazing, tall voiles and layers for private homes and hospitality.", href: "/oversized-architectural-curtains" },
  { title: "Motorised curtain systems", detail: "Ground-level control for large, heavy or difficult-to-reach curtains.", href: "/motorised-curtain-systems" },
];

const guides = [
  { label: "Gable-end curtains", href: "/gable-end-curtains" },
  { label: "Triangular window curtains", href: "/triangular-window-curtains" },
  { label: "Angled window curtains", href: "/angled-window-curtains" },
  { label: "Curtain tracks", href: "/curtain-tracks" },
  { label: "Linings and blackout", href: "/curtain-linings" },
  { label: "Installation and aftercare", href: "/services/premium-installation" },
  { label: "Curtain tiebacks", href: "/curtain-tiebacks" },
  { label: "Measuring an apex window", href: "/advice/how-to-measure-for-apex-curtains" },
  { label: "Colour explorer", href: "/curtain-colours-and-tones#colour-explorer" },
  { label: "Room visualiser", href: "/room-visualiser" },
  { label: "Client reviews", href: "/reviews" },
];

export default function HomePage() {
  return (
    <main className="studio-home">
      <Hero />
      <section className="studio-wrap studio-section" id="real-projects" aria-labelledby="home-project-heading">
        <div className="studio-section-heading">
          <h2 id="home-project-heading">Selected projects</h2>
          <Link href="/gallery" className="studio-link">Explore the portfolio <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="studio-project-pair">
          {selectedProjects.map(({ photo, name, href }) => (
            <article key={href}>
              <Link href={href} className="studio-image-link" prefetch={false}>
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 90vw, 50vw" />
                <span className="studio-caption">{photo.caption}</span>
                <h3>{name} <span aria-hidden="true">↗</span></h3>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-section studio-service-band" id="architectural-curtains" aria-labelledby="home-specialisms">
        <div className="studio-wrap studio-split">
          <div>
            <p className="studio-kicker">Specialisms</p>
            <h2 id="home-specialisms">When the window sets the brief.</h2>
            <p>Height, shape and scale affect how a curtain falls, opens and fixes to the building. We consider those details together, from the first survey to the final dressing.</p>
          </div>
          <div className="studio-service-list">
            {specialisms.map(({ title, detail, href }) => (
              <Link key={href} href={href} prefetch={false}>
                <h3>{title} <span aria-hidden="true">↗</span></h3>
                <p>{detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="studio-wrap studio-section studio-craft" aria-labelledby="home-craft">
        <figure>
          <Image src={studioPhotos.cambridge.src} alt={studioPhotos.cambridge.alt} width={studioPhotos.cambridge.width} height={studioPhotos.cambridge.height} sizes="(max-width: 750px) 90vw, 42vw" />
          <figcaption className="studio-caption">{studioPhotos.cambridge.caption}</figcaption>
        </figure>
        <div>
          <p className="studio-kicker">Survey, make and fit</p>
          <h2 id="home-craft">The work behind the fold.</h2>
          <p>A curtain’s scale is felt in its seams, lining, heading and hardware. We plan those details alongside access for fitting and future care.</p>
          <div className="studio-reading-links">
            <Link href="/oversized-curtain-manufacturing" className="studio-link">Specialist manufacturing <span aria-hidden="true">↗</span></Link>
            <Link href="/high-level-curtain-installation" className="studio-link">High-level installation <span aria-hidden="true">↗</span></Link>
            <Link href="/professionals" className="studio-link">Architects, designers and trade <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
      <section className="studio-wrap studio-resources" aria-label="Design resources">
        <details className="studio-disclosure">
          <summary>Explore window shapes and design resources</summary>
          <div className="home-experience studio-discovery">
            <HomeWindowDiscovery />
            <ul className="studio-resource-links">{guides.map(({ href, label }) => <li key={href}><Link href={href} prefetch={false}>{label} <span aria-hidden="true">↗</span></Link></li>)}</ul>
            <details className="studio-disclosure">
              <summary>Explore the fabric personality quiz</summary>
              <LazyFabricQuiz />
            </details>
          </div>
        </details>
      </section>
      <section className="studio-section studio-enquiry">
        <div className="studio-wrap studio-split">
          <div><h2>Tell us about your window.</h2><p>A photograph, a drawing or the dimensions you know are enough to begin.</p></div>
          <div className="studio-actions">
            <Link href="/architectural-curtain-project-planner" className="studio-button">Discuss your project</Link>
            <Link href="/start-designing" className="studio-link">Start with a window photo <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
