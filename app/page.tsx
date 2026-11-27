import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/homepage/Hero";
import HomeWindowDiscovery from "@/components/homepage/HomeWindowDiscovery";
import LazyFabricQuiz from "@/components/performance/LazyFabricQuiz";
import { studioPhotos } from "@/lib/studio-photography";
import CurtainMotion from "@/components/architecture/CurtainMotion";
import "@/components/architecture/architecture.css";
import "./homepage.css";
import "./architectural-home.css";

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
  { photo: { ...studioPhotos.lounge, src: "/images/commercial/airport-lounge-curtains.jpeg", alt: "Completed commercial curtains in the Manchester Airport lounge interior" }, name: "Curtains for an airport lounge", href: "/commercial-curtain-track-installation#manchester-airport" },
  { photo: studioPhotos.cambridge, name: "The folds and the finishing", href: "/gallery/cambridge-apex-curtains-cambridge" },
];

const specialisms = [
  {
    title: "Apex and shaped curtains", href: "/apex-curtains",
    detail: "Shaped headings follow the roofline while the open stack frames the view.",
    src: "/projects/wave-pleat-apex-curtains-milton-keynes.jpeg", caption: "Milton Keynes · Shaped bedroom window",
    width: 899, height: 1599, alt: "Dressed curtains follow both slopes above a bedroom window in Milton Keynes",
  },
  {
    title: "Tall and double-height curtains", href: "/tall-window-curtains",
    detail: "In stairwells and two-storey rooms, the hanging point, finished drop and access are three separate decisions.",
    src: "/architecture/tall-glazing-elevation.svg", caption: "Illustrated elevation · Tall rectangular glazing",
    width: 720, height: 490, alt: "Elevation distinguishing the curtain drop from the height of the glazed opening",
  },
  {
    title: "Motorised curtain systems", href: "/motorised-curtain-systems",
    detail: "Operate large or inaccessible curtains from floor level. Each track is assessed for its load, route and draw direction.",
    src: "/architecture/layered-track-section.svg", caption: "Illustrated section · Independent curtain and voile",
    width: 720, height: 490, alt: "Cutaway showing a curtain and a voile suspended from separate level tracks",
  },
  {
    title: "Oversized architectural curtains", href: "/oversized-architectural-curtains",
    detail: "For wide glazing and hospitality interiors, we plan panel widths, heavy linings and the space the open curtains need.",
    ...studioPhotos.lounge,
  },
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
    <main className="studio-home architectural-home">
      <Hero />
      <section className="studio-wrap front-section" id="architectural-curtains" aria-labelledby="home-specialisms">
        <div className="front-intro">
          <h2 id="home-specialisms">Curtains for challenging windows</h2>
          <p>Specialist made-to-measure curtains for apex and gable windows, double-height rooms and wide glazing. A sloping roofline changes where a curtain can hang. Height and width change what the track must carry.</p>
        </div>
        <div className="front-specialisms">
          {specialisms.map(item => (
            <article key={item.href}>
              <Link href={item.href} prefetch={false} aria-label={item.title}>
                <figure>
                  <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 700px) 92vw, (max-width: 1400px) 50vw, 720px" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
                <h3>{item.title}<span aria-hidden="true">↗</span></h3>
              </Link>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="front-expertise" aria-labelledby="home-craft">
        <div className="studio-wrap front-expertise-layout">
          <figure>
            <Image src="/projects/london-apartment-curtain-fitting.jpg" alt="A fitter working at curtain-heading height on an access tower, with a colleague below the tall patterned curtains" width={960} height={1280} sizes="(max-width: 760px) 90vw, 38vw" />
            <figcaption>Tall windows in a luxury London apartment · Installation in progress</figcaption>
          </figure>
          <div>
            <h2 id="home-craft">When the window shapes the whole installation</h2>
            <p>A glazed gable above a doorway leaves little room to stack the curtain. A tall stairwell can put the heading out of reach. We work out how the curtain will open, where its weight will sit and how our fitters will reach it.</p>
            <dl>
              <div><dt>Geometry and scale</dt><dd>We measure the changing height along a sloping roofline and check the door swing before deciding which sections can move.</dd></div>
              <div><dt>Workroom and finish</dt><dd>On long drops we set out the fabric joins and pattern repeat before cutting. Across a wide opening, the lining and fullness determine how much cloth the track must carry.</dd></div>
              <div><dt>Tracks and high-level fitting</dt><dd>Our fitting work includes luxury apartments in central London. For each project we assess the fixing surface, track load and access for fitting, dressing and maintenance.</dd></div>
            </dl>
            <div className="front-expertise-links">
              <Link href="/oversized-curtain-manufacturing">Specialist manufacturing ↗</Link>
              <Link href="/high-level-curtain-installation">High-level installation ↗</Link>
              <Link href="/professionals">Architects, designers and trade ↗</Link>
            </div>
          </div>
        </div>
      </section>
      <div className="front-demonstration">
        <div className="studio-wrap front-motion-layout">
          <figure className="front-installation-film">
            <video playsInline controls preload="none" width={576} height={1024} poster="/projects/motorised-high-window-poster.webp" aria-labelledby="home-film-caption">
              <source src="/projects/motorised-high-window.mp4" type="video/mp4" />
              <a href="/projects/motorised-high-window.mp4">Watch the installation film</a>
            </video>
            <figcaption id="home-film-caption">Remote-operated curtains on a five-metre-high residential window. A handheld remote closes the two panels at the centre, then draws them open again.</figcaption>
          </figure>
          <div>
            <CurtainMotion introduction="Try the movement on tall or wide rectangular glazing. Choose where the curtain stacks, then open the voile independently to see how the two layers work together." />
            <Link href="/motorised-curtain-systems" className="studio-link">Explore motorised curtain systems <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
      <section className="studio-wrap studio-section" id="real-projects" aria-labelledby="home-project-heading">
        <div className="studio-section-heading">
          <h2 id="home-project-heading">Selected projects</h2>
          <Link href="/gallery" className="studio-link">Explore the portfolio <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="front-projects">
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
      <section className="studio-wrap studio-resources" aria-label="Design resources">
        <details className="studio-disclosure">
          <summary>Explore window shapes and design resources</summary>
          <div className="home-experience studio-discovery">
            <HomeWindowDiscovery />
            <ul className="studio-resource-links">{guides.map(({ href, label }) => <li key={href}><Link href={href} prefetch={false}>{label} <span aria-hidden="true">↗</span></Link></li>)}</ul>
            <details className="studio-disclosure">
              <summary>Find your fabric style</summary>
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
