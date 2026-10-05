# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- DEV : hot-reload (le code est monté en volume) ---
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- BUILD : compilation TypeScript ---
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# --- Dépendances de prod uniquement ---
FROM base AS prod-deps
RUN npm ci --omit=dev

# --- PROD : image finale légère ---
FROM node:22-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]