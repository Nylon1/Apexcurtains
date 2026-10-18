"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { homeWindowShapes } from "@/lib/homepage-discovery";
export default function HomeWindowDiscovery() {
  const [selected, setSelected] = useState("apex");
  return (
    <section
      className="home-section home-window-discovery"
      id="discover-your-window"
      aria-labelledby="window-discovery-title"
    >
      <div className="home-section-heading">
        <div>
          <p className="editorial-eyebrow">01 / Recognise the shape</p>
          <h2 id="window-discovery-title">What shape is your window?</h2>
        </div>
        <p>
          Choose the closest shape. See the possibilities, understand the
          practical details and find the right place to begin.
        </p>
      </div>
      <div
        className="home-shape-choices"
        role="group"
        aria-label="Choose your window shape"
      >
        {homeWindowShapes.map((shape) => (
          <button
            key={shape.id}
            type="button"
            aria-pressed={selected === shape.id}
            aria-controls={`window-detail-${shape.id}`}
            onClick={() => setSelected(shape.id)}
          >
            <svg viewBox="0 0 160 120" aria-hidden="true">
              <path
                d={shape.outline}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              {shape.id === "unsure" ? (
                <text
                  x="80"
                  y="82"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="32"
                >
                  ?
                </text>
              ) : (
                <path
                  d={
                    shape.id === "double-height"
                      ? "M40 58H120M80 8V112"
                      : "M80 45V105"
                  }
                  stroke="currentColor"
                  strokeWidth="1"
                />
              )}
            </svg>
            <span>{shape.name}</span>
          </button>
        ))}
      </div>
      {homeWindowShapes.map((shape) => (
        <article
          key={shape.id}
          id={`window-detail-${shape.id}`}
          className="home-shape-panel"
          hidden={selected !== shape.id}
        >
          <figure>
            <Image
              src={shape.image}
              alt={shape.alt}
              width={1000}
              height={1100}
              sizes="(max-width: 800px) 100vw, 48vw"
            />
            <figcaption>{shape.alt} · Apex installation photography</figcaption>
          </figure>
          <div>
            <p className="editorial-eyebrow">{shape.name}</p>
            <h3>{shape.title}</h3>
            <p>{shape.text}</p>
            <div className="home-practical-note">
              <h4>What we plan for</h4>
              <p>{shape.challenge}</p>
            </div>
            <Link className="home-button" href={shape.href}>
              Explore{" "}
              {shape.id === "unsure"
                ? "the consultation"
                : shape.name.toLowerCase()}{" "}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="home-text-link" href={shape.example}>
              {shape.exampleLabel} ↗
            </Link>
          </div>
        </article>
      ))}
      <noscript>
        <style>{`.home-shape-choices{display:none}.home-shape-panel[hidden]{display:grid}`}</style>
      </noscript>
      <p className="home-note">
        Window descriptions can overlap. A gable may also be apex-shaped and
        double-height; the actual geometry determines the design.
      </p>
      <Link className="home-text-link" href="/barn-conversion-curtains">
        Planning a barn conversion? Explore curtains for vaulted rooms ↗
      </Link>
    </section>
  );
}
