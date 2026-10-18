"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ColourFamilyWheel from "@/components/guides/ColourFamilyWheel";
import fabrics from "@/lib/oslo-fabrics.json";
import {
  colourFamilies,
  styleAdvice,
  roomAdvice,
  moodAdvice,
  lightAdvice,
} from "@/lib/colour-interiors";

const projects = [
  {
    image: "/window-types/triangular.jpeg",
    title: "Olive, chalk & a garden view",
    text: "The green cloth connects the steep roofline to the planting outside. Pale walls give the shape room to breathe.",
    href: "/triangular-window-curtains",
  },
  {
    image: "/projects/peterborough-bedroom-blackout-curtains-peterborough.jpeg",
    title: "Deep blue & warm timber",
    text: "Dark curtains give this bedroom glazing a defined frame; the timber brings warmth to the blue palette.",
    href: "/gallery/peterborough-bedroom-blackout-curtains-peterborough",
  },
  {
    image: "/projects/wave-pleat-apex-curtains-milton-keynes.jpeg",
    title: "A quiet neutral, shaped by light",
    text: "Long folds and gathered cloth give a pale palette depth without adding another strong colour to the room.",
    href: "/gallery/wave-pleat-apex-curtains-milton-keynes",
  },
];

function FabricCards({ names }: { names: string[] }) {
  return (
    <div className="oslo-swatches">
      {names.map((name) => {
        const fabric = fabrics.find((f) => f.name === name);
        if (!fabric) return null;
        return (
          <div key={name} className="oslo-swatch">
            <a className="oslo-fabric-link" href={fabric.source}>
              <Image
                src={fabric.image}
                width={300}
                height={300}
                alt={`Prestigious Textiles Oslo ${name} fabric swatch`}
                sizes="(max-width: 600px) 40vw, 200px"
              />
              <span>Oslo {name}</span>
              <small>{fabric.reference} · PT details ↗</small>
            </a>
            <Link
              href={`/room-visualiser?colour=${fabric.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="oslo-room-link"
            >
              View {name} in a room ↗
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default function ColourExplorer() {
  const [familyId, setFamilyId] = useState("neutrals");
  const [style, setStyle] = useState<keyof typeof styleAdvice>("Modern");
  const [room, setRoom] =
    useState<keyof typeof roomAdvice>("Gable / apex room");
  const [mood, setMood] = useState<keyof typeof moodAdvice>("Calm");
  const [light, setLight] = useState<keyof typeof lightAdvice>("North-facing");
  const [closed, setClosed] = useState(false);
  const [evening, setEvening] = useState(false);
  const family = colourFamilies.find((f) => f.id === familyId)!;
  function chooseFamily(id: string) {
    setFamilyId(id);
  }

  return (
    <>
      <section
        className="colour-explorer"
        id="colour-explorer"
        aria-labelledby="explorer-title"
      >
        <div className="colour-introduction">
          <p className="editorial-eyebrow">The Apex colour studio</p>
          <h2 id="explorer-title">
            Find the feeling.
            <br />
            Then find the cloth.
          </h2>
          <p>
            Explore a colour family, then shape it around your room. Real Oslo
            fabrics by Prestigious Textiles, considered finishing details and
            inspiration from Apex interiors.
          </p>
        </div>
        <div className="colour-wheel-layout">
          <ColourFamilyWheel selected={familyId} onSelect={chooseFamily} />
          <div className="colour-selection" id="colour-selection">
            <p className="editorial-eyebrow" aria-live="polite">
              Now exploring / {family.name}
            </p>
            <h3>{family.title}</h3>
            <p>{family.introduction}</p>
            <div className="scheme-palette" aria-label="Works well with">
              {family.palette.map((p) => (
                <span key={p.name}>
                  <i style={{ backgroundColor: p.colour }} aria-hidden="true" />
                  {p.name}
                </span>
              ))}
            </div>
            <p className="colour-note">
              A starting palette to compare against your own walls, floor and
              furniture.
            </p>
            <h4>Oslo fabrics to explore</h4>
            <FabricCards names={family.fabrics} />
            <a
              href={`#colour-${family.id}`}
              onClick={() => {
                const details = document.getElementById(`colour-${family.id}`);
                if (details instanceof HTMLDetailsElement) details.open = true;
              }}
              className="editorial-text-link"
            >
              Read the {family.name.toLowerCase()} interior notes ↓
            </a>
          </div>
        </div>
        <div className="oslo-scale-note">
          <p className="editorial-eyebrow">Understand the fabric scale</p>
          <p>
            <strong>
              PT fabric photography represents 140 cm of width × 1 metre of
              length.
            </strong>{" "}
            These reduced swatch previews preserve the supplied image
            proportions; they are not life-size samples or a simulation of a
            finished curtain. A weave seen up close can read as a quieter
            surface from the floor of a tall room.
          </p>
          <p>
            Oslo is a woven 50% cotton / 50% polyester fabric. PT lists a
            nominal width of 140 cm, with 138 cm usable, and no pattern repeat.
            “Linen” is an Oslo colour name, not its fibre composition. Confirm
            the current specification, shade availability and physical sample
            with Apex before ordering.
          </p>
          <p className="colour-note">
            Fabric imagery and colour references:{" "}
            <a href="https://www.prestigious.co.uk/fabrics/oslo-fjord/oslo-oslo-fjord/">
              Prestigious Textiles, Oslo ↗
            </a>
            . Colour groupings and interior suggestions are Apex editorial
            guidance.
          </p>
        </div>
        <div className="scheme-builder">
          <div>
            <p className="editorial-eyebrow">Make it your room</p>
            <h3>A colour is only the beginning.</h3>
            <fieldset className="interior-style-selector">
              <legend>Interior style</legend>
              <div>
                {Object.keys(styleAdvice).map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={style === s}
                    onClick={() => setStyle(s as keyof typeof styleAdvice)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="scheme-selects">
              <label>
                Room type
                <select
                  value={room}
                  onChange={(e) =>
                    setRoom(e.target.value as keyof typeof roomAdvice)
                  }
                >
                  {Object.keys(roomAdvice).map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <label>
                Mood
                <select
                  value={mood}
                  onChange={(e) =>
                    setMood(e.target.value as keyof typeof moodAdvice)
                  }
                >
                  {Object.keys(moodAdvice).map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <label>
                Light
                <select
                  value={light}
                  onChange={(e) =>
                    setLight(e.target.value as keyof typeof lightAdvice)
                  }
                >
                  {Object.keys(lightAdvice).map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
            </div>
            <p className="colour-note">
              These choices refine the design guidance. They do not restrict
              which Oslo colours you can choose.
            </p>
            <div className="scheme-advice" aria-live="polite">
              <h4>
                {style} · {family.name}
              </h4>
              <p>{styleAdvice[style]}</p>
              <p>
                <strong>{room}.</strong> {roomAdvice[room]}
              </p>
              <p>
                <strong>{mood}.</strong> {moodAdvice[mood]}
              </p>
              <p>
                <strong>{light}.</strong> {lightAdvice[light]}
              </p>
            </div>
          </div>
          <div className="scheme-preview">
            <figure>
              <svg
                viewBox="0 0 600 640"
                role="img"
                aria-label={`Illustrative ${family.name.toLowerCase()} curtains, ${closed ? "closed" : "drawn back"}, in ${evening ? "evening" : "daylight"} surroundings`}
              >
                <rect
                  width="600"
                  height="640"
                  fill={evening ? "#b6a48d" : "#e9e3d6"}
                />
                <path d="M0 565H600V640H0Z" fill="#a38a6c" />
                <path
                  d="M78 530V200L300 65L522 200V530Z"
                  fill={evening ? "#374746" : "#c8d5d0"}
                  stroke="#334745"
                  strokeWidth="7"
                />
                <path
                  d="M300 65V530M80 335H520"
                  stroke="#334745"
                  strokeWidth="6"
                />
                <path
                  d={
                    closed
                      ? "M72 194L297 58V560H72Z"
                      : "M72 194L297 58Q215 270 112 374L152 560H72Z"
                  }
                  fill={family.colour}
                />
                <path
                  d={
                    closed
                      ? "M303 58L528 194V560H303Z"
                      : "M303 58L528 194V560H448L488 374Q385 270 303 58Z"
                  }
                  fill={family.colour}
                />
                {closed ? (
                  <g stroke="#24312b" opacity=".16" strokeWidth="12">
                    {[100, 140, 180, 220, 260, 340, 380, 420, 460, 500].map(
                      (x) => (
                        <path
                          key={x}
                          d={`M${x} ${60 + Math.abs(300 - x) * 0.61}V560`}
                        />
                      ),
                    )}
                  </g>
                ) : (
                  <g stroke="#24312b" opacity=".18" fill="none" strokeWidth="8">
                    <path d="M258 87Q185 270 100 374L122 560M217 112Q159 275 90 374L92 560M342 87Q415 270 500 374L478 560M383 112Q441 275 510 374L508 560" />
                  </g>
                )}
                <rect
                  x="175"
                  y="484"
                  width="250"
                  height="105"
                  rx="12"
                  fill="#c5b9a6"
                />
                <rect
                  x="195"
                  y="463"
                  width="95"
                  height="63"
                  rx="9"
                  fill="#dcd3c2"
                />
                <rect
                  x="310"
                  y="463"
                  width="95"
                  height="63"
                  rx="9"
                  fill="#dcd3c2"
                />
                <path
                  d="M200 589V608M400 589V608"
                  stroke="#5b4d3f"
                  strokeWidth="9"
                />
              </svg>
              <figcaption>
                Illustrative proportions only. This is not an Oslo colour
                rendering, an installation photograph or a prediction of opening
                clearance. Actual curtain shape and stack-back depend on the
                surveyed window.
              </figcaption>
            </figure>
            <div className="scene-controls">
              <button
                type="button"
                aria-pressed={closed}
                onClick={() => setClosed(!closed)}
              >
                {closed ? "Show drawn back" : "Show curtains closed"}
              </button>
              <button
                type="button"
                aria-pressed={evening}
                onClick={() => setEvening(!evening)}
              >
                {evening ? "Show daylight setting" : "Show evening setting"}
              </button>
            </div>
            <p>
              Notice how closing the curtains increases the area of colour. The
              evening setting changes the surroundings; it does not predict how
              a particular fabric will react to your lamps.
            </p>
            <Link href="/curtain-tiebacks">How tiebacks change the view ↗</Link>
          </div>
        </div>
        <div className="colour-finish-notes">
          <article>
            <h3>The lining</h3>
            <p>
              {room === "Bedroom"
                ? "Compare blackout and thermal blackout options for sleep spaces, then plan for gaps around the top, sides and floor."
                : "Choose standard, blackout or thermal blackout lining for the room's needs. Compare the lining behind your colour sample before deciding."}{" "}
              A coloured reverse is a separate design choice, especially where
              it becomes visible.
            </p>
            <Link href="/curtain-linings">Explore lining choices ↗</Link>
          </article>
          <article>
            <h3>The finishing details</h3>
            <p>{family.finishing}</p>
            <div>
              <Link href="/curtain-tiebacks">Tieback ideas ↗</Link>
              <Link href="/curtain-tracks">White or black track ↗</Link>
              <Link href="/curtain-headings">Choose the heading ↗</Link>
            </div>
          </article>
        </div>
      </section>
      <section
        className="colour-projects"
        aria-labelledby="colour-project-title"
      >
        <p className="editorial-eyebrow">Colour, lived in</p>
        <h2 id="colour-project-title">Real rooms. Beautiful relationships.</h2>
        <p>
          Look at the way the cloth sits with the architecture, furniture and
          view. These are real Apex installations; their fabric ranges are not
          identified here as Oslo.
        </p>
        <div>
          {projects.map((p) => (
            <article key={p.href}>
              <Link href={p.href}>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={900}
                  height={1400}
                  sizes="(max-width: 750px) 100vw, 33vw"
                />
                <h3>{p.title}</h3>
              </Link>
              <p>{p.text}</p>
              <Link href={p.href}>Explore this interior ↗</Link>
            </article>
          ))}
        </div>
      </section>
      <section
        className="colour-family-library"
        aria-labelledby="family-library-title"
      >
        <p className="editorial-eyebrow">The palette library</p>
        <h2 id="family-library-title">A closer look at every colour family.</h2>
        <p>
          Open a family for material pairings, tall-window considerations and
          finishing ideas. Each guide belongs to this connected colour
          collection.
        </p>
        {colourFamilies.map((f) => (
          <details key={f.id} id={`colour-${f.id}`}>
            <summary>
              <span style={{ backgroundColor: f.colour }} aria-hidden="true" />
              <h3>{f.title}</h3>
              <span aria-hidden="true">+</span>
            </summary>
            <div className="colour-family-content">
              <div>
                <p>{f.introduction}</p>
                <h4>Works well with</h4>
                <p>{f.materials}</p>
                <h4>Think about scale</h4>
                <p>{f.scale}</p>
                <h4>Complete the scheme</h4>
                <p>{f.finishing}</p>
                <div className="guide-inline-links">
                  <Link href="/curtain-linings">Lining</Link>
                  <Link href="/curtain-tiebacks">Tiebacks</Link>
                  <Link href="/curtain-tracks">Track finish</Link>
                  <Link href="/curtain-fabrics">Tall fabric guidance</Link>
                </div>
              </div>
              <FabricCards names={f.fabrics} />
            </div>
          </details>
        ))}
      </section>
      <section className="colour-sample-cta">
        <p className="editorial-eyebrow">From screen to scheme</p>
        <h2>Let the sample meet the room.</h2>
        <p>
          Bring your favourite Oslo colours into the consultation. Compare them
          with the walls and floor, with the proposed lining behind, and with
          enough cloth to see the folds.
        </p>
        <Link
          href="/services/measure-consultation"
          className="editorial-button"
        >
          Explore samples with Apex ↗
        </Link>
      </section>
    </>
  );
}
