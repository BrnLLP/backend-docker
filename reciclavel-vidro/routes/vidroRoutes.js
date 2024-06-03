const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Vidro = require("../models/vidro");
const router = express.Router();

// POST /vidros
router.post("/vidros", async (req, res) => {
  try {
    const vidro = new Vidro(req.body); //
    await vidro.save();
    res.status(201).json(vidro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/vidros/estoque", async (req, res) => {
  try {
    const estoque = await Vidro.aggregate([
      {
        $group: { _id: null, total: { $sum: { $toDouble: "$peso" } } },
      },
    ]);

    res.status(200).json(estoque);
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error });
  }
});

// GET /vidros
router.get("/vidros", async (req, res) => {
  try {
    const vidros = await Vidro.find();
    res.status(200).json(vidros);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// GET /vidros/:id
router.get("/vidros/:id", async (req, res) => {
  try {
    const vidro = await Vidro.findById(req.params.id);
    res.status(200).json(vidro);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// DELETE /vidros/:id
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

// PATCH /vidros/:id
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
