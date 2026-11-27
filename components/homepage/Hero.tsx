import Image from "next/image";
import Link from "next/link";
import TrackedLink from "@/components/analytics/TrackedLink";
import { studioPhotos } from "@/lib/studio-photography";

export default function Hero() {
  const { src, alt, width, height, caption } = studioPhotos.oxford;
  return (
    <header className="studio-hero" id="home-hero">
      <div className="studio-hero-copy">
        <p className="studio-kicker">Architectural curtains</p>
        <h1>Exceptional Curtains for Exceptional Windows.</h1>
        <p>Specialist made-to-measure curtains for apex, double-height and oversized glazing. Designed, made and fitted around the architecture.</p>
        <div className="studio-actions">
          <TrackedLink href="/architectural-curtain-project-planner" eventName="architectural_project_planner_click" eventData={{ source: "homepage_hero" }} className="studio-button">
            Discuss your project
          </TrackedLink>
          <a href="#real-projects" className="studio-link">Selected projects <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <figure className="studio-hero-photo">
        <Image src={src} alt={alt} width={width} height={height} fetchPriority="high" loading="eager" sizes="(max-width: 800px) 100vw, 63vw" />
        <figcaption><Link href="/gallery/pinch-pleat-curtains-oxford-oxford" prefetch={false}>{caption} <span aria-hidden="true">↗</span></Link></figcaption>
      </figure>
    </header>
  );
}
