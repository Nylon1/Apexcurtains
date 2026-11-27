import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";
import { POST as countEnquiry } from "../app/api/enquiry-count/[event]/route";
import { reviewedAdvice } from "../lib/advice-editorial";
import { POST } from "../app/api/send-lead/route";
import { architecturalGuides } from "../lib/architectural-curtains";
import { MAX_PROJECT_UPLOAD_BYTES, parseArchitecturalEnquiry, resolveProjectType } from "../lib/architectural-enquiry";
import { estimateCurtainWeight } from "../lib/curtain-weight";

function brief(type = "residential") {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    journey: "architectural",
    type,
    name: "Preview QA",
    email: "qa@example.com",
    postcode: "SW1A 1AA",
    property: "Apartment or penthouse",
    shape: "Rectangular",
    height: "5",
    drop: "4.8",
    installation: "Survey and installation",
  })) form.set(key, value);
  return form;
}

function submit(body: FormData, headers?: HeadersInit) {
  return POST(new Request("http://localhost/api/send-lead", { method: "POST", body, headers }));
}

test("each guide owns a unique route and section anchors", () => {
  const guides = Object.values(architecturalGuides);
  assert.equal(new Set(guides.map((guide) => guide.path)).size, guides.length);
  for (const { sections } of guides) {
    assert.equal(new Set(sections.map(({ id }) => id)).size, sections.length);
  }
});

test("weight includes both layers, approximates retained material, and scales with fullness and length", () => {
  const input = { width: 5, drop: 4, fullness: 2, fabric: 280, lining: 150, allowance: 5 };
  const result = estimateCurtainWeight(input);
  assert.equal(result.area, 40);
  assert.ok(Math.abs(result.total - 18.06) < 0.0001);
  assert.ok(Math.abs(estimateCurtainWeight({ ...input, fullness: 2.5 }).total / result.total - 1.25) < 0.0001);
  assert.ok(Math.abs(estimateCurtainWeight({ ...input, drop: 8 }).total / result.total - 2) < 0.0001);
  assert.equal(estimateCurtainWeight({ ...input, lining: 0 }).liningMass, 0);
});

test("the planner distinguishes the height and drop, and requires the business and scope for trade", () => {
  assert.equal(resolveProjectType(["trade"]), "residential");
  assert.equal(resolveProjectType("trade"), "trade");
  const residential = brief();
  const parsed = parseArchitecturalEnquiry(residential);
  assert.ok(parsed.success);
  assert.equal(parsed.data.height, "5");
  assert.equal(parsed.data.drop, "4.8");
  residential.set("drop", ".5");
  assert.ok(parseArchitecturalEnquiry(residential).success);
  residential.set("height", "-4");
  assert.ok(!parseArchitecturalEnquiry(residential).success);
  const trade = brief("trade");
  assert.ok(!parseArchitecturalEnquiry(trade).success);
  trade.set("company", "Workroom QA");
  trade.set("tradeScope", "Manufacture only");
  assert.ok(parseArchitecturalEnquiry(trade).success);
});

