require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const debug = require("debug")("app:startup");
const express = require("express");
const app = express();

require('./startup/logging')()
require('./startup/routes')(app, debug)
require('./startup/db')()


if (!process.env.JWT_PRIVATE_KEY) {
  console.log("FATAL ERROR: jwt private key is not defined");
  process.exit(1);
}

app.set("view engine", "pug");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Listening on port ${port}`);
});
