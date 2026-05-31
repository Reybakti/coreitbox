const CACHE_NAME = "coreitbox-v2";

const urlsToCache = [
  "/",
  "/dashboard",
  "/tickets",
  "/users",
  "/reports",
  "/offline.html",
];

self.addEventListener(
  "install",
  (event) => {
    console.log("SW Installed");

    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(
            urlsToCache,
          );
        }),
    );

    self.skipWaiting();
  },
);

self.addEventListener(
  "activate",
  (event) => {
    event.waitUntil(
      caches.keys().then(
        (cacheNames) => {
          return Promise.all(
            cacheNames.map(
              (cache) => {
                if (
                  cache !==
                  CACHE_NAME
                ) {
                  return caches.delete(
                    cache,
                  );
                }
              },
            ),
          );
        },
      ),
    );

    self.clients.claim();
  },
);

self.addEventListener(
  "fetch",
  (event) => {
    if (
      event.request.method !==
      "GET"
    ) {
      return;
    }

    event.respondWith(
      caches
        .match(event.request)
        .then((cached) => {
          if (cached) {
            return cached;
          }

          return fetch(
            event.request,
          )
            .then((response) => {
              const clone =
                response.clone();

              caches
                .open(
                  CACHE_NAME,
                )
                .then((cache) =>
                  cache.put(
                    event.request,
                    clone,
                  ),
                );

              return response;
            })
            .catch(() =>
              caches.match(
                "/offline.html",
              ),
            );
        }),
    );
  },
);