const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const { User, schema } = require("../model/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: value.email });
  if (user) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  user = new User({ ...value, password: hashedPassword });
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
