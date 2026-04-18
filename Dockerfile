FROM node:22-alpine AS builder

# Enable pnpm via corepack (bundled with Node 22)
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Optionally choose Vite mode (affects which .env files are loaded)
# Defaults to production which is Vite's default for `vite build`
ARG VITE_MODE=production

# Install deps first (leverage Docker layer cache)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy sources and build
COPY . .
RUN pnpm build --mode=${VITE_MODE}

FROM nginx:1.29-alpine AS runtime

# Copy SPA-focused nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled assets
COPY --from=builder /app/.output/public /usr/share/nginx/html

EXPOSE 80

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]


