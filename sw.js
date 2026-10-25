// Mise en cache : le site fonctionne aussi hors connexion.
// À la première visite, seule la page d'accueil (et ses images) est mise en cache ;
// chaque vidéo est gardée pour le hors-connexion au moment où on l'ouvre.
const CACHE = 'visualmaths-v77';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icone.svg', 'hero.jpg', 'thumb-balance.jpg', 'thumb-casse.jpg', 'thumb-boucle.jpg', 'thumb-parametre.jpg', 'thumb-rayon.jpg', 'thumb-shamir.jpg', 'thumb-saut.jpg', 'thumb-arret.jpg', 'thumb-fusee.jpg', 'thumb-bezier.jpg', 'thumb-thermocouple.jpg', 'thumb-valeur-absolue.jpg', 'thumb-exponentielle.jpg', 'thumb-log-intro.jpg', 'thumb-log-niveaux.jpg', 'thumb-log-son.jpg', 'thumb-manhattan.jpg', 'thumb-manhattan-distance.jpg', 'thumb-bip-virus.jpg', 'thumb-respawn.jpg', 'thumb-plans.jpg', 'thumb-obelisque.jpg', 'thumb-robot.jpg', 'thumb-points.jpg', 'thumb-droite.jpg', 'thumb-drones.jpg', 'thumb-rayon.jpg', 'thumb-amortisseurs.jpg', 'thumb-jet-eau.jpg', 'thumb-rayon-cible.jpg', 'thumb-repere-mgs.jpg', 'thumb-freinage.jpg', 'thumb-trou-centieme.jpg', 'thumb-jeu-3d.jpg', 'thumb-pythagore-demo.jpg', 'thumb-tour-magie.jpg', 'thumb-tour-magie-bip.jpg', 'thumb-robot-chocolat.jpg', 'thumb-diagonale.jpg', 'thumb-tir-ennemi.jpg', 'thumb-viser.jpg', 'thumb-mario.jpg'];
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
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req, {ignoreSearch:true})));
  }
});
