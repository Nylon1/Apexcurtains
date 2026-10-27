"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import {
  Camera,
  Copy,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Field, Section, Toggle, WindowDiagram } from "./Fields";
import ApexMeasurements from "./ApexMeasurements";
import { shapeName } from "@/lib/atelier/geometry";
import { careGuide, standardCareSummary } from "@/lib/atelier/care";
import { brochurePalette } from "@/lib/atelier/brochure";
import {
  forestTracks,
  selectedTrack,
  trackFinishes,
} from "@/lib/atelier/tracks";
import {
  windowSections,
  type WindowSection,
  type SurveyCheck,
  palettes,
  hookFinishes,
  liningOptions,
  selectedFabricPhoto,
  calculateWindow,
  type SurveyWindow,
  type Asset,
} from "@/lib/atelier/model";
type Config = [
  key: keyof SurveyWindow,
  label: string,
  type?: string,
  hint?: string,
  options?: readonly string[],
  wide?: boolean,
];
export default function WindowEditor({
  w,
  assets,
  update,
  onCopy,
  onRemove,
  onDocuments,
  onUpload,
  busy,
  saving,
  demo,
  approved,
  photoPermission,
  onPermission,
  tab,
  onSection,
  checks,
  windowNumber,
  windowCount,
  onPreviousWindow,
  onNextWindow,
  saveStatus,
  feedback,
  feedbackError,
}: {
  tab: WindowSection;
  onSection: (section: WindowSection) => void;
  checks: SurveyCheck[];
  windowNumber: number;
  windowCount: number;
  onPreviousWindow?: () => void;
  onNextWindow?: () => void;
  saveStatus: string;
  feedback: string;
  feedbackError: boolean;
  w: SurveyWindow;
  assets: Asset[];
  update: <K extends keyof SurveyWindow>(
    key: K,
    value: SurveyWindow[K],
  ) => void;
  onCopy: () => void;
  onRemove?: () => void;
  onDocuments: () => void;
  onUpload: (file: File, kind: string, caption: string) => Promise<boolean>;
  busy: boolean;
  saving: boolean;
  demo: boolean;
  approved: boolean;
  photoPermission: boolean;
  onPermission: (v: boolean) => void;
}) {
  const [photoKind, setPhotoKind] = useState("window"),
    [caption, setCaption] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const fabricInput = useRef<HTMLInputElement>(null);
  const sectionHeading = useRef<HTMLDivElement>(null);
  const index = windowSections.findIndex((section) => section.id === tab);
  const completed = windowSections.filter(
    (section) => !checks.some((check) => check.section === section.id),
  ).length;
  const remaining = checks.filter((check) => check.section === tab);
  function changeSection(section: WindowSection) {
    onSection(section);
    sectionHeading.current?.scrollIntoView({ block: "start" });
    sectionHeading.current?.focus({ preventScroll: true });
  }
  const q = calculateWindow(w);
  const palette = brochurePalette(w);
  const fabricPhoto = selectedFabricPhoto(assets, w.id);
  function fields(config: Config[]) {
    return (
      <div className="at-form-grid">
        {config.map(([key, label, type = "text", hint, options, wide]) => (
          <Field
            key={key}
            label={key.endsWith("Mm") ? `${label} (mm)` : label}
            value={w[key] as string | number}
            type={type}
            hint={
              hint ??
              (key === "fabricWidthMm" || key === "liningWidthMm"
                ? "Enter millimetres: 137 cm = 1370 mm; 140 cm = 1400 mm."
                : undefined)
            }
            options={options}
            wide={wide}
            showZero={key === "tiebackCount" || key === "hookCount"}
            required={[
              "room",
              "name",
              "widthMm",
              "longDropMm",
              "leftDropMm",
              "rightDropMm",
              "apexOffsetMm",
              "leftSlopeMm",
              "rightSlopeMm",
              "fabric",
              "fabricCode",
              "supplier",
              "colour",
              "fabricWidthMm",
              "heading",
              "fullness",
              "repeatMm",
              "manualFabricMetres",
              "cuttingPlan",
              "liningCode",
              "liningColour",
              "liningWidthMm",
              "liningDropMm",
              "interliningMetres",
              "track",
              "trackColour",
              "accessHeightMm",
              "mountingSurface",
              ...(w.lengthStyle !== "touching" ? ["lengthDetail"] : []),
              ...(w.tiebackCount > 0 ? ["tiebacks", "tiebackColour"] : []),
              ...(w.hookCount > 0 ? ["hooks"] : []),
            ].includes(key)}
            onChange={(v) =>
              update(
                key,
                (type === "number" || key === "panelCount"
                  ? Number(v)
                  : v) as never,
              )
            }
          />
        ))}
      </div>
    );
  }
  return (
    <div className="at-editor-columns">
      <div className="at-survey-main">
        <div className="at-survey-guide" ref={sectionHeading} tabIndex={-1}>
          <div className="at-survey-heading">
            <div>
              <span className="at-eyebrow">
                WINDOW {windowNumber} OF {windowCount}
              </span>
              <h2>
                {w.room || "Room name to add"}
                <span>{w.name || "Window name to add"}</span>
              </h2>
            </div>
            <span className="at-survey-completion">
              {completed} of {windowSections.length} sections complete
            </span>
          </div>
          <nav className="at-survey-sections" aria-label="Window sections">
            {windowSections.map((section, i) => {
              const count = checks.filter(
                (check) => check.section === section.id,
              ).length;
              return (
                <button
                  key={section.id}
                  type="button"
                  aria-current={tab === section.id ? "step" : undefined}
                  className={tab === section.id ? "active" : ""}
                  onClick={() => changeSection(section.id)}
                >
                  <span
                    className={`at-section-count ${count ? "" : "complete"}`}
                  >
                    {count ? i + 1 : <Check size={15} />}
                  </span>
                  <span>
                    <b>{section.name}</b>
                    <small>{count ? `${count} to complete` : "Complete"}</small>
                  </span>
                </button>
              );
            })}
          </nav>
          <p className="at-survey-help">
            Fields marked * are required before moving on. Your draft saves as
            you go.
          </p>
        </div>
        <div className="at-survey-current" aria-live="polite">
          <span className="at-eyebrow">
            SECTION {index + 1} OF {windowSections.length}
          </span>
          <h2>{windowSections[index].name}</h2>
          <p>{windowSections[index].detail}</p>
        </div>
        {remaining.length ? (
          <details className="at-section-checks">
            <summary>
              {remaining.length} {remaining.length === 1 ? "detail" : "details"}{" "}
              to complete in this section
            </summary>
            <ul>
              {remaining.map((check, i) => (
                <li key={i}>
                  {check.message.slice(check.message.indexOf(": ") + 2)}
                </li>
              ))}
            </ul>
          </details>
        ) : null}
        {tab === "measure" ? (
          <Section
            number="01"
            title="The window"
            description="A name that follows this window from survey to fitting."
          >
            {fields([
              ["room", "Room name"],
              ["name", "Window name"],
            ])}
            <label className="at-field">
              <span>Window category</span>
              <select
                aria-label="Window category"
                value={w.type}
                onChange={(e) =>
                  update("type", e.target.value as SurveyWindow["type"])
                }
              >
                <option value="apex">Apex or other shape</option>
                <option value="standard">Standard window</option>
              </select>
            </label>
            <div className="at-inline-actions">
              <button className="at-text-link" onClick={onCopy}>
                <Copy size={14} />
                Copy design to a new window
              </button>
              {onRemove ? (
                <button className="at-delete" onClick={onRemove}>
                  <Trash2 size={14} />
                  Remove window
                </button>
              ) : null}
            </div>
          </Section>
        ) : null}
        {tab === "measure" ? (
          <Section
            number="02"
            title="Measured with precision"
            description="All dimensions in millimetres. Finished drops include the chosen puddle or floor clearance."
          >
            {w.type === "apex" ? (
              <ApexMeasurements w={w} update={update} />
            ) : (
              fields([
                ["widthMm", "Full window width", "number"],
                ["longDropMm", "Finished curtain drop", "number"],
              ])
            )}
            {fields([
              [
                "lengthStyle",
                "Length finish",
                "text",
                undefined,
                ["touching", "puddle", "mid"],
              ],
              [
                "lengthDetail",
                "Exact finish detail",
                "text",
                "Puddle allowance or mid-length endpoint, in mm.",
              ],
              [
                "measurementNotes",
                "Site measurements and shape notes",
                "textarea",
                "Record measurement reference points, floor variations and additional vertical sections.",
                undefined,
                true,
              ],
            ])}
            <Toggle
              checked={w.measuredConfirmed}
              onChange={(v) => update("measuredConfirmed", v)}
            >
              I have checked the dimensions and the finished curtain shape.
            </Toggle>
          </Section>
        ) : null}
        {tab === "fabric" ? (
          <>
            <Section number="02" title="The fabric story">
              {fields([
                ["supplier", "Fabric supplier"],
                ["fabric", "Fabric / collection"],
                ["fabricCode", "Fabric reference"],
                ["colour", "Chosen colour"],
                [
                  "fabricWidthMm",
                  "Usable fabric width",
                  "number",
                  "137 cm = 1370 mm. Use the roll width for ordering; no further seam deduction is applied.",
                ],
                [
                  "heading",
                  "Heading design",
                  "text",
                  undefined,
                  [
                    "Double pinch pleat",
                    "Triple pinch pleat",
                    "Wave",
                    "Pencil pleat",
                    "Goblet",
                    "Eyelet",
                    "Bespoke heading",
                  ],
                ],
                ["fullness", "Fullness multiplier", "number"],
                [
                  "panelCount",
                  "Number of panels",
                  "text",
                  undefined,
                  ["1", "2"],
                ],
                ["opening", "Opening arrangement"],
              ])}
              <div className="at-fabric-upload">
                <span className="at-eyebrow">
                  THE ACTUAL FABRIC, BEAUTIFULLY RECORDED
                </span>
                <h3>Your fabric photograph</h3>
                <p>
                  Upload the customer&apos;s chosen fabric. Its picture appears
                  in the brochure beside the fabric name, reference and colour
                  entered above.
                </p>
                {fabricPhoto ? (
                  <figure className="at-fabric-upload-preview">
                    <img
                      src={`/api/atelier/photos/${fabricPhoto.id}`}
                      alt={`Selected fabric: ${w.fabric || "Fabric"} ${w.colour}`}
                    />
                    <figcaption>
                      <b>{w.fabric || "Add the fabric name above"}</b>
                      <span>
                        {[w.fabricCode, w.colour].filter(Boolean).join(" · ")}
                      </span>
                      <small>
                        This is the fabric photograph used in the brochure.
                      </small>
                    </figcaption>
                  </figure>
                ) : null}
                <input
                  ref={fabricInput}
                  hidden
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file)
                      void onUpload(
                        file,
                        "fabric",
                        [w.fabric, w.fabricCode, w.colour]
                          .filter(Boolean)
                          .join(" · "),
                      );
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  className="at-upload"
                  onClick={() => fabricInput.current?.click()}
                  disabled={busy || saving || demo || approved}
                >
                  <Camera size={25} />
                  <b>
                    {saving
                      ? "Saving window details…"
                      : busy
                        ? "Preparing your photograph…"
                        : fabricPhoto
                          ? "Upload a new fabric photograph"
                          : "Upload fabric photograph"}
                  </b>
                  <span>
                    {demo
                      ? "Photo uploads are available in the staff workspace."
                      : approved
                        ? "Edit and save a new draft before adding photos."
                        : "Choose or take a photo. JPG, PNG or WebP. The latest fabric photo is used."}
                  </span>
                </button>
              </div>
              <details className="at-details">
                <summary>
                  Making allowances <span>Review with the workroom</span>
                </summary>
                <Field
                  label="Total heading & hem allowance (mm)"
                  type="number"
                  value={String(q.hemAllowanceMm)}
                  onChange={(value) => update("hemAllowanceMm", Number(value))}
                  hint="26 cm = 260 mm total extra for every fabric width, including heading and bottom hem. Added to the longest finished drop before pattern matching."
                />
                {fields([
                  [
                    "sideHemMm",
                    "Each outside side hem",
                    "number",
                    "Making note only; not added to the width calculation.",
                  ],
                  [
                    "seamMm",
                    "Each joining seam",
                    "number",
                    "Making note only; not deducted from the usable roll width.",
                  ],
                  ["extraFabricMetres", "Additional fabric metres", "number"],
                  ["extraLiningMetres", "Additional lining metres", "number"],
                ])}
              </details>
            </Section>
            <Section
              number="03"
              title="Pattern and direction"
              description="Complete these details onsite when the fabric requires matching."
            >
              {fields([
                [
                  "pattern",
                  "Pattern match",
                  "text",
                  undefined,
                  ["plain", "straight", "half-drop"],
                ],
                ["direction", "Fabric direction / nap"],
                ...(w.pattern !== "plain"
                  ? ([
                      [
                        "repeatMm",
                        "Vertical repeat",
                        "number",
                        "Enter millimetres: 47.7 cm = 477 mm. Leave blank if unknown; release waits for confirmation.",
                      ],
                      ["horizontalRepeatMm", "Horizontal repeat", "number"],
                      ["motifAllowanceMm", "Initial motif allowance", "number"],
                      [
                        "patternNotes",
                        "Pattern positioning notes",
                        "textarea",
                        undefined,
                        undefined,
                        true,
                      ],
                    ] as Config[])
                  : []),
                ...(w.pattern === "half-drop" || w.horizontalRepeatMm > 0
                  ? ([
                      [
                        "manualFabricMetres",
                        "Approved matching-plan metres",
                        "number",
                      ],
                      [
                        "cuttingPlan",
                        "Matching and cutting plan",
                        "textarea",
                        "Required for half-drop or horizontal matching.",
                        undefined,
                        true,
                      ],
                    ] as Config[])
                  : []),
              ])}
            </Section>
          </>
        ) : null}
        {tab === "finish" ? (
          <>
            <Section number="01" title="The finishing layers">
              <div className="at-form-grid">
                <label className="at-field">
                  <span>
                    Lining type <span className="at-required">*</span>
                  </span>
                  <select
                    aria-label="Lining type"
                    aria-required="true"
                    value={
                      (liningOptions as readonly string[]).includes(w.lining)
                        ? w.lining
                        : ""
                    }
                    onChange={(e) =>
                      update("lining", e.target.value as SurveyWindow["lining"])
                    }
                  >
                    <option value="" disabled>
                      Choose Standard or Blackout
                    </option>
                    <option value="standard">Standard</option>
                    <option value="blackout">Blackout</option>
                  </select>
                </label>
              </div>
              {fields([
                ...(w.lining !== "none"
                  ? ([
                      ["liningCode", "Lining reference"],
                      ["liningColour", "Lining / blackout colour"],
                      ["liningWidthMm", "Usable lining width", "number"],
                    ] as Config[])
                  : []),
                ["interlining", "Interlining reference, if chosen"],
                ...(w.interlining
                  ? ([
                      [
                        "interliningMetres",
                        "Approved interlining metres",
                        "number",
                      ],
                    ] as Config[])
                  : []),
              ])}
              {w.lining !== "none" ? (
                <div className="at-form-grid">
                  <label className="at-field">
                    <span>Finished lining drop (mm)</span>
                    <input
                      aria-label="Finished lining drop (mm)"
                      readOnly
                      value={q.liningDropMm || ""}
                    />
                    <small>
                      {w.automaticLining
                        ? "The lining uses the same finished length as the curtain at its tallest point. Filled in automatically."
                        : "Previously recorded lining drop."}
                    </small>
                  </label>
                  <label className="at-field">
                    <span>Total lining hem allowance (mm)</span>
                    <input
                      aria-label="Total lining hem allowance (mm)"
                      readOnly
                      value={q.liningAllowanceMm}
                    />
                    <small>
                      {w.automaticLining
                        ? "Matches the curtain making allowance: the total extra length for the top and bottom hems of every width."
                        : "Previously recorded lining allowance."}
                    </small>
                  </label>
                  <p className="at-palette-help">
                    Lining cut length: {q.liningDropMm} + {q.liningAllowanceMm}{" "}
                    = {q.liningCutMm} mm per width.
                    {w.automaticLining
                      ? ` Order ${q.liningMetres.toFixed(2)} m of lining to match the curtain fabric${w.extraLiningMetres ? `, including ${w.extraLiningMetres} m extra lining` : ""}.`
                      : ""}
                  </p>
                </div>
              ) : null}
            </Section>
            <Section
              number="02"
              title="Tiebacks & hooks"
              description="Choose the style and finish. Set quantities to 0 where none are needed."
            >
              <div className="at-form-grid">
                <label className="at-field">
                  <span>Tieback option</span>
                  <select
                    value={
                      w.tiebacks === "Matching fabric" ? "matching" : "other"
                    }
                    onChange={(e) => {
                      update(
                        "tiebacks",
                        e.target.value === "matching" ? "Matching fabric" : "",
                      );
                      if (e.target.value === "matching")
                        update("tiebackColour", w.colour);
                    }}
                  >
                    <option value="matching">Matching</option>
                    <option value="other">Other</option>
                  </select>
                  <small>
                    Set the quantity to 0 if no tiebacks are wanted.
                  </small>
                </label>
                {w.tiebacks === "Matching fabric" ? (
                  <div className="at-field">
                    <span>Matching tieback colour</span>
                    <p className="at-selection-note">
                      {w.tiebackColour ||
                        w.colour ||
                        "Choose the colour in Fabric & pattern"}
                    </p>
                  </div>
                ) : null}
              </div>
              {fields([
                ...(w.tiebacks !== "Matching fabric"
                  ? ([
                      ["tiebacks", "Other tieback design"],
                      ["tiebackColour", "Tieback colour"],
                    ] as Config[])
                  : []),
                ["tiebackCount", "Tieback quantity", "number"],
                ["hooks", "Hook / holdback style"],
                ["hookCount", "Hook / holdback quantity", "number"],
              ])}
              <div className="at-form-grid">
                <label className="at-field">
                  <span>
                    Tieback hook finish{" "}
                    {w.hookCount > 0 ? (
                      <span className="at-required">*</span>
                    ) : null}
                  </span>
                  <select
                    aria-label="Tieback hook finish"
                    aria-required={w.hookCount > 0}
                    value={
                      (hookFinishes as readonly string[]).includes(w.hookColour)
                        ? w.hookColour
                        : ""
                    }
                    onChange={(e) => update("hookColour", e.target.value)}
                  >
                    <option value="" disabled>
                      Choose a finish
                    </option>
                    {hookFinishes.map((finish) => (
                      <option value={finish} key={finish}>
                        {finish}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {fields([
                [
                  "offcutNotes",
                  "Offcuts and tieback plan",
                  "textarea",
                  "Check size, grain and pattern before using offcuts.",
                  undefined,
                  true,
                ],
              ])}
            </Section>
          </>
        ) : null}
        {tab === "fitting" ? (
          <>
            <Section number="02" title="A considered installation">
              <span className="at-eyebrow">CHOOSE YOUR TRACK *</span>
              {forestTracks.map((track) => (
                <div className="at-track-card" key={track.id}>
                  <img
                    src={track.image}
                    alt={`${track.name}, shown in white`}
                    width={640}
                    height={489}
                  />
                  <div>
                    <span className="at-eyebrow">FOREST GROUP</span>
                    <h3>{track.label}</h3>
                    <p>{track.description}</p>
                    <small>{track.caption}</small>
                    <button
                      type="button"
                      className={`at-button ${w.trackProduct === track.id ? "at-button-secondary" : ""}`}
                      aria-pressed={w.trackProduct === track.id}
                      onClick={() => update("trackProduct", track.id)}
                    >
                      {w.trackProduct === track.id ? (
                        <>
                          <Check size={16} />
                          {track.label} selected
                        </>
                      ) : (
                        `Choose ${track.label}`
                      )}
                    </button>
                    <a
                      href={track.source}
                      target="_blank"
                      rel="noreferrer"
                      className="at-text-link"
                    >
                      View manufacturer details
                    </a>
                  </div>
                </div>
              ))}
              {!selectedTrack(w) && w.track ? (
                <p className="at-palette-help">
                  Previously recorded: {w.track}. Choose Forest CS or Forest KS
                  for this order.
                </p>
              ) : null}
              <div className="at-form-grid">
                <label className="at-field">
                  <span>
                    Track colour / finish <span className="at-required">*</span>
                  </span>
                  <select
                    aria-label="Track colour / finish"
                    aria-required="true"
                    value={
                      (trackFinishes as readonly string[]).includes(
                        w.trackColour,
                      )
                        ? w.trackColour
                        : ""
                    }
                    onChange={(e) => update("trackColour", e.target.value)}
                  >
                    <option value="" disabled>
                      Choose Black or White
                    </option>
                    {trackFinishes.map((finish) => (
                      <option key={finish} value={finish}>
                        {finish}
                      </option>
                    ))}
                  </select>
                  <small>
                    Included in the brochure, workroom sheet and fitter
                    worksheet.
                  </small>
                  {w.trackColour &&
                  !(trackFinishes as readonly string[]).includes(
                    w.trackColour,
                  ) ? (
                    <small>
                      Previously recorded: {w.trackColour}. Please confirm Black
                      or White.
                    </small>
                  ) : null}
                </label>
              </div>
              {fields([
                ["accessHeightMm", "Working / access height", "number"],
                ["mountingSurface", "Mounting surface"],
                ["tiebackPosition", "Tieback and hook positions"],
                [
                  "trackComponents",
                  "Track components and quantities",
                  "textarea",
                  undefined,
                  undefined,
                  true,
                ],
                [
                  "fittingNotes",
                  "Fitter instructions",
                  "textarea",
                  "Fixings, clearances, obstacles, ladder access and additional installers.",
                  undefined,
                  true,
                ],
              ])}
            </Section>
          </>
        ) : null}
        {tab === "care" ? (
          <>
            <Section
              number="01"
              title="Beautifully cared for"
              description="Your standard Apex care guide is included automatically for every curtain."
            >
              <div className="at-standard-care">
                <span className="at-eyebrow">INCLUDED FOR EVERY WINDOW</span>
                <h3>Dry clean only</h3>
                <p>{standardCareSummary}</p>
                <p className="at-care-included">
                  Cleaning, dressing the folds and everyday questions are
                  covered in the customer brochure. No care text is required to
                  continue.
                </p>
              </div>
              <details className="at-details at-care-guide">
                <summary>
                  Read the standard care guide{" "}
                  <span>Cleaning, dressing & everyday care</span>
                </summary>
                {careGuide.map((group) => (
                  <div key={group.id}>
                    <h3>{group.title}</h3>
                    {group.sections.map((section) => (
                      <article key={section.title}>
                        <h4>{section.title}</h4>
                        <p>{section.text}</p>
                      </article>
                    ))}
                  </div>
                ))}
              </details>
              <details className="at-details">
                <summary>
                  Additional care notes{" "}
                  <span>
                    {w.careInstructions || w.careSource
                      ? "Saved notes for this window"
                      : "Optional"}
                  </span>
                </summary>
                {fields([
                  [
                    "careSource",
                    "Additional care reference (optional)",
                    "text",
                    "Only needed if you want to record a particular supplier reference.",
                    undefined,
                    true,
                  ],
                  [
                    "careInstructions",
                    "Additional care notes (optional)",
                    "textarea",
                    "Any extra instructions for this window appear alongside the standard guide. Previously saved notes are kept here.",
                    undefined,
                    true,
                  ],
                ])}
              </details>
            </Section>
            <Section number="02" title="The room beyond the curtains">
              <Toggle
                checked={w.paletteMode === "auto"}
                onChange={(v) => {
                  if (!v) update("palette", palette.key);
                  update("paletteMode", v ? "auto" : "manual");
                }}
              >
                Suggest a palette from the chosen fabric colour
              </Toggle>
              <p className="at-palette-help" aria-live="polite">
                {palette.basis}{" "}
                {palette.needsReview
                  ? "Choose a palette below if you have a more specific direction in mind."
                  : "Select any palette below to use your own choice."}
              </p>
              <div className="at-palette-options">
                {Object.entries(palettes).map(([key, p]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={palette.key === key}
                    className={palette.key === key ? "active" : ""}
                    onClick={() => {
                      update("palette", key as SurveyWindow["palette"]);
                      update("paletteMode", "manual");
                    }}
                  >
                    <span>
                      {p.colours.map((c) => (
                        <i key={c} style={{ background: c }} />
                      ))}
                    </span>
                    {p.name}
                  </button>
                ))}
              </div>
              {fields([
                [
                  "designNotes",
                  "A personal note for this room",
                  "textarea",
                  "This appears in the customer brochure.",
                  undefined,
                  true,
                ],
              ])}
            </Section>
          </>
        ) : null}
        {tab === "photos" ? (
          <Section
            number="02"
            title="The details, captured"
            description="Window, fabric and fitting photographs stay attached to this window."
          >
            <div className="at-form-grid">
              <Field
                label="Photograph type"
                value={photoKind}
                onChange={setPhotoKind}
                options={["window", "fabric", "detail"]}
              />
              <Field label="Caption" value={caption} onChange={setCaption} />
            </div>
            <input
              ref={input}
              hidden
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  void onUpload(file, photoKind, caption).then((saved) => {
                    if (saved) setCaption("");
                  });
                e.target.value = "";
              }}
            />
            <button
              className="at-upload"
              onClick={() => input.current?.click()}
              disabled={busy || saving || demo || approved}
            >
              <Camera size={28} />
              <b>
                {saving
                  ? "Saving window details…"
                  : busy
                    ? "Preparing your photograph…"
                    : "Add a photograph"}
              </b>
              <span>
                {demo
                  ? "Photo uploads are available in the staff workspace."
                  : approved
                    ? "Edit and save a new draft before adding photos."
                    : "Choose from your device or take a photograph. JPG, PNG or WebP."}
              </span>
            </button>
            <div className="at-photo-grid">
              {assets
                .filter((a) => a.window_id === w.id)
                .map((a) => (
                  <figure key={a.id}>
                    <img
                      src={`/api/atelier/photos/${a.id}`}
                      alt={a.caption || `${a.kind} photograph`}
                    />
                    <figcaption>
                      {a.kind} · {a.caption || w.name}
                    </figcaption>
                  </figure>
                ))}
            </div>
            <Toggle checked={photoPermission} onChange={onPermission}>
              The customer agrees to their window photographs appearing in their
              personal brochure.
            </Toggle>
          </Section>
        ) : null}
        {feedback ? (
          <div
            className={`at-notice ${feedbackError ? "at-error" : ""}`}
            role="status"
            style={{ whiteSpace: "pre-line" }}
          >
            {feedback}
          </div>
        ) : null}
        <div className="at-survey-footer">
          <span className="at-survey-save" role="status">
            {saveStatus}
          </span>
          <div>
            <button
              type="button"
              className="at-button at-button-secondary"
              disabled={index === 0 && !onPreviousWindow}
              onClick={() =>
                index > 0
                  ? changeSection(windowSections[index - 1].id)
                  : onPreviousWindow?.()
              }
            >
              <ArrowLeft size={16} />
              {index === 0 && onPreviousWindow
                ? windowNumber > 1
                  ? "Previous window"
                  : "Client details"
                : "Back"}
            </button>
            <button
              type="button"
              className="at-button"
              onClick={() =>
                index < windowSections.length - 1
                  ? changeSection(windowSections[index + 1].id)
                  : onNextWindow
                    ? onNextWindow()
                    : onDocuments()
              }
            >
              {index < windowSections.length - 1
                ? `Next: ${windowSections[index + 1].name}`
                : onNextWindow
                  ? "Next window"
                  : "View the collection"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <aside className="at-window-summary">
        <span className="at-eyebrow">{shapeName(w)}</span>
        <WindowDiagram w={w} />
        <h3>
          {w.room}
          <span>{w.name}</span>
        </h3>
        <div className="at-dimension">
          <span>Coverage</span>
          <b>{w.widthMm ? `${w.widthMm.toLocaleString()} mm` : "To measure"}</b>
        </div>
        <div className="at-dimension">
          <span>Longest drop</span>
          <b>
            {w.longDropMm
              ? `${w.longDropMm.toLocaleString()} mm`
              : "To measure"}
          </b>
        </div>
        <div className="at-material-summary">
          <span className="at-eyebrow">MATERIAL ALLOWANCE</span>
          <div>
            <b>
              {q.fabricMetres.toFixed(2)}
              <small>m</small>
            </b>
            <span>Face fabric</span>
          </div>
          <div>
            <b>
              {q.liningMetres.toFixed(2)}
              <small>m</small>
            </b>
            <span>Lining</span>
          </div>
          <p>
            Full rectangular allowance at the longest drop. Suitable offcuts may
            be used for tiebacks.
          </p>
          {q.issues.length ? (
            <small className="at-warning">
              Complete the material inputs before relying on these quantities.
            </small>
          ) : (
            <small>
              {q.widths} fabric widths · {Number(q.cutMm.toFixed(2))} mm cut
              drop
              <br />
              Window width × fullness ÷ usable roll width. Fractions below 0.4
              round down; 0.4 and above round up. Minimum 1 width per window.
            </small>
          )}
        </div>
        <button className="at-text-link" onClick={onDocuments}>
          See the collection <ArrowRight size={15} />
        </button>
      </aside>
    </div>
  );
}
