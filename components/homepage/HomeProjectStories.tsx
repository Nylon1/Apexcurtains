import Image from "next/image";
import Link from "next/link";
export default function HomeProjectStories() {
  return (
    <section
      className="home-project-stories"
      id="real-projects"
      aria-labelledby="home-projects-title"
    >
      <div className="home-section-heading">
        <div>
          <p className="editorial-eyebrow">
            03 / Real homes, thoughtfully resolved
          </p>
          <h2 id="home-projects-title">
            The shape was the beginning.
            <br />
            This is the result.
          </h2>
        </div>
        <Link href="/gallery" className="home-text-link">
          Explore all projects ↗
        </Link>
      </div>
      <div className="home-project-pair">
        <article>
          <Link href="/gallery/wave-pleat-apex-curtains-milton-keynes">
            <Image
              src="/projects/wave-pleat-apex-curtains-milton-keynes.jpeg"
              alt="Milton Keynes apex bedroom with neutral wave pleat curtains drawn into tiebacks"
              width={899}
              height={1599}
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </Link>
          <div>
            <p className="editorial-eyebrow">
              Milton Keynes / Apex master bedroom
            </p>
            <h3>A soft rhythm along the roofline.</h3>
            <p>
              <strong>The challenge.</strong> Dress an apex bedroom window while
              balancing the shape, privacy and the open view.
            </p>
            <p>
              <strong>The approach.</strong> The project records wave pleat
              curtains, blackout lining and a bespoke track. The gathered cloth
              shows how folds and tiebacks become part of the composition.
            </p>
            <Link
              href="/gallery/wave-pleat-apex-curtains-milton-keynes"
              className="home-text-link"
            >
              Read the project story ↗
            </Link>
          </div>
        </article>
        <article>
          <Link href="/gallery/peterborough-bedroom-blackout-curtains-peterborough">
            <Image
              src="/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg"
              alt="Peterborough bedroom with dark blue curtains framing triangular glazing above timber doors"
              width={1200}
              height={1600}
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </Link>
          <div>
            <p className="editorial-eyebrow">
              Peterborough / Triangular bedroom glazing
            </p>
            <h3>Depth of colour. A calmer bedroom.</h3>
            <p>
              <strong>The challenge.</strong> Improve privacy and light control
              while giving a shaped bedroom window a softer finish.
            </p>
            <p>
              <strong>The approach.</strong> Made-to-measure pencil pleat
              curtains with blackout lining. Deep blue frames the glass, while
              the timber brings warmth to the palette.
            </p>
            <Link
              href="/gallery/peterborough-bedroom-blackout-curtains-peterborough"
              className="home-text-link"
            >
              Read the project story ↗
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
