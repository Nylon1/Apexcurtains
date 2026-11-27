import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, DraftingCompass, Layers, SwatchBook } from "lucide-react";
import Hero from "@/components/homepage/Hero";
import HomeWindowDiscovery from "@/components/homepage/HomeWindowDiscovery";
import HomeRoomVisualiser from "@/components/homepage/HomeRoomVisualiser";
import LazyFabricQuiz from "@/components/performance/LazyFabricQuiz";
import { studioPhotos } from "@/lib/studio-photography";
import CurtainMotion from "@/components/architecture/CurtainMotion";
import "@/components/architecture/architecture.css";
import "./homepage.css";
import "./architectural-home.css";
import "./room-visualiser/visualiser.css";

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
  { photo: { ...studioPhotos.lounge, src: "/images/commercial/airport-lounge-curtains.jpeg", alt: "Completed commercial curtains in the Manchester Airport lounge interior" }, name: "Curtains for an airport lounge", href: "/gallery/manchester-airport-lounge" },
  { photo: studioPhotos.cambridge, name: "The folds and the finishing", href: "/gallery/cambridge-apex-curtains-cambridge" },
];

const installationFilmLoading = { loading: "lazy", preload: "none" } as const;

type FilmPreviewProps = { src: string; thumbnail: string; title: string; seconds: number };

function FilmPreview({ src, thumbnail, title, seconds }: FilmPreviewProps) {
  return (
    <a className="front-film-preview" href={src}>
      <span className="front-film-still">
        <Image src={thumbnail} alt="" width={320} height={256} unoptimized />
        <span className="front-film-play" aria-hidden="true" />
      </span>
      <span className="front-film-copy">
        <span className="front-film-meta">Watch film <span aria-hidden="true">·</span> {seconds} sec</span>
        <span className="front-film-title">{title}</span>
      </span>
    </a>
  );
}

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
    src: "/projects/tall-dining-room-curtains.jpg", caption: "Double-height dining room",
    width: 1085, height: 1280, alt: "Tall tied-back curtains reveal a continuous voile behind a dining table, beside a timber wall and an upper landing",
    film: { src: "/projects/tall-window-curtains-installation.mp4", thumbnail: "/projects/tall-window-curtains-installation-thumb.webp", title: "Curtains for a tall window", seconds: 14 },
  },
  {
    title: "Motorised curtain systems", href: "/motorised-curtain-systems",
    detail: "Operate large or inaccessible curtains from floor level. Each track is assessed for its load, route and draw direction.",
    src: "/projects/two-storey-motorised-voiles.webp", caption: "Two-storey living room",
    width: 720, height: 1280, alt: "Daylight filtered through motorised voiles spanning two tiers of living-room glazing",
    film: { src: "/projects/motorised-voiles-two-storey-room.mp4", thumbnail: "/projects/motorised-voiles-two-storey-room-thumb.webp", title: "Motorised voiles in motion", seconds: 13 },
  },
  {
    title: "Oversized architectural curtains", href: "/oversized-architectural-curtains",
    detail: "For wide glazing and hospitality interiors, we plan panel widths, heavy linings and the space the open curtains need.",
    ...studioPhotos.lounge,
  },
];

const technicalDrawings = [
  { title: "Window height and curtain drop", src: "/architecture/tall-glazing-elevation.svg", alt: "Elevation with separate dimensions for the glazed opening and the curtain from hanging point to hem", detail: "The height of the glass is one measurement. The curtain drop runs from its hanging point to the intended hem." },
  { title: "Curtain and voile tracks", src: "/architecture/layered-track-section.svg", alt: "Section showing the voile on a track beside the glass and the outer curtain on a second track facing the room", detail: "A separate track for each layer lets the voile filter daylight while the outer curtain stays open." },
];

const guideGroups = [
  { title: "Window shapes", Icon: DraftingCompass, links: [
    { label: "Gable-end curtains", href: "/gable-end-curtains" },
    { label: "Triangular window curtains", href: "/triangular-window-curtains" },
    { label: "Angled window curtains", href: "/angled-window-curtains" },
    { label: "Measuring an apex window", href: "/advice/how-to-measure-for-apex-curtains" },
  ] },
  { title: "Curtain details", Icon: Layers, links: [
    { label: "Curtain tracks", href: "/curtain-tracks" },
    { label: "Linings and blackout", href: "/curtain-linings" },
    { label: "Curtain tiebacks", href: "/curtain-tiebacks" },
  ] },
  { title: "Plan your project", Icon: SwatchBook, links: [
    { label: "Colour explorer", href: "/curtain-colours-and-tones#colour-explorer" },
    { label: "Room visualiser", href: "/room-visualiser" },
    { label: "Installation and aftercare", href: "/services/premium-installation" },
    { label: "Client reviews", href: "/reviews" },
  ] },
];

