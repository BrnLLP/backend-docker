const express = require('express');
const metalRoutes = require('./routes/metalRoutes');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado ao MongoDB Atlas');
})
.catch((error) => {
  console.error('Erro ao conectar ao MongoDB Atlas:', error);
});

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/', metalRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});