import Image from "next/image";
import Link from "next/link";
const details = [
  {
    title: "Curtain tracks",
    text: "Aluminium systems, secure support and a route designed around the slope.",
    href: "/curtain-tracks",
    image: "/guides/track-fixing.svg",
    alt: "Illustration of wall and ceiling track fixing concepts",
    diagram: true,
  },
  {
    title: "Linings & blackout",
    text: "Drape, privacy and light control, with the edges considered as carefully as the cloth.",
    href: "/curtain-linings",
    image: "/guides/light-gaps.svg",
    alt: "Diagram showing light gaps around curtains",
    diagram: true,
  },
  {
    title: "High-window installation",
    text: "The right working position, safe access and a beautifully dressed finish.",
    href: "/services/premium-installation",
    image: "/guides/access-planning.svg",
    alt: "Gable-room access planning diagram",
    diagram: true,
  },
  {
    title: "Curtain headings",
    text: "Choose the fold and rhythm that suit the cloth and the room.",
    href: "/curtain-headings",
    image: "/projects/wave-pleat-apex-curtains-milton-keynes.jpeg",
    alt: "Wave pleat curtain installation in Milton Keynes",
    diagram: false,
  },
  {
    title: "Tiebacks",
    text: "Proportion, positioning and the amount of glazing left in view.",
    href: "/curtain-tiebacks",
    image: "/window-types/gable-end.jpeg",
    alt: "Matching fabric tieback on a tall neutral curtain",
    diagram: false,
  },
  {
    title: "Measuring & geometry",
    text: "The true angles, changing drops, floor line and fixing points.",
    href: "/advice/how-to-measure-for-apex-curtains",
    image: "/guides/window-shapes.svg",
    alt: "Comparison of apex, triangular and single-slope window geometry",
    diagram: true,
  },
];
export default function HomeExpertise() {
  return (
    <section className="home-section home-expertise" id="specialist-details">
      <div className="home-section-heading">
        <div>
          <p className="editorial-eyebrow">04 / Every detail has a purpose</p>
          <h2>
            Beautiful curtains.
            <br />
            Specialist engineering.
          </h2>
        </div>
        <p>
          Standard off-the-shelf systems are often unsuitable for angled
          glazing. Track position, curtain weight, fixing structure and
          stack-back need to work together. Explore the detail that matters to
          your room.
        </p>
      </div>
      <div className="home-expertise-grid">
        {details.map((d, i) => (
          <Link
            href={d.href}
            key={d.href}
            className={
              d.diagram
                ? "home-expertise-card is-diagram"
                : "home-expertise-card"
            }
          >
            <Image
              src={d.image}
              alt={d.alt}
              width={960}
              height={540}
              sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
            />
            <div>
              <span>
                {String(i + 1).padStart(2, "0")}{" "}
                <span aria-hidden="true">↗</span>
              </span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
