/* CRITERIOS DE SOLICITUD Y RECEPCIÓN
   Contenido editable: cada criterio es un bloque { t: título, d: texto, l: [lista], ej: [ejemplos], f: fuente }.
   Ejemplos: { src: "ruta", pie: "texto", real: true|false }  (real = documento/foto; false = ilustración esquemática)
   Las imágenes reales tienen los datos de pacientes y médicos ocultos. */
const D = "img/solicitud/";
const OF = "Oficio 220501/lab/2002205/0055/2026";

window.SOLICITUD = {
  secciones: [
    {
      id: "acep-sol", tipo: "ok", titulo: "Criterios de aceptación de solicitudes",
      intro: "Una solicitud de examen de laboratorio se acepta cuando cumple todo lo siguiente.",
      grupos: [
        { titulo: "Formatos aceptados", items: [
          { t: "Formatos PHEDS y/o ECE",
            d: "La solicitud debe generarse desde estos formatos. Es la vía habitual de aceptación.",
            ej: [{ src: D + "ex-solicitud-impresa.png", real: true, pie: "Solicitud impresa con datos capturados (nombre, afiliación, CURP y médico ocultos)." }],
            f: OF + ", p. 1" },
          { t: "Formatos manuales: solo en cuatro casos",
            d: "Se aceptan únicamente cuando se trata de:",
            l: ["Panel viral para V.I.H. y hepatitis.", "Cultivos.",
                "Recién nacidos que aún no han dado de alta en plataforma (datos completamente legibles).",
                "Ingresos recientes a otro servicio y/o cambio de piso."],
            ej: [{ src: D + "ex-formato-manual-blanco.png", real: true, pie: "Formato manual de solicitud en blanco." },
                 { src: D + "ex-formato-4-105-2001.png", real: true, pie: "Formato institucional 4-105-2001 en blanco (Anexo 8, proc. 2660-003-056, p. 254)." }],
            f: OF + ", p. 1; Proc. 2660-003-056, Anexo 8" },
          { t: "Prioridad marcada: ordinaria o urgente",
            d: "El médico marca los exámenes y señala si son ordinarios o urgentes; así se identifica el flujo de toma y entrega.",
            ej: [{ src: D + "ex-solicitud-urgente-completa.jpg", real: true, pie: "Solicitud urgente con todos los campos llenos (paciente y médico ocultos). Los analitos están escritos por nombre." }],
            f: "Proc. 2660-003-056, pp. 26-27 y 92" }
        ]},
        { titulo: "Requisición de solicitudes", items: [
          { t: "Identificación del paciente adulto",
            l: ["Afiliación completa con agregado médico.", "Nombre completo del paciente.", "Servicio solicitante actualizado.", "Número de cama actualizado."],
            ej: [{ src: D + "ex-datos-paciente.png", real: true, pie: "Campos de identificación (los datos reales están ocultos). Deben ir llenos y legibles." }],
            f: OF + ", p. 1" },
          { t: "Identificación en pacientes pediátricos",
            l: ["Agregar fecha de nacimiento (evita confundir con datos de la madre).", "Especificar el género: masculino o femenino.",
                "En gemelos, especificar como 1 o 2.", "Anotar de forma manual el servicio y la cama actuales.",
                "Si el recién nacido ya tiene nombre propio, anotar el registro previo y el nombre actual."],
            ej: [{ src: D + "a-pediatrico.svg", real: false, pie: "Resumen de datos obligatorios en pediatría." }],
            f: OF + ", p. 2" },
          { t: "Datos del médico adscrito solicitante",
            l: ["Nombre completo.", "Matrícula.", "Firma.", "Si se coloca sello, que los datos sean legibles y visibles."],
            ej: [{ src: D + "ex-datos-medico.png", real: true, pie: "Campo de nombre, matrícula y firma (datos ocultos)." }],
            f: OF + ", p. 2" },
          { t: "Diagnóstico sin abreviaturas",
            d: "Escribir el diagnóstico completo. Si hace falta un complemento diagnóstico, agregarlo de forma manual, también sin abreviaturas.",
            ej: [{ src: D + "ex-diagnostico.png", real: true, pie: "Diagnóstico escrito completo, con su clave CIE." }],
            f: OF + ", p. 2" },
          { t: "Analitos congruentes y por nombre",
            l: ["Los analitos solicitados deben ser congruentes con el diagnóstico.", "Anotar el nombre de cada analito requerido (sin perfiles)."],
            ej: [{ src: D + "ex-analitos.png", real: true, pie: "Analitos solicitados para el diagnóstico de la solicitud anterior." },
                 { src: D + "ex-formato-correcto.jpg", real: true, pie: "Cartel del laboratorio: «formato correcto», con cada analito escrito por su nombre." }],
            f: OF + ", p. 2" },
          { t: "Solicitudes de bacteriología",
            d: "Debe contener todo lo anterior y, además:",
            l: ["Sitio anatómico de toma de muestra.", "Terapia de antibióticos que tenga el paciente.", "Nombre de quien realiza la toma de muestra.", "Hora de toma de muestra."],
            ej: [{ src: D + "a-bacteriologia.svg", real: false, pie: "Datos adicionales para bacteriología." }],
            f: OF + ", p. 2" }
        ]}
      ]
    },
    {
      id: "rech-sol", tipo: "no", titulo: "Criterios de exclusión (rechazo) de solicitudes",
      intro: "La solicitud no se ingresa ni se procesa si presenta cualquiera de estas situaciones.",
      grupos: [{ titulo: "", items: [
        { t: "Solicitud que no es PHEDS y/o ECE", d: "Fuera de los cuatro casos manuales permitidos, no se acepta.",
          ej: [{ src: D + "ex-formato-manual-blanco.png", real: true, pie: "Un formato manual solo es válido en los casos de excepción." }], f: OF + ", p. 2" },
        { t: "Datos ilegibles en panel viral, cultivos o solicitudes manuales", d: "La letra debe poder leerse sin dudas.",
          ej: [{ src: D + "r-ilegible.svg", real: false, pie: "Diagnóstico y analitos ilegibles." }], f: OF + ", p. 2" },
        { t: "Datos incompletos del paciente", d: "Falta nombre completo, afiliación con agregado médico, servicio o cama.",
          ej: [{ src: D + "r-paciente-incompleto.svg", real: false, pie: "Campos del paciente vacíos." }], f: OF + ", p. 2" },
        { t: "Datos incompletos del médico adscrito", d: "Falta nombre completo, matrícula o firma.",
          ej: [{ src: D + "r-medico-incompleto.svg", real: false, pie: "Falta la matrícula." }], f: OF + ", p. 2" },
        { t: "No coinciden el médico que genera la solicitud y el que firma",
          ej: [{ src: D + "r-medico-distinto.svg", real: false, pie: "Genera un médico y firma otro." }], f: OF + ", p. 2" },
        { t: "Sin firma del médico adscrito",
          ej: [{ src: D + "r-sin-firma.svg", real: false, pie: "Campo de firma vacío." }], f: OF + ", p. 2" },
        { t: "Sin diagnóstico",
          ej: [{ src: D + "r-sin-dx.svg", real: false, pie: "Diagnóstico en blanco." }], f: OF + ", p. 2" },
        { t: "Abreviaturas en el diagnóstico",
          ej: [{ src: D + "r-abrev-dx.svg", real: false, pie: "Siglas en lugar del diagnóstico completo." }], f: OF + ", p. 2" },
        { t: "Falta de congruencia entre el diagnóstico y los analitos",
          ej: [{ src: D + "r-incongruente.svg", real: false, pie: "Analitos sin relación con el diagnóstico." }], f: OF + ", p. 2" },
        { t: "Uso de perfiles clínicos, químicos, enzimáticos, hormonales, etc.", d: "Cada analito debe escribirse por su nombre. Las siglas de perfiles (por ejemplo QS, ES, PFH) no se aceptan.",
          ej: [{ src: D + "ex-rechazo-perfiles-abreviaturas.jpg", real: true, pie: "Solicitud con QS, ES y PFH marcada por el laboratorio: «NO SE INGRESA, NO SE PROCESA»." },
               { src: D + "ex-formato-correcto.jpg", real: true, pie: "Forma correcta: analitos individuales." }], f: OF + ", p. 2" },
        { t: "Solicitudes manchadas con fluidos corporales",
          ej: [{ src: D + "r-manchada.svg", real: false, pie: "Solicitud contaminada con fluidos." }], f: OF + ", p. 2" },
        { t: "Adhesivos, corrector, tachaduras o enmendaduras",
          ej: [{ src: D + "r-adhesivos.svg", real: false, pie: "Etiqueta pegada, corrector y tachaduras." }], f: OF + ", p. 2" }
      ]}]
    },
    {
      id: "acep-mue", tipo: "ok", titulo: "Criterios de aceptación de muestras",
      intro: "La muestra se recibe cuando cumple lo siguiente.",
      grupos: [{ titulo: "", items: [
        { t: "Recepción inmediata o máximo 30 minutos después de la toma",
          ej: [{ src: D + "m-30min.svg", real: false, pie: "Tiempo máximo entre toma y recepción." }], f: OF + ", p. 3" },
        { t: "Identificación con nombre completo (legible) y fecha de nacimiento",
          d: "El procedimiento de enfermería indica además rotular: edad, número de Seguridad Social, número de unidad y servicio, tipo de muestra y sitio anatómico, y las iniciales de quien toma la muestra.",
          ej: [{ src: D + "m-etiqueta-nombre.svg", real: false, pie: "Rótulo con nombre completo y fecha de nacimiento." }],
          f: OF + ", p. 3; Proc. 2660-003-056, p. 214" },
        { t: "Fecha y hora de la toma de muestra",
          ej: [{ src: D + "m-etiqueta-fecha.svg", real: false, pie: "Rótulo con fecha y hora de la toma." }], f: OF + ", p. 3; Proc. 2660-003-056, p. 214" },
        { t: "Datos del tubo iguales a los de la solicitud",
          d: "El personal de laboratorio verifica que la etiqueta coincida con la solicitud. Si no coincide, se avisa de inmediato al médico tratante y se esperan sus indicaciones.",
          ej: [{ src: D + "m-correlacion.svg", real: false, pie: "Etiqueta y solicitud con el mismo paciente." }], f: "Proc. 2660-003-056, p. 92" }
      ]}]
    },
    {
      id: "rech-mue", tipo: "no", titulo: "Criterios de rechazo de muestras",
      intro: "Los casos particulares los evalúa el personal profesional del laboratorio en cada área de procesamiento.",
      grupos: [{ titulo: "", items: [
        { t: "Muestras mal rotuladas o sin rótulo", ej: [{ src: D + "x-sin-rotulo.svg", real: false, pie: "Sin rótulo, rótulo incompleto o ilegible." }], f: OF + ", p. 3" },
        { t: "Tubo seco o con gel separador con mala conservación (más de 1 hora desde la toma)", d: "Se evalúa la retracción de coágulo visible.",
          ej: [{ src: D + "x-coagulo-gel.svg", real: false, pie: "Tubo con gel: suero, gel y coágulo." }], f: OF + ", p. 3" },
        { t: "Muestras mal aforadas (tubo de citrato)", d: "Volumen de llenado insuficiente o excedente.",
          ej: [{ src: D + "x-aforo.svg", real: false, pie: "El citrato se llena hasta la marca." }], f: OF + ", p. 3" },
        { t: "Muestras coaguladas en tubos con anticoagulante", d: "EDTA, citrato y heparina.",
          ej: [{ src: D + "x-coagulo-anticoag.svg", real: false, pie: "Coágulos en tubos con anticoagulante." }], f: OF + ", p. 3" },
        { t: "Tubo o recipiente inadecuado para los analitos solicitados", d: "Confirma el tubo correcto de cada analito en las pestañas ANALITO/PRUEBA y GUÍA DE TUBOS.",
          ej: [{ src: D + "x-tubo-inadecuado.svg", real: false, pie: "Analito de coagulación en tubo de EDTA." }], f: OF + ", p. 3", enlace: "guia" },
        { t: "Tubo o recipiente con tapón incorrecto", ej: [{ src: D + "x-tapon.svg", real: false, pie: "Tapón que no corresponde al tubo (ilustración)." }], f: OF + ", p. 3" },
        { t: "Falta de correlación entre la muestra y la solicitud entregadas", ej: [{ src: D + "x-sin-correlacion.svg", real: false, pie: "Nombre del tubo distinto al de la solicitud." }], f: OF + ", p. 3" },
        { t: "Hemólisis, lipemia o ictericia", d: "Pueden ser motivo de rechazo en algunos analitos; el personal profesional del laboratorio lo evalúa.",
          ej: [{ src: D + "x-hemolisis.svg", real: false, pie: "Aspecto del suero o plasma normal, hemolizado, lipémico e ictérico." }], f: OF + ", p. 3" },
        { t: "Muestras de deficiente calidad", d: "Por ejemplo, saliva en lugar de expectoración.",
          ej: [{ src: D + "x-saliva.svg", real: false, pie: "Esputo adecuado frente a saliva." }], f: OF + ", p. 3" }
      ]}]
    }
  ],
  fuentes: [
    { t: "Oficio N.º 220501/lab/2002205/0055/2026",
      d: "Hospital General Regional No. 36, Coordinación de Auxiliares de Diagnóstico, Laboratorio de Análisis Clínicos. Puebla, Puebla, 16 de junio de 2026. Criterios de aceptación de solicitudes (pp. 1-2), exclusión (p. 2), aceptación y rechazo de muestras (p. 3)." },
    { t: "IMSS. Procedimiento para la atención médica en el proceso de hospitalización en las unidades médicas hospitalarias de segundo nivel de atención. Clave 2660-003-056",
      d: "Dirección de Prestaciones Médicas, actualización 18 de febrero de 2022. Flujo de la solicitud de exámenes de laboratorio 4-105-2001 (pp. 26-28), Acción Esencial de Seguridad del Paciente 1E (p. 92), instrucciones de operación 2660-005-008 sobre etiquetado y toma de muestras (pp. 214-215) y Anexo 8 (pp. 253-254)." },
    { t: "IMSS. Procedimiento para otorgar atención materna en las unidades médicas de primer, segundo y tercer nivel de atención. Clave 2650-A03-005",
      d: "Dirección de Prestaciones Médicas, actualización 11 de octubre de 2022. Pp. 37 y 86: el formato 4-105-2001 es el Anexo 8 del procedimiento 2660-003-056." },
    { t: "Material gráfico de ejemplo",
      d: "Fotografías y formatos del Laboratorio Clínico del HGR No. 36 (octubre de 2026). Los datos de pacientes y médicos están ocultos. Las imágenes marcadas como ilustración son esquemas con datos ficticios." }
  ]
};
