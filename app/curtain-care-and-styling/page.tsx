import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TrackedLink from "@/components/analytics/TrackedLink";
import {
  carePrinciples,
  careFabrics,
  careHeadings,
  careSources,
  careDocument,
} from "@/lib/curtain-care";
import { SITE_URL } from "@/lib/seo-metadata";
import "./care.css";

const title = "Curtain Care, Dressing & Styling Guide | Apex Curtains";
const description =
  "Visual guidance for dressing curtain folds, caring for fabrics and linings, operating tracks and recognising when tall or motorised curtains need specialist aftercare.";
const url = `${SITE_URL}/curtain-care-and-styling`;
export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    images: [
      {
        url: "/projects/portfolio/jesmond-1.webp",
        alt: "Apex curtains and voiles at Jesmond",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/projects/portfolio/jesmond-1.webp"],
  },
};
const careRelated = [
  ["/services/premium-installation", "Installation and handover"],
  ["/curtain-headings", "Curtain headings"],
  ["/curtain-tiebacks", "Tiebacks"],
  ["/curtain-fabrics", "Fabric guidance"],
  ["/curtain-linings", "Lining guidance"],
  ["/curtain-tracks", "Track guidance"],
  ["/motorised-curtain-systems", "Motorised curtains"],
] as const;
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  url,
  name: title,
  description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};
