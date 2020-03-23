self.addEventListener("install", function(event) {
  console.log(event);
  event.waitUntil(
    caches.open("apps").then(cache => cache.addAll(["./app.js", "./index.css", "index.html"])),
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(caches.match(event.request).then(res => res));
});
