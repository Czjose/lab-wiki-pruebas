# Modo "imagen propia": el sitio queda copiado DENTRO de la imagen.
# Útil para entregar o desplegar; cada cambio requiere volver a construir.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/
EXPOSE 80
