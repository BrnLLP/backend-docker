const express = require('express');
const mongoose = require("mongoose");
const plasticoRoutes = require('./routes/plasticoRoutes');
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

const PORT = process.env.PORT || 3003;

app.use(require("cors")());

// Middleware
app.use(express.json());

// Routes
app.use('/', plasticoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});