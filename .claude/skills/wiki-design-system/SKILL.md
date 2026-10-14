---
name: wiki-design-system
description: Dirección visual, paleta, tipografía y componentes de la wiki "Glosario de Pruebas de Software". Cargar antes de diseñar en Stitch o escribir HTML/CSS del sitio.
---

# Sistema de diseño: Glosario de Pruebas de Software

## Concepto

**"Manual técnico editorial."** El sitio debe sentirse como la documentación de un producto serio, no como una tarea escolar ni como Wikipedia. Busca algo sobrio, legible, con jerarquía clara y pequeños detalles interactivos que lo hagan sentir vivo.

El sitio debe parecer construido sobre una plantilla profesional de documentación: consistente, pulido y con un sistema detrás. **Un solo color de acento + neutros**: nada de paletas por categoría ni tintes decorativos (se ven "hechos con IA").

Implementación de referencia: `site/assets/css/styles.css` (todos los tokens están en `:root` y `[data-theme="dark"]`).

### Sitios de referencia (estudiar su estructura, NO copiarlos)

| Sitio | Qué tomar |
|---|---|
| Stripe Docs | Layout de 3 columnas (navegación, contenido, índice de la página), aire generoso |
| Linear Docs / Changelog | Sobriedad, tipografía cuidada, pocos colores |
| Tailwind CSS Docs | Buscador prominente con atajo de teclado, índice lateral con scrollspy |
| MDN Web Docs | Bloques de "nota" / "advertencia" bien diferenciados, ejemplos en código |
| Vercel Docs / Geist | Contraste, bordes finos, cards limpias |
| GitBook / Notion help center | Portada con categorías |
| Read the Docs + Docusaurus | Navegación anterior / siguiente al pie de cada página |

## Paleta (1 acento + neutros + 2 semánticos)

Nada de azul genérico de Bootstrap, morado de "app de IA", degradados ni colores por categoría.

```css
:root {
  /* Neutros cálidos: papel y tinta */
  --paper:      #F7F5F0;   /* fondo general (también el hero) */
  --surface:    #FFFFFF;   /* tarjetas, paneles, header */
  --ink:        #1C1B19;   /* texto principal */
  --ink-soft:   #5C5A55;   /* texto secundario, iconos de categoría */
  --ink-mute:   #6E6B64;   /* metadatos, placeholders, conteos (AA sobre --paper) */
  --line:       #E4E0D8;   /* bordes finos */

  /* Acento único: SOLO elementos interactivos */
  --accent:     #0F5C4D;   /* verde petróleo */
  --accent-soft:#E3EFEB;

  /* Semánticos: SOLO para su significado */
  --pass:       #2F7D4F;   /* prueba aprobada, ✓, "ventaja", "En la práctica" */
  --fail:       #B4432F;   /* prueba fallida, ✕, "desventaja", "Ojo" */

  /* Footer en tinta oscura */
  --footer-bg: #1C1B19; --footer-ink: #D9D6CF; --footer-mute: #A19E97;
}

[data-theme="dark"] {
  --paper: #121311; --surface: #1A1C19; --ink: #ECEAE4; --ink-soft: #A9A69F;
  --ink-mute: #8A877F; --line: #2A2D29; --accent: #5FBFA6; --accent-soft: #16302A;
  --pass: #6BC48F; --fail: #E07A62;
  --footer-bg: #0A0B09; --footer-ink: #C9C6BF; --footer-mute: #8F8C85;
}
```

### Reglas de uso del color

- **Regla 90/10:** el 90 % de la pantalla son neutros.
- **El acento verde petróleo es SOLO para lo interactivo:** enlaces, ítem activo del menú y del índice, foco, interruptores, botón primario, barra de progreso, flecha de las tarjetas, franja superior del header y logo. También el icono de los callouts neutros, la ★ de "Destacado" y el elemento clave de cada diagrama (como mucho uno).
- **No hay colores por categoría.** Las categorías se distinguen con iconos monocromos y con subtítulos editoriales (ver abajo).
- `--pass` / `--fail` solo cuando significan aprobado / fallido.
- **Hero (modo "color", por defecto):** franja suave de borde a borde, `color-mix(in srgb, var(--accent-soft) 45%, var(--paper))`, hasta la línea `--line` que lo separa de los filtros. En oscuro se adapta sola (porque `--accent-soft` es un verde muy oscuro). Es el único tinte de fondo permitido. Buscador y test runner van sobre `--surface` sólido para destacar.
- **Footer:** fondo `--footer-bg` (tinta oscura) con texto `--footer-ink`, en ambos temas.
- Respeta `prefers-color-scheme` al inicio y guarda la elección del usuario en `localStorage`, con `try/catch`. El tema se aplica con un script mínimo en el `<head>` para evitar el destello.

