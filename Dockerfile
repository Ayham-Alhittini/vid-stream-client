FROM node:16-alpine3.11 as angular

WORKDIR /app

COPY . .

RUN npm ci --legacy-peer-deps
RUN npm run build --if-present

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs

COPY --from=angular /app/dist/client . 