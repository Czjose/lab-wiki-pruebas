# Glosario de Pruebas de Software

Wiki estática hecha desde cero (HTML + CSS + JavaScript, sin frameworks) con 15 términos de pruebas de software explicados con un caso práctico (sistema de reservas de hotel) y ejemplos en Java con JUnit 5. Se sirve con **Nginx dentro de un contenedor Docker**.

Laboratorio de Ingeniería de Software Aplicada III · UTP, FISC · Autor: Jose Cruz.

## Levantarlo

```powershell
docker compose up -d     # arranca el contenedor wiki-pruebas
docker compose ps        # tras ~30 s debe decir "healthy"
docker compose down      # lo detiene (los archivos de site/ no se pierden)
```

Abrir <http://localhost:8080>. La carpeta `site/` está montada en el contenedor: los cambios se ven al refrescar.

Alternativa con imagen propia:

```powershell
docker build -t wiki-pruebas:1.0 .
docker run -d --name wiki-img -p 8081:80 wiki-pruebas:1.0
```

Sin Docker: doble clic en `site/index.html`.

## Estructura

```
lab-wiki-pruebas/
├── site/                     sitio que sirve Nginx
│   ├── index.html            portada: buscador, filtros y tarjetas
│   ├── termino.html          plantilla de término (?id=slug)
│   ├── arquitectura.html     cómo está montado en Docker
│   ├── 404.html              página de error
│   ├── favicon.svg
│   └── assets/
│       ├── css/styles.css
│       ├── js/terminos.js    datos del glosario (agregar término = agregar objeto)
│       ├── js/config.js      logo y fondo del hero personalizables
│       ├── js/app.js         búsqueda, filtros, tema, navegación
│       └── img/              imágenes opcionales (ver README.txt)
├── docker-compose.yml        Nginx + bind mount + healthcheck
├── Dockerfile                imagen propia con el sitio copiado
├── nginx.conf                404 personalizada y caché
└── .claude/                  instrucciones y skills del proyecto
```
