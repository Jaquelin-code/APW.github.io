// app.js - Versión mejorada

// 1. Primero, el código para REGISTRAR el service worker (esto debe ejecutarse en el navegador)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/js/app.js')
      .then(registration => {
        console.log('ServiceWorker registrado con éxito:', registration.scope);
      })
      .catch(error => {
        console.log('Error al registrar ServiceWorker:', error);
      });
  });
}

// 2. El código del Service Worker (lo que ya tienes, con ajustes)
const CACHE_NAME = 'aventura-marina-v2';  // Cambiado a v2 para forzar actualización
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index1.html',
  '/index12.html',
  '/manifest.json',
  '/images/Captura de pantalla 2025-06-26 211713.png',
  '/images/ChatGPT Image 19 jun 2025, 08_57_38 p.m..png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Cacheando recursos');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(error => {
        console.error('[SW] Error durante la instalación:', error);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Eliminando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso cacheado o lo busca en la red
        return response || fetch(event.request);
      })
      .catch(() => {
        // Podrías devolver una página offline genérica aquí
        return new Response('Estás offline', {
          headers: {'Content-Type': 'text/plain'}
        });
      })
  );
});
