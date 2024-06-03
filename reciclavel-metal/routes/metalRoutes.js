const express = require("express");
const mongoose = require("mongoose");
const Metal = require("../models/metal");
const { ObjectId } = mongoose.Types;
const router = express.Router();

router.post("/metais", async (req, res) => {
  try {
    const metal = new Metal(req.body);
    await metal.save();
    res.status(201).json(metal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/metais/estoque", async (req, res) => {
  try {
    const estoque = await Metal.aggregate([
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

router.get("/metais", async (req, res) => {
  try {
    const metais = await Metal.find();
    res.status(200).json(metais);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/metais/:id", async (req, res) => {
  try {
    const Metal = await Metal.findOne({ code: req.params.code });
    res.status(200).json(Metal);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/metais/:id", (req, res, next) => {
  const id = req.params.id;
  Metal.deleteOne({ _id: id })
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
router.patch("/metais/:id", (req, res, next) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    Metal.updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
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
