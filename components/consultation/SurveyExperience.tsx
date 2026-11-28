import Image from "next/image";
import Link from "next/link";
import { consultationPhotos as photos } from "./photos";
import DetailExplorer from "@/components/guides/DetailExplorer";
import { surveyGuide } from "@/lib/guides/survey";
import { specialistGuideSchema } from "@/lib/specialist-guide-schema";
import {
  SurveyTechnicalSections,
  SurveyQuestions,
} from "./SurveyTechnicalSections";
import "./consultation.css";

export default function SurveyExperience() {
  return (
    <main className="consultation-experience">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            specialistGuideSchema(
              {
                ...surveyGuide,
                image: {
                  src: photos.peterborough.src,
                  alt: photos.peterborough.alt,
                  caption: photos.peterborough.caption,
                },
              },
              { href: "/services", label: "Services" },
            ),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <header className="hero survey-hero">
        <div className="hero-copy">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services">Services</Link>{" "}
            / Survey &amp; consultation
          </nav>
          <p className="eyebrow">Complimentary home consultation</p>
          <h1>
            Your room.
            <br />
            Your choices.
            <br />
            <em>A clear plan.</em>
          </h1>
          <p className="intro">
            Start with a guide price. Then explore measurements and fabric
            selection at a complimentary home consultation.
          </p>
          <div className="actions">
            <a className="button" href="#your-room">
              Prepare for your consultation ↓
            </a>
            <a className="text-link" href="#home-consultation">
              What happens during the visit?
            </a>
          </div>
          <p className="small">
            A guide price is a starting point. Final details depend on the
            survey and agreed specification.
          </p>
        </div>
        <figure className="hero-photo">
          <Image
            src={photos.peterborough.src}
            alt={photos.peterborough.alt}
            width={photos.peterborough.width}
            height={photos.peterborough.height}
            sizes="(max-width: 800px) 89vw, 48vw"
            preload
          />
          <figcaption>
            Peterborough · Completed Apex installation.{" "}
            <Link
              className=""
              href="/gallery/peterborough-bedroom-blackout-curtains-peterborough"
            >
              Explore this room ↗
            </Link>
          </figcaption>
        </figure>
      </header>
      <nav className="jump" aria-label="Survey guide sections">
        <a href="#your-room">Before your visit</a>
        <a href="#home-consultation">During the consultation</a>
        <a href="#technical">Why specialist surveying matters</a>
        <a href="#after-the-survey">What happens next</a>
      </nav>
      <section className="wrap section prepare" id="your-room">
        <div>
          <p className="eyebrow">Before your visit</p>
          <h2>
            A little preparation.
            <br />A more useful
            <br />
            conversation.
          </h2>
          <p>
            Take a whole-window photograph from floor level, then show the
            surrounding wall, ceiling and floor. Share approximate dimensions
            only where you can obtain them safely.
          </p>
          <p>
            <strong>You do not need to climb or reach a high window.</strong>{" "}
            Tell Apex what you cannot measure. Leave high-level measurement and
            access arrangements to the specialist discussion.
          </p>
          <p>
            Have any available drawings and notes on planned flooring or
            building work to hand. Think about privacy, daylight and the view
            you want to keep.
          </p>
          <p className="small">
            This checklist is optional. It does not submit an enquiry, book a
            visit or certify that a site is safe.
          </p>
        </div>
        <div>
          <DetailExplorer kind="survey-checklist" />
          <Link className="text-link" href="/start-designing">
            Ready to begin? Start an enquiry ↗
          </Link>
        </div>
      </section>
      <section className="stone" id="home-consultation">
        <div className="wrap section">
          <p className="eyebrow">During the home consultation</p>
          <h2>
            The room. The measurements.
            <br />
            The choices that connect them.
          </h2>
          <div className="visit-grid">
            <article>
              <span className="number">01</span>
              <h3>Talk through the room</h3>
              <p>
                Discuss how you use the space, privacy and light, and the view
                you want to keep. Review fabric and colour preferences alongside
                the room’s finishes.
              </p>
            </article>
            <article>
              <span className="number">02</span>
              <h3>Establish the curtain route</h3>
              <p>
                Consider individual slopes and drops, track positions, finished
                floor levels, obstructions, support information and safe
                installation access.
              </p>
            </article>
            <article>
              <span className="number">03</span>
              <h3>Connect design and operation</h3>
              <p>
                Discuss fabric, lining, heading and track together, including
                where the cloth gathers and how the curtains will open. Record
                what still needs confirmation.
              </p>
            </article>
          </div>
          <p className="small narrow">
            A visual survey cannot verify every concealed structural detail.
            Drawings, builder information or further investigation may be
            required.
          </p>
        </div>
      </section>
      <section className="wrap section evidence-pair" id="technical">
        <div>
          <figure className="survey-evidence">
            <Image
              src={photos.norwichInstallation.src}
              alt={photos.norwichInstallation.alt}
              width={photos.norwichInstallation.width}
              height={photos.norwichInstallation.height}
              sizes="(max-width: 800px) 89vw, 48vw"
            />
            <figcaption>
              Norwich · Genuine installation-stage image.{" "}
              <Link className="" href="/gallery/norwich">
                See the project ↗
              </Link>
            </figcaption>
          </figure>
        </div>
        <div>
          <p className="eyebrow">Why specialist surveying matters</p>
          <h2>
            The glass is only
            <br />
            part of the picture.
          </h2>
          <p>
            A maximum height and width do not describe a shaped curtain. The
            track route, separate slopes, finished floor, fabric stack and
            support all affect what can be made and how it will work.
          </p>
          <p>
            For very tall and oversized windows, access is part of the design
            conversation. Carrying routes, available floor space and the working
            area need consideration as well as the window itself.
          </p>
          <p>
            For a new build or renovation, involve Apex before boarding,
            decoration and electrical positions are finalised.
          </p>
          <a className="text-link" href="#geometry">
            Explore the measurement detail ↓
          </a>
        </div>
      </section>
      <div className="wrap technical-layout">
        <aside>
          <p className="eyebrow">The survey detail</p>
          <nav aria-label="Technical contents">
            {surveyGuide.sections.slice(1).map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          <details className="room-notes">
            <summary>Further guidance on your room priorities</summary>
            {surveyGuide.sections[0].paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </details>
          <SurveyTechnicalSections />
        </div>
      </div>
      <SurveyQuestions />
      <nav
        className="wrap technical-links"
        aria-label="Related survey guidance"
      >
        {surveyGuide.related.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label} ↗
          </Link>
        ))}
      </nav>
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
