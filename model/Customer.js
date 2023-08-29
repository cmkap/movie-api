const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const schema = Joi.object({
  isGold: Joi.boolean(),
  name: Joi.string().min(1).max(50).required(),
  phone: Joi.number().integer().required(),
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
      type: Number,
      required: true,
    },
  })
);

module.exports = { Customer, schema };
