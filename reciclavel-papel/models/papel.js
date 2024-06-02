const mongoose = require('mongoose');

const papelSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  peso: { type: String, required: true },
  tipo_papel: { type: String, required: true },
  dataReciclagem: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Papel', PapelSchema);  