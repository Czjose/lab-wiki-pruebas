---
name: glosario-pruebas
description: Lista de los 15 términos del glosario de pruebas de software, su estructura de datos y las reglas de redacción. Cargar antes de escribir site/assets/js/terminos.js.
---

# Contenido del glosario: Pruebas de Software

## Reglas de redacción

- Español neutro, claro, nivel universitario. Explica como un buen profesor: concepto, luego por qué importa, luego un ejemplo concreto.
- Cada término debe estar **bien desarrollado**: entre 350 y 600 palabras en total, repartidas en sus secciones. Nada de definiciones de una sola línea.
- **No inventes** citas, autores, fechas ni estadísticas. Si mencionas estándares, limítate a lo verificable:
  - ISO/IEC/IEEE 29119 es la norma internacional de pruebas de software.
  - ISTQB es el organismo que define el glosario y la certificación estándar de testers.
- Los ejemplos deben ser cercanos para un estudiante. Usa siempre un **mismo caso conductor**: un sistema de **reservas de hotel** (registrar huésped, calcular total de la estadía, aplicar descuento, guardar en base de datos).
- Cuando haya código, usa **Java + JUnit 5** (la herramienta que usará el curso). El código debe ser corto, correcto y compilable a nivel conceptual.
- Los tres términos **centrales del laboratorio** se marcan con `destacado: true` y llevan algo más de profundidad y un diagrama SVG:
  - Prueba de integración.
  - Prueba de caja negra.
  - Prueba de caja blanca.

## Estructura de cada término (en `window.TERMINOS`)

```js
{
  id: "caja-negra",                 // slug para ?id=
  numero: "09",
  titulo: "Prueba de caja negra",
  categoria: "Enfoques",            // Fundamentos | Niveles de prueba | Enfoques | Técnicas
  destacado: true,
  sinonimos: ["prueba funcional", "black-box testing"],
  resumen: "1–2 frases que se muestran en la tarjeta y en el encabezado.",
  secciones: [
    { id: "definicion",   titulo: "¿Qué es?",              html: "<p>…</p>" },
    { id: "objetivo",     titulo: "¿Para qué sirve?",      html: "…" },
    { id: "como",         titulo: "¿Cómo se aplica?",      html: "… (pasos o técnicas)" },
    { id: "ejemplo",      titulo: "Ejemplo práctico",      html: "… (caso del hotel; código si aplica)" },
    { id: "pros-contras", titulo: "Ventajas y desventajas", ventajas: ["…"], desventajas: ["…"] },
    { id: "clave",        titulo: "Idea clave",            html: "<p>Una frase memorable para cerrar.</p>" }
  ],
  relacionados: ["caja-blanca", "particion-equivalencia", "valores-limite"]
}
```

Las secciones `definicion`, `ejemplo`, `pros-contras` y `clave` son **obligatorias** en todos los términos. `objetivo` y `como` se agregan cuando aplican.

## Los 15 términos

