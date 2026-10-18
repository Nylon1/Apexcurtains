"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
const linings = [
  {
    name: "Standard lining",
    text: "Supports the fabric and its drape, with everyday privacy. It is not a blackout specification.",
    opacity: 0.52,
  },
  {
    name: "Blackout lining",
    text: "Reduces light passing through the lined cloth. Top, side, meeting-edge and floor gaps can still admit light.",
    opacity: 1,
  },
  {
    name: "Thermal blackout",
    text: "Combines light control with an additional barrier at the glazing. The room, coverage and fit affect comfort; no fixed energy saving is implied.",
    opacity: 1,
  },
  {
    name: "Coloured lining",
    text: "A considered reverse where the lining is visible. Colour is a design choice, not proof of blackout or thermal performance.",
    opacity: 0.7,
  },
];
export default function HomeDetailComparisons() {
  const [lining, setLining] = useState(1);
  const [floor, setFloor] = useState(false);
  const [overlap, setOverlap] = useState(false);
  const [black, setBlack] = useState(false);
  const [position, setPosition] = useState("tied");
  const side = overlap ? 6 : 22;
  const top = overlap ? 7 : 22;
  const bottom = floor ? 6 : 42;
  return (
    <section
      className="home-section home-comparisons"
      aria-label="Explore curtain details"
    >
      <div className="home-lining-feature">
        <div>
          <p className="editorial-eyebrow">Light, considered</p>
          <h2>
            What sits behind the cloth
            <br />
            changes the room.
          </h2>
          <p>
            Compare the lining, then look around its edges. Fabric performance
            and the way a curtain covers the window are separate parts of light
            control.
          </p>
          <div
            className="home-choice-buttons"
            role="group"
            aria-label="Choose a lining to compare"
          >
            {linings.map((l, i) => (
              <button
                key={l.name}
                type="button"
                aria-pressed={lining === i}
                onClick={() => setLining(i)}
              >
                {l.name}
              </button>
            ))}
          </div>
          <p className="home-comparison-answer" aria-live="polite">
            {linings[lining].text}
          </p>
          <noscript>
            <dl>
              {linings.map((option) => (
                <div key={option.name}>
                  <dt>{option.name}</dt>
                  <dd>{option.text}</dd>
                </div>
              ))}
            </dl>
          </noscript>
          <Link href="/curtain-linings" className="home-text-link">
            Explore all lining options ↗
          </Link>
        </div>
        <div>
          <figure>
            <svg
              viewBox="0 0 600 440"
              role="img"
              aria-label={`Illustrative ${linings[lining].name.toLowerCase()} with ${floor ? "a smaller" : "a larger"} bottom gap and ${overlap ? "reduced" : "visible"} top and side light gaps`}
            >
              <rect width="600" height="440" fill="#e7e2d6" />
              <rect
                x="85"
                y="45"
                width="430"
                height="335"
                fill="#f2d990"
                stroke="#7c8275"
                strokeWidth="4"
              />
              <path
                d="M300 45V380M85 220H515"
                stroke="#7c8275"
                strokeWidth="3"
              />
              <rect
                x={85 + side}
                y={45 + top}
                width={213 - side}
                height={335 - top - bottom}
                fill={lining === 3 ? "#7d8966" : "#8c887b"}
                opacity={linings[lining].opacity}
              />
              <rect
                x="302"
                y={45 + top}
                width={213 - side}
                height={335 - top - bottom}
                fill={lining === 3 ? "#7d8966" : "#8c887b"}
                opacity={linings[lining].opacity}
              />
              <path d="M75 388H525" stroke="#727665" strokeWidth="4" />
              <text
                x="300"
                y="418"
                textAnchor="middle"
                fill="#4c584e"
                fontSize="14"
              >
                Gold indicates a possible light path
              </text>
            </svg>
            <figcaption>
              Explanatory diagram, not a measured light-transmission comparison.
              Some gaps remain even with improved coverage.
            </figcaption>
          </figure>
          <div className="home-gap-controls">
            <label>
              <input
                type="checkbox"
                checked={floor}
                onChange={(e) => setFloor(e.target.checked)}
              />
              Bring the hem closer to the floor
            </label>
            <label>
              <input
                type="checkbox"
                checked={overlap}
                onChange={(e) => setOverlap(e.target.checked)}
              />
              Improve top and side coverage
            </label>
          </div>
          <p className="home-note">
            Floor-length curtains can reduce leakage at the bottom. Track
            positioning and overlaps can help at the edges, but installation
            geometry may prevent total darkness.
          </p>
        </div>
      </div>
      <div className="home-detail-pair">
        <article className="home-track-finish">
          <p className="editorial-eyebrow">The line behind the curtain</p>
          <h3>The curtain is only as good as the system carrying it.</h3>
          <p>
            Apex aluminium tracks include Forest KS and CS. We select the system
            around the complete curtain weight, fixing structure and shaped
            route.
          </p>
          <div
            className="home-choice-buttons"
            role="group"
            aria-label="Track finish"
          >
            <button
              type="button"
              aria-pressed={!black}
              onClick={() => setBlack(false)}
            >
              White · standard finish
            </button>
            <button
              type="button"
              aria-pressed={black}
              onClick={() => setBlack(true)}
            >
              Black · optional upgrade
            </button>
          </div>
          <svg
            viewBox="0 0 560 250"
            role="img"
            aria-label={`Schematic aluminium curtain track with ${black ? "black" : "white"} finish`}
          >
            <rect width="560" height="250" fill="#d9d6cb" />
            <path
              d="M65 90L115 63H492L443 90Z"
              fill={black ? "#424a47" : "#fffdf7"}
              stroke="#676f65"
            />
            <path
              d="M65 90H443V125H65Z"
              fill={black ? "#26312e" : "#f1f0e9"}
              stroke="#676f65"
            />
            <path
              d="M443 90L492 63V98L443 125Z"
              fill={black ? "#1f2825" : "#d7d9d0"}
              stroke="#676f65"
            />
            <path d="M85 126H427" stroke="#616a61" strokeWidth="4" />
            {[125, 205, 285, 365].map((x) => (
              <g key={x}>
                <rect
                  x={x - 7}
                  y="128"
                  width="14"
                  height="14"
                  rx="3"
                  fill="#f3f1e6"
                  stroke="#777f74"
                />
                <path
                  d={`M${x} 143V165Q${x + 12} 183 ${x} 187`}
                  fill="none"
                  stroke="#777f74"
                  strokeWidth="3"
                />
              </g>
            ))}
          </svg>
          <p className="home-note">
            Finish illustration only, not an exact KS/CS profile or installation
            drawing. White is normal; black is quoted as an upgrade.
          </p>
          <Link href="/curtain-tracks" className="home-text-link">
            Compare Forest KS, CS and fixings ↗
          </Link>
        </article>
        <article className="home-tieback-preview">
          <p className="editorial-eyebrow">Shape the view</p>
          <h3>How much glass stays in view?</h3>
          <p>
            Hanging, gathering and travelling sections create different
            silhouettes. Your surveyed layout determines which movements are
            possible.
          </p>
          <div
            className="home-choice-buttons"
            role="group"
            aria-label="Compare curtain positions"
          >
            {[
              { id: "hanging", name: "Natural hanging" },
              { id: "tied", name: "Tied back" },
              { id: "open", name: "Travelling sections open" },
            ].map((p) => (
              <button
                type="button"
                key={p.id}
                aria-pressed={position === p.id}
                onClick={() => setPosition(p.id)}
              >
                {p.name}
              </button>
            ))}
          </div>
          <svg
            viewBox="0 0 700 400"
            role="img"
            aria-label={`Schematic curtain position: ${position}; retained upper fabric may still cover part of the glazing`}
          >
            <rect width="700" height="400" fill="#e7e3d8" />
            <path
              d="M100 340V180L350 45L600 180V340Z"
              fill="#c5d5cf"
              stroke="#647773"
              strokeWidth="4"
            />
            <path
              d="M350 45V340M100 210H600"
              stroke="#647773"
              strokeWidth="3"
            />
            <path
              d={
                position === "hanging"
                  ? "M100 180L348 45V340H100Z"
                  : position === "tied"
                    ? "M100 180L350 45Q265 150 170 260L210 340H100Z"
                    : "M100 180L348 45V75L160 195V340H100Z"
              }
              fill="#98876d"
            />
            <path
              d={
                position === "hanging"
                  ? "M600 180L352 45V340H600Z"
                  : position === "tied"
                    ? "M600 180L350 45Q435 150 530 260L490 340H600Z"
                    : "M600 180L352 45V75L540 195V340H600Z"
              }
              fill="#98876d"
            />
            {position === "tied" && (
              <path
                d="M115 245L180 265M585 245L520 265"
                stroke="#405747"
                strokeWidth="13"
              />
            )}
            <path d="M80 345H620" stroke="#737467" strokeWidth="3" />
          </svg>
          <p className="home-note">
            Illustrative arrangements, not before/after photographs or a promise
            of full opening. Sloping sections may be retained; not every curtain
            can travel into an open stack.
          </p>
          <Link href="/curtain-tiebacks" className="home-text-link">
            Explore tiebacks and visible coverage ↗
          </Link>
        </article>
      </div>
      <figure className="home-detail-photograph">
        <Image
          src="/window-types/gable-end.jpeg"
          alt="Real Apex installation showing a matching tieback and long neutral curtain folds"
          width={900}
          height={1200}
          sizes="(max-width: 800px) 100vw, 40vw"
        />
        <figcaption>
          <span className="editorial-eyebrow">
            From illustration to the room
          </span>
          <h3>
            A matching tieback.
            <br />A more open view.
          </h3>
          <p>
            In this Apex installation, the gathered cloth reveals the central
            glazing while retaining a fabric frame along the slope. The position
            and size of the tieback are part of the design.
          </p>
          <Link href="/curtain-tiebacks" className="home-text-link">
            Find the right finishing detail ↗
          </Link>
        </figcaption>
      </figure>
    </section>
  );
}
