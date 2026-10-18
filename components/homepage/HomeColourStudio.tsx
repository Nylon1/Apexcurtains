"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ColourFamilyWheel from "@/components/guides/ColourFamilyWheel";
import {
  colourFamilies,
  styleAdvice,
  moodAdvice,
} from "@/lib/colour-interiors";
import fabrics from "@/lib/oslo-fabrics.json";
const directions = {
  Modern: styleAdvice.Modern,
  Warm: moodAdvice.Warm,
  Minimal: styleAdvice.Minimal,
  Traditional: styleAdvice.Traditional,
  Dramatic: moodAdvice.Dramatic,
  Soft: moodAdvice.Soft,
  Luxury: styleAdvice.Luxury,
};
const examples: Record<
  string,
  { image: string; title: string; caption: string; href: string }
> = {
  greens: {
    image: "/window-types/triangular.jpeg",
    title: "Olive, chalk and the garden beyond",
    caption:
      "Apex installation · An olive interior palette; the fabric range is not recorded here as Oslo.",
    href: "/triangular-window-curtains",
  },
  blues: {
    image: "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg",
    title: "Deep blue with the warmth of timber",
    caption:
      "Peterborough · A real Apex project, shown for its blue palette rather than an Oslo fabric match.",
    href: "/gallery/peterborough-bedroom-blackout-curtains-peterborough",
  },
  neutrals: {
    image: "/projects/wave-pleat-apex-curtains-milton-keynes.jpeg",
    title: "A quiet neutral, shaped by the folds",
    caption:
      "Milton Keynes · Warm neutral curtains; the project does not identify Oslo as its fabric.",
    href: "/gallery/wave-pleat-apex-curtains-milton-keynes",
  },
};
export default function HomeColourStudio() {
  const [selected, setSelected] = useState("greens");
  const [direction, setDirection] = useState<keyof typeof directions>("Modern");
  const family = colourFamilies.find((f) => f.id === selected)!;
  const chosen = family.fabrics
    .slice(0, 2)
    .map((name) => fabrics.find((f) => f.name === name)!);
  const example =
    examples[selected] ||
    (selected === "taupes"
      ? examples.neutrals
      : selected === "dark"
        ? examples.blues
        : undefined);
  return (
    <section
      className="home-section home-colour-studio"
      id="design-your-look"
      aria-labelledby="home-colour-title"
    >
      <div className="home-section-heading">
        <div>
          <p className="editorial-eyebrow">02 / Design your look</p>
          <h2 id="home-colour-title">
            A colour. A feeling.
            <br />A room that feels like you.
          </h2>
        </div>
        <p>
          Start with a colour family, then explore the mood. Discover Oslo
          fabrics by Prestigious Textiles, materials that sit well together and
          the details that complete the scheme.
        </p>
      </div>
      <div className="home-colour-layout">
        <ColourFamilyWheel selected={selected} onSelect={setSelected} />
        <div className="home-colour-result">
          <p className="editorial-eyebrow" aria-live="polite">
            {family.name}
          </p>
          <h3>{family.title}</h3>
          <p>{family.introduction}</p>
          <div
            className="home-direction-controls"
            role="group"
            aria-label="Interior direction"
          >
            {Object.keys(directions).map((d) => (
              <button
                type="button"
                key={d}
                aria-pressed={direction === d}
                onClick={() => setDirection(d as keyof typeof directions)}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="home-direction-note" aria-live="polite">
            {directions[direction]}
          </p>
          <div className="home-scheme-colours">
            {family.palette.map((p) => (
              <span key={p.name}>
                <i aria-hidden="true" style={{ backgroundColor: p.colour }} />
                {p.name}
              </span>
            ))}
          </div>
          <div className="home-oslo-pair">
            {chosen.map((f) => (
              <a key={f.name} href={f.source}>
                <Image
                  src={f.image}
                  alt={`Prestigious Textiles Oslo ${f.name}`}
                  width={300}
                  height={300}
                  sizes="(max-width: 800px) 38vw, 180px"
                />
                <span>Oslo {f.name}</span>
                <small>{f.reference} · PT details ↗</small>
              </a>
            ))}
          </div>
          <p className="home-note">
            PT fabric imagery represents 140 cm width × 1 m length, reduced here
            for preview. Screen colours, lining and room light affect
            appearance.
          </p>
          <Link
            href="/curtain-colours-and-tones#colour-explorer"
            className="home-button"
          >
            Enter the colour studio ↗
          </Link>
        </div>
      </div>
      <div className="home-colour-finishing">
        <div>
          <p className="editorial-eyebrow">Complete the composition</p>
          <h3>Beautiful from every angle.</h3>
          <p>{family.finishing}</p>
          <p>
            Choose lining for privacy, light control and the room’s needs. A
            coloured reverse adds a design choice; its colour alone does not
            establish blackout or thermal performance.
          </p>
          <div className="home-inline-links">
            <Link href="/curtain-linings">Lining ideas ↗</Link>
            <Link href="/curtain-tiebacks">Tieback combinations ↗</Link>
            <Link href="/curtain-tracks">White or black track ↗</Link>
          </div>
        </div>
        <figure>
          {example ? (
            <>
              <Link href={example.href}>
                <Image
                  src={example.image}
                  alt={example.title}
                  width={900}
                  height={1100}
                  sizes="(max-width: 800px) 100vw, 42vw"
                />
              </Link>
              <figcaption>
                {example.caption}{" "}
                <Link href={example.href}>Explore the interior ↗</Link>
              </figcaption>
            </>
          ) : (
            <>
              <Image
                src={chosen[0].image}
                alt={`Oslo ${chosen[0].name} woven fabric study`}
                width={300}
                height={300}
                sizes="(max-width: 800px) 100vw, 42vw"
              />
              <figcaption>
                Fabric study · Oslo {chosen[0].name}, Prestigious Textiles. A
                flat swatch cannot show the finished curtain drape.
              </figcaption>
            </>
          )}
        </figure>
      </div>
      <noscript>
        <p>
          Explore all eleven colour families, room styles and fabric choices in
          the{" "}
          <Link href="/curtain-colours-and-tones">
            Colour & Interiors guide
          </Link>
          .
        </p>
      </noscript>
    </section>
  );
}
