const _ = require('lodash')
const express = require("express");
const { User, schema } = require("../model/user");
const router = express.Router();

router.post("/", async(req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: value.email });
  if(user) return res.status(400).send('Email already exists')

  user = new User({...value})
  await user.save()



  res.send(_.pick(user, ['_id','name', 'email']))
});

module.exports = router;
