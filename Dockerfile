FROM node:16-alpine3.11 as angular

WORKDIR /app

# Copy dependency files first to leverage Docker cache, speeding up subsequent builds unless these files change.
COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build --if-present

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs

COPY --from=angular /app/dist/client .

EXPOSE 80