import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DetailsNavigation from "@/components/guides/DetailsNavigation";
import { SITE_URL } from "@/lib/seo-metadata";
import "@/components/guides/details-guides.css";

export const metadata: Metadata = {
  title: {
    absolute: "Curtain Services: Survey, Design & Installation | Apex Curtains",
  },
  description:
    "Explore Apex's complete made-to-measure curtain service: specialist survey, design, manufacture, tracks, linings, fitting and aftercare for shaped windows.",
  alternates: { canonical: `${SITE_URL}/services` },
};
const stages = [
  {
    name: "Survey & consultation",
    href: "/services/measure-consultation",
    image: "/projects/pinch-pleat-curtains-oxford-oxford.jpeg",
    width: 1600,
    height: 1200,
    alt: "Oxford gable room with cream shaped curtains",
    intro: "Understand the room before the curtain is specified.",
    text: "Geometry, individual drops, fixing surfaces, opening space and access all inform the recommendation. Discuss light control and the view you want to keep alongside fabric and colour.",
    detail:
      "Bring photographs of the whole window and its surroundings, approximate dimensions and any available building drawings. Tell us about flooring or decoration still planned. Early information helps; final making dimensions and concealed support still need confirmation.",
  },
  {
    name: "Design & manufacture",
    href: "/services/design-make-curtains",
    image: "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg",
    width: 1200,
    height: 1600,
    alt: "Deep blue pencil pleat curtains in a Peterborough bedroom",
    intro: "Give colour and construction the same attention.",
    text: "Fabric, lining, heading, fullness, joins and shaped drops form a connected specification. Your curtains are made around the measured arrangement and the intended track and movement.",
    detail:
      "Agree the actual fabric and lining, heading, finished shape and drop, opening arrangement and finishing details before cutting. A visualiser helps with inspiration; physical samples and the confirmed specification guide the made curtain.",
  },
  {
    name: "Installation & aftercare",
    href: "/services/premium-installation",
    image: "/projects/cambridge-apex-curtains-cambridge.jpeg",
    width: 900,
    height: 1600,
    alt: "Dressed Cambridge curtains held in a matching tieback",
    intro: "Bring the specification into the room.",
    text: "Fit and check the support, hang the panels, dress the folds and demonstrate everyday use. High windows need a planned access method, followed by care guidance for the finished curtains.",
    detail:
      "Agree access and furniture arrangements in advance. At handover, review the intended movement, retained sections, overlap, floor clearance and tieback use. Keep the supplied fabric and lining care details with your project information.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/services#webpage`,
  url: `${SITE_URL}/services`,
  name: "Curtain services: survey, design and installation",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};
export default function Page() {
  return (
    <main className="specialist-guide details-guide services-hub">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="guide-hero">
        <div className="guide-hero-copy">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </nav>
          <p className="editorial-eyebrow">A complete specialist service</p>
          <h1>
            From first measure
            <br />
            to <em>final fitting.</em>
          </h1>
          <p className="guide-intro">
            A calm, guided approach to extraordinary windows. Explore the
            decisions behind the beauty, from the first room photographs to the
            finished fold.
          </p>
          <a className="editorial-button" href="#service-stages">
            Explore the service ↓
          </a>
        </div>
        <figure className="guide-hero-image">
          <Image
            src="/projects/pinch-pleat-curtains-oxford-oxford.jpeg"
            alt="Completed Apex gable curtains framing a broad view in an Oxford home"
            fill
            priority
            sizes="(max-width:900px) 100vw, 55vw"
          />
          <figcaption>
            Oxford / Real Apex installation / Architecture, cloth and the open
            view considered together.
          </figcaption>
        </figure>
      </header>
      <DetailsNavigation path="/services" />
      <section className="service-stages" id="service-stages">
        <p className="editorial-eyebrow">Consult. Create. Install.</p>
        <h2>
          A considered route
          <br />
          through every decision.
        </h2>
        <p>
          Shaped windows need the design and installation to work together. Each
          stage below explains what is resolved, what you can prepare and how it
          leads to the next.
        </p>
        {stages.map((stage, i) => (
          <article key={stage.href}>
            <figure>
              <Image
                src={stage.image}
                alt={stage.alt}
                width={stage.width}
                height={stage.height}
                sizes="(max-width:800px) 90vw, 42vw"
              />
              <figcaption>Real Apex installation photography</figcaption>
            </figure>
            <div>
              <p className="editorial-eyebrow">0{i + 1} / Your project</p>
              <h3>{stage.name}</h3>
              <p className="service-lead">{stage.intro}</p>
              <p>{stage.text}</p>
              <details>
                <summary>What to expect at this stage</summary>
                <p>{stage.detail}</p>
              </details>
              <Link className="editorial-button" href={stage.href}>
                Explore this stage ↗
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="service-decisions">
        <p className="editorial-eyebrow">Understand the details</p>
        <h2>
          Beautiful curtains.
          <br />
          Informed decisions.
        </h2>
        <div>
          {[
            {
              href: "/curtain-tracks",
              title: "Tracks & structure",
              text: "Forest KS and CS, white or black, fixing surfaces and the planned curtain route.",
            },
            {
              href: "/curtain-linings",
              title: "Linings & light",
              text: "Standard, blackout, thermal blackout and coloured lining; how coverage affects the result.",
            },
            {
              href: "/curtain-headings",
              title: "Headings & folds",
              text: "Pencil, double pinch and wave, explained through real projects and original diagrams.",
            },
            {
              href: "/curtain-accessories",
              title: "Finishing details",
              text: "Tiebacks, hooks and supporting hardware, proportioned to the curtain and the room.",
            },
          ].map((item) => (
            <Link href={item.href} key={item.href}>
              <h3>{item.title} ↗</h3>
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">Start with your window</p>
        <h2>
          Tell us what you have
          <br />
          and how you want it to feel.
        </h2>
        <p>
          Share the shape, rough dimensions and a clear photograph. We’ll help
          you explore the next step.
        </p>
        <Link className="editorial-button" href="/start-designing">
          Start your curtain journey ↗
        </Link>
        <Link className="editorial-text-link" href="/arlo-curtain-advisor">
          Ask Arlo
        </Link>
        <a className="editorial-text-link" href="tel:08007720367">
          Call 0800 772 0367
        </a>
      </section>
    </main>
  );
}
