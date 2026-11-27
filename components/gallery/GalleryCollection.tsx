"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectMedia } from "@/lib/portfolio-types";

export type GalleryCard = {
  slug: string;
  title: string;
  label: string;
  summary: string;
  themes: string[];
  image: ProjectMedia;
  hasFilm: boolean;
};

export default function GalleryCollection({ projects }: { projects: GalleryCard[] }) {
  const [filter, setFilter] = useState("All projects");
  const [query, setQuery] = useState("");
  const themes = ["All projects", "Shaped windows", "Tall glazing", "Layered curtains", "Motorised", "Installation", "Hospitality"];
  const term = query.trim().toLowerCase();
  const visible = projects.filter((project) =>
    (filter === "All projects" || project.themes.includes(filter)) &&
    (!term || `${project.label} ${project.title} ${project.summary}`.toLowerCase().includes(term)),
  );
  return (
    <>
      <div className="portfolio-toolbar">
        <div className="portfolio-filters" role="group" aria-label="Filter by installation">
          {themes.map((theme) => <button type="button" key={theme} aria-pressed={filter === theme} onClick={() => setFilter(theme)}>{theme}</button>)}
        </div>
        <label className="portfolio-search">Find a project
          <input type="search" placeholder="Search place or detail" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
      </div>
      <p className="portfolio-count" aria-live="polite" aria-atomic="true">{visible.length} {visible.length === 1 ? "project" : "projects"}{filter !== "All projects" ? ` · ${filter}` : ""}</p>
      {visible.length ? <div className="portfolio-grid">
        {visible.map((project) => <article className="portfolio-card" key={project.slug}>
          <Link href={`/gallery/${project.slug}`} className="portfolio-card-image" aria-label={`Explore ${project.label}: ${project.title}`}>
            <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 650px) 90vw, (max-width: 1050px) 44vw, 29vw" unoptimized={project.image.src.startsWith("http")} />
            {project.hasFilm && <span className="portfolio-film-badge">Includes installation film</span>}
          </Link>
          <div className="portfolio-card-copy">
            <p className="portfolio-eyebrow">{project.label}</p>
            <h3><Link href={`/gallery/${project.slug}`}>{project.title}</Link></h3>
            <p>{project.summary}</p>
            <Link className="portfolio-text-link" href={`/gallery/${project.slug}`}>Explore the project</Link>
          </div>
        </article>)}
      </div> : <div className="portfolio-empty"><h3>No projects match that search.</h3><p>Try another place or explore the complete collection.</p><button type="button" className="studio-button" onClick={() => { setFilter("All projects"); setQuery(""); }}>Show all projects</button></div>}
    </>
  );
}
