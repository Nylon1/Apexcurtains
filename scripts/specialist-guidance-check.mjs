import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import { reconcileProject } from "../lib/project-editorial.ts";
import { colourFamilies } from "../lib/colour-interiors.ts";

test("colour families resolve to sourced Oslo records and local swatches", () => {
  const fabrics = JSON.parse(fs.readFileSync("lib/oslo-fabrics.json", "utf8"));
  assert.equal(new Set(colourFamilies.map(f => f.id)).size, 11);
  assert.equal(new Set(fabrics.map(f => f.reference)).size, fabrics.length);
  for (const family of colourFamilies) for (const name of family.fabrics) {
    const fabric = fabrics.find(f => f.name === name);
    assert.ok(fabric, `${family.id}: missing ${name}`);
    assert.ok(fs.existsSync(`public${fabric.image}`), fabric.image);
    assert.match(fabric.reference, /^7154\/\d{3}$/);
    assert.equal(new URL(fabric.source).hostname, "www.prestigious.co.uk");
  }
});

const guides = await Promise.all(
  [
    "installation",
    "linings",
    "tracks",
    "tiebacks",
    "angled",
    "fabrics",
    "colours",
    "buying-online",
  ].map(
    async (name) => Object.values(await import(`../lib/guides/${name}.ts`))[0],
  ),
);
const byPath = new Map(guides.map((g) => [g.path, g]));

test("new guidance routes and their images exist; local guide fragments resolve", () => {
  for (const guide of guides) {
    assert.ok(fs.existsSync(`app${guide.path}/page.tsx`), guide.path);
    const ids = guide.sections.map((s) => s.id);
    assert.equal(
      new Set(ids).size,
      ids.length,
      `duplicate section: ${guide.path}`,
    );
    for (const src of [
      guide.image.src,
      ...guide.sections.flatMap((s) => (s.diagram ? [s.diagram.src] : [])),
    ])
      assert.ok(fs.existsSync(`public${src}`), src);
    for (const link of [
      ...guide.related,
      ...guide.sections.flatMap((s) => s.links || []),
    ]) {
      const [path, hash] = link.href.split("#");
      if (hash && byPath.has(path))
        assert.ok(
          [
            ...byPath.get(path).sections.map((s) => s.id),
            "questions",
            ...(path === "/curtain-colours-and-tones"
              ? ["colour-explorer"]
              : []),
          ].includes(hash),
          link.href,
        );
    }
  }
});

test("conflicting headings are withheld consistently without changing the source or slug", () => {
  const source = {
    slug: "existing-ranked-url",
    title: "Elegant Pinch Pleat",
    heading: "Pinch Pleat",
    summary: "A pencil pleat curtain.",
    solution: "A pencil pleat heading was chosen.",
    tags: ["Pencil Pleat", "Bedroom"],
  };
  const before = structuredClone(source);
  const corrected = reconcileProject(source);
  assert.deepEqual(source, before);
  assert.equal(corrected.slug, source.slug);
  assert.equal(corrected.heading, "");
  assert.doesNotMatch(JSON.stringify(corrected), /pinch pleat|pencil pleat/i);
  assert.deepEqual(corrected.tags, ["Bedroom"]);
  const verified = {
    ...source,
    summary: "A pinch pleat curtain.",
    solution: "A pinch pleat heading was chosen.",
    tags: ["Pinch Pleat"],
  };
  assert.deepEqual(
    reconcileProject(verified),
    verified,
    "corrected upstream records must pass through",
  );
});

test("Cheshire lining conflict is not guessed and the clear heading typo is repaired", () => {
  const corrected = reconcileProject({
    slug: "cheshire-apex-curtains-cheshire",
    heading: "Pincbh Pleat",
    lining: "Blackout Stone",
    summary:
      "Navy fabric, classic pinch pleat heading and matching blue lining.",
    brief: "Navy blue, with blue lining, creating a refined look.",
    solution:
      "Navy fabric with a tailored pinch pleat heading and coordinated blue lining.",
  });
  assert.equal(corrected.heading, "Pinch Pleat");
  assert.equal(corrected.lining, "");
  assert.doesNotMatch(JSON.stringify(corrected), /blue lining|blackout stone/i);
  assert.equal(corrected.brief, "Navy blue, creating a refined look.");
});

test("duplicate story blocks and total-darkness claims are corrected without broken grammar", () => {
  const corrected = reconcileProject({
    challenge: "The same text",
    solution: "The same text",
    brief: "Provide full blackout for better sleep.",
    result: "Providing full blackout when needed and warmth.",
  });
  assert.equal(corrected.solution, "");
  assert.equal(corrected.brief, "Provide improved light control.");
  assert.equal(
    corrected.result,
    "Providing improved light control and warmth.",
  );
});

const base = process.env.APEX_TEST_BASE_URL;
test(
  "rendered authority pages: canonical, unique H1, readable content, visible FAQ/schema parity and assets",
  { skip: !base },
  async () => {
    const routes = [
      ...guides.map((g) => g.path),
      "/",
      "/apex-curtains",
      "/triangular-window-curtains",
      "/gable-end-curtains",
      "/reviews",
      "/gallery",
      "/faq",
      "/curtain-design-guide",
      "/curtain-headings",
      "/curtain-accessories",
    ];
    for (const route of routes) {
      const response = await fetch(`${base}${route}`);
      assert.equal(response.status, 200, route);
      const html = await response.text();
      assert.equal(
        (html.match(/<h1[\s>]/g) || []).length,
        1,
        `${route}: one H1`,
      );
      if (route !== "/")
        assert.ok(
          html.includes(
            `rel="canonical" href="https://www.apexcurtains.com${route}"`,
          ),
          `${route}: canonical`,
        );
      const schema = [
        ...html.matchAll(
          /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
        ),
      ].flatMap((m) => {
        const data = JSON.parse(m[1]);
        return data["@graph"] || [data];
      });
      const faq = schema.filter((s) => s["@type"] === "FAQPage");
      assert.ok(faq.length <= 1, `${route}: duplicate FAQ schema`);
      const body = html
        .replace(/<script[\s\S]*?<\/script>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/<!-- -->/g, "");
      for (const question of faq.flatMap((f) => f.mainEntity)) {
        assert.ok(
          body.includes(question.name),
          `${route}: schema question not in visible content`,
        );
        assert.ok(
          body.includes(question.acceptedAnswer.text),
          `${route}: schema answer not in visible content`,
        );
      }
      for (const source of new Set(
        [...html.matchAll(/<img[^>]*src="([^\"]+)"/g)]
          .map((m) => m[1].replace(/&amp;/g, "&"))
          .filter((src) => src.startsWith("/")),
      )) {
        const image = await fetch(`${base}${source}`);
        assert.equal(image.status, 200, `${route}: ${source}`);
      }
      if (route === "/gallery")
        assert.ok(
          body.includes("/gallery/wave-pleat-apex-curtains-milton-keynes"),
          "gallery must expose real project links in server HTML",
        );
    }
  },
);
