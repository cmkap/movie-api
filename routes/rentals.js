const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Rental, schema } = require("../model/rentals");
const { Customer } = require("../model/customer");
const { Movie } = require("../model/movies");

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  console.log(value);
  const customer = await Customer.findById(value.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(value.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");

  let rental = new Rental({
    customer: {
      _id: value.customerId,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: value.movieId,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const result = await rental.save();
      movie.numberInStock--;
      movie.save();
      res.send(result);
    });

    session.endSession();
    console.log("success");
  } catch (error) {
    console.log("error", error.message);
  }
});

module.exports = router;