export default function CurtainCarePage() {
  return (
    <main className="curtain-care">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb" className="wrap care-breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/services/premium-installation">
          Installation &amp; aftercare
        </Link>
        <span>/</span>
        <span>Curtain care</span>
      </nav>
      <div className="wrap hero">
        <div>
          <p className="kicker">Living beautifully with your curtains</p>
          <h1>
            Curtain care.
            <br />A thoughtful
            <br />
            <em>daily routine.</em>
          </h1>
          <p className="lead">
            Simple dressing, considered care and the right advice for your
            curtains — from the first installation to everyday life.
          </p>
          <div className="links">
            <a className="button" href="#dressing">
              Find your dressing guide ↓
            </a>
            <a href="#problems">Help with a change or problem</a>
          </div>
          <p className="small">
            Start with the instructions supplied for your complete curtain. Work
            only from a safe, comfortably accessible position.
          </p>
        </div>
        <figure>
          <Image
            src="/projects/portfolio/jesmond-1.webp"
            alt="Jesmond Apex installation: tied-back curtains with a sheer across the gable"
            width={960}
            height={1280}
            sizes="(max-width: 800px) 90vw, 45vw"
            preload
          />
          <figcaption>
            <Link href="/gallery/jesmond">
              Jesmond · Genuine Apex installation.
            </Link>{" "}
            Shown as a finished arrangement, not a care demonstration.
          </figcaption>
        </figure>
      </div>
      <nav className="jump" aria-label="Care topics">
        <a href="#dressing">Dress the folds</a>
        <a href="#heading">Your heading</a>
        <a href="#cleaning">Clean with care</a>
        <a href="#fabric">Your fabric</a>
        <a href="#operation">Tracks &amp; controls</a>
        <a href="#problems">When to ask Apex</a>
      </nav>
      <section className="wrap section" id="dressing">
        <p className="kicker">01 / Small, gentle adjustments</p>
        <h2>
          Follow the folds.
          <br />
          Let the cloth do the rest.
        </h2>
        <p>{carePrinciples.initialDressing}</p>
        <div className="three">
          <article>
            <span className="stepnum">01</span>
            <Image
              className="diagram"
              src="/curtain-care/step1.svg"
              alt="Illustrative dressing step 1"
              width={400}
              height={310}
              unoptimized
            />
            <h3>Notice the rhythm</h3>
            <p>
              With clean, dry hands, look at how the pleats and folds already
              fall. Use only the opening method demonstrated for your system.
            </p>
          </article>
          <article>
            <span className="stepnum">02</span>
            <Image
              className="diagram"
              src="/curtain-care/step2.svg"
              alt="Illustrative dressing step 2"
              width={400}
              height={310}
              unoptimized
            />
            <h3>Guide the reachable folds</h3>
            <p>{carePrinciples.dressing}</p>
          </article>
          <article>
            <span className="stepnum">03</span>
            <Image
              className="diagram"
              src="/curtain-care/step3.svg"
              alt="Illustrative dressing step 3"
              width={400}
              height={310}
              unoptimized
            />
            <h3>Step back and check</h3>
            <p>
              Allow each layer and hem to hang freely. A balanced result need
              not look pressed flat; stop if the cloth catches or resists.
            </p>
          </article>
        </div>
        <p className="small">
          Illustrative dressing guidance. No fixed settling time, binding method
          or permission to reach a high heading is implied.
        </p>
        <div className="notice">
          <strong>For tall, heavy or inaccessible curtains</strong>
          <p>
            Leave high headings, retained apex points and track components to
            the installation team. Do not climb, overreach, stand on furniture
            or remove heavy panels yourself.
          </p>
        </div>
        <div className="two">
          <figure>
            <Image
              className="diagram"
              src="/curtain-care/even.svg"
              alt="Illustration of even curtain folds"
              width={400}
              height={340}
              unoptimized
            />
            <figcaption>
              Balanced, flowing folds · illustrative arrangement.
            </figcaption>
          </figure>
          <figure>
            <Image
              className="diagram"
              src="/curtain-care/crossed.svg"
              alt="Illustration of crossed and bunched curtain folds"
              width={400}
              height={340}
              unoptimized
            />
            <figcaption>
              Twisted or crowded cloth · do not force it flat.
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="editorial">
        <div className="wrap split">
          <figure>
            <Image
              src="/projects/cambridge-apex-curtains-cambridge.jpeg"
              alt="Cambridge Apex curtain folds gathered into a matching tieback"
              width={900}
              height={1600}
              sizes="(max-width: 800px) 90vw, 45vw"
            />
            <figcaption>
              <Link href="/gallery/cambridge-apex-curtains-cambridge">
                Cambridge · Genuine Apex installation.
              </Link>
            </figcaption>
          </figure>
          <div>
            <p className="kicker">02 / Shape the open curtain</p>
            <h2>
              A tieback should
              <br />
              hold, not squeeze.
            </h2>
            <p>
              Gather reachable folds into the sweep demonstrated at
              installation. Use the agreed hook position and leave the cloth
              supported, without twisting or pulling it sideways.
            </p>
            <p>
              Release tiebacks before operating travelling panels. An apex
              curtain may have retained sections that stay in place.
            </p>
            <Image
              className="diagram"
              src="/curtain-care/tieback.svg"
              alt="Tieback cradles the folds at an agreed position without crushing the curtain"
              width={500}
              height={355}
              unoptimized
            />
            <p className="small" style={{ color: "#d2dcce" }}>
              Illustration only. Tieback position depends on the curtain and
              window.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section" id="heading">
        <p className="kicker">03 / Let the heading guide you</p>
        <h2>
          Different headings.
          <br />
          Different rhythms.
        </h2>
        <div className="heading-grid">
          {careHeadings.map(([title, text], index) => (
            <article key={title}>
              <Image
                className="diagram"
                src={`/curtain-care/heading-${index + 1}.svg`}
                alt={`${title} heading principle; illustration, not a sewing specification`}
                width={300}
                height={170}
                unoptimized
              />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="small">
          Heading principles are illustrative, not hook-setting or manufacturing
          instructions.
        </p>
      </section>
      <section className="wrap section">
        <div className="split">
          <div>
            <p className="kicker">04 / Layers and settling</p>
            <h2>
              Give each layer
              <br />
              room to fall.
            </h2>
            <p>
              Arrange the face curtain and voile separately. Check reachable
              edges are not caught together; operate each layer only as
              demonstrated.
            </p>
            <Image
              className="diagram"
              src="/curtain-care/layers.svg"
              alt="Illustrative independent curtain and voile layers"
              width={500}
              height={355}
              unoptimized
            />
          </div>
          <div>
            <h3>New creases are not a reason to add heat.</h3>
            <p>
              Packing and handling can leave creases. How a curtain settles
              depends on the weave, finish, weight, lining and interlining;
              there is no universal number of days.
            </p>
            <p>
              Steaming may be considered professionally only where the exact
              face fabric, lining, trims and construction permit it. Do not
              assume a cool setting or a hidden test makes every material safe.
            </p>
            <p>
              Contact Apex if creases persist, the lining pulls, the hem begins
              to catch, or the appearance changes unexpectedly. Do not add
              weights, bind the folds, move hooks or stretch the cloth.
            </p>
            <Link href="/curtain-linings">Understand your lining ↗</Link>
          </div>
        </div>
      </section>
      <section className="editorial" id="cleaning">
        <div className="wrap">
          <p className="kicker">05 / Care for the complete curtain</p>
          <h2>
            The face cloth is
            <br />
            only part of the story.
          </h2>
          <div className="three">
            <article>
              <h3>Everyday dust</h3>
              <p>{carePrinciples.dust}</p>
            </article>
            <article>
              <h3>A spill or mark</h3>
              <p>{carePrinciples.spills}</p>
            </article>
            <article>
              <h3>A deeper clean</h3>
              <p>{carePrinciples.cleaning}</p>
            </article>
          </div>
          <p>{carePrinciples.protection}</p>
        </div>
      </section>
      <section className="wrap section" id="fabric">
        <div className="split">
          <div>
            <p className="kicker">06 / Know your cloth</p>
            <h2>
              Care starts
              <br />
              with its character.
            </h2>
            <p>
              These are considerations, not replacement care labels. Your
              project instructions must identify the actual fabric and every
              sewn layer.
            </p>
            <figure>
              <Image
                className="swatch"
                src="/projects/portfolio/norwich-1.webp"
                alt="Close view of olive woven curtain folds at Norwich"
                width={2160}
                height={3840}
                sizes="(max-width: 800px) 90vw, 45vw"
              />
              <figcaption>
                <Link href="/gallery/norwich">
                  Norwich · Genuine installation detail.
                </Link>{" "}
                Fibre composition is not identified from the photograph.
              </figcaption>
            </figure>
          </div>
          <div>
            {careFabrics.map(([title, text]) => (
              <details key={title}>
                <summary>{title}</summary>
                <p>{text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section" id="operation">
        <p className="kicker">07 / Smooth, considered operation</p>
        <h2>
          Clear the path.
          <br />
          Use the controls shown.
        </h2>
        <div className="split">
          <div>
            <h3>Before you move the curtain</h3>
            <ul>
              <li>Release tiebacks from travelling panels.</li>
              <li>
                Check the visible route for caught cloth, furniture or objects.
              </li>
              <li>Keep hands and people clear of the moving curtain.</li>
              <li>
                Use the supplied control, baton or demonstrated hand operation.
              </li>
            </ul>
            <p>
              Touch-start and manual override depend on the installed motor and
              settings. Do not pull a motorised curtain to test whether these
              are enabled.
            </p>
          </div>
          <div className="white">
            <h3>If it does not move normally</h3>
            <p>
              Stop if movement is uneven, noisy or obstructed. From floor level,
              note what happened and whether the correct remote channel is
              selected. Keep the remote dry and protected from impact. Check its
              battery guidance for the exact model.
            </p>
            <p>
              Do not reset motor limits, change programming, open electrical
              equipment or spray the track. Contact Apex with the project
              reference and a short video taken from a safe position.
            </p>
            <TrackedLink
              href="/contact"
              eventName="consultation_cta_click"
              data-care-enquiry="true"
            >
              Ask about your curtain system ↗
            </TrackedLink>
          </div>
        </div>
        <p className="small">
          Forest maintenance is model-specific. Professional track servicing and
          safe access are assessed separately; no universal maintenance-free
          claim is made.
        </p>
      </section>
      <section className="wrap section" id="problems">
        <p className="kicker">08 / Notice a change?</p>
        <h2>
          A small observation.
          <br />A useful next step.
        </h2>
        <div className="two">
          <div className="problem">
            <span className="mark">01</span>
            <div>
              <strong>A fold looks uneven</strong>
              <p>
                Gently arrange reachable cloth without pulling seams. If it
                resists or returns to an unusual shape, ask Apex.
              </p>
            </div>
          </div>
          <div className="problem">
            <span className="mark">02</span>
            <div>
              <strong>The curtain catches</strong>
              <p>
                Stop operating it. Check only visible tiebacks and obstructions
                from a safe position; do not keep cycling the motor.
              </p>
            </div>
          </div>
          <div className="problem">
            <span className="mark">03</span>
            <div>
              <strong>A hem changes height</strong>
              <p>
                Note the change and any room-condition changes. Do not stretch,
                trim or rehook it yourself.
              </p>
            </div>
          </div>
          <div className="problem">
            <span className="mark">04</span>
            <div>
              <strong>A spill, mark or damp patch</strong>
              <p>
                Keep cleaning products and heat away until the actual care
                requirements are confirmed.
              </p>
            </div>
          </div>
          <div className="problem">
            <span className="mark">05</span>
            <div>
              <strong>A bracket moves or a panel drops</strong>
              <p>
                Stop use, keep people clear and contact Apex. Do not test it by
                pulling or attempt a high-level repair.
              </p>
            </div>
          </div>
          <div className="problem">
            <span className="mark">06</span>
            <div>
              <strong>The remote does not respond</strong>
              <p>
                Confirm the correct channel and exact-model battery
                instructions. Leave pairing, wiring and motor settings to
                professional advice.
              </p>
            </div>
          </div>
        </div>
        <div className="notice">
          <h3>Keep your curtain details together.</h3>
          <p>
            The care handbook includes space for your fabric and lining
            references, track and motor model, operating method and individual
            care instructions. Professional removal, cleaning coordination,
            rehanging and maintenance are subject to assessment.
          </p>
          <Link
            className="button"
            href={careDocument.path}
          >
            Download the care handbook ↗
          </Link>
        </div>
      </section>
      <section className="wrap section" id="further-guidance">
        <p className="kicker">Keep your care information together</p>
        <h2>
          Your curtain.
          <br />
          Its own instructions.
        </h2>
        <p>
          The handbook includes space for your actual
          materials, track model, operating method and confirmed care
          instructions. General guidance cannot replace those project details.
        </p>
        <p className="small">
          {careDocument.reference} · {careDocument.revision} · 28 November 2026
          · {careDocument.pages} A4 pages · PDF · {careDocument.status}
        </p>
        <div className="links">
          <a className="button" href={careDocument.path}>
            Download the care handbook
          </a>
          <Link href="/contact">Ask Apex about your curtains</Link>
        </div>
        <nav className="care-related" aria-label="Related curtain guidance">
          {careRelated.map(([href, title]) => (
            <Link href={href} key={href}>
              {title} ↗
            </Link>
          ))}
        </nav>
        <details className="care-sources">
          <summary>Manufacturer references and scope</summary>
          <p>
            Checked 28 November 2026. Always match the actual supplied product
            and installed model. These sources do not establish the fabric,
            lining or motor fitted to your project.
          </p>
          <ul>
            {careSources.map((source) => (
              <li key={source.id}>
                <a href={source.href}>{source.title}</a>
                <p className="small">
                  {source.revision} {source.scope}
                </p>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </main>
  );
}
