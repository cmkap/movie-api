require("dotenv").config();
const debug = require("debug")("app:startup");
const express = require("express");
const app = express();
const logger = require('./utils/logger')

require('./startup/logging')()
require('./startup/validation')()
require('./startup/routes')(app, debug)
require('./startup/db')()
require('./startup/config')

// app.set("view engine", "pug");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
