# --- Stage 1: install production dependencies ---
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# --- Stage 2: runtime image ---
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

# Non-root user (node:22-alpine already ships a 'node' user)
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD ["node", "index.js"]
