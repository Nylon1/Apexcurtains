import Link from "next/link";
import Image from "next/image";

type Item = { title: string; text: string };
type Qa = { question: string; answer: string };

export default function CurtainDetailHub({
  eyebrow,
  title,
  intro,
  items,
  questions,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: Item[];
  questions: Qa[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="window-editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="guide-hero">
        <div className="guide-hero-copy">
          <p className="editorial-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="guide-intro">{intro}</p>
          <a href="#curtain-details" className="editorial-button">
            Explore the details ↓
          </a>
        </div>
        <figure className="guide-hero-image">
          <Image
            src="/projects/cambridge-apex-curtains-cambridge.jpeg"
            alt="Tailored curtain folds and a matching tieback beside tall gable glazing"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <figcaption>
            Apex installation photography · The shape of a fold and the sweep of
            a tieback bring the room together.
          </figcaption>
        </figure>
      </section>
      <div className="detail-items" id="curtain-details">
        {items.map((item) => (
          <section key={item.title} className="guide-section">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </section>
        ))}
        <section className="guide-section guide-faq">
          <h2>A little more detail</h2>
          {questions.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </section>
      </div>
      <section className="guide-related">
        <p className="editorial-eyebrow">The finishing collection</p>
        <h2>Consider every detail.</h2>
        <div>
          {[
            {
              href: "/curtain-tiebacks",
              label: "Matching and contrasting tiebacks",
            },
            { href: "/curtain-linings", label: "Lining and light" },
            { href: "/curtain-colours-and-tones", label: "Colour and tone" },
          ].map((item, i) => (
            <Link key={item.href} href={item.href}>
              <span>{i + 1}</span>
              <h3>{item.label}</h3>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">A complete curtain</p>
        <h2>Beautifully considered, from the start.</h2>
        <Link href="/curtain-design-guide" className="editorial-button">
          Follow the design journey ↗
        </Link>
      </section>
    </main>
  );
}
