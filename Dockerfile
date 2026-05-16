# ─────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copia TODO o projeto (quasar prepare no postinstall precisa da estrutura completa)
COPY . .

# Remove node_modules locais que possam ter vindo no contexto
RUN rm -rf node_modules

# Instala dependências com npm (evita ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY)
RUN npm install --legacy-peer-deps

# Build de produção via Quasar CLI
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2: Serve (Nginx)
# ─────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia config customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copia artefatos de build (Quasar gera em /dist/spa por padrão)
COPY --from=builder /app/dist/spa /usr/share/nginx/html

# Expõe a porta HTTP
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
