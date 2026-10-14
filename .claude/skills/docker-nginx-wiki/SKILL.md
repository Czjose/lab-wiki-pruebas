---
name: docker-nginx-wiki
description: Archivos Docker (Dockerfile, docker-compose.yml, nginx.conf) para servir la wiki estática con Nginx, y lista de pruebas al contenedor. Cargar al crear los archivos de infraestructura.
---

# Infraestructura: Nginx en Docker

Entorno del usuario: **Windows + Docker Desktop + PowerShell**. Los comandos que pongas en el README deben funcionar en PowerShell.

## Archivos a crear (en la raíz del proyecto, fuera de `site/`)

### `docker-compose.yml`

Es el modo de desarrollo: usa un bind mount para ver los cambios al instante.

```yaml
services:
  wiki:
    image: nginx:alpine
    container_name: wiki-pruebas
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 5s
      retries: 3
```

### `Dockerfile`

Es el modo "imagen propia": empaqueta el sitio dentro de la imagen. Sirve para demostrar la diferencia entre una imagen oficial y una imagen construida por uno mismo.

```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/
EXPOSE 80
```

### `nginx.conf`

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;

    location ~* \.(css|js|svg|png|jpg|woff2)$ {
        expires 7d;
        add_header Cache-Control "public";
    }
}
```

### `.dockerignore`

```
.claude
*.md
docker-compose.yml
```

## README.md (corto)

Debe incluir:
- `docker compose up -d`, `docker compose ps` y `docker compose down`.
- La alternativa con Dockerfile: `docker build -t wiki-pruebas:1.0 .` y `docker run -d --name wiki-img -p 8081:80 wiki-pruebas:1.0`.

## Verificación que debes hacer tú (Claude Code) al terminar

Si Docker está disponible en la terminal, ejecuta lo siguiente. Si no lo está, solo valida que los archivos existan y estén bien formados.

1. `docker compose config`: valida la sintaxis del YAML.
2. `docker compose up -d` y luego `docker compose ps`: debe mostrar `healthy` tras unos 30 s.
3. `curl -I http://localhost:8080`: debe devolver `200 OK`.
4. `curl -I http://localhost:8080/no-existe`: debe devolver `404`.

Reporta el resultado en 3 líneas como máximo.
