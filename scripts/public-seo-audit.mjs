// Read-only crawl. Use APEX_TEST_BASE_URL for a local production build or preview.
import assert from "node:assert/strict";

const origin = "https://www.apexcurtains.com";
const target = process.env.APEX_TEST_BASE_URL || origin;
const issues = [];
const seen = new Set();
const maps = [];
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const elements = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map(m => Object.fromEntries([...m[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(a => [a[1].toLowerCase(), decode(a[2])])));
const read = async (path) => {
  const response = await fetch(new URL(path, target), {redirect:"manual", signal:AbortSignal.timeout(30000)});
  return {response, text:await response.text()};
};
const locations = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]));

const index = await read("/sitemap.xml");
assert.equal(index.response.status, 200, "sitemap index responds successfully");
assert.ok(index.text.includes("<sitemapindex"));
for (const sitemap of locations(index.text)) {
  assert.equal(new URL(sitemap).origin, origin);
  const {response, text} = await read(new URL(sitemap).pathname);
  assert.equal(response.status, 200, sitemap);
  assert.match(response.headers.get("content-type"), /application\/xml/);
  assert.ok(text.includes("<urlset"));
  assert.ok(!/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[\da-f]+;)/i.test(text), `Unescaped XML in ${sitemap}`);
  const urls = locations(text);
  assert.ok(urls.length > 0, `Unexpected empty sitemap ${sitemap}`);
  maps.push({sitemap:new URL(sitemap).pathname, urls:urls.length});
  for (const url of urls) {
    if (seen.has(url)) issues.push({url, issue:"duplicate sitemap URL"});
    seen.add(url);
  }
  for (const [, date] of text.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) assert.ok(!Number.isNaN(Date.parse(date)), `Invalid lastmod ${date}`);
}

for (const path of ["/room-visualiser", "/curtain-tracks", "/curtain-linings", "/curtain-tiebacks", "/curtain-headings", "/angled-window-curtains", "/professionals", "/services/premium-installation"]) {
  assert.ok(seen.has(origin + path), `Missing important URL ${path}`);
}

const queue = [...seen];
let checked = 0;
await Promise.all(Array.from({length:4}, async () => {
  while (queue.length) {
    const url = queue.shift();
    try {
      const parsed = new URL(url);
      assert.equal(parsed.origin, origin);
      assert.equal(parsed.search, "");
      assert.equal(parsed.hash, "");
      assert.ok(!/^\/(admin|api|auth|professionals\/workspace)(\/|$)/.test(parsed.pathname));
      const {response, text} = await read(parsed.pathname);
      assert.equal(response.status, 200, `Unexpected status ${response.status}`);
      const links = elements(text, "link");
      const canonicals = links.filter(t => t.rel === "canonical");
      assert.equal(canonicals.length, 1, "Exactly one canonical required");
      assert.equal(new URL(canonicals[0].href).href, parsed.href, "Canonical must match the submitted URL");
      const metas = elements(text, "meta");
      assert.ok(!metas.some(m => m.name === "robots" && /noindex/.test(m.content)), "Submitted page must be indexable");
      assert.ok(metas.some(m => m.name === "description" && m.content?.trim()), "Description required");
      assert.match(text, /<title>[^<]+<\/title>/);
      assert.equal((text.match(/<h1[\s>]/g) || []).length, 1, "Exactly one H1 required");
      for (const [, json] of text.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(json);
      if (parsed.pathname === "/") {
        const footer = text.match(/<footer[\s\S]*?<\/footer>/)?.[0];
        assert.ok(footer?.includes('href="/room-visualiser"'), "Footer must link to the visualiser");
        assert.match(text, /<img[^>]+fetchPriority="high"[^>]+apex-hero|<img[^>]+apex-hero[^>]+fetchPriority="high"/i);
      }
      checked++;
    } catch (error) {
      issues.push({url, issue:error.message});
    }
  }
}));
const {text:robots} = await read("/robots.txt");
assert.ok(robots.includes(`${origin}/sitemap.xml`));
console.log(JSON.stringify({target, maps, checked, issues}, null, 2));
if (issues.length) process.exitCode = 1;
