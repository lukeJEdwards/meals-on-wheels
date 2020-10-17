const express = require("express");
const deliverModel = require("../Models/deliver");

const router = express.Router();

//? get all delivers
router.get("/", async (req, res) => {
  try {
    const delivers = await deliverModel.find();
    res.json(delivers);
  } catch (err) {
    res.json(err);
  }
});

//? get deliver by id
router.get("/:id", async (req, res) => {
  try {
    const deliver = await deliverModel.findById(req.params.id);
    res.json(deliver);
  } catch (err) {
    res.json(err);
  }
});

//? creates new deliver
router.post("/", async (req, res) => {
  const newDeliver = new deliverModel({
    name: req.body.name,
    paid: req.body.paid,
  });
  try {
    const savedDeliver = await newDeliver.save();
    res.json(savedDeliver);
  } catch (err) {
    res.json(err);
  }
});

//? updates a deliver
router.put("/:id", async (req, res) => {
  try {
    const deliver = await deliverModel.findById(req.params.id);
    deliver.name = req.body.name;
    deliver.paid = req.body.paid;
    const saved = await deliver.save();
    res.json(saved);
  } catch (err) {
    res.json(err);
  }
});

//? delete deliver
router.delete("/:id", async (req, res) => {
  try {
    const removedDeliver = await deliverModel.remove({ _id: req.params.id });
    res.json(removedDeliver);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
