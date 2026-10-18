import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TrackedLink from "@/components/analytics/TrackedLink";
import {
  PleatDiagram,
  ApexHeadingDiagram,
} from "@/components/guides/HeadingDiagrams";
import HeadingClearance from "@/components/guides/HeadingClearance";
import { headingStyles, headingQuestions } from "@/lib/curtain-headings";
import { SITE_URL } from "@/lib/seo-metadata";
import "./headings.css";

export const metadata: Metadata = {
  title: {
    absolute:
      "Curtain Headings: Wave, Pinch Pleat, Pencil Pleat | Apex Curtains",
  },
  description:
    "Compare pencil pleat, double pinch pleat and wave curtains with real Apex installations and diagrams. Expert guidance on fullness, tracks, stack-back and shaped windows.",
  alternates: { canonical: "https://www.apexcurtains.com/curtain-headings" },
  openGraph: {
    title: "Curtain headings & pleat styles | Apex Curtains",
    description:
      "See the folds. Understand the details. Choose a heading around your architecture.",
    url: `${SITE_URL}/curtain-headings`,
    type: "article",
    images: [
      {
        url: "/projects/pinch-pleat-curtains-oxford-oxford.jpeg",
        alt: "Double pinch pleat curtains in a real Oxford gable installation",
      },
    ],
  },
};

const url = `${SITE_URL}/curtain-headings`;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: "Curtain headings and pleat styles",
      description: metadata.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        contentUrl: `${SITE_URL}/projects/pinch-pleat-curtains-oxford-oxford.jpeg`,
        caption: "Oxford · Real Apex double pinch pleat installation",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Curtain design guide",
          item: `${SITE_URL}/curtain-design-guide`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Curtain headings",
          item: url,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${url}#questions`,
      isPartOf: { "@id": `${url}#webpage` },
      mainEntity: headingQuestions.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

