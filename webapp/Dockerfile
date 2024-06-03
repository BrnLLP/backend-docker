FROM node:latest

# instala um servidor http simples para servir conteúdo estático
RUN npm install -g http-server

# faz da pasta 'app' o diretório atual de trabalho
WORKDIR /APP

# copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

RUN npm install --force

# copia arquivos e pastas para o diretório atual de trabalho (pasta 'app')
COPY . .

# compila a aplicação de produção com minificação
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]