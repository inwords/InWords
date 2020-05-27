FROM node:12.17-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY webpack.*.js ./
COPY babel.*.js ./
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:1.18.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
