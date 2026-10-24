"use client";
import { Field, WindowDiagram } from "./Fields";
import {
  apexShapes,
  isSingleApex,
  windowGeometry,
} from "@/lib/atelier/geometry";
import type { SurveyWindow } from "@/lib/atelier/model";

export default function ApexMeasurements({
  w,
  update,
}: {
  w: SurveyWindow;
  update: <K extends keyof SurveyWindow>(
    key: K,
    value: SurveyWindow[K],
  ) => void;
}) {
  const g = windowGeometry(w),
    single = isSingleApex(w),
    other = w.apexShape === "other";
  function measurement(
    key:
      | "widthMm"
      | "longDropMm"
      | "leftDropMm"
      | "rightDropMm"
      | "middleDropMm"
      | "flatTopWidthMm"
      | "apexOffsetMm",
    label: string,
    hint?: string,
  ) {
    const nullable = ["leftDropMm", "rightDropMm", "middleDropMm"].includes(
      key,
    );
    return (
      <Field
        key={key}
        label={`${label} (mm)`}
        type="number"
        required
        value={w[key] ?? ""}
        showZero={nullable}
        hint={hint}
        onChange={(value) =>
          update(key, value === "" && nullable ? null : Number(value))
        }
      />
    );
  }
  return (
    <div className="at-apex-measurements">
      <label className="at-field">
        <span>
          Window shape <span className="at-required">*</span>
        </span>
        <select
          aria-label="Window shape"
          aria-required="true"
          value={w.apexShape}
          onChange={(e) =>
            update("apexShape", e.target.value as SurveyWindow["apexShape"])
          }
        >
          {apexShapes.map((shape) => (
            <option key={shape.id} value={shape.id}>
              {shape.name}
            </option>
          ))}
        </select>
        <small>
          {apexShapes.find((shape) => shape.id === w.apexShape)?.hint}
        </small>
      </label>
      <div className="at-shape-guide">
        <WindowDiagram w={w} />
        <div>
          <span className="at-eyebrow">YOUR MEASURING GUIDE</span>
          <p>
            {other
              ? "Describe the outline and enter every relevant measurement below. Add a window photograph in Window photos."
              : "Enter the left, middle and right heights and the full width. Measure all heights from the same level bottom baseline, looking at the window from inside the room."}
          </p>
          <small>
            {other
              ? "The overall width and longest finished drop are used for the full rectangular fabric allowance."
              : w.apexShape === "triangle"
                ? "A triangle meets its baseline at both ends: enter 0 for the left and right heights. The middle height is the peak."
                : single
                  ? "For a single slant, measure the middle height halfway across the width. The slant uses the full width and the difference between the two end heights."
                  : w.apexShape === "flat-top"
                    ? "The middle height is the height of the flat top. Include the horizontal width of that flat section."
                    : "The middle height is the apex / peak height. The peak may be centred or off-centre."}
          </small>
        </div>
      </div>
      <div className="at-form-grid">
        {measurement(
          "widthMm",
          "Full window width",
          "Horizontal width, measured straight across.",
        )}
        {other
          ? measurement("longDropMm", "Longest finished curtain drop")
          : null}
        {!other ? (
          <>
            {measurement(
              "leftDropMm",
              "Left-side height",
              "Enter 0 if this end meets the bottom baseline.",
            )}
            {measurement(
              single ? "middleDropMm" : "longDropMm",
              single
                ? "Middle height at half width"
                : w.apexShape === "flat-top"
                  ? "Middle / flat-top height"
                  : "Middle / apex height",
            )}
            {measurement(
              "rightDropMm",
              "Right-side height",
              "Enter 0 if this end meets the bottom baseline.",
            )}
            {w.apexShape === "flat-top"
              ? measurement(
                  "flatTopWidthMm",
                  "Flat-top width",
                  "The horizontal section between the two slants.",
                )
              : null}
          </>
        ) : null}
      </div>
      {!other && !single ? (
        <div className="at-form-grid at-geometry-position">
          <label className="at-field">
            <span>
              {w.apexShape === "flat-top"
                ? "Flat-top position"
                : "Peak position"}{" "}
              <span className="at-required">*</span>
            </span>
            <select
              aria-label={
                w.apexShape === "flat-top"
                  ? "Flat-top position"
                  : "Peak position"
              }
              value={w.apexPosition}
              onChange={(e) =>
                update(
                  "apexPosition",
                  e.target.value as SurveyWindow["apexPosition"],
                )
              }
            >
              <option value="centre">Centred</option>
              <option value="offset">Off-centre</option>
            </select>
            <small>
              {w.apexPosition === "centre"
                ? "Equal horizontal runs on each side. Different end heights can still give different slant lengths."
                : "Measure the position horizontally from the left edge."}
            </small>
          </label>
          {w.apexPosition === "offset"
            ? measurement(
                "apexOffsetMm",
                w.apexShape === "flat-top"
                  ? "Flat top starts from left"
                  : "Peak position from left",
              )
            : null}
        </div>
      ) : null}
      {other ? (
        <Field
          label="Other shape measurements"
          type="textarea"
          required
          wide
          value={w.otherShapeMeasurements}
          onChange={(v) => update("otherShapeMeasurements", v)}
          hint="Type the shape and measurements, with units: sides, heights, slants, curves, flat sections and their positions. These notes appear in all three documents."
        />
      ) : (
        <>
          <div className="at-calculated-slants" aria-live="polite">
            <span className="at-eyebrow">
              SLANTS · CALCULATED AUTOMATICALLY
            </span>
            <div className="at-form-grid">
              {(single
                ? [["Slant length", g.leftSlant ?? g.rightSlant]]
                : [
                    ["Left slant", g.leftSlant],
                    ["Right slant", g.rightSlant],
                  ]
              ).map(([label, value]) => (
                <label className="at-field" key={String(label)}>
                  <span>{label} (mm)</span>
                  <input
                    aria-label={`${label} (calculated)`}
                    readOnly
                    value={value ?? ""}
                    placeholder="Complete the measurements"
                  />
                </label>
              ))}
            </div>
            <p>
              {g.issues.length
                ? "The slants will appear when the required measurements form a valid shape."
                : "Calculated from the heights and horizontal runs, rounded to the nearest millimetre. Check site dimensions before cutting tracks."}
            </p>
            {single ? (
              <small>
                Longest drop for fabric allowance:{" "}
                {g.longest ? `${g.longest} mm` : "awaiting measurements"}.
              </small>
            ) : null}
          </div>
          {g.warnings.map((warning) => (
            <p className="at-geometry-warning" key={warning}>
              {warning}
            </p>
          ))}
          {!w.automaticSlants ? (
            <div className="at-geometry-legacy">
              <p>
                This saved survey has manually recorded slants. Check its shape
                and measurements, then apply the automatic calculation.
              </p>
              <button
                type="button"
                className="at-button"
                onClick={() => update("automaticSlants", true)}
              >
                Apply automatic slants
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
