import { z } from "zod";

const text = (max = 500) => z.string().trim().max(max).default("");
const mm = z.number().finite().min(0).max(30000).default(0);
const yes = z.boolean().default(false);
export const windowSchema = z.object({
  id: z.string().uuid(),
  room: text(100),
  name: text(100),
  type: z.enum(["apex", "standard"]).default("apex"),
  widthMm: mm,
  longDropMm: mm,
  leftDropMm: mm,
  rightDropMm: mm,
  apexOffsetMm: mm,
  leftSlopeMm: mm,
  rightSlopeMm: mm,
  trackHeightMm: mm,
  returnsMm: mm,
  overlapMm: mm,
  measuredConfirmed: yes,
  measurementNotes: text(2500),
  track: text(),
  trackComponents: text(2000),
  panelCount: z.union([z.literal(1), z.literal(2)]).default(2),
  opening: text(150),
  heading: text(150),
  fullness: z.number().min(1).max(4).default(2),
  lengthStyle: z.enum(["touching", "puddle", "mid"]).default("touching"),
  lengthDetail: text(200),
  supplier: text(150),
  fabric: text(200),
  fabricCode: text(150),
  colour: text(150),
  fabricWidthMm: mm,
  sideHemMm: mm,
  seamMm: mm,
  topAllowanceMm: mm,
  bottomAllowanceMm: mm,
  pattern: z.enum(["plain", "straight", "half-drop"]).default("plain"),
  repeatMm: mm,
  horizontalRepeatMm: mm,
  motifAllowanceMm: mm,
  patternNotes: text(2000),
  direction: text(300),
  manualFabricMetres: z.number().min(0).max(2000).default(0),
  cuttingPlan: text(2500),
  lining: z
    .enum(["none", "standard", "blackout", "thermal"])
    .default("blackout"),
  liningCode: text(150),
  liningColour: text(100),
  liningWidthMm: mm,
  liningDropMm: mm,
  liningAllowanceMm: mm,
  interlining: text(150),
  interliningMetres: z.number().min(0).max(2000).default(0),
  extraFabricMetres: z.number().min(0).max(100).default(0),
  extraLiningMetres: z.number().min(0).max(100).default(0),
  tiebacks: text(200),
  tiebackColour: text(100),
  tiebackCount: z.number().int().min(0).max(20).default(0),
  hooks: text(200),
  hookColour: text(100),
  hookCount: z.number().int().min(0).max(200).default(0),
  tiebackPosition: text(300),
  offcutNotes: text(1000),
  accessHeightMm: mm,
  mountingSurface: text(200),
  fittingNotes: text(2500),
  careInstructions: text(2500),
  careSource: text(300),
  palette: z.enum(["linen", "sage", "clay", "ink"]).default("linen"),
  designNotes: text(2000),
});
export const jobDataSchema = z.object({
  title: text(160),
  customerName: text(160),
  customerEmail: text(254),
  phone: text(80),
  address: text(700),
  workshopEmail: text(254),
  fitterEmail: text(254),
  surveyor: text(150),
  surveyDate: text(30),
  fittingDate: text(60),
  accessNotes: text(2000),
  extraTools: text(1500),
  welcomeNote: text(2000),
  voucherDetails: text(700),
  choicesConfirmed: yes,
  workroomConfirmed: yes,
  photoPermission: yes,
  windows: z
    .array(windowSchema)
    .min(1)
    .max(30)
    .refine(
      (windows) => new Set(windows.map((w) => w.id)).size === windows.length,
      "Window identifiers must be unique.",
    ),
});
export type SurveyWindow = z.infer<typeof windowSchema>;
export type JobData = z.infer<typeof jobDataSchema>;
export type DocumentKind = "brochure" | "workroom" | "fitter";
export type Job = {
  id: string;
  reference: string;
  version: number;
  approved_version: number | null;
  status: "draft" | "approved" | "complete";
  data: JobData;
  updated_at: string;
  completion: Record<string, boolean>;
};
export type Asset = {
  id: string;
  job_id: string;
  window_id: string;
  kind: "window" | "fabric" | "detail";
  path: string;
  caption: string;
};
export type Delivery = {
  id: string;
  revision: number;
  kind: DocumentKind;
  recipient: string;
  status: string;
  sent_at: string | null;
  error: string | null;
};

