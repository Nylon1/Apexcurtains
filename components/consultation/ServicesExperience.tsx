import Image from "next/image";
import Link from "next/link";
import { consultationPhotos as photos } from "./photos";
import DetailsNavigation from "@/components/guides/DetailsNavigation";
import type { ReactNode } from "react";
import "@/components/guides/details-guides.css";
import "./consultation.css";

export default function ServicesExperience({
  structuredData,
}: {
  structuredData: ReactNode;
}) {
  return (
    <main className="consultation-experience">
      {structuredData}
      <header className="hero services-hero">
        <div className="hero-copy">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Services
          </nav>
          <p className="eyebrow">The complete curtain journey</p>
          <h1>
            From your first idea
            <br />
            to the <em>finished room.</em>
          </h1>
          <p className="intro">
            From an initial guide price to a complimentary home consultation,
            bespoke making and specialist installation. See how the decisions
            fit together.
          </p>
          <div className="actions">
            <a className="button" href="#service-stages">
              See the seven stages ↓
            </a>
            <Link className="text-link" href="/start-designing">
              Start an enquiry ↗
            </Link>
          </div>
        </div>
        <figure className="hero-photo">
          <Image
            src={photos.oxford.src}
            alt={photos.oxford.alt}
            width={photos.oxford.width}
            height={photos.oxford.height}
            sizes="(max-width: 800px) 89vw, 48vw"
            preload
          />
          <figcaption>Oxford · A completed Apex installation.</figcaption>
        </figure>
      </header>
      <DetailsNavigation path="/services" />
      <section className="wrap section compact" id="service-stages">
        <p className="eyebrow">01—07 / How your project takes shape</p>
        <h2>Know what comes next.</h2>
        <p className="intro narrow">
          Begin with what you know. The survey and material choices then give
          the project the detail needed for manufacture and fitting.
        </p>
        <p className="small narrow">
          The route is discussed for your individual project. Appointment
          arrangements and programme are agreed with Apex.
        </p>
      </section>
      <section
        className="wrap journey-block"
        aria-label="From enquiry to survey"
      >
        <div className="journey-aside">
          <p className="eyebrow">Understand the room</p>
          <h2>
            A photograph starts
            <br />
            the conversation.
            <br />A survey adds
            <br />
            the detail.
          </h2>
          <p>
            Approximate measurements help describe scale. They are not final
            dimensions for making.
          </p>
          <figure className="process-photo">
            <Image
              src={photos.norwichInstallation.src}
              alt={photos.norwichInstallation.alt}
              width={photos.norwichInstallation.width}
              height={photos.norwichInstallation.height}
              sizes="(max-width: 800px) 89vw, 48vw"
            />
            <figcaption>
              Norwich · Installation-stage photograph, not a survey visit.{" "}
              <Link className="" href="/gallery/norwich">
                View the project ↗
              </Link>
            </figcaption>
          </figure>
        </div>
        <ol className="steps" start={1}>
          <li>
            <span className="number" aria-hidden="true">
              01
            </span>
            <div>
              <h3>Initial enquiry</h3>
              <p className="lead">Show us the window and the room.</p>
              <p>
                Photographs and approximate dimensions help start the
                conversation. Include the whole window, the surrounding wall and
                the floor; explain what you would like the curtains to do.
              </p>
              <Link className="text-link" href="/start-designing">
                Start your enquiry ↗
              </Link>
            </div>
          </li>
          <li>
            <span className="number" aria-hidden="true">
              02
            </span>
            <div>
              <h3>Initial guide price</h3>
              <p className="lead">Understand the proposed direction.</p>
              <p>
                Apex can give a guide price from the initial project
                information, before arranging a complimentary home consultation.
                The final quotation depends on the confirmed measurements,
                materials and project requirements.
              </p>
              <Link
                className="text-link"
                href="/services/measure-consultation#after-the-survey"
              >
                What still needs confirming ↗
              </Link>
            </div>
          </li>
          <li>
            <span className="number" aria-hidden="true">
              03
            </span>
            <div>
              <h3>Complimentary home consultation &amp; survey</h3>
              <p className="lead">
                Measurements and fabric selection, in your home.
              </p>
              <p>
                Bring your room priorities into the conversation alongside the
                curtain route, shaped measurements, fixing surfaces and
                installation access. Discuss fabric choices in the context of
                the room.
              </p>
              <details>
                <summary>Practical detail at this stage</summary>
                <p className="service-lead">
                  Understand the room before the curtain is specified.
                </p>
                <p>
                  Geometry, individual drops, fixing surfaces, opening space and
                  access all inform the recommendation. Discuss light control
                  and the view you want to keep alongside fabric and colour.
                </p>
                <p>
                  Bring photographs of the whole window and its surroundings,
                  approximate dimensions and any available building drawings.
                  Tell us about flooring or decoration still planned. Early
                  information helps; final making dimensions and concealed
                  support still need confirmation.
                </p>
              </details>
              <Link className="text-link" href="/services/measure-consultation">
                What happens at the consultation ↗
              </Link>
            </div>
          </li>
        </ol>
      </section>
      <section className="stone">
        <div className="wrap journey-block">
          <div className="journey-aside">
            <p className="eyebrow">Translate the decisions into cloth</p>
            <h2>
              Colour, construction
              <br />
              and movement.
            </h2>
            <figure className="material-photo">
              <Image
                src={photos.norwichDetail.src}
                alt={photos.norwichDetail.alt}
                width={photos.norwichDetail.width}
                height={photos.norwichDetail.height}
                sizes="(max-width: 800px) 89vw, 48vw"
              />
              <figcaption>Norwich · Fabric and heading detail.</figcaption>
            </figure>
            <p>
              Physical fabric and lining samples help you consider colour and
              texture in the room.
            </p>
          </div>
          <ol className="steps" start={4}>
            <li>
              <span className="number" aria-hidden="true">
                04
              </span>
              <div>
                <h3>Fabric, lining, heading &amp; track</h3>
                <p className="lead">Consider the choices together.</p>
                <p>
                  Review physical materials, the character of the folds, light
                  control and how the curtains will open. These choices affect
                  one another, especially with long drops and shaped windows.
                </p>
                <Link className="text-link" href="/curtain-fabrics">
                  Explore the fabric guidance ↗
                </Link>
              </div>
            </li>
            <li>
              <span className="number" aria-hidden="true">
                05
              </span>
              <div>
                <h3>Final specification &amp; order confirmation</h3>
                <p className="lead">Resolve the details before making.</p>
                <p>
                  Confirm the agreed curtain arrangement, materials, dimensions
                  and scope. Identify any building work or technical decisions
                  still outstanding before manufacture.
                </p>
                <Link
                  className="text-link"
                  href="/services/design-make-curtains"
                >
                  How the specification informs making ↗
                </Link>
              </div>
            </li>
            <li>
              <span className="number" aria-hidden="true">
                06
              </span>
              <div>
                <h3>Bespoke manufacturing</h3>
                <p className="lead">Make for the measured arrangement.</p>
                <p>
                  Specialist curtain manufacturing brings together the chosen
                  fabric, lining, heading and finished shape. Long drops and
                  wide panels require particular attention to joins, weight and
                  construction.
                </p>
                <details>
                  <summary>Practical detail at this stage</summary>
                  <p className="service-lead">
                    Give colour and construction the same attention.
                  </p>
                  <p>
                    Fabric, lining, heading, fullness, joins and shaped drops
                    form a connected specification. Your curtains are made
                    around the measured arrangement and the intended track and
                    movement.
                  </p>
                  <p>
                    Agree the actual fabric and lining, heading, finished shape
                    and drop, opening arrangement and finishing details before
                    cutting. A visualiser helps with inspiration; physical
                    samples and the confirmed specification guide the made
                    curtain.
                  </p>
                </details>
                <Link
                  className="text-link"
                  href="/oversized-curtain-manufacturing"
                >
                  Specialist manufacturing ↗
                </Link>
              </div>
            </li>
            <li>
              <span className="number" aria-hidden="true">
                07
              </span>
              <div>
                <h3>Professional installation &amp; handover</h3>
                <p className="lead">Fit, test and explain everyday use.</p>
                <p>
                  Apex installs manual and motorised tracks and undertakes motor
                  setup, programming, operational testing, commissioning and
                  customer handover within the agreed project scope.
                </p>
                <details>
                  <summary>Practical detail at this stage</summary>
                  <p className="service-lead">
                    Bring the specification into the room.
                  </p>
                  <p>
                    Fit and check the support, hang the panels, dress the folds
                    and demonstrate everyday use. High windows need a planned
                    access method, followed by care guidance for the finished
                    curtains.
                  </p>
                  <p>
                    Agree access and furniture arrangements in advance. At
                    handover, review the intended movement, retained sections,
                    overlap, floor clearance and tieback use. Keep the supplied
                    fabric and lining care details with your project
                    information.
                  </p>
                </details>
                <Link
                  className="text-link"
                  href="/services/premium-installation"
                >
                  Explore installation guidance ↗
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="wrap section reassurance">
        <p className="eyebrow">A useful place to begin</p>
        <h2>Prepare for your consultation.</h2>
        <p>
          Use the existing six-point checklist to gather room photographs,
          building information and your priorities. You do not need every item
          to begin an enquiry.
        </p>
        <Link
          className="button"
          href="/services/measure-consultation#your-room"
        >
          Open the preparation checklist ↗
        </Link>
      </section>
      <section className="service-decisions">
        <p className="editorial-eyebrow">Understand the details</p>
        <h2>Specifying your curtains</h2>
        <div>
          <Link href="/curtain-tracks">
            <h3>Tracks &amp; structure ↗</h3>
            <p>
              Forest KS and CS, white or black, fixing surfaces and the planned
              curtain route.
            </p>
          </Link>
          <Link href="/curtain-linings">
            <h3>Linings &amp; light ↗</h3>
            <p>
              Standard, blackout, thermal blackout and coloured lining; how
              coverage affects the result.
            </p>
          </Link>
          <Link href="/curtain-headings">
            <h3>Headings &amp; folds ↗</h3>
            <p>
              Pencil, double pinch and wave, explained through real projects and
              original diagrams.
            </p>
          </Link>
          <Link href="/curtain-accessories">
            <h3>Finishing details ↗</h3>
            <p>
              Tiebacks, hooks and supporting hardware, proportioned to the
              curtain and the room.
            </p>
          </Link>
          <Link href="/oversized-curtain-manufacturing">
            <h3>Long drops &amp; wide panels ↗</h3>
            <p>
              See how fabric widths, joins and lining affect the finished weight
              and the space curtains occupy when open.
            </p>
          </Link>
          <Link href="/high-level-curtain-installation">
            <h3>Surveying high windows ↗</h3>
            <p>
              Find out what to share about stairs, floors and fixing positions
              so access can be assessed for your project.
            </p>
          </Link>
        </div>
      </section>
      <section className="closing">
        <div className="wrap">
          <p className="eyebrow">Your first conversation</p>
          <h2>
            Start with the room
            <br />
            you have in mind.
          </h2>
          <p>
            Share photographs and any approximate dimensions you already have.
            If something is unknown, tell us — the first enquiry is a starting
            point.
          </p>
          <div className="actions">
            <Link className="button light" href="/start-designing">
              Start your curtain enquiry ↗
            </Link>
            <Link
              className="text-link"
              href="/architectural-curtain-project-planner"
            >
              Planning a complex project? ↗
            </Link>
          </div>
          <p className="small">
            Prefer to talk? <a href="tel:08007720367">0800 772 0367</a> ·{" "}
            <Link className="" href="/contact">
              Contact Apex
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
