// Runtime-caching service worker: hashed build assets are cache-first (they are
// content-addressed, safe forever); pages are network-first with cache fallback,
// so any previously visited study page keeps working offline.
const CACHE = 'cca-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const immutable = url.pathname.includes('/_astro/') || url.pathname.includes('/pagefind/');
  if (immutable) {
    e.respondWith(
      caches.open(CACHE).then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) c.put(req, res.clone());
        return res;
      })
    );
  } else {
    e.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
          return res;
        } catch (err) {
          const hit = await caches.match(req);
          if (hit) return hit;
          throw err;
        }
      })()
    );
  }
});
