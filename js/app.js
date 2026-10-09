/* Guía de tubos · HGR No. 36
   Este archivo NO necesita modificarse para agregar tubos o analitos:
   crea el archivo en datos/tubos o datos/analitos y añádelo en datos/indice.js */
(() => {
"use strict";

const TUBOS = {}, ANALITOS = {};
window.registrarTubo = t => { TUBOS[t.id] = t; };
window.registrarAnalito = a => { ANALITOS[a.id] = a; };

/* ---------- utilidades ---------- */
const $ = s => document.querySelector(s);
const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const fmt = n => (Math.round(n * 100) / 100).toString().replace(".", ",") + " mL";
const colorOk = c => /^#[0-9a-f]{3,8}$/i.test(c) ? c : "#94a3b8";

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function btn(cls, text, fn) {
  const b = el("button", cls, text); b.type = "button";
  if (fn) b.addEventListener("click", fn);
  return b;
}
function fila(k, v) {
  const f = el("div", "fila"); f.append(el("span", "", k), el("span", "", v)); return f;
}
function dotColor(color) {
  const d = el("span", "dot"); d.style.setProperty("--c", colorOk(color)); return d;
}

/* ---------- imágenes (con respaldo ilustrado) ---------- */
function icoTubo(color) {
  const c = colorOk(color), w = el("div", "ico");
  w.innerHTML = `<svg viewBox="0 0 40 100" aria-hidden="true"><rect x="11" y="4" width="18" height="12" rx="3" fill="${c}"/>` +
    `<path d="M13 16h14v66a7 7 0 0 1-14 0z" fill="#fff" stroke="#94a3b8" stroke-width="2"/>` +
    `<path d="M14 50h12v32a6 6 0 0 1-12 0z" fill="${c}" opacity=".85"/></svg>`;
  return w;
}
function icoGota(color) {
  const c = colorOk(color), w = el("div", "ico");
  w.innerHTML = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3C14 13 8 19 8 26a12 12 0 0 0 24 0c0-7-6-13-12-23z" fill="${c}"/>` +
    `<path d="M14 26a6 6 0 0 0 6 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/></svg>`;
  return w;
}
/* src: ruta de la imagen; si falta o no carga, se muestra la ilustración de respaldo */
function media(src, respaldo, extra) {
  const d = el("div", "media" + (extra ? " " + extra : ""));
  const fb = () => d.replaceChildren(respaldo());
  if (!src) { fb(); return d; }
  const img = new Image();
  img.alt = ""; img.onerror = fb; img.src = src;
  d.append(img);
  return d;
}
const imgTubo = (t, extra) => media(t.imagen || `img/tubos/${t.id}.png`, () => icoTubo(t.color), extra);
const imgAnalito = (a, extra) => media(a.imagen || `img/analitos/${a.id}.png`, () => icoGota(TUBOS[a.tubo].color), extra);

/* ---------- datos ---------- */
function buscar(q) {
  const n = norm(q);
  const todos = Object.values(ANALITOS);
  const pajar = a => norm([a.nombre, ...(a.sinonimos || []), TUBOS[a.tubo].nombre].join(" | "));
  const r = n ? todos.filter(a => pajar(a).includes(n)) : todos.slice();
  return r.sort((x, y) =>
    (norm(y.nombre).startsWith(n) - norm(x.nombre).startsWith(n)) || x.nombre.localeCompare(y.nombre, "es"));
}
const areaDe = a => a.area || TUBOS[a.tubo].area;
/* analitos que pueden entregarse en el tubo `id`: [{a, alterno}] */
const analitosDe = id => Object.values(ANALITOS).filter(a => a.tubo === id || a.tuboAlterno === id)
  .sort((x, y) => x.nombre.localeCompare(y.nombre, "es"))
  .map(a => ({ a, alterno: a.tubo !== id }));

/* ---------- navegación ---------- */
const vistas = ["inicio", "analito", "guia", "simulador", "solicitud"];
function mostrar(tab) {
  vistas.forEach(v => { $("#" + v).hidden = v !== tab; });
  document.querySelectorAll(".pill").forEach(p => p.setAttribute("aria-selected", p.dataset.tab === tab));
  document.body.classList.toggle("en-inicio", tab === "inicio");
  if (tab === "analito") renderAnalito();
  if (tab === "guia") renderGuia();
  if (tab === "simulador") renderSim();
  if (tab === "solicitud" && window.renderSolicitud) window.renderSolicitud();
  window.scrollTo(0, 0);
}
function abrirAnalito(id) { selA = id; $("#qA").value = ANALITOS[id].nombre; mostrar("analito"); }
function abrirGuia(id) { selG = id; mostrar("guia"); }

/* ---------- tarjetas ---------- */
function tarjetaAnalito(a) {
  const t = TUBOS[a.tubo];
  const c = el("article", "card");
  c.append(el("span", "kicker", "Analito"), imgAnalito(a));
  c.append(el("h3", "", a.nombre));
  const tags = el("div", "cab");
  if (a.urgencias) tags.append(el("span", "tag urg", "Urgencias"));
  tags.append(el("span", "tag", areaDe(a)));
  c.append(tags);
  const filaTubo = (rot, tb) => {
    const f = el("div", "fila"), v = el("span", "");
    v.append(dotColor(tb.color), "Tubo " + tb.nombre);
    f.append(el("span", "", rot), v); return f;
  };
  c.append(filaTubo(a.tuboAlterno ? "Tubo principal" : "Tubo", t));
  if (a.tuboAlterno && TUBOS[a.tuboAlterno]) c.append(filaTubo("Tubo alterno", TUBOS[a.tuboAlterno]));
  c.append(fila("Volumen mínimo", fmt(a.volumen)), fila("Muestra", t.muestra));
  if (a.nota) c.append(el("p", "nota", a.nota));
  if ((a.sinonimos || []).length) c.append(el("p", "nota", "También se busca como: " + a.sinonimos.join(", ")));
  return c;
}
function tarjetaTubo(t, opts = {}) {
  const c = el("article", "card");
  c.style.setProperty("--c", colorOk(t.color));
  const cab = el("div", "cab");
  cab.append(el("span", "bar"), el("h3", "", "Tubo " + t.nombre));
  if (t.urgencias) cab.append(el("span", "tag urg", t.urgencias));
  c.append(el("span", "kicker", "Tubo"), imgTubo(t), cab,
    fila("Aditivo", t.aditivo), fila("Muestra", t.muestra), fila("Área", t.area),
    fila("Capacidad de referencia", "≈ " + fmt(t.capacidad) + " de " + t.unidad));
  if (t.nota) c.append(el("p", "nota", t.nota));
  if (opts.kicker) c.querySelector(".kicker").textContent = opts.kicker;
  if (opts.boton) c.append(btn("btn", `Ver los ${analitosDe(t.id).length} analitos de este tubo`, () => abrirGuia(t.id)));
  return c;
}

/* ---------- buscador con sugerencias (compartido) ---------- */
function buscadorSug(input, ul, { filtro = () => true, max = 8, alElegir, alEscribir }) {
  const cerrar = () => { ul.hidden = true; };
  const abrir = () => {
    if (!input.value.trim()) { cerrar(); return; }
    const res = buscar(input.value).filter(filtro);
    ul.replaceChildren();
    if (!res.length) ul.append(el("li", "vacio", "No se encontró ningún analito con ese nombre."));
    res.slice(0, max).forEach(a => {
      const li = el("li"), b = btn("", "", () => { cerrar(); alElegir(a); });
      b.append(dotColor(TUBOS[a.tubo].color), a.nombre,
        el("small", "", "Tubo " + TUBOS[a.tubo].nombre + (a.tuboAlterno ? " o " + TUBOS[a.tuboAlterno].nombre : "")));
      li.append(b); ul.append(li);
    });
    ul.hidden = false;
  };
  input.addEventListener("input", () => { abrir(); if (alEscribir) alEscribir(); });
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") { const r = buscar(input.value).filter(filtro); if (input.value.trim() && r.length) { cerrar(); alElegir(r[0]); } }
    if (e.key === "Escape") cerrar();
  });
  document.addEventListener("click", e => { if (!e.target.closest(".buscador")) cerrar(); });
  return { cerrar };
}

