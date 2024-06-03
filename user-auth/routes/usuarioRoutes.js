const express = require('express');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Usuario = require('../models/usuario');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/cadastro', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ usuario });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Usuário ja existe' });
    }
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
    const usu = await Usuario.findOne({ usuario });
    if (!usu || usu.senha !== senha) {
      return res.status(401).json({ message: 'Usuário ou senha inválido!' });
    }

    const token = jwt.sign({ userId: usu._id }, 'secret_key', { expiresIn: '3h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
});

module.exports = router;