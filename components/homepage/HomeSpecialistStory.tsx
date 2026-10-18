import Image from "next/image";
import Link from "next/link";
export default function HomeSpecialistStory() {
  return (
    <section className="home-section home-specialist-story">
      <div>
        <p className="editorial-eyebrow">The difference is in the planning</p>
        <h2>
          A normal window is forgiving.
          <br />
          An apex asks more.
        </h2>
        <p>
          A small error in an angle or drop can change the whole curtain line.
          The geometry, fixing position, track, curtain weight and stack-back
          need to be resolved before the cloth is cut.
        </p>
        <p>
          Then there is the room itself: light gaps, high-level access and the
          finished floor. A specialist survey brings those decisions together,
          with fewer assumptions left for installation day.
        </p>
        <Link
          href="/advice/buying-apex-curtains-online"
          className="home-button"
        >
          Why DIY apex curtains can go wrong ↗
        </Link>
        <Link href="/faq#what-is-possible" className="home-text-link">
          What is actually possible? ↗
        </Link>
      </div>
      <figure>
        <Image
          src="/guides/diy-failure-points.svg"
          alt="Seven common apex installation failure points: wrong angle, track and fixing, curtain weight, side and bottom light gaps, stack-back and inaccessible height"
          width={960}
          height={680}
          sizes="(max-width: 800px) 100vw, 55vw"
        />
        <figcaption>
          Planning illustration. Final measurements include the finished floor
          position and the actual fixing structure.
        </figcaption>
      </figure>
    </section>
  );
}
