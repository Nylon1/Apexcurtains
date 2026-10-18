import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const SITE_URL = "https://www.apexcurtains.com";
const canonicalUrl = `${SITE_URL}/faq`;

export const metadata: Metadata = {
  title: { absolute: "Apex Window Curtain FAQs | Apex Curtains" },
  description:
    "Straight answers about curtains, tracks, blackout, measuring and installation for apex, triangular, gable-end and tall architectural windows.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Apex Window Curtain FAQs | Apex Curtains",
    description:
      "Practical answers about specialist curtains and tracks for difficult architectural windows.",
    url: canonicalUrl,
    siteName: "Apex Curtains",
    type: "website",
  },
};

const groups = [
  {
    title: "What is actually possible?",
    items: [
      {
        q: "Can every triangular window have curtains?",
        a: "Many can, but not every window supports a practical curtain arrangement. We need suitable fixing points, a workable panel layout, safe access and enough space for folds and stacks. Obstructions or a very restricted room can limit the options.",
      },
      {
        q: "Can apex curtains open completely, and where do they stack?",
        a: "That depends on the track route and available space beside the glazing. On a slope, retained upper sections may remain over the glass while the lower fabric gathers into tiebacks. We agree the open position before manufacture; completely clear glazing is not always achievable.",
      },
      {
        q: "Can the curtains follow both roof slopes?",
        a: "Often, provided both sides can be measured and supported appropriately. We measure each slope independently rather than assuming symmetry. The peak connection, panel divisions, retention points and intended opening positions all need planning.",
      },
      {
        q: "Can shaped curtain tracks be motorised?",
        a: "Do not assume a motor for a straight track can drive carriers up a shaped slope. Motorisation depends on a system explicitly suited to the geometry, curtain weight and operating route. The standard Forest KS and CS tracks described in our track guide are hand drawn. Any motorised proposal needs separate technical confirmation before quotation.",
      },
      {
        q: "Will blackout lining mean total darkness?",
        a: "Blackout lining reduces light passing through the cloth. Light can still enter above the track, at the sides, at meeting edges and near the floor. Track projection, overlaps and curtain length help manage these gaps, but the room and window geometry can prevent total darkness.",
      },
      {
        q: "Can curtains be fitted five metres high?",
        a: "Five-metre installations can be possible, subject to the window, structure and access assessment. Height alone does not establish safety. We plan the working platform, room footprint, obstructions and material handling before confirming the installation; a normal ladder is not automatically suitable.",
      },
      {
        q: "Can curtains be fitted without drilling the window frames?",
        a: "Wall or ceiling fixing may avoid the frames where there is suitable structure and clearance. This cannot be guaranteed for every room. The proposed fixing positions are agreed at survey; a frame should not be drilled without checking its construction, permissions and warranty implications.",
      },
      {
        q: "Do apex curtains have to reach the floor?",
        a: "No. Length is a design and practical decision, although floor-length curtains often give a tall window a coherent vertical line and reduce the open light path below a shorter curtain. Radiators, doors, furniture, floor levels and cleaning requirements influence the final length.",
      },
    ],
  },
  {
    title: "Apex & shaped windows",
    items: [
      {
        q: "Can curtains be fitted to apex windows?",
        a: "Yes. Apex curtains are made to suit sloping, triangular or pointed glazing. The important part is planning the curtain, track route, fixing points and stack position as one system rather than treating the window like a standard rectangle.",
      },
      {
        q: "Can curtains follow a sloping ceiling?",
        a: "Yes, where the geometry and fixing surface allow it. A specialist track can follow an angled line, but the curtain heading, weight and movement also need to be considered so the curtain hangs and operates properly.",
      },
      {
        q: "What is the difference between apex, triangular and gable-end curtains?",
        a: "The terms overlap, but they describe different architectural conditions. Apex curtains usually relate to glazing rising to a peak, triangular windows have sharply angled glazing, and gable-end curtains often deal with much larger or double-height glazed walls. The track and installation approach changes with the scale and geometry.",
      },
    ],
  },
  {
    title: "Tracks & installation",
    items: [
      {
        q: "What curtain track is best for an apex window?",
        a: "There is no single best track for every apex window. The correct system depends on the angles, curtain weight, fixing surface, operating method and where the curtains need to stack when open. Complex windows normally need a specialist track rather than a standard straight domestic track.",
      },
      {
        q: "Can specialist tracks carry blackout or interlined curtains?",
        a: "Yes, provided the track, brackets, fixings and supporting structure are specified for the finished curtain weight. Heavier linings increase the load, which is why the substrate and fixing method matter as much as the track itself.",
      },
      {
        q: "How are very high curtains installed?",
        a: "High installations are planned around safe access, suitable fixing points, curtain weight and the room itself. Access equipment and installation method depend on the building and height, so these details should be considered before manufacture rather than at the end of the project.",
      },
    ],
  },
  {
    title: "Blackout, privacy & comfort",
    items: [
      {
        q: "Can apex curtains be blackout?",
        a: "Yes. Blackout lining can be used, although the final level of darkness also depends on the shape of the window, track position and light gaps around the edges. For bedrooms, these details should be designed into the scheme from the start.",
      },
      {
        q: "Do curtains help with thermal comfort on large glazed windows?",
        a: "Lined and interlined curtains can add a soft insulating layer between the room and large areas of glazing. The practical benefit depends on the fabric, lining, curtain fullness, coverage and how the curtains meet the surrounding surfaces.",
      },
      {
        q: "Can I have voile and main curtains together?",
        a: "Yes. A layered treatment can combine daytime privacy from voile curtains with a heavier main curtain for evening privacy, blackout or thermal comfort. The extra track depth, stacking space and fixing position need to be allowed for during planning.",
      },
    ],
  },
  {
    title: "Measuring, design & cost",
    items: [
      {
        q: "How do you measure an apex window for curtains?",
        a: "Useful measurements include the overall width, peak height, side heights, slope geometry, proposed track line, floor level, fixing surface and available stack space. For complex or very high windows, a professional site measure is normally the safest basis for the final design.",
      },
      {
        q: "How much do apex curtains cost?",
        a: "Cost varies because shaped-window projects combine several variables: window size, fabric quantity, lining, heading, specialist track, access and installation. A reliable quotation therefore needs the window dimensions and project requirements rather than a generic price per metre.",
      },
      {
        q: "Are curtains or blinds better for apex windows?",
        a: "For many large or complex apex windows, curtains are the more flexible option because they can follow the architecture while adding softness, privacy and insulation. Blinds may suit some shapes, but practical limits increase as the glazing becomes taller, wider or more geometrically complex.",
      },
    ],
  },
];

