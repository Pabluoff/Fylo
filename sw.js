const CACHE_NAME = 'fylo-v1';
const ASSETS = [
  '/',
  '/index.html',
  'css/style.css',
  'js/script.js',
  'icons/Logo-purple-white-192x192.png',
  'icons/Logo-purple-white-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});