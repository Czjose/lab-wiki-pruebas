CARPETA DE IMÁGENES DEL SITIO
=============================

Pon aquí tus imágenes y luego escribe su ruta en site/assets/js/config.js.

1) LOGO  ->  config.js:  logo: "assets/img/mi-logo.png"
   - Formato: PNG (con fondo transparente) o SVG.
   - Forma: cuadrado, de al menos 64 x 64 px (mejor 128 x 128 o 256 x 256).
   - Se muestra a 32 x 32 en el header, a 28 x 28 en el footer y como favicon.

2) FONDO DEL HERO  ->  config.js:  heroModo: "imagen"  y  heroFondo: "assets/img/fondo-hero.jpg"
   - Formato: JPG o WebP.
   - Tamaño: 1920 x 1080 px o más (horizontal).
   - Peso: menos de 500 KB recomendado, para que la portada cargue rápido.
   - Sobre la imagen se pone una capa oscura (heroOscurecer en config.js)
     para que el texto blanco se lea bien.

Si una imagen no existe o no carga, el sitio usa el diseño por defecto.
Con Docker no hace falta reiniciar nada: la carpeta site/ está montada en el
contenedor, así que basta con refrescar el navegador.
