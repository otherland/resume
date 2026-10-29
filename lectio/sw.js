// Lectio offline support: the page itself is fetched fresh when online (so updates arrive)
// and served from the cache when offline; Bible texts and fonts are kept once downloaded.
const CACHE = 'lectio-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/apple-touch-icon.png', 'data/summaries.json', 'data/kjv.gz.txt'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('lectio-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const keep = (req, res) => { if (res && (res.ok || res.type === 'opaque')) caches.open(CACHE).then(c => c.put(req, res.clone())); return res; };

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin === location.origin && url.pathname.includes('/data/') || fonts) {
    // texts and fonts rarely change: cache first
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => keep(req, res))));
  } else if (url.origin === location.origin) {
    // the page and icons: network first, cache when offline
    e.respondWith(fetch(req).then(res => keep(req, res)).catch(() => caches.match(req).then(hit => hit || caches.match('index.html'))));
  }
});
