/* PAC-RAMPAGE service worker — relative paths, subpath-safe */
const VERSION = "pac-rampage-v4";
const CACHE = VERSION;
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./404.html",
];
const MATCH = { ignoreSearch: true };

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

function putCache(req, res) {
  if (res && res.ok && (res.type === "basic" || res.type === "cors")) {
    const copy = res.clone();
    caches
      .open(CACHE)
      .then((cache) => cache.put(req, copy))
      .catch(() => {});
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  let url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  const isNav =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").indexOf("text/html") !== -1;

  if (isNav) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok && (res.type === "basic" || res.type === "cors")) {
            const path = url.pathname;
            if (path.endsWith("/") || path.endsWith("/index.html")) {
              const copy = res.clone();
              caches
                .open(CACHE)
                .then((cache) => cache.put("./index.html", copy))
                .catch(() => {});
            }
          }
          return res;
        })
        .catch(() =>
          caches.match("./index.html", MATCH).then((hit) => {
            if (hit) return hit;
            return caches
              .match("./", MATCH)
              .then((page) => page || Response.error());
          }),
        ),
    );
    return;
  }

  event.respondWith(
    caches.match(req, MATCH).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          putCache(req, res);
          return res;
        })
        .catch(() => hit || Response.error());
      return hit || net;
    }),
  );
});
