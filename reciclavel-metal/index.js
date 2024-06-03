const express = require('express');
const metalRoutes = require('./routes/metalRoutes');
const app = express();
const mongoose = require('mongoose');  // Certifique-se de que esta linha está presente

// Configuração do mongoose
mongoose.connect("mongodb+srv://eu:SENHA@cluster0.t4wiie6.mongodb.net/reciclagem?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB', err);
});

const PORT = process.env.PORT || 3001;

app.use(require("cors")());

app.use(express.json());
app.use('/', metalRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});