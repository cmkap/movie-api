const bcrypt = require("bcrypt");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
});

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: value.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(value.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
