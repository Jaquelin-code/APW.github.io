// Configuración para GitHub Pages (/APW.github.io/)
const CACHE_NAME = 'aventura-marina-final';
const BASE_PATH = '/APW.github.io';
const URLS_TO_CACHE = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/index1.html`,
  `${BASE_PATH}/index12.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/js/app.js`,
  `${BASE_PATH}/images/Captura de pantalla 2025-06-26 211713.png`,
  `${BASE_PATH}/images/ChatGPT Image 19 jun 2025, 08_57_38 p.m..png`
];

// Instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .catch(err => console.error('Error al cachear:', err))
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  if (!event.request.url.includes(location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match(`${BASE_PATH}/index.html`))
  );
});
