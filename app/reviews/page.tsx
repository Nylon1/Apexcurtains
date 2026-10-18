import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.apexcurtains.com";

const reviews = [
  {
    name: "Mr James Wilson",
    location: "London",
    project: "Apex Window Curtains",
    text: "Absolutely delighted with the result. The curtains transformed the room and made the apex window feel warm, elegant and properly finished.",
  },
  {
    name: "Mrs Charlotte Evans",
    location: "Richmond",
    project: "Gable End Curtain Installation",
    text: "From first advice to final fitting, everything felt professional. The finished curtains sit beautifully with the angles of the window.",
  },
  {
    name: "Mr Oliver Harris",
    location: "Kingston upon Thames",
    project: "Triangular Window Curtains",
    text: "We had no idea how to dress our unusual window shape, but the final result was stunning. The room feels softer, calmer and much more luxurious.",
  },
  {
    name: "Mrs Sophie Walker",
    location: "Wimbledon",
    project: "Barn Conversion Apex Curtains",
    text: "The quality is excellent and the guidance was very reassuring throughout. It now looks like a high-end interior rather than an awkward window space.",
  },
  {
    name: "Mr Daniel Wright",
    location: "Surrey",
    project: "Large Feature Window Drapery",
    text: "A brilliant service from start to finish. The curtains were made beautifully and the installation completely changed the feel of the room.",
  },
  {
    name: "Mrs Emily Robinson",
    location: "Guildford",
    project: "Double Height Window Curtains",
    text: "We wanted something elegant without losing the drama of the glazing, and that is exactly what we got. Very impressed.",
  },
  {
    name: "Mr George Hall",
    location: "Woking",
    project: "Bespoke Apex Curtain Installation",
    text: "The fit was superb and the whole installation looks bespoke in the best possible way. You can tell real thought went into the design.",
  },
  {
    name: "Mrs Amelia Young",
    location: "Farnham",
    project: "Apex Window Curtains",
    text: "Our apex bedroom window was difficult to deal with, but the final curtains look incredible and give us the privacy and darkness we needed.",
  },
  {
    name: "Mr William Allen",
    location: "Camberley",
    project: "Gable End Curtain Installation",
    text: "Excellent workmanship and a very polished overall experience. The curtains add softness and warmth without taking away from the architecture.",
  },
  {
    name: "Mrs Isabella King",
    location: "Ascot",
    project: "Triangular Window Curtains",
    text: "Apex Curtains really understood what the room needed. The result feels luxurious, tailored and perfectly suited to the shape of the window.",
  },
];

export const metadata: Metadata = {
  title: { absolute: "Customer Reviews | Apex Curtains" },
  description:
    "Selected customer reviews for Apex Curtains, including apex, triangular, gable-end and large architectural window projects across the UK.",
  alternates: {
    canonical: `${SITE_URL}/reviews`,
  },
  openGraph: {
    title: "Customer Reviews | Apex Curtains",
    description:
      "Selected customer feedback from Apex Curtains projects across the UK.",
    url: `${SITE_URL}/reviews`,
    siteName: "Apex Curtains",
    type: "website",
  },
};

export default function ReviewsPage() {
  return (
    <main className="reviews-editorial">
      <header className="guide-hero">
        <div className="guide-hero-copy">
          <p className="editorial-eyebrow">
            The experience / In our customers’ words
          </p>
          <h1>
            A beautiful room.
            <br />A lasting impression.
          </h1>
          <p className="guide-intro">
            Thoughtful advice, careful making and the moment a room feels
            complete. A selection of customer reflections on their Apex Curtains
            experience.
          </p>
          <a href="#customer-stories" className="editorial-button">
            Read their stories ↓
          </a>
        </div>
        <figure className="guide-hero-image">
          <Image
            src="/window-types/triangular.jpeg"
            alt="Olive curtains framing triangular glazing and a garden view"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
          />
          <figcaption>
            From the Apex installation collection. Photography illustrates our
            work and is not attributed to an individual testimonial.
          </figcaption>
        </figure>
      </header>
      <section id="customer-stories" className="review-stories">
        <p className="editorial-eyebrow">Selected customer feedback</p>
        <h2>The details people remember.</h2>
        <div className="review-grid">
          {reviews.map((review, index) => (
            <article
              key={review.name}
              className={index === 0 || index === 5 ? "review-featured" : ""}
            >
              <span className="review-number">
                {String(index + 1).padStart(2, "0")} / {review.project}
              </span>
              <blockquote>
                <p>“{review.text}”</p>
              </blockquote>
              <footer>
                <strong>{review.name}</strong>
                <span>{review.location}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>
      <section className="editorial-photo-story">
        <figure>
          <Image
            src="/projects/wave-pleat-apex-curtains-milton-keynes.jpeg"
            alt="Wave pleat apex curtains in the Milton Keynes project"
            width={1200}
            height={900}
          />
          <figcaption>
            A separate project story: wave pleat apex curtains in Milton Keynes.
          </figcaption>
        </figure>
        <div>
          <p className="editorial-eyebrow">See the work for yourself</p>
          <h2>
            From kind words
            <br />
            to considered details.
          </h2>
          <p>
            Explore completed rooms, the shapes that made them distinctive and
            the curtain choices recorded for each installation.
          </p>
          <Link
            className="editorial-button"
            href="/gallery/wave-pleat-apex-curtains-milton-keynes"
          >
            Inside the Milton Keynes project ↗
          </Link>
          <div className="guide-inline-links">
            <Link href="/gallery">Explore the gallery ↗</Link>
            <Link href="/services/premium-installation">
              Discover the fitting experience ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">Your next chapter</p>
        <h2>
          Let’s make your room
          <br />
          feel complete.
        </h2>
        <Link href="/start-designing" className="editorial-button">
          Discuss your curtains ↗
        </Link>
      </section>
    </main>
  );
}