test("the existing lead endpoint validates attachments and handles provider success and rejection", async (context) => {
  const priorKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "key-for-local-test";
  context.after(() => {
    if (priorKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = priorKey;
  });
  const calls: (Record<string, unknown>)[] = [];
  const keys: (string | null)[] = [];
  let reject = false;
  context.mock.method(globalThis, "fetch", async (url: string, options: RequestInit) => {
    assert.match(String(url), /\/emails$/);
    calls.push(JSON.parse(String(options.body)));
    keys.push(new Headers(options.headers).get("Idempotency-Key"));
    return reject
      ? Response.json({ name: "validation_error", message: "Test rejection" }, { status: 422 })
      : Response.json({ id: "qa-local" });
  });

  assert.equal((await submit(brief(), { "sec-fetch-site": "cross-site" })).status, 403);
  assert.equal((await submit(brief("trade"))).status, 400);
  const bot = brief();
  bot.set("website", "filled");
  assert.equal((await submit(bot)).status, 400);

  const malformed = brief();
  malformed.append("projectFiles", new File(["text"], "photo.png", { type: "image/png" }));
  assert.equal((await submit(malformed)).status, 400);
  const large = brief();
  large.append("projectFiles", new File([Buffer.alloc(MAX_PROJECT_UPLOAD_BYTES + 1)], "too-large.png", { type: "image/png" }));
  assert.equal((await submit(large)).status, 413);
  const tooLarge = new Blob([new Uint8Array(5 * 1024 * 1024)]);
  assert.equal((await POST(new Request("http://localhost/api/send-lead", { method: "POST", body: tooLarge }))).status, 413);
  assert.equal(calls.length, 0);

  const valid = brief();
  const photo = await sharp({ create: { width: 40, height: 60, channels: 3, background: "#aba392" } }).png().toBuffer();
  valid.append("projectFiles", new File([new Uint8Array(photo)], "private-name.png", { type: "image/png" }));
  valid.append("projectFiles", new File(["%PDF-1.4\n%%EOF"], "window-plan.pdf", { type: "application/pdf" }));
  const key = "aef6cf23-ac34-4100-93dd-1eea5d18ef2c";
  const accepted = await submit(valid, { "Idempotency-Key": key });
  assert.equal(accepted.status, 200);
  assert.deepEqual(await accepted.json(), { ok: true });
  assert.match(String(calls[0].text), /Window height \(m\): 5\nProposed finished curtain drop \(m\): 4.8/);
  assert.deepEqual((calls[0].attachments as { filename: string }[]).map(({ filename }) => filename), ["project-photo-1.jpg", "project-drawing-2.pdf"]);
  assert.equal(calls[0].reply_to, "qa@example.com");
  assert.equal(keys[0], `architectural-enquiry/${key}`);

  reject = true;
  assert.equal((await submit(brief())).status, 502);
  const legacy = new FormData();
  legacy.set("email", "qa@example.com");
  legacy.set("windowType", "Apex");
  assert.equal((await submit(legacy)).status, 502);
  reject = false;
  assert.equal((await submit(legacy)).status, 200);
  assert.match(String(calls[3].text), /Window Type: Apex/);
});

test("enquiry counters accept only known same-origin stages with no payload or query", async () => {
  const count = (event: string, site = "same-origin", query = "", body?: string) =>
    countEnquiry(new Request(`https://example.test/api/enquiry-count/${event}${query}`, {
      method: "POST", headers: { "sec-fetch-site": site, origin: "null" }, body,
    }), { params: Promise.resolve({ event }) });
  for (const event of ["guided-start", "guided-complete", "planner-start", "planner-complete"]) {
    assert.equal((await count(event)).status, 204);
  }
  assert.equal((await count("unknown")).status, 404);
  assert.equal((await count("guided-start", "cross-site")).status, 403);
  assert.equal((await count("guided-start", "same-origin", "?extra=1")).status, 400);
  assert.equal((await count("guided-start", "same-origin", "", "extra")).status, 400);
});

test("CMS revisions are stable when republished and respect later editorial changes", () => {
  for (const [slug, content] of [
    ["best-curtains-for-apex-windows-styles-that-actually-work", "taller windows need heavier fabrics"],
    ["how-much-do-apex-window-curtains-cost-in-the-uk-full-2026-pricing-guide", "£7,000+"],
    ["why-most-apex-curtain-installations-fail-and-how-to-get-it-right-first-time", "installations replaced"],
  ]) {
    const row = reviewedAdvice({ slug, content, title: "Legacy", excerpt: "", meta_title: "", meta_description: "", published: true });
    assert.equal(row.meta_title, row.title + " | Apex Curtains");
    assert.equal(row.meta_description, row.excerpt);
    assert.ok(row.content.startsWith("## "));
    assert.equal(reviewedAdvice(row), row);
    const edited = { ...row, content: "Subsequent approved editorial text" };
    assert.equal(reviewedAdvice(edited), edited);
  }
});
