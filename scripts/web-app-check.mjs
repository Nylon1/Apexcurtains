import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
const script = readFileSync("public/apex-sw.js", "utf8");
function worker(network = async () => new Response("network")) {
  const handlers = {},
    added = [],
    deleted = [],
    matches = [];
  const cache = {
    addAll: async (urls) => added.push(...urls),
    match: async (path) => {
      matches.push(path);
      return new Response(path);
    },
  };
  const self = {
    location: { origin: "https://www.apexcurtains.com" },
    addEventListener: (name, fn) => {
      handlers[name] = fn;
    },
    skipWaiting: async () => {},
    clients: { claim: async () => {} },
  };
  vm.runInNewContext(script, {
    self,
    URL,
    Response,
    fetch: network,
    caches: {
      open: async () => cache,
      keys: async () => [
        "apex-offline-v0",
        "apex-offline-v1",
        "unrelated-cache",
      ],
      delete: async (key) => deleted.push(key),
    },
  });
  function request(path, overrides = {}) {
    let response;
    handlers.fetch({
      request: {
        url: new URL(path, self.location.origin).href,
        mode: "navigate",
        method: "GET",
        ...overrides,
      },
      respondWith: (value) => {
        response = value;
      },
    });
    return response;
  }
  return { handlers, added, deleted, matches, request };
}
test("apps have distinct identities, correct launches and real icon assets", () => {
  const publicApp = JSON.parse(
    readFileSync("public/web-apps/apex.webmanifest", "utf8"),
  );
  const adminApp = JSON.parse(
    readFileSync("public/web-apps/admin.webmanifest", "utf8"),
  );
  assert.notEqual(publicApp.id, adminApp.id);
  assert.equal(publicApp.start_url, "/");
  assert.equal(adminApp.start_url, "/admin");
  assert.equal(adminApp.scope, "/admin");
  for (const app of [publicApp, adminApp]) {
    assert.equal(app.display, "standalone");
    for (const icon of app.icons) {
      const bytes = readFileSync(`public${icon.src}`);
      assert.equal(bytes.toString("hex", 0, 8), "89504e470d0a1a0a");
      assert.equal(bytes.readUInt32BE(16), Number(icon.sizes.split("x")[0]));
    }
  }
});
test("only non-personal offline notices are cached; unrelated caches survive activation", async () => {
  const w = worker();
  let pending;
  w.handlers.install({
    waitUntil: (p) => {
      pending = p;
    },
  });
  await pending;
  assert.deepEqual(w.added, [
    "/web-apps/offline.html",
    "/web-apps/admin-offline.html",
  ]);
  w.handlers.activate({
    waitUntil: (p) => {
      pending = p;
    },
  });
  await pending;
  assert.deepEqual(w.deleted, ["apex-offline-v0"]);
});
test("private pages are fetched fresh; HTTP errors and auth redirects are preserved", async () => {
  const original = new Response("Sign in", { status: 401 });
  const w = worker(async () => original);
  assert.equal(await w.request("/admin/atelier"), original);
  assert.deepEqual(w.added, []);
  assert.deepEqual(w.matches, []);
});
test("network failures display the right public or admin reconnect notice", async () => {
  const w = worker(async () => {
    throw new TypeError("offline");
  });
  for (const path of [
    "/admin",
    "/admin/login",
    "/admin/atelier",
    "/admin/projects",
    "/admin/posts",
  ]) {
    assert.equal(
      await (await w.request(path)).text(),
      "/web-apps/admin-offline.html",
    );
  }
  assert.equal(
    await (await w.request("/curtain-fabrics")).text(),
    "/web-apps/offline.html",
  );
});
test("uploads, API reads, PDFs, authentication and cross-origin requests are never intercepted", () => {
  const w = worker(() => {
    throw Error("must not fetch");
  });
  for (const path of [
    "/api/atelier/jobs",
    "/api/atelier/photos/123",
    "/auth/callback",
    "/atelier-samples/brochure.pdf",
    "https://example.com/",
  ])
    assert.equal(w.request(path), undefined);
  assert.equal(w.request("/admin", { method: "POST" }), undefined);
  assert.equal(w.request("/admin", { mode: "cors" }), undefined);
});
