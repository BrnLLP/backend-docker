const express = require('express');
const mongoose = require("mongoose");
const usuarioRoutes = require('./routes/usuarioRoutes');
const app = express();

mongoose.connect("mongodb+srv://eu:SENHA@cluster0.t4wiie6.mongodb.net/reciclagem?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado ao MongoDB Atlas');
})
.catch((error) => {
  console.error('Erro ao conectar ao MongoDB Atlas:', error);
});

const PORT = process.env.PORT || 3005;

// Middleware
app.use(express.json());

app.use(require("cors")());

// Routes
app.use('/', usuarioRoutes);

app.listen(PORT, () => {
  console.log(`UserAuth - Servidor rodando na porta ${PORT}`);
});