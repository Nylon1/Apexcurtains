import assert from "node:assert/strict";
import test from "node:test";
import {
  brochurePalette,
  brochureSpecification,
  customerDetails,
} from "../lib/atelier/brochure";
import {
  calculateWindow,
  sampleJob,
  jobDataSchema,
  approvalIssues,
} from "../lib/atelier/model";

test("apex material uses a full rectangle at the longest drop", () => {
  const w = sampleJob().data.windows[0];
  const q = calculateWindow(w);
  assert.equal(q.widths, 6);
  assert.equal(q.cutMm, 3900);
  assert.equal(q.fabricMetres, 23.4);
  assert.equal(q.liningMetres, 22.2);
  assert.equal(
    calculateWindow({ ...w, leftDropMm: 1000, rightDropMm: 1500 }).fabricMetres,
    q.fabricMetres,
  );
});

test("brochure palette follows the current colour and preserves consultant overrides", () => {
  const w = sampleJob().data.windows[0];
  for (const [colour, key] of [
    ["Warm flax", "linen"],
    ["Soft sage", "sage"],
    ["Terracotta", "clay"],
    ["Midnight navy", "ink"],
    ["Dusty blush", "rose"],
    ["Silver grey", "slate"],
    ["Muted mauve", "plum"],
    ["Golden ochre", "ochre"],
  ]) {
    const palette = brochurePalette({ ...w, colour });
    assert.equal(palette.key, key);
    assert.ok(palette.basis.includes(colour));
    assert.equal(palette.needsReview, false);
  }
  const manual = brochurePalette({
    ...w,
    colour: "Soft sage",
    palette: "ink",
    paletteMode: "manual",
  });
  assert.equal(manual.key, "ink");
  assert.ok(manual.finishingAdvice.includes(w.trackColour));
  assert.ok(manual.finishingAdvice.includes(w.hookColour));
  for (const colour of ["Collection 742", "Blue and pink", ""]) {
    const unknown = brochurePalette({ ...w, colour });
    assert.equal(unknown.key, "linen");
    assert.equal(unknown.needsReview, true);
  }
});

test("existing saved palettes survive schema upgrades without inventing a track finish", () => {
  const data = sampleJob().data;
  const { paletteMode, trackColour, ...legacy } = data.windows[0];
  void paletteMode;
  void trackColour;
  const restored = jobDataSchema.parse({
    ...data,
    windows: [{ ...legacy, palette: "clay" }],
  }).windows[0];
  assert.equal(restored.paletteMode, "manual");
  assert.equal(brochurePalette(restored).key, "clay");
  assert.equal(restored.trackColour, "");
  assert.ok(
    brochureSpecification(restored).some(
      (d) =>
        d.label === "Track colour / finish" && d.value === "To be confirmed",
    ),
  );
  assert.ok(
    approvalIssues({ ...data, windows: [restored] }).some((s) =>
      s.includes("track colour"),
    ),
  );
});

test("client brochure includes personal details and chosen finishes without internal recipients", () => {
  const data = {
    ...sampleJob().data,
    customerEmail: "client@example.invalid",
    workshopEmail: "private-workshop@example.invalid",
    fitterEmail: "private-fitter@example.invalid",
  };
  const identity = customerDetails(data)
    .map((d) => d.value)
    .join("\n");
  for (const value of [data.customerName, data.address, data.customerEmail])
    assert.ok(identity.includes(value));
  assert.ok(!identity.includes(data.workshopEmail));
  assert.ok(!identity.includes(data.fitterEmail));
  const w = {
    ...data.windows[1],
    pattern: "straight" as const,
    repeatMm: 640,
    direction: "Nap down",
    patternNotes: "Centre the floral motif",
    trackComponents: "Brass finials",
    interlining: "Cotton bump",
    tiebackPosition: "900 mm from floor",
  };
  const spec = brochureSpecification(w)
    .map((d) => d.value)
    .join("\n");
  for (const value of [
    w.supplier,
    w.fabricCode,
    w.colour,
    w.heading,
    w.opening,
    w.track,
    w.trackColour,
    w.liningCode,
    w.liningColour,
    w.tiebacks,
    w.tiebackColour,
    w.hooks,
    w.hookColour,
    w.interlining,
    w.direction,
    w.patternNotes,
    w.trackComponents,
    w.tiebackPosition,
    "640 mm",
  ])
    assert.ok(spec.includes(value), value);
  const none = brochureSpecification({
    ...w,
    lining: "none",
    tiebackCount: 0,
    hookCount: 0,
  });
  assert.equal(
    none.find((d) => d.label === "Lining & colour")?.value,
    "Unlined",
  );
  assert.equal(
    none.find((d) => d.label === "Tiebacks")?.value,
    "None selected",
  );
  assert.equal(
    none.find((d) => d.label === "Hooks / holdbacks")?.value,
    "None selected",
  );
});
test("straight repeats round every cut up and include extra allowances", () => {
  const w = {
    ...sampleJob().data.windows[0],
    pattern: "straight" as const,
    repeatMm: 640,
    motifAllowanceMm: 300,
    extraFabricMetres: 1,
  };
  const q = calculateWindow(w);
  assert.equal(q.cutMm, 4480);
  assert.equal(q.fabricMetres, 28.18);
  assert.ok(
    calculateWindow({ ...w, repeatMm: 0 }).issues.some((i) =>
      i.includes("repeat"),
    ),
  );
});
test("complex patterns require a matching plan covering the rectangular baseline", () => {
  const w = {
    ...sampleJob().data.windows[0],
    pattern: "half-drop" as const,
    repeatMm: 500,
  };
  assert.equal(calculateWindow(w).manual, true);
  assert.ok(calculateWindow(w).issues.some((i) => i.includes("matching plan")));
  assert.ok(
    calculateWindow({
      ...w,
      cuttingPlan: "Approved",
      manualFabricMetres: 10,
    }).issues.some((i) => i.includes("rectangular")),
  );
  assert.deepEqual(
    calculateWindow({ ...w, cuttingPlan: "Approved", manualFabricMetres: 26 })
      .issues,
    [],
  );
  assert.equal(
    calculateWindow({ ...w, pattern: "plain", horizontalRepeatMm: 100 }).manual,
    false,
  );
});
test("lining has its own width and does not receive face fabric pattern repeats", () => {
  const w = {
    ...sampleJob().data.windows[0],
    pattern: "straight" as const,
    repeatMm: 640,
    liningWidthMm: 2800,
  };
  const q = calculateWindow(w);
  assert.equal(q.liningWidths, 4);
  assert.equal(q.liningMetres, 14.8);
  assert.equal(calculateWindow({ ...w, lining: "none" }).liningMetres, 0);
});
test("invalid measurements and duplicate window identities cannot be saved", () => {
  const d = sampleJob().data;
  assert.equal(
    jobDataSchema.safeParse({ ...d, windows: [d.windows[0], d.windows[0]] })
      .success,
    false,
  );
  assert.equal(
    jobDataSchema.safeParse({
      ...d,
      windows: [{ ...d.windows[0], widthMm: -1 }],
    }).success,
    false,
  );
  assert.equal(jobDataSchema.safeParse({ ...d, windows: [] }).success, false);
});
test("release requires recipients, confirmed measurements, care and photographs", () => {
  const issues = approvalIssues(sampleJob().data);
  for (const fragment of [
    "Customer:",
    "Workshop:",
    "Fitter:",
    "confirm the measurements",
    "care instructions",
    "photograph",
  ])
    assert.ok(
      issues.some((i) => i.includes(fragment)),
      fragment,
    );
});
