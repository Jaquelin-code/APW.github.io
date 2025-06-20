const CacheKeyHuerto = "GBAR";

const appShell =[
    "/",
    "/js/app.js",
    "/images/ChatGPT Image 19 jun 2025, 08_57_38 p.m..png",
    "index.js",
    "styles.css",
    "index.html"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(CacheKeyHuerto).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});