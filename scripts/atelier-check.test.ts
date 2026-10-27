import assert from "node:assert/strict";
import test from "node:test";
import { additionalCareWindows } from "../lib/atelier/care";
import {
  windowGeometry,
  normaliseGeometry,
  windowOutline,
  geometrySlants,
} from "../lib/atelier/geometry";
import { navigationChecks } from "../lib/atelier/navigation";
import { selectedTrack } from "../lib/atelier/tracks";
import {
  brochurePalette,
  brochureSpecification,
  brochureSpecificationSections,
  brochureRooms,
  interiorExample,
  customerDetails,
} from "../lib/atelier/brochure";
import {
  calculateWindow,
  applyDraftAllowances,
  sampleJob,
  jobDataSchema,
  approvalIssues,
  approvalChecklist,
  selectedFabricPhoto,
  type Asset,
} from "../lib/atelier/model";

test("two-sided apex and flat tops use each horizontal run and side height", () => {
  const base = {
    ...sampleJob().data.windows[0],
    widthMm: 6000,
    longDropMm: 5000,
    leftDropMm: 1000,
    rightDropMm: 1000,
  };
  const symmetric = windowGeometry(base);
  assert.deepEqual(symmetric.issues, []);
  assert.equal(symmetric.leftSlant, 5000);
  assert.equal(symmetric.rightSlant, 5000);
  const offset = windowGeometry({
    ...base,
    apexPosition: "offset",
    apexOffsetMm: 2000,
    rightDropMm: 2000,
  });
  assert.equal(offset.leftSlant, 4472);
  assert.equal(offset.rightSlant, 5000);
  const flat = windowGeometry({
    ...base,
    apexShape: "flat-top",
    flatTopWidthMm: 2000,
  });
  assert.equal(flat.offset, 2000);
  assert.equal(flat.leftSlant, 4472);
  assert.equal(flat.rightSlant, 4472);
  const unequal = windowGeometry({
    ...base,
    apexShape: "flat-top",
    flatTopWidthMm: 1000,
    apexPosition: "offset",
    apexOffsetMm: 2000,
  });
  assert.equal(unequal.leftSlant, 4472);
  assert.equal(unequal.rightSlant, 5000);
});

test("triangles distinguish a required explicit zero from a missing side height", () => {
  const triangle = {
    ...sampleJob().data.windows[0],
    apexShape: "triangle" as const,
    widthMm: 6000,
    longDropMm: 4000,
    leftDropMm: 0,
    rightDropMm: 0,
  };
  const g = windowGeometry(triangle);
  assert.deepEqual(g.issues, []);
  assert.equal(g.leftSlant, 5000);
  assert.equal(g.rightSlant, 5000);
  assert.equal(
    windowGeometry({ ...triangle, leftDropMm: null }).leftSlant,
    null,
  );
  assert.ok(
    windowGeometry({ ...triangle, leftDropMm: null }).issues.some((i) =>
      i.includes("left-side"),
    ),
  );
  assert.ok(
    windowGeometry({ ...triangle, rightDropMm: 100 }).issues.some((i) =>
      i.includes("triangle"),
    ),
  );
});

test("single slopes require all three heights and use the longest drop for fabric", () => {
  const base = {
    ...sampleJob().data.windows[0],
    widthMm: 3000,
    longDropMm: 1,
    leftDropMm: 5000,
    rightDropMm: 1000,
    middleDropMm: 3000,
    apexShape: "single-left" as const,
  };
  const g = windowGeometry(base);
  assert.deepEqual(g.issues, []);
  assert.equal(g.leftSlant, 5000);
  assert.equal(g.rightSlant, null);
  assert.equal(normaliseGeometry(base).longDropMm, 5000);
  assert.equal(calculateWindow(base).cutMm, 5260);
  const right = windowGeometry({
    ...base,
    apexShape: "single-right",
    leftDropMm: 1000,
    rightDropMm: 5000,
  });
  assert.equal(right.leftSlant, null);
  assert.equal(right.rightSlant, 5000);
  assert.ok(
    windowGeometry({ ...base, middleDropMm: null }).issues.some((i) =>
      i.includes("middle"),
    ),
  );
  assert.equal(windowGeometry({ ...base, middleDropMm: 6000 }).leftSlant, null);
  assert.ok(windowGeometry({ ...base, middleDropMm: 3100 }).warnings.length);
  assert.ok(
    windowGeometry({ ...base, apexShape: "single-right" }).issues.length,
  );
});

