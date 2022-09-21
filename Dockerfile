FROM node:18-alpine as build

WORKDIR /app
COPY tsconfig.json ./
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

ADD ./src ./src
ADD ./public ./public
RUN npm run build

## runner

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80