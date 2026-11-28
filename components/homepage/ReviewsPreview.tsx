import Link from "next/link";
import Image from "next/image";

export default function ReviewsPreview() {
  return (
    <section className="home-section home-reviews">
      <figure>
        <Image
          src="/projects/cambridge-apex-curtains-cambridge.jpeg"
          alt="Dressed curtain folds and matching tieback in a Cambridge installation"
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
          Explore the details
          <br />
          that shape them.
        </h2>
        <p>
          Explore our completed projects while customer stories are being
          prepared. Look closely at the folds, the roofline and the
          way each curtain sits within the room.
        </p>
        <div className="home-actions">
          <Link href="/reviews" className="home-button">
            Reviews and project information ↗
          </Link>
          <Link href="/gallery" className="home-text-link">
            Explore the installations ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
