import Image from "next/image";
import Link from "next/link";
import type { WindowStory } from "@/lib/window-stories";
import { SITE_URL } from "@/lib/seo-metadata";
import { SERVICE_AREAS } from "@/lib/service-area";

export default function WindowEditorialPage({
  story,
  questions,
}: {
  story: WindowStory;
  questions: { q: string; a: string }[];
}) {
  const url = `${SITE_URL}${story.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: story.title,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: story.title,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: SERVICE_AREAS,
      },
      {
        "@type": "FAQPage",
        mainEntity: questions.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Window types",
            item: `${SITE_URL}/window-types`,
          },
          { "@type": "ListItem", position: 3, name: story.title, item: url },
        ],
      },
    ],
  };
  return (
    <main className="window-editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="guide-hero">
        <div className="guide-hero-copy">
          <nav aria-label="Breadcrumb" className="guide-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/window-types">Window types</Link>
          </nav>
          <p className="editorial-eyebrow">
            Architectural windows / Made to measure
          </p>
          <h1>{story.title}</h1>
          <p className="guide-intro">{story.intro}</p>
          <Link href="/start-designing" className="editorial-button">
            Create your curtain scheme <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <figure className="guide-hero-image">
          <Image
            src={story.image}
            alt={story.alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
          />
          <figcaption>{story.caption}</figcaption>
        </figure>
      </header>
      <section className="editorial-photo-story">
        <figure>
          <Image
            src={story.detailImage}
            alt={story.detailAlt}
            width={1000}
            height={1100}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <figcaption>{story.detailCaption}</figcaption>
        </figure>
        <div>
          <p className="editorial-eyebrow">An interior perspective</p>
          <h2>{story.moodTitle}</h2>
          <p>{story.mood}</p>
          <div
            className="tone-palette"
            aria-label="Illustrative interior palette"
          >
            {story.tones.map((tone) => (
              <div key={tone.name}>
                <span style={{ background: tone.colour }} />
                <small>{tone.name}</small>
              </div>
            ))}
          </div>
          <p className="text-sm">
            A palette to explore with physical fabric samples, rather than an
            exact colour match to a photograph.
          </p>
          <div className="guide-inline-links">
            <Link href="/curtain-fabrics">Explore fabric and texture ↗</Link>
            <Link href="/curtain-headings">Find your curtain heading ↗</Link>
          </div>
        </div>
      </section>
      <section className="editorial-photo-story reverse">
        <figure>
          <Image
            src="/guides/window-shapes.svg"
            alt="Symmetrical, single-slope and off-centre window shapes"
            width={960}
            height={540}
          />
          <figcaption>
            The geometry determines the curtain drops and the route of the
            track.
          </figcaption>
        </figure>
        <div>
          <p className="editorial-eyebrow">
            Beautiful, because it is considered
          </p>
          <h2>{story.technicalTitle}</h2>
          <p>{story.technical}</p>
          <p>
            Track support, lining weight and the space for gathered folds are
            considered together. On a slope, selected sections may remain in
            place while the cloth is drawn into tiebacks. We agree the movement
            and visible glass before making.
          </p>
          <div className="guide-inline-links">
            <Link href="/curtain-tracks">Understand the track ↗</Link>
            <Link href="/angled-window-curtains">
              Explore angled-window planning ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="guide-related">
        <p className="editorial-eyebrow">Build the whole scheme</p>
        <h2>Shape, light and the finishing touch.</h2>
        <div>
          <Link href="/curtain-linings">
            <span>01 / Light</span>
            <h3>Choose how the room feels.</h3>
            <span>↗</span>
          </Link>
          <Link href="/curtain-tiebacks">
            <span>02 / Silhouette</span>
            <h3>Make room for the view.</h3>
            <span>↗</span>
          </Link>
          <Link href="/services/premium-installation">
            <span>03 / Finish</span>
            <h3>Leave the details to us.</h3>
            <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="editorial-photo-story">
        <figure>
          <Image
            src={story.evidenceImage}
            alt={story.evidenceAlt}
            width={1000}
            height={800}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <figcaption>
            Apex installation photography. Explore the linked project for its
            recorded specification.
          </figcaption>
        </figure>
        <div>
          <p className="editorial-eyebrow">The work, in real homes</p>
          <h2>{story.evidenceTitle}</h2>
          <p>{story.evidenceText}</p>
          <Link className="editorial-button" href={story.projectHref}>
            Read the project story ↗
          </Link>
          <div className="guide-inline-links">
            <Link href="/gallery">More completed rooms ↗</Link>
            <Link href="/reviews">What our customers say ↗</Link>
          </div>
        </div>
      </section>
      <section className="guide-section guide-faq mx-auto max-w-4xl px-6 pb-12">
        <p className="editorial-eyebrow">Knowledge behind the finish</p>
        <h2>A few useful answers.</h2>
        {questions.map(({ q, a }) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">Your room, thoughtfully dressed</p>
        <h2>
          A beautiful window.
          <br />A more complete home.
        </h2>
        <p>
          Share your window and the feeling you want to create. We’ll help you
          consider the cloth, the construction and the finish.
        </p>
        <Link href="/start-designing" className="editorial-button">
          Begin your project ↗
        </Link>
      </section>
    </main>
  );
}
