## Reciclo

### Requerimentos

1. Docker
2. Node.js
3. NPM

### Instruções para subir o projeto

1. Rodar build das imagens Docker.
   ```bash
   docker compose build --no-cache
   ```
2. Subir os containers.
   ```bash
   docker compose up
   ```
3. O front-end estará exposto em `localhost:8080`
4. Os demais serviços estarão expostos em `localhost:3001` até `:3005`
