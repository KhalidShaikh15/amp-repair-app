const CACHE_NAME = "amp-repair-cache-v3"

/* Install: activate immediately */
self.addEventListener("install", (event) => {
  self.skipWaiting()
})

/* Activate: clear old caches */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    )
  )
  self.clients.claim()
})

/* Fetch: always try network first */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response
      })
      .catch(() => caches.match(event.request))
  )
})
