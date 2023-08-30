const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
});

const User = mongoose.model("User", new Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength:1024,
        
      },
  })
);

module.exports = {
    User,
    schema
}
