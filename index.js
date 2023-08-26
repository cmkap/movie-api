require('dotenv').config()

const mongoose = require('mongoose')
const debug = require("debug")("app:startup");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

const logger = require('./middleware/logger')
const genres = require("./routes/genres");
const hompage = require("./routes/home");

const username = process.env.USERNAME
const password = process.env.SECRET_KEY

const uri = `mongodb+srv://${username}:${password}@cluster0.xe4jeek.mongodb.net/movie?retryWrites=true&w=majority`

mongoose.connect(uri)
  .then(debug('Connected to MongoDB'))
  .catch((error) => console.error('Error: ', error))



app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled....");
}

app.use(logger);

app.use(function (req, res, next) {
  console.log("...Authenticating");
  next();
});

app.use('/', hompage)
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
