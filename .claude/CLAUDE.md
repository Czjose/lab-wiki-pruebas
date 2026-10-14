# Proyecto: Wiki "Glosario de Pruebas de Software" en Docker

Laboratorio de Ingeniería de Software Aplicada III (UTP, FISC). El objetivo es construir una **wiki/blog estática hecha desde cero** (HTML + CSS + JS puros, sin frameworks ni CMS) y servirla con **Nginx dentro de un contenedor Docker**.

Autor del sitio: Jose Cruz. Idioma del sitio: **español**.

## Reglas de trabajo (leer antes de empezar)

1. **Velocidad.** No escribas planes largos ni pidas confirmación entre pasos. Construye directo, en este orden:
   1. Diseño con Stitch (2 pantallas).
   2. Estructura de archivos y datos.
   3. Páginas y estilos.
   4. Archivos Docker.
   5. Verificación final.
2. **Ahorro de tokens en TUS respuestas del chat.** Usa los skills de reducción de tokens que el usuario tiene instalados: **caveman**, **ponyman** y **ponytail** (si alguno no aparece en la lista de skills, ignóralo y sigue). Tus mensajes en el chat deben ser cortos: qué hiciste, qué archivo cambió, qué falta.
   - ⚠️ **La reducción de tokens aplica SOLO a tus respuestas en el chat, NUNCA al contenido del sitio.** El glosario debe ir completo, bien redactado y desarrollado.
3. **Skills de diseño.** Antes de escribir HTML/CSS, carga los skills de diseño que estén instalados (por ejemplo `frontend-design` u otros de diseño del usuario) y los skills de este proyecto:
   - `.claude/skills/wiki-design-system/SKILL.md`: dirección visual, paleta, tipografía, componentes.
   - `.claude/skills/glosario-pruebas/SKILL.md`: los 15 términos y cómo redactarlos.
   - `.claude/skills/docker-nginx-wiki/SKILL.md`: archivos Docker y pruebas del contenedor.
4. **Stitch.** El MCP de Stitch ya está configurado. No lo verifiques ni lo instales: úsalo directamente para generar el diseño de la **portada** y de la **página de término** antes de programar. Luego implementa ese diseño a mano en HTML/CSS (no copies código generado sin limpiarlo).
5. **Sin dependencias pesadas.** Nada de React, Vue, Tailwind, Bootstrap ni build steps. Solo:
   - Google Fonts (vía `<link>`).
   - Opcionalmente un set de iconos por CDN (Lucide o Tabler).
6. **Código limpio y comentado en español.** Los comentarios deben explicar el *porqué*, porque el usuario quiere aprender.

## Estructura de archivos esperada

```
lab-wiki-pruebas/
├── .claude/                 (esta carpeta, no tocar salvo para mejorar instrucciones)
├── site/                    ← TODO el sitio vive aquí (es lo que Nginx sirve)
│   ├── index.html           portada + índice buscable del glosario
│   ├── termino.html         plantilla única de término (lee ?id=slug)
│   ├── arquitectura.html    cómo está montado el sitio en Docker (diagrama + explicación)
│   ├── 404.html             página de error con estilo
│   ├── assets/
│   │   ├── css/styles.css
│   │   ├── js/app.js        búsqueda, filtros, tema, índice lateral, etc.
│   │   ├── js/terminos.js   DATOS del glosario (array de objetos)
│   │   └── img/             (solo si hace falta; preferir SVG inline)
│   └── favicon.svg
├── docker-compose.yml
├── Dockerfile
├── nginx.conf               (opcional, para la 404 personalizada y cache)
└── README.md                (corto: cómo levantarlo)
```

- Los datos del glosario van **separados de la presentación** en `terminos.js`. Agregar un término nuevo debe ser solo agregar un objeto.
- Usa `terminos.js` como **script normal** que define `window.TERMINOS = [...]`, no como `fetch` de JSON. Así el sitio también abre con doble clic (file://) sin servidor.

## Definición de "terminado"

- [ ] Los 15 términos están completos según `glosario-pruebas`, sin texto de relleno ni "lorem ipsum".
- [ ] Portada con buscador funcional, filtros por categoría y tarjetas.
- [ ] Página de término con índice lateral, términos relacionados y navegación anterior/siguiente.
- [ ] Modo claro y oscuro.
- [ ] Responsive a 375 px de ancho.
- [ ] `docker compose up -d` levanta el sitio en `http://localhost:8080`.
- [ ] El `healthcheck` del contenedor reporta `healthy`.
- [ ] La página `arquitectura.html` explica imagen, contenedor, puerto, volumen (bind mount) y persistencia con lenguaje simple.
- [ ] Mensaje final en el chat: lista corta de archivos creados + comandos para levantarlo.
