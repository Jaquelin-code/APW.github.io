const GBAR = ""
const appShell = [

]



self.addEventListener("install", installEvent =>{
    installEvent.waitUntil(
        caches.open(appCacheKey).then(cache =>{
            cache.addAll(appShell);
        })
    );
});

self.addEventListene("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});