import type { Metadata } from "next";
import Link from "next/link";
import RoomVisualiser from "@/components/visualiser/RoomVisualiser";
import { resolveLook } from "@/lib/visualiser/catalogue";
import "./visualiser.css";

export const metadata: Metadata = {
  title: "Apex Curtain Room Visualiser | Explore Oslo Colours",
  description:
    "Explore Oslo curtain colours on real shaped Apex installations. See the folds, roofline and room together, then enquire about your look.",
  alternates: { canonical: "https://www.apexcurtains.com/room-visualiser" },
  openGraph: {
    title: "Apex Curtains Room Visualiser",
    description:
      "Your architecture. Your colour. Explore Oslo on real shaped curtains.",
    url: "https://www.apexcurtains.com/room-visualiser",
    images: ["/projects/wave-pleat-apex-curtains-milton-keynes.jpeg"],
  },
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ room?: string; colour?: string }>;
}) {
  const params = await searchParams;
  const { scene, colour } = resolveLook(params.room, params.colour);
  return (
    <main className="rv-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.apexcurtains.com/room-visualiser#webpage",
            url: "https://www.apexcurtains.com/room-visualiser",
            name: "Apex Curtains Room Visualiser",
            description:
              "Explore Oslo colours on real shaped curtain installations.",
            isPartOf: { "@id": "https://www.apexcurtains.com/#website" },
            publisher: { "@id": "https://www.apexcurtains.com/#organization" },
          }),
        }}
      />
      <header className="rv-intro">
        <div>
          <p className="rv-eyebrow">Apex Curtains / The room visualiser</p>
          <h1>
            Your architecture.
            <br />
            <em>Your colour.</em>
          </h1>
        </div>
        <p>
          See how a shade changes the feeling of a room. Explore plain Oslo
          colours on real shaped curtains, with the folds and roofline kept
          beautifully in view.
        </p>
      </header>
      <RoomVisualiser initialRoom={scene.id} initialColour={colour.id} />
      <section className="rv-editorial">
        <div>
          <p className="rv-eyebrow">Made for the shape of your home</p>
          <h2>
            Imagine the colour.
            <br />
            <em>Then plan the detail.</em>
          </h2>
        </div>
        <div>
          <p>
            Apex, gable-end, triangular and angled windows need curtains
            designed around their particular geometry. These installation views
            help you explore colour; a specialist survey establishes the track
            route, curtain dimensions, fixing points and access for your own
            room.
          </p>
          <p>
            Oslo is a plain collection by Prestigious Textiles. The display
            colours come from the manufacturer swatches in our Oslo records. A
            small sample and a full-height curtain can look different in
            daylight and evening light.
          </p>
          <nav aria-label="Explore specialist curtain guidance">
            {[
              ["Apex curtains", "/apex-curtains"],
              ["Gable-end curtains", "/gable-end-curtains"],
              ["Triangular curtains", "/triangular-window-curtains"],
              ["Angled windows", "/angled-window-curtains"],
              ["Colour & interiors", "/curtain-colours-and-tones"],
              ["Oslo & fabric selection", "/curtain-fabrics#oslo-fabrics"],
              ["Linings & light", "/curtain-linings"],
              ["Specialist tracks", "/curtain-tracks"],
              ["Tiebacks & coverage", "/curtain-tiebacks"],
              ["Real projects", "/gallery"],
              ["Book a consultation", "/start-designing"],
            ].map(([label, href]) => (
              <Link href={href} key={href}>
                {label} ↗
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
