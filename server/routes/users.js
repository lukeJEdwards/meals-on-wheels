const express = require("express");
const userModel = require("../Models/user.js");

const router = express.Router();

//? login for user
router.get("/:name", async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.name });
    if (user) {
      res.json({ Oauth: true, user });
    } else {
      res.json({ Oauth: false });
    }
  } catch (err) {
    res.json(err);
  }
});

//? creates new user
router.post("/", async (req, res) => {
  if (await userNameExsists(req.body.username)) {
    res.json({ taken: true });
  } else {
    const newUser = new userModel({
      username: req.body.username,
      admin: req.body.admin,
    });
    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      res.json(err);
    }
  }
});

//? updates a user
router.put("/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    user.username = req.body.username;
    user.admin = req.body.admin;
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json(err);
  }
});

//? deletes a users
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.remove({ _id: req.params.id });
    res.json(deletedUser);
  } catch (err) {
    res.json(err);
  }
});

//? check to see if username is taken
userNameExsists = async (username) => {
  const users = await userModel.find();
  const usernames = users.map((user) => user.username);
  return usernames.includes(username);
};

module.exports = router;
