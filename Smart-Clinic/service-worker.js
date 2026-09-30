const CACHE_NAME = "smart-clinic-cache-v1";

const FILES_TO_CACHE = [
  "app-loading.html",
  "welcome.html",
  "register.html",
  "login.html",
  "verification.html",
  "forgot-password.html",
  "home.html",
  "search.html",
  "style.css",
  "app.js",
  "manifest.json",
  "assets/healthcare.svg",
  "assets/patient-icon.svg",
  "assets/district6-clinic.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key !== CACHE_NAME;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});
