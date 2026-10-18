"use client";

import { useState } from "react";

const liningOptions = [
  {
    name: "Standard",
    text: "A softer filter for daylight. Choose for drape, fabric support and everyday privacy; it is not a blackout specification.",
    colour: "#c4b798",
  },
  {
    name: "Blackout",
    text: "Reduces light passing through the lined fabric. Light can still enter at the top, sides, centre and hem.",
    colour: "#435159",
  },
  {
    name: "Thermal blackout",
    text: "Combines light control with an additional barrier at the glazing. Comfort depends on coverage, fit and the room; no fixed energy saving is implied.",
    colour: "#8b7361",
  },
  {
    name: "Coloured",
    text: "A considered reverse for curtains seen from outside or when tied back. Colour alone does not tell you whether a lining is blackout or thermal.",
    colour: "#697560",
  },
];

const palettes = [
  {
    name: "Quiet neutrals",
    colours: ["#e2dac8", "#bdb19b", "#685e4b"],
    text: "Warm ivory walls, oat curtains and a deeper timber note. Similar undertones connect the room; the fabric texture provides the variation.",
  },
  {
    name: "Garden tones",
    colours: ["#e0e0cf", "#737a53", "#41564b"],
    text: "Chalk, olive and a deeper green. Related tones connect the curtain to the view, while light walls give the cloth room to be seen.",
  },
  {
    name: "Gentle contrast",
    colours: ["#e5dccb", "#607981", "#b77e62"],
    text: "Warm cream, muted blue and a small clay accent. The complementary relationship is softened by muted colours and unequal proportions.",
  },
];

export default function GuideInteraction({
  kind,
}: {
  kind: "lining" | "tiebacks" | "palette";
}) {
  const [selected, setSelected] = useState(0);
  const [tied, setTied] = useState(false);
  if (kind === "palette")
    return (
      <div className="guide-interaction">
        <p className="editorial-eyebrow">Try a palette direction</p>
        <div
          className="guide-switches"
          role="group"
          aria-label="Interior palette"
        >
          {palettes.map((p, i) => (
            <button
              key={p.name}
              type="button"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="palette-preview" aria-hidden="true">
          {palettes[selected].colours.map((colour, i) => (
            <span
              key={colour}
              style={{ background: colour, flex: [6, 3, 1][i] }}
            />
          ))}
        </div>
        <p aria-live="polite">{palettes[selected].text}</p>
        <small>
          Concept palettes, not available fabric colour references. Proportions
          are illustrative rather than a decorating formula.
        </small>
      </div>
    );
  if (kind === "lining")
    return (
      <div className="guide-interaction">
        <p className="editorial-eyebrow">Compare the feeling</p>
        <div
          className="guide-switches"
          role="group"
          aria-label="Compare curtain linings"
        >
          {liningOptions.map((option, i) => (
            <button
              type="button"
              key={option.name}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span style={{ background: option.colour }} />
              {option.name}
            </button>
          ))}
        </div>
        <p aria-live="polite">{liningOptions[selected].text}</p>
        <small>
          Illustrative colour swatches. Choose from physical lining samples for
          the final specification.
        </small>
      </div>
    );
  return (
    <div className="guide-interaction">
      <p className="editorial-eyebrow">Explore the silhouette</p>
      <div
        className="guide-switches"
        role="group"
        aria-label="Curtain position"
      >
        <button
          type="button"
          aria-pressed={!tied}
          onClick={() => setTied(false)}
        >
          Released
        </button>
        <button type="button" aria-pressed={tied} onClick={() => setTied(true)}>
          Tied back
        </button>
      </div>
      <svg
        viewBox="0 0 700 400"
        role="img"
        aria-label={
          tied
            ? "Curtains gathered at the sides expose more central glass while the fabric still covers the upper slopes."
            : "Released curtains hang vertically in front of the glazing."
        }
      >
        <rect width="700" height="400" fill="#ece7dc" />
        <path
          d="M100 340V180L350 45 600 180V340Z"
          fill="#d4e0df"
          stroke="#647773"
          strokeWidth="4"
        />
        <path d="M350 45V340M100 210H600" stroke="#647773" strokeWidth="4" />
        <path
          d={
            tied
              ? "M100 180 350 45Q265 150 170 260L210 340H100Z"
              : "M100 180 348 45V340H100Z"
          }
          fill="#9c8a70"
        />
        <path
          d={
            tied
              ? "M600 180 350 45Q435 150 530 260L490 340H600Z"
              : "M600 180 352 45V340H600Z"
          }
          fill="#9c8a70"
        />
        {tied && (
          <path
            d="M115 245 180 265M585 245 520 265"
            stroke="#3d5149"
            strokeWidth="14"
          />
        )}
        <path d="M80 344H620" stroke="#746e63" strokeWidth="4" />
      </svg>
      <p aria-live="polite">
        {tied
          ? "The centre opens to the view. Fabric remains at the upper slopes and gathers around each tieback, so the whole pane is not necessarily uncovered."
          : "The curtains return towards their hanging position. The agreed track, panel layout and overlap determine how much glass is covered."}
      </p>
      <small>
        Schematic only. This illustrates coverage, not the operation or
        dimensions of a particular installation.
      </small>
    </div>
  );
}
