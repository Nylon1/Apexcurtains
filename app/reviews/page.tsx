import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { studioPhotos } from "@/lib/studio-photography";
import styles from "./reviews.module.css";

const SITE_URL = "https://www.apexcurtains.com";
const description =
  "Customer stories are being prepared. Explore genuine Apex curtain installations and discuss your architectural curtain project with our team.";

export const metadata: Metadata = {
  title: { absolute: "Customer Reviews | Apex Curtains" },
  description,
  alternates: { canonical: `${SITE_URL}/reviews` },
  openGraph: {
    title: "Customer Reviews | Apex Curtains",
    description,
    url: `${SITE_URL}/reviews`,
    siteName: "Apex Curtains",
    type: "website",
  },
};

// Establish source and publication evidence before adding testimonials.
// See docs/reviews-review/publication-record.md for the approved interim scope.
export default function ReviewsPage() {
  return (
    <main className={`reviews-editorial ${styles.page}`}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Customer reviews</p>
          <h1>The work.<br />The detail.<br />Your decision.</h1>
          <p className={styles.intro}>
            Customer stories are being prepared. In the meantime, explore
            completed installations and discuss your own window with our team.
          </p>
          <div className={styles.actions}>
            <Link className={styles.button} href="/gallery">Explore the portfolio ↗</Link>
            <Link className={styles.textLink} href="/contact">Talk to Apex</Link>
          </div>
        </div>
        <figure className={styles.photograph}>
          <Image
            src={studioPhotos.cambridge.src}
            alt={studioPhotos.cambridge.alt}
            width={studioPhotos.cambridge.width}
            height={studioPhotos.cambridge.height}
            sizes="(max-width: 800px) 90vw, 42vw"
            preload
          />
          <figcaption>
            Cambridge · Apex portfolio photograph. No customer quotation is
            associated with this image.
          </figcaption>
        </figure>
      </header>
      {/* Retain the established fragment for existing specialist-page links. */}
      <section id="customer-stories" className={styles.project} aria-labelledby="project-detail-title">
        <div className={styles.reading}>
          <p className={styles.eyebrow}>See the installation</p>
          <h2 id="project-detail-title">A closer look at the finished room.</h2>
          <p>
            Explore the curtain folds, the tieback and the relationship between
            the fabric and the glazing in the Cambridge project.
          </p>
          <Link className={styles.textLink} href="/gallery/cambridge-apex-curtains-cambridge">
            View the Cambridge project ↗
          </Link>
        </div>
      </section>
      <section className={styles.consultation} aria-labelledby="review-consultation-title">
        <div className={styles.inner}>
          <h2 id="review-consultation-title">Tell us about your window.</h2>
          <p>A photograph, a drawing or a few measurements are enough to begin.</p>
          <Link className={styles.button} href="/architectural-curtain-project-planner">
            Discuss your project ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
