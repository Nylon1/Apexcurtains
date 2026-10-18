"use client";
import Link from "next/link";
import { useRef } from "react";
import { homeServiceSteps } from "@/lib/homepage-discovery";
export default function HomeServiceJourney() {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const node = rail.current;
    if (node)
      node.scrollBy({
        left: direction * node.clientWidth * 0.8,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  };
  return (
    <section className="home-section home-service" id="your-curtain-journey">
      <div className="home-section-heading">
        <div>
          <p className="editorial-eyebrow">05 / One considered service</p>
          <h2>
            From your first photograph
            <br />
            to the final fold.
          </h2>
        </div>
        <div>
          <p>
            Survey, design, manufacture and installation belong together. Each
            stage resolves the details needed for the next.
          </p>
          <div className="home-journey-controls">
            <button
              type="button"
              aria-label="Previous service stages"
              onClick={() => move(-1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next service stages"
              onClick={() => move(1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div
        className="home-journey-rail"
        ref={rail}
        tabIndex={0}
        role="region"
        aria-label="Six stages of the Apex service; scroll to explore"
      >
        {homeServiceSteps.map((step, i) => (
          <article key={step.title}>
            <span className="home-step-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <details>
              <summary>What this means for your project</summary>
              <p>{step.detail}</p>
            </details>
            <Link href={step.href}>Explore this stage ↗</Link>
          </article>
        ))}
      </div>
      <p className="home-note">
        Swipe, scroll or use the arrows to explore all six stages.
      </p>
    </section>
  );
}