export default function HomePage() {
  return (
    <main className="studio-home architectural-home">
      <Hero />
      <section className="studio-wrap front-section" id="architectural-curtains" aria-labelledby="home-specialisms">
        <div className="front-intro">
          <h2 id="home-specialisms">Curtains for challenging windows</h2>
          <p>Explore made-to-measure curtains for apex and gable windows, double-height rooms and wide architectural glazing.</p>
        </div>
        <div className="front-specialisms">
          {specialisms.map(item => (
            <article key={item.href}>
              <Link className="front-service-photo" href={item.href} prefetch={false}>
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 700px) 92vw, (max-width: 1600px) 52vw, 800px" />
                <div className="front-service-title">
                  <span>{item.caption}</span>
                  <h3>{item.title} <span aria-hidden="true">↗</span></h3>
                </div>
              </Link>
              <p>{item.detail}</p>
              {item.film && <FilmPreview {...item.film} />}
            </article>
          ))}
        </div>
      </section>
      <HomeRoomVisualiser />
      <section id="survey-and-fitting" className="front-expertise" aria-labelledby="home-craft">
        <div className="studio-wrap">
          <header className="front-intro">
            <h2 id="home-craft">From survey to final fitting</h2>
            <p>A sloping roofline changes where a curtain can hang. A tall stairwell changes how we reach it. We plan the cloth, track and access together.</p>
          </header>
          <div className="front-expertise-layout">
            <article className="front-fitting-story">
              <figure>
                <Image src="/projects/london-apartment-curtain-fitting.jpg" alt="A fitter on an access tower beside tall patterned curtains, with a colleague below" width={960} height={1280} sizes="(max-width: 760px) 90vw, 45vw" />
                <figcaption>On site in a London apartment</figcaption>
              </figure>
              <h3>Fitting at height</h3>
              <p>Our work includes luxury apartments in central London. For each project we assess the fixings, track load and access for fitting, dressing and maintenance.</p>
              <Link className="front-craft-link" href="/high-level-curtain-installation">High-level installation <ArrowRight aria-hidden="true" /></Link>
            </article>
            <div className="front-craft-notes">
              <article>
                <Image className="front-craft-photo" src={studioPhotos.oxford.src} alt={studioPhotos.oxford.alt} width={1600} height={1200} sizes="(max-width: 760px) 90vw, 40vw" />
                <h3>Measuring the roofline</h3>
                <p>Along a gable, we measure the changing height and check the door swing to find where the curtains can gather when open.</p>
              </article>
              <article>
                <Image className="front-craft-photo front-cloth-detail" src={studioPhotos.cambridge.src} alt={studioPhotos.cambridge.alt} width={900} height={1600} sizes="(max-width: 760px) 90vw, 40vw" />
                <h3>Cutting for a long drop</h3>
                <p>We set out the joins and pattern repeat before cutting. The fullness and lining determine how much weight the track will carry.</p>
                <details className="front-heading-detail">
                  <summary>See a pleated heading up close</summary>
                  <figure>
                    <Image src="/projects/pleated-heading-cornice.webp" alt="Pale pleats at either side of a dark pole just below an ornate cornice" width={720} height={408} sizes="(max-width: 760px) 90vw, 40vw" />
                    <figcaption>The pleats set the spacing of the folds below the cornice.</figcaption>
                  </figure>
                </details>
                <Link className="front-craft-link" href="/oversized-curtain-manufacturing">Specialist manufacturing <ArrowRight aria-hidden="true" /></Link>
              </article>
            </div>
          </div>
          <div className="front-craft-footer">
            <FilmPreview src="/projects/two-storey-curtains-fitting-and-finish.mp4" thumbnail="/projects/two-storey-curtains-fitting-and-finish-thumb.webp" title="Fitting a two-storey room" seconds={12} />
            <Link className="front-craft-link" href="/professionals">Architects, designers and trade <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <section className="studio-wrap front-drawings" id="technical-drawings" aria-labelledby="home-drawings">
        <div className="front-intro">
          <h2 id="home-drawings">Technical drawings</h2>
          <p>Illustrative details. Final dimensions, track spacing and fixing positions are assessed for each installation.</p>
        </div>
        <div className="front-drawing-pair">
          {technicalDrawings.map(drawing => (
            <figure key={drawing.src}>
              <Image src={drawing.src} alt={drawing.alt} width={720} height={490} />
              <figcaption>
                <h3>{drawing.title}</h3>
                <p>{drawing.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <div className="front-demonstration">
        <div className="studio-wrap front-motion-layout">
          <figure className="front-installation-film">
            <video playsInline controls {...installationFilmLoading} width={576} height={1024} poster="/projects/motorised-high-window-poster.webp" aria-labelledby="home-film-caption">
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
      <section id="design-resources" className="studio-wrap studio-resources" aria-label="Design resources">
        <details className="studio-disclosure">
          <summary>Explore window shapes and design resources</summary>
          <div className="home-experience studio-discovery">
            <HomeWindowDiscovery />
            <nav aria-label="Curtain guides and planning tools" className="front-guide-index">
              {guideGroups.map(({ title, Icon, links }) => (
                <div key={title}>
                  <h3><Icon aria-hidden="true" />{title}</h3>
                  <ul>
                    {links.map(({ href, label }) => (
                      <li key={href}><Link href={href} prefetch={false}>{label}<ArrowRight aria-hidden="true" /></Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <details className="studio-disclosure">
              <summary>Find your fabric style</summary>
              <LazyFabricQuiz />
            </details>
          </div>
        </details>
      </section>
      <section id="project-enquiry" className="studio-enquiry front-consultation" aria-labelledby="home-enquiry">
        <div className="front-consultation-copy">
          <h2 id="home-enquiry">Tell us about your window.</h2>
          <p>A photograph, a drawing or a few measurements are enough to begin.</p>
          <div className="front-consultation-actions">
            <Link href="/architectural-curtain-project-planner" className="studio-button">Discuss your project <ArrowRight aria-hidden="true" /></Link>
            <Link href="/start-designing" className="front-photo-link"><Camera aria-hidden="true" />Start with a window photo</Link>
          </div>
        </div>
        <Image className="front-consultation-photo" src="/projects/tall-window-finished-room.webp" width={720} height={1280} sizes="(max-width: 760px) 100vw, 50vw" alt="Pale curtains framing tall black-framed glazing in a sunlit living room" />
      </section>
    </main>
  );
}
