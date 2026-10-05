# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- DEV : Vite avec HMR ---
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# --- BUILD : génération des fichiers statiques ---
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# --- PROD : Nginx sert uniquement les fichiers statiques ---
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80