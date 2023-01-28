var CACHE_VERSION = "v13";
var CACHE = "task-manager-" + CACHE_VERSION;

// Call install event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => {
            cache.addAll([
                "./client.css",
                "./client.html",
                "./client.js",
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/client",                            
                "./global.css",
                "./global.js",
                "./index.html",
                "./login.css",
                "./login.js",
                "./login1.svg",
                "./manifest.json",
                "./service.css",
                "./service.html",
                "./service.js",
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/service-client?client_id=2", 
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/service-client?client_id=5",
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/service-client?client_id=6",
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/service-client?client_id=1",
                "./services.html",
                "./services.js",
                "./services.css",
                "./solar-panel1.svg",
                "./sw.js",
                "./tache.css",
                "./tache.html",
                "./tache.js",
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/tache-client?service_id=4&client_id=2",
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/tache-client?service_id=11&client_id=2",
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/tache-client?service_id=6&client_id=5",
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/tache-client?service_id=7&client_id=6",                
                "https://x8ki-letl-twmt.n7.xano.io/api:3JwI6wg3/tache-client?service_id=1&client_id=1",                
                "./taches.css",
                "./taches.html",
                "./taches.js",

                "./tasks.png"
            ])
        })
    )
});

// Call activate event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName.startsWith("task-manager-") && cacheName !== CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Call fetch event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                } else if (event.request.headers.get("accept").includes("text/html")) {
                    return caches.match("./index.html");
                }
            });
        })
    );
});
