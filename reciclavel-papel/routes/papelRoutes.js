const express = require('express');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Papel = require('../models/papel');
const router = express.Router();

router.post('/papeis', async (req, res) => {
  try {
    const papel = new Papel(req.body);
    await papel.save();
    res.status(201).json(papel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/papeis", async (req, res) => {
  try {
    const papeis = await Papel.find();
    res.status(200).json(papeis);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/papeis/:id", async (req, res) => {
  try {
    const Papel = await Papel.findOne({ code: req.params.code });
    res.status(200).json(Papel);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/papeis/:id", (req, res, next) => {
  const id = req.params.id;
  Papel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.patch("/papeis/:id", (req, res, next) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    Papel.updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "Não foi possível atualizar o documento" });
      });
  } else {
    res.status(500).json({ error: "Id inválido" });
  }
});

module.exports = router;