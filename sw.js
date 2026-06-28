// Service worker — required for PWA share target to work
const CACHE = "tldr-v1";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll(["/TLDR/", "/TLDR/index.html", "/TLDR/share.html", "/TLDR/style.css", "/TLDR/manifest.json"])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(clients.claim());
});

self.addEventListener("fetch", e => {
  // Only cache same-origin GET requests
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