| # | id | Título | Categoría | Puntos que DEBE cubrir |
|---|---|---|---|---|
| 01 | `prueba-software` | Prueba de software | Fundamentos | Qué es probar; verificación ("¿lo construimos bien?") vs validación ("¿construimos lo correcto?"); probar muestra la presencia de defectos, no su ausencia; las pruebas exhaustivas son imposibles. |
| 02 | `caso-prueba` | Caso de prueba | Fundamentos | Partes: ID, precondiciones, datos de entrada, pasos, resultado esperado, resultado obtenido, estado. Incluir una tabla de ejemplo con el caso "aplicar descuento del 10 %". |
| 03 | `error-defecto-falla` | Error, defecto y falla | Fundamentos | La cadena causa → efecto: el error humano produce un defecto en el código, que produce una falla visible al usuario. Ejemplo: usar `>` en vez de `>=`. |
| 04 | `prueba-unitaria` | Prueba unitaria | Niveles de prueba | La unidad más pequeña (método o clase); aislamiento; rapidez; la escribe el desarrollador; ejemplo JUnit con `@Test` y `assertEquals` sobre `calcularTotal(noches, tarifa)`. |
| 05 | `prueba-integracion` ★ | Prueba de integración | Niveles de prueba | Verifica interfaces y comunicación entre módulos ya probados. Enfoques: big bang, descendente (top-down, usa stubs), ascendente (bottom-up, usa drivers) y sándwich. Defectos típicos: formato de datos, orden de llamadas, conexión a la BD. Ejemplo: módulo Reservas ↔ módulo Pagos ↔ BD. Diagrama SVG top-down vs bottom-up. Mencionar que en este laboratorio Nginx + archivos + navegador también forman una integración. |
| 06 | `prueba-sistema` | Prueba de sistema | Niveles de prueba | El sistema completo frente a los requisitos; funcionales y no funcionales (rendimiento, seguridad, usabilidad); entorno parecido a producción. |
| 07 | `prueba-aceptacion` | Prueba de aceptación | Niveles de prueba | La valida el cliente o usuario; UAT; alfa vs beta; criterios de aceptación. |
| 08 | `prueba-regresion` | Prueba de regresión | Niveles de prueba | Volver a ejecutar pruebas tras un cambio; por qué se automatiza; relación con la integración continua. |
| 09 | `caja-negra` ★ | Prueba de caja negra | Enfoques | Se basa en la especificación (entradas → salidas), sin ver el código. Técnicas: partición de equivalencia, valores límite, tablas de decisión, transición de estados. La puede hacer alguien que no programa. Ejemplo: formulario de reserva. SVG de caja cerrada. |
| 10 | `caja-blanca` ★ | Prueba de caja blanca | Enfoques | Se basa en la estructura interna. Coberturas de sentencias, de decisiones (ramas) y de caminos; complejidad ciclomática (V(G) = decisiones + 1) explicada simple. Ejemplo: método `aplicarDescuento` con `if`, con casos para cubrir cada rama y un test JUnit. SVG de caja abierta con un grafo de flujo. |
| 11 | `caja-gris` | Prueba de caja gris | Enfoques | Conocimiento parcial del interior (por ejemplo, conocer la BD o la API sin ver todo el código); útil en integración y en web. |
| 12 | `particion-equivalencia` | Partición de equivalencia | Técnicas | Dividir las entradas en clases válidas e inválidas y probar un representante de cada una. Ejemplo: número de noches (1–30). Tabla de clases. |
| 13 | `valores-limite` | Análisis de valores límite | Técnicas | Los errores se concentran en los bordes. Ejemplo con noches: 0, 1, 2, 29, 30, 31. Relación con la partición de equivalencia. |
| 14 | `cobertura-codigo` | Cobertura de código | Técnicas | Qué porcentaje del código ejecutan las pruebas; tipos (sentencias, ramas); 100 % de cobertura no significa cero defectos; herramientas (JaCoCo con JUnit). |
| 15 | `stubs-drivers` | Stubs y drivers (dobles de prueba) | Técnicas | El stub reemplaza a un módulo **llamado** que aún no existe (top-down); el driver reemplaza a un módulo **que llama** (bottom-up); mención breve a mocks (Mockito). Ejemplo: un stub de `ServicioPagos` que siempre devuelve "aprobado". |

### Extra (no cuenta en los 15): ficha de herramienta "JUnit 5"

Va como sección al final de la portada o como página aparte. Debe explicar:
- Qué es: el framework de pruebas unitarias para Java.
- Anotaciones básicas: `@Test`, `@BeforeEach`, `@DisplayName`.
- Aserciones: `assertEquals`, `assertTrue`, `assertThrows`.
- Cómo se relaciona con la caja blanca, las pruebas unitarias y las pruebas de integración.

Incluye un ejemplo completo y corto.

## Contenido de `arquitectura.html`

Esta página explica el montaje en Docker con lenguaje simple. El usuario está aprendiendo.

- **Imagen** = el molde (como una ISO). **Contenedor** = el molde funcionando (como la VM encendida).
- **Nginx** = el servidor web que entrega los archivos HTML al navegador.
- **Puerto publicado `8080:80`** = la puerta 8080 de la PC conectada con la puerta 80 del contenedor.
- **Bind mount `./site → /usr/share/nginx/html`** = el contenedor "ve" la carpeta del proyecto. Editas el archivo y refrescas.
- **Persistencia** = el contenido vive en tu carpeta, no dentro del contenedor. Si borras el contenedor, no se pierde nada.
- **Healthcheck** = Docker revisa cada cierto tiempo que el sitio responde.

Incluye un diagrama SVG: Navegador → localhost:8080 → contenedor `wiki-pruebas` (Nginx) → carpeta `site/`.

Agrega una tabla de "pruebas al contenedor" que conecte con el glosario:
- Abrir la página y verificar que responde = **caja negra / prueba de humo**.
- Revisar `docker logs` / `docker inspect` = **más cercano a caja blanca**.
- Comprobar que Nginx entrega bien los archivos del volumen = **integración**.
