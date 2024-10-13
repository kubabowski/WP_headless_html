const CACHE_NAME = "jcc_solutions"; // Name of the cache
const urlsToCache = [
  "http://localhost/jcc_solutions/frontend/pages/home/index.js", // Caching the root page
  "/styles/main.css", // Example CSS file
  "/script/main.js", // Example JS file
  "/assets/icons/loading.gif", // Example image file
];

// Install the service worker and cache all required assets
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch assets from cache, or if not available, make a network request
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request) // Check if the request exists in the cache
      .then(function (response) {
        // Cache hit - return the cached response
        if (response) {
          return response;
        }

        // Cache miss - fetch from network and cache the result
        return fetch(event.request).then(function (response) {
          // Check if the response is valid
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response before caching it
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache); // Store the network response in cache
          });

          return response; // Return the network response to the user
        });
      })
  );
});

// Activate the service worker and remove old caches
self.addEventListener("activate", function (event) {
  const cacheWhitelist = [CACHE_NAME]; // Specify which caches should be kept

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // Delete old caches that are not in the whitelist
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