export function newWindow(
  id: string,
  type: "apex" | "standard" = "apex",
): SurveyWindow {
  return windowSchema.parse({
    id,
    type,
    name: "Main window",
    room: "Living room",
    heading: "Double pinch pleat",
    opening: "Centre opening",
    topAllowanceMm: 150,
    bottomAllowanceMm: 150,
    sideHemMm: 40,
    seamMm: 15,
    liningAllowanceMm: 150,
  });
}
export function newJobData(id: string): JobData {
  return jobDataSchema.parse({
    title: "A new curtain project",
    surveyDate: new Date().toISOString().slice(0, 10),
    windows: [newWindow(id)],
  });
}
export const palettes = {
  linen: {
    name: "Quiet neutrals",
    colours: ["#E5DDD0", "#B3A28B", "#615C50"],
    names: ["Warm chalk", "Natural linen", "Soft bronze"],
    advice:
      "Build a calm foundation with warm chalk and natural timber. Let linen, wool and softly brushed metal introduce texture. A deeper bronze or olive accent gives pale rooms definition without disturbing their quiet character.",
  },
  sage: {
    name: "Botanical calm",
    colours: ["#E2E1D5", "#99A58D", "#44594E"],
    names: ["Soft stone", "Sage leaf", "Deep olive"],
    advice:
      "Bring the garden's gentler tones indoors. Pair muted green with chalky walls, oak and textured upholstery. Repeat a deeper olive in a cushion, ceramic or artwork so the room feels connected rather than closely matched.",
  },
  clay: {
    name: "Earth and warmth",
    colours: ["#E9DCCE", "#C0947A", "#895A48"],
    names: ["Warm ivory", "Rose clay", "Terracotta"],
    advice:
      "Balance clay and terracotta with generous areas of warm ivory. Natural oak, woven textures and aged brass add depth. Use the strongest colour in smaller details, allowing the curtains to remain part of a relaxed, layered room.",
  },
  ink: {
    name: "A deeper contrast",
    colours: ["#DDDAD2", "#687A86", "#253B4A"],
    names: ["Pale stone", "Slate blue", "Midnight ink"],
    advice:
      "Set deeper blue against pale stone for a composed contrast. Warm timber and softly textured upholstery keep the palette inviting. Repeat the darkest tone sparingly in a frame, lamp or accent chair to give the room a gentle rhythm.",
  },
} as const;
export const toolsChecklist = [
  "Drill",
  "Suitable drill bits",
  "Electric screwdriver and driver bits",
  "Charged batteries and charger",
  "Ladders or specified access equipment",
  "Saw suitable for cutting tracks",
  "Tape measure and level",
  "Detector where required",
  "Protective equipment and floor covers",
  "Clean-up equipment",
];
export const materialsChecklist = [
  "Tracks labelled by room and window",
  "Track components, brackets, gliders and end stops",
  "Screws and suitable fixings",
  "Curtains labelled by room, window and panel",
  "Tiebacks in the correct colour and quantity",
  "Hooks or holdbacks in the correct finish",
];
export const handoverChecklist = [
  "Operation tested at every window",
  "Finished length and tieback positions checked",
  "Customer shown how to operate the curtains",
  "Aftercare explained and brochure provided",
  "Outstanding issues recorded",
  "Installation complete",
];
export function checklist(data: JobData) {
  return [
    ...toolsChecklist,
    ...materialsChecklist,
    ...data.extraTools
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean),
    ...handoverChecklist,
  ];
}
export function windowLabel(w: SurveyWindow) {
  return `${w.room || "Room"} · ${w.name || "Window"}`;
}
export function lengthLabel(w: SurveyWindow) {
  return (
    { touching: "Touching the floor", puddle: "Puddling", mid: "Mid length" }[
      w.lengthStyle
    ] + (w.lengthDetail ? ` — ${w.lengthDetail}` : "")
  );
}

