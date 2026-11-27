import type { Metadata } from "next";
import Link from "next/link";
import { architecturalPlannerPath, type ArchitecturalGuide } from "@/lib/architectural-curtains";
import { articleSchema, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import "./architecture.css";

export function architecturalMetadata(guide: ArchitecturalGuide): Metadata {
  const { title, description, path } = guide;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website", siteName: "Apex Curtains" },
    twitter: { card: "summary", title, description },
  };
}

export default async function ArchitecturalGuidePage({ guide }: { guide: ArchitecturalGuide }) {
  const parent = guide.enquiry === "trade"
    ? { name: "Professionals", url: "/professionals" }
    : { name: "Curtain solutions", url: "/curtain-solutions" };
  const trail = [{ name: "Home", url: "/" }, parent, { name: guide.label, url: guide.path }];
  const schema = guide.service
    ? serviceSchema({ name: guide.label, description: guide.description, url: guide.path })
    : articleSchema({ headline: guide.title, description: guide.description, url: guide.path });
  const planner = guide.enquiry ? `${architecturalPlannerPath}?type=${guide.enquiry}` : architecturalPlannerPath;
  const Tool = guide.tool === "motion"
    ? (await import("./CurtainMotion")).default
    : guide.tool === "weight"
      ? (await import("./CurtainWeight")).default
      : null;

  return (
    <main className="arch-page">
      {[schema, breadcrumbSchema(trail)].map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replaceAll("<", "\\u003c") }} />
      ))}
      <header className="arch-hero">
        <div className="arch-wrap">
          <nav aria-label="Breadcrumb" className="arch-crumbs">
            {trail.slice(0, -1).map((crumb) => <Link key={crumb.url} href={crumb.url}>{crumb.name}</Link>)}
            <span aria-current="page">{guide.label}</span>
          </nav>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
          <Link className="arch-button" href={planner}>{guide.enquiry === "trade" ? "Discuss a trade project" : "Plan your curtain project"}</Link>
        </div>
      </header>
      <div className="arch-wrap arch-editorial">
        <aside className="arch-index">
          <nav aria-label="On this page">
            <p>On this page</p>
            <ul>
              {Tool && <li><a href="#technical-tool">{guide.tool === "motion" ? "Try the demonstration" : "Estimate curtain weight"}</a></li>}
              {guide.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
            </ul>
          </nav>
        </aside>
        <div className="arch-copy">
          {Tool && <Tool />}
          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} className="arch-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          {guide.sources && (
            <section className="arch-section">
              <h2>Technical references</h2>
              <ul>{guide.sources.map(({ href, label }) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
            </section>
          )}
        </div>
      </div>
      <section className="arch-related">
        <div className="arch-wrap">
          <h2>Explore related guidance</h2>
          <ul>{guide.related.map(({ href, label }) => <li key={href}><Link href={href}>{label} <span aria-hidden="true">↗</span></Link></li>)}</ul>
          <Link className="arch-button" href={planner}>{guide.enquiry === "trade" ? "Discuss a trade project" : "Plan your curtain project"}</Link>
        </div>
      </section>
    </main>
  );
}