const allQuestions = groups.flatMap((group) => group.items);

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Apex Window Curtain FAQs",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: allQuestions.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
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
      <section className="guide-hero">
        <div className="guide-hero-copy">
          <p className="editorial-eyebrow">Specialist curtain questions</p>
          <h1>What is actually possible?</h1>
          <p className="guide-intro">
            Beautiful curtains begin with clear expectations. Explore how the
            shape, structure and scale of your window influence what we can
            create.
          </p>
          <a href="#what-is-possible" className="editorial-button">
            Explore the possibilities ↓
          </a>
        </div>
        <figure className="guide-hero-image">
          <Image
            src="/window-types/apex-hero.jpg"
            alt="Full-height apex curtains tied back to frame a garden view"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
          />
          <figcaption>
            Apex installation photography · The open position is part of the
            design.
          </figcaption>
        </figure>
      </section>
      <div className="guide-layout">
        <aside className="guide-index">
          <nav aria-label="Question topics">
            <p className="editorial-eyebrow">Find your answer</p>
            {groups.map((g, i) => (
              <a
                key={g.title}
                href={`#${i === 0 ? "what-is-possible" : `questions-${i}`}`}
              >
                {g.title}
              </a>
            ))}
          </nav>
        </aside>
        <div>
          {groups.map((group, i) => (
            <section
              className="guide-section guide-faq"
              id={i === 0 ? "what-is-possible" : `questions-${i}`}
              key={group.title}
            >
              <h2>{group.title}</h2>
              {group.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </section>
          ))}
          <div className="guide-inline-links">
            <Link href="/curtain-tracks#structure-and-brackets">
              Fixings and structural support ↗
            </Link>
            <Link href="/curtain-linings">Lining and light control ↗</Link>
            <Link href="/services/premium-installation#mitower-access">
              High-level installation ↗
            </Link>
            <Link href="/advice/buying-apex-curtains-online">
              Measuring and DIY risks ↗
            </Link>
          </div>
        </div>
      </div>
      <section className="editorial-cta">
        <p className="editorial-eyebrow">Start with your window</p>
        <h2>Let’s find the right approach.</h2>
        <p>
          A clear photograph, approximate dimensions and your priorities help us
          begin a useful conversation.
        </p>
        <Link href="/start-designing" className="editorial-button">
          Discuss your project ↗
        </Link>
      </section>
    </main>
  );
}
