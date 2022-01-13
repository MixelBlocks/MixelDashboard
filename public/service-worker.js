const cacheName = 'v1';

const cachedAssets = ['/index.html', '/images/logo.png', '/manifest.json', '/favicon.ico'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                cache.addAll(cachedAssets);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('start', (event) => {
    // TODO offline page thing (display offline message) and retry loading content when internet is not available
});
