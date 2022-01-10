#Primera Etapa
FROM node:12-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine
	#Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
COPY --from=build-step /app/dist/frontend /usr/share/nginx/html
COPY .htaccess /usr/share/nginx/html/.htaccess
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