/* ---------- pestaña ANALITO/PRUEBA: solo el buscador ---------- */
let selA = null;
const qA = $("#qA");
function renderAnalito() {
  const par = $("#parA"), a = ANALITOS[selA];
  if (!a) {
    par.replaceChildren(el("p", "vacio-card", qA.value.trim() && !buscar(qA.value).length
      ? "No se encontró ningún analito con ese nombre."
      : "Escribe el nombre de un analito para ver su tarjeta y la del tubo."));
    return;
  }
  const tubos = [tarjetaTubo(TUBOS[a.tubo], { boton: true, kicker: a.tuboAlterno ? "Tubo principal" : "Tubo" })];
  if (a.tuboAlterno && TUBOS[a.tuboAlterno]) tubos.push(tarjetaTubo(TUBOS[a.tuboAlterno], { boton: true, kicker: "Tubo alterno" }));
  const der = el("div", "res-col"); der.append(...tubos);
  par.replaceChildren(tarjetaAnalito(a), der);
}
buscadorSug(qA, $("#sugA"), {
  max: 10,
  alElegir: a => { selA = a.id; qA.value = a.nombre; renderAnalito(); },
  alEscribir: () => { const r = buscar(qA.value); selA = qA.value.trim() && r.length ? r[0].id : null; renderAnalito(); }
});

