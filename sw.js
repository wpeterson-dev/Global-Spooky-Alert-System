const version = "0.0.0.1";
const cacheName = `global spooky alert system-${version}`;
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                '/scripts/main.js',
				'/images/2Spooky.gif',
                '/images/NotSet.jpg',
				'/images/NotSpooky.gif',
				'/images/PSpoopy.gif',
				'/images/Spooky.gif',
				'/images/Spoopy.gif',
				'/css/Spooky.css',
				'manifest.json',
				'favicon.ico',
                `/scripts/pwacompat.min.js`
            ]).then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
