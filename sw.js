var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = ["/", "/styles/main.css", "/script/main.js"];

// https://developers.google.com/web/fundamentals/primers/service-workers/?hl=pt-br
self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function(response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

self.addEventListener("activate", function(event) {
  var cacheWhitelist = ["pages-cache-v1", "blog-posts-cache-v1"];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//fetch(url, {
//  credentials: "include"
//});

//cache.addAll(
//    urlsToPrefetch.map(function(urlToPrefetch) {
//      return new Request(urlToPrefetch, { mode: "no-cors" });
//    })
//  )
//  .then(function() {
//    console.log("All resources have been fetched and cached.");
//  });

// CODELAB: Update cache names any time any of the cached files change.
//const FILES_TO_CACHE = [
//  '/offline.html',
//];

// CODELAB: Precache static resources here.
//evt.waitUntil(
//  caches.open(CACHE_NAME).then((cache) => {
//  console.log('[ServiceWorker] Pre-caching offline page');
  //return cache.addAll(FILES_TO_CACHE);
//  })
//);

// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
 // caches.keys().then((keyList) => {
  //  return Promise.all(keyList.map((key) => {
  //    if (key !== CACHE_NAME) {
 //       console.log('[ServiceWorker] Removing old cache', key);
 //       return caches.delete(key);
 //     }
 //   }));
 // })
//);

// CODELAB: Add fetch event handler here.
//if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
//  return;
//}
//evt.respondWith(
//    fetch(evt.request)
//        .catch(() => {
//          return caches.open(CACHE_NAME)
//              .then((cache) => {
 //               return cache.match('offline.html');
 //             });
 //       })
//);
