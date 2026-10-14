/*
 * Lógica del sitio. Un solo archivo para todas las páginas:
 * cada bloque comprueba si su elemento existe antes de actuar,
 * así no hace falta un JS distinto por página.
 *
 * Depende de window.TERMINOS (definido en terminos.js, que se carga antes).
 */
(function () {
  "use strict";

  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));
  const TERMINOS = window.TERMINOS || [];
  // Orden fijo de categorías: es el orden didáctico (de lo general a lo específico)
  const CATEGORIAS = ["Fundamentos", "Niveles de prueba", "Enfoques", "Técnicas"];
  const ROMANOS = ["I", "II", "III", "IV"];
  /* Un icono de línea monocromo por categoría (trazos de Lucide, MIT), dibujado inline:
     así la categoría se distingue sin agregar colores. */
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONOS = {
    "Fundamentos": svg('<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>'),   // libro abierto
    "Niveles de prueba": svg('<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>'),   // capas
    "Enfoques": svg('<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'),   // caja
    "Técnicas": svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>')   // herramienta
  };
  // Etiqueta de categoría: icono + texto en versalitas (clase .cat)
  const etiquetaCat = (c) => `<span class="cat cat-ico">${ICONOS[c] || ""}${esc(c)}</span>`;
  // Prefijo opcional para los enlaces que arma el JS. Vacío: todas las rutas son relativas
  // (la 404, que se sirve desde cualquier ruta, lo resuelve con su propio <base>).
  const RAIZ = document.documentElement.dataset.raiz || "";
  const urlTermino = (id) => `${RAIZ}termino.html?id=${encodeURIComponent(id)}`;
  const CLAVE_ESTADO = "glosario-estado";   // filtro, búsqueda y scroll de la portada
  const CLAVE_INDICE = "glosario-indice";   // URL de la portada desde la que se salió
  const CLAVE_VOLVER = "glosario-volver";   // marca: la próxima carga de la portada es un "volver"

  /* sessionStorage puede estar bloqueado (modo privado, file:// en algunos navegadores):
     si falla, el sitio sigue funcionando, solo que sin recordar el estado. */
  const sesion = {
    leer(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch (e) { return null; } },
    guardar(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };

  /* Escapa texto antes de meterlo en innerHTML, para no interpretar < > & como HTML */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Quita tildes y pasa a minúsculas: así "integracion" encuentra "integración".
     En español las letras con tilde son un solo carácter, por eso la longitud
     del texto no cambia y las posiciones sirven para resaltar en el original. */
  const norm = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  /* Devuelve el texto escapado con todas las coincidencias envueltas en <mark> */
  function resaltar(texto, q) {
    if (!q) return esc(texto);
    const n = norm(texto);
    let html = "", desde = 0, i;
    while ((i = n.indexOf(q, desde)) !== -1) {
      html += esc(texto.slice(desde, i)) + "<mark>" + esc(texto.slice(i, i + q.length)) + "</mark>";
      desde = i + q.length;
    }
    return html + esc(texto.slice(desde));
  }

  /* Términos que coinciden con la búsqueda (título, resumen o sinónimos) */
  const coincide = (t, q) => !q || [t.titulo, t.resumen, ...t.sinonimos].some((s) => norm(s).includes(q));

  /* Copiar al portapapeles. navigator.clipboard solo funciona en contextos
     seguros (https o localhost); con file:// se usa el método antiguo. */
  async function copiar(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
      ta.remove();
      return ok;
    }
  }

  /* Cambia el texto de un botón un momento para confirmar la acción */
  function confirmar(boton, texto) {
    const original = boton.dataset.original || boton.innerHTML;
    boton.dataset.original = original;
    boton.textContent = texto;
    clearTimeout(boton._t);
    boton._t = setTimeout(() => { boton.innerHTML = original; }, 1800);
  }

  // Scroll instantáneo aunque el CSS tenga scroll-behavior: smooth (para restaurar posiciones)
  const irA = (y) => window.scrollTo({ top: y, left: 0, behavior: "instant" });

  /* ───────────────────────── Personalización (config.js) ─────────────────────────
     Sin valores en SITE_CONFIG no se toca nada. Cada imagen se prueba primero:
     si no carga, el sitio queda exactamente con su diseño por defecto. */
  const CONFIG = window.SITE_CONFIG || {};
  // Rutas relativas a site/; en la 404 (servida desde cualquier carpeta) se anteponen con "/"
  const ruta = (p) => (/^(https?:|data:|\/)/.test(p) ? p : RAIZ + p);

  if (typeof CONFIG.logo === "string" && CONFIG.logo.trim()) {
    const src = ruta(CONFIG.logo.trim());
    $$(".logo-marca").forEach((marca) => {
      const original = marca.innerHTML;
      const img = new Image();
      img.alt = "Logo Glosario QA";
      img.width = 32;
      img.height = 32;
      img.onerror = () => { marca.innerHTML = original; marca.classList.remove("con-img"); };
      img.src = src;
      marca.classList.add("con-img");
      marca.replaceChildren(img);
    });
    // El favicon solo cambia si la imagen realmente cargó
    const prueba = new Image();
    prueba.onload = () => { const f = $('link[rel="icon"]'); if (f) { f.href = src; f.removeAttribute("type"); } };
    prueba.src = src;
  }

  // Hero: modo "color" (por defecto, lo pone el CSS) o "imagen". El modo imagen solo se
  // activa si hay ruta y la imagen carga; si no, queda el modo color sin hacer nada.
  const hero = $(".hero");
  if (hero && CONFIG.heroModo === "imagen" && typeof CONFIG.heroFondo === "string" && CONFIG.heroFondo.trim()) {
    const src = ruta(CONFIG.heroFondo.trim());
    const oscuro = Math.min(1, Math.max(0, Number(CONFIG.heroOscurecer)));
    const img = new Image();
    img.onload = () => {
      // JSON.stringify deja la URL entre comillas y escapa las que tenga dentro (válido en CSS)
      hero.style.setProperty("--hero-img", `url(${JSON.stringify(img.src)})`);
      hero.style.setProperty("--hero-oscuro", String(Number.isFinite(oscuro) ? oscuro : 0.55));
      hero.classList.add("con-fondo");
    };
    img.src = src;
  }

  /* ───────────────────────── Tema claro / oscuro ─────────────────────────
     El tema inicial ya lo puso un script mínimo en el <head> (para evitar
     un parpadeo de color). Aquí solo se gestiona el botón. */
  const btnTema = $("[data-tema]");
  function etiquetarTema() {
    if (!btnTema) return;
    const oscuro = document.documentElement.dataset.theme === "dark";
    btnTema.setAttribute("aria-label", oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    btnTema.setAttribute("aria-pressed", String(oscuro));
  }
  if (btnTema) {
    etiquetarTema();
    btnTema.addEventListener("click", () => {
      const nuevo = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nuevo;
      try { localStorage.setItem("tema", nuevo); } catch (e) { /* almacenamiento bloqueado: el tema dura solo esta visita */ }
      etiquetarTema();
    });
  }

  /* ───────────────────────── Menú móvil (hamburguesa) ───────────────────────── */
  const btnMenu = $(".btn-menu");
  function menu(abrir) {
    if (!btnMenu) return;
    document.body.classList.toggle("menu-abierto", abrir);
    btnMenu.setAttribute("aria-expanded", String(abrir));
    btnMenu.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
  }
  if (btnMenu) {
    btnMenu.addEventListener("click", () => menu(!document.body.classList.contains("menu-abierto")));
    // Clic fuera del panel o en un enlace: se cierra
    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("menu-abierto")) return;
      if (e.target.closest(".btn-menu")) return;
      if (!e.target.closest(".nav-principal") || e.target.closest("a")) menu(false);
    });
  }

  /* ───────────────────────── Drawer de términos (< 1000 px) ───────────────────────── */
  const velo = $(".velo");
  const lateral = $(".lateral-izq");
  let focoPrevio = null;
  function drawer(abrir) {
    if (!lateral || abrir === document.body.classList.contains("drawer-abierto")) return;
    document.body.classList.toggle("drawer-abierto", abrir);
    if (velo) velo.hidden = !abrir;
    if (abrir) {
      focoPrevio = document.activeElement;
      const f = $("input, a", lateral);
      if (f) f.focus();
    } else if (focoPrevio) {
      focoPrevio.focus();   // devolver el foco a donde estaba (accesibilidad con teclado)
    }
  }
  if (velo) velo.addEventListener("click", () => drawer(false));

  /* ───────────────────────── Búsqueda en ventana ─────────────────────────
     Disponible en todas las páginas. En la portada (escritorio) se usa
     el buscador grande del hero; en el resto, o en móvil, esta ventana. */
  let modal = null;
  function crearModal() {
    modal = document.createElement("div");
    modal.className = "busqueda-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <div class="busqueda-caja" role="dialog" aria-modal="true" aria-label="Buscar en el glosario">
        <form class="buscador" role="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <label class="sr-only" for="q-modal">Buscar término</label>
          <input id="q-modal" type="search" placeholder="Buscar término…" autocomplete="off" spellcheck="false">
          <button type="button" class="btn-cerrar">Cerrar</button>
        </form>
        <ul class="resultados" aria-live="polite"></ul>
      </div>`;
    document.body.appendChild(modal);
    const input = $("input", modal);
    const lista = $(".resultados", modal);
    const pintar = () => {
      const q = norm(input.value.trim());
      const r = TERMINOS.filter((t) => coincide(t, q));
      lista.innerHTML = r.length
        ? r.map((t) => `<li><a href="${urlTermino(t.id)}"><span class="num">${esc(t.numero)}</span><span>${resaltar(t.titulo, q)}</span>${etiquetaCat(t.categoria)}</a></li>`).join("")
        : `<li class="vacio">Sin resultados para «${esc(input.value.trim())}».</li>`;
    };
    input.addEventListener("input", pintar);
    $("form", modal).addEventListener("submit", (e) => {
      e.preventDefault();
      const a = $("a", lista);
      if (a) location.href = a.getAttribute("href");
    });
    $(".btn-cerrar", modal).addEventListener("click", () => busqueda(false));
    modal.addEventListener("click", (e) => { if (e.target === modal) busqueda(false); });
    pintar();
  }
  function busqueda(abrir) {
    if (abrir) {
      if (!modal) crearModal();
      focoPrevio = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";   // evita que la página se desplace detrás
      $("input", modal).focus();
      menu(false);
    } else if (modal && !modal.hidden) {
      modal.hidden = true;
      document.body.style.overflow = "";
      if (focoPrevio) focoPrevio.focus();
    }
  }

  /* Abrir búsqueda: buscador del hero si existe y se ve en escritorio; si no, la ventana */
  function enfocarBusqueda() {
    const hero = $("[data-buscar]");
    if (hero && innerWidth >= 720) {
      hero.scrollIntoView({ block: "center" });
      hero.focus();
      hero.select();
    } else {
      busqueda(true);
    }
  }
  const btnBuscar = $("[data-abrir-busqueda]");
  if (btnBuscar) btnBuscar.addEventListener("click", (e) => { e.preventDefault(); enfocarBusqueda(); });

  /* ───────────────────────── Atajos de teclado ───────────────────────── */
  const esCampo = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

  document.addEventListener("keydown", (e) => {
    // "/" abre la búsqueda (salvo que ya estemos escribiendo en un campo)
    if (e.key === "/" && !esCampo(e.target) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      enfocarBusqueda();
    }
    if (e.key === "Escape") {
      if (modal && !modal.hidden) { busqueda(false); return; }
      const activo = document.activeElement;
      if (activo && activo.matches("[data-buscar]")) {
        // Primer Esc borra la búsqueda; el segundo quita el foco
        if (activo.value) { activo.value = ""; activo.dispatchEvent(new Event("input")); }
        else activo.blur();
      }
      drawer(false);
      menu(false);
    }
  });

  /* ───────────────────────── Estado del servidor (footer) ─────────────────────────
     Si la página llega por http(s), la está sirviendo Nginx; si llega por
     file://, se abrió con doble clic. Es un detalle, pero enseña la diferencia. */
  const estado = $("[data-estado]");
  if (estado) {
    const servido = location.protocol.startsWith("http");
    $(".punto", estado).classList.toggle("ok", servido);
    $(".texto-estado", estado).textContent = servido
      ? "Servido con Nginx en Docker"
      : "Abierto como archivo local (sin servidor)";
  }

  /* ───────────────────────── Volver ─────────────────────────
     Si llegamos desde la portada, history.back() la recupera tal cual
     (filtro, búsqueda y scroll). Si se entró por un enlace directo,
     se abre la portada; su estado igual se restaura desde sessionStorage. */
  function volver() {
    let ref = null;
    try { ref = new URL(document.referrer); } catch (e) { ref = null; }
    const desdePortada = ref && ref.origin === location.origin && /\/(index\.html)?$/.test(ref.pathname);
    sesion.guardar(CLAVE_VOLVER, true);
    if (desdePortada && history.length > 1) history.back();
    else location.href = sesion.leer(CLAVE_INDICE) || RAIZ + "index.html";
  }
  // Delegación: el botón de término.html se pinta después, junto con el artículo
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-volver]")) { e.preventDefault(); volver(); }
  });

  const esLectura = !!$("main .articulo");   // término y arquitectura

  if (esLectura) {
    // Barra inferior móvil (< 768 px, la muestra el CSS): Volver · Índice (si hay drawer) · Arriba
    const barra = document.createElement("nav");
    barra.className = "barra-inferior";
    barra.setAttribute("aria-label", "Navegación rápida");
    barra.innerHTML = `<button type="button" data-accion="volver">← Volver</button>
      ${lateral ? '<button type="button" data-accion="indice" aria-controls="lateral-izq">Índice</button>' : ""}
      <button type="button" data-accion="arriba">↑ Arriba</button>`;
    document.body.appendChild(barra);
    document.body.classList.add("con-barra");
  }

  /* Grupo flotante abajo a la derecha (≥ 768 px): [← Volver al glosario] [Índice*] [↑]
     *Índice solo se ve entre 768 y 999 px, donde el lateral es un drawer y no hay barra inferior.
     En la portada el grupo lleva solo "↑". */
  let flotantes = null;
  if ($("main")) {
    flotantes = document.createElement("div");
    flotantes.className = "flotantes";
    flotantes.inert = true;   // oculto = fuera del foco y de los lectores de pantalla
    const flecha = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
    flotantes.innerHTML = (esLectura
      ? `<a class="btn-flotante" href="${RAIZ}index.html" data-volver>${flecha}Volver al glosario</a>
         ${lateral ? '<button type="button" class="btn-flotante btn-indice" data-accion="indice" aria-controls="lateral-izq">Índice</button>' : ""}`
      : "") + '<button type="button" class="btn-flotante btn-arriba" data-accion="arriba" aria-label="Volver arriba">↑</button>';
    document.body.appendChild(flotantes);
  }

  // Acciones compartidas por la barra inferior y el grupo flotante
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-accion]");
    if (!b) return;
    if (b.dataset.accion === "volver") volver();
    if (b.dataset.accion === "indice") drawer(true);
    if (b.dataset.accion === "arriba") window.scrollTo({ top: 0 });
  });

  /* ───────────────────────── Scroll: sombra del header, flotantes y progreso ─────────────────────────
     Un solo listener y requestAnimationFrame: como mucho un cálculo por fotograma. */
  const header = $(".header");
  const barraProgreso = $(".progreso");
  const footer = $(".footer");
  let pendiente = false;
  function alHacerScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (header) header.classList.toggle("con-scroll", y > 4);
    if (flotantes) {
      // Páginas de lectura: aparece a los ~150 px y se queda; solo se oculta arriba del todo.
      // Portada: solo "↑", tras 400 px y si la página es larga.
      const mostrar = esLectura ? y > 150 : y > 400 && max > innerHeight;
      flotantes.classList.toggle("visible", mostrar);
      flotantes.inert = !mostrar;
      // Si el footer entra en pantalla, el grupo sube lo necesario para no taparlo
      const solape = footer ? innerHeight - footer.getBoundingClientRect().top : 0;
      flotantes.style.bottom = `${24 + Math.max(0, solape)}px`;
    }
    if (barraProgreso) barraProgreso.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    pendiente = false;
  }
  addEventListener("scroll", () => { if (!pendiente) { pendiente = true; requestAnimationFrame(alHacerScroll); } }, { passive: true });
  addEventListener("resize", () => { if (innerWidth >= 720) menu(false); if (innerWidth >= 1000) drawer(false); });

  /* ───────────────────────── Tarjeta reutilizable ───────────────────────── */
  const FLECHA = '<svg class="flecha" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function tarjeta(t, q, extra = "") {
    return `<a class="tarjeta" href="${urlTermino(t.id)}">
      <div class="tarjeta-top"><span class="num">${esc(t.numero)}</span>${etiquetaCat(t.categoria)}${t.destacado ? '<span class="badge">Destacado</span>' : ""}</div>
      <h3>${resaltar(t.titulo, q)}</h3>${extra}
      <p>${resaltar(t.resumen, q)}</p>
      ${FLECHA}
    </a>`;
  }

  /* ───────────────────────── Portada ───────────────────────── */
  function iniciarPortada() {
    const grid = $("#grid");
    const input = $("[data-buscar]");
    const filtros = $("#filtros");
    const contador = $("#contador");
    let categoria = "Todos";

    // Las páginas de término usan esta URL para "volver" (incluye ?q= si lo hubiera)
    sesion.guardar(CLAVE_INDICE, location.href.split("#")[0]);

    // Chips de categoría con el número de términos de cada una
    const cuenta = (c) => TERMINOS.filter((t) => c === "Todos" || t.categoria === c).length;
    filtros.innerHTML = ["Todos", ...CATEGORIAS]
      .map((c) => `<li><button type="button" class="chip" aria-pressed="false" data-cat="${esc(c)}">${esc(c)}<span class="n">${cuenta(c)}</span></button></li>`)
      .join("");

    function elegir(c) {
      categoria = CATEGORIAS.includes(c) ? c : "Todos";
      $$("[data-cat]", filtros).forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.cat === categoria)));
    }

    filtros.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      elegir(b.dataset.cat);
      // En móvil, desplaza SOLO la fila de chips para que el elegido quede a la vista.
      // (Antes se usaba scrollIntoView, que con scroll-behavior: smooth también animaba
      // el scroll vertical de la página y podía pisar la posición que luego se guarda.)
      if (filtros.scrollWidth > filtros.clientWidth) {
        filtros.scrollLeft += b.parentElement.getBoundingClientRect().left - filtros.getBoundingClientRect().left - 16;
      }
      pintar(false);
    });

    function pintar(animar) {
      const q = norm(input.value.trim());
      const visibles = TERMINOS.filter((t) => (categoria === "Todos" || t.categoria === categoria) && coincide(t, q));

      // Si solo coincide un sinónimo, se muestra para que el usuario entienda por qué aparece
      const extraDe = (t) => {
        const sin = q && !norm(t.titulo).includes(q) ? t.sinonimos.find((s) => norm(s).includes(q)) : null;
        return sin ? `<p class="sinonimo">También: ${resaltar(sin, q)}</p>` : "";
      };
      // --i numera las tarjetas en orden global para la aparición escalonada
      const lista = (arr, base) => `<ul class="grid">${arr.map((t, i) => `<li class="${animar ? "aparece" : ""}" style="--i:${base + i}">${tarjeta(t, q, extraDe(t))}</li>`).join("")}</ul>`;

      if (!visibles.length) {
        grid.innerHTML = `<p class="vacio">No hay términos que coincidan con «${esc(input.value.trim())}». Prueba con otra palabra o elige «Todos».</p>`;
      } else if (categoria === "Todos") {
        // Con "Todos", un subtítulo editorial por categoría: "I. Fundamentos"
        let base = 0;
        grid.innerHTML = CATEGORIAS.map((c, n) => {
          const grupo = visibles.filter((t) => t.categoria === c);
          if (!grupo.length) return "";
          const html = `<section class="grupo-cat" aria-labelledby="grupo-${n}">
            <h2 class="grupo-titulo" id="grupo-${n}"><span class="romano">${ROMANOS[n]}.</span> ${esc(c)}<span class="n">${grupo.length} ${grupo.length === 1 ? "término" : "términos"}</span></h2>
            ${lista(grupo, base)}
          </section>`;
          base += grupo.length;
          return html;
        }).join("");
      } else {
        grid.innerHTML = lista(visibles, 0);
      }

      const total = TERMINOS.length;
      contador.innerHTML = !q && categoria === "Todos"
        ? `<strong>${total} términos</strong> · ${CATEGORIAS.length} categorías`
        : `<strong>${visibles.length}</strong> de ${total} términos`;
    }

    input.addEventListener("input", () => pintar(false));
    // Al enviar el formulario (Enter) se abre el primer resultado
    input.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const primero = $(".tarjeta", grid);
      if (primero) location.href = primero.getAttribute("href");
    });

    // Guardar el estado al salir de la página (pagehide funciona también en móvil y con bfcache)
    addEventListener("pagehide", () => sesion.guardar(CLAVE_ESTADO, { q: input.value, cat: categoria, y: scrollY }));

    // El scroll lo restauramos nosotros: si el navegador también lo intenta (modo "auto"),
    // lo hace antes de que existan las tarjetas y puede dejar la página arriba.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    // Restaurar: ?q= de la URL tiene prioridad; si no, lo guardado en esta sesión
    const qUrl = new URLSearchParams(location.search).get("q");
    // Solo se restaura al VOLVER (botón atrás del navegador o "← Volver" del sitio);
    // si se entra por el logo o un enlace, la portada empieza desde arriba y sin filtros.
    const nav = performance.getEntriesByType ? performance.getEntriesByType("navigation")[0] : null;
    const volviendo = (nav && nav.type === "back_forward") || sesion.leer(CLAVE_VOLVER) === true;
    sesion.guardar(CLAVE_VOLVER, false);
    const previo = volviendo ? sesion.leer(CLAVE_ESTADO) : null;
    if (qUrl) input.value = qUrl;
    else if (previo) input.value = previo.q || "";
    elegir(previo && !qUrl ? previo.cat : "Todos");
    pintar(!previo);
    /* Al volver no hay animación de entrada (pintar(false)), así el layout no se mueve.
       Se restaura en el primer fotograma (para no mostrar la página arriba mientras cargan
       las fuentes de Google, que sin caché tardan casi un segundo) y otra vez cuando
       document.fonts.ready confirma las fuentes, porque cambian la altura del texto.
       La segunda vez solo si el usuario no se movió mientras tanto. */
    if (previo && !qUrl && location.hash !== "#buscar") {
      const y = Number(previo.y) || 0;
      let seMovio = false;
      ["wheel", "touchstart", "keydown"].forEach((ev) => addEventListener(ev, () => { seMovio = true; }, { once: true, passive: true }));
      requestAnimationFrame(() => irA(y));
      const fuentes = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
      fuentes.then(() => requestAnimationFrame(() => { if (!seMovio && Math.round(scrollY) !== y) irA(y); }));
    }
    if (qUrl || location.hash === "#buscar") input.focus();

    /* Comparador caja negra vs caja blanca */
    const sw = $("#switch-caja");
    if (sw) {
      sw.addEventListener("click", () => {
        const abierta = sw.getAttribute("aria-checked") !== "true";
        sw.setAttribute("aria-checked", String(abierta));
        $("#figura-caja").classList.toggle("abierta", abierta);
        $("#texto-negra").hidden = abierta;
        $("#texto-blanca").hidden = !abierta;
        $("#estado-caja").textContent = abierta ? "Caja abierta: caja blanca" : "Caja cerrada: caja negra";
      });
    }
  }

  /* ───────────────────────── Página de término ───────────────────────── */
  function iniciarTermino() {
    const articulo = $("#articulo");
    const id = new URLSearchParams(location.search).get("id");
    const idx = TERMINOS.findIndex((t) => t.id === id);

    pintarNav(idx >= 0 ? TERMINOS[idx].id : null);

    if (idx < 0) {
      document.title = "Término no encontrado · Glosario·QA";
      articulo.innerHTML = `<p class="migas"><a href="index.html">Glosario</a></p>
        <h1>Término no encontrado</h1>
        <p class="resumen">No existe ningún término con el identificador «${esc(id || "")}». Revisa el enlace o vuelve al glosario.</p>
        <p><a class="boton" href="index.html">Ver todos los términos</a></p>`;
      $(".toc-movil").hidden = true;
      return;
    }

    const t = TERMINOS[idx];
    const ant = TERMINOS[idx - 1];
    const sig = TERMINOS[idx + 1];
    document.title = `${t.titulo} · Glosario·QA`;

    const cuerpo = (s) => {
      if (s.id === "pros-contras") {
        const lista = (arr) => `<ul>${(arr || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
        return `<div class="pros-contras">
          <div class="lista-pros"><h3>Ventajas</h3>${lista(s.ventajas)}</div>
          <div class="lista-contras"><h3>Desventajas</h3>${lista(s.desventajas)}</div>
        </div>`;
      }
      return s.id === "clave" ? `<div class="idea-clave">${s.html}</div>` : s.html;
    };

    const relacionados = t.relacionados
      .map((rid) => TERMINOS.find((x) => x.id === rid))
      .filter(Boolean)
      .map((r) => `<a class="tarjeta" href="${urlTermino(r.id)}">
          <div class="tarjeta-top"><span class="num">${esc(r.numero)}</span>${etiquetaCat(r.categoria)}</div>
          <h3>${esc(r.titulo)}</h3></a>`)
      .join("");

    articulo.innerHTML = `
      <nav class="migas" aria-label="Ruta de navegación">
        <a href="index.html">Glosario</a><span aria-hidden="true">/</span>${esc(t.categoria)}<span aria-hidden="true">/</span><span aria-current="page">${esc(t.titulo)}</span>
      </nav>
      <div class="cabecera">
        <div class="meta">
          <span class="num">${esc(t.numero)}</span>
          ${etiquetaCat(t.categoria)}
          ${t.destacado ? '<span class="badge">Destacado</span>' : ""}
        </div>
        <h1>${esc(t.titulo)}</h1>
      </div>
      <p class="resumen">${esc(t.resumen)}</p>
      ${t.sinonimos.length ? `<p class="sinonimos">También conocido como: ${t.sinonimos.map(esc).join(", ")}</p>` : ""}
      ${t.secciones.map((s) => `
        <section id="${esc(s.id)}" aria-labelledby="h-${esc(s.id)}">
          <h2 id="h-${esc(s.id)}">${esc(s.titulo)}</h2>
          ${cuerpo(s)}
        </section>`).join("")}
      ${relacionados ? `<section id="relacionados" aria-labelledby="h-relacionados"><h2 id="h-relacionados">Términos relacionados</h2><div class="relacionados">${relacionados}</div></section>` : ""}
      <nav class="pager" aria-label="Anterior y siguiente">
        ${ant ? `<a class="ant" href="${urlTermino(ant.id)}" rel="prev"><small>← Anterior</small><strong>${esc(ant.titulo)}</strong></a>` : ""}
        ${sig ? `<a class="sig" href="${urlTermino(sig.id)}" rel="next"><small>Siguiente →</small><strong>${esc(sig.titulo)}</strong></a>` : ""}
      </nav>`;

    // Índice "En esta página": columna derecha (escritorio) y <details> (pantallas angostas)
    const secciones = $$("section[id]", articulo);
    const itemsToc = secciones
      .map((s) => `<li><a href="#${s.id}" data-sec="${s.id}">${esc($("h2", s).textContent)}</a></li>`)
      .join("");
    $("#toc").innerHTML = itemsToc;
    const tocMovil = $("#toc-movil");
    if (tocMovil) {
      tocMovil.innerHTML = itemsToc;
      tocMovil.addEventListener("click", (e) => { if (e.target.closest("a")) tocMovil.closest("details").open = false; });
    }

    // Scrollspy: IntersectionObserver avisa qué sección cruza la franja superior
    // de la pantalla, sin tener que calcular posiciones en cada scroll.
    if ("IntersectionObserver" in window) {
      const enlaces = $$(".toc a");
      const obs = new IntersectionObserver((entradas) => {
        entradas.forEach((en) => {
          if (!en.isIntersecting) return;
          enlaces.forEach((a) => a.classList.toggle("activo", a.dataset.sec === en.target.id));
        });
      }, { rootMargin: "-90px 0px -70% 0px" });
      secciones.forEach((s) => obs.observe(s));
    }

    // Copiar enlace al término
    const btnEnlace = $("#copiar-enlace");
    btnEnlace.addEventListener("click", async () => {
      confirmar(btnEnlace, (await copiar(location.href)) ? "Enlace copiado" : "No se pudo copiar");
    });

    // Si la URL trae #seccion, saltar a ella ahora que el contenido existe
    if (location.hash) { const destino = document.getElementById(location.hash.slice(1)); if (destino) destino.scrollIntoView(); }
  }

  /* Navegación lateral: todos los términos agrupados por categoría, con filtro rápido */
  function pintarNav(actual) {
    const nav = $("#nav-terminos");
    if (!nav) return;
    nav.innerHTML = CATEGORIAS.map((c) => `
      <div class="grupo">
        <p>${etiquetaCat(c)}</p>
        <ul>${TERMINOS.filter((t) => t.categoria === c).map((t) => `
          <li><a href="${urlTermino(t.id)}" ${t.id === actual ? 'aria-current="page"' : ""} data-texto="${esc(norm(t.titulo + " " + t.sinonimos.join(" ")))}"><span class="num">${esc(t.numero)}</span><span>${esc(t.tituloCorto || t.titulo)}</span></a></li>`).join("")}
        </ul>
      </div>`).join("");

    const filtro = $("#filtro-nav");
    if (filtro) {
      filtro.addEventListener("input", () => {
        const q = norm(filtro.value.trim());
        $$(".grupo", nav).forEach((g) => {
          let alguno = false;
          $$("li", g).forEach((li) => {
            const ver = !q || $("a", li).dataset.texto.includes(q);
            li.hidden = !ver;
            alguno = alguno || ver;
          });
          g.hidden = !alguno;
        });
      });
    }
    // Elegir un término cierra el drawer (sin devolver el foco: la página va a cambiar)
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) { focoPrevio = null; drawer(false); } });
  }

  /* ───────────────────────── Bloques de código ─────────────────────────
     Envuelve cada <pre> y le añade etiqueta de lenguaje y botón copiar. */
  function prepararCodigo() {
    $$("pre").forEach((pre) => {
      if (pre.parentElement.classList.contains("codigo")) return;
      const code = $("code", pre);
      const lang = code && (code.className.match(/lang-(\w+)/) || [])[1];
      const caja = document.createElement("div");
      caja.className = "codigo";
      pre.replaceWith(caja);
      caja.appendChild(pre);
      if (lang) caja.insertAdjacentHTML("afterbegin", `<span class="lenguaje">${esc(lang)}</span>`);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-copiar";
      btn.textContent = "Copiar";
      btn.setAttribute("aria-label", "Copiar código");
      btn.addEventListener("click", async () => confirmar(btn, (await copiar(pre.innerText)) ? "Copiado" : "Error"));
      caja.appendChild(btn);
    });
  }

  if ($("#grid")) iniciarPortada();
  if ($("#articulo")) iniciarTermino();
  prepararCodigo();
  alHacerScroll();
})();
