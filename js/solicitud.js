/* Dibuja la pestaña SOLICITUD Y RECEPCIÓN a partir de datos/solicitud.js */
(() => {
"use strict";
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
let hecho = false, lb = null;

function lightbox() {
  if (lb) return lb;
  lb = el("dialog", "lb");
  const img = el("img"), cap = el("p", "lb-cap"), x = el("button", "lb-x", "Cerrar");
  x.type = "button"; x.addEventListener("click", () => lb.close());
  lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
  lb.append(x, img, cap); document.body.append(lb);
  lb.mostrar = (src, pie) => { img.src = src; img.alt = pie; cap.textContent = pie; lb.showModal(); };
  return lb;
}

function ejemplo(e) {
  const f = el("figure", "ej");
  const b = el("button", "ej-img"); b.type = "button";
  b.setAttribute("aria-label", "Ampliar imagen: " + e.pie);
  const im = new Image(); im.src = e.src; im.alt = e.pie; im.loading = "lazy";
  b.append(im); b.addEventListener("click", () => lightbox().mostrar(e.src, e.pie));
  const c = el("figcaption");
  c.append(el("span", "tag " + (e.real ? "real" : "ilus"), e.real ? "Documento real · datos ocultos" : "Ilustración"), " " + e.pie);
  f.append(b, c);
  return f;
}

function criterio(it, tipo) {
  const c = el("article", "crit " + tipo);
  const txt = el("div", "crit-txt");
  txt.append(el("h4", "", it.t));
  if (it.d) txt.append(el("p", "", it.d));
  if (it.l) { const ul = el("ul"); it.l.forEach(x => ul.append(el("li", "", x))); txt.append(ul); }
  if (it.enlace) {
    const b = el("button", "btn sec", "Ir a GUÍA DE TUBOS"); b.type = "button";
    b.addEventListener("click", () => document.querySelector('.pill[data-tab="' + it.enlace + '"]').click());
    txt.append(b);
  }
  if (it.f) txt.append(el("p", "fuente", "Fuente: " + it.f));
  c.append(txt);
  if (it.ej && it.ej.length) { const g = el("div", "ej-grid"); it.ej.forEach(e => g.append(ejemplo(e))); c.append(g); }
  return c;
}

window.renderSolicitud = function () {
  if (hecho) return;
  const S = window.SOLICITUD, root = document.getElementById("solRoot");
  if (!S) { root.append(el("p", "vacio-card", "No se encontró datos/solicitud.js.")); return; }
  const nav = el("nav", "sol-nav"); nav.setAttribute("aria-label", "Contenido de la sección");
  const sec = el("div", "sol-secs");
  S.secciones.forEach(s => {
    const b = el("button", "chip", s.titulo); b.type = "button";
    nav.append(b);
    const sx = el("section", "sol-sec " + s.tipo); sx.id = "sol-" + s.id;
    b.addEventListener("click", () => sx.scrollIntoView({ behavior: "smooth", block: "start" }));
    const h = el("h3", "sol-h", s.titulo); sx.append(h);
    if (s.intro) sx.append(el("p", "sol-intro", s.intro));
    s.grupos.forEach(g => {
      if (g.titulo) sx.append(el("h4", "sol-g", g.titulo));
      g.items.forEach(it => sx.append(criterio(it, s.tipo)));
    });
    sec.append(sx);
  });
  const fb = el("button", "chip", "Fuentes de consulta"); fb.type = "button"; nav.append(fb);
  const fs = el("section", "sol-sec fuentes"); fs.id = "sol-fuentes";
  fb.addEventListener("click", () => fs.scrollIntoView({ behavior: "smooth", block: "start" }));
  fs.append(el("h3", "sol-h", "Fuentes de consulta"));
  const ol = el("ol", "fuentes-l");
  S.fuentes.forEach(f => { const li = el("li"); li.append(el("strong", "", f.t), el("p", "", f.d)); ol.append(li); });
  fs.append(ol); sec.append(fs);
  root.append(nav, sec);
  hecho = true;
};
})();
