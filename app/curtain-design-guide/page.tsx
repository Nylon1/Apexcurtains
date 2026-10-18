import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.apexcurtains.com";
const canonicalUrl = `${SITE_URL}/curtain-design-guide`;

export const metadata: Metadata = {
  title: {
    absolute:
      "Curtain Design Guide | Specify Headings, Linings, Fabrics & Tracks | Apex Curtains",
  },
  description:
    "Plan a made-to-measure curtain specification from window type and heading through fabric, lining, accessories, track and installation.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Curtain Design Guide | Apex Curtains",
    description:
      "A practical specification journey for made-to-measure curtains on apex, gable-end, triangular and other difficult windows.",
    url: canonicalUrl,
    siteName: "Apex Curtains",
    type: "website",
  },
};

const steps = [
  {
    number: "00",
    title: "Find your colour direction",
    text: "Connect the curtain to the room through undertones, texture and the balance of light and dark. A large expanse of cloth becomes part of the architecture.",
    href: "/curtain-colours-and-tones",
    cta: "Explore colour and tone",
  },
  {
    number: "01",
    title: "Start with the window",
    text: "The shape, height, fixing surface and available stack space set the boundaries for the whole curtain design.",
    href: "/window-types",
    cta: "Choose your window type",
  },
  {
    number: "02",
    title: "Choose the heading",
    text: "Wave, pinch pleat, pencil pleat and tailored headings change the fullness, structure, movement and finished appearance.",
    href: "/curtain-headings",
    cta: "Compare curtain headings",
  },
  {
    number: "03",
    title: "Choose the fabric",
    text: "Fabric weight, drape, pattern and how the cloth behaves in daylight all affect how the finished curtain looks and moves.",
    href: "/curtain-fabrics",
    cta: "Explore curtain fabrics",
  },
  {
    number: "04",
    title: "Specify the lining",
    text: "Standard lining, blackout, thermal lining and interlining change privacy, light control, weight and the character of the curtain.",
    href: "/curtain-linings",
    cta: "Compare curtain linings",
  },
  {
    number: "05",
    title: "Add finishing details",
    text: "Tiebacks, tieback hooks and other finishing details should support the room and the way the curtains are actually used.",
    href: "/curtain-tiebacks",
    cta: "Explore curtain tiebacks",
  },
  {
    number: "06",
    title: "Match the track",
    text: "The track must suit the route, curtain weight, fixing surface and the way the curtain needs to open and stack.",
    href: "/curtain-tracks",
    cta: "Explore curtain tracks",
  },
  {
    number: "07",
    title: "Plan installation",
    text: "High, angled and double-height windows need fixing and access decisions made before manufacture, not after it.",
    href: "/services/premium-installation",
    cta: "See installation planning",
  },
  {
    number: "08",
    title: "Check real project evidence",
    text: "Use completed projects to see how recorded window types, headings, linings and room requirements have been brought together.",
    href: "/gallery",
    cta: "View real projects",
  },
];

export default function CurtainDesignGuidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: "Curtain Design Guide",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <main className="window-editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="guide-hero">
        <div className="guide-hero-copy">
          <p className="editorial-eyebrow">The curtain design guide</p>
          <h1>
            A room, considered
            <br />
            in every detail.
          </h1>
          <p className="guide-intro">
            Start with a feeling. Then bring the colour, cloth, heading and
            practical details together around the architecture of your home.
          </p>
          <a href="#design-decisions" className="editorial-button">
            Explore the design journey ↓
          </a>
        </div>
        <figure className="guide-hero-image">
          <Image
            src="/window-types/triangular.jpeg"
            alt="Muted green curtains framing triangular glazing"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <figcaption>
            Grounded greens and soft pale walls · A gentle connection to the
            garden.
          </figcaption>
        </figure>
      </section>
      <section
        className="design-steps"
        id="design-decisions"
        aria-label="Curtain design decisions"
      >
        {steps.map((step, i) => (
          <article key={step.number}>
            <p className="editorial-eyebrow">
              {String(i + 1).padStart(2, "0")} / A considered decision
            </p>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
            <Link href={step.href} className="editorial-text-link">
              {step.cta} ↗
            </Link>
          </article>
        ))}
      </section>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">Bring the ideas together</p>
        <h2>Your window. Your way of living.</h2>
        <p>
          A photograph and a conversation are the starting point for a curtain
          designed around your room.
        </p>
        <Link href="/start-designing" className="editorial-button">
          Begin your curtain project ↗
        </Link>
        <Link
          href="/advice/buying-apex-curtains-online"
          className="editorial-text-link"
        >
          Why the complete specification matters
        </Link>
      </section>
    </main>
  );
}
