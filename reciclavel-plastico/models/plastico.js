const mongoose = require('mongoose');

const plasticoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  peso: { type: String, required: true },
  dataReciclagem: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plastico', plasticoSchema);  