test("invalid apex geometry clears slants and blocks the next section", () => {
  const data = sampleJob().data;
  const base = data.windows[0];
  for (const edit of [
    { widthMm: 0 },
    { leftDropMm: null },
    { rightDropMm: null },
    { longDropMm: 0 },
    { longDropMm: 2000 },
    { apexPosition: "offset" as const, apexOffsetMm: 4000 },
    { apexShape: "flat-top" as const, flatTopWidthMm: 0 },
    { apexShape: "flat-top" as const, flatTopWidthMm: 4000 },
  ]) {
    const w = { ...base, ...edit };
    assert.equal(normaliseGeometry(w).leftSlopeMm, 0);
    assert.equal(normaliseGeometry(w).rightSlopeMm, 0);
    const checks = approvalChecklist({ ...data, windows: [w] });
    assert.ok(
      checks.some(
        (c) =>
          c.section === "measure" &&
          !c.message.includes("confirm the measurements"),
      ),
    );
  }
});

test("Other shape preserves typed measurements without inventing a diagram or slants", () => {
  const data = sampleJob().data;
  const w = {
    ...data.windows[0],
    apexShape: "other" as const,
    leftDropMm: null,
    rightDropMm: null,
    otherShapeMeasurements:
      "Arched top: 3200 mm wide; spring line 2400 mm; crown 3600 mm.",
  };
  assert.deepEqual(windowGeometry(w).issues, []);
  assert.equal(windowGeometry(w).leftSlant, null);
  assert.equal(windowOutline(w), null);
  assert.equal(calculateWindow(w).fabricMetres, 19.3);
  assert.equal(
    jobDataSchema.parse({ ...data, windows: [w] }).windows[0]
      .otherShapeMeasurements,
    w.otherShapeMeasurements,
  );
  assert.ok(
    approvalChecklist({
      ...data,
      windows: [{ ...w, otherShapeMeasurements: "" }],
    }).some(
      (c) =>
        c.section === "measure" && c.message.includes("Type the measurements"),
    ),
  );
  assert.ok(geometrySlants(w).includes("no automatic"));
});

test("server recomputes automatic slants but preserves historical manually recorded values", () => {
  const data = sampleJob().data;
  const w = data.windows[0];
  const parsed = jobDataSchema.parse({
    ...data,
    windows: [{ ...w, leftSlopeMm: 999, rightSlopeMm: 999 }],
  }).windows[0];
  assert.equal(parsed.leftSlopeMm, 2000);
  assert.equal(parsed.rightSlopeMm, 2000);
  const large = jobDataSchema.parse({
    ...data,
    windows: [
      {
        ...w,
        widthMm: 30000,
        longDropMm: 30000,
        leftDropMm: 0,
        rightDropMm: 0,
      },
    ],
  });
  assert.equal(large.windows[0].leftSlopeMm, 33541);
  assert.equal(jobDataSchema.parse(large).windows[0].leftSlopeMm, 33541);
  const legacy = { ...w } as Record<string, unknown>;
  for (const key of [
    "apexShape",
    "apexPosition",
    "automaticSlants",
    "middleDropMm",
    "flatTopWidthMm",
    "otherShapeMeasurements",
  ])
    delete legacy[key];
  legacy.leftSlopeMm = 2015;
  const restored = jobDataSchema.parse({ ...data, windows: [legacy] })
    .windows[0];
  assert.equal(restored.automaticSlants, false);
  assert.equal(restored.apexPosition, "offset");
  assert.equal(restored.leftSlopeMm, 2015);
  assert.ok(geometrySlants(restored).includes("2015 mm"));
  assert.ok(
    approvalChecklist({ ...data, windows: [restored] }).some((c) =>
      c.message.includes("apply automatic"),
    ),
  );
});

