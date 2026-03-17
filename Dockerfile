FROM node:20-alpine

WORKDIR /app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale dependências (production)
RUN npm install --production

# Copie apenas os arquivos JS compilados
COPY dist ./dist

# Se você precisar de assets (views, etc.)
# COPY public ./public

EXPOSE 3000

# Rodar o entrypoint JS compilado
CMD ["node", "dist/app.js"]