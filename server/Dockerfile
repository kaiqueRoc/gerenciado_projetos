FROM node:latest
LABEL authors="kaique.rocha"

# Diretório de trabalho dentro do container
WORKDIR /app/backend

# Copiar os arquivos necessários
COPY package.json .
COPY package-lock.json .

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Porta em que o servidor backend vai rodar
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "start"]