test("guided survey blocks missing prerequisites and points to the right window and section", () => {
  const data = sampleJob().data;
  data.customerEmail = "client@example.invalid";
  data.workshopEmail = "workroom@example.invalid";
  data.fitterEmail = "fitter@example.invalid";
  for (const w of data.windows) {
    w.measuredConfirmed = true;
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
  w.liningWidthMm = 0;
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

test("Forest track illustrations follow the chosen system and legacy tracks remain unchanged", () => {
  const data = sampleJob().data;
  const { trackProduct, ...legacy } = data.windows[1];
  void trackProduct;
  const restored = jobDataSchema.parse({ ...data, windows: [legacy] })
    .windows[0];
  assert.equal(restored.trackProduct, "custom");
  assert.equal(selectedTrack(restored), undefined);
  assert.equal(selectedTrack(data.windows[1])?.id, "forest-ks");
  assert.equal(selectedTrack(data.windows[0])?.id, "forest-cs");
  for (const trackProduct of ["forest-cs", "forest-ks"] as const) {
    for (const trackColour of ["Black", "White"]) {
      const saved = jobDataSchema.parse({
        ...data,
        windows: [
          {
            ...data.windows[0],
            trackProduct,
            trackColour,
            track: "Stale track name",
          },
        ],
      });
      assert.equal(
        saved.windows[0].track,
        selectedTrack({ trackProduct })?.name,
      );
      assert.ok(!approvalChecklist(saved).some((c) => c.section === "fitting"));
    }
  }
  const legacyColour = jobDataSchema.parse({
    ...data,
    windows: [{ ...data.windows[0], trackColour: "Warm white" }],
  });
  assert.equal(legacyColour.windows[0].trackColour, "Warm white");
  assert.ok(
    approvalIssues(legacyColour).some((message) =>
      message.includes("choose Black or White"),
    ),
  );
  assert.ok(
    approvalIssues({ ...data, windows: [restored] }).some((message) =>
      message.includes("choose Forest CS or Forest KS"),
    ),
  );
});

test("whole-window widths use Apex's 0.4 threshold without rounding each panel", () => {
  const w = {
    ...sampleJob().data.windows[0],
    fabricWidthMm: 1370,
    liningWidthMm: 1370,
  };
  for (const [widthMm, expected] of [
    [1410, 2],
    [1370, 2],
    [1360, 2],
    [1637.15, 2],
    [1644, 3],
    [2330, 4],
    [2328, 3],
    [3014, 5],
  ] as const) {
    for (const panelCount of [1, 2] as const) {
      const q = calculateWindow({ ...w, widthMm, panelCount });
      assert.equal(
        q.widths,
        expected,
        `window ${widthMm}, panels ${panelCount}`,
      );
      assert.equal(q.liningWidths, expected);
    }
  }
  // Exact thresholds at 1.4, 2.4, 3.4 and 4.4 must round up, not be lost to
  // floating-point subtraction. Values just below remain on the lower width.
  for (const whole of [1, 2, 3, 4]) {
    const thresholdWidth = ((whole + 0.4) * 1000) / 2;
    assert.equal(
      calculateWindow({ ...w, widthMm: thresholdWidth, fabricWidthMm: 1000 })
        .widths,
      whole + 1,
    );
    assert.equal(
      calculateWindow({
        ...w,
        widthMm: thresholdWidth - 0.01,
        fabricWidthMm: 1000,
      }).widths,
      whole,
    );
  }
  assert.equal(calculateWindow({ ...w, widthMm: 100 }).widths, 1);
  assert.equal(calculateWindow({ ...w, widthMm: 0 }).widths, 0);
  assert.equal(calculateWindow({ ...w, fabricWidthMm: 0 }).widths, 0);
  assert.equal(calculateWindow({ ...w, widthMm: 1410, fullness: 3 }).widths, 3);
  assert.equal(
    calculateWindow({
      ...w,
      widthMm: 1410,
      returnsMm: 200,
      overlapMm: 100,
      seamMm: 50,
      sideHemMm: 100,
    }).widths,
    2,
  );
});

test("137 cm roll examples retain longest drops, 26 cm hems and entered pattern repeats", () => {
  const w = {
    ...sampleJob().data.windows[0],
    type: "standard" as const,
    fabricWidthMm: 1370,
    liningWidthMm: 1370,
    pattern: "straight" as const,
  };
  for (const [widthMm, longDropMm, repeatMm, expectedCut, expectedMetres] of [
    [1410, 2140, 47.7, 2432.7, 4.87],
    [1410, 2140, 477, 2862, 5.73],
    [1370, 2090, 477, 2385, 4.77],
    [1360, 1470, 477, 1908, 3.82],
  ]) {
    const q = calculateWindow({ ...w, widthMm, longDropMm, repeatMm });
    assert.equal(q.widths, 2);
    assert.equal(q.cutMm, expectedCut);
    assert.equal(q.fabricMetres, expectedMetres);
    assert.equal(q.liningMetres, expectedMetres);
  }
});

test("apex material uses a full rectangle at the longest drop", () => {
  const w = sampleJob().data.windows[0];
  const q = calculateWindow(w);
  assert.equal(q.widths, 5);
  assert.equal(q.cutMm, 3860);
  assert.equal(q.fabricMetres, 19.3);
  assert.equal(q.liningMetres, 19.3);
  assert.equal(
    calculateWindow({ ...w, leftDropMm: 1000, rightDropMm: 1500 }).fabricMetres,
    q.fabricMetres,
  );
});

test("26 cm is added once per width before pattern rounding and historic approved allowances remain intact", () => {
  const data = sampleJob().data;
  const w = data.windows[0];
  const q = calculateWindow(w);
  assert.equal(q.hemAllowanceMm, 260);
  assert.equal(q.baseMetres, (q.widths * (w.longDropMm + 260)) / 1000);
  assert.equal(
    calculateWindow({ ...w, pattern: "straight", repeatMm: 200 }).cutMm,
    4000,
  );
  const legacy = jobDataSchema.parse({
    ...data,
    windows: [{ ...w, hemAllowanceMm: null }],
  });
  assert.equal(calculateWindow(legacy.windows[0]).hemAllowanceMm, 300);
  assert.equal(
    calculateWindow(applyDraftAllowances(legacy).windows[0]).hemAllowanceMm,
    260,
  );
  assert.equal(legacy.windows[0].hemAllowanceMm, null);
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
  assert.deepEqual(
    brochureSpecificationSections(w)
      .flatMap((section) => section.items)
      .sort((a, b) => a.label.localeCompare(b.label)),
    brochureSpecification(w).sort((a, b) => a.label.localeCompare(b.label)),
    "Every specification value appears exactly once in the grouped boxes",
  );
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
test("brochure groups interleaved rooms without losing windows or their own colour advice", () => {
  const [first, second] = sampleJob().data.windows;
  const windows = [
    first,
    second,
    {
      ...first,
      id: "third",
      room: ` ${first.room.toUpperCase()} `,
      name: "Side window",
      colour: "Deep blue",
    },
  ];
  const rooms = brochureRooms(windows);
  assert.equal(rooms.length, 2);
  assert.deepEqual(
    rooms.flatMap((room) => room.windows).map((w) => w.id),
    [first.id, "third", second.id],
  );
  assert.equal(
    windows[1].id,
    second.id,
    "Grouping must not mutate the survey order",
  );
  assert.ok(interiorExample(windows[2]).text.includes("Deep blue curtains"));
  assert.ok(interiorExample(second).text.includes("bedding"));
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
  assert.equal(q.fabricMetres, 23.7);
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
test("lining cutting uses its roll width while ordering matches curtain fabric including pattern allowance", () => {
  const w = {
    ...sampleJob().data.windows[0],
    pattern: "straight" as const,
    repeatMm: 640,
    liningWidthMm: 2800,
  };
  const q = calculateWindow(w);
  assert.equal(q.liningWidths, 2);
  assert.equal(q.liningDropMm, 3600);
  assert.equal(q.liningAllowanceMm, 260);
  assert.equal(q.liningCutMm, 3860);
  assert.equal(q.liningCuttingMetres, 7.72);
  assert.equal(q.liningMetres, q.fabricMetres);
  assert.equal(q.liningMetres, 22.4);
  assert.equal(calculateWindow({ ...w, lining: "none" }).liningMetres, 0);
});

test("lining follows changed curtain drop and allowance, checks narrow rolls and preserves historical approved figures", () => {
  const data = sampleJob().data;
  const w = {
    ...data.windows[0],
    type: "standard" as const,
    longDropMm: 3000,
    hemAllowanceMm: 300,
  };
  const q = calculateWindow(w);
  assert.equal(q.liningDropMm, 3000);
  assert.equal(q.liningAllowanceMm, 300);
  assert.equal(q.liningCutMm, 3300);
  assert.equal(q.liningMetres, q.fabricMetres);
  const narrow = { ...w, liningWidthMm: 1000 };
  const nq = calculateWindow(narrow);
  assert.ok(
    nq.checks.some(
      (c) => c.section === "finish" && c.message.includes("more metres"),
    ),
  );
  assert.deepEqual(
    calculateWindow({
      ...narrow,
      extraLiningMetres: nq.liningCuttingMetres - nq.liningMetres,
    }).issues,
    [],
  );
  const legacy = jobDataSchema.parse({
    ...data,
    windows: [
      {
        ...w,
        automaticLining: null,
        liningDropMm: 2950,
        liningAllowanceMm: 150,
      },
    ],
  });
  assert.equal(calculateWindow(legacy.windows[0]).liningCutMm, 3100);
  assert.equal(calculateWindow(legacy.windows[0]).liningMetres, 15.5);
  const draft = applyDraftAllowances(legacy);
  assert.equal(draft.windows[0].liningDropMm, 3000);
  assert.equal(draft.windows[0].liningAllowanceMm, 300);
  assert.equal(calculateWindow(draft.windows[0]).liningMetres, 16.5);
  assert.equal(legacy.windows[0].liningDropMm, 2950);
});
test("an oversized width blocks navigation with a usable units message", () => {
  const d = sampleJob().data;
  for (const type of ["apex", "standard"] as const) {
    const w = { ...d.windows[0], type, widthMm: 34000 };
    assert.equal(
      jobDataSchema.safeParse({ ...d, windows: [w] }).success,
      false,
    );
    assert.ok(
      approvalChecklist({ ...d, windows: [w] }).some(
        (c) => c.section === "measure" && c.message.includes("3400 mm"),
      ),
    );
    assert.equal(
      jobDataSchema.safeParse({ ...d, windows: [{ ...w, widthMm: 3400 }] })
        .success,
      true,
    );
  }
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
test("release requires recipients, confirmed measurements and photographs", () => {
  const issues = approvalIssues(sampleJob().data);
  for (const fragment of [
    "Customer:",
    "Workshop:",
    "Fitter:",
    "confirm the measurements",
    "photograph",
  ])
    assert.ok(
      issues.some((i) => i.includes(fragment)),
      fragment,
    );
});

test("standard care needs no per-window input and preserves optional saved notes", () => {
  const data = sampleJob().data;
  assert.equal(additionalCareWindows(data.windows).length, 0);
  assert.ok(!approvalChecklist(data).some((c) => c.section === "care"));
  const notes = "Protect the decorative leading edge from snagging.";
  data.windows[0].careInstructions = notes;
  data.windows[0].careSource = "Supplier trim reference";
  const saved = jobDataSchema.parse(data);
  assert.equal(additionalCareWindows(saved.windows).length, 1);
  assert.equal(saved.windows[0].careInstructions, notes);
  assert.equal(saved.windows[0].careSource, "Supplier trim reference");
  assert.equal(saved.windows[1].careInstructions, "");
  assert.ok(!approvalChecklist(saved).some((c) => c.section === "care"));
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
