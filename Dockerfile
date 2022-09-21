FROM node:18-alpine as build

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY ./src ./src
COPY ./public ./public
RUN npm run build

## runner

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx"]