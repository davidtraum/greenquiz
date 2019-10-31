const cacheAssets = [
    'index.html',
    'data.js',
    'main.js',
    'style.css'
];

self.addEventListener('install', async event => {
    const cache = await caches.open('greenquiz-assets');
    cache.addAll(Data.getImageList());
    cache.addAll(cacheAssets);
});

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request){
    return await caches.match(request) || fetch(request);
}