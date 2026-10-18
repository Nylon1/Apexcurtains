import Image from "next/image";
import Link from "next/link";
import TrackedLink from "@/components/analytics/TrackedLink";
import { lookUrl, scenes } from "@/lib/visualiser/catalogue";

export default function HomeRoomVisualiser() {
  return (
    <section className="home-room-studio" aria-labelledby="home-room-title">
      <div className="home-room-image">
        <Link
          href="/room-visualiser"
          aria-label="Open the Apex room visualiser"
        >
          <Image
            src="/visualiser/double-pinch-gable-desktop.webp"
            alt="Illustrative gable living room with shaped curtains, warm timber flooring and soft neutral furniture"
            width={1200}
            height={900}
            sizes="(max-width: 800px) 100vw, 62vw"
          />
          <span className="home-room-image-link" aria-hidden="true">
            Step inside the room <span>↗</span>
          </span>
        </Link>
        <p className="home-room-caption">
          Illustrative room · Explore your own colour scheme
        </p>
      </div>
      <div className="home-room-copy">
        <p className="editorial-eyebrow">The Apex room visualiser</p>
        <h2 id="home-room-title">
          Your curtains.
          <br />
          <em>Your whole room.</em>
        </h2>
        <p>
          See how Oslo curtain colours work with your walls, flooring and
          furniture. Explore three shaped-curtain designs, then switch the
          lights to discover a different mood.
        </p>
        <TrackedLink
          href="/room-visualiser"
          eventName="room_visualiser_cta_click"
          eventData={{ source: "homepage_room_studio" }}
          className="home-button home-button-light"
        >
          Design your room <span aria-hidden="true">↗</span>
        </TrackedLink>
        <div
          className="home-room-headings"
          aria-label="Explore curtain headings in a room"
        >
          {scenes.map((scene) => (
            <Link key={scene.id} href={lookUrl(scene.id, "linen")}>
              {scene.heading} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <p className="home-room-note">
          A little inspiration before your consultation. Screen colours are a
          guide; explore fabric samples in your own light.
        </p>
      </div>
    </section>
  );
}
