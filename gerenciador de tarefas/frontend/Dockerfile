FROM node:latest as build
LABEL authors="kaique.rocha"


# Diretório de trabalho dentro do container
WORKDIR /app/frontend

# Copiar os arquivos necessários
COPY package.json .
COPY package-lock.json .

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Comando para buildar o frontend-end
RUN npm run build

# Usar uma imagem mais leve para servir o frontend-end
FROM nginx:alpine

# Copiar os arquivos buildados do frontend-end para o servidor nginx
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Porta em que o servidor nginx vai rodar
EXPOSE 3000

# CMD padrão do nginx já é adequado para servir o frontend-end