## Tipografía

| Uso | Fuente | Notas |
|---|---|---|
| Títulos (h1, h2), subtítulos de categoría y logo | **Fraunces** (serif, opsz) | Peso 500–600. Logo a 22 px (20 px en móvil) |
| Cuerpo y UI | **Source Sans 3** | 17 px en escritorio, **16 px en móvil**, `line-height: 1.7`, ancho de línea máx. 70ch |
| Código, comandos, IDs, números, conteos | **JetBrains Mono** | 14–15 px, `font-variant-ligatures: none` (que `>=` se vea tal cual se escribe en Java) |

- Escala: h1 con `clamp(2rem, 6vw + .5rem, 3.4rem)`, h2 28 px, h3 20 px.
- Los h1 no cortan palabras: `hyphens: none; overflow-wrap: normal`.
- **En todo el sitio:** `text-wrap: pretty` en párrafos, `li`, `dd` y `figcaption` (sin palabras sueltas al final), y `text-wrap: balance` en h1–h3. Cifras pegadas a su nombre con `&nbsp;` ("JUnit&nbsp;5").
- Las etiquetas de categoría van en versalitas, `letter-spacing: .06em`, 12–13 px, uppercase, color `--ink-soft`.

## Categorías: cómo se distinguen (sin color)

1. **Icono de línea monocromo** (trazos de Lucide, inline, `stroke: currentColor` en `--ink-soft`, 16 px, trazo 1.75) junto a la etiqueta en versalitas. Va en la tarjeta, en el lateral, en la página de término, en relacionados y en los resultados de búsqueda.
   - Fundamentos = libro abierto · Niveles de prueba = capas · Enfoques = caja · Técnicas = herramienta (llave).
2. **Subtítulos editoriales** cuando el filtro es "Todos": número romano + nombre ("I. Fundamentos", "II. Niveles de prueba", "III. Enfoques", "IV. Técnicas") en Fraunces 24 px, el numeral en `--ink-mute`, línea fina `--line` debajo y el conteo ("3 términos") en mono `--ink-mute` a la derecha. Con un filtro específico, el grid va sin subtítulos.

## Layout

### Header (todas las páginas)

- `position: sticky`, fondo `--surface`, borde inferior de 1 px `--line`, **franja de 3 px en `--accent`** como `border-top`.
- Altura `--header-h`: 68 px en escritorio (≥ 720 px), 60 px en móvil.
- Al hacer scroll (`.con-scroll`): fondo `--surface` al 85 % + `backdrop-filter: blur(8px)` + sombra `0 1px 3px`.
- **Logo:** símbolo `[✓]` en un cuadrado redondeado de 32 px relleno de `--accent`, trazo en `--surface`; texto "Glosario·QA" en Fraunces 22 px. Personalizable con una imagen (ver "Personalización").
- **Navegación:** peso 500, `--ink-soft`; hover `--ink` con subrayado `--line`; el activo en `--accent` con subrayado de 2 px que crece con `transform: scaleX()`.
- Divisor vertical de 1 × 24 px entre navegación y acciones.
- **Búsqueda** con apariencia de campo (220 × 40 px, fondo `--paper`, "Buscar término…", tecla `/`). **Tema** del mismo alto.
- **Móvil (< 720 px):** logo + búsqueda (icono) + tema + hamburguesa, todos de 44 × 44; la hamburguesa abre un panel con los enlaces.

### Búsqueda en ventana

- El botón del header y `/` abren la búsqueda. En la portada (escritorio) se enfoca el buscador del hero; en el resto, o en móvil, se abre una ventana: centrada de 640 px en escritorio, **pantalla completa** en móvil. Resultados con `<mark>` e icono de categoría; Enter abre el primero; Esc cierra.

### Portada (`index.html`)

1. **Header.**
2. **Hero** a todo el ancho con la franja suave (modo "color") o con imagen (modo "imagen", ver "Personalización"), dos columnas desde 1024 px:
   - izquierda: eyebrow, título en Fraunces, descripción, buscador grande, contador "15 términos · 4 categorías";
   - derecha: **tarjeta "test runner"** decorativa (`aria-hidden`): `--surface`, borde `--line`, mono, salida simulada de JUnit con ✓ en `--pass`, una ✕ en `--fail` y "Tests: 5 passed, 1 failed". Líneas que aparecen una por una (solo con `prefers-reduced-motion: no-preference`). Oculta < 1024 px.
