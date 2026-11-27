import Image from "next/image";
import Link from "next/link";
import TrackedLink from "@/components/analytics/TrackedLink";
import { studioPhotos } from "@/lib/studio-photography";

export default function Hero() {
  const { src, alt, width, height, caption } = studioPhotos.oxford;
  return (
    <header className="architectural-hero" id="home-hero">
      <figure>
        <Image src={src} alt={alt} width={width} height={height} fetchPriority="high" loading="eager" sizes="100vw" />
        <figcaption><Link href="/gallery/pinch-pleat-curtains-oxford-oxford" prefetch={false}>{caption} <span aria-hidden="true">↗</span></Link></figcaption>
      </figure>
      <div className="architectural-hero-copy">
        <h1><span>Exceptional Curtains</span>{" "}<span>for Exceptional Windows.</span></h1>
        <p>UK specialists in complex, oversized and high-level curtain installations.</p>
        <div className="studio-actions">
          <TrackedLink href="/architectural-curtain-project-planner" eventName="architectural_project_planner_click" eventData={{ source: "homepage_hero" }} className="studio-button">
            Discuss your project <span aria-hidden="true">↗</span>
          </TrackedLink>
          <a href="#real-projects" className="studio-link">Selected projects <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </header>
  );
}
