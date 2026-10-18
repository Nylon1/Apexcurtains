import Image from "next/image";
import TrackedLink from "@/components/analytics/TrackedLink";

export default function Hero() {
  return (
    <header className="home-hero" id="home-hero">
      <Image
        src="/window-types/apex-hero.jpg"
        alt="Real Apex installation: full-height pale curtains following a wide gable roofline"
        fill
        priority
        loading="eager"
        sizes="100vw"
      />
      <div className="home-hero-copy">
        <p className="editorial-eyebrow">
          Apex Curtains / Made for your architecture
        </p>
        <h1>
          Curtains engineered for <em>extraordinary windows.</em>
        </h1>
        <p>
          We survey, design, manufacture and professionally install
          made-to-measure curtains for apex, triangular, angled and gable-end
          windows across the UK.
        </p>
        <div className="home-actions">
          <a
            href="#discover-your-window"
            className="home-button home-button-light"
          >
            Explore your window <span aria-hidden="true">↓</span>
          </a>
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
      <p className="home-photo-credit">
        An Apex installation · Real homes, individually dressed
      </p>
    </header>
  );
}
