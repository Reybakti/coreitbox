FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# =========================

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Production dependencies
RUN npm install --omit=dev

# Required for prisma seed.ts
RUN npm install ts-node typescript

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Prisma Runtime
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3100

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/src/main.js"]