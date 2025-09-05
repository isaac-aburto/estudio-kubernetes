# Etapa 1: Build de React
FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