export function calculateWindow(w: SurveyWindow) {
  const issues: string[] = [];
  const effectiveWidth = w.fabricWidthMm - 2 * w.seamMm;
  const flatWidthPerPanel =
    ((w.widthMm + w.returnsMm + w.overlapMm) / w.panelCount) * w.fullness +
    2 * w.sideHemMm;
  const widths =
    effectiveWidth > 0 && w.widthMm > 0
      ? Math.ceil(flatWidthPerPanel / effectiveWidth) * w.panelCount
      : 0;
  const baseCut = w.longDropMm + w.topAllowanceMm + w.bottomAllowanceMm;
  const cutMm =
    w.pattern === "plain"
      ? baseCut
      : w.repeatMm > 0
        ? Math.ceil(baseCut / w.repeatMm) * w.repeatMm
        : 0;
  const manual =
    w.pattern === "half-drop" ||
    (w.pattern !== "plain" && w.horizontalRepeatMm > 0);
  if (!widths) issues.push("Enter the coverage and usable roll width.");
  if (!w.longDropMm) issues.push("Enter the longest finished drop.");
  if (w.pattern !== "plain" && !w.repeatMm)
    issues.push("Confirm the vertical pattern repeat.");
  if (manual && (!w.manualFabricMetres || !w.cuttingPlan.trim()))
    issues.push(
      "Add the approved matching plan and fabric metres for this pattern.",
    );
  const baseMetres =
    (widths * cutMm + (w.pattern === "plain" ? 0 : w.motifAllowanceMm)) / 1000;
  if (manual && w.manualFabricMetres > 0 && w.manualFabricMetres < baseMetres)
    issues.push(
      "The matching-plan metres must cover the full rectangular allowance.",
    );
  const fabricMetres =
    Math.ceil(
      ((manual ? w.manualFabricMetres : baseMetres) + w.extraFabricMetres) *
        100,
    ) / 100;
  const liningEffective = w.liningWidthMm - 2 * w.seamMm;
  const liningWidths =
    w.lining !== "none" && liningEffective > 0 && w.widthMm > 0
      ? Math.ceil(flatWidthPerPanel / liningEffective) * w.panelCount
      : 0;
  const liningCutMm = w.liningDropMm + w.liningAllowanceMm;
  if (w.lining !== "none" && (!liningWidths || !w.liningDropMm))
    issues.push("Enter the lining width and finished drop.");
  const liningMetres =
    w.lining === "none"
      ? 0
      : Math.ceil(
          ((liningWidths * liningCutMm) / 1000 + w.extraLiningMetres) * 100,
        ) / 100;
  return {
    widths,
    cutMm,
    baseMetres,
    fabricMetres,
    liningWidths,
    liningCutMm,
    liningMetres,
    manual,
    issues,
  };
}

