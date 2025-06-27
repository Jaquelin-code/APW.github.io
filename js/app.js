const CACHE_NAME = 'aventura-marina-v4';
const URLS_TO_CACHE = [
  '/APW.github.io/',
  '/APW.github.io/index.html',
  '/APW.github.io/index1.html',
  '/APW.github.io/index12.html',
  '/APW.github.io/manifest.json',
  '/APW.github.io/js/app.js',
  '/APW.github.io/images/Captura de pantalla 2025-06-26 211713.png',
  '/APW.github.io/images/ChatGPT Image 19 jun 2025, 08_57_38 p.m..png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cacheando recursos');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(err => console.error('[SW] Error al cachear:', err))
  );
});

self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/APW.github.io/index.html'))
  );
});
