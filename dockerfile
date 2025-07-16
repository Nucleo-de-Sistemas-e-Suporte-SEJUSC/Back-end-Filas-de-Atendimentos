FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
COPY .env .env

RUN npx prisma generate

EXPOSE 8004

CMD ["npx", "tsx", "src/infra/http/fastify/server.js"]
