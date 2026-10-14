/*
 * DATOS del glosario. Separados de la presentación a propósito:
 * para agregar un término nuevo basta con añadir un objeto a este array.
 *
 * Se carga como <script> normal (no con fetch de JSON) para que el sitio
 * también funcione abriendo index.html con doble clic (file://), sin servidor.
 *
 * Formato de cada término:
 *   id, numero, titulo, [tituloCorto], categoria, destacado, sinonimos[], resumen,
 *   secciones[{ id, titulo, html } | { id: "pros-contras", ventajas[], desventajas[] }],
 *   relacionados[ids]
 *
 * Los textos HTML usan template literals (`...`) para poder escribir varias líneas.
 * En los bloques de código, los caracteres < > & van escapados (&lt; &gt; &amp;).
 */
window.TERMINOS = [
  /* ───────────────────────────── FUNDAMENTOS ───────────────────────────── */
  {
    id: "prueba-software",
    numero: "01",
    titulo: "Prueba de software",
    categoria: "Fundamentos",
    destacado: false,
    sinonimos: ["testing", "software testing", "pruebas"],
    resumen:
      "Actividad que ejecuta o revisa un sistema con condiciones controladas para descubrir defectos y comprobar que hace lo que se espera de él.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>Una <strong>prueba de software</strong> consiste en ejecutar un programa (o revisar sus artefactos: requisitos, diseño, código) con datos y condiciones controladas, para comparar lo que <em>realmente hace</em> con lo que <em>debería hacer</em>. Cuando ambos resultados no coinciden, aparece un defecto o, como mínimo, una pregunta que el equipo debe aclarar.</p>
          <p>Probar no es "darle clic a ver si funciona". La norma internacional <strong>ISO/IEC/IEEE 29119</strong> y el glosario de <strong>ISTQB</strong> describen las pruebas como un proceso completo: se planifican, se diseñan los casos, se preparan los datos y el entorno, se ejecutan, se registran los resultados y se informa al equipo.</p>`
      },
      {
        id: "objetivo",
        titulo: "¿Para qué sirve?",
        html: `
          <p>Las pruebas reducen el riesgo de entregar software defectuoso y generan <strong>confianza</strong> basada en evidencia. Para entender su alcance conviene separar dos preguntas que suelen confundirse:</p>
          <div class="callout" data-tipo="definicion">
            <p class="callout-titulo">Verificación vs validación</p>
            <p><strong>Verificación:</strong> "¿lo construimos bien?". Comprueba que el producto cumple su especificación. Ejemplo: el requisito dice que la estadía se calcula como <code>noches × tarifa</code>, y el código lo hace así.</p>
            <p><strong>Validación:</strong> "¿construimos lo correcto?". Comprueba que el producto resuelve la necesidad real del usuario. Ejemplo: el hotel en realidad necesitaba cobrar impuestos por noche, y nadie lo puso en el requisito.</p>
          </div>
          <p>Un sistema puede pasar toda la verificación y aun así fallar la validación: hace exactamente lo especificado, pero lo especificado no era lo que el cliente necesitaba.</p>`
      },
      {
        id: "como",
        titulo: "Principios que conviene recordar",
        html: `
          <ul>
            <li><strong>Las pruebas muestran la presencia de defectos, no su ausencia.</strong> Si una prueba falla, demostramos que hay un problema. Si todas pasan, solo sabemos que no encontramos problemas <em>con esas pruebas</em>.</li>
            <li><strong>Las pruebas exhaustivas son imposibles.</strong> Un campo "noches" que acepta enteros de 1 a 30, combinado con una tarifa decimal, tres tipos de habitación y un código de descuento opcional, genera más combinaciones de las que se pueden ejecutar. Por eso existen técnicas como la <a href="termino.html?id=particion-equivalencia">partición de equivalencia</a> y los <a href="termino.html?id=valores-limite">valores límite</a>, que eligen pocos casos con mucho poder para encontrar errores.</li>
            <li><strong>Probar temprano ahorra trabajo.</strong> Un error detectado al revisar un requisito se corrige editando un párrafo; el mismo error detectado en producción obliga a corregir código, volver a probar y volver a desplegar.</li>
            <li><strong>Las pruebas dependen del contexto.</strong> No se prueba igual un sistema de reservas que el software de un marcapasos: el riesgo define cuánto y cómo se prueba.</li>
          </ul>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>En el sistema de reservas del hotel, el requisito dice: <em>"El total de la estadía es el número de noches multiplicado por la tarifa de la habitación"</em>. Una prueba mínima sería:</p>
          <ol>
            <li>Registrar al huésped "Ana Pérez" con una habitación de 50,00 por noche.</li>
            <li>Indicar 3 noches.</li>
            <li>Comprobar que el total mostrado es 150,00.</li>
          </ol>
          <p>Si el sistema muestra 150,00, la prueba pasa. Pero eso no garantiza que funcione con 0 noches, con 31 noches o con una tarifa negativa: cada una de esas situaciones necesita su propio caso de prueba.</p>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Detecta defectos antes de que lleguen al usuario final.",
          "Aporta evidencia objetiva de la calidad del producto.",
          "Documenta cómo debe comportarse el sistema.",
          "Permite cambiar el código con más seguridad."
        ],
        desventajas: [
          "Consume tiempo y personas, sobre todo si es manual.",
          "Nunca demuestra que no haya defectos.",
          "Unas pruebas mal diseñadas dan una falsa sensación de seguridad."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Probar es buscar defectos con método: no demuestra que el software sea perfecto, pero sí reduce el riesgo de que falle frente al usuario.</p>`
      }
    ],
    relacionados: ["caso-prueba", "error-defecto-falla", "prueba-unitaria"]
  },

  {
    id: "caso-prueba",
    numero: "02",
    titulo: "Caso de prueba",
    categoria: "Fundamentos",
    destacado: false,
    sinonimos: ["test case", "CP"],
    resumen:
      "Conjunto documentado de precondiciones, datos, pasos y resultado esperado que permite comprobar un comportamiento concreto del sistema.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>Un <strong>caso de prueba</strong> es la unidad básica de trabajo del tester: describe <em>qué</em> se va a comprobar, <em>con qué datos</em>, <em>cómo</em> y <em>qué debería ocurrir</em>. Está escrito de forma que cualquier persona del equipo pueda ejecutarlo y obtener el mismo veredicto, sin depender de la memoria de quien lo diseñó.</p>
          <p>Un caso de prueba se centra en un solo comportamiento. "Probar las reservas" no es un caso de prueba; "comprobar que una reserva de 7 noches recibe un 10 % de descuento" sí lo es.</p>`
      },
      {
        id: "como",
        titulo: "Partes de un caso de prueba",
        html: `
          <ul>
            <li><strong>ID:</strong> identificador único (por ejemplo, <code>CP-012</code>) para poder referirse a él en reportes de defectos.</li>
            <li><strong>Título u objetivo:</strong> qué comportamiento verifica.</li>
            <li><strong>Precondiciones:</strong> el estado en que debe estar el sistema antes de empezar (usuario autenticado, habitación disponible, etc.).</li>
            <li><strong>Datos de entrada:</strong> valores concretos, no "un número cualquiera".</li>
            <li><strong>Pasos:</strong> acciones numeradas y reproducibles.</li>
            <li><strong>Resultado esperado:</strong> lo que dice la especificación que debe pasar. Se escribe <em>antes</em> de ejecutar.</li>
            <li><strong>Resultado obtenido:</strong> lo que realmente pasó al ejecutar.</li>
            <li><strong>Estado:</strong> aprobado, fallido o bloqueado (no se pudo ejecutar).</li>
          </ul>
          <div class="callout" data-tipo="ojo">
            <p class="callout-titulo">Ojo</p>
            <p>Si el resultado esperado no se escribe antes de ejecutar, es fácil "aceptar" lo que el sistema muestre. Un caso sin resultado esperado no es una prueba, es una exploración.</p>
          </div>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Requisito del hotel: <em>"Las estadías de 7 noches o más reciben un 10 % de descuento sobre el total"</em>.</p>
          <div class="tabla-wrap">
          <table>
            <thead><tr><th>Campo</th><th>Contenido</th></tr></thead>
            <tbody>
              <tr><td>ID</td><td><code>CP-012</code></td></tr>
              <tr><td>Título</td><td>Aplicar descuento del 10 % a estadía larga</td></tr>
              <tr><td>Precondiciones</td><td>Recepcionista autenticado; habitación 204 disponible con tarifa de 50,00 por noche</td></tr>
              <tr><td>Datos de entrada</td><td>Huésped: Ana Pérez · Noches: 7 · Habitación: 204</td></tr>
              <tr><td>Pasos</td><td>1. Abrir "Nueva reserva". 2. Registrar al huésped. 3. Elegir la habitación 204. 4. Indicar 7 noches. 5. Pulsar "Calcular total".</td></tr>
              <tr><td>Resultado esperado</td><td>Subtotal 350,00; descuento 35,00; total 315,00</td></tr>
              <tr><td>Resultado obtenido</td><td>Total 350,00 (no se aplicó el descuento)</td></tr>
              <tr><td>Estado</td><td><span class="estado estado-fail">Fallido</span></td></tr>
            </tbody>
          </table>
          </div>
          <p>Gracias a que el caso es preciso, el desarrollador puede reproducir el problema de inmediato. Lo más probable es que la condición del descuento esté escrita como <code>noches &gt; 7</code> en lugar de <code>noches &gt;= 7</code> (ver <a href="termino.html?id=error-defecto-falla">error, defecto y falla</a>).</p>
          <p>En código, el mismo caso se puede automatizar como una prueba de JUnit 5: los datos de entrada pasan a ser variables y el resultado esperado pasa a ser un <code>assertEquals</code>.</p>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Hace las pruebas repetibles por cualquier persona del equipo.",
          "Sirve como evidencia y como documentación del comportamiento.",
          "Facilita reportar defectos con pasos exactos para reproducirlos.",
          "Se puede convertir en una prueba automatizada."
        ],
        desventajas: [
          "Redactarlos y mantenerlos toma tiempo.",
          "Si cambian los requisitos, hay que actualizarlos.",
          "Un caso demasiado genérico no detecta nada en concreto."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Un buen caso de prueba es una receta: datos concretos, pasos claros y un resultado esperado escrito antes de cocinar.</p>`
      }
    ],
    relacionados: ["prueba-software", "particion-equivalencia", "prueba-unitaria"]
  },

  {
    id: "error-defecto-falla",
    numero: "03",
    titulo: "Error, defecto y falla",
    categoria: "Fundamentos",
    destacado: false,
    sinonimos: ["error", "defecto", "falla", "bug", "fault", "failure", "mistake"],
    resumen:
      "Tres eslabones de una misma cadena: una equivocación humana (error) deja un fallo en el producto (defecto) que, al ejecutarse, produce un comportamiento incorrecto visible (falla).",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>En el día a día se dice "bug" para todo, pero el vocabulario de pruebas distingue tres conceptos que forman una cadena de <strong>causa y efecto</strong>:</p>
          <ol>
            <li><strong>Error (equivocación):</strong> una acción humana incorrecta. El programador entendió mal un requisito, se distrajo o escribió un operador equivocado.</li>
            <li><strong>Defecto (bug, fault):</strong> la consecuencia del error dentro de un artefacto: una línea de código incorrecta, un requisito ambiguo, una consulta SQL mal escrita. El defecto existe aunque nadie lo haya ejecutado todavía.</li>
            <li><strong>Falla (failure):</strong> lo que se observa cuando el defecto se ejecuta en las condiciones adecuadas: el sistema da un resultado distinto del esperado.</li>
          </ol>
          <p>Error <span aria-hidden="true">→</span> defecto <span aria-hidden="true">→</span> falla. Las personas cometen errores, el código contiene defectos y los usuarios ven fallas.</p>`
      },
      {
        id: "objetivo",
        titulo: "¿Por qué importa distinguirlos?",
        html: `
          <p>Porque cada eslabón se ataca de forma distinta. Los <strong>errores</strong> se previenen con capacitación, requisitos claros y revisiones entre pares. Los <strong>defectos</strong> se encuentran con revisiones de código, análisis estático y pruebas de caja blanca. Las <strong>fallas</strong> se detectan ejecutando el sistema, por ejemplo con pruebas de caja negra.</p>
          <p>Además, no todo defecto produce una falla: si el código defectuoso está en una rama que nunca se ejecuta, el defecto sigue ahí, "dormido", hasta que alguien use justo esa ruta.</p>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Requisito: <em>"Las estadías de 7 noches o más reciben un 10 % de descuento"</em>. El programador escribe:</p>
<pre><code class="lang-java">public double calcularTotal(int noches, double tarifa) {
    double total = noches * tarifa;
    if (noches &gt; 7) {          // DEFECTO: debía ser &gt;= 7
        total = total * 0.90;
    }
    return total;
}</code></pre>
          <ul>
            <li><strong>Error:</strong> el programador leyó "más de 7" donde el requisito decía "7 o más" y usó <code>&gt;</code> en vez de <code>&gt;=</code>.</li>
            <li><strong>Defecto:</strong> la condición <code>noches &gt; 7</code> que quedó en el código.</li>
            <li><strong>Falla:</strong> Ana reserva exactamente 7 noches a 50,00 y el sistema le cobra 350,00 en lugar de 315,00.</li>
          </ul>
          <div class="callout" data-tipo="practica">
            <p class="callout-titulo">En la práctica</p>
            <p>Con 3 noches o con 10 noches el sistema responde bien, así que el defecto pasa desapercibido. Solo aparece en el borde exacto: por eso el <a href="termino.html?id=valores-limite">análisis de valores límite</a> prueba justamente 6, 7 y 8 noches.</p>
          </div>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Permite reportar problemas con precisión (qué se vio y dónde está la causa).",
          "Ayuda a elegir la técnica adecuada para cada eslabón.",
          "Facilita analizar la causa raíz y no solo el síntoma."
        ],
        desventajas: [
          "En equipos informales se mezclan los términos y se pierde precisión.",
          "Una falla puede tener varios defectos detrás, lo que complica el diagnóstico.",
          "Los defectos que no se ejecutan pueden pasar años sin detectarse."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Las personas cometen errores, el código guarda defectos y el usuario sufre fallas: probar es provocar la falla para encontrar el defecto antes que el cliente.</p>`
      }
    ],
    relacionados: ["valores-limite", "caso-prueba", "caja-blanca"]
  },

  /* ─────────────────────────── NIVELES DE PRUEBA ─────────────────────────── */
  {
    id: "prueba-unitaria",
    numero: "04",
    titulo: "Prueba unitaria",
    categoria: "Niveles de prueba",
    destacado: false,
    sinonimos: ["unit test", "prueba de componente", "prueba de unidad"],
    resumen:
      "Prueba que verifica de forma aislada la pieza más pequeña del código, normalmente un método o una clase, y que escribe el propio desarrollador.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>Una <strong>prueba unitaria</strong> comprueba el comportamiento de la <em>unidad</em> más pequeña que tiene sentido probar por separado: en Java, normalmente un método o una clase. Es el primer nivel de prueba y la base de la llamada pirámide de pruebas: se escriben muchas, son baratas y se ejecutan en milisegundos.</p>
          <p>Tres rasgos la definen:</p>
          <ul>
            <li><strong>Aislamiento:</strong> la unidad se prueba sin depender de la base de datos, la red ni otros módulos. Si los necesita, se reemplazan por <a href="termino.html?id=stubs-drivers">dobles de prueba</a>.</li>
            <li><strong>Rapidez:</strong> cientos de pruebas unitarias deben correr en segundos, para poder ejecutarlas cada vez que se guarda un cambio.</li>
            <li><strong>Autoría:</strong> la escribe el desarrollador que conoce el código, al mismo tiempo que lo programa (o incluso antes, si practica TDD).</li>
          </ul>`
      },
      {
        id: "objetivo",
        titulo: "¿Para qué sirve?",
        html: `
          <p>Detecta defectos en el lugar exacto donde se producen. Si falla <code>calcularTotal</code>, el mensaje de JUnit señala ese método, sin tener que buscar entre pantallas, servidores y bases de datos. También funciona como red de seguridad: al modificar el código, las pruebas unitarias avisan de inmediato si algo que antes funcionaba se rompió.</p>
          <p>Una buena prueba unitaria sigue el patrón <strong>Preparar, Ejecutar, Verificar</strong> (en inglés, <em>Arrange, Act, Assert</em>): primero se crean los objetos y datos, luego se llama al método una sola vez y al final se comprueba el resultado. Además, su nombre debe describir el comportamiento esperado, para que un fallo se entienda sin abrir el código.</p>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>La clase del hotel que calcula el total de la estadía:</p>
<pre><code class="lang-java">public class CalculadoraEstadia {

    public double calcularTotal(int noches, double tarifa) {
        if (noches &lt; 1) {
            throw new IllegalArgumentException("La estadía mínima es de una noche");
        }
        return noches * tarifa;
    }
}</code></pre>
          <p>Y sus pruebas unitarias con JUnit 5:</p>
<pre><code class="lang-java">import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class CalculadoraEstadiaTest {

    private final CalculadoraEstadia calc = new CalculadoraEstadia();

    @Test
    void multiplicaNochesPorTarifa() {
        assertEquals(150.0, calc.calcularTotal(3, 50.0), 0.001);
    }

    @Test
    void unaNocheCuestaExactamenteLaTarifa() {
        assertEquals(80.0, calc.calcularTotal(1, 80.0), 0.001);
    }

    @Test
    void rechazaCeroNoches() {
        assertThrows(IllegalArgumentException.class,
                () -&gt; calc.calcularTotal(0, 50.0));
    }
}</code></pre>
          <p><code>@Test</code> marca cada método como una prueba; <code>assertEquals(esperado, obtenido, delta)</code> compara números decimales con una tolerancia, porque los <code>double</code> no siempre son exactos. Ninguna de estas pruebas toca la base de datos ni la interfaz: por eso son unitarias.</p>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Muy rápidas y baratas de ejecutar.",
          "Localizan el defecto con precisión.",
          "Facilitan refactorizar sin miedo.",
          "Documentan con ejemplos cómo se usa cada método."
        ],
        desventajas: [
          "No detectan problemas de comunicación entre módulos.",
          "Exigen diseñar el código para que sea aislable.",
          "Un exceso de dobles de prueba puede ocultar fallas reales."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Prueba la pieza más pequeña, sola y rápido: si la base falla, nada de lo que se construya encima será confiable.</p>`
      }
    ],
    relacionados: ["prueba-integracion", "stubs-drivers", "cobertura-codigo"]
  },

  {
    id: "prueba-integracion",
    numero: "05",
    titulo: "Prueba de integración",
    categoria: "Niveles de prueba",
    destacado: true,
    sinonimos: ["integration testing", "pruebas de interfaces", "prueba de integración de componentes"],
    resumen:
      "Verifica que módulos ya probados por separado se comunican bien entre sí: interfaces, formato de datos, orden de llamadas y conexión con recursos externos como la base de datos.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>La <strong>prueba de integración</strong> es el nivel que viene después de las pruebas unitarias. Toma módulos que ya funcionan por separado y comprueba que, al conectarlos, <strong>se entienden</strong>. El foco no está en la lógica interna de cada módulo, sino en sus <strong>interfaces</strong>: los datos que se pasan, el formato en que llegan, el orden en que se llaman y la forma en que responden a los errores del otro.</p>
          <p>Es frecuente que dos módulos aprueben el 100 % de sus pruebas unitarias y, aun así, fallen juntos. Cada uno cumple su parte del contrato... pero cada uno entendió un contrato distinto.</p>`
      },
      {
        id: "objetivo",
        titulo: "¿Para qué sirve?",
        html: `
          <p>Busca defectos que solo existen <em>entre</em> los módulos. Los más típicos son:</p>
          <ul>
            <li><strong>Formato de datos:</strong> Reservas envía el monto como <code>150.0</code> (número) y Pagos espera <code>"150,00"</code> (texto); o una fecha viaja como <code>dd/mm/aaaa</code> y se interpreta como <code>mm/dd/aaaa</code>.</li>
            <li><strong>Orden de llamadas:</strong> se guarda la reserva como confirmada <em>antes</em> de saber si el pago fue aprobado.</li>
            <li><strong>Conexión a la base de datos:</strong> credenciales, nombres de columnas, tipos incompatibles o transacciones que no se confirman.</li>
            <li><strong>Manejo de errores:</strong> Pagos lanza una excepción que Reservas no captura y la pantalla queda en blanco.</li>
          </ul>`
      },
      {
        id: "como",
        titulo: "¿Cómo se aplica?",
        html: `
          <p>Existen cuatro estrategias clásicas para decidir en qué orden se van uniendo los módulos:</p>
          <ul>
            <li><strong>Big bang:</strong> se conectan todos los módulos a la vez. Es rápido de montar, pero cuando algo falla cuesta saber dónde.</li>
            <li><strong>Descendente (top-down):</strong> se empieza por los módulos de arriba (los que coordinan, como Reservas) y se baja poco a poco. Los módulos inferiores que aún no existen se reemplazan por <a href="termino.html?id=stubs-drivers"><strong>stubs</strong></a>, que devuelven respuestas fijas.</li>
            <li><strong>Ascendente (bottom-up):</strong> se empieza por los módulos de abajo (acceso a datos, Pagos) y se sube. Como todavía no existe quien los llame, se escriben <strong>drivers</strong>: pequeños programas que invocan al módulo y revisan su respuesta.</li>
            <li><strong>Sándwich (híbrida):</strong> combina ambas; se integra desde arriba y desde abajo a la vez hasta encontrarse en una capa intermedia.</li>
          </ul>
          <figure class="figura">
            <svg class="diagrama" viewBox="0 0 640 300" role="img" aria-labelledby="dg-int-t dg-int-d">
              <title id="dg-int-t">Integración descendente frente a ascendente</title>
              <desc id="dg-int-d">A la izquierda, el módulo Reservas real llama a stubs de Pagos y BD. A la derecha, un driver llama a los módulos reales Pagos y BD.</desc>
              <defs>
                <marker id="fl-int" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-head"/></marker>
              </defs>
              <text x="170" y="26" class="dg-txt dg-h" text-anchor="middle">Descendente (top-down)</text>
              <rect x="110" y="52" width="120" height="44" rx="6" class="dg-box dg-real"/>
              <text x="170" y="79" class="dg-txt" text-anchor="middle">Reservas</text>
              <line x1="145" y1="96" x2="105" y2="160" class="dg-line"/>
              <line x1="195" y1="96" x2="235" y2="160" class="dg-line"/>
              <rect x="45" y="160" width="120" height="44" rx="6" class="dg-box dg-doble"/>
              <text x="105" y="187" class="dg-txt" text-anchor="middle">Stub Pagos</text>
              <rect x="175" y="160" width="120" height="44" rx="6" class="dg-box dg-doble"/>
              <text x="235" y="187" class="dg-txt" text-anchor="middle">Stub BD</text>
              <line x1="22" y1="60" x2="22" y2="196" class="dg-line dg-acc" marker-end="url(#fl-int)"/>
              <text x="170" y="246" class="dg-mute" text-anchor="middle">Se integra de arriba hacia abajo;</text>
              <text x="170" y="266" class="dg-mute" text-anchor="middle">lo que falta abajo se simula con stubs.</text>

              <line x1="320" y1="16" x2="320" y2="284" class="dg-sep"/>

              <text x="470" y="26" class="dg-txt dg-h" text-anchor="middle">Ascendente (bottom-up)</text>
              <rect x="410" y="52" width="120" height="44" rx="6" class="dg-box dg-doble"/>
              <text x="470" y="79" class="dg-txt" text-anchor="middle">Driver</text>
              <line x1="445" y1="96" x2="405" y2="160" class="dg-line"/>
              <line x1="495" y1="96" x2="535" y2="160" class="dg-line"/>
              <rect x="345" y="160" width="120" height="44" rx="6" class="dg-box dg-real"/>
              <text x="405" y="187" class="dg-txt" text-anchor="middle">Pagos</text>
              <rect x="475" y="160" width="120" height="44" rx="6" class="dg-box dg-real"/>
              <text x="535" y="187" class="dg-txt" text-anchor="middle">BD</text>
              <line x1="618" y1="196" x2="618" y2="60" class="dg-line dg-acc" marker-end="url(#fl-int)"/>
              <text x="470" y="246" class="dg-mute" text-anchor="middle">Se integra de abajo hacia arriba;</text>
              <text x="470" y="266" class="dg-mute" text-anchor="middle">lo que falta arriba se simula con un driver.</text>
            </svg>
            <figcaption>Recuadro sólido: módulo real. Recuadro punteado: doble de prueba (stub o driver).</figcaption>
          </figure>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>En el hotel, el módulo <strong>Reservas</strong> pide a <strong>Pagos</strong> que cobre la estadía y, si el cobro se aprueba, guarda la reserva en la <strong>base de datos</strong>. Cada módulo ya tiene sus pruebas unitarias. La prueba de integración comprueba la cadena completa Reservas <span aria-hidden="true">↔</span> Pagos <span aria-hidden="true">↔</span> BD:</p>
<pre><code class="lang-java">@Test
void reservaPagadaQuedaConfirmadaYGuardada() {
    // Módulos reales conectados entre sí; la BD es una base H2 en memoria
    RepositorioReservas repo = new RepositorioReservasJdbc(conexionPrueba);
    ServicioPagos pagos = new ServicioPagosSandbox();   // pasarela en modo pruebas
    ServicioReservas reservas = new ServicioReservas(pagos, repo);

    Reserva r = reservas.reservar("Ana Pérez", 3, 50.0);

    assertEquals(EstadoReserva.CONFIRMADA, r.getEstado());
    assertEquals(150.0, repo.buscarPorId(r.getId()).orElseThrow().getTotal(), 0.001);
}</code></pre>
          <p>Esta prueba fallaría, por ejemplo, si el repositorio guardara el total en una columna entera y se perdieran los decimales, o si Reservas guardara la reserva antes de esperar la respuesta de Pagos. Ninguno de esos defectos aparece en las pruebas unitarias de cada módulo.</p>
          <div class="callout" data-tipo="practica">
            <p class="callout-titulo">En este laboratorio</p>
            <p>Este sitio también es una integración: archivos HTML, CSS y JS, Nginx dentro del contenedor y el navegador deben entenderse. Comprobar que Nginx entrega los archivos del volumen y muestra la 404 personalizada es una prueba de integración (ver <a href="arquitectura.html">Arquitectura</a>).</p>
          </div>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Encuentra defectos de interfaz que las pruebas unitarias no ven.",
          "Valida la conexión real con la base de datos y servicios externos.",
          "Las estrategias incrementales ayudan a localizar el módulo culpable.",
          "Reduce sorpresas al llegar a la prueba de sistema."
        ],
        desventajas: [
          "Es más lenta y costosa de preparar que la prueba unitaria.",
          "Requiere entornos y datos de prueba (BD, sandbox de pagos).",
          "Con big bang, localizar la causa de una falla es difícil.",
          "Stubs y drivers son código extra que también hay que mantener."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Que cada pieza funcione sola no significa que funcionen juntas: la integración prueba las uniones, que es donde suelen esconderse los defectos.</p>`
      }
    ],
    relacionados: ["stubs-drivers", "prueba-unitaria", "caja-gris"]
  },

  {
    id: "prueba-sistema",
    numero: "06",
    titulo: "Prueba de sistema",
    categoria: "Niveles de prueba",
    destacado: false,
    sinonimos: ["system testing", "prueba end-to-end", "pruebas de sistema completo"],
    resumen:
      "Evalúa el sistema completo e integrado frente a sus requisitos funcionales y no funcionales, en un entorno lo más parecido posible a producción.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>La <strong>prueba de sistema</strong> se realiza cuando todos los módulos ya están integrados. Se trata al software como un producto terminado y se comprueba contra la <strong>especificación de requisitos</strong>: ¿hace todo lo que prometimos?, ¿lo hace con la velocidad, la seguridad y la facilidad de uso esperadas?</p>
          <p>Normalmente la ejecuta un equipo de pruebas independiente de quienes programaron, y casi siempre con un enfoque de <a href="termino.html?id=caja-negra">caja negra</a>: se usa el sistema desde su interfaz, como lo haría un usuario o un sistema externo.</p>`
      },
      {
        id: "objetivo",
        titulo: "¿Qué se prueba?",
        html: `
          <p><strong>Requisitos funcionales</strong>: lo que el sistema hace. Registrar huésped, buscar disponibilidad, calcular el total, aplicar descuentos, enviar el correo de confirmación.</p>
          <p><strong>Requisitos no funcionales</strong>: cómo lo hace.</p>
          <ul>
            <li><strong>Rendimiento:</strong> con 100 recepcionistas trabajando a la vez, ¿la búsqueda de habitaciones sigue respondiendo en un tiempo aceptable?</li>
            <li><strong>Seguridad:</strong> ¿un usuario sin sesión puede ver las reservas de otros huéspedes?, ¿los datos de tarjeta se almacenan cifrados o no se almacenan?</li>
            <li><strong>Usabilidad:</strong> ¿un recepcionista nuevo puede crear una reserva sin ayuda?, ¿los mensajes de error explican qué corregir?</li>
            <li><strong>Compatibilidad y recuperación:</strong> ¿funciona en los navegadores del hotel?, ¿qué ocurre si se cae la conexión a la base de datos a mitad de una reserva?</li>
          </ul>`
      },
      {
        id: "como",
        titulo: "¿Cómo se aplica?",
        html: `
          <p>La clave es el <strong>entorno</strong>: debe parecerse a producción (mismo sistema operativo, misma versión de base de datos, configuración similar, volumen de datos realista). Un sistema que funciona en la laptop del desarrollador puede fallar en el servidor por una variable de entorno, una zona horaria o un permiso de archivo. Contenedores como Docker ayudan precisamente a que el entorno de pruebas y el de producción sean iguales.</p>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Escenario de prueba de sistema para el hotel, ejecutado en el servidor de pruebas con datos de ejemplo:</p>
          <ol>
            <li>Iniciar sesión como recepcionista.</li>
            <li>Registrar al huésped "Ana Pérez" con su documento y correo.</li>
            <li>Buscar habitaciones dobles disponibles del 10 al 17 del mes.</li>
            <li>Reservar la habitación 204 (7 noches a 50,00).</li>
            <li>Verificar en pantalla: total 315,00 con el descuento aplicado.</li>
            <li>Verificar que llegó el correo de confirmación y que la habitación ya no aparece disponible para esas fechas.</li>
          </ol>
          <p>Este flujo atraviesa interfaz, lógica, pagos, base de datos y correo. En paralelo, otra prueba de sistema puede simular decenas de reservas simultáneas para medir el rendimiento.</p>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Evalúa el producto tal como lo usará el cliente.",
          "Cubre requisitos no funcionales (rendimiento, seguridad, usabilidad).",
          "Detecta problemas de configuración y de entorno."
        ],
        desventajas: [
          "Llega tarde: corregir defectos aquí es más caro.",
          "Montar un entorno parecido a producción cuesta tiempo y dinero.",
          "Cuando algo falla, cuesta saber en qué módulo está el defecto."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>La prueba de sistema mira el producto entero desde fuera y pregunta: ¿cumple todos los requisitos, incluso los que no son funciones?</p>`
      }
    ],
    relacionados: ["prueba-aceptacion", "prueba-integracion", "caja-negra"]
  },

  {
    id: "prueba-aceptacion",
    numero: "07",
    titulo: "Prueba de aceptación",
    categoria: "Niveles de prueba",
    destacado: false,
    sinonimos: ["UAT", "user acceptance testing", "prueba alfa", "prueba beta"],
    resumen:
      "Último nivel de prueba: el cliente o los usuarios confirman que el sistema satisface sus necesidades y los criterios de aceptación acordados antes de darlo por recibido.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>La <strong>prueba de aceptación</strong> responde la pregunta de la <em>validación</em>: "¿construimos lo correcto?". No la dirige el equipo de desarrollo, sino el <strong>cliente</strong> o los <strong>usuarios reales</strong>, que deciden si el sistema está listo para usarse en su trabajo diario. Su resultado es una decisión: aceptar el producto, aceptarlo con observaciones o rechazarlo.</p>
          <p>Cuando la realizan los usuarios finales se le llama <strong>UAT</strong> (<em>User Acceptance Testing</em>, prueba de aceptación de usuario).</p>`
      },
      {
        id: "como",
        titulo: "¿Cómo se aplica?",
        html: `
          <p>Todo parte de los <strong>criterios de aceptación</strong>: condiciones concretas y verificables que se acuerdan con el cliente <em>antes</em> de construir. Un formato muy usado es "Dado / Cuando / Entonces":</p>
          <div class="callout" data-tipo="ejemplo">
            <p class="callout-titulo">Criterio de aceptación</p>
            <p><strong>Dado</strong> un huésped que reserva 7 noches o más,<br><strong>cuando</strong> el recepcionista confirma la reserva,<br><strong>entonces</strong> el total muestra un descuento del 10 % y el comprobante lo detalla en una línea aparte.</p>
          </div>
          <p>Según quién y dónde se prueba, se distinguen dos modalidades:</p>
          <ul>
            <li><strong>Prueba alfa:</strong> usuarios reales prueban el sistema en las instalaciones del desarrollador, en un entorno controlado y con el equipo cerca para observar y tomar nota.</li>
            <li><strong>Prueba beta:</strong> se entrega una versión casi final a un grupo de usuarios para que la usen en su propio entorno, sin supervisión directa, y reporten lo que encuentren.</li>
          </ul>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Antes de reemplazar el sistema antiguo, la jefa de recepción del hotel y dos recepcionistas trabajan una tarde con el nuevo sistema (prueba alfa). Usan reservas reales de la semana anterior y verifican cada criterio acordado: registrar huéspedes, calcular totales, aplicar descuentos, imprimir el comprobante.</p>
          <p>Todo funciona según la especificación, pero descubren que el comprobante no muestra el número de habitación, algo que los huéspedes siempre preguntan. Técnicamente no es un defecto (no estaba en los requisitos), pero sí es un motivo de no aceptación: el sistema pasó la verificación y falló la validación.</p>
          <p>Después, una sucursal pequeña usa el sistema durante dos semanas en su operación diaria (prueba beta) y reporta que en temporada alta la búsqueda de disponibilidad se vuelve lenta.</p>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Confirma que el sistema resuelve la necesidad real del negocio.",
          "Involucra al cliente y reduce conflictos en la entrega.",
          "Descubre problemas de uso que el equipo técnico no ve."
        ],
        desventajas: [
          "Depende de la disponibilidad de usuarios ocupados.",
          "Los cambios que surgen aquí son caros de implementar.",
          "Si los criterios son vagos, la aceptación se vuelve subjetiva."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Las demás pruebas preguntan si el sistema funciona; la de aceptación pregunta si al cliente le sirve.</p>`
      }
    ],
    relacionados: ["prueba-sistema", "prueba-software", "caja-negra"]
  },

  {
    id: "prueba-regresion",
    numero: "08",
    titulo: "Prueba de regresión",
    categoria: "Niveles de prueba",
    destacado: false,
    sinonimos: ["regression testing", "pruebas de no regresión", "retesting"],
    resumen:
      "Volver a ejecutar pruebas que ya pasaban después de un cambio en el código, para confirmar que lo que funcionaba sigue funcionando.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>Una <strong>regresión</strong> es cuando algo que funcionaba deja de hacerlo por culpa de un cambio: una corrección, una nueva funcionalidad, una actualización de una librería o un ajuste de configuración. La <strong>prueba de regresión</strong> consiste en volver a ejecutar las pruebas existentes después de cada cambio para detectar esos efectos secundarios.</p>
          <p>Se suele agrupar con los niveles de prueba porque se aplica en todos ellos: hay regresión unitaria, de integración y de sistema.</p>
          <div class="callout" data-tipo="ojo">
            <p class="callout-titulo">No confundir</p>
            <p><strong>Re-test</strong> (prueba de confirmación) es volver a ejecutar el caso que falló para comprobar que el defecto se corrigió. <strong>Regresión</strong> es ejecutar <em>el resto</em> de las pruebas para comprobar que la corrección no rompió otra cosa.</p>
          </div>`
      },
      {
        id: "objetivo",
        titulo: "¿Por qué se automatiza?",
        html: `
          <p>Porque se repite constantemente. Si cada cambio obliga a repetir a mano 200 casos de prueba, el equipo terminará saltándose la regresión "porque el cambio era pequeño", que es justo cuando aparecen las sorpresas. Automatizada con JUnit, la misma batería se ejecuta en segundos o minutos, sin cansancio y sin olvidos.</p>
          <p>Por eso la regresión está muy ligada a la <strong>integración continua</strong> (CI): un servidor (GitHub Actions, GitLab CI, Jenkins…) descarga el código y ejecuta todas las pruebas, por ejemplo con <code>mvn test</code>, cada vez que alguien sube un cambio. Si alguna prueba falla, el cambio queda marcado en rojo antes de llegar a producción.</p>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>El hotel pide agregar un impuesto turístico de 2,00 por noche, que se mostrará en un método nuevo, <code>calcularTotalConImpuesto</code>. Para reutilizar código, un desarrollador reorganiza <code>calcularTotal</code> y, al mover la condición del descuento por estadía larga, la reescribe sin querer como <code>noches &gt; 7</code>.</p>
          <p>Las pruebas nuevas del impuesto pasan. Pero al ejecutar la suite completa, una prueba antigua falla:</p>
<pre><code class="lang-java">@Test
void sieteNochesRecibenDiezPorCientoDeDescuento() {
    assertEquals(315.0, calc.calcularTotal(7, 50.0), 0.001);
}
// expected: &lt;315.0&gt; but was: &lt;350.0&gt;</code></pre>
          <p>Esa prueba se escribió meses atrás y nadie pensaba en ella al agregar el impuesto. Gracias a la regresión automatizada, el defecto se detecta en el mismo commit y no en la factura de un huésped que reservó exactamente 7 noches. Se corrige la condición, se vuelve a ejecutar la suite completa y todo queda en verde.</p>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Protege lo que ya funcionaba frente a cambios nuevos.",
          "Automatizada, es rápida, repetible y barata a largo plazo.",
          "Da confianza para refactorizar y actualizar dependencias.",
          "Encaja de forma natural con la integración continua."
        ],
        desventajas: [
          "La suite crece y puede volverse lenta si no se cuida.",
          "Las pruebas automatizadas también requieren mantenimiento.",
          "Pruebas inestables (que fallan al azar) hacen que el equipo deje de confiar en ella."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Cada cambio puede romper algo lejano: la regresión automatizada es la alarma que suena antes de que lo note el cliente.</p>`
      }
    ],
    relacionados: ["prueba-unitaria", "cobertura-codigo", "prueba-sistema"]
  },

  /* ─────────────────────────────── ENFOQUES ─────────────────────────────── */
  {
    id: "caja-negra",
    numero: "09",
    titulo: "Prueba de caja negra",
    categoria: "Enfoques",
    destacado: true,
    sinonimos: ["prueba funcional", "black-box testing", "prueba basada en la especificación", "prueba de comportamiento"],
    resumen:
      "Enfoque que diseña las pruebas a partir de la especificación, observando solo entradas y salidas, sin mirar el código interno.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>En la <strong>prueba de caja negra</strong> el sistema se trata como una caja cerrada: sabemos <em>qué</em> debe hacer (porque lo dice la especificación), pero no miramos <em>cómo</em> lo hace. El tester elige entradas, las introduce por la interfaz (pantalla, API, línea de comandos) y compara las salidas con las que exige el requisito.</p>
          <figure class="figura">
            <svg class="diagrama" viewBox="0 0 640 240" role="img" aria-labelledby="dg-cn-t dg-cn-d">
              <title id="dg-cn-t">Caja negra: entradas y salidas</title>
              <desc id="dg-cn-d">Tres entradas (noches, tarifa, código) entran a una caja cerrada llamada Sistema de reservas; salen el total y un mensaje. El interior no es visible.</desc>
              <defs>
                <marker id="fl-cn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dg-head"/></marker>
              </defs>
              <text x="20" y="28" class="dg-mute">ENTRADAS</text>
              <text x="20" y="72" class="dg-mono">noches = 7</text>
              <text x="20" y="124" class="dg-mono">tarifa = 50,00</text>
              <text x="20" y="176" class="dg-mono">código = "VIP"</text>
              <line x1="150" y1="68" x2="236" y2="90" class="dg-line" marker-end="url(#fl-cn)"/>
              <line x1="150" y1="120" x2="236" y2="120" class="dg-line" marker-end="url(#fl-cn)"/>
              <line x1="150" y1="172" x2="236" y2="150" class="dg-line" marker-end="url(#fl-cn)"/>
              <rect x="240" y="40" width="160" height="160" rx="8" class="dg-cerrada"/>
              <text x="320" y="118" class="dg-txt dg-inv" text-anchor="middle">Sistema</text>
              <text x="320" y="140" class="dg-txt dg-inv" text-anchor="middle">de reservas</text>
              <line x1="404" y1="100" x2="486" y2="80" class="dg-line dg-acc" marker-end="url(#fl-cn)"/>
              <line x1="404" y1="140" x2="486" y2="160" class="dg-line dg-acc" marker-end="url(#fl-cn)"/>
              <text x="496" y="28" class="dg-mute">SALIDAS</text>
              <text x="496" y="84" class="dg-mono">total = 295,00</text>
              <text x="496" y="164" class="dg-mono">mensaje</text>
              <text x="320" y="228" class="dg-mute" text-anchor="middle">El interior no se ve: solo importa si la salida coincide con el requisito.</text>
            </svg>
            <figcaption>Caja negra: el tester controla las entradas y juzga las salidas.</figcaption>
          </figure>
          <p>Como no requiere leer código, la puede diseñar y ejecutar alguien que <strong>no programa</strong>: un analista, un tester funcional o el propio cliente. Basta con entender bien los requisitos.</p>`
      },
      {
        id: "objetivo",
        titulo: "¿Para qué sirve?",
        html: `
          <p>Detecta funciones que faltan o que no se comportan según la especificación, errores en la interfaz, en el manejo de datos de entrada y en el comportamiento ante situaciones límite. Es el enfoque natural de las pruebas de <a href="termino.html?id=prueba-sistema">sistema</a> y de <a href="termino.html?id=prueba-aceptacion">aceptación</a>, aunque también se aplica a nivel unitario cuando se prueba un método solo por su contrato público.</p>`
      },
      {
        id: "como",
        titulo: "¿Cómo se aplica?",
        html: `
          <p>Como las pruebas exhaustivas son imposibles, se usan técnicas para elegir pocos casos con mucho poder de detección:</p>
          <ul>
            <li><strong><a href="termino.html?id=particion-equivalencia">Partición de equivalencia</a>:</strong> dividir las entradas en grupos que el sistema debería tratar igual y probar un representante de cada grupo.</li>
            <li><strong><a href="termino.html?id=valores-limite">Valores límite</a>:</strong> probar justo en los bordes de esos grupos, donde se concentran los errores.</li>
            <li><strong>Tablas de decisión:</strong> cuando el resultado depende de combinaciones de condiciones (estadía larga sí/no × cliente VIP sí/no), se listan todas las combinaciones y la acción esperada para cada una.</li>
            <li><strong>Transición de estados:</strong> cuando el sistema cambia de estado (reserva <em>pendiente → confirmada → pagada → cancelada</em>), se prueban las transiciones válidas y se comprueba que las inválidas se rechazan (por ejemplo, cancelar una reserva ya cancelada).</li>
          </ul>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Especificación del formulario de reserva: <em>"Se aceptan de 1 a 30 noches y de 1 a 4 huéspedes por habitación. Las estadías de 7 noches o más tienen 10 % de descuento. Los clientes VIP reciben además un bono de 20,00"</em>.</p>
          <p>Sin abrir el código, una tabla de decisión para el descuento queda así (tarifa 50,00):</p>
          <div class="tabla-wrap">
          <table>
            <thead><tr><th>Noches</th><th>VIP</th><th>Cálculo esperado</th><th>Total esperado</th></tr></thead>
            <tbody>
              <tr><td>3</td><td>No</td><td>150</td><td>150,00</td></tr>
              <tr><td>3</td><td>Sí</td><td>150 − 20</td><td>130,00</td></tr>
              <tr><td>7</td><td>No</td><td>350 × 0,90</td><td>315,00</td></tr>
              <tr><td>7</td><td>Sí</td><td>350 × 0,90 − 20</td><td>295,00</td></tr>
            </tbody>
          </table>
          </div>
          <p>A estas filas se suman casos de entradas inválidas: 0 noches, 31 noches, 5 huéspedes o un campo vacío, que deben mostrar un mensaje de error claro. Automatizado con JUnit 5, un caso de caja negra solo usa la interfaz pública:</p>
<pre><code class="lang-java">@Test
void reservaDeTreintaYUnaNochesSeRechaza() {
    ValidadorReserva validador = new ValidadorReserva();
    // Solo conocemos la regla: de 1 a 30 noches, de 1 a 4 huéspedes
    assertFalse(validador.esValida(31, 2));
}</code></pre>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "No requiere conocer el lenguaje ni el código fuente.",
          "Prueba desde el punto de vista del usuario y del requisito.",
          "Los casos se pueden diseñar en cuanto existe la especificación, antes del código.",
          "Detecta funcionalidades faltantes, que el código no puede mostrar."
        ],
        desventajas: [
          "No sabe qué partes del código quedaron sin ejecutar.",
          "Si la especificación es ambigua o incompleta, las pruebas también lo serán.",
          "Puede repetir casos que recorren el mismo camino interno.",
          "Cuando falla, no indica en qué línea está el defecto."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Caja negra: no importa cómo está hecho, importa si cumple lo prometido. Se prueba con la especificación en la mano, no con el código.</p>`
      }
    ],
    relacionados: ["caja-blanca", "particion-equivalencia", "valores-limite"]
  },

  {
    id: "caja-blanca",
    numero: "10",
    titulo: "Prueba de caja blanca",
    categoria: "Enfoques",
    destacado: true,
    sinonimos: ["prueba estructural", "white-box testing", "prueba de caja de cristal", "glass-box testing"],
    resumen:
      "Enfoque que diseña las pruebas a partir de la estructura interna del código, buscando ejecutar sus sentencias, ramas y caminos.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>En la <strong>prueba de caja blanca</strong> (o estructural) la caja está abierta: el tester lee el código fuente y diseña los casos para recorrer su <strong>estructura interna</strong>: cada sentencia, cada condición <code>if</code>, cada bucle. La pregunta ya no es solo "¿la salida es correcta?", sino "¿qué partes del código ejecutaron mis pruebas y cuáles quedaron sin tocar?".</p>
          <p>Requiere saber programar, por eso la realiza sobre todo el desarrollador, y es típica de las <a href="termino.html?id=prueba-unitaria">pruebas unitarias</a>.</p>`
      },
      {
        id: "como",
        titulo: "¿Cómo se aplica?",
        html: `
          <p>Se definen <strong>criterios de cobertura</strong>, de menor a mayor exigencia:</p>
          <ul>
            <li><strong>Cobertura de sentencias:</strong> cada línea se ejecuta al menos una vez.</li>
            <li><strong>Cobertura de decisiones (ramas):</strong> cada <code>if</code> se evalúa al menos una vez como verdadero y una vez como falso.</li>
            <li><strong>Cobertura de caminos:</strong> se recorren todas las rutas posibles de principio a fin. Crece muy rápido: cada <code>if</code> independiente duplica la cantidad de caminos.</li>
          </ul>
          <p>Para saber cuántos casos necesitamos como mínimo, se usa la <strong>complejidad ciclomática</strong>, <code>V(G)</code>. Dibujado el código como un grafo de flujo (nodos = bloques, flechas = saltos), la forma más simple de calcularla es:</p>
          <div class="callout" data-tipo="definicion">
            <p class="callout-titulo">Complejidad ciclomática</p>
            <p><code>V(G) = número de decisiones + 1</code>. Un método sin <code>if</code> tiene V(G) = 1 (un solo camino). Cada <code>if</code>, <code>while</code> o <code>for</code> suma uno. El resultado indica cuántos <em>caminos independientes</em> hay que probar para cubrir bien la lógica.</p>
          </div>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Método del hotel con dos decisiones:</p>
<pre><code class="lang-java">public double aplicarDescuento(double total, int noches, boolean esVip) {
    double resultado = total;
    if (noches &gt;= 7) {                // decisión 1
        resultado = resultado * 0.90; // 10 % por estadía larga
    }
    if (esVip) {                      // decisión 2
        resultado = resultado - 20;   // bono fijo para clientes VIP
    }
    return resultado;
}</code></pre>
          <figure class="figura">
            <svg class="diagrama" viewBox="0 0 640 320" role="img" aria-labelledby="dg-cb-t dg-cb-d">
              <title id="dg-cb-t">Caja blanca: grafo de flujo de aplicarDescuento</title>
              <desc id="dg-cb-d">Caja abierta que muestra el grafo de flujo con seis nodos y dos decisiones. Complejidad ciclomática igual a tres.</desc>
              <defs>
                <marker id="fl-cb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dg-head"/></marker>
              </defs>
              <path d="M40,44 L72,10 L568,10 L600,44" class="dg-tapa"/>
              <rect x="40" y="44" width="560" height="262" rx="8" class="dg-box dg-abierta"/>
              <text x="60" y="70" class="dg-mono dg-mute">aplicarDescuento()</text>
              <line x1="180" y1="98" x2="180" y2="122" class="dg-line" marker-end="url(#fl-cb)"/>
              <line x1="193" y1="141" x2="252" y2="163" class="dg-line dg-acc" marker-end="url(#fl-cb)"/>
              <line x1="180" y1="148" x2="180" y2="190" class="dg-line" marker-end="url(#fl-cb)"/>
              <line x1="254" y1="178" x2="196" y2="198" class="dg-line" marker-end="url(#fl-cb)"/>
              <line x1="193" y1="216" x2="252" y2="238" class="dg-line dg-acc" marker-end="url(#fl-cb)"/>
              <line x1="180" y1="223" x2="180" y2="262" class="dg-line" marker-end="url(#fl-cb)"/>
              <line x1="254" y1="253" x2="196" y2="270" class="dg-line" marker-end="url(#fl-cb)"/>
              <circle cx="180" cy="84" r="14" class="dg-nodo"/><text x="180" y="89" class="dg-mono" text-anchor="middle">1</text>
              <circle cx="180" cy="136" r="14" class="dg-nodo dg-decision"/><text x="180" y="141" class="dg-mono" text-anchor="middle">2</text>
              <circle cx="266" cy="172" r="14" class="dg-nodo"/><text x="266" y="177" class="dg-mono" text-anchor="middle">3</text>
              <circle cx="180" cy="208" r="14" class="dg-nodo dg-decision"/><text x="180" y="213" class="dg-mono" text-anchor="middle">4</text>
              <circle cx="266" cy="246" r="14" class="dg-nodo"/><text x="266" y="251" class="dg-mono" text-anchor="middle">5</text>
              <circle cx="180" cy="280" r="14" class="dg-nodo"/><text x="180" y="285" class="dg-mono" text-anchor="middle">6</text>
              <text x="202" y="89" class="dg-txt dg-chico">resultado = total</text>
              <text x="158" y="141" class="dg-txt dg-chico" text-anchor="end">noches ≥ 7 ?</text>
              <text x="288" y="177" class="dg-txt dg-chico">× 0,90</text>
              <text x="158" y="213" class="dg-txt dg-chico" text-anchor="end">esVip ?</text>
              <text x="288" y="251" class="dg-txt dg-chico">− 20</text>
              <text x="202" y="285" class="dg-txt dg-chico">return</text>
              <text x="226" y="146" class="dg-mono dg-chico dg-acc-txt">V</text>
              <text x="166" y="174" class="dg-mono dg-chico dg-mute">F</text>
              <text x="226" y="220" class="dg-mono dg-chico dg-acc-txt">V</text>
              <text x="166" y="248" class="dg-mono dg-chico dg-mute">F</text>
              <line x1="380" y1="80" x2="380" y2="280" class="dg-sep"/>
              <text x="404" y="104" class="dg-txt dg-h">Decisiones: 2</text>
              <text x="404" y="136" class="dg-mono dg-clave-txt">V(G) = 2 + 1 = 3</text>
              <text x="404" y="176" class="dg-txt dg-chico">Ramas a cubrir: 4</text>
              <text x="404" y="200" class="dg-txt dg-chico">(V y F de cada if)</text>
              <text x="404" y="240" class="dg-txt dg-chico">Caminos completos: 4</text>
            </svg>
            <figcaption>Caja abierta: el grafo muestra qué rutas existen y cuáles recorre cada prueba.</figcaption>
          </figure>
          <ul>
            <li><strong>Cobertura de sentencias:</strong> basta <em>un</em> caso con 7 noches y VIP: ejecuta todas las líneas.</li>
            <li><strong>Cobertura de ramas:</strong> hacen falta <em>dos</em> casos: (7 noches, VIP) y (3 noches, no VIP), para ver cada <code>if</code> como verdadero y como falso.</li>
            <li><strong>Caminos independientes:</strong> V(G) = 3, así que se agrega un tercer caso, (3 noches, VIP).</li>
          </ul>
<pre><code class="lang-java">class DescuentoTest {

    private final ServicioTarifas s = new ServicioTarifas();

    @Test
    void estadiaLargaYVip() {          // ramas V, V
        assertEquals(250.0, s.aplicarDescuento(300, 7, true), 0.001);
    }

    @Test
    void estadiaCortaSinVip() {        // ramas F, F
        assertEquals(300.0, s.aplicarDescuento(300, 3, false), 0.001);
    }

    @Test
    void estadiaCortaVip() {           // ramas F, V
        assertEquals(280.0, s.aplicarDescuento(300, 3, true), 0.001);
    }
}</code></pre>
          <div class="callout" data-tipo="ojo">
            <p class="callout-titulo">Ojo</p>
            <p>¿Qué pasa si el total es 15,00 y el cliente es VIP? El método devuelve −5,00. Ningún criterio de cobertura obliga a probarlo: la caja blanca muestra lo que el código <em>hace</em>, no lo que <em>falta</em>. Por eso se combina con la <a href="termino.html?id=caja-negra">caja negra</a>.</p>
          </div>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Mide objetivamente qué parte del código se probó.",
          "Encuentra código muerto, ramas olvidadas y condiciones mal escritas.",
          "Indica con precisión dónde está el defecto.",
          "Se automatiza fácilmente con JUnit y herramientas de cobertura."
        ],
        desventajas: [
          "Requiere saber programar y tener acceso al código fuente.",
          "No detecta requisitos que nunca se programaron.",
          "Si el código cambia, muchas pruebas deben reescribirse.",
          "La cobertura de caminos completa es impracticable en métodos grandes."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Caja blanca: abre la caja y asegúrate de que cada rama del código se ejecutó al menos una vez; lo que nunca se ejecuta, nunca se probó.</p>`
      }
    ],
    relacionados: ["caja-negra", "cobertura-codigo", "prueba-unitaria"]
  },

  {
    id: "caja-gris",
    numero: "11",
    titulo: "Prueba de caja gris",
    categoria: "Enfoques",
    destacado: false,
    sinonimos: ["gray-box testing", "grey-box testing", "prueba translúcida"],
    resumen:
      "Enfoque intermedio: se prueba desde fuera, como en caja negra, pero aprovechando un conocimiento parcial del interior, como la base de datos o la API.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>La <strong>prueba de caja gris</strong> combina los dos enfoques anteriores. El tester ejecuta el sistema desde su interfaz, como en <a href="termino.html?id=caja-negra">caja negra</a>, pero conoce <strong>parte</strong> de su interior: el esquema de la base de datos, el contrato de la API, la arquitectura de módulos o los archivos de log. No lee todo el código fuente, pero sabe lo suficiente para diseñar pruebas más inteligentes y para comprobar efectos que no se ven en pantalla.</p>`
      },
      {
        id: "objetivo",
        titulo: "¿Para qué sirve?",
        html: `
          <p>Es especialmente útil en dos contextos:</p>
          <ul>
            <li><strong>Pruebas de integración:</strong> conocer cómo se comunican los módulos permite apuntar justo a las interfaces (qué datos viajan, en qué formato, qué tabla se actualiza).</li>
            <li><strong>Aplicaciones web:</strong> el tester usa la página como un usuario, pero abre las herramientas de desarrollo del navegador para ver las peticiones HTTP, los códigos de respuesta y el JSON que devuelve la API.</li>
          </ul>
          <p>También ayuda a preparar datos de prueba realistas y a detectar problemas de seguridad, como un campo que la pantalla oculta pero que la API acepta igualmente.</p>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>El tester sabe que, al confirmar una reserva, el sistema debe insertar una fila en la tabla <code>reservas</code> y cambiar a <code>OCUPADA</code> la habitación en la tabla <code>habitaciones</code> para esas fechas. No conoce las clases Java, pero sí el esquema.</p>
          <ol>
            <li>Desde el formulario web, reserva la habitación 204 para Ana Pérez por 3 noches. La pantalla muestra "Reserva confirmada" (esto sería caja negra).</li>
            <li>Luego consulta directamente la base de datos de pruebas:</li>
          </ol>
<pre><code class="lang-sql">SELECT estado, total
FROM reservas
WHERE huesped = 'Ana Pérez' AND habitacion = 204;
-- esperado: CONFIRMADA | 150.00</code></pre>
          <p>Así descubre que la pantalla dice "confirmada", pero en la tabla el estado quedó como <code>PENDIENTE</code>: un defecto invisible desde la interfaz que provocaría que la habitación se vendiera dos veces.</p>
          <div class="callout" data-tipo="practica">
            <p class="callout-titulo">En la práctica</p>
            <p>Revisar este sitio en el navegador y, a la vez, mirar la pestaña "Red" de las herramientas de desarrollo para comprobar que Nginx responde <code>200</code> a los CSS y <code>404</code> a una ruta inexistente es una prueba de caja gris.</p>
          </div>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Combina la visión del usuario con información técnica útil.",
          "Encuentra defectos de datos e integración que la pantalla oculta.",
          "No exige acceso completo al código fuente.",
          "Permite diseñar casos más dirigidos que la caja negra pura."
        ],
        desventajas: [
          "No ofrece la cobertura de código que da la caja blanca.",
          "Requiere acceso a la BD, a los logs o a la documentación interna.",
          "Su alcance depende de cuánto conozca el tester del interior."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Caja gris: pruebas como usuario, pero con un mapa parcial del interior que te dice dónde mirar.</p>`
      }
    ],
    relacionados: ["caja-negra", "caja-blanca", "prueba-integracion"]
  },

  /* ─────────────────────────────── TÉCNICAS ─────────────────────────────── */
  {
    id: "particion-equivalencia",
    numero: "12",
    titulo: "Partición de equivalencia",
    categoria: "Técnicas",
    destacado: false,
    sinonimos: ["clases de equivalencia", "equivalence partitioning", "EP"],
    resumen:
      "Técnica de caja negra que divide las entradas en clases que el sistema debería tratar igual, y prueba un solo representante de cada clase.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>La <strong>partición de equivalencia</strong> parte de una idea sencilla: si el sistema trata igual a todos los valores de un grupo, probar uno de ellos equivale a probarlos todos. Por eso se dividen los posibles valores de entrada en <strong>clases de equivalencia</strong>:</p>
          <ul>
            <li><strong>Clases válidas:</strong> valores que el sistema debe aceptar y procesar.</li>
            <li><strong>Clases inválidas:</strong> valores que el sistema debe rechazar con un mensaje adecuado.</li>
          </ul>
          <p>Luego se elige <strong>un representante</strong> de cada clase. Si 5 noches funciona, se asume que 12 o 20 también; si 45 se rechaza bien, se asume que 60 también.</p>`
      },
      {
        id: "como",
        titulo: "¿Cómo se aplica?",
        html: `
          <ol>
            <li>Identificar cada entrada y sus reglas en la especificación.</li>
            <li>Dividir el dominio de cada entrada en clases válidas e inválidas (rangos, tipos, formatos, valores especiales como vacío o nulo).</li>
            <li>Asignar un identificador a cada clase.</li>
            <li>Escribir casos que cubran <em>varias</em> clases válidas a la vez, pero <em>una sola</em> clase inválida por caso. Si un caso mezcla dos entradas inválidas, el primer error puede ocultar el segundo.</li>
          </ol>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Requisito del hotel: <em>"El número de noches debe ser un entero entre 1 y 30"</em>.</p>
          <div class="tabla-wrap">
          <table>
            <thead><tr><th>Clase</th><th>Descripción</th><th>Tipo</th><th>Representante</th><th>Resultado esperado</th></tr></thead>
            <tbody>
              <tr><td><code>C1</code></td><td>Entero entre 1 y 30</td><td><span class="estado estado-pass">Válida</span></td><td>5</td><td>Se acepta</td></tr>
              <tr><td><code>C2</code></td><td>Entero menor que 1</td><td><span class="estado estado-fail">Inválida</span></td><td>−3</td><td>Error: "mínimo 1 noche"</td></tr>
              <tr><td><code>C3</code></td><td>Entero mayor que 30</td><td><span class="estado estado-fail">Inválida</span></td><td>45</td><td>Error: "máximo 30 noches"</td></tr>
              <tr><td><code>C4</code></td><td>No numérico</td><td><span class="estado estado-fail">Inválida</span></td><td>"tres"</td><td>Error: "ingrese un número"</td></tr>
              <tr><td><code>C5</code></td><td>Campo vacío</td><td><span class="estado estado-fail">Inválida</span></td><td>""</td><td>Error: "campo obligatorio"</td></tr>
            </tbody>
          </table>
          </div>
          <p>Con 5 casos se cubre todo el dominio, en lugar de probar los 30 valores válidos más infinitos inválidos. Con JUnit 5, las pruebas parametrizadas permiten expresar las clases en pocas líneas:</p>
<pre><code class="lang-java">@ParameterizedTest
@ValueSource(ints = {-3, 45})      // representantes de C2 y C3
void rechazaNochesFueraDeRango(int noches) {
    assertFalse(validador.nochesValidas(noches));
}

@Test
void aceptaNochesDentroDelRango() { // representante de C1
    assertTrue(validador.nochesValidas(5));
}</code></pre>
          <p><code>@ParameterizedTest</code> y <code>@ValueSource</code> vienen en el módulo <code>junit-jupiter-params</code> de JUnit 5.</p>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Reduce drásticamente el número de casos sin perder cobertura del dominio.",
          "Obliga a pensar también en las entradas inválidas.",
          "Es sistemática: dos testers llegan a clases parecidas.",
          "Se complementa de forma natural con los valores límite."
        ],
        desventajas: [
          "Supone que todos los valores de una clase se tratan igual, y el código puede no hacerlo.",
          "Por sí sola no prueba los bordes, donde más se falla.",
          "Con muchas entradas que interactúan, las combinaciones vuelven a crecer."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>No pruebes todos los valores: agrúpalos por cómo deberían comportarse y prueba uno de cada grupo, incluidos los grupos inválidos.</p>`
      }
    ],
    relacionados: ["valores-limite", "caja-negra", "caso-prueba"]
  },

  {
    id: "valores-limite",
    numero: "13",
    titulo: "Análisis de valores límite",
    categoria: "Técnicas",
    destacado: false,
    sinonimos: ["boundary value analysis", "BVA", "valores frontera"],
    resumen:
      "Técnica de caja negra que prueba los valores en los bordes de cada clase de equivalencia, porque allí es donde se concentran los errores.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>El <strong>análisis de valores límite</strong> parte de una observación práctica: los programadores rara vez se equivocan en el centro de un rango, pero a menudo lo hacen en sus <strong>bordes</strong>. Escribir <code>&lt;</code> en lugar de <code>&lt;=</code>, empezar un bucle en 1 en vez de 0 o confundir "más de 30" con "30 o más" son errores muy comunes, y todos se manifiestan solo en el valor exacto del límite.</p>
          <p>Por eso, en lugar de probar un valor cualquiera de cada clase, se prueban el <strong>límite</strong> y sus <strong>vecinos inmediatos</strong>.</p>`
      },
      {
        id: "objetivo",
        titulo: "Relación con la partición de equivalencia",
        html: `
          <p>Las dos técnicas trabajan juntas. La <a href="termino.html?id=particion-equivalencia">partición de equivalencia</a> dice <em>qué grupos</em> existen; el análisis de valores límite dice <em>qué valores de cada grupo</em> conviene elegir: los de las fronteras entre una clase y otra. Primero se particiona y después se buscan los bordes de cada partición.</p>`
      },
      {
        id: "como",
        titulo: "¿Cómo se aplica?",
        html: `
          <p>Para un rango válido <code>[mín, máx]</code>, la versión más usada prueba seis valores: <code>mín − 1</code>, <code>mín</code>, <code>mín + 1</code>, <code>máx − 1</code>, <code>máx</code> y <code>máx + 1</code>. Los valores de fuera (<code>mín − 1</code> y <code>máx + 1</code>) deben rechazarse; los demás, aceptarse.</p>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Requisito: <em>"De 1 a 30 noches"</em>. Los valores límite son:</p>
          <div class="tabla-wrap">
          <table>
            <thead><tr><th>Valor</th><th>Posición</th><th>Resultado esperado</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>mín − 1</td><td><span class="estado estado-fail">Rechazar</span></td></tr>
              <tr><td>1</td><td>mín</td><td><span class="estado estado-pass">Aceptar</span></td></tr>
              <tr><td>2</td><td>mín + 1</td><td><span class="estado estado-pass">Aceptar</span></td></tr>
              <tr><td>29</td><td>máx − 1</td><td><span class="estado estado-pass">Aceptar</span></td></tr>
              <tr><td>30</td><td>máx</td><td><span class="estado estado-pass">Aceptar</span></td></tr>
              <tr><td>31</td><td>máx + 1</td><td><span class="estado estado-fail">Rechazar</span></td></tr>
            </tbody>
          </table>
          </div>
<pre><code class="lang-java">@ParameterizedTest
@CsvSource({"0,false", "1,true", "2,true", "29,true", "30,true", "31,false"})
void validaLimitesDeNoches(int noches, boolean esperado) {
    assertEquals(esperado, validador.nochesValidas(noches));
}</code></pre>
          <p>Supón que el método se escribió así:</p>
<pre><code class="lang-java">public boolean nochesValidas(int noches) {
    return noches &gt;= 1 &amp;&amp; noches &lt; 30;   // defecto: debía ser &lt;= 30
}</code></pre>
          <p>Con valores "del medio" como 5 o 15 todo pasa. Solo el caso de <strong>30</strong> falla, y revela que un huésped no puede reservar el máximo permitido. Lo mismo ocurre con el descuento por 7 noches: probar 6, 7 y 8 detecta el clásico <code>&gt;</code> en lugar de <code>&gt;=</code>.</p>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Muy eficaz: encuentra muchos defectos con pocos casos.",
          "Fácil de aprender y de aplicar a cualquier rango numérico o de fechas.",
          "Detecta errores de operadores relacionales y de off-by-one."
        ],
        desventajas: [
          "Solo sirve cuando las entradas tienen un orden y bordes claros.",
          "No detecta errores en el interior del rango ni en la lógica de negocio.",
          "Con varias entradas, combinar todos los límites multiplica los casos."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>Los errores viven en los bordes: si el rango es de 1 a 30, prueba 0, 1, 2, 29, 30 y 31.</p>`
      }
    ],
    relacionados: ["particion-equivalencia", "error-defecto-falla", "caja-negra"]
  },

  {
    id: "cobertura-codigo",
    numero: "14",
    titulo: "Cobertura de código",
    categoria: "Técnicas",
    destacado: false,
    sinonimos: ["code coverage", "cobertura de pruebas", "JaCoCo"],
    resumen:
      "Métrica que indica qué porcentaje del código ejecutan las pruebas: sentencias, ramas o caminos. Mide lo que se ejecutó, no si estaba bien.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>La <strong>cobertura de código</strong> mide qué proporción del código fuente se ejecutó al correr la suite de pruebas. Es la forma de poner un número a la <a href="termino.html?id=caja-blanca">caja blanca</a>: si las pruebas nunca pasan por una línea, esa línea no está probada, por muy bien que se vean los resultados.</p>
          <p>Se calcula con herramientas que instrumentan el programa mientras corren las pruebas y luego generan un informe que pinta en verde las líneas ejecutadas, en rojo las que no y en amarillo las ramas cubiertas solo en parte.</p>`
      },
      {
        id: "como",
        titulo: "Tipos de cobertura",
        html: `
          <ul>
            <li><strong>De sentencias (líneas):</strong> porcentaje de líneas ejecutadas al menos una vez.</li>
            <li><strong>De ramas (decisiones):</strong> porcentaje de salidas de cada decisión (verdadero y falso) que se recorrieron. Es más exigente que la de sentencias.</li>
            <li><strong>De caminos:</strong> rutas completas recorridas. Es la más exigente y casi nunca se mide en proyectos grandes.</li>
          </ul>
          <p>En Java, la herramienta más usada es <strong>JaCoCo</strong>. Se integra con Maven o Gradle mediante un plugin: al ejecutar las pruebas de JUnit, JaCoCo registra qué se ejecutó y genera un informe HTML con el porcentaje de cobertura de líneas y de ramas por paquete, clase y método. Los entornos como IntelliJ IDEA también permiten ejecutar las pruebas "con cobertura" desde el propio editor.</p>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>Retomemos <code>aplicarDescuento(total, noches, esVip)</code>, que tiene dos <code>if</code>. Con una sola prueba:</p>
<pre><code class="lang-java">@Test
void estadiaLargaYVip() {
    assertEquals(250.0, s.aplicarDescuento(300, 7, true), 0.001);
}</code></pre>
          <ul>
            <li>Cobertura de sentencias: <strong>100 %</strong> (todas las líneas se ejecutaron).</li>
            <li>Cobertura de ramas: <strong>50 %</strong> (de 4 ramas, solo se recorrieron las 2 verdaderas).</li>
          </ul>
          <p>JaCoCo marcaría ambos <code>if</code> en amarillo. Al agregar el caso (3 noches, no VIP), la cobertura de ramas sube al 100 %.</p>
          <div class="callout" data-tipo="ojo">
            <p class="callout-titulo">100 % no significa cero defectos</p>
            <p>Si el requisito decía que el bono VIP es de 25,00 y el código resta 20, una prueba que simplemente llame al método sin un <code>assertEquals</code> correcto también da 100 % de cobertura. La cobertura mide qué se <em>ejecutó</em>, no qué se <em>verificó</em>. Tampoco detecta código que falta, como el caso de un total que queda negativo.</p>
          </div>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Muestra objetivamente qué partes del código no tienen pruebas.",
          "Se automatiza y se puede revisar en cada integración continua.",
          "Ayuda a encontrar código muerto o ramas olvidadas."
        ],
        desventajas: [
          "Un porcentaje alto puede dar una falsa sensación de calidad.",
          "Perseguir el 100 % lleva a escribir pruebas sin valor.",
          "No dice nada sobre requisitos que no se programaron."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>La cobertura dice qué código nunca se probó; no dice que el código probado esté bien.</p>`
      }
    ],
    relacionados: ["caja-blanca", "prueba-unitaria", "prueba-regresion"]
  },

  {
    id: "stubs-drivers",
    numero: "15",
    titulo: "Stubs y drivers (dobles de prueba)",
    tituloCorto: "Stubs y drivers",   // opcional: versión corta para el lateral
    categoria: "Técnicas",
    destacado: false,
    sinonimos: ["stub", "driver", "mock", "doble de prueba", "test double", "Mockito"],
    resumen:
      "Piezas de código provisionales que reemplazan a módulos reales durante las pruebas: el stub sustituye a quien es llamado y el driver a quien llama.",
    secciones: [
      {
        id: "definicion",
        titulo: "¿Qué es?",
        html: `
          <p>Cuando se prueba un módulo, a menudo los módulos con los que se comunica todavía no existen, son lentos (una base de datos), cuestan dinero (una pasarela de pagos real) o dan resultados impredecibles. Para aislar lo que se quiere probar se usan <strong>dobles de prueba</strong>: código provisional que ocupa el lugar del módulo real.</p>
          <ul>
            <li><strong>Stub:</strong> reemplaza a un módulo <strong>llamado</strong> (de nivel inferior). Recibe la llamada y devuelve una respuesta fija y predecible. Es la pieza típica de la <a href="termino.html?id=prueba-integracion">integración descendente (top-down)</a>.</li>
            <li><strong>Driver:</strong> reemplaza a un módulo <strong>que llama</strong> (de nivel superior). Es un pequeño programa que invoca al módulo bajo prueba, le pasa datos y revisa lo que devuelve. Es la pieza típica de la <strong>integración ascendente (bottom-up)</strong>.</li>
          </ul>
          <p>Una forma fácil de recordarlo: mira hacia dónde va la llamada. Si el módulo que pruebas <em>llama</em> a algo que falta, necesitas un stub; si nadie lo <em>llama</em> todavía, necesitas un driver.</p>`
      },
      {
        id: "ejemplo",
        titulo: "Ejemplo práctico",
        html: `
          <p>El módulo <code>ServicioReservas</code> necesita cobrar mediante <code>ServicioPagos</code>, que todavía no está terminado. Se crea un <strong>stub</strong> que siempre responde "aprobado":</p>
<pre><code class="lang-java">public interface ServicioPagos {
    boolean cobrar(String tarjeta, double monto);
}

// Stub: ocupa el lugar del módulo de pagos que aún no existe
public class ServicioPagosStub implements ServicioPagos {
    @Override
    public boolean cobrar(String tarjeta, double monto) {
        return true;   // siempre "aprobado"
    }
}

@Test
void reservaConPagoAprobadoQuedaConfirmada() {
    ServicioReservas reservas = new ServicioReservas(new ServicioPagosStub());
    Reserva r = reservas.reservar("Ana Pérez", 3, 50.0);
    assertEquals(EstadoReserva.CONFIRMADA, r.getEstado());
}</code></pre>
          <p>Al revés, si <code>ServicioPagos</code> ya está listo pero aún no existe la pantalla ni el módulo de reservas que lo usará, se escribe un <strong>driver</strong>: una clase de prueba que llama directamente a <code>cobrar("4111…", 150.0)</code> con distintos montos y verifica las respuestas. En JUnit, la propia clase de prueba suele cumplir el papel de driver.</p>
          <div class="callout" data-tipo="practica">
            <p class="callout-titulo">Mocks y Mockito</p>
            <p>Un <strong>mock</strong> es un doble de prueba que, además de responder, registra cómo fue llamado, para poder verificarlo después. En Java se crean con la librería <strong>Mockito</strong>, sin escribir la clase a mano:</p>
<pre><code class="lang-java">ServicioPagos pagos = mock(ServicioPagos.class);
when(pagos.cobrar(anyString(), anyDouble())).thenReturn(false);

Reserva r = new ServicioReservas(pagos).reservar("Ana Pérez", 3, 50.0);

assertEquals(EstadoReserva.RECHAZADA, r.getEstado());
verify(pagos).cobrar(anyString(), eq(150.0));   // ¿se cobró el monto correcto?</code></pre>
          </div>`
      },
      {
        id: "pros-contras",
        titulo: "Ventajas y desventajas",
        ventajas: [
          "Permiten probar un módulo antes de que existan sus dependencias.",
          "Hacen las pruebas rápidas, repetibles y sin costos externos.",
          "Facilitan simular casos difíciles: pago rechazado, servidor caído.",
          "Son la base de las estrategias de integración incremental."
        ],
        desventajas: [
          "Son código extra que hay que escribir y mantener.",
          "Si el doble no se comporta como el módulo real, la prueba engaña.",
          "Abusar de ellos puede ocultar fallas que solo aparecen con los módulos reales."
        ]
      },
      {
        id: "clave",
        titulo: "Idea clave",
        html: `<p>El stub contesta en lugar de quien falta abajo; el driver pregunta en lugar de quien falta arriba.</p>`
      }
    ],
    relacionados: ["prueba-integracion", "prueba-unitaria", "caja-gris"]
  }
];
