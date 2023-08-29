const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const Joi = require("joi");
const { Schema } = mongoose;

const schema = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),
});

const rentalSchema = new Schema({
  customer: {
    type: new Schema({
      isGold: {
        type: Boolean,
        default: false,
      },
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
    }),
    required: true,
  },
  movie: {
    type: new Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = {
  Rental,
  schema,
};
