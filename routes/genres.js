const express = require("express");
const router = express.Router();

const { Genre, schema } = require("../model/genre");


router.get("/", (req, res) => {
  Genre.find({})
    .sort("name")
    .select("name")
    .then((genres) => res.status(200).send(genres))
    .catch((err) => console.error(err));
});

router.post("/", (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = new Genre({ name: value.name });

  genre
    .save()
    .then(res.status(201).send(genre))
    .catch((err) => console.error(err));
});

router.put("/:id", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const _id = req.params.id;
  const genreUpdate = req.body.name;

  try {
    const genre = await Genre.findByIdAndUpdate(
      _id,
      { name: genreUpdate },
      { new: true }
    );
    if (!genre) return res.status(404).send("Genre not found");

    return res.status(200).send(genre);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const genre = await Genre.findByIdAndRemove(_id);
    if (!genre) return res.status(404).send("Genre not found");


    return res.status(200).send(genre);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const genre = await Genre.findById(_id);
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");
    return res.status(200).send(genre);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
