const express = require("express");
const crypto = require("crypto");
const clientModel = require("../Models/client");

const router = express.Router();

//? gets all clients
router.get("/", async (req, res) => {
  if (req.query.filter) {
    try {
      const clients = await clientModel.find({
        $or: [
          { forename: { $regex: req.query.filter, $options: "i" } },
          { surname: { $regex: req.query.filter, $options: "i" } },
        ],
      });

      res.json(clients);
    } catch (err) {
      res.json(err);
    }
  } else {
    try {
      const clients = await clientModel.find().select("_id forename surname");
      res.json(clients);
    } catch (err) {
      res.json(err);
    }
  }
});

//? gets singal client by id
router.get("/:id", async (req, res) => {
  try {
    const client = await clientModel.findById(req.params.id);
    if (client) {
      res.json(client);
    } else {
      res.json({ err: "user doesn't exsit" });
    }
  } catch (err) {
    res.json(err);
  }
});

//? create a new client
router.post("/", async (req, res) => {
  const newClient = new clientModel({
    hash: getNewHash(""),
    forename: req.body.forename,
    surname: req.body.surname,
    postcode: req.body.postcode,
    address: req.body.address,
    comments: req.body.comment ? req.body.comment : [],
    dietaryRequirements: req.body.dietaryRequirements
      ? req.body.dietaryRequirements
      : [],
  });
  try {
    const savedClient = await newClient.save();
    res.send(savedClient);
  } catch (err) {
    res.json(err);
  }
});

//? updates a client
router.put("/:id", async (req, res) => {
  try {
    const client = await clientModel.findById(req.params.id);
    client.forename = req.body.forename;
    client.surname = req.body.surname;
    client.postcode = req.body.postcode;
    client.address = req.body.address;
    if (req.body.hash != client.hash) {
      client.comments = updateArray(client.comments, req.body.comments);
      client.dietaryRequirements = updateArray(
        client.dietaryRequirements,
        req.body.dietaryRequirements
      );
    } else {
      client.comments = req.body.comments;
      client.dietaryRequirements = req.body.dietaryRequirements;
    }
    client.hash = getNewHash(client.hash);
    const saved = await client.save();
    res.json(saved);
  } catch (err) {
    res.json(err);
  }
});

//? deletes a client
router.delete("/:id", async (req, res) => {
  try {
    const removeClient = await clientModel.remove({ _id: req.params.id });
    res.json(removeClient);
  } catch (err) {
    res.json(err);
  }
});

//? updates the old array passed in
updateArray = (oldArr, newArr) => {
  newArr.forEach((item) => {
    if (!oldArr.includes(item)) {
      oldArr.push(item);
    }
  });
  return oldArr;
};

//? gets new hash
getNewHash = (oldHash) => {
  let hash = oldHash;
  while (hash == oldHash) {
    hash = crypto.randomBytes(20).toString("hex");
  }
  return hash;
};

module.exports = router;
