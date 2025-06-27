// Versión mejorada del service worker con correcciones y optimizaciones
const CACHE_NAME = 'aventura-marina-v3';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index1.html',
  '/index12.html',
  '/manifest.json',
  '/js/app.js',
  '/images/Captura de pantalla 2025-06-26 211713.png',
  '/images/ChatGPT Image 19 jun 2025, 08_57_38 p.m..png'
];

// Instalación y cacheo de recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cacheando recursos esenciales');
        return cache.addAll(URLS_TO_CACHE)
          .catch(error => {
            console.error('[SW] Error al cachear:', error);
          });
      })
  );
});

// Estrategia Cache First con fallback a red
self.addEventListener('fetch', event => {
  // Excluir peticiones a Firebase
  if (event.request.url.includes('firebaseio.com')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Devuelve recurso cacheado si existe
        if (cachedResponse) {
          return cachedResponse;
        }

        // Para navegación, devuelve la página offline si está en cache
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }

        // Si no está en cache, busca en la red
        return fetch(event.request)
          .then(response => {
            // Cachea nuevos recursos obtenidos de la red
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Fallback para imágenes
            if (event.request.headers.get('accept').includes('image')) {
              return caches.match('/images/ChatGPT Image 19 jun 2025, 08_57_38 p.m..png');
            }
            // Fallback genérico para HTML
            return caches.match('/index.html');
          });
      })
  );
});

// Limpieza de cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
