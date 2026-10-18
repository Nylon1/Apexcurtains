import Link from "next/link";
import Image from "next/image";

export default function ReviewsPreview() {
  return (
    <section className="home-section home-reviews">
      <figure>
        <Image
          src="/projects/cambridge-apex-curtains-cambridge.jpeg"
          alt="Completed Cambridge Apex installation with full-height neutral curtains in a gable bedroom"
          width={1000}
          height={1300}
          sizes="(max-width: 800px) 100vw, 45vw"
        />
        <figcaption>
          Cambridge · A completed Apex curtain installation
        </figcaption>
      </figure>
      <div>
        <p className="editorial-eyebrow">The work. The experience.</p>
        <h2>
          See the rooms.
          <br />
          Hear from the people
          <br />
          who live in them.
        </h2>
        <p>
          Explore a curated selection of real customer reviews alongside our
          completed projects. Look closely at the folds, the roofline and the
          way each curtain sits within the room.
        </p>
        <div className="home-actions">
          <Link href="/reviews" className="home-button">
            Read customer reviews ↗
          </Link>
          <Link href="/gallery" className="home-text-link">
            Explore the installations ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
