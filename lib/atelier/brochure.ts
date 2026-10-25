import {
  palettes,
  lengthLabel,
  type JobData,
  type SurveyWindow,
} from "./model";
import { shapeName } from "./geometry";

export type BrochureDetail = { label: string; value: string };

export function brochureRooms(windows: SurveyWindow[]) {
  const rooms = new Map<string, { room: string; windows: SurveyWindow[] }>();
  for (const window of windows) {
    const room = window.room.trim() || "Your room";
    const key = room.toLocaleLowerCase("en-GB");
    if (!rooms.has(key)) rooms.set(key, { room, windows: [] });
    rooms.get(key)!.windows.push(window);
  }
  return [...rooms.values()];
}
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

/** Keep each recorded choice once, in a clearly named reading section. */
export function brochureSpecificationSections(w: SurveyWindow) {
  const details = brochureSpecification(w);
  const groups = [
    {
      id: "fabric",
      title: "Your fabric",
      labels: ["Your fabric", "Fabric colour", "Pattern matching"],
    },
    {
      id: "fit",
      title: "Heading & fit",
      labels: [
        "Heading design",
        "Curtain arrangement",
        "Length finish",
        "Finished measurements",
      ],
    },
    {
      id: "lining",
      title: "Your lining",
      labels: ["Lining & colour", "Interlining"],
    },
    {
      id: "finishing",
      title: "Finishing touches",
      labels: ["Tiebacks", "Hooks / holdbacks"],
    },
    {
      id: "track",
      title: "Your track",
      labels: ["Track design", "Track colour / finish"],
    },
  ];
  const grouped = groups.map(({ id, title, labels }) => ({
    id,
    title,
    items: details.filter((item) => labels.includes(item.label)),
  }));
  const assigned = new Set(groups.flatMap((group) => group.labels));
  const notes = details.filter((item) => !assigned.has(item.label));
  return notes.length
    ? [
        ...grouped,
        { id: "notes", title: "The individual details", items: notes },
      ]
    : grouped;
}
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

export function designStory(w: SurveyWindow): BrochureDetail[] {
  const heading = /wave/i.test(w.heading)
    ? "A continuous sequence of soft folds brings a clean, architectural rhythm to the window. Keep the forward and backward folds in sequence when dressing."
    : /pinch|pleat/i.test(w.heading)
      ? "The sewn pleats give the top of the curtain a tailored structure, allowing the cloth below to fall in generous, organised folds."
      : "The chosen heading shapes the way the fabric gathers and falls. Follow its natural folds when opening, closing and dressing the curtains.";
  return [
    {
      label: "The cloth & colour",
      value: `${w.fabric || "Your chosen fabric"} in ${w.colour || "your selected colour"} is the starting point for this room. ${w.pattern === "plain" ? "With no pattern repeat to compete for attention, the colour, texture and fall of the cloth become the focus." : "The recorded pattern repeat and positioning guide the composition across the curtain panels."}`,
    },
    {
      label: "The shape of the folds",
      value: `${w.heading || "Your selected heading"}, with ${w.fullness}× fullness. ${heading}`,
    },
    {
      label: "Light & privacy",
      value:
        w.lining === "blackout"
          ? `Your ${w.liningColour || "chosen-colour"} blackout lining helps limit light passing through the fabric. Light may still enter around the edges and centre opening; the overall effect also depends on the window and fitting.`
          : w.lining === "none"
            ? "An unlined finish keeps the chosen cloth as the single layer at the window. Light transmission and privacy depend on the fabric and the light on either side."
            : `The ${w.liningColour || "chosen-colour"} ${w.lining} lining forms the inner layer of your curtains. View the physical sample against the light to judge the combined fabric's appearance and privacy.`,
    },
    {
      label: "The final silhouette",
      value: `${lengthLabel(w)}. ${w.lengthStyle === "puddle" ? "Let the extra cloth rest in loose folds on a clean floor, with space around the curtain to preserve its shape." : w.lengthStyle === "mid" ? "The shorter finish keeps the lower part of the window arrangement open and follows the endpoint recorded in your specification." : "The hem is intended to meet the floor gently, completing a long, continuous line from the heading."} ${w.tiebackCount ? `${w.tiebackCount} ${w.tiebacks.toLowerCase()} tiebacks in ${w.tiebackColour || "the selected colour"} complete the open arrangement.` : "The open arrangement is designed without tiebacks."}`,
    },
  ];
}

export function interiorGuide(w: SurveyWindow): BrochureDetail[] {
  const p = brochurePalette(w);
  return [
    {
      label: "01 / Begin with the backdrop",
      value: `Consider ${p.names[0].toLowerCase()} for walls and larger surfaces. Test a generous paint sample beside your ${w.colour || "chosen"} curtain fabric, checking both window light and the lamps you use in the evening.`,
    },
    {
      label: "02 / Build a softer middle layer",
      value: `Explore ${p.names[1].toLowerCase()} in upholstery, a rug or a throw. ${w.pattern === "plain" ? "Use contrasting textures to add depth: a smooth cushion beside a more tactile weave can be enough." : "Give the curtain pattern room to breathe by pairing it with quieter plains or a different, smaller pattern scale."}`,
    },
    {
      label: "03 / Repeat one considered accent",
      value: `Bring ${p.names[2].toLowerCase()} into a small detail such as artwork, a cushion edge or ceramics. A restrained repetition across the room will feel more coherent than matching every item.`,
    },
    { label: "04 / Connect the finishing touches", value: p.finishingAdvice },
  ];
}

