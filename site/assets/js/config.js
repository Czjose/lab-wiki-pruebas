/*
 * Configuración visual del sitio. Edita SOLO este archivo para personalizar
 * el logo y el fondo de la portada. No hace falta tocar HTML ni CSS.
 *
 * Las rutas son relativas a la carpeta site/ (por ejemplo "assets/img/mi-logo.png").
 * Pon los archivos en site/assets/img/ (ver README.txt de esa carpeta).
 * Después de guardar, basta con refrescar el navegador.
 */
window.SITE_CONFIG = {
  // Logo del header y del footer (también se usa como favicon).
  // Vacío = logo SVG actual. Si la imagen no carga, vuelve al SVG.
  logo: "",              // ejemplo: "assets/img/mi-logo.png"

  // Fondo del hero de la portada:
  //   "color"  = franja de color suave (por defecto)
  //   "imagen" = usa la imagen de heroFondo, con el texto en claro
  // Si heroFondo está vacío o la imagen no carga, se usa "color" automáticamente.
  heroModo: "color",

  // Imagen para el modo "imagen" (JPG o WebP, 1920×1080 o más, < 500 KB recomendado).
  heroFondo: "",         // ejemplo: "assets/img/fondo-hero.jpg"

  // Capa oscura sobre la imagen para que el texto se lea: 0 = nada, 1 = negro total.
  // Solo se usa en modo "imagen".
  heroOscurecer: 0.55
};
