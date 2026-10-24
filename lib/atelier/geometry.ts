export const apexShapes = [
  {
    id: "double",
    name: "Two-sided apex",
    hint: "Two slants meeting at one peak",
  },
  {
    id: "flat-top",
    name: "Flat-top apex",
    hint: "Two slants with a flat section between",
  },
  {
    id: "triangle",
    name: "Triangular window",
    hint: "Two slants meeting the bottom baseline",
  },
  {
    id: "single-left",
    name: "Single apex · high left",
    hint: "One slant falling from left to right",
  },
  {
    id: "single-right",
    name: "Single apex · high right",
    hint: "One slant rising from left to right",
  },
  {
    id: "other",
    name: "Other shape",
    hint: "Type the measurements and describe the shape",
  },
] as const;
export type ApexShape = (typeof apexShapes)[number]["id"];

export type GeometryInput = {
  type: "apex" | "standard";
  apexShape: ApexShape;
  apexPosition: "centre" | "offset";
  automaticSlants: boolean;
  widthMm: number;
  longDropMm: number;
  leftDropMm: number | null;
  rightDropMm: number | null;
  middleDropMm: number | null;
  apexOffsetMm: number;
  flatTopWidthMm: number;
  leftSlopeMm: number;
  rightSlopeMm: number;
  otherShapeMeasurements: string;
};

export const isSingleApex = (w: GeometryInput) =>
  w.apexShape === "single-left" || w.apexShape === "single-right";
export const shapeName = (w: GeometryInput) =>
  w.type === "standard"
    ? "Standard window"
    : apexShapes.find((shape) => shape.id === w.apexShape)!.name;

export function windowGeometry(w: GeometryInput) {
  const issues: string[] = [],
    warnings: string[] = [];
  const single = isSingleApex(w);
  const middle = single ? w.middleDropMm : w.longDropMm;
  const left = w.leftDropMm,
    right = w.rightDropMm;
  const longest = single
    ? Math.max(left ?? 0, right ?? 0, middle ?? 0)
    : w.longDropMm;
  const flat = w.apexShape === "flat-top" ? w.flatTopWidthMm : 0;
  const offset =
    w.apexPosition === "centre" ? (w.widthMm - flat) / 2 : w.apexOffsetMm;
  let leftSlant: number | null = null,
    rightSlant: number | null = null;
  if (!(w.widthMm > 0)) issues.push("Enter the full window width.");
  if (w.type === "standard" || w.apexShape === "other") {
    if (!(w.longDropMm > 0)) issues.push("Enter the longest finished drop.");
    if (w.type === "apex" && !w.otherShapeMeasurements.trim())
      issues.push("Type the measurements and describe the other window shape.");
    return {
      issues,
      warnings,
      longest: w.longDropMm,
      middle: w.longDropMm,
      offset: null,
      flat: 0,
      leftSlant,
      rightSlant,
    };
  }
  if (left === null || !Number.isFinite(left) || left < 0)
    issues.push(
      "Enter the left-side height (enter 0 if it meets the baseline).",
    );
  if (right === null || !Number.isFinite(right) || right < 0)
    issues.push(
      "Enter the right-side height (enter 0 if it meets the baseline).",
    );
  if (middle === null || !(middle > 0)) issues.push("Enter the middle height.");
  if (single) {
    if (left !== null && right !== null) {
      if (w.apexShape === "single-left" ? left <= right : right <= left)
        issues.push(
          "Check which side is highest, or choose the other single-apex direction.",
        );
      if (
        middle !== null &&
        (middle < Math.min(left, right) || middle > Math.max(left, right))
      )
        issues.push(
          "The middle height must lie between the two side heights for a single straight slant.",
        );
      if (middle !== null && Math.abs(middle - (left + right) / 2) > 5)
        warnings.push(
          `At half the width, a straight slant gives a middle height of ${(left + right) / 2} mm. Check your measurement from the same level baseline.`,
        );
    }
  } else {
    if (
      middle !== null &&
      left !== null &&
      right !== null &&
      middle <= Math.max(left, right)
    )
      issues.push("The middle height must be higher than both sides.");
    if (w.apexShape === "triangle" && (left !== 0 || right !== 0))
      issues.push(
        "For a triangle, record both end heights as 0 from its bottom baseline. Choose a two-sided apex if it has vertical sides.",
      );
    if (w.apexShape === "flat-top" && (!(flat > 0) || flat >= w.widthMm))
      issues.push("Enter a flat-top width smaller than the full window width.");
    if (!(offset > 0) || offset + flat >= w.widthMm)
      issues.push("Place the peak or flat top inside the full window width.");
  }
  if (!issues.length && left !== null && right !== null && middle !== null) {
    if (single) {
      const slant = Math.round(Math.hypot(w.widthMm, left - right));
      if (w.apexShape === "single-left") leftSlant = slant;
      else rightSlant = slant;
    } else {
      leftSlant = Math.round(Math.hypot(offset, middle - left));
      rightSlant = Math.round(
        Math.hypot(w.widthMm - offset - flat, middle - right),
      );
    }
  }
  return {
    issues,
    warnings,
    longest,
    middle,
    offset: single ? null : offset,
    flat,
    leftSlant,
    rightSlant,
  };
}

