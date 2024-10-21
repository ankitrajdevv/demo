// serviceworker.js

const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/bundle.js", // Adjust paths according to your build
  "/static/css/main.css",
  "/logo192.png" // Add other assets like images, fonts, etc.
];

// Install event: cache app shell and static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: respond with cached resources when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cached response found, return it
        if (response) {
          return response;
        }

        // Otherwise, fetch from network
        return fetch(event.request).catch(() => {
          // Optionally return fallback page if offline
          if (event.request.mode === 'navigate') {
            return caches.match('/'); // Make sure this matches your homepage
          }
        });
      })
  );
});

// Activate event: remove old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
