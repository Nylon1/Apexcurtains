import Image from "next/image";
import Link from "next/link";
import data from "@/lib/specifier-resources.json";
import { portfolio } from "@/lib/portfolio";
import { resourcesGuide } from "@/lib/guides/professional-resources";
import { SITE_URL } from "@/lib/seo-metadata";
import ProfessionalNavigation from "./ProfessionalNavigation";
import ResourceStagePicker from "./ResourceStagePicker";
import "@/components/guides/details-guides.css";
import "./technical-resources.css";

const drawings: Record<string, { title: string; description: string }> = {
  "height-drop": {
    title: "Window height ≠ curtain drop",
    description:
      "G records the glazed height. D records the finished curtain drop from its agreed top to its lower edge. Confirm the carrier, heading, floor datum and clearance before setting D.",
  },
  apex: {
    title: "The open view of a shaped curtain",
    description:
      "The shaded cloth is retained in this illustrative open arrangement. Confirm the route, tiebacks and visible glazing; the drawing does not imply motor travel along a slope.",
  },
  "stack-back": {
    title: "Stack-back and fold depth",
    description:
      "S is the open stack along the track. F is the fold projection into the room. Both depend on the actual cloth, lining, heading and fullness.",
  },
  "single-double": {
    title: "One track or two independent layers",
    description:
      "A plan study with glazing above and room below. C is the track centre spacing to be agreed from both cloth envelopes. Independent layers require separate operating lines.",
  },
  "mounting-recess": {
    title: "Ceiling, wall and pocket interfaces",
    description:
      "Three schematic sections, without product-specific fixings. P is clear pocket width; coordinate depth, cloth movement, drive ends and access separately.",
  },
  support: {
    title: "A continuous load path",
    description:
      "The track, bracket, backing and building structure form distinct interfaces. The shown fixing lines are schematic and do not specify anchors, centres or structural capacity.",
  },
  "motor-clearance": {
    title: "Room to fit, connect and remove",
    description:
      "The dashed envelope represents access to be assessed for the selected assembly. It is deliberately larger than the motor body and has no assumed universal dimension.",
  },
  access: {
    title: "Access through the life of the room",
    description:
      "An access tower is shown only to identify the working zone. The installer must select and assess the equipment, working method, route, floor loading and protection.",
  },
};

