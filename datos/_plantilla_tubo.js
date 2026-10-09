// PLANTILLA DE TUBO (copia este archivo, renómbralo y añádelo en datos/indice.js)
registrarTubo({
  id: "naranja",                 // sin espacios ni acentos; también nombre de la imagen
  nombre: "Naranja",
  color: "#f97316",              // color hexadecimal
  aditivo: "Trombina",
  muestra: "Suero",
  unidad: "suero",               // lo que se obtiene: suero, plasma, sangre total
  area: "Química clínica",       // área principal de procesamiento del tubo
  capacidad: 2.0,                // mL útiles de referencia por tubo (para calcular cuántos tubos)
  urgencias: "Urgencias",        // opcional: etiqueta de urgencia
  nota: "",                      // opcional
  imagen: "img/tubos/naranja.png" // opcional; si se omite se busca img/tubos/<id>.png
});
