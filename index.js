const express = require("express");
const Joi = require("joi");
const app = express();

const genres = require("./data/Genres");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the movie API");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/genres", (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = {
    id: genres.length + 1,
    name: value,
  };

  genres.push(genre);
  res.status(201).send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const updateGenre = req.body;
  const genre = genres.find((g) => g.id === parseInt(updateGenre.id));
  if (!genre) return res.status(404).send("Genre does not exist");

  genre.name = updateGenre.name;

  return res.status(201).send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genreId = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === genreId);
  if (!genre) return res.status(404).send("Genre does not exist");

  const index = genres.indexOf(genre);

  genres.splice(index, 1);

  return res.status(201).send(genre);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
