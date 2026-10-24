import assert from "node:assert/strict";
import test from "node:test";
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
