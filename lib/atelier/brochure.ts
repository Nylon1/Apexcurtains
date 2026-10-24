import {
  palettes,
  lengthLabel,
  type JobData,
  type SurveyWindow,
} from "./model";
import { shapeName } from "./geometry";

export type BrochureDetail = { label: string; value: string };
const join = (...values: string[]) => values.filter(Boolean).join(" · ");
const recorded = (value: string) => value || "To be confirmed";

export function customerDetails(data: JobData): BrochureDetail[] {
  return [
    { label: "Prepared exclusively for", value: recorded(data.customerName) },
    {
      label: "Your home / installation address",
      value: recorded(data.address),
    },
    ...(data.customerEmail
      ? [{ label: "Your email", value: data.customerEmail }]
      : []),
    ...(data.phone ? [{ label: "Your telephone", value: data.phone }] : []),
    ...(data.surveyor
      ? [{ label: "Your Apex consultant", value: data.surveyor }]
      : []),
    ...(data.fittingDate
      ? [{ label: "Installation arrangements", value: data.fittingDate }]
      : []),
  ];
}

/** The same customer-facing specification drives the live preview and PDF. */
export function brochureSpecification(w: SurveyWindow): BrochureDetail[] {
  return [
    {
      label: "Your fabric",
      value: join(w.supplier, w.fabric, w.fabricCode) || "To be chosen",
    },
    { label: "Fabric colour", value: recorded(w.colour) },
    {
      label: "Heading design",
      value: `${recorded(w.heading)} · ${w.fullness}× fullness`,
    },
    {
      label: "Curtain arrangement",
      value: `${w.panelCount === 2 ? "A pair of curtains" : "One curtain panel"} · ${recorded(w.opening)}`,
    },
    { label: "Length finish", value: lengthLabel(w) },
    {
      label: "Finished measurements",
      value: `${shapeName(w)} · ${w.widthMm || "TBC"} mm coverage · ${w.longDropMm || "TBC"} mm ${w.type === "apex" ? "longest " : ""}drop`,
    },
    { label: "Track design", value: recorded(w.track) },
    { label: "Track colour / finish", value: recorded(w.trackColour) },
    {
      label: "Lining & colour",
      value:
        w.lining === "none"
          ? "Unlined"
          : join(
              `${w.lining[0].toUpperCase()}${w.lining.slice(1)} lining`,
              recorded(w.liningColour),
              w.liningCode,
            ),
    },
    { label: "Interlining", value: w.interlining || "None selected" },
    {
      label: "Tiebacks",
      value: w.tiebackCount
        ? `${w.tiebackCount} × ${recorded(w.tiebacks)} · ${recorded(w.tiebackColour)}`
        : "None selected",
    },
    {
      label: "Hooks / holdbacks",
      value: w.hookCount
        ? `${w.hookCount} × ${recorded(w.hooks)} · ${recorded(w.hookColour)}`
        : "None selected",
    },
    {
      label: "Pattern matching",
      value:
        w.pattern === "plain"
          ? "Plain / no pattern matching"
          : join(
              w.pattern === "straight" ? "Straight repeat" : "Half-drop repeat",
              `${w.repeatMm || "TBC"} mm vertical repeat`,
              w.horizontalRepeatMm
                ? `${w.horizontalRepeatMm} mm horizontal repeat`
                : "",
            ),
    },
    ...(w.direction ? [{ label: "Fabric direction", value: w.direction }] : []),
    ...(w.patternNotes
      ? [{ label: "Pattern positioning", value: w.patternNotes }]
      : []),
    ...(w.tiebackPosition
      ? [{ label: "Tieback & hook positions", value: w.tiebackPosition }]
      : []),
    ...(w.trackComponents
      ? [{ label: "Track details", value: w.trackComponents }]
      : []),
  ];
}

type PaletteKey = keyof typeof palettes;
const colourFamilies: [PaletteKey, RegExp][] = [
  [
    "linen",
    /\b(linen|flax|ivory|cream|beige|oatmeal|oat|sand|stone|taupe|neutral|white|ecru|mushroom|brown|chocolate|mocha|espresso)\b/i,
  ],
  ["sage", /\b(sage|green|olive|moss|fern|eucalyptus|emerald|forest|khaki)\b/i],
  [
    "clay",
    /\b(clay|terracotta|rust|copper|coral|orange|cinnamon|red|burgundy|wine)\b/i,
  ],
  [
    "ink",
    /\b(blue|navy|ink|denim|indigo|teal|turquoise|duck egg|petrol|aqua)\b/i,
  ],
  ["rose", /\b(pink|blush|rose|rosy|peony)\b/i],
  ["slate", /\b(grey|gray|charcoal|silver|graphite|black|slate)\b/i],
  ["plum", /\b(plum|purple|mauve|lilac|lavender|aubergine|violet|amethyst)\b/i],
  ["ochre", /\b(ochre|yellow|mustard|gold|golden|honey|amber|saffron)\b/i],
];

export function brochurePalette(w: SurveyWindow) {
  const matches = colourFamilies.filter(([, pattern]) =>
    pattern.test(w.colour),
  );
  // Ambiguous / supplier-only names need a consultant's choice, not a guessed match.
  const recognised = matches.length === 1;
  const key: PaletteKey =
    w.paletteMode === "manual"
      ? w.palette
      : recognised
        ? matches[0][0]
        : "linen";
  const fabric = w.colour ? `your ${w.colour} fabric` : "your fabric selection";
  const basis =
    w.paletteMode === "manual"
      ? `A palette selected by your Apex consultant to accompany ${fabric}.`
      : recognised
        ? `An interior palette inspired by ${fabric}.`
        : `A quiet neutral starting point to consider alongside ${fabric}. Your consultant can refine this using the physical sample.`;
  const finishes = [
    w.trackColour ? `the ${w.trackColour} track finish` : "",
    w.tiebackCount && w.tiebackColour ? `${w.tiebackColour} tiebacks` : "",
    w.hookCount && w.hookColour ? `${w.hookColour} hooks or holdbacks` : "",
  ].filter(Boolean);
  return {
    key,
    ...palettes[key],
    basis,
    needsReview: w.paletteMode === "auto" && !recognised,
    finishingAdvice: finishes.length
      ? `Bring ${finishes.join(", ")} into the conversation when choosing lighting, handles and smaller accessories. A subtle echo of one finish can make the room feel beautifully connected.`
      : "Consider lighting, handles and smaller accessories alongside your fabric. A subtle echo of one finish can make the room feel beautifully connected.",
  };
}

export function roomIntroduction(w: SurveyWindow) {
  return (
    w.designNotes ||
    `For ${w.room || "this room"}, ${w.colour || "your chosen colour"} sets the mood. ${w.heading || "Your chosen heading"} gives the fabric its rhythm, with ${lengthLabel(w).toLowerCase()} completing the silhouette. Each detail belongs to the same thoughtful composition.`
  );
}

export const paletteSampleNote =
  "These swatches suggest complementary interior colours; they are not exact fabric or paint matches. Compare physical samples in your room in daylight and evening light before choosing.";
export const generalAftercare =
  "Draw curtains gently using the intended cord, wand or leading edge, keeping hands clean and dry. Keep the folds free of furniture and sharp edges. Follow the supplier-approved instructions below before cleaning, steaming or applying heat, and ask Apex if anything is unclear.";
