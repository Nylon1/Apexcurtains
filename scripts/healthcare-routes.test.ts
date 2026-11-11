import { test, before, after } from "node:test";
import { spawn, type ChildProcess } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import assert from "node:assert/strict";
import {
  publishedProducts,
  HEALTHCARE_ROOT,
  productUrl,
} from "../lib/healthcare/catalogue";
import { pages, sectors } from "../lib/healthcare/content";
const externalBase = process.env.APEX_TEST_BASE_URL;
const base = externalBase || "http://127.0.0.1:3120";
let server: ChildProcess | undefined;
before(async () => {
  if (externalBase) return;
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3120"], { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
  let output = "";
  server.stdout?.on("data", chunk => { output = (output + chunk).slice(-4000); });
  server.stderr?.on("data", chunk => { output = (output + chunk).slice(-4000); });
  for (let n = 0; n < 80; n++) { assert.equal(server.exitCode, null, output); if (output.includes("Ready in")) return; await delay(250); }
  throw new Error(`Healthcare test server unavailable: ${output}`);
});
after(() => { server?.kill(); });
const routes = [
  HEALTHCARE_ROOT,
  `${HEALTHCARE_ROOT}/fabrics`,
  `${HEALTHCARE_ROOT}/quotation`,
  ...pages.map((p) => `${HEALTHCARE_ROOT}/${p.slug}`),
  ...sectors.map((s) => `${HEALTHCARE_ROOT}/settings/${s.slug}`),
  ...publishedProducts.map(productUrl),
];
test(
  "all healthcare pages render with unique metadata, one H1, canonical and parseable schema",
  { skip: !base },
  async () => {
    const titles = new Set<string>();
    for (const path of routes) {
      const response = await fetch(`${base}${path}`);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.equal((html.match(/<h1\b/g) || []).length, 1, path);
      assert.ok(
        html.includes(`https://www.apexcurtains.com${path}`),
        `${path} canonical`,
      );
      const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      assert.ok(title, path);
      assert.ok(!titles.has(title), `${path}: duplicate title`);
      titles.add(title);
      assert.match(html, /<meta name="description" content="[^"]{30,}"/);
      for (const script of html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ))
        assert.doesNotThrow(() => JSON.parse(script[1]));
    }
  },
);
test(
  "sitemap exposes published records and withheld records return 404",
  { skip: !base },
  async () => {
    const xml = await (await fetch(`${base}/sitemap-pages.xml`)).text();
    for (const path of routes)
      assert.ok(
        xml.includes(`https://www.apexcurtains.com${path}</loc>`),
        path,
      );
    assert.equal(
      (await fetch(`${base}${HEALTHCARE_ROOT}/products/behrens-e-b-375`))
        .status,
      404,
    );
    assert.equal(
      (await fetch(`${base}${HEALTHCARE_ROOT}/products/not-a-product`)).status,
      404,
    );
  },
);
test(
  "published product assets are served and private files require authorisation",
  { skip: !base },
  async () => {
    for (const path of new Set(
      publishedProducts.flatMap((p) => p.images.map((i) => i.src)),
    )) {
      const r = await fetch(`${base}${path}`);
      assert.equal(r.status, 200, path);
      assert.match(r.headers.get("content-type") || "", /^image\//);
    }
    assert.equal(
      (
        await fetch(
          `${base}/api/healthcare/files/11111111-1111-4111-8111-111111111111`,
        )
      ).status,
      403,
    );
  },
);
