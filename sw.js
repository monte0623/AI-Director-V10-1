/* ==========================================================
   AI Director V10.1
   Build001-A
   Service Worker
   ========================================================== */

const CACHE_NAME = "ai-director-v10-1-build001a";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json",

  "./css/main.css",
  "./css/layout.css",
  "./css/dashboard.css",

  "./js/app.js",
  "./js/router.js",
  "./js/storage.js",
  "./js/dashboard.js"
];

/* ------------------------------
   Install
------------------------------ */

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_FILES);
    })
  );

});

/* ------------------------------
   Activate
------------------------------ */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }

        })

      );

    }).then(() => self.clients.claim())

  );

});

/* ------------------------------
   Fetch
------------------------------ */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request).then(cacheResponse => {

      if (cacheResponse) {
        return cacheResponse;
      }

      return fetch(event.request)
        .then(networkResponse => {

          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;

        })
        .catch(() => {
          return caches.match("./index.html");
        });

    })

  );

});
