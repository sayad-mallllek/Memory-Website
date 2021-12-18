const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");
const { hashPassword } = require("./auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  console.log(user);
  res.send(user);
});

router.post("/", async (req, res) => {
  console.log("Adding new user...");
  console.log("The User:", req.body);
  let { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send({ message: "username already taken!" });

  user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ message: "email already taken!" });

  const password = await hashPassword(req.body.password);
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: password,
  });
  await user.save();

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
