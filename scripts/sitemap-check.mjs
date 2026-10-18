import test from "node:test";
import assert from "node:assert/strict";
import { buildXml, fullImageUrl, formatSitemapDate } from "../lib/sitemap-utils.ts";

test("XML escapes URL and image query characters without double encoding the URLs", () => {
  const xml = buildXml([{ loc: 'https://www.apexcurtains.com/a?x=1&y="<two>"', images: ["https://images.example/a?width=800&fit=cover"] }]);
  assert.ok(xml.includes('a?x=1&amp;y=&quot;&lt;two&gt;&quot;'));
  assert.ok(xml.includes('width=800&amp;fit=cover'));
  assert.ok(!xml.includes('&amp;amp;'));
});

test("sitemaps discard empty, duplicate and missing-record URLs and images", () => {
  const loc = "https://www.apexcurtains.com/room-visualiser";
  const xml = buildXml([{loc, images:["", "/scene.webp", "/scene.webp"]}, {loc}, {loc:""}, {loc:"https://www.apexcurtains.com/gallery/undefined"}]);
  assert.equal((xml.match(/<url>/g) || []).length, 1);
  assert.equal((xml.match(/<image:image>/g) || []).length, 1);
});

test("missing and invalid update dates never become a fabricated lastmod", () => {
  assert.equal(formatSitemapDate(null), undefined);
  assert.equal(formatSitemapDate("not a date"), undefined);
  assert.equal(formatSitemapDate("2026-10-18T16:24:01+00:00"), "2026-10-18");
  assert.ok(!buildXml([{loc:"https://www.apexcurtains.com/areas",lastmod:"invalid"}]).includes("<lastmod>"));
});

test("image URLs resolve to absolute HTTP URLs and reject unsupported schemes", () => {
  assert.equal(fullImageUrl("/visualiser/scene.webp"), "https://www.apexcurtains.com/visualiser/scene.webp");
  assert.equal(fullImageUrl("images/example.jpg"), "https://www.apexcurtains.com/images/example.jpg");
  assert.equal(fullImageUrl("https://images.example/a?x=1&y=2"), "https://images.example/a?x=1&y=2");
  assert.equal(fullImageUrl("javascript:alert(1)"), "");
});
