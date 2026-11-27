import Image from "next/image";
import TrackedLink from "@/components/analytics/TrackedLink";

export default function Hero() {
  return (
    <header className="home-hero" id="home-hero">
      <Image
        src="/window-types/apex-hero.jpg"
        alt="Real Apex installation: full-height pale curtains following a wide gable roofline"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="home-hero-copy">
        <h1>
          Exceptional Curtains for <em>Exceptional Windows.</em>
        </h1>
        <p>
          UK specialists in complex, oversized and high-level curtain installations.
          From apex and gable windows to double-height glazing, we bring together
          architectural design, specialist manufacturing, advanced tracks and
          professional installation.
        </p>
        <div className="home-actions">
          <a
            href="#architectural-curtains"
            className="home-button home-button-light"
          >
            Explore our specialisms <span aria-hidden="true">↓</span>
          </a>
          <TrackedLink
            href="/architectural-curtain-project-planner"
            eventName="architectural_project_planner_click"
            eventData={{ source: "homepage_hero" }}
            className="home-button home-button-glass"
          >
            Plan your project <span aria-hidden="true">↗</span>
          </TrackedLink>
          <TrackedLink
            href="/start-designing"
            eventName="curtain_journey_start_click"
            eventData={{ source: "homepage_hero" }}
            className="home-button home-button-glass"
          >
            Book a consultation <span aria-hidden="true">↗</span>
          </TrackedLink>
        </div>
      </div>
      <p className="home-photo-credit">A completed Apex gable installation</p>
    </header>
  );
}
