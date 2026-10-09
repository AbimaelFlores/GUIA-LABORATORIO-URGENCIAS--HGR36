/* Pantalla de inicio: logo IMSS a pantalla completa con efecto de brillo (brillog.png),
   después se reduce hasta su lugar en la barra superior y se muestra la aplicación. */
(() => {
"use strict";
const splash = document.getElementById("splash"), box = document.getElementById("spLogo");
const img = box && box.querySelector("img");
if (!splash || !img) { document.body.classList.remove("intro"); return; }

let terminado = false;
const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function colocar() {                       // logo cuadrado, centrado y grande
  const S = Math.min(Math.round(Math.min(innerWidth, innerHeight) * 0.72), 560);
  Object.assign(box.style, { width: S + "px", height: S + "px", left: (innerWidth - S) / 2 + "px", top: (innerHeight - S) / 2 + "px" });
  return S;
}
function fin() {
  if (terminado) return; terminado = true;
  document.body.classList.remove("intro");
  splash.remove();
}
function reducir() {
  if (terminado) return;
  const S = colocar(), dest = document.querySelector(".top .logo").getBoundingClientRect();
  const k = dest.width / S;
  const dx = (dest.left + dest.width / 2) - innerWidth / 2, dy = (dest.top + dest.height / 2) - innerHeight / 2;
  box.classList.add("reduce");
  splash.classList.add("fondo-fuera");
  box.style.transform = `translate(${dx}px, ${dy}px) scale(${k})`;
  box.addEventListener("transitionend", fin, { once: true });
  setTimeout(fin, 1400);
}
function iniciar() {
  colocar();
  box.classList.add("entra");
  if (reducido) { setTimeout(reducir, 500); }
  else {
    setTimeout(() => box.classList.add("brilla"), 450);   // dos pasadas de brillo (~2.3 s)
    setTimeout(reducir, 3000);
  }
}
splash.addEventListener("click", () => { box.style.opacity = 1; reducir(); });
addEventListener("keydown", e => { if (!terminado && (e.key === "Escape" || e.key === "Enter")) reducir(); });
addEventListener("resize", () => { if (!terminado && !box.classList.contains("reduce")) colocar(); });
img.complete ? iniciar() : (img.addEventListener("load", iniciar, { once: true }), img.addEventListener("error", fin, { once: true }));
})();
