const CACHE_NAME = 'aventura-marina-v1';
const URLS_TO_CACHE = [
  '/',               // página principal
  '/index.html',
  '/index1.html',
  '/index12.html',
  '/manifest.json',
  'style.css'
];

// Instalación: cachear archivos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Archivos cacheados');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activación: limpiar cachés viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Eliminando caché viejo:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si hay cache, la devuelve
      if (response) return response;

      // Si no, intenta obtenerlo de la red
      return fetch(event.request).catch(() => {
        // Si no hay red y no está en cache, puedes mostrar una página offline aquí
        return caches.match('/offline.html'); // si la agregas
      });
    })
  );
});
