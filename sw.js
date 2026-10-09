/* Uso sin conexión: sirve lo guardado y lo actualiza en segundo plano.
   Los archivos nuevos de datos/ se guardan solos la primera vez que se abren con internet. */
const VERSION = "guia-tubos-v3";
const BASE = ["./", "index.html", "css/estilos.css", "js/app.js", "js/solicitud.js", "js/intro.js",
  "datos/indice.js", "datos/solicitud.js", "img/logo_imss.png", "img/central.jpg", "img/efectos/brillog.png", "img/icono-192.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(BASE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== VERSION).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(e.request);
    const red = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || red;
  }));
});
