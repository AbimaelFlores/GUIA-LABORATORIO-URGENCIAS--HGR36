// PLANTILLA DE ANALITO (copia este archivo, renómbralo y añádelo en datos/indice.js)
registrarAnalito({
  id: "creatina-cinasa",
  nombre: "Creatina cinasa (CK)",
  tubo: "amarillo",              // id del tubo principal
  tuboAlterno: "rojo",           // opcional: segundo tubo en el que también puede entregarse
  volumen: 0.3,                  // mL mínimos de muestra
  area: "Química clínica",       // si es distinta al área del tubo, el simulador agrega un tubo extra
  urgencias: true,
  sinonimos: ["CK", "CPK"],      // palabras extra para el buscador
  nota: "",                      // opcional
  imagen: "img/analitos/ck.png"  // opcional; si se omite se busca img/analitos/<id>.png
});