export default function Page() {
  return (
    <main className="headings-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="headings-hero">
        <div className="headings-hero-copy">
          <nav aria-label="Breadcrumb" className="headings-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/curtain-design-guide">Design guide</Link>
          </nav>
          <p className="headings-eyebrow">The art of the fold</p>
          <h1>
            Curtain headings
            <br />
            &amp; <em>pleat styles.</em>
          </h1>
          <p>
            The heading sets the rhythm of a curtain. Its folds, structure and
            movement change how the cloth meets the architecture — and how the
            whole room feels.
          </p>
          <p className="headings-hero-note">
            A specialist guide to pencil pleat, double pinch pleat and wave,
            with real Apex installations and the practical detail behind the
            finish.
          </p>
          <a className="headings-button" href="#curtain-details">
            Find your heading <span aria-hidden="true">↓</span>
          </a>
        </div>
        <figure className="headings-hero-image">
          <Image
            src="/projects/pinch-pleat-curtains-oxford-oxford.jpeg"
            alt="Double pinch pleat curtains framing a broad gable window in a real Oxford home"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 60vw"
          />
          <figcaption>
            Oxford / Double pinch pleat / An Apex installation
          </figcaption>
        </figure>
      </header>

      <nav className="headings-index" aria-label="In this heading guide">
        <a href="#curtain-details">Compare headings</a>
        <a href="#shaped-windows">Apex &amp; angled windows</a>
        <a href="#fullness">Fabric &amp; fullness</a>
        <a href="#tracks-and-space">Tracks &amp; space</a>
        <a href="#questions">Your questions</a>
      </nav>

      <section
        className="headings-section"
        id="curtain-details"
        aria-labelledby="heading-comparison-title"
      >
        <div className="headings-section-intro">
          <div>
            <p className="headings-eyebrow">01 / Choose the rhythm</p>
            <h2 id="heading-comparison-title">
              Three expressions.
              <br />
              <em>One considered room.</em>
            </h2>
          </div>
          <p>
            A heading is the constructed upper edge where the curtain is
            supported. Start with the look you love, then consider the cloth,
            lining, track, window shape and the way the curtain needs to open.
          </p>
        </div>
        <div className="heading-style-links">
          {headingStyles.map((style) => (
            <a href={`#${style.id}`} key={style.id}>
              <PleatDiagram kind={style.kind} />
              <h3>
                {style.name} <span aria-hidden="true">↗</span>
              </h3>
              <p>{style.summary}</p>
            </a>
          ))}
        </div>
        <p className="heading-caption">
          Construction sketches explain the principle; they are not measured
          make-up patterns. All three looks appear in the real projects below.
        </p>
        <div
          className="headings-table-scroll"
          role="region"
          aria-label="Compare curtain heading construction and planning"
          tabIndex={0}
        >
          <table>
            <caption>The differences that matter before you order</caption>
            <thead>
              <tr>
                <th scope="col">Heading</th>
                <th scope="col">How the top is formed</th>
                <th scope="col">Character in a room</th>
                <th scope="col">What we resolve</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Double pinch pleat</th>
                <td>Pairs of folds sewn into fixed groups</td>
                <td>Tailored, defined and ordered</td>
                <td>
                  Finished width, pleat spacing, hook position and gathered
                  volume
                </td>
              </tr>
              <tr>
                <th scope="row">Pencil pleat</th>
                <td>Narrow gathers drawn up through heading tape</td>
                <td>Soft, relaxed and finely textured</td>
                <td>Tape depth, even gathering, hook rows and support</td>
              </tr>
              <tr>
                <th scope="row">Wave</th>
                <td>Alternating folds coordinated with a carrier system</td>
                <td>Continuous, flowing and architectural</td>
                <td>
                  Fabric suitability, compatible hardware and front-to-back
                  clearance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="headings-profiles">
        {headingStyles.map((style, index) => (
          <section
            key={style.id}
            id={style.id}
            className={`heading-profile heading-profile-${style.kind}`}
            aria-labelledby={`${style.id}-title`}
          >
            <figure className="heading-project-photo">
              <Image
                src={style.image}
                alt={style.alt}
                width={style.width}
                height={style.height}
                sizes="(max-width: 800px) 100vw, 52vw"
              />
              <figcaption>
                <strong>{style.location} / Real Apex installation</strong>
                <span>{style.observation}</span>
                <Link href={style.project}>
                  Explore this project <span aria-hidden="true">↗</span>
                </Link>
              </figcaption>
            </figure>
            <div className="heading-profile-copy">
              <p className="headings-eyebrow">
                {String(index + 1).padStart(2, "0")} / {style.mood}
              </p>
              <h2 id={`${style.id}-title`}>{style.name}</h2>
              <p className="heading-lead">{style.summary}</p>
              <h3>How it is made</h3>
              <p>{style.construction}</p>
              <h3>How it feels</h3>
              <p>{style.interior}</p>
              <h3>What needs planning</h3>
              <p>{style.planning}</p>
              <figure className="heading-detail-sketch">
                <PleatDiagram kind={style.kind} />
                <figcaption>{style.diagramCaption}</figcaption>
              </figure>
              <Link
                className="headings-text-link"
                href={`/room-visualiser?room=${style.room}&colour=linen`}
              >
                Explore this heading in the room visualiser{" "}
                <span aria-hidden="true">↗</span>
              </Link>
              <p className="heading-caption">
                The visualiser uses illustrative rooms for colour exploration.
                The photograph here is the real installation.
              </p>
            </div>
          </section>
        ))}
      </div>

      <section className="headings-section headings-single" id="single-pleat">
        <div>
          <p className="headings-eyebrow">Another tailored direction</p>
          <h2>
            What about
            <br />
            <em>single pleat?</em>
          </h2>
        </div>
        <div>
          <p>
            A single pleat uses one defined fold in each group. It can offer a
            restrained tailored line between an informal gather and a more
            pronounced pinch heading. The fabric, spacing and make-up still
            determine its body and finished width.
          </p>
          <p>
            We can discuss this direction during design and confirm its
            suitability for your window, chosen cloth and track before
            specifying it.
          </p>
          <Link href="/curtain-design-guide" className="headings-text-link">
            Bring the specification together ↗
          </Link>
        </div>
      </section>

      <section className="headings-section headings-shaped" id="shaped-windows">
        <div className="headings-section-intro">
          <div>
            <p className="headings-eyebrow">02 / Made for the architecture</p>
            <h2>
              On an apex, the heading
              <br />
              <em>is only the beginning.</em>
            </h2>
          </div>
          <p>
            A beautiful fold cannot resolve an incorrect angle, an unsuitable
            track or nowhere for the cloth to go. We design the heading and the
            shaped installation together.
          </p>
        </div>
        <div className="headings-planning-grid">
          <figure>
            <ApexHeadingDiagram />
            <figcaption className="heading-caption">
              A schematic tied-back curtain, showing why its upper shape and its
              opening movement must be considered separately.
            </figcaption>
          </figure>
          <ol className="headings-numbered">
            <li>
              <h3>The true upper line</h3>
              <p>
                Measure the peak, both slopes and the actual fixing route.
                Opposite sides may differ. The shape cannot be established from
                the horizontal width and longest drop alone.
              </p>
            </li>
            <li>
              <h3>Cloth that may stay in place</h3>
              <p>
                Some sloping sections are retained rather than travelling like
                curtains on a level track. Neither a wave appearance nor a pinch
                heading proves that the curtain can slide around the peak.
              </p>
            </li>
            <li>
              <h3>A changing drop</h3>
              <p>
                Each part of the top line has a different distance to the
                finished floor. The heading construction, hook level and hem
                position belong to the same measured design.
              </p>
            </li>
            <li>
              <h3>The view when tied back</h3>
              <p>
                A tieback gathers the lower cloth; it does not move the upper
                attachment points. Its height and reach change the sweep, the
                folds and the amount of glazing left visible.
              </p>
            </li>
          </ol>
        </div>
        <div className="headings-link-row">
          <Link href="/apex-curtains">Apex curtains ↗</Link>
          <Link href="/gable-end-curtains">Gable-end curtains ↗</Link>
          <Link href="/triangular-window-curtains">Triangular glazing ↗</Link>
          <Link href="/angled-window-curtains">Angled windows ↗</Link>
          <Link href="/advice/how-to-measure-for-apex-curtains">
            Measuring the geometry ↗
          </Link>
        </div>
      </section>

      <section className="headings-section" id="fullness">
        <div className="headings-section-intro">
          <div>
            <p className="headings-eyebrow">
              03 / Cloth, proportion &amp; light
            </p>
            <h2>
              The same heading.
              <br />
              <em>A different drape.</em>
            </h2>
          </div>
          <p>
            Fabric and lining change the result as much as the name of the
            pleat. A small sample cannot show how the complete curtain will
            settle across a large window.
          </p>
        </div>
        <div className="headings-fabric-grid">
          <div className="headings-fullness">
            <p className="headings-eyebrow">Understanding fullness</p>
            <h3>More cloth creates the folds.</h3>
            <p>
              Fullness relates the flat fabric width to the width it covers once
              arranged into folds. More fullness changes depth and volume; it
              also adds cloth, weight and gathered bulk.
            </p>
            <div
              className="headings-fullness-bars"
              role="img"
              aria-label="Illustrative two-times fullness: four metres of flat fabric width arranged to cover two metres on a straight run"
            >
              <span>4 m flat fabric width</span>
              <span>2 m covered width</span>
            </div>
            <p className="heading-caption">
              Illustrative 2× fullness on a straight run, before hems, seams,
              returns and pattern allowances. This is not an ordering rule for
              an apex curtain or a recommended ratio for every heading.
            </p>
          </div>
          <div className="headings-fabric-notes">
            <article>
              <h3>Weight is not the same as drape</h3>
              <p>
                A heavy fabric can still be supple; a lighter fabric may be
                stiff. Consider how the cloth bends, recovers and holds a fold.
                Wave needs fabric that can form a continuous curve; tailored
                pleats need enough support to keep their intended shape.
              </p>
            </article>
            <article>
              <h3>Lining adds another layer</h3>
              <p>
                Standard, blackout and thermal blackout linings can change the
                body, weight and bulk of the curtain. Assess the finished
                combination, especially where several folds collect at a tieback
                or within a shallow recess.
              </p>
            </article>
            <article>
              <h3>At 4–6 metres, scale matters</h3>
              <p>
                A fine heading detail is viewed from far below, while long folds
                dominate the room. Heading depth, fabric movement, joins and
                pattern scale need to be judged at the intended drop. A deeper
                heading is not automatically right for every tall curtain.
              </p>
            </article>
            <article>
              <h3>Colour appears in light and shadow</h3>
              <p>
                The outward face of a fold catches the light; its recess looks
                darker. A plain neutral can feel richly layered across tall
                glazing, while a dark colour can make the architecture more
                dramatic. Compare physical samples in the room’s daylight and
                evening light.
              </p>
            </article>
          </div>
        </div>
        <div className="headings-link-row">
          <Link href="/curtain-fabrics">
            Fabric selection for tall curtains ↗
          </Link>
          <Link href="/curtain-linings">Compare lining options ↗</Link>
          <Link href="/curtain-colours-and-tones">
            Explore colour &amp; interiors ↗
          </Link>
        </div>
      </section>

      <section
        className="headings-section headings-space"
        id="tracks-and-space"
      >
        <div className="headings-section-intro">
          <div>
            <p className="headings-eyebrow">04 / The space behind the beauty</p>
            <h2>
              Give the folds
              <br />
              <em>room to work.</em>
            </h2>
          </div>
          <p>
            There are two separate spaces to plan: the depth of the folds across
            the track, and the width occupied when the curtain gathers along it.
            Neither is a fixed percentage for every curtain.
          </p>
        </div>
        <div className="headings-planning-grid">
          <HeadingClearance />
          <div className="headings-space-copy">
            <h3>The heading and hardware are a pair</h3>
            <p>
              We match the heading, hooks, carriers and track before
              manufacture. Pencil and pinch pleats need suitable support and
              hook positioning; a travelling wave system needs a coordinated
              tape and carrier arrangement. Changing hooks alone does not
              convert one system into another.
            </p>
            <h3>Specify the complete load</h3>
            <p>
              Apex supplies aluminium tracks including Forest KS and CS,
              normally in white with black as an optional upgrade. Selection
              depends on the complete curtain and lining weight, the carriers,
              fixing structure and proposed movement. A rail’s published
              capacity does not override a lower limit in another component.
            </p>
            <h3>Plan the view as well as the fabric</h3>
            <p>
              Stack-back depends on cloth thickness, fullness, lining and
              hardware. Check door access and handles, and agree how much glass
              can remain covered. Motorisation is a separate system and route
              decision; a heading name does not make a shaped track motorisable.
            </p>
            <Link className="headings-text-link" href="/curtain-tracks">
              Track systems, clearances &amp; fixing requirements ↗
            </Link>
          </div>
        </div>
        <aside className="headings-light-note">
          <h3>A neat top line does not guarantee darkness.</h3>
          <p>
            Blackout lining reduces light through the lined cloth. Light can
            still enter above the heading, at the sides, between panels or below
            the hem. Track position, overlap, side returns and a floor-length
            finish can help, but the geometry may leave environmental gaps.
          </p>
          <Link href="/curtain-linings#blackout-lining">
            Understand lining and light gaps ↗
          </Link>
        </aside>
      </section>

      <section className="headings-section headings-finish">
        <figure>
          <Image
            src="/projects/cambridge-apex-curtains-cambridge.jpeg"
            alt="Real Apex installation showing long curtain folds drawn into a matching tieback"
            width={900}
            height={1600}
            sizes="(max-width: 800px) 100vw, 45vw"
          />
          <figcaption className="heading-caption">
            Cambridge / Real Apex installation / The sweep of the cloth is part
            of the finish.
          </figcaption>
        </figure>
        <div>
          <p className="headings-eyebrow">05 / The final dress</p>
          <h2>
            A heading is made.
            <br />
            <em>A curtain is dressed.</em>
          </h2>
          <p>
            Once fitted, the folds need arranging from the heading through the
            body of the curtain. We check hook levels, distribution, the agreed
            movement and the floor relationship, then dress the cloth so the
            design reads as a whole.
          </p>
          <p>
            Suitable steaming can help some fabrics settle; heat and moisture
            must follow the fabric’s care guidance. Tiebacks should support the
            sweep without crushing the folds or pulling the heading out of
            position.
          </p>
          <p>
            For everyday use, follow the agreed opening method. Do not force
            retained sloping sections to travel or use the cloth as a way to
            pull against a fixed track. High-level adjustments need a planned
            access method.
          </p>
          <div className="headings-link-row">
            <Link href="/services/premium-installation">
              Installation &amp; aftercare ↗
            </Link>
            <Link href="/curtain-tiebacks">
              Tieback sizing &amp; positioning ↗
            </Link>
            <Link href="/advice/buying-apex-curtains-online">
              Why specification matters ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="headings-section headings-questions" id="questions">
        <div>
          <p className="headings-eyebrow">A little more clarity</p>
          <h2>
            Your questions,
            <br />
            <em>answered.</em>
          </h2>
          <p>
            Bring the room, the fabric and the window into the same
            conversation. That is how we choose a heading that looks right and
            works as intended.
          </p>
        </div>
        <div>
          {headingQuestions.map((qa) => (
            <details key={qa.question}>
              <summary>{qa.question}</summary>
              <p>{qa.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        className="headings-section headings-references"
        aria-labelledby="heading-reference-title"
      >
        <h2 id="heading-reference-title">Behind the guidance</h2>
        <p>
          Real photographs link to their Apex project stories above. Technical
          principles checked against manufacturer guidance on 18 October 2026;
          the supplied system’s current instructions govern its make-up and
          installation.
        </p>
        <div className="headings-link-row">
          <a href="https://www.forestgroup.com/user_files/download_files/download_2047_FES_brochure_ENG_111125_WEB.pdf">
            Forest wave workroom guidance (PDF) ↗
          </a>
          <a href="https://webstore.jones-interiors.com/workroom/heading-tapes.html">
            Jones Interiors heading-tape reference ↗
          </a>
        </div>
        <p className="heading-caption">
          These references explain construction principles. They do not identify
          the hardware in a project photograph or imply that every manufacturer
          product is supplied by Apex.
        </p>
      </section>

      <section className="headings-cta">
        <p className="headings-eyebrow">From a fold to a finished room</p>
        <h2>
          Find the heading
          <br />
          <em>that belongs in your home.</em>
        </h2>
        <p>
          Show us your window and the look you love. We’ll consider the fabric,
          lining, track and practical details together.
        </p>
        <div>
          <TrackedLink
            className="headings-button"
            href="/start-designing"
            eventName="curtain_journey_start_click"
            eventData={{ source: "curtain_headings_guide" }}
          >
            Discuss your curtains ↗
          </TrackedLink>
          <Link
            className="headings-button headings-button-outline"
            href="/room-visualiser"
          >
            Explore the room visualiser ↗
          </Link>
        </div>
        <a className="headings-text-link" href="tel:08007720367">
          Or call 0800 772 0367
        </a>
      </section>
    </main>
  );
}
