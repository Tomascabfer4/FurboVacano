const CACHE_NAME = "furbo-vacano-v1";
const urlsToCache = ["/", "/index.html", "/favicon.ico"];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - Network first, falling back to cache
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 🛑 REGLA 1: Ignorar Cloudflare Insights / Analytics
  // Si la URL contiene 'cdn-cgi' (la ruta de Cloudflare), NO HACEMOS NADA.
  if (url.pathname.startsWith('/cdn-cgi/')) {
    return;
  }

  // 🛑 REGLA 2: Ignorar peticiones que no sean GET (POST, PUT, DELETE...)
  // Esto soluciona el error del beacon y envíos de datos
  if (event.request.method !== "GET") {
    return;
  }

  // 🛑 REGLA 3: Ignorar esquemas que no sean HTTP/HTTPS (como chrome-extension://)
  if (!url.protocol.startsWith('http')) {
      return;
  }

  // Si pasa los filtros, entonces sí aplicamos la lógica de caché
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonamos la respuesta
        const responseClone = response.clone();
        
        // Solo guardamos en caché si la respuesta es válida (200) y es de tipo basic (nuestro dominio)
        if (response.status === 200 && response.type === 'basic') {
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
            });
        }
        
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});