import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { SpecialistGuide } from "@/lib/specialist-guide-types";
import { SITE_URL } from "@/lib/seo-metadata";
import GuideInteraction from "./GuideInteraction";
import DetailExplorer from "./DetailExplorer";
import DetailsNavigation from "./DetailsNavigation";
import ProfessionalNavigation from "@/components/professionals/ProfessionalNavigation";
import "./details-guides.css";

export function guideMetadata(guide: SpecialistGuide): Metadata {
  const url = `${SITE_URL}${guide.path}`;
  return {
    title: { absolute: `${guide.metaTitle} | Apex Curtains` },
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.metaTitle,
      description: guide.description,
      url,
      type: "article",
      images: [{ url: guide.image.src, alt: guide.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle,
      description: guide.description,
      images: [guide.image.src],
    },
  };
}

export default function SpecialistGuidePage({
  guide,
  feature,
}: {
  guide: SpecialistGuide;
  feature?: ReactNode;
}) {
  const url = `${SITE_URL}${guide.path}`;
  const parent = guide.professional
    ? { href: "/professionals", label: "Professionals" }
    : { href: "/curtain-design-guide", label: "Curtain design guide" };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: guide.title,
        description: guide.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          contentUrl: `${SITE_URL}${guide.image.src}`,
          caption: guide.image.caption,
        },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          ...(guide.path === parent.href
            ? []
            : [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: parent.label,
                  item: `${SITE_URL}${parent.href}`,
                },
              ]),
          {
            "@type": "ListItem",
            position: guide.path === parent.href ? 2 : 3,
            name: guide.title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#questions`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: guide.questions.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
  return (
    <main
      className={`specialist-guide${guide.enhanced ? " details-guide" : ""}${guide.professional ? " professional-guide" : ""}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="guide-hero">
        <div className="guide-hero-copy">
          <nav aria-label="Breadcrumb" className="guide-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={parent.href}>{guide.professional ? parent.label : "Design guide"}</Link>
          </nav>
          <p className="editorial-eyebrow">{guide.eyebrow}</p>
          <h1>{guide.title}</h1>
          <p className="guide-intro">{guide.intro}</p>
          <a
            href={feature ? "#colour-explorer" : `#${guide.sections[0].id}`}
            className="editorial-button"
          >
            Explore the details <span aria-hidden="true">↓</span>
          </a>
          <p className="guide-byline">
            {guide.professional
              ? "Apex Curtains · Professional specification guidance"
              : "Guidance from Apex Curtains · For architectural windows and considered interiors"}
          </p>
        </div>
        <figure className="guide-hero-image">
          <Image
            src={guide.image.src}
            alt={guide.image.alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
          />
          <figcaption>{guide.image.caption}</figcaption>
        </figure>
      </header>
      {feature}
      {guide.professional ? (
        <ProfessionalNavigation path={guide.path} />
      ) : (
        guide.enhanced && <DetailsNavigation path={guide.path} />
      )}
      {guide.enhanced && (
        <details className="details-mobile-index">
          <summary>Explore this guide</summary>
          <nav aria-label="Mobile guide contents">
            {guide.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
            <a href="#questions">Your questions</a>
          </nav>
        </details>
      )}
      <div className="guide-layout">
        <aside className="guide-index">
          <nav aria-label="On this page">
            <p className="editorial-eyebrow">In this guide</p>
            {guide.sections.map((s, i) => (
              <a key={s.id} href={`#${s.id}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            ))}
            <a href="#questions">Your questions</a>
          </nav>
        </aside>
        <div className="guide-body">
          {guide.sections.map((section, i) => (
            <section id={section.id} key={section.id} className="guide-section">
              <p className="editorial-eyebrow">
                {String(i + 1).padStart(2, "0")} / The details
              </p>
              <h2>{section.title}</h2>
              {section.paragraphs
                .slice(0, guide.enhanced ? 1 : undefined)
                .map((p) => (
                  <p key={p}>{p}</p>
                ))}
              {section.points && (
                <ul>
                  {section.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              {section.checklist && (
                <fieldset className="professional-checklist">
                  <legend>Information to gather</legend>
                  {section.checklist.map((item) => (
                    <label key={item}>
                      <input type="checkbox" />
                      <span>{item}</span>
                    </label>
                  ))}
                </fieldset>
              )}
              {section.table && (
                <div
                  className="guide-table-scroll"
                  role="region"
                  aria-label={section.table.caption}
                  tabIndex={0}
                >
                  <table>
                    <caption>{section.table.caption}</caption>
                    <thead>
                      <tr>
                        {section.table.headings.map((h) => (
                          <th scope="col" key={h}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, index) =>
                            index === 0 ? (
                              <th scope="row" key={index}>
                                {cell}
                              </th>
                            ) : (
                              <td key={index}>{cell}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.diagram && (
                <figure className="guide-diagram">
                  <div className="guide-diagram-stage">
                    <Image
                      src={section.diagram.src}
                      alt={section.diagram.alt}
                      width={960}
                      height={540}
                      sizes="(max-width: 900px) 100vw, 750px"
                    />
                  </div>
                  <figcaption>
                    {section.diagram.caption}
                    {guide.enhanced && (
                      <a
                        className="detail-diagram-link"
                        href={section.diagram.src}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open full-size diagram ↗
                      </a>
                    )}
                  </figcaption>
                </figure>
              )}
              {section.interaction && (
                <GuideInteraction kind={section.interaction} />
              )}
              {section.detailInteraction && (
                <DetailExplorer kind={section.detailInteraction} />
              )}
              {section.disclosures && (
                <div className="detail-disclosures">
                  {section.disclosures.map((item) => (
                    <details key={item.title}>
                      <summary>{item.title}</summary>
                      <p>{item.text}</p>
                    </details>
                  ))}
                </div>
              )}
              {section.photo && (
                <figure className="detail-project-photo">
                  <Image
                    src={section.photo.src}
                    alt={section.photo.alt}
                    width={section.photo.width}
                    height={section.photo.height}
                    sizes="(max-width: 900px) 100vw, 760px"
                  />
                  <figcaption>
                    <p>{section.photo.caption}</p>
                    <Link href={section.photo.href}>
                      {section.photo.linkLabel} ↗
                    </Link>
                  </figcaption>
                </figure>
              )}
              {guide.enhanced &&
                section.paragraphs.slice(1).map((p) => <p key={p}>{p}</p>)}
              {section.links && (
                <div className="guide-inline-links">
                  {section.links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label} <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}
          <section id="questions" className="guide-section guide-faq">
            <p className="editorial-eyebrow">A little more clarity</p>
            <h2>Your questions, answered</h2>
            {guide.questions.map((qa) => (
              <details key={qa.question}>
                <summary>{qa.question}</summary>
                <p>{qa.answer}</p>
              </details>
            ))}
          </section>
          {guide.sources && (
            <section className="guide-sources">
              <h2>Technical references</h2>
              <p>
                Manufacturer and safety guidance checked on 18 October 2026. The
                current instructions for the supplied system govern the
                installation.
              </p>
              <ul>
                {guide.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href}>{s.label} ↗</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      <section className="guide-related">
        <p className="editorial-eyebrow">
          {guide.professional
            ? "Keep the project connected"
            : "Consider the whole room"}
        </p>
        <h2>
          {guide.professional
            ? "The next decision, explained."
            : "Every detail has a part to play."}
        </h2>
        <div>
          {guide.related.map((link, i) => (
            <Link key={link.href} href={link.href}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{link.label}</h3>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">
          {guide.professional
            ? "Professional project support"
            : "Made around your home"}
        </p>
        <h2>
          {guide.professional ? (
            "Bring the curtain into the project conversation."
          ) : (
            <>
              Let’s find the right finish
              <br />
              for your window.
            </>
          )}
        </h2>
        <p>
          {guide.professional
            ? "Share your role, project stage and the decision you need to resolve. We can establish which drawings, samples or site information are needed next."
            : "A photograph, the shape of the room and the way you want it to feel. That’s where we begin."}
        </p>
        <Link
          className="editorial-button"
          href={
            guide.professional
              ? guide.path === "/professionals/project-review"
                ? "/contact"
                : "/professionals/project-review"
              : "/start-designing"
          }
        >
          {guide.professional
            ? "Discuss your project"
            : "Discuss your curtains"}{" "}
          <span aria-hidden="true">↗</span>
        </Link>
        <a href="tel:08007720367" className="editorial-text-link">
          Or call 0800 772 0367
        </a>
      </section>
    </main>
  );
}
