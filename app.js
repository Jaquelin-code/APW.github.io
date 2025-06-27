const CACHE_NAME = 'aventura-marina-tailwind';
const BASE_URL = '/APW.github.io';
const URLS_TO_CACHE = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/index1.html`,
  `${BASE_URL}/index12.html`,
  `${BASE_URL}/manifest.json`,
  `${BASE_URL}/js/app.js`,
  `${BASE_URL}/images/Captura de pantalla 2025-06-26 211713.png`,
  `${BASE_URL}/images/ChatGPT Image 19 jun 2025, 08_57_38 p.m..png`
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .catch(err => console.error('Error al cachear:', err))
  );
});

self.addEventListener('fetch', (event) => {
  // Excluye CDNs externos (Tailwind, Firebase, etc.)
  if (event.request.url.includes('cdn.tailwindcss.com') || 
      event.request.url.includes('firebaseio.com')) {
    return fetch(event.request); // Ignora el SW para estos recursos
  }

  // Manejo de rutas locales
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match(`${BASE_URL}/index.html`)) // Fallback offline
  );
});
