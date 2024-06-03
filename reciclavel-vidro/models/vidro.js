const mongoose = require('mongoose');

const vidroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  peso: { type: String, required: true },
  tipo_vidro: { type: String, required: true },
  dataReciclagem: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vidro', vidroSchema);  