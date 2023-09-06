const express = require("express");
const router = express.Router();

const { Genre, schema } = require("../model/genre");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");



router.get("/",async (req, res) => {
  throw new Error('Could not get the genres')
    res.status(200).send(genres);
  })

router.post("/", auth, (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = new Genre({ name: value.name });

  genre
    .save()
    .then(res.status(201).send(genre))
    .catch((err) => next(err));
});

router.put("/:id", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const _id = req.params.id;
  const genreUpdate = req.body.name;

  
    const genre = await Genre.findByIdAndUpdate(
      _id,
      { name: genreUpdate },
      { new: true }
    );
    if (!genre) return res.status(404).send("Genre not found");

    return res.status(200).send(genre);
  
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const _id = req.params.id;

    const genre = await Genre.findByIdAndRemove(_id);
    if (!genre) return res.status(404).send("Genre not found");

    return res.status(200).send(genre);
  
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;

    const genre = await Genre.findById(_id);
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    return res.status(200).send(genre);
  
});

module.exports = router;
