"use client";

import { useState } from "react";
import type { DetailInteraction } from "@/lib/specialist-guide-types";

const preparation = {
  "survey-checklist": [
    "A whole-window photograph taken from floor level",
    "A view of each side, the ceiling and the floor around the window",
    "Any available drawings or information about the wall construction",
    "A note of new flooring, decoration or building work still planned",
    "Your priorities: view, privacy, sleep, warmth and everyday opening",
    "A few room photographs or fabric and colour references you like",
  ],
  "installation-checklist": [
    "Tell Apex about changes to the room since the survey",
    "Agree parking, carrying routes and the installation appointment",
    "Agree furniture movement and the space needed for access equipment",
    "Put fragile objects safely away and keep the working area clear",
    "Make arrangements for children and pets during the work",
    "Allow time for the operating demonstration and care handover",
  ],
};

function PreparationChecklist({ kind }: { kind: keyof typeof preparation }) {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <div className="detail-explorer detail-checklist">
      <fieldset>
        <legend>
          {kind === "survey-checklist"
            ? "Prepare for your first conversation"
            : "Your installation-day preparation"}
        </legend>
        <p>
          Tick what you have ready. This is a personal reminder, not a form
          submission or confirmation that the site is safe.
        </p>
        {preparation[kind].map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={checked.includes(item)}
              onChange={(e) =>
                setChecked((current) =>
                  e.target.checked
                    ? [...current, item]
                    : current.filter((v) => v !== item),
                )
              }
            />
            <span>{item}</span>
          </label>
        ))}
      </fieldset>
      <p className="detail-status" aria-live="polite">
        {checked.length} of {preparation[kind].length} ready
      </p>
      <small>
        Selections stay on this page only. Please share relevant information
        when you contact Apex.
      </small>
    </div>
  );
}

