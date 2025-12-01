# 1. Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# 2. Production Runner
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy Next.js standalone server (includes API routes)
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 8080
ENV PORT=8080

CMD ["node", "server.js"]
