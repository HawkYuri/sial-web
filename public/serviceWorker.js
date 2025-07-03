const CACHE_NAME = "app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/pwa-192x192.png",
  "/src/main.js" // ajuste o caminho para seu bundle principal (ex: main.tsx ou index.js)
];

// Instalando e fazendo cache dos arquivos estáticos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Ativando o service worker e limpando caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Interceptando requisições para servir do cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResp => {
      if (cachedResp) {
        return cachedResp;
      }
      return fetch(event.request).then(networkResp => {
        // Opcional: cacheia novas requisições dinâmicas
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResp.clone());
          return networkResp;
        });
      });
    })
  );
});