3. **Chips de filtro neutros:** borde `--line`, texto `--ink-soft`. **Activo: fondo `--ink`, texto `--surface`** (en oscuro se invierte solo por los tokens). En móvil: una fila con scroll horizontal y `scroll-snap`, chips de 44 px.
4. **Grid de tarjetas** (1 col < 640 px, 2 col 640–1024 px, 3 col > 1024 px), agrupado con subtítulos editoriales cuando el filtro es "Todos". Tarjeta: fondo `--surface`, borde `--line` (sin bordes de color), número mono en `--ink-mute`, icono + categoría, título, resumen y flecha en acento. Hover: borde `--ink-mute` y la flecha se desplaza.
5. **Comparador "Caja negra vs caja blanca"** con interruptor "Abrir la caja".
6. **Ficha de herramienta JUnit 5.**
7. **Footer** en tinta oscura con el logo pequeño (28 px), autor, curso y "Servido con Nginx en Docker".

La portada guarda (sessionStorage, con `try/catch`) filtro, búsqueda y scroll, y **los restaura solo al volver** (botón atrás del navegador o "Volver" del sitio). Si se entra por el logo o un enlace, empieza arriba y sin filtros.

### Página de término (`termino.html?id=slug`)

- **Escritorio (≥ 1240 px), 3 columnas:**
  - Izquierda: términos agrupados por categoría (encabezado = icono + versalitas), con filtro y el actual resaltado en acento. Usa `tituloCorto` si el término lo define (ej. "Stubs y drivers"), para que cada ítem quepa en una línea; la página del término muestra el título completo. Scroll propio e independiente (`overscroll-behavior: contain`, suave) con **barra fina**: `scrollbar-width: thin`, en WebKit 6 px, pulgar `--line` y `--ink-mute` en hover, sin flechas.
  - Centro: breadcrumb solo (sin botón "volver" al lado: serían dos enlaces "Glosario" juntos), luego número + icono + categoría + "Destacado", h1 (sin banda de color), resumen con borde izquierdo de 3 px `--ink`, secciones, relacionados, anterior / siguiente.
  - Derecha: "En esta página" (scrollspy) y "Copiar enlace".
- **1000–1239 px:** dos columnas; "En esta página" pasa a un `<details>` arriba del contenido.
- **< 1000 px:** una columna; drawer de términos con velo (se cierra con Esc, con clic fuera y al elegir un término); `<details>` para el índice.
- **< 768 px:** además, **barra inferior fija** "← Volver · Índice · ↑ Arriba" con `env(safe-area-inset-bottom)` y el `body` reservando su alto.

### Navegación "volver" (término y arquitectura)

- **≥ 768 px: grupo flotante abajo a la DERECHA** (`right: 24px; bottom: 24px`), en fila: píldora **"← Volver al glosario"** (icono de flecha + texto) y botón circular **"↑"**, ambos de 44 px de alto, fondo `--surface`, borde `--line`, sombra mínima. A la izquierda no: taparía la lista del lateral. En escritorio cae en el espacio libre bajo "En esta página" / "Copiar enlace" sin taparlos.
  - Aparece tras ~150 px de scroll (fade + deslizamiento de 200 ms) y **se queda visible mientras se lee**; solo se oculta al volver arriba del todo. Oculto = `inert` (fuera del foco).
  - Cuando el footer entra en pantalla, el grupo sube lo necesario (ajusta `bottom`) para no taparlo.
  - Entre 768 y 999 px (lateral en drawer, sin barra inferior) el grupo suma un botón "Índice" que abre el drawer.
  - En la portada el grupo lleva solo "↑" (tras 400 px en páginas largas).
- **< 768 px:** la barra inferior.
- Lógica: si `document.referrer` es la portada del mismo origen, `history.back()`; si no, abre la portada (URL guardada en sessionStorage o `index.html`).
- Restauración del scroll en la portada: `history.scrollRestoration = "manual"`, se aplica en el primer fotograma tras pintar las tarjetas (sin animación de entrada) y se reaplica tras `document.fonts.ready` si el usuario no se movió.

## Personalización (logo e imagen de fondo)

- Archivo: `site/assets/js/config.js` (cargado antes de `app.js` en todas las páginas):
  ```js
  window.SITE_CONFIG = {
    logo: "",            // vacío = logo SVG actual
    heroModo: "color",   // "color" = franja suave | "imagen" = usa heroFondo
    heroFondo: "",       // ej: "assets/img/fondo-hero.jpg"
    heroOscurecer: 0.55  // 0 a 1, capa oscura sobre la imagen (solo modo "imagen")
  };
  ```