function Toggle({
  options,
  selected,
  onChange,
  label,
}: {
  options: string[];
  selected: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div className="detail-toggles" role="group" aria-label={label}>
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          aria-pressed={selected === i}
          onClick={() => onChange(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function DetailExplorer({ kind }: { kind: DetailInteraction }) {
  const [selected, setSelected] = useState(0);
  const [closeSides, setCloseSides] = useState(false);
  if (kind === "survey-checklist" || kind === "installation-checklist")
    return <PreparationChecklist kind={kind} />;
  if (kind === "track-finish")
    return (
      <div className="detail-explorer">
        <p className="editorial-eyebrow">A line within the architecture</p>
        <Toggle
          label="Track finish illustration"
          options={["White · normal finish", "Black · optional upgrade"]}
          selected={selected}
          onChange={setSelected}
        />
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label={`${selected ? "Black" : "White"} track line against a light ceiling, above a neutral curtain. Finish illustration, not a product profile.`}
        >
          <rect width="640" height="340" fill="#e5e0d4" />
          <path d="M0 74H640V340H0Z" fill="#f1eee5" />
          <path
            d="M35 98H605"
            stroke={selected ? "#242724" : "#fffdfa"}
            strokeWidth="18"
          />
          <path d="M50 123H590L610 323H30Z" fill="#b5a386" />
          {Array.from({ length: 12 }, (_, i) => (
            <path
              key={i}
              d={`M${55 + i * 46} 122q24 65 0 198`}
              fill="none"
              stroke="#8e7e65"
              strokeWidth="10"
              opacity="0.65"
            />
          ))}
          <text x="320" y="49" textAnchor="middle">
            Same curtain. A different track line.
          </text>
        </svg>
        <p aria-live="polite">
          {selected
            ? "Black draws a deliberate line and can relate to dark window frames. Consider whether you want to repeat that line around the roof slope."
            : "White can blend into a pale wall or ceiling, keeping attention on the cloth and window shape."}
        </p>
        <small>
          Colour study only. Both finishes are discussed alongside track
          specification; black is quoted as an upgrade. This is not a rendering
          of a particular Forest profile.
        </small>
      </div>
    );
  if (kind === "fixings")
    return (
      <div className="detail-explorer">
        <p className="editorial-eyebrow">Follow the load into the building</p>
        <Toggle
          label="Compare fixing arrangements"
          options={["Wall fixing", "Ceiling fixing"]}
          selected={selected}
          onChange={setSelected}
        />
        <svg
          viewBox="0 0 640 380"
          role="img"
          aria-label={
            selected
              ? "Ceiling fixing connects through the finish into suitable backing above; curtain folds need clearance from the wall."
              : "A wall bracket projects the track away from the wall. Its load must transfer through the finish into suitable structure."
          }
        >
          <rect width="640" height="380" fill="#f0ece2" />
          <path
            d="M120 330V72H560"
            fill="none"
            stroke="#b0b7a6"
            strokeWidth="32"
          />
          <path
            d="M143 330V96H560"
            fill="none"
            stroke="#d9d5c8"
            strokeWidth="12"
          />
          {selected ? (
            <>
              <path d="M288 58V146" stroke="#203c35" strokeWidth="7" />
              <path d="M255 60H325" stroke="#a5895e" strokeWidth="22" />
            </>
          ) : (
            <>
              <path
                d="M110 130H292V149"
                fill="none"
                stroke="#203c35"
                strokeWidth="9"
              />
              <path d="M111 100V165" stroke="#a5895e" strokeWidth="22" />
            </>
          )}
          <rect
            x="254"
            y="150"
            width="70"
            height="20"
            fill="#fffdf6"
            stroke="#203c35"
            strokeWidth="3"
          />
          <path
            d="M270 177q-32 35 0 75t0 78m35-153q-32 35 0 75t0 78"
            fill="none"
            stroke="#ac906a"
            strokeWidth="12"
          />
          <path
            d="M354 190v82m-10-13 10 13 10-13"
            fill="none"
            stroke="#203c35"
            strokeWidth="3"
          />
          <text x="386" y="231">
            Curtain load
          </text>
          <text x="386" y="138">
            Track + support
          </text>
          <path d="M375 143L325 156" stroke="#203c35" />
          <text x="40" y="365">
            Structure → fixing → bracket → track → carrier → curtain
          </text>
        </svg>
        <p aria-live="polite">
          {selected
            ? "The ceiling finish is not the support. We need to establish what is above it, whether the track line meets sound backing, and how the connection can be made."
            : "Projection clears handles and folds, but also increases the turning force at the wall fixing. Bracket reach and support must be assessed together."}
        </p>
        <small>
          Concept only: no fastener, spacing or load capacity is specified.
          Vaulted ceilings and uncertain substrates require a site-specific
          detail.
        </small>
      </div>
    );
  if (kind === "light-paths")
    return (
      <div className="detail-explorer">
        <p className="editorial-eyebrow">See where light can travel</p>
        <Toggle
          label="Compare curtain length"
          options={["Short of the floor", "Close to the floor"]}
          selected={selected}
          onChange={setSelected}
        />
        <label className="detail-checkbox">
          <input
            type="checkbox"
            checked={closeSides}
            onChange={(e) => setCloseSides(e.target.checked)}
          />
          Increase side coverage
        </label>
        <svg
          viewBox="0 0 640 420"
          role="img"
          aria-label={`Schematic closed curtains ${selected ? "close to" : "short of"} the floor, ${closeSides ? "with increased" : "with limited"} side coverage. Top, centre and residual edge gaps remain.`}
        >
          <rect width="640" height="420" fill="#e9e4d7" />
          <path
            d="M95 350V177L320 45L545 177V350Z"
            fill="#f5cf77"
            stroke="#75887d"
            strokeWidth="3"
          />
          <path
            d={
              closeSides
                ? `M83 184L315 55V${selected ? 361 : 306}H83Z`
                : `M111 176L315 55V${selected ? 361 : 306}H111Z`
            }
            fill="#52675d"
          />
          <path
            d={
              closeSides
                ? `M557 184L325 55V${selected ? 361 : 306}H557Z`
                : `M529 176L325 55V${selected ? 361 : 306}H529Z`
            }
            fill="#52675d"
          />
          {[170, 220, 270, 370, 420, 470].map((x) => (
            <path
              key={x}
              d={`M${x} ${x < 320 ? 45 + (320 - x) * 0.58 : 45 + (x - 320) * 0.58}V${selected ? 360 : 305}`}
              stroke="#91a093"
              strokeWidth="5"
              opacity=".45"
            />
          ))}
          <path d="M70 368H570" stroke="#344b3e" strokeWidth="3" />
          <text x="320" y="400" textAnchor="middle">
            Yellow indicates possible light paths, not measured brightness.
          </text>
        </svg>
        <p aria-live="polite">
          {selected
            ? "Bringing the hem near the floor reduces the open space below it."
            : "A shorter drop leaves a larger path for light below the curtain."}{" "}
          {closeSides
            ? "Extra side coverage can reduce direct edge light, subject to the wall and track position."
            : "Limited side coverage can leave a direct light path beside the fabric."}{" "}
          Neither setting seals the top, centre or room.
        </p>
        <small>
          Educational illustration, not a darkness or thermal-performance
          simulation. Floor clearance and uneven surfaces can still leave gaps.
        </small>
      </div>
    );
  const layers = [
    {
      name: "Face fabric",
      text: "The visible cloth supplies colour, texture and drape. Its direction, usable width and pattern repeat affect the cutting plan.",
      colour: "#af9471",
    },
    {
      name: "Lining",
      text: "A separately considered reverse adds body and the selected light-control properties. Its weight and care requirements must work with the face fabric.",
      colour: "#e5d9bd",
    },
    {
      name: "Optional interlining",
      text: "An additional layer may be considered for body and softness where appropriate. It adds weight and bulk; it is not automatically included and is not the same as blackout lining.",
      colour: "#b9c4b2",
    },
  ];
  return (
    <div className="detail-explorer">
      <p className="editorial-eyebrow">What goes into the curtain?</p>
      <Toggle
        label="Explore curtain construction layers"
        options={layers.map((l) => l.name)}
        selected={selected}
        onChange={setSelected}
      />
      <svg
        viewBox="0 0 640 350"
        role="img"
        aria-label={`Exploded curtain construction illustration with ${layers[selected].name.toLowerCase()} highlighted`}
      >
        <rect width="640" height="350" fill="#ede8dc" />
        {[1, 2, 0].map((n, i) => (
          <g key={n} opacity={selected === n ? 1 : 0.35}>
            <path
              d={`M${300 - i * 95} ${30 + i * 30}l240 25v210l-240-25Z`}
              fill={layers[n].colour}
              stroke="#53685b"
              strokeWidth={selected === n ? 4 : 1}
            />
            {[30, 80, 130, 180].map((x) => (
              <path
                key={x}
                d={`M${300 - i * 95 + x} ${35 + i * 30 + x / 10}q-12 105 0 205`}
                fill="none"
                stroke="#6e6a59"
                strokeWidth="2"
              />
            ))}
          </g>
        ))}
        <text x="320" y="330" textAnchor="middle">
          Layers separated to explain construction · not a cutting pattern
        </text>
      </svg>
      <p aria-live="polite">{layers[selected].text}</p>
      <small>
        Layer choice is agreed in the specification. The diagram does not
        identify the construction of any photographed project.
      </small>
    </div>
  );
}
