"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/gallery-projects";

function ProjectPreview({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      onClose={onClose}
      aria-labelledby="project-preview-title"
    >
      <button
        className="dialog-close"
        onClick={() => dialog.current?.close()}
        aria-label="Close project preview"
      >
        Close ×
      </button>
      {project.image_url && (
        <Image
          src={project.image_url}
          alt={project.title}
          width={1200}
          height={900}
          unoptimized
        />
      )}
      <div className="project-dialog-copy">
        <p className="editorial-eyebrow">
          {[project.room, project.location].filter(Boolean).join(" / ")}
        </p>
        <h2 id="project-preview-title">{project.title}</h2>
        {project.summary && <p>{project.summary}</p>}
        <dl className="project-facts">
          {[
            ["Window", project.category],
            ["Heading", project.heading],
            ["Lining", project.lining],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
        </dl>
        {project.slug && (
          <Link href={`/gallery/${project.slug}`} className="editorial-button">
            Explore this project <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </dialog>
  );
}

export default function GalleryCollection({
  projects,
}: {
  projects: Project[];
}) {
  const [filter, setFilter] = useState("All rooms");
  const [active, setActive] = useState<Project | null>(null);
  const rooms = [
    "All rooms",
    ...Array.from(new Set(projects.map((p) => p.room?.trim()).filter(Boolean))),
  ];
  const visible = projects.filter(
    (p) => filter === "All rooms" || p.room?.trim() === filter,
  );
  return (
    <>
      <div className="gallery-filter" aria-label="Filter projects by room">
        {rooms.map((room) => (
          <button
            key={room}
            aria-pressed={filter === room}
            onClick={() => setFilter(room)}
          >
            {room}
          </button>
        ))}
      </div>
      <p className="gallery-count" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <div className="gallery-collection">
        {visible.map((project, index) => (
          <article key={project.id}>
            {project.image_url && (
              <button
                className="gallery-image"
                onClick={() => setActive(project)}
                aria-label={`Preview ${project.title}`}
              >
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={1200}
                  height={1000}
                  sizes="(max-width: 800px) 100vw, 50vw"
                  unoptimized
                  priority={index < 2}
                />
                <span>View photograph + details ↗</span>
              </button>
            )}
            <div className="gallery-project-copy">
              <p className="editorial-eyebrow">
                {[project.location, project.room].filter(Boolean).join(" / ")}
              </p>
              <h2>
                {project.slug ? (
                  <Link href={`/gallery/${project.slug}`}>{project.title}</Link>
                ) : (
                  project.title
                )}
              </h2>
              {project.summary && <p>{project.summary}</p>}
              {project.slug && (
                <Link
                  className="editorial-text-link"
                  href={`/gallery/${project.slug}`}
                >
                  Read the project story <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
      {active && (
        <ProjectPreview project={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}
