FROM node:18-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