export function approvalIssues(data: JobData, assets: Asset[] = []) {
  const issues: string[] = [];
  if (!data.customerName.trim()) issues.push("Add the customer's name.");
  if (!data.address.trim()) issues.push("Add the installation address.");
  for (const [label, value] of [
    ["Customer", data.customerEmail],
    ["Workshop", data.workshopEmail],
    ["Fitter", data.fitterEmail],
  ])
    if (!z.email().safeParse(value).success)
      issues.push(`${label}: enter a valid email address.`);
  if (!data.choicesConfirmed) issues.push("Confirm the customer's choices.");
  if (!data.workroomConfirmed)
    issues.push("Confirm the workroom has reviewed the cutting allowances.");
  const labels = new Set<string>();
  for (const w of data.windows) {
    const label = windowLabel(w),
      key = `${w.room.trim().toLowerCase()}|${w.name.trim().toLowerCase()}`;
    if (!w.room || !w.name || labels.has(key))
      issues.push(`${label}: use a unique room and window name.`);
    labels.add(key);
    if (!w.measuredConfirmed)
      issues.push(`${label}: confirm the measurements.`);
    if (
      w.type === "apex" &&
      (!w.leftDropMm ||
        !w.rightDropMm ||
        !w.leftSlopeMm ||
        !w.rightSlopeMm ||
        w.longDropMm < Math.max(w.leftDropMm, w.rightDropMm) ||
        w.apexOffsetMm <= 0 ||
        w.apexOffsetMm >= w.widthMm)
    )
      issues.push(`${label}: check the apex drops, position and both slopes.`);
    if (!w.fabric || !w.fabricCode || !w.supplier || !w.colour)
      issues.push(`${label}: complete the fabric specification.`);
    if (!w.heading || !w.track || !w.mountingSurface || !w.accessHeightMm)
      issues.push(
        `${label}: complete the heading, track, fixing surface and access height.`,
      );
    if (w.lengthStyle !== "touching" && !w.lengthDetail)
      issues.push(
        `${label}: specify the puddle allowance or mid-length endpoint.`,
      );
    if (w.lining !== "none" && (!w.liningCode || !w.liningColour))
      issues.push(`${label}: add the lining reference and colour.`);
    if (w.interlining && !w.interliningMetres)
      issues.push(`${label}: enter the interlining metres.`);
    if (w.tiebackCount && (!w.tiebacks || !w.tiebackColour))
      issues.push(`${label}: complete the tieback details.`);
    if (w.hookCount && (!w.hooks || !w.hookColour))
      issues.push(`${label}: complete the hook details.`);
    if (w.careInstructions.length < 20 || !w.careSource)
      issues.push(
        `${label}: add supplier-approved care instructions and their source.`,
      );
    if (!assets.some((a) => a.window_id === w.id && a.kind === "window"))
      issues.push(`${label}: add a window photograph.`);
    issues.push(...calculateWindow(w).issues.map((s) => `${label}: ${s}`));
  }
  return issues;
}

export function sampleJob(): Job {
  const first = newWindow("b287b2ce-5c38-4336-bca6-81ef31a209d1");
  const data = newJobData(first.id);
  Object.assign(first, {
    room: "Drawing room",
    name: "Garden apex",
    widthMm: 3200,
    longDropMm: 3600,
    leftDropMm: 2400,
    rightDropMm: 2400,
    apexOffsetMm: 1600,
    leftSlopeMm: 2000,
    rightSlopeMm: 2000,
    accessHeightMm: 3800,
    fabricWidthMm: 1400,
    supplier: "Illustrative collection",
    fabric: "Textured linen",
    fabricCode: "SAMPLE-01",
    colour: "Warm flax",
    liningCode: "SAMPLE-BLACKOUT",
    liningColour: "Ivory",
    liningWidthMm: 1400,
    liningDropMm: 3550,
    track: "Made-to-measure apex track",
    mountingSurface: "To be confirmed onsite",
    tiebacks: "Matching fabric",
    tiebackColour: "Warm flax",
    tiebackCount: 2,
    hooks: "Classic holdback",
    hookColour: "Antique brass",
    hookCount: 2,
    palette: "linen",
    designNotes:
      "Soft, generous folds echo the height of the glazing, with warm natural tones that sit quietly beside the garden.",
  });
  const second = {
    ...first,
    id: "d3e54284-37fb-4b89-954e-36d4230e4592",
    room: "Principal bedroom",
    name: "Main window",
    type: "standard" as const,
    widthMm: 2200,
    longDropMm: 2600,
    liningDropMm: 2550,
    colour: "Soft sage",
    palette: "sage" as const,
    track: "Ceiling-mounted track",
  };
  Object.assign(data, {
    title: "The garden house",
    customerName: "An illustrative client",
    address: "Sample project · no customer information",
    surveyor: "Apex design team",
    windows: [first, second],
  });
  return {
    id: "fb0a38d4-a4a4-4229-afb2-e8428af2db30",
    reference: "APX-SAMPLE",
    version: 1,
    approved_version: null,
    status: "draft",
    data,
    updated_at: new Date().toISOString(),
    completion: {},
  };
}
