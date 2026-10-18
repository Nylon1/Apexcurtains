"use client";

import { useState } from "react";

export default function HeadingClearance() {
  const [gathered, setGathered] = useState(false);
  const wave = gathered
    ? "M52 160C52 113 64 113 64 160S76 207 76 160S88 113 88 160S100 207 100 160S112 113 112 160S124 207 124 160S136 113 136 160S148 207 148 160S160 113 160 160S172 207 172 160"
    : "M52 160C52 113 96 113 96 160S140 207 140 160S184 113 184 160S228 207 228 160S272 113 272 160S316 207 316 160S360 113 360 160S404 207 404 160S448 113 448 160S492 207 492 160";
  return (
    <div className="heading-clearance">
      <div
        className="heading-mode"
        role="group"
        aria-label="Compare curtain positions on a straight run"
      >
        <button
          type="button"
          aria-pressed={!gathered}
          onClick={() => setGathered(false)}
        >
          Across the window
        </button>
        <button
          type="button"
          aria-pressed={gathered}
          onClick={() => setGathered(true)}
        >
          Gathered to one side
        </button>
      </div>
      <svg
        viewBox="0 0 560 300"
        role="img"
        aria-label={
          gathered
            ? "Plan view of a curtain gathered on the left, showing the width occupied by its stack"
            : "Plan view of a curtain across a straight track, showing fold depth away from the wall"
        }
      >
        <text x="28" y="29" className="diagram-small">
          PLAN VIEW / A STRAIGHT TRAVELLING RUN
        </text>
        <path d="M28 60H532" stroke="#849689" strokeWidth="12" />
        <path d="M150 60H410" stroke="#b9d2ce" strokeWidth="8" />
        <text x="280" y="89" textAnchor="middle" className="diagram-label">
          Window / wall line
        </text>
        <path d="M38 160H520" stroke="#203c35" strokeWidth="3" />
        <path d={wave} fill="none" stroke="#b39465" strokeWidth="9" />
        {gathered ? (
          <>
            <path
              d="M50 225v20m0-10h128m0-10v20"
              stroke="#203c35"
              strokeWidth="2"
              fill="none"
            />
            <text x="114" y="268" textAnchor="middle" className="diagram-label">
              Stack-back width
            </text>
            <text x="380" y="203" textAnchor="middle" className="diagram-label">
              Glass revealed by travel
            </text>
          </>
        ) : (
          <>
            <path
              d="M518 122h20m-10 0v76m-10 0h20"
              stroke="#203c35"
              strokeWidth="2"
              fill="none"
            />
            <text x="280" y="256" textAnchor="middle" className="diagram-label">
              Fold depth needs clearance on both sides of the track
            </text>
          </>
        )}
      </svg>
      <p className="heading-caption" aria-live="polite">
        {gathered
          ? "Stack-back is the width occupied by the gathered curtain along the track. It can continue to cover part of the window."
          : "Fold depth is the space the fabric takes up across the track, towards the wall and into the room. Check handles, recesses and other layers."}
      </p>
      <p className="heading-caption">
        Explanatory geometry, not a stack-back calculation or a promise that a
        sloping curtain will travel this way.
      </p>
    </div>
  );
}
