import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import inventory from "../lib/legacy-redirects.json" with { type: "json" };
import { cityPages } from "../lib/cities.ts";

const canonicalOrigin = "https://www.apexcurtains.com";
const externalBase = process.env.APEX_TEST_BASE_URL;
const base = externalBase || "http://127.0.0.1:3118";
const paths = new Set(inventory.redirects.map(({ source }) => source));
const query = "?utm_source=legacy%20audit&ref=a%2Fb&ref=second&room=double-pinch-gable";
let server;
let output = "";
const request = (path) => fetch(new URL(path, base), {
  redirect: "manual",
  signal: AbortSignal.timeout(30000),
});

before(async () => {
  if (externalBase) return;
  assert.ok(existsSync(".next/BUILD_ID"), "Run npm run build before redirect tests");
  server = spawn(process.execPath, [
    "node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3118",
  ], { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
  server.stdout.on("data", (chunk) => { output = (output + chunk).slice(-4000); });
  server.stderr.on("data", (chunk) => { output = (output + chunk).slice(-4000); });
  for (let attempt = 0; attempt < 80; attempt++) {
    assert.equal(server.exitCode, null, `Test server stopped: ${output}`);
    if (output.includes("Ready in")) return;
    await delay(250);
  }
  throw new Error(`Test server did not start: ${output}`);
});

after(() => { server?.kill(); });

test("migration inventory has unique exact sources and real, unchained destinations", () => {
  const all = [...inventory.redirects, ...inventory.unmapped];
  assert.equal(new Set(all.map(({ source }) => source)).size, all.length);
  for (const { source, destination, reason } of inventory.redirects) {
    assert.ok(reason.trim(), `${source}: explain the replacement`);
    assert.ok(source.startsWith("/") && !source.endsWith("/"));
    assert.doesNotMatch(source, /[?*:#()]/, `${source}: no catch-all matching`);
    assert.ok(destination.startsWith("/") && !destination.startsWith("//"));
    assert.ok(!paths.has(destination), `${source}: redirect chain`);
    assert.notEqual(source, destination, `${source}: redirect loop`);
    assert.ok(!existsSync(`app${source}/page.tsx`), `${source}: do not intercept a current page`);
    if (destination.startsWith("/areas/")) {
      assert.ok(cityPages.some(({ slug }) => destination === `/areas/${slug}`), destination);
    } else if (destination !== "/advice/how-to-measure-for-apex-curtains") {
      assert.ok(existsSync(`app${destination === "/" ? "" : destination}/page.tsx`), destination);
    }
    // Only two known former language homepages legitimately map to the homepage.
    if (destination === "/") assert.ok(["/de/home-deutsch", "/sv/home-svenska"].includes(source));
  }
});

test("every legacy path returns a permanent redirect with query data intact", async () => {
  for (const { source, destination } of inventory.redirects) {
    const response = await request(encodeURI(source) + query);
    assert.equal(response.status, 308, `${source}: expected permanent redirect`);
    const target = new URL(response.headers.get("location"), base);
    assert.equal(target.origin, new URL(base).origin, `${source}: unexpected external destination`);
    assert.equal(target.pathname, destination, `${source}: wrong destination`);
    assert.deepEqual([...target.searchParams], [...new URL(query, base).searchParams], source);
    await response.body?.cancel();
  }
});

test("old trailing-slash links preserve the query and reach the replacement without a loop", async () => {
  for (const { source, destination } of inventory.redirects) {
    let current = new URL(encodeURI(source) + "/" + query, base);
    for (let hop = 0; hop < 2 && current.pathname !== destination; hop++) {
      const response = await request(current.href);
      assert.equal(response.status, 308, current.href);
      const location = response.headers.get("location");
      assert.ok(location, current.href);
      current = new URL(location, current);
      await response.body?.cancel();
    }
    assert.equal(current.pathname, destination, `${source}: more than the existing slash normalization plus migration`);
    assert.equal(current.origin, new URL(base).origin);
    assert.deepEqual([...current.searchParams], [...new URL(query, base).searchParams], source);
  }
});

test("replacement pages return 200 with their own canonical and remain indexable", async () => {
  for (const destination of new Set(inventory.redirects.map(({ destination }) => destination))) {
    // CI has placeholder CMS credentials. Verify this published article on the
    // preview/production run, where the real content source is configured.
    if (!externalBase && destination === "/advice/how-to-measure-for-apex-curtains") continue;
    const response = await request(destination);
    assert.equal(response.status, 200, `${destination}: replacement must not redirect or be missing`);
    const html = await response.text();
    const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)];
    assert.equal(canonicals.length, 1, destination);
    const canonical = new URL(canonicals[0][1]);
    assert.equal(canonical.origin, canonicalOrigin);
    assert.equal(canonical.pathname, destination);
    assert.doesNotMatch(html, /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i, destination);
  }
});

test("unmatched legacy paths stay 404 and exact mappings do not catch unrelated paths", async () => {
  for (const path of [
    ...inventory.unmapped.map(({ source }) => source),
    "/contact-us-extra", "/contact-us/not-a-page", "/apex-window-curtains-in-not-a-city-custom-fit-for-angled-gable-end-windows",
  ]) {
    const response = await request(encodeURI(path));
    assert.equal(response.status, 404, `${path}: no unrelated fallback redirect`);
    await response.body?.cancel();
  }
});

test("current homepage, visualiser and enquiry entry routes are not intercepted", async () => {
  for (const path of ["/", "/room-visualiser" + query, "/start-designing", "/get-curtain-quote", "/contact"]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    await response.body?.cancel();
  }
});

test("built redirects do not intercept API, authentication or workspace routes", () => {
  const { redirects } = JSON.parse(readFileSync(".next/routes-manifest.json", "utf8"));
  const migrationRules = redirects.filter(({ source }) => paths.has(decodeURI(source)));
  assert.equal(migrationRules.length, inventory.redirects.length);
  for (const { regex } of migrationRules) {
    for (const path of ["/api/contact", "/auth/callback", "/admin", "/professionals/workspace", "/room-visualiser"]) {
      assert.ok(!new RegExp(regex, "i").test(path), path);
    }
  }
});
