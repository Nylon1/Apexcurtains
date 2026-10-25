/* Online-first. Cache only the two public, non-personal offline notices. */
const CACHE = "apex-offline-v1";
const OFFLINE = ["/web-apps/offline.html", "/web-apps/admin-offline.html"];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(OFFLINE))
      .then(() => self.skipWaiting()),
  );
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("apex-offline-") && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (
    request.method !== "GET" ||
    request.mode !== "navigate" ||
    url.origin !== self.location.origin
  )
    return;
  // Do not intercept APIs, authentication callbacks, photo/PDF downloads or assets.
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/auth/") ||
    /\.[a-z0-9]+$/i.test(url.pathname)
  )
    return;
  event.respondWith(
    fetch(request).catch(async () => {
      const admin =
        url.pathname === "/admin" || url.pathname.startsWith("/admin/");
      const cache = await caches.open(CACHE);
      return (
        (await cache.match(admin ? OFFLINE[1] : OFFLINE[0])) ||
        new Response("Connect to the internet and try again.", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        })
      );
    }),
  );
});
