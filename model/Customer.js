const mongoose = require("mongoose");
const { Schema } = mongoose;

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

module.exports = Customer