/* ---------- pestaña Guía de tubos ---------- */
let selG = null;
function renderGuia() {
  const ids = Object.keys(TUBOS);
  if (!selG || !TUBOS[selG]) selG = ids[0];
  $("#listaG").replaceChildren(...ids.map(id => {
    const t = TUBOS[id];
    const b = btn("item", "", () => { selG = id; renderGuia(); });
    b.style.setProperty("--c", colorOk(t.color));
    b.setAttribute("aria-current", id === selG);
    const txt = el("span"); txt.append(el("b", "", "Tubo " + t.nombre), el("small", "", `${analitosDe(id).length} analitos · ${t.muestra}`));
    b.append(imgTubo(t, "mini"), txt);
    return b;
  }));
  const t = TUBOS[selG], lista = analitosDe(selG);
  const info = tarjetaTubo(t);
  info.querySelector(".kicker").remove();
  const det = el("div", "det");
  const an = el("section", "card");
  an.append(el("h3", "", `Analitos asociados (${lista.length})`));
  const f = el("div", "filas-an");
  if (!lista.length) f.append(el("p", "nota", "Este tubo aún no tiene analitos registrados."));
  lista.forEach(({ a, alterno }) => {
    const r = btn("fan", "", () => abrirAnalito(a.id));
    const nom = el("span", "n", a.nombre);
    const sub = alterno ? `${areaDe(a)} · tubo alterno (principal: ${TUBOS[a.tubo].nombre})`
      : a.tuboAlterno ? `${areaDe(a)} · también en tubo ${TUBOS[a.tuboAlterno].nombre}` : areaDe(a);
    nom.append(el("span", "a", sub));
    r.append(nom, a.urgencias ? el("span", "tag urg", "Urgencias") : el("span"), el("span", "v", fmt(a.volumen)));
    f.append(r);
  });
  an.append(f);
  det.append(info, an);
  $("#detG").replaceChildren(det);
}

/* ---------- pestaña SIMULADOR ---------- */
let pedido = [];            // [{ id, tubo }]  tubo = el elegido (principal o alterno)
const qS = $("#qS");
function agregar(a) {
  if (!pedido.some(p => p.id === a.id)) pedido.push({ id: a.id, tubo: a.tubo });
  qS.value = ""; renderSim(); qS.focus();
}
buscadorSug(qS, $("#sugS"), { filtro: a => !pedido.some(p => p.id === a.id), alElegir: agregar });

/* Un tubo por cada combinación tubo + área; si el área del analito difiere de la del tubo, es un tubo extra */
function calcularTubos() {
  const grupos = new Map();
  pedido.forEach(({ id, tubo }) => {
    const a = ANALITOS[id], t = TUBOS[tubo], area = areaDe(a), k = t.id + "|" + area;
    if (!grupos.has(k)) grupos.set(k, { t, area, extra: area !== t.area, items: [], vol: 0 });
    const g = grupos.get(k); g.items.push(a); g.vol += a.volumen;
  });
  const orden = Object.keys(TUBOS);
  return [...grupos.values()].sort((x, y) =>
    orden.indexOf(x.t.id) - orden.indexOf(y.t.id) || (x.extra - y.extra));
}

