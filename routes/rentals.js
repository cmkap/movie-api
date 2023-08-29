const express = require("express");
const { Rental, schema } = require("../model/rentals");
const { Customer } = require("../model/customer");
const { Movie } = require("../model/movies");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const customer = await Customer.findById(value.customerID);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(value.movieID);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0 ) return res.status(400).send('Movie not in stock')

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

  rental = await rental.save()

  movie.numberInStock--;
  await movie.save();
  
  res.send(rental)


});

module.exports = router;
