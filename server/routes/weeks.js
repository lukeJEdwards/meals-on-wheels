const express = require("express");
const crypto = require("crypto");
const weekModel = require("../Models/week");

const router = express.Router();

//? gets all weeeks
router.get("/", async (req, res) => {
  try {
    const weeks = await weekModel.find().select("_id startDate endDate");
    res.json(weeks);
  } catch (err) {
    res.json(err);
  }
});

//? get a week by id
router.get("/:id", async (req, res) => {
  try {
    const week = await weekModel.findById(req.params.id);
    res.json(week);
  } catch (err) {
    res.json(err);
  }
});

//? creates new week
router.post("/", async (req, res) => {
  const newWeek = new weekModel({
    hash: getNewHash(""),
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    data: req.body.data,
    delivers: [
      { clients: [], delivers: [] },
      { clients: [], delivers: [] },
      { clients: [], delivers: [] },
      { clients: [], delivers: [] },
      { clients: [], delivers: [] },
    ],
  });
  try {
    const savedWeek = await newWeek.save();
    res.json(savedWeek);
  } catch (err) {
    res.json(err);
  }
});

//? updates a week
router.put("/:id", async (req, res) => {
  try {
    const week = await weekModel.findById(req.params.id);
    if (req.body.hash == week.hash) {
      week.data = req.body.data;
    } else {
      const weekIds = week.data.map((c) => c._id);
      const reqIds = req.body.data.map((c) => c._id);
      const updates = req.body.data.filter((c) => weekIds.includes(c._id));
      const toAdd = req.body.data.filter((c) => !weekIds.includes(c._id));
      for (let i = 0; i < updates.length; i++) {
        const weekIndex = weekIds.indexOf(updates[i]);
        const reqIndex = reqIds.indexOf(updates[i]);
        week.data[i] = updateClient(
          week.data[weekIndex],
          req.body.data[reqIndex]
        );
      }
      for (let i = 0; i < toAdd.length; i++) {
        const reqIndex = reqIds.indexOf(toAdd[i]);
        this.week.data.push(req.body.data[reqIndex]);
      }
    }
    week.hash = getNewHash(week.hash);
    const savedWeek = await week.save();
    res.json(savedWeek);
  } catch (err) {
    res.json(err);
  }
});

//? update delivers
router.put("/:id/:day", async (req, res) => {
  try {
    const week = await weekModel.findById(req.params.id);
    week.delivers = req.body.delivers;
    week.markModified("delivers");
    const savedWeek = await week.save();
    res.json(savedWeek);
  } catch (err) {
    res.json(err);
  }
});
//? delete user in week by id of both
router.delete("/:weekId/:clientId", async (req, res) => {
  try {
    const week = await weekModel.findById(req.params.weekId);
    const index = week.data
      .map((client) => client._id)
      .indexOf(req.params.clientId);
    if (index > -1) {
      week.data.splice(index, 1);
      const savedWeek = await week.save();
      res.json(savedWeek);
    } else {
      res.json({ err: "client doesn't exsist" });
    }
  } catch (err) {
    res.json(err);
  }
});

//? gets a new hash
getNewHash = (oldHash) => {
  let hash = oldHash;
  while (hash == oldHash) {
    hash = crypto.randomBytes(20).toString("hex");
  }
  return hash;
};

//? updates a day object
updateClient = (client, newData) => {
  for (let i = 0; i < client.days.length; i++) {
    if (client.days[i].main != newData.days[i].main) {
      client.days[i].main = newData.days[i].main;
    }
    if (client.days[i].veg != newData.days[i].veg) {
      client.days[i].veg = newData.days[i].veg;
    }
    if (client.days[i].soup != newData.days[i].soup) {
      client.days[i].soup = newData.days[i].soup;
    }
    if (client.days[i].pudding != newData.days[i].pudding) {
      client.days[i].pudding = newData.days[i].pudding;
    }
  }
  return client;
};

module.exports = router;
