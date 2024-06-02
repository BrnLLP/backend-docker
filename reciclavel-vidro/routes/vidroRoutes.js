const express = require('express');
const mongoose = require("mongoose"); 
const { ObjectId } = mongoose.Types;
const Vidro = require('../models/vidro');
const router = express.Router();

app.post('/vidros', async (req, res) => {
  try {
    const Vidro = new Papel(req.body);
    await vidro.save();
    res.status(201).json(vidro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/vidros", async (req, res) => {
  try {
    const vidros = await Vidro.find();
    res.status(200).json(vidros);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/vidros/:id", async (req, res) => {
  try {
    const Vidro = await Vidro.findOne({ code: req.params.code });
    res.status(200).json(Vidro);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/vidros/:id", (req, res, next) => {
  const id = req.params.id;
  Vidro.deleteOne({ _id: id })
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
router.patch("/vidros/:id", (req, res, next) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    Vidro.updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
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