- Imágenes en `site/assets/img/` (ver su `README.txt`): logo PNG/SVG cuadrado ≥ 64 × 64; fondo JPG/WebP ≥ 1920 × 1080, < 500 KB.
- **Logo:** reemplaza el símbolo del header y del footer por un `<img>` (32 × 32, `object-fit: contain`, alt "Logo Glosario QA") y el favicon. Si no carga, vuelve al SVG.
- **Fondo del hero:** por defecto modo `"color"` (franja suave). Con `heroModo: "imagen"`: `background: linear-gradient(rgba(0,0,0,k), rgba(0,0,0,k)), url() center / cover` con `k = heroOscurecer`; el texto del hero pasa a claro (#F7F5F0); buscador y test runner siguen sobre `--surface` sólido. Si `heroFondo` está vacío o la imagen no carga, se queda en modo "color".
- Sin valores, el sitio se ve con el diseño por defecto. Nginx sirve `config.js` y `assets/img/` con `Cache-Control: no-cache`, así que basta con refrescar.

## Responsive (obligatorio)

- Probar a **360, 375, 414 y 768 px**: ninguna página puede tener scroll horizontal.
- Código, tablas y SVG: `overflow-x: auto` dentro de su contenedor y `max-width: 100%`; los diagramas tienen `min-width: 540px` y la figura hace scroll.
- En columnas de grid, los hijos llevan `min-width: 0`.
- **Áreas táctiles mínimas de 44 × 44 px** en móvil; texto base de 16 px.

## Componentes

- **Callouts** "Definición", "Ejemplo": neutros, fondo `--surface`, borde izquierdo de **2 px `--ink`**, título en `--ink` e **icono en acento**. "Ojo" usa `--fail` y "En la práctica" usa `--pass` (borde, título e icono).
- **"Destacado":** etiqueta neutra (borde `--line`, texto `--ink`) con una pequeña **★ en acento**.
- **Ventajas y desventajas:** dos columnas con ✓ (`--pass`) y ✕ (`--fail`).
- **Idea clave:** cita en Fraunces sobre `--surface` con borde `--line`.
- **Bloque de código** con etiqueta de lenguaje y botón copiar; código inline sobre tinta al 7 %.
- **Diagramas SVG inline:** trazos de 1.5 px y textos en tonos de tinta (`.dg-*`); el acento solo en **un elemento clave** por diagrama (`.dg-clave` / `.dg-clave-txt`): V(G) en caja blanca y en el comparador, Nginx en arquitectura.
- **Barra de progreso de lectura** de 2 px en acento, bajo el header.
- **Test runner**, **barra inferior móvil** y **grupo flotante "← Volver al glosario · ↑"** (descritos arriba).

## Interacción y movimiento

- Búsqueda instantánea (título, resumen y sinónimos, sin distinguir tildes), con `<mark>`.
- Atajos: `/` abre la búsqueda; `Esc` cierra búsqueda, menú y drawer.
- Animaciones de 150–300 ms, `ease-out`, solo `transform` y `opacity`, dentro de `@media (prefers-reduced-motion: no-preference)`.
- Fade-up escalonado de las tarjetas al cargar (nunca al volver). Nada de parallax.

## Accesibilidad

- Contraste AA en ambos temas.
- `:focus-visible` con anillo de acento; enlace "Saltar al contenido".
- HTML semántico: `header`, `nav`, `main`, `article`, `aside`, `footer`; subtítulos de categoría como `h2`.
- SVG informativos con `role="img"` y `<title>`; iconos y decorativos con `aria-hidden`.
- Ventanas y paneles devuelven el foco; botones con `aria-expanded` / `aria-pressed`; la píldora flotante sale del orden de tabulación mientras está oculta.

## Lo que NO se debe hacer

- Colores por categoría, tintes de fondo decorativos (salvo la franja del hero) o más de un acento.
- Dos enlaces iguales uno junto al otro (p. ej. un botón "Glosario" pegado al breadcrumb "Glosario / …").
- Flotantes a la izquierda en páginas con lateral izquierdo.
- Usar el acento en elementos no interactivos (salvo los casos listados) o los semánticos fuera de su significado.
- Texto centrado en párrafos largos.
- Sombras pesadas (máximo `0 1px 3px`; solo ventanas flotantes llevan algo más).
- Emojis como iconos, imágenes de stock, aspecto de "plantilla de Bootstrap".
