"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { Camera, Copy, Trash2, ArrowRight } from "lucide-react";
import { Field, Section, Toggle, WindowDiagram } from "./Fields";
import { brochurePalette } from "@/lib/atelier/brochure";
import {
  palettes,
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
  demo,
  approved,
  photoPermission,
  onPermission,
}: {
  w: SurveyWindow;
  assets: Asset[];
  update: <K extends keyof SurveyWindow>(
    key: K,
    value: SurveyWindow[K],
  ) => void;
  onCopy: () => void;
  onRemove?: () => void;
  onDocuments: () => void;
  onUpload: (file: File, kind: string, caption: string) => Promise<void>;
  busy: boolean;
  demo: boolean;
  approved: boolean;
  photoPermission: boolean;
  onPermission: (v: boolean) => void;
}) {
  const [tab, setTab] = useState("measure"),
    [photoKind, setPhotoKind] = useState("window"),
    [caption, setCaption] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const q = calculateWindow(w);
  const palette = brochurePalette(w);
  function fields(config: Config[]) {
    return (
      <div className="at-form-grid">
        {config.map(([key, label, type = "text", hint, options, wide]) => (
          <Field
            key={key}
            label={label}
            value={w[key] as string | number}
            type={type}
            hint={hint}
            options={options}
            wide={wide}
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
      <div>
        <Section
          number="01"
          title="The window"
          description="A name that follows this window from survey to fitting."
        >
          {fields([
            ["room", "Room name"],
            ["name", "Window name"],
            ["type", "Window type", "text", undefined, ["apex", "standard"]],
          ])}
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
        <nav className="at-subtabs" aria-label="Window details">
          {[
            ["measure", "Measurements"],
            ["design", "Fabric & finish"],
            ["fitting", "Fitting & care"],
            ["photos", "Photographs"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={tab === id ? "active" : ""}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        {tab === "measure" ? (
          <Section
            number="02"
            title="Measured with precision"
            description="All dimensions in millimetres. Finished drops include the chosen puddle or floor clearance."
          >
            {fields([
              [
                "widthMm",
                "Approved horizontal coverage",
                "number",
                "Full rectangular width used for material calculations.",
              ],
              [
                "longDropMm",
                w.type === "apex"
                  ? "Longest finished drop at apex"
                  : "Finished curtain drop",
                "number",
              ],
              ...(w.type === "apex"
                ? ([
                    ["leftDropMm", "Left short drop", "number"],
                    ["rightDropMm", "Right short drop", "number"],
                    ["apexOffsetMm", "Apex position from left", "number"],
                    ["leftSlopeMm", "Left sloping track length", "number"],
                    ["rightSlopeMm", "Right sloping track length", "number"],
                  ] as Config[])
                : []),
              ["trackHeightMm", "Track mounting height", "number"],
              ["returnsMm", "Total returns allowance", "number"],
              ["overlapMm", "Total overlap allowance", "number"],
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
        {tab === "design" ? (
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
                  "After selvedges; seam allowance is deducted separately.",
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
              ])}
              <details className="at-details">
                <summary>
                  Making allowances <span>Review with the workroom</span>
                </summary>
                {fields([
                  ["topAllowanceMm", "Heading allowance", "number"],
                  ["bottomAllowanceMm", "Bottom hem allowance", "number"],
                  ["sideHemMm", "Each outside side hem", "number"],
                  ["seamMm", "Each joining seam", "number"],
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
                        "Leave blank if unknown; release waits for confirmation.",
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
            <Section number="04" title="The finishing layers">
              {fields([
                [
                  "lining",
                  "Lining type",
                  "text",
                  undefined,
                  ["none", "standard", "blackout", "thermal"],
                ],
                ...(w.lining !== "none"
                  ? ([
                      ["liningCode", "Lining reference"],
                      ["liningColour", "Lining / blackout colour"],
                      ["liningWidthMm", "Usable lining width", "number"],
                      [
                        "liningDropMm",
                        "Longest finished lining drop",
                        "number",
                      ],
                      [
                        "liningAllowanceMm",
                        "Lining making allowance",
                        "number",
                      ],
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
                ["tiebacks", "Tieback design"],
                ["tiebackColour", "Tieback colour"],
                ["tiebackCount", "Tieback quantity", "number"],
                ["hooks", "Hook / holdback style"],
                ["hookColour", "Hook / holdback finish"],
                ["hookCount", "Hook / holdback quantity", "number"],
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
              {fields([
                ["track", "Track specification"],
                [
                  "trackColour",
                  "Track colour / finish",
                  "text",
                  "For example: matt white, black or brushed brass. Included in all three documents.",
                ],
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
            <Section number="03" title="Care that belongs to this fabric">
              {fields([
                [
                  "careSource",
                  "Care guidance source",
                  "text",
                  "Supplier reference, document or approved specification.",
                  undefined,
                  true,
                ],
                [
                  "careInstructions",
                  "Approved aftercare instructions",
                  "textarea",
                  "Check face fabric, lining, coatings and trims together.",
                  undefined,
                  true,
                ],
              ])}
            </Section>
            <Section number="04" title="The room beyond the curtains">
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
                  void onUpload(file, photoKind, caption).then(() =>
                    setCaption(""),
                  );
                e.target.value = "";
              }}
            />
            <button
              className="at-upload"
              onClick={() => input.current?.click()}
              disabled={busy || demo || approved}
            >
              <Camera size={28} />
              <b>{busy ? "Preparing your photograph…" : "Add a photograph"}</b>
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
      </div>
      <aside className="at-window-summary">
        <span className="at-eyebrow">
          {w.type === "apex" ? "APEX WINDOW" : "STANDARD WINDOW"}
        </span>
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
              {q.widths} fabric widths · {q.cutMm} mm cut drop
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
