require("dotenv").config();
require("express-async-errors");
const winston = require("winston");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const debug = require("debug")("app:startup");
const express = require("express");

const app = express();
require('./startup/routes')(app, debug)

process.on("uncaughtException", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on("uncaughtRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

if (!process.env.JWT_PRIVATE_KEY) {
  console.log("FATAL ERROR: jwt private key is not defined");
  process.exit(1);
}
const username = process.env.USERNAME;
const password = process.env.SECRET_KEY;

const uri = `mongodb+srv://${username}:${password}@cluster0.xe4jeek.mongodb.net/movie?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(debug("Connected to MongoDB"))
  .catch((error) => console.error("Error: ", error));

app.set("view engine", "pug");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
