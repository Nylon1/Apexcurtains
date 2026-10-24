import assert from "node:assert/strict";
import test from "node:test";
import { navigationChecks } from "../lib/atelier/navigation";
import { selectedTrack } from "../lib/atelier/tracks";
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
  approvalChecklist,
  selectedFabricPhoto,
  type Asset,
} from "../lib/atelier/model";

test("guided survey blocks missing prerequisites and points to the right window and section", () => {
  const data = sampleJob().data;
  data.customerEmail = "client@example.invalid";
  data.workshopEmail = "workroom@example.invalid";
  data.fitterEmail = "fitter@example.invalid";
  for (const w of data.windows) {
    w.measuredConfirmed = true;
    w.careSource = "Approved supplier care sheet";
    w.careInstructions =
      "Use the supplier-approved specialist cleaning service.";
  }
  const assets = data.windows.map((w, i) => ({
    id: `photo-${i}`,
    job_id: "test",
    window_id: w.id,
    kind: "window" as const,
    path: "test",
    caption: "",
  }));
  assert.equal(navigationChecks(data, assets, { step: "documents" }).length, 0);
  // Optional appointments, notes and fabric photos do not prevent progress.
  assert.equal(data.fittingDate, "");
  data.windows[0].widthMm = 0;
  data.windows[0].measuredConfirmed = false;
  let checks = navigationChecks(data, assets, {
    step: "windows",
    windowId: data.windows[0].id,
    section: "fabric",
  });
  assert.ok(checks.length > 0);
  assert.ok(
    checks.every(
      (c) => c.windowId === data.windows[0].id && c.section === "measure",
    ),
  );
  assert.ok(
    navigationChecks(data, assets, {
      step: "windows",
      windowId: data.windows[1].id,
    }).length > 0,
  );
  assert.equal(navigationChecks(data, assets, { step: "customer" }).length, 0);
  assert.equal(navigationChecks(data, assets, { step: "delivery" }).length, 0);
  data.customerEmail = "unfinished@";
  checks = navigationChecks(data, assets, {
    step: "windows",
    windowId: data.windows[0].id,
  });
  assert.ok(checks.some((c) => c.step === "customer"));
});

test("pattern, lining and photo requirements are routed to actionable sections", () => {
  const data = sampleJob().data;
  const w = data.windows[0];
  w.pattern = "half-drop";
  w.repeatMm = 0;
  w.liningDropMm = 0;
  const checks = approvalChecklist(data).filter((c) => c.windowId === w.id);
  assert.ok(
    checks.some((c) => c.section === "fabric" && c.message.includes("repeat")),
  );
  assert.ok(
    checks.some(
      (c) => c.section === "fabric" && c.message.includes("matching plan"),
    ),
  );
  assert.ok(
    checks.some(
      (c) => c.section === "finish" && c.message.includes("lining width"),
    ),
  );
  assert.ok(checks.some((c) => c.section === "photos"));
  assert.deepEqual(
    approvalIssues(data),
    approvalChecklist(data).map((c) => c.message),
  );
  const live = navigationChecks(data, [], { step: "documents" });
  const demo = navigationChecks(data, [], { step: "documents" }, true);
  assert.ok(live.some((c) => c.section === "photos"));
  assert.ok(!demo.some((c) => c.section === "photos"));
});

test("Forest KS illustration is explicit and legacy tracks remain unchanged", () => {
  const data = sampleJob().data;
  const { trackProduct, ...legacy } = data.windows[1];
  void trackProduct;
  const restored = jobDataSchema.parse({ ...data, windows: [legacy] })
    .windows[0];
  assert.equal(restored.trackProduct, "custom");
  assert.equal(selectedTrack(restored), undefined);
  assert.equal(selectedTrack(data.windows[1])?.id, "forest-ks");
});

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

test("brochure uses the most recent fabric photo for the correct window and keeps snapshots stable", () => {
  const [first, second] = sampleJob().data.windows;
  const photo = (
    id: string,
    window_id: string,
    kind: Asset["kind"],
  ): Asset => ({
    id,
    window_id,
    kind,
    job_id: "fixture",
    path: id,
    caption: "Fixture",
  });
  const frozen = [
    photo("old", first.id, "fabric"),
    photo("window", first.id, "window"),
    photo("other-room", second.id, "fabric"),
  ];
  const draft = [...frozen, photo("new", first.id, "fabric")];
  assert.equal(selectedFabricPhoto(draft, first.id)?.id, "new");
  assert.equal(selectedFabricPhoto(draft, second.id)?.id, "other-room");
  assert.equal(selectedFabricPhoto(frozen, first.id)?.id, "old");
  assert.equal(selectedFabricPhoto([], first.id), undefined);
});

test("new releases accept only the chosen lining and tieback hook options", () => {
  const data = sampleJob().data;
  const w = data.windows[0];
  for (const lining of ["standard", "blackout"] as const) {
    assert.ok(
      !approvalIssues({ ...data, windows: [{ ...w, lining }] }).some((s) =>
        s.includes("choose Standard"),
      ),
    );
  }
  assert.ok(
    approvalIssues({ ...data, windows: [{ ...w, lining: "thermal" }] }).some(
      (s) => s.includes("choose Standard"),
    ),
  );
  for (const hookColour of ["Bronze", "Silver chrome", "Black"]) {
    assert.ok(
      !approvalIssues({ ...data, windows: [{ ...w, hookColour }] }).some((s) =>
        s.includes("choose Bronze"),
      ),
    );
  }
  assert.ok(
    approvalIssues({
      ...data,
      windows: [{ ...w, hookColour: "Antique brass" }],
    }).some((s) => s.includes("choose Bronze")),
  );
});
