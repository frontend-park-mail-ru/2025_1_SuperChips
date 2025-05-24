const CACHE_NAME = 'yourflow-cache';
const PRECACHE_URLS = [
    '/fonts/futura-pt-book.woff2',
    '/fonts/futura-pt-demi.woff2',
    '/index.html',
    '/js/main.bundle.js',
    '/css/main.3bfc2c1627a3daa6fb80.min.css',
    '/public/fonts/futura-pt-book.woff2',
    '/public/fonts/futura-pt-demi.woff2',
    '/public/icons/arrow-down.svg',
    '/public/icons/arrow-left.svg',
    '/public/icons/arrow-up.svg',
    '/public/icons/chat.svg',
    '/public/icons/chat-active.svg',
    '/public/icons/chat-active-unread.svg',
    '/public/icons/chat-read.svg',
    '/public/icons/chat-sent.svg',
    '/public/icons/chat-unread.svg',
    '/public/icons/copy.svg',
    '/public/icons/cross-grey.svg',
    '/public/icons/cross.svg',
    '/public/icons/delete.svg',
    '/public/icons/edit.svg',
    '/public/icons/error.svg',
    '/public/icons/eye-off.svg',
    '/public/icons/eye-on.svg',
    '/public/icons/favicon.ico',
    '/public/icons/filter.svg',
    '/public/icons/filter-filled.svg',
    '/public/icons/heart.svg',
    '/public/icons/like-filled.svg',
    '/public/icons/like.svg',
    '/public/icons/link.svg',
    '/public/icons/lock.svg',
    '/public/icons/log-out.svg',
    '/public/icons/logo-small.svg',
    '/public/icons/plus-white.svg',
    '/public/icons/plus-white-filled.svg',
    '/public/icons/plus-black-filled.svg',
    '/public/icons/plus-black.svg',
    '/public/icons/send-button.svg',
    '/public/icons/search-icon.svg',
    '/public/icons/settings-filled.svg',
    '/public/icons/settings-icon.svg',
    '/public/icons/tick-box.svg',
    '/public/icons/upload.svg',
    '/public/img/line-1.png',
    '/public/img/line-2.png',
    '/public/img/line-3.png',
    '/public/img/logo.png',
    '/public/img/pfp1.jpg',
    '/public/img/surfboard.png',
    '/public/img/surfer.svg',
    '/public/img/test-picture.jpg',
    '/public/manifest.json',
    '/public/sw.js',
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        }).then(() => self.clients.claim())
    );
});


self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Стратегия CacheFirst для изображений
    if (/\.(?:png|jpg|jpeg|svg|gif)$/.test(url.pathname)) {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                return cachedResponse || fetch(request).then(response => {
                    const responseClone = response.clone();
                    if (request.method !== 'HEAD')
                        caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
                    return response;
                });
            })
        );
    } else if (request.method === 'GET'
        && request.url.includes('/api/')
        && !request.url.includes('/api/v1/ws')
    ) {
        // Стратегия NetworkFirst для запросов к API
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseClone = response.clone();
                    return caches.open('api-cache')
                        .then((cache) => {
                            return cache.put(request, responseClone);
                        })
                        .then(() => response); // Возвращаем оригинальный ответ
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
    } else {
        // Для остальных запросов — сеть с fallback к кэшу
        event.respondWith(
            fetch(request).catch(() => caches.match(request))
        );
    }
});
