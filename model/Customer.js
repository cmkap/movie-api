const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const schema = Joi.object({
  isGold: Joi.boolean(),
  name: Joi.string().min(1).max(50).required(),
  phone: Joi.string().min(5).max(50).required(),
});

const Customer = mongoose.model(
  "Customer",
  new Schema({
    isGold: { type: Boolean, default: false },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

module.exports = { Customer, schema };