// Recalculate at both the input boundary and the server schema boundary. A
// caller cannot submit stale/manual slants as an automatically calculated job.
export function normaliseGeometry<T extends GeometryInput>(w: T): T {
  if (w.type !== "apex" || !w.automaticSlants || w.apexShape === "other")
    return w;
  const g = windowGeometry(w);
  return {
    ...w,
    longDropMm: g.longest,
    apexOffsetMm: g.offset ?? 0,
    leftSlopeMm: g.leftSlant ?? 0,
    rightSlopeMm: g.rightSlant ?? 0,
  };
}

const dimension = (value: number | null) =>
  value === null ? "TBC" : `${value} mm`;
export function geometryMeasurements(w: GeometryInput) {
  if (w.type === "standard")
    return `${w.widthMm || "TBC"} mm width; ${w.longDropMm || "TBC"} mm finished drop`;
  if (w.apexShape === "other")
    return `Other shape; ${w.widthMm || "TBC"} mm overall width; ${w.longDropMm || "TBC"} mm longest drop; see the typed shape measurements`;
  const g = windowGeometry(w);
  return `${shapeName(w)}; width ${dimension(w.widthMm || null)}; left ${dimension(w.leftDropMm)}; middle ${dimension(g.middle || null)}; right ${dimension(w.rightDropMm)}; longest ${dimension(g.longest || null)}`;
}
export function geometrySlants(w: GeometryInput) {
  if (w.type !== "apex") return "Horizontal track.";
  if (w.apexShape === "other")
    return "Manual shape measurements; no automatic slant calculation.";
  const g = windowGeometry(w);
  if (!w.automaticSlants)
    return `Recorded slants: left ${dimension(w.leftSlopeMm || null)}; right ${dimension(w.rightSlopeMm || null)}; apex offset ${dimension(w.apexOffsetMm || null)}`;
  const values = isSingleApex(w)
    ? `Slant ${dimension(g.leftSlant ?? g.rightSlant)}`
    : `Left slant ${dimension(g.leftSlant)}; right slant ${dimension(g.rightSlant)}; ${w.apexShape === "flat-top" ? `flat top ${dimension(g.flat)}; flat top starts` : "peak"} ${dimension(g.offset)} from left`;
  return `${values}. Calculated from the entered dimensions, rounded to the nearest mm.`;
}

// Normalised outline shared by the on-screen and PDF diagrams. Unknown/custom
// shapes deliberately have no invented outline.
export function windowOutline(w: GeometryInput): [number, number][] | null {
  if (w.type === "standard")
    return [
      [0, 1],
      [0, 0],
      [1, 0],
      [1, 1],
    ];
  if (w.apexShape === "other") return null;
  const g = windowGeometry(w),
    valid = !g.issues.length;
  const left = valid
    ? (w.leftDropMm ?? 0) / g.longest
    : w.apexShape === "triangle"
      ? 0
      : 0.55;
  const right = valid
    ? (w.rightDropMm ?? 0) / g.longest
    : w.apexShape === "triangle"
      ? 0
      : 0.55;
  if (isSingleApex(w))
    return [
      [0, 1],
      [0, valid ? 1 - left : w.apexShape === "single-left" ? 0 : 0.5],
      [1, valid ? 1 - right : w.apexShape === "single-right" ? 0 : 0.5],
      [1, 1],
    ];
  const start = valid
    ? (g.offset ?? 0) / w.widthMm
    : w.apexShape === "flat-top"
      ? 0.3
      : 0.5;
  const end = valid ? ((g.offset ?? 0) + g.flat) / w.widthMm : 0.7;
  return [
    [0, 1],
    [0, 1 - left],
    [start, 0],
    ...(w.apexShape === "flat-top" ? [[end, 0] as [number, number]] : []),
    [1, 1 - right],
    [1, 1],
  ];
}
