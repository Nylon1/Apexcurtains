import Image from "next/image";
import Link from "next/link";
import { surveyGuide } from "@/lib/guides/survey";

const detailLabels: Record<string, string> = {
  geometry: "shaped measurements",
  "structure-access": "structure and access",
  "opening-and-clearance": "opening and clearance",
  "samples-and-proportion": "samples and headings",
  "after-the-survey": "changes after the survey",
};

export function SurveyTechnicalSections() {
  return surveyGuide.sections.slice(1).map((section) => (
    <section className="technical-section" id={section.id} key={section.id}>
      <h2>{section.title}</h2>
      <p>{section.paragraphs[0]}</p>
      {section.diagram && (
        <figure className="diagram">
          <p className="small">
            Scroll the drawing sideways on a small screen, or use the full-size
            drawing link.
          </p>
          <div
            className="diagram-scroll"
            tabIndex={0}
            role="region"
            aria-label="Scrollable survey geometry diagram"
          >
            <Image
              src={section.diagram.src}
              alt={section.diagram.alt}
              width={960}
              height={540}
              sizes="(max-width: 800px) 600px, 750px"
            />
          </div>
          <figcaption>
            {section.diagram.caption}{" "}
            <a href={section.diagram.src}>Open full-size drawing ↗</a>
          </figcaption>
        </figure>
      )}
      {section.table && (
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label={section.table.caption}
        >
          <table>
            <caption>{section.table.caption}</caption>
            <thead>
              <tr>
                {section.table.headings.map((heading) => (
                  <th key={heading} scope="col">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  {row.slice(1).map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.paragraphs.length > 1 && (
        <details>
          <summary>More about {detailLabels[section.id]}</summary>
          {section.paragraphs.slice(1).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </details>
      )}
      {section.photo && (
        <p className="small">
          {section.photo.caption}{" "}
          <Link href={section.photo.href}>{section.photo.linkLabel} ↗</Link>
        </p>
      )}
      <div className="technical-links">
        {section.links?.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label} ↗
          </Link>
        ))}
      </div>
    </section>
  ));
}

export function SurveyQuestions() {
  return (
    <section className="wrap section questions" id="questions">
      <p className="eyebrow">Before you enquire</p>
      <h2>A few useful answers.</h2>
      {surveyGuide.questions.map(({ question, answer }) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
    </section>
  );
}
