import Image from "next/image";
import Link from "next/link";
const guides = [
  {
    href: "/curtain-colours-and-tones",
    image: "/window-types/triangular.jpeg",
    alt: "Olive curtains beside pale walls and a garden view",
    title: "A palette for the whole room",
    text: "Warm neutrals, grounded greens and confident contrasts. Find the tones that connect your curtains to your interior.",
  },
  {
    href: "/curtain-fabrics",
    image: "/projects/cambridge-apex-curtains-cambridge.jpeg",
    alt: "Long curtain folds beside a gable window",
    title: "Think beyond the sample",
    text: "How drape, weight, texture and pattern change when a fabric becomes a curtain four to six metres tall.",
  },
  {
    href: "/advice/buying-apex-curtains-online",
    image: "/window-types/apex-hero.jpg",
    alt: "Curtain panels following a wide apex roofline",
    title: "Before you buy online",
    text: "Understand the geometry, fixings, access and hidden costs that make shaped windows less forgiving.",
  },
];
export default function GuidesPreview() {
  return (
    <section className="reading-room">
      <p className="editorial-eyebrow">The reading room</p>
      <h2>A considered home begins with good questions.</h2>
      <div className="reading-grid">
        {guides.map((g) => (
          <article key={g.href}>
            <Link href={g.href}>
              <Image
                src={g.image}
                alt={g.alt}
                width={600}
                height={480}
                sizes="(max-width: 800px) 100vw, 33vw"
              />
              <h3>{g.title}</h3>
            </Link>
            <p>{g.text}</p>
            <Link href={g.href} className="editorial-text-link">
              Explore the guide ↗
            </Link>
          </article>
        ))}
      </div>
      <Link href="/faq#what-is-possible" className="editorial-button">
        What is actually possible? ↗
      </Link>
    </section>
  );
}
