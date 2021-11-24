const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
};

const validateLogin = (user) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(4).max(23).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

router.post("/", async (req, res) => {
  let { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    username: req.body.username,
  });
  if (!user)
    return res.status(400).send({ message: "Invalid username or password" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid username or password" });

  const token = user.generateAuthToken();
  res.send(token);
});
module.exports = router;
module.exports.hashPassword = hashPassword;