export function interiorExample(w: SurveyWindow) {
  const p = brochurePalette(w);
  const bedroom = /bed|nursery|guest/i.test(w.room);
  return {
    title: `An example for ${w.room || "your room"}`,
    text: `With ${w.colour || "your chosen"} curtains, try ${p.names[0].toLowerCase()} walls, ${p.names[1].toLowerCase()} ${bedroom ? "bedding or a textured throw" : "upholstery or a textured rug"}, and a small ${p.names[2].toLowerCase()} accent in ${bedroom ? "a cushion and bedside ceramic" : "a cushion and a piece of artwork"}. ${w.pattern === "plain" ? "Vary the textures to keep the scheme interesting." : "Keep the larger furnishings plain so the curtain pattern has room to be seen."}`,
    light:
      "Place paint, upholstery and curtain samples together at the window. Check them in daylight and under your evening lamps before committing.",
    finish: p.finishingAdvice,
  };
}

export const installationGuide: BrochureDetail[] = [
  {
    label: "Before we arrive",
    value:
      "Keep the route to each window clear and move small furniture, ornaments and fragile items away from the working area. Let Apex know about access restrictions or any changes to the room since the survey. Leave high-level work and heavy curtains to the fitting team.",
  },
  {
    label: "At your handover",
    value:
      "Ask your fitter to show you how your particular track operates, which panels move and which remain fixed, and how to release the tiebacks and dress the folds. Review the heading, opening and hem position together against your chosen specification.",
  },
  {
    label: "As the curtains settle",
    value:
      "Allow the fabric to hang naturally and follow the dressing guide in this collection. Gentle daily use helps the folds settle; release tiebacks and keep the cloth clear of nearby furniture. Keep this booklet with your fabric details for everyday care and future reference.",
  },
];

export const paletteSampleNote =
  "These swatches suggest complementary interior colours; they are not exact fabric or paint matches. Compare physical samples in your room in daylight and evening light before choosing.";

export const apexWebsite = "https://www.apexcurtains.com";
export const brochureImages = {
  homepage: "/atelier-images/apex-homepage.webp",
  swatches: "/atelier-images/fabric-swatch-still-life.webp",
  voucher: "/atelier-images/apex-voucher.webp",
  studio: "/atelier-images/apex-colour-studio.webp",
  colour: "/guides/colour-wheel.svg",
  fabric: "/fabrics/oslo/linen.jpg",
  pencil: "/headings/pencil-pleat.jpeg",
  pinch: "/headings/pinch-pleat.jpg",
  wave: "/headings/wave-pleat.jpg",
} as const;

export const homePromise = {
  title: "Respect for your home.",
  introduction:
    "Your home holds the things that matter to you. Being invited into it is a privilege, and the care we give your surroundings should be as considered as the curtains we create.",
  details: [
    {
      label: "Care before the first fixing",
      value:
        "We agree the working area and access with you, protect nearby surfaces and consider the furniture, flooring and treasured things around your window.",
    },
    {
      label: "Consideration in every detail",
      value:
        "We check the fitting positions and work carefully around your room. If anything needs to change, we talk it through with you before proceeding.",
    },
    {
      label: "A thoughtful finish",
      value:
        "We leave the working area tidy, dress the curtains and take you through their operation and care, so you can feel at home with every detail.",
    },
  ],
};

export const headingGallery = [
  {
    id: "pencil",
    name: "Pencil pleat",
    image: brochureImages.pencil,
    description:
      "Slender, closely gathered folds with a relaxed, softly tailored character.",
  },
  {
    id: "pinch",
    name: "Double pinch pleat",
    image: brochureImages.pinch,
    description:
      "Paired, sewn pleats bring definition and a composed rhythm to the heading.",
  },
  {
    id: "wave",
    name: "Wave",
    image: brochureImages.wave,
    description: "Smooth, continuous folds create a clean and flowing line.",
  },
] as const;

export const websiteFeatures = [
  {
    id: "studio",
    title: "Find your palette",
    path: "/curtain-colours-and-tones#colour-explorer",
    image: brochureImages.studio,
    alt: "Screenshot of the Apex colour studio with its colour wheel and neutral interior palette",
    description:
      "Explore colour families and discover how fabric, walls and furnishings can work together.",
    caption: "From our online colour studio · an illustrative palette",
  },
  {
    id: "fabric",
    title: "A world of texture",
    path: "/curtain-fabrics",
    image: brochureImages.fabric,
    alt: "Oslo Linen fabric texture from the Apex fabric guide",
    description:
      "Explore fabric, drape and the Oslo collection, then compare physical samples in your own light.",
    caption:
      "Oslo Linen · Prestigious Textiles · an example, not your selection",
  },
  {
    id: "colour",
    title: "Colour relationships",
    path: "/curtain-colours-and-tones#colour-wheel",
    image: brochureImages.colour,
    alt: "The colour wheel from the Apex Colour & Interiors guide",
    description:
      "Discover complementary tones and practical ideas for walls, furnishings and finishing touches.",
    caption: "The Apex colour guide · illustrative colour relationships",
  },
] as const;