function renderSim() {
  const par = $("#parS");
  const izq = el("section", "card");
  izq.append(el("h3", "", `Analitos solicitados (${pedido.length})`));
  if (!pedido.length) {
    izq.append(el("p", "nota", "Aún no hay analitos. Búscalos arriba y selecciónalos para agregarlos."));
  } else {
    const ul = el("ul", "ped");
    pedido.forEach(p => {
      const a = ANALITOS[p.id], t = TUBOS[p.tubo], li = el("li");
      const nom = el("span", "n", a.nombre); nom.append(el("span", "a", `Tubo ${t.nombre} · ${areaDe(a)}`));
      const x = btn("x", "×", () => { pedido = pedido.filter(i => i.id !== p.id); renderSim(); });
      x.setAttribute("aria-label", "Quitar " + a.nombre);
      li.append(dotColor(t.color), nom, el("span", "v", fmt(a.volumen)), x);
      if (a.tuboAlterno && TUBOS[a.tuboAlterno]) {
        const op = el("div", "opc"); op.setAttribute("role", "group"); op.setAttribute("aria-label", "Tubo para " + a.nombre);
        op.append(el("span", "", "Entregar en:"));
        [a.tubo, a.tuboAlterno].forEach(tid => {
          const tb = TUBOS[tid], o = btn("opt", "", () => { p.tubo = tid; renderSim(); });
          o.setAttribute("aria-pressed", p.tubo === tid); o.append(dotColor(tb.color), tb.nombre);
          op.append(o);
        });
        li.append(op);
      }
      ul.append(li);
    });
    izq.append(ul, btn("btn sec", "Limpiar lista", () => { pedido = []; renderSim(); }));
  }

  const der = el("div", "res-col");
  if (!pedido.length) {
    der.append(el("p", "vacio-card", "Aquí aparecerán los tubos necesarios para los analitos que agregues."));
  } else {
    const grupos = calcularTubos();
    const cant = g => Math.max(1, Math.ceil(g.vol / g.t.capacidad - 1e-9));
    const total = grupos.reduce((s, g) => s + cant(g), 0);
    const res = el("div", "resumen");
    const n = el("span"); n.append(el("div", "num", String(total)), el("small", "kicker", total === 1 ? "tubo en total" : "tubos en total"));
    const dots = el("div", "dots");
    grupos.forEach(g => { for (let i = 0; i < cant(g); i++) { const d = dotColor(g.t.color); d.title = "Tubo " + g.t.nombre; dots.append(d); } });
    res.append(n, dots);
    der.append(res);
    grupos.forEach(g => {
      const c = el("article", "card"); c.style.setProperty("--c", colorOk(g.t.color));
      const top = el("div", "grupo-top");
      const tit = el("div"); tit.append(el("h3", "", "Tubo " + g.t.nombre), el("span", "kicker", g.area));
      top.append(imgTubo(g.t, "mini"), tit, el("span", "cnt", "× " + cant(g)));
      c.append(top);
      const tags = el("div", "cab");
      if (g.extra) tags.append(el("span", "tag extra", `Tubo extra: área distinta a ${g.t.area}`));
      if (g.t.urgencias) tags.append(el("span", "tag urg", g.t.urgencias));
      if (tags.children.length) c.append(tags);
      const ul = el("ul", "mini-lista");
      g.items.forEach(a => { const li = el("li"); li.append(el("span", "", a.nombre), el("span", "", fmt(a.volumen))); ul.append(li); });
      c.append(ul);
      const tot = el("div", "tot"); tot.append(el("span", "", `Mínimo de ${g.t.unidad}`), el("b", "", fmt(g.vol)));
      c.append(tot, el("p", "nota", `Capacidad de referencia: ≈ ${fmt(g.t.capacidad)} por tubo. La suma es conservadora: varias pruebas del mismo equipo pueden compartir alícuota.`));
      if (g.t.nota) c.append(el("p", "nota", g.t.nota));
      der.append(c);
    });
  }
  par.replaceChildren(izq, der);
}

/* ---------- arranque ---------- */
function cargar(src) {
  return new Promise(res => {
    const s = document.createElement("script");
    s.src = src; s.async = true; s.onload = () => res(null); s.onerror = () => res(src);
    document.head.append(s);
  });
}
async function iniciar() {
  const idx = window.GUIA_ARCHIVOS || { tubos: [], analitos: [] };
  /* todos los archivos de datos se piden a la vez (más rápido en red móvil) */
  const faltan = (await Promise.all([...idx.tubos, ...idx.analitos].map(cargar))).filter(Boolean);
  /* los tubos conservan el orden de datos/indice.js aunque lleguen en otro orden */
  const ordenados = {};
  idx.tubos.map(f => f.split("/").pop().replace(/\.js$/, "")).forEach(id => { if (TUBOS[id]) ordenados[id] = TUBOS[id]; });
  Object.keys(TUBOS).forEach(id => { if (!ordenados[id]) ordenados[id] = TUBOS[id]; });
  Object.keys(TUBOS).forEach(id => delete TUBOS[id]);
  Object.assign(TUBOS, ordenados);
  Object.values(ANALITOS).forEach(a => {
    if (!TUBOS[a.tubo]) { faltan.push(`${a.id}: el tubo "${a.tubo}" no existe`); delete ANALITOS[a.id]; }
    else if (a.tuboAlterno && !TUBOS[a.tuboAlterno]) { faltan.push(`${a.id}: el tubo alterno "${a.tuboAlterno}" no existe`); delete a.tuboAlterno; }
  });
  if (faltan.length) { const av = $("#aviso"); av.hidden = false; av.textContent = "Revisa estos archivos de datos: " + faltan.join(" · "); }
  document.querySelectorAll(".pill").forEach(p => p.addEventListener("click", () => mostrar(p.dataset.tab)));
  $("#inicioBtn").addEventListener("click", () => mostrar("inicio"));
  mostrar("inicio");
  /* uso sin conexión (solo cuando la guía se aloja en un servidor http/https) */
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
}
iniciar();
})();