function Drawing({ slug }: { slug: string }) {
  const drawing = drawings[slug];
  return (
    <figure className="resource-drawing">
      <Image
        src={`/guides/specifier/${slug}.svg`}
        width={600}
        height={400}
        alt={drawing.title}
      />
      <figcaption>
        <strong>{drawing.title}</strong>
        <p>{drawing.description}</p>
        <a href={`/guides/specifier/${slug}.svg`}>
          Open full-size drawing <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}

export default function TechnicalResourceLibrary() {
  const hero = portfolio.archive["pinch-pleat-curtains-oxford-oxford"].media[0];
  const url = `${SITE_URL}/professionals/specifier-resources`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: resourcesGuide.title,
        description: resourcesGuide.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Professionals",
            item: `${SITE_URL}/professionals`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Specifier resources",
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#questions`,
        mainEntity: resourcesGuide.questions.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
  return (
    <main className="technical-library">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="resource-hero">
        <div className="resource-hero-copy">
          <nav className="resource-breadcrumb" aria-label="Breadcrumb">
            <Link href="/professionals">Professionals</Link>
            <span>/</span>
            <span>Technical resources</span>
          </nav>
          <p className="resource-kicker">
            Architecture / Interiors / Specification
          </p>
          <h1>
            Plan the curtain
            <br />
            into the building.
          </h1>
          <p className="resource-intro">
            Resolve the space, support and operation while the architecture is
            still taking shape.
          </p>
          <p>
            Technical guidance for complex glazing, tall curtains and layered
            interiors. Bring Apex into the discussion before ceiling pockets,
            electrical supplies and finishes are fixed.
          </p>
          <div className="resource-actions">
            <Link
              href="/professionals/project-review"
              className="resource-button"
            >
              Discuss a project <span aria-hidden="true">↗</span>
            </Link>
            <a href="#resource-register">Explore the documents ↓</a>
          </div>
          <p className="resource-draft">
            Review edition D01 · 27 November 2026
            <br />
            Preliminary coordination. Not for construction.
          </p>
        </div>
        <figure className="resource-hero-image">
          <Image
            src={hero.src}
            alt={hero.alt}
            width={hero.width}
            height={hero.height}
            sizes="(max-width: 800px) 100vw, 50vw"
            preload
          />
          <figcaption>
            <Link href="/gallery/pinch-pleat-curtains-oxford-oxford">
              Oxford / View the project ↗
            </Link>
            <span>Geometry considered with the interior.</span>
          </figcaption>
        </figure>
      </header>
      <div className="resource-shell">
        <section className="resource-section" aria-labelledby="stage-heading">
          <div className="resource-section-heading">
            <p className="resource-kicker">01 / Find the next decision</p>
            <h2 id="stage-heading">Start with your project stage.</h2>
            <p>
              Choose the stage you are working on. These are coordination
              stages, not a contractual definition of design responsibility.
            </p>
          </div>
          <ResourceStagePicker
            stages={data.stages}
            resources={data.resources.map(({ id, title, anchor, stages }) => ({
              id,
              title,
              anchor,
              stages,
            }))}
          />
        </section>
        <section
          id="resource-register"
          className="resource-section"
          aria-labelledby="register-heading"
        >
          <div className="resource-section-heading">
            <p className="resource-kicker">02 / Document register</p>
            <h2 id="register-heading">
              Five documents.
              <br />
              One coordinated brief.
            </h2>
            <p>
              Short, illustrated documents to share with the design and delivery
              team. Read the same guidance here or download the print edition.
            </p>
          </div>
          <div className="resource-register-note">
            <span>APX TECHNICAL SERIES</span>
            <span>Revision D01 / Draft for technical review</span>
            <span>13 pages across 5 documents</span>
          </div>
          {data.resources.map((resource) => (
            <article
              key={resource.id}
              id={resource.anchor}
              className="resource-document"
            >
              <div className="resource-doc-ref">
                {resource.id}
                <span>
                  {String(resource.pages.length).padStart(2, "0")} pages / PDF
                </span>
              </div>
              <div className="resource-doc-title">
                <h3>{resource.title}</h3>
                <p>{resource.subtitle}</p>
                <div className="resource-stage-labels">
                  {resource.stages
                    .map(
                      (id) =>
                        data.stages.find((stage) => stage.id === id)!.label,
                    )
                    .join(" · ")}
                </div>
              </div>
              <div className="resource-doc-summary">
                <p>{resource.summary}</p>
                <a
                  className="resource-download"
                  href={`/downloads/specifier/${resource.id}-${resource.slug}-D01.pdf`}
                >
                  Download {resource.id} <span>PDF ↓</span>
                </a>
                {resource.id === "APX-T05" && (
                  <a
                    className="resource-text-download"
                    href="/downloads/specifier/APX-T05-preliminary-specification-D01.txt"
                    download
                  >
                    Editable plain-text template ↓
                  </a>
                )}
              </div>
              <details className="resource-document-content">
                <summary>
                  Read {resource.id} online <span aria-hidden="true">+</span>
                </summary>
                <div className="resource-reader">
                  <p className="resource-draft">
                    {data.status}. All diagrams are illustrative, not to scale
                    and not manufacturer-approved construction drawings.
                  </p>
                  {resource.pages.map((page, index) => (
                    <section key={page.title} className="resource-reader-page">
                      <p className="resource-kicker">
                        {resource.id} / {String(index + 1).padStart(2, "0")}
                      </p>
                      <h4>{page.title}</h4>
                      {page.diagram && <Drawing slug={page.diagram} />}
                      {page.sections.map((section) => (
                        <div key={section.title}>
                          <h5>{section.title}</h5>
                          {section.items.map((item) => (
                            <p key={item}>{item}</p>
                          ))}
                        </div>
                      ))}
                      <p className="resource-source-line">
                        Manufacturer references:{" "}
                        {page.sources.map((id, index) => {
                          const source = data.sources.find((s) => s.id === id)!;
                          return (
                            <span key={id}>
                              {index > 0 && " · "}
                              <a href={source.url}>
                                {source.title}, pp. {source.referencePages}
                              </a>
                            </span>
                          );
                        })}
                      </p>
                    </section>
                  ))}
                </div>
              </details>
            </article>
          ))}
        </section>
        <section className="resource-section" aria-labelledby="drawing-heading">
          <div className="resource-section-heading">
            <p className="resource-kicker">03 / Coordination drawings</p>
            <h2 id="drawing-heading">Make the interfaces visible.</h2>
            <p>
              Original Apex studies for early discussion. Lettered dimensions
              are decisions to resolve, not construction allowances. The full
              set of eight drawings appears in the documents above.
            </p>
          </div>
          <div className="resource-drawing-grid">
            {["height-drop", "mounting-recess", "motor-clearance", "apex"].map(
              (slug) => (
                <Drawing key={slug} slug={slug} />
              ),
            )}
          </div>
        </section>
        <section
          className="resource-section resource-evidence"
          aria-labelledby="evidence-heading"
        >
          <div className="resource-section-heading">
            <p className="resource-kicker">04 / From the existing portfolio</p>
            <h2 id="evidence-heading">
              Real rooms.
              <br />
              Specific decisions.
            </h2>
            <p>
              Photographs establish the visible arrangement and installation
              context. They do not establish concealed fixings, motor models or
              tested performance.
            </p>
            <Link href="/gallery">Explore the full project portfolio ↗</Link>
          </div>
          <div className="resource-projects">
            {[
              {
                slug: "jesmond",
                index: 0,
                note: "Separate curtain lines: a shaped outer treatment and a horizontal sheer layer.",
              },
              {
                slug: "norwich",
                index: 1,
                note: "The full gable at installation stage: access needs space within the room.",
              },
            ].map(({ slug, index, note }) => {
              const project = portfolio.projects[slug];
              const photo = project.media[index];
              return (
                <figure key={slug}>
                  <Link href={`/gallery/${slug}`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 800px) 100vw, 30vw"
                    />
                  </Link>
                  <figcaption>
                    <Link href={`/gallery/${slug}`}>
                      {project.label} <span aria-hidden="true">↗</span>
                    </Link>
                    <p>{note}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
        <section
          className="resource-section resource-references"
          aria-labelledby="reference-heading"
        >
          <div className="resource-section-heading">
            <p className="resource-kicker">05 / Manufacturer evidence</p>
            <h2 id="reference-heading">Trace the technical detail.</h2>
            <p>
              Official Forest documentation reviewed on 27 November 2026. Check
              the current revision and the exact supplied variant when
              specifying. Inclusion here does not confirm Apex supply or project
              suitability.
            </p>
          </div>
          <div className="resource-reference-list">
            {data.sources
              .filter((s) => s.id !== "overview")
              .map((source) => (
                <a href={source.url} key={source.id}>
                  <span>{source.title}</span>
                  <span>pp. {source.referencePages} / PDF ↗</span>
                </a>
              ))}
          </div>
          <div className="resource-cad">
            <h3>CAD, BIM and the final construction detail</h3>
            <p>
              Forest advertises CAD files by request and an interactive 3D
              Trackviewer with requested access. We have not verified an openly
              downloadable, current BIM family for each system. Request the
              exact supplier files and revision before adding a product model to
              the project.
            </p>
            <p>
              The Apex studies above are coordination illustrations. They do not
              replace supplier CAD, a coordinated construction drawing or a
              project-specific fixing assessment.
            </p>
            <a href="https://www.forestgroup.com/en/downloads/forest-3d-trackviewer-app">
              Forest 3D Trackviewer and access information ↗
            </a>
            <a href={data.sources.find((s) => s.id === "overview")!.url}>
              Forest CAD request reference / overview p. 8 ↗
            </a>
          </div>
          <details className="resource-confirmations">
            <summary>
              Technical matters still requiring confirmation{" "}
              <span aria-hidden="true">+</span>
            </summary>
            <ul>
              <li>
                Apex’s current FMS, FMS Plus and Shuttle supply, installation
                and support scope.
              </li>
              <li>
                The exact motor product code and assembly: November 2026
                brochure body sizes differ from the October 2025 manual’s
                dimensioned assemblies.
              </li>
              <li>
                Current recess generation, drive-end openings, motor orientation
                and the complete assembly/removal envelope.
              </li>
              <li>
                Actual curtain weight, curves, length, duty, bracket selection,
                fixings and structural capacity.
              </li>
              <li>
                Control variant, electrical interface and any required
                third-party equipment, with the project’s electrical contractor
                and integrator.
              </li>
              <li>
                Project-specific fabric performance evidence, access strategy
                and maintenance instructions.
              </li>
            </ul>
          </details>
        </section>
        <section
          className="resource-section resource-existing"
          aria-labelledby="existing-heading"
        >
          <div className="resource-section-heading">
            <p className="resource-kicker">06 / Keep the project connected</p>
            <h2 id="existing-heading">Use the tools already in place.</h2>
          </div>
          <div className="resource-existing-links">
            <Link href="/professionals/specifier-resources/project-information-checklist">
              <span>01</span>
              <div>
                <h3>Project information checklist</h3>
                <p>
                  Gather the drawings, geometry, textile and site information.
                  Checkboxes are an on-page aid, not a saved project submission.
                </p>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/professionals/workspace/login">
              <span>02</span>
              <div>
                <h3>Professional workspace</h3>
                <p>
                  Continue an existing project. Keep evidence, revisions,
                  decisions and controlled exports in its established record.
                </p>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
            <a href="/downloads/Apex-Curtains-Commercial-Project-Profile.pdf">
              <span>03</span>
              <div>
                <h3>Commercial project profile</h3>
                <p>
                  The existing capability and project evidence PDF. Read
                  alongside the technical documents, rather than as a
                  construction specification.
                </p>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div id="textile-specification" className="resource-further">
            <h3>Further guidance by decision</h3>
            {resourcesGuide.sections.map((section) => (
              <details key={section.id}>
                <summary>{section.title}</summary>
                <div>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <ul>
                    {section.links?.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label} ↗</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section id="questions" className="resource-section resource-faq">
          <h2>Before you specify.</h2>
          {resourcesGuide.questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
        <section className="resource-consultation">
          <p className="resource-kicker">
            Early involvement / Better coordination
          </p>
          <h2>
            Bring the drawing.
            <br />
            Let’s resolve the curtain.
          </h2>
          <p>
            Share the latest plan, elevation and section, your design priorities
            and the decisions still open. We can establish the information
            needed for the next review.
          </p>
          <div className="resource-actions">
            <Link
              className="resource-button"
              href="/professionals/project-review"
            >
              Request a project discussion ↗
            </Link>
            <a href="tel:08007720367">0800 772 0367</a>
          </div>
          <a href="mailto:hello@apexcurtains.com">hello@apexcurtains.com</a>
        </section>
        <ProfessionalNavigation path="/professionals/specifier-resources" />
      </div>
    </main>
  );
}
