// Mise en cache : le site fonctionne aussi hors connexion après une première visite
const CACHE = 'visualmaths-v9';
const FILES = ['./', 'index.html', 'shamir.html', 'bezier.html', 'thermocouple.html', 'valeur-absolue.html', 'exponentielle.html', 'logarithmes-intro.html', 'log-niveaux.html', 'log-son.html', 'manhattan-applications.html', 'respawn.html', 'points-vecteurs.html', 'droite-theorie.html', 'droite-drones.html', 'droite-rayon.html', 'droite-complete.html', 'plans-intersections.html', 'plans-obelisque.html', 'plans-robot.html', 'plans-complete.html',
  'three.min.js', 'OrbitControls.js', 'RoomEnvironment.js', 'manifest.webmanifest', 'icone.svg',
  'hero.jpg', 'thumb-shamir.jpg', 'thumb-bezier.jpg', 'thumb-thermocouple.jpg', 'thumb-valeur-absolue.jpg', 'thumb-exponentielle.jpg', 'thumb-log-intro.jpg', 'thumb-log-niveaux.jpg', 'thumb-log-son.jpg', 'thumb-manhattan.jpg', 'thumb-respawn.jpg', 'thumb-plans.jpg', 'thumb-obelisque.jpg', 'thumb-robot.jpg', 'thumb-points.jpg', 'thumb-droite.jpg', 'thumb-drones.jpg', 'thumb-rayon.jpg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')){
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => { const net = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit); return hit || net; })));
    return;
  }
  if (url.origin === location.origin){
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req, {ignoreSearch:true})));
  }
});
