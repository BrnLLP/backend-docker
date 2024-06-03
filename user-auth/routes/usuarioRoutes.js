const express = require('express');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Usuario = require('../models/usuario');
const router = express.Router();

router.post('/cadastro', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ usuario });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário ja existe' });
    }o
    const novoUsuario = new Usuario({ usuario, senha });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar!', error });
  }
});

router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ usuario });
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: 'Usuário ou senha inválido!' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
});

module.exports = router;