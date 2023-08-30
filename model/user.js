const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: passwordComplexity().required(),
});

const userSchema =  new Schema({
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
    maxlength: 1024,
  },
  isAdmin: Boolean
})

// arrow functions don't have their own this-- arow functions  reference the calling function
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_PRIVATE_KEY);
  return token
}

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  schema,